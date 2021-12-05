import { commerce } from "../../lib/commerce";
import { createContext, useState, useReducer, useEffect, useCallback } from "react";

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
    attributesExceptions: ["attr_gNXELwj1rl3A4p", "new-in", "attr_LkpnNwAqawmXB3"],
    merchant: {},
    estimatedLocation: {},
});

const reducerActions = {
    UPDATE_PRODUCTS: "update-products",
    UPDATE_CATEGORIES: "update-categories",
    UPDATE_CART: "update-cart",
    UPDATE_MERCHANT: "update-merchant",
};

function reducer(state, action) {
    switch (action.type) {
        case reducerActions.UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case reducerActions.UPDATE_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        case reducerActions.UPDATE_CART:
            return {
                ...state,
                cart: action.payload,
            };
        case reducerActions.UPDATE_MERCHANT:
            return {
                ...state,
                merchant: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
}

export function CommerceProvider(props) {
    const [callback, dispatch] = useReducer(reducer, {
        cart: [],
        products: [],
        categories: {},
        merchant: {},
    });

    const [itemAddedToCart, setItemAddedToCart] = useState(undefined);
    const [shippingData, setShippingData] = useState({});
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [currentShipping, setCurrentShipping] = useState();
    const [estimatedLocation, setEstimatedLocation] = useState({});

    const [attributesExceptions, setAttributesExceptions] = useState([
        "attr_gNXELwj1rl3A4p",
        "new-in",
        "attr_LkpnNwAqawmXB3",
    ]);

    useEffect(() => {
        const fetchProductsHandler = async () => {
            const { data } = await commerce.products.list();
            data.map((product) =>
                product.active ? dispatch({ type: reducerActions.UPDATE_PRODUCTS, payload: product }) : null
            );
        };
        fetchProductsHandler();
        const fetchProductCategories = async () => {
            const { data } = await commerce.categories.list();
            dispatch({ type: reducerActions.UPDATE_CATEGORIES, payload: data });
        };
        fetchProductCategories();
        const fetchMerchantHandler = async () => {
            const data = await commerce.merchants.about();
            dispatch({ type: reducerActions.UPDATE_MERCHANT, payload: data });
        };
        fetchMerchantHandler();
        const fetchCartHandler = async () => {
            const data = await commerce.cart.retrieve();
            dispatch({ type: reducerActions.UPDATE_CART, payload: data });
        };
        fetchCartHandler();
    }, []);

    // Cart Handlers
    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        dispatch({ type: reducerActions.UPDATE_CART, payload: cart });
        setItemAddedToCart(productId);
    };

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        dispatch({ type: reducerActions.UPDATE_CART, payload: cart });
    };

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        dispatch({ type: reducerActions.UPDATE_CART, payload: cart });
    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        dispatch({ type: reducerActions.UPDATE_CART, payload: newCart });
    };

    function removeItemAddedWarning() {
        setItemAddedToCart(undefined);
    }

    // Checkout Handlers
    const generateToken = useCallback(async () => {
        if (callback.cart.line_items >= 1 && callback.cart.id)
            try {
                const token = await commerce.checkout.generateToken(callback.cart.id, { type: "cart" });
                setCheckoutToken(token);
            } catch (error) {
                console.log(error);
            }
    }, [callback.cart]);

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            if (order) refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    };

    const handleShippingMethod = async () => {
        if (checkoutToken.id && shippingData)
            await commerce.checkout
                .checkShippingOption(checkoutToken.id, {
                    shipping_option_id: shippingData.shippingOption,
                    country: shippingData.shippingCountry,
                    region: shippingData.shippingState,
                })
                .then((data) => {
                    setCurrentShipping(data);
                });
    };

    const getShippingLocationFromIp = (checkoutTokenId, ip) => {
        commerce.checkout.getLocationFromIP(checkoutTokenId, ip).then((adress) => setEstimatedLocation(adress));
    };

    const checkoutNextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const checkoutBackStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const checkoutProceed = (data) => {
        setShippingData(data);
        handleShippingMethod();
        checkoutNextStep();
    };

    // Export variables
    const commerceContext = {
        cart: callback.cart,
        merchant: callback.merchant,
        products: callback.products,
        productCategories: callback.categories,
        cartQty: callback.cart.line_items ? callback.cart.line_items.length : 0,

        activeStep: activeStep,
        shippingData: shippingData,
        checkoutToken: checkoutToken,
        currentShipping: currentShipping,

        attributesExceptions: attributesExceptions,

        order: order,
        onCaptureCheckout: handleCaptureCheckout,
        error: errorMessage,
        getShippingLocationFromIp: getShippingLocationFromIp,
        estimatedLocation: estimatedLocation,

        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateCartQty: handleUpdateCartQty,

        itemAddedToCart: itemAddedToCart,
        removeItemAddedWarning: removeItemAddedWarning,

        generateToken: generateToken,
        handleShippingMethod: handleShippingMethod,
        setStep: setActiveStep,
        checkoutProceed: checkoutProceed,
        checkoutNextStep: checkoutNextStep,
        checkoutBackStep: checkoutBackStep,
    };

    return <CommerceHandler.Provider value={commerceContext}>{props.children}</CommerceHandler.Provider>;
}

export default CommerceHandler;
