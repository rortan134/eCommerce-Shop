import React, { createContext, useCallback, useEffect, useReducer, useState } from "react";
import { commerce } from "../lib/commerce";

const CommerceHandler = createContext({
    cart: {},
    cartQty: 0,
    products: [],
    categories: {},
    itemAddedToCart: undefined,
    activeStep: 0,
    shippingData: {},
    checkoutToken: null,
    order: {},
    errorMessage: "",
    currentShipping: null,
    merchant: {},
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
                products: action.payload,
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
            throw new Error(`Unknown action: ${action.type}`);
    }
}

export function CommerceProvider(props) {
    const [callback, dispatch] = useReducer(reducer, {
        cart: [],
        products: [],
        categories: {},
        merchant: {},
    });

    const [itemAddedToCart, setItemAddedToCart] = useState(undefined); // Last item added to cart
    const [errorMessage, setErrorMessage] = useState("");

    // Checkout state
    const [shippingData, setShippingData] = useState({});
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [currentShipping, setCurrentShipping] = useState();
    const [order, setOrder] = useState({});

    // Fetch everything at once
    useEffect(() => {
        const fetchAll = async () => {
            try {
                await Promise.all([
                    commerce.products.list({
                        active: 1,
                    }),
                    commerce.categories.list(),
                    commerce.cart.retrieve(),
                    commerce.merchants.about(),
                ]).then(([products, categories, cart, merchant]) => {
                    dispatch({ type: reducerActions.UPDATE_PRODUCTS, payload: products.data });
                    dispatch({ type: reducerActions.UPDATE_CATEGORIES, payload: categories.data });
                    dispatch({ type: reducerActions.UPDATE_CART, payload: cart });
                    dispatch({ type: reducerActions.UPDATE_MERCHANT, payload: merchant.data });
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchAll();
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
        if (callback.cart.id && callback.cart.line_items.length >= 1)
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

    const handleShippingMethod = async (checkoutTokenId, shipping) => {
        if (checkoutToken.id && shippingData) {
            await commerce.checkout
                .checkShippingOption(checkoutTokenId, {
                    shipping_option_id: shipping.shippingOption,
                    country: shipping.shippingCountry,
                    region: shipping.shippingState,
                })
                .then((data) => {
                    setCurrentShipping(data);
                });
        }
    };

    const checkoutNextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const checkoutBackStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const checkoutProceed = (data) => {
        setShippingData(data);
        handleShippingMethod(checkoutToken.id, data);
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

        order: order,
        onCaptureCheckout: handleCaptureCheckout,
        error: errorMessage,

        addToCart: handleAddToCart,
        updateCartQty: handleUpdateCartQty,
        removeFromCart: handleRemoveFromCart,

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
