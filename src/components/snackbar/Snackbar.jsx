import { commerce } from "../../lib/commerce";
import CommerceHandler from "../../contexts/commerce-context";
import { useState, useEffect, useContext, useReducer } from "react";

import SnackbarContent from "./SnackbarContent";

const reducerActions = {
    SET_BODY: "set-body",
    CLEAR: "clear",
};

function reducer(state, action) {
    switch (action.type) {
        case reducerActions.SET_BODY: {
            return {
                content: action.handler.content,
                payload: action.handler.payload,
                open: action.handler.open,
            };
        }
        case reducerActions.CLEAR: {
            return {
                content: "",
                payload: "",
                open: false,
            };
        }
        default: {
            return {
                ...state,
                open: false,
            };
        }
    }
}

function SnackBar() {
    const commerceHandling = useContext(CommerceHandler);

    const [message, setMessage] = useState({});
    const [body, dispatch] = useReducer(reducer, { content: "", payload: "", open: false });
    const [cookieShown, setCookieShown] = useState(localStorage.getItem("cookieWasAccepted"));

    useEffect(() => {
        if (Object.entries(message).length !== 0) {
            dispatch({ type: reducerActions.SET_BODY, handler: message });
        }
    }, [message, dispatch]);

    useEffect(() => {
        if (cookieShown === true) {
            return;
        } else if (!cookieShown) {
            const timer = setTimeout(() => {
                setMessage({
                    content: "This website use cookies to personalize content and enhance the user experience.",
                    payload: "",
                    open: true,
                });
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [cookieShown]);

    useEffect(() => {
        if (commerceHandling.itemAddedToCart) {
            const retrieveEl = async () => {
                await commerce.products.retrieve(commerceHandling.itemAddedToCart).then((product) => {
                    setMessage({
                        content: product.name,
                        payload: "was added to cart.",
                        open: true,
                    });
                });
            };
            retrieveEl();
        }
    }, [commerceHandling.itemAddedToCart]);

    useEffect(() => {
        if (cookieShown) {
            localStorage.setItem("cookieWasAccepted", cookieShown);
        }
    }, [cookieShown]);

    function closeHandler() {
        dispatch({ type: reducerActions.CLEAR });
        setMessage({});
        commerceHandling.removeItemAddedWarning();
        setCookieShown(true);
    }

    return <SnackbarContent body={body} closeHandler={closeHandler} />;
}

export default SnackBar;
