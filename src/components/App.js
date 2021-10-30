// Routing
import { Switch, Route } from "react-router-dom";

// Dependencies
import { useEffect, useContext } from "react";
import CommerceHandler from "./shared/commerce-context";

// Components
import Home from "./views/home/Home";
import Header from "./shared/Header";
import Products from "./views/products/Products";
import Cart from "./views/cart/Cart";
import SnackBar from "./shared/snackbar/Snackbar";
import CarouselSlider from "./views/carousel/Carousel";
import Checkout from "./views/checkout/Checkout";

// =====================================================
function App() {
    const commerceHandling = useContext(CommerceHandler);

    useEffect(() => {
        commerceHandling.fetchProducts();
        commerceHandling.fetchCart();
        
    }, []);

    return (
        <>
            <Header />

            <SnackBar />

            <Route path="/:pageNo*/cart">
                <Cart />
            </Route>

            <Switch>
                <Route path="/" exact>
                    <Home />
                    <CarouselSlider products={commerceHandling.products} />
                    <Products products={commerceHandling.products} />
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

                <Route exact path="/checkout">
                    <Checkout />
                </Route>
            </Switch>
        </>
    );
}

export default App;
