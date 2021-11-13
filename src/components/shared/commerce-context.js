import { commerce } from "../../lib/commerce";
import { createContext, useState } from "react";

const CommerceHandler = createContext({
    cart: {},
    cartQty: 0,
    products: [],
    landingProduct: {},
    itemAddedToCart: {},
    itemRemovedFromCart: {},
    activeStep: 0,
    shippingData: {},
    checkoutToken: null,
    order: {},
    errorMessage: "",
    currentShipping: null,
});

export function CommerceProvider(props) {
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);
    const [landingProduct, setLandingProduct] = useState();
    const [itemAddedToCart, setItemAddedToCart] = useState(undefined);
    const [shippingData, setShippingData] = useState({});
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [currentShipping, setCurrentShipping] = useState();

    // Fetch Items
    const fetchProductsHandler = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);

        // Fetch landing product
        commerce.products
            .list({
                category_slug: ["landing-page"],
            })
            .then((product) => setLandingProduct(product.data[0]));
    };
    const fetchCartHandler = async () => {
        setCart(await commerce.cart.retrieve());
    };

    // Cart Handlers
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
        await commerce.checkout.checkShippingOption((checkoutTokenId), {
            shipping_option_id: currMethod.shippingOption,
            country: currMethod.shippingCountry,
            region: currMethod.shippingState,
        }).then((data) =>  {setCurrentShipping(data)})
    };

    // Export variables
    const commerceContext = {
        cart: cart,
        cartQty: cart.total_items,
        products: products,
        landingProduct: landingProduct,
        activeStep: activeStep,
        shippingData: shippingData,
        checkoutToken: checkoutToken,
        currentShipping: currentShipping,
        
        order: order,
        onCaptureCheckout: handleCaptureCheckout,
        error: errorMessage,

        fetchProducts: fetchProductsHandler,
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
