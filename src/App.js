// Routing
import { Switch, Route } from "react-router-dom";

// Pages
import Home from "./routes/home/Home";
import Products from "./routes/products/Products";
import Cart from "./routes/cart/Cart";
import CustomCards from "./routes/home/components/CustomCards";
import NewsCarousel from "./routes/home/components/NewsCarousel";
import Checkout from "./routes/checkout/Checkout";
import ProductView from "./routes/product-view/ProductView";
import NotFound from "./routes/NotFound";

// Components
import Header from "./components/header/Header";
import SnackBar from "./components/snackbar/Snackbar";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <Header />
            <SnackBar />

            <Switch>
                <Route path="/cart" component={Cart} />
                <Route path="/products/:permalink" exact component={ProductView} />
                <Route path="/" exact>
                    <Home />
                    {/* remove these and insert into home component */}
                    <CustomCards />
                    <NewsCarousel />
                    {/* ------------ */}
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
                <Route path="/checkout" exact component={Checkout} />
                <Route path="*" component={NotFound} />
            </Switch>

            <Footer />
        </>
    );
}

export default App;
