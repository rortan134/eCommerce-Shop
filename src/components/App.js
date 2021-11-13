// Routing
import { Switch, Route, useLocation } from "react-router-dom";

// Dependencies
import { useEffect, useContext, useState } from "react";
import CommerceHandler from "./shared/commerce-context";

// Components
import Home from "./views/home/Home";
import Header from "./shared/Header";
import Products from "./views/products/Products";
import Cart from "./views/cart/Cart";
import SnackBar from "./shared/snackbar/Snackbar";
import CarouselSlider from "./views/carousel/Carousel";
import Checkout from "./views/checkout/Checkout";
import ProductView from "./views/products/productView/ProductView";
import NotFound from "./views/NotFound";

// =====================================================
function App() {
    const commerceHandling = useContext(CommerceHandler);

    useEffect(() => {
        commerceHandling.fetchProducts();
        commerceHandling.fetchCart();
    }, []);

    return (
        <>
            {/* Utility Components */}
            <Header />
            <SnackBar />

            {/* Main Components */}
            <Switch>
                <Route path="/:pageNo*/cart" component={Cart} />
                
                <Route path="/product/:permalink" exact component={ProductView} />

                <Route path="/" exact>
                    <Home />
                    <CarouselSlider />
                    <Products />
                </Route>

                <Route path="/news">
                    <h1>news</h1>
                </Route>

                <Route path="/products">
                    <h1>our products</h1>
                </Route>

                <Route path="/favorites">
                    <h1>favorites</h1>
                </Route>

                <Route path="/checkout" exact component={Checkout} onLeave={() => commerceHandling.setStep(0)} />

                
                <Route path="*" component={NotFound} />
            </Switch>
        </>
    );
}

export default App;
