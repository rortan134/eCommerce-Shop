// Routing
import { Switch, Route } from "react-router-dom";

// Dependencies
import { useEffect, useContext, useCallback } from "react";
import CommerceHandler from "./shared/commerce-context";

// Components
import Home from "./views/home/Home";
import Header from "./shared/components/Header";
import Products from "./views/products/Products";
import Cart from "./views/cart/Cart";
import SnackBar from "./shared/components/Snackbar";
import CustomCards from "./views/carousel/CustomCards";
import NewsCarousel from "./views/carousel/NewsCarousel";
import Checkout from "./views/checkout/Checkout";
import ProductView from "./views/products/productView/ProductView";
import Footer from "./shared/components/Footer";
import NotFound from "./views/NotFound";

function App() {
    const commerceHandling = useContext(CommerceHandler);

    const fetchCommerce = useCallback(() => {
        commerceHandling.fetchProducts();
        commerceHandling.fetchCategories();
        commerceHandling.fetchCart();
        commerceHandling.fetchMerchant();
    }, []);

    useEffect(() => {
        fetchCommerce();
    }, [fetchCommerce]);

    return (
        <>
            {/* Utility Components */}
            <Header />
            <SnackBar />

            {/* Main Components */}
            <Switch>
                <Route path="/cart" component={Cart} />

                <Route path="/products/:permalink" exact component={ProductView} />

                <Route path="/" exact>
                    <Home />
                    <CustomCards />
                    <NewsCarousel />
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

            <Footer />
        </>
    );
}

export default App;
