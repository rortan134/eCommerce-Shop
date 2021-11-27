import { commerce } from "../../lib/commerce";
import { createContext, useState } from "react";

const CommerceHandler = createContext({
    cart: {},
    cartQty: 0,
    products: [],
    categories: {},
    itemAddedToCart: undefined,
    itemRemovedFromCart: {},
    activeStep: 0,
    shippingData: {},
    checkoutToken: null,
    order: {},
    errorMessage: "",
    currentShipping: null,
    landingProductAtt: "attr_gNXELwj1rl3A4p",
    merchant: {},
});

export function CommerceProvider(props) {
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);
    const [itemAddedToCart, setItemAddedToCart] = useState(undefined);
    const [shippingData, setShippingData] = useState({});
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [currentShipping, setCurrentShipping] = useState();
    const [categories, setCategories] = useState({});
    const [landingProductAtt, setLandingProductAtt] = useState("attr_gNXELwj1rl3A4p");
    const [merchant, setMerchant] = useState({});

    const fetchMerchantHandler = async () => {
        const data = await commerce.merchants.about();
        setMerchant(data.data[0]);
    };

    // Fetch Items
    const fetchProductsHandler = async () => {
        const { data } = await commerce.products.list();
        data.map((product) => (product.active ? setProducts((prevArray) => [...prevArray, product]) : null));
    };

    const fetchProductCategories = async () => {
        const { data } = await commerce.categories.list();
        setCategories(data);
    };

    // Cart Handlers
    const fetchCartHandler = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
        setItemAddedToCart(productId);
    };

    function removeItemAddedWarning() {
        setItemAddedToCart(undefined);
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    };

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    };

    // Checkout Handlers
    const generateToken = async () => {
        try {
            const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
            setCheckoutToken(token);
        } catch (error) {
            console.log(error);
        }
    };

    const checkoutNextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const checkoutBackStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const checkoutNext = (data) => {
        setShippingData(data);
        checkoutNextStep();
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            if (order) refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    };

    const handleShippingMethod = async (checkoutTokenId, currMethod, methods) => {
        await commerce.checkout
            .checkShippingOption(checkoutTokenId, {
                shipping_option_id: currMethod.shippingOption,
                country: currMethod.shippingCountry,
                region: currMethod.shippingState,
            })
            .then((data) => {
                setCurrentShipping(data);
            });
    };

    // Export variables
    const commerceContext = {
        cart: cart,
        cartQty: cart.total_items,
        products: products,
        activeStep: activeStep,
        shippingData: shippingData,
        checkoutToken: checkoutToken,
        currentShipping: currentShipping,
        productCategories: categories,
        landingProductAtt: landingProductAtt,
        merchant: merchant,

        order: order,
        onCaptureCheckout: handleCaptureCheckout,
        error: errorMessage,

        fetchMerchant: fetchMerchantHandler,
        fetchProducts: fetchProductsHandler,
        fetchCategories: fetchProductCategories,
        fetchCart: fetchCartHandler,

        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateCartQty: handleUpdateCartQty,

        itemAddedToCart: itemAddedToCart,
        removeItemAddedWarning: removeItemAddedWarning,

        generateToken: generateToken,
        handleShippingMethod: handleShippingMethod,
        setStep: setActiveStep,
        checkoutNext: checkoutNext,
        checkoutNextStep: checkoutNextStep,
        checkoutBackStep: checkoutBackStep,
    };

    return <CommerceHandler.Provider value={commerceContext}>{props.children}</CommerceHandler.Provider>;
}

export default CommerceHandler;
