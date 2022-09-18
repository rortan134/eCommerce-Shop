import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { Route, Switch } from "react-router-dom";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import SnackBar from "./components/snackbar/Snackbar";
import Cart from "./routes/cart/Cart";
import Checkout from "./routes/checkout/Checkout";
import Home from "./routes/home/Home";
import NotFound from "./routes/NotFound";
import ProductView from "./routes/product-view/ProductView";
import Products from "./routes/products/Products";
import RecentlyViewed from "./components/RecentlyViewed.jsx";

let theme = createTheme({
    palette: {
        primary: {
            main: "#222222",
            light: "#343434",
        },
        secondary: {
            main: "#4875ca",
            contrastBg: "#2d3245",
            contrastText: "#ffffff",
        },
        bg: {
            lightBg: "#424a66",
            contrastBg: "#2d3245",
        },
        black: {
            main: "#000",
        },
    },
});

theme = createTheme(theme, {
    typography: {
        defaultTitle: {
            color: theme.palette.primary.main,
            fontWeight: "700",
            marginBottom: "1.5rem",
            fontSize: "3rem",
            lineHeight: "1.235",
            letterSpacing: "0.00735em",
            display: "block",
        },
        contrastTitle: {
            color: theme.palette.secondary.main,
            fontWeight: "700",
            margin: "1rem 0",
            fontSize: "3rem",
            lineHeight: "1.235",
            letterSpacing: "0.00735em",
            display: "block",
        },
        defaultMediumTitle: {
            color: theme.palette.primary.main,
            fontWeight: "700",
            fontSize: "2rem",
            lineHeight: "1.6",
            letterSpacing: "0.0075em",
            display: "block",
        },
        defaultBody: {
            color: theme.palette.primary.main,
            fontWeight: "700",
            fontSize: "1.5rem",
            lineHeight: "1.6",
            letterSpacing: "0.0075em",
            display: "block",
        },
        defaultSubtitle: {
            color: theme.palette.primary.light,
            fontWeight: "300",
            fontSize: "1rem",
            lineHeight: "1.75",
            letterSpacing: "0.00938em",
            display: "block",
        },
        contrastSubtitle: {
            color: theme.palette.secondary.main,
            fontWeight: "400",
            fontSize: "1rem",
            lineHeight: "1.75",
            letterSpacing: "0.00938em",
            display: "block",
        },
        boldSubtitle: {
            color: theme.palette.primary.light,
            fontWeight: "600",
            fontSize: ".90rem",
            lineHeight: "1.75",
            letterSpacing: "0.01em",
            display: "block",
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "outlined" },
                    style: {
                        background: "transparent",
                        color: theme.palette.primary.main,
                        border: `2px solid ${theme.palette.bg.contrastBg}`,
                        boxShadow: "0px 15px 25px rgba(0,0,0,0.3)",
                        padding: ".8rem 3.5rem",
                        borderRadius: "0",
                    },
                },
                {
                    props: { variant: "contained" },
                    style: {
                        background: theme.palette.secondary.contrastBg,
                        color: theme.palette.secondary.contrastText,
                        boxShadow: "0px 15px 25px rgba(0,0,0,0.3)",
                        padding: ".8rem 3.5rem",
                        borderRadius: "0",
                    },
                },
                {
                    props: { variant: "contained", size: "small" },
                    style: {
                        background: theme.palette.secondary.contrastBg,
                        color: theme.palette.secondary.contrastText,
                        boxShadow: "0px 10px 15px rgba(0,0,0,0.3)",
                        padding: ".4rem 1.5rem",
                    },
                },
            ],
        },
        MuiContainer: {
            defaultProps: {
                component: "section",
            },
            styleOverrides: {
                root: {
                    width: "90%",
                    padding: "5% 0 2rem 0",
                    [theme.breakpoints.down("sm")]: {
                        width: "100%",
                        padding: "7% 1.5rem",
                    },
                    [theme.breakpoints.up("lg")]: {
                        maxWidth: "1700px",
                    },
                },
            },
        },
    },
});

let responsiveTheme = responsiveFontSizes(theme);

function App() {
    return (
        <>
            <ThemeProvider theme={responsiveTheme}>
                <Header />
                <SnackBar />
                <Switch>
                    <Route path="/products/:permalink" exact component={ProductView} />
                    <Route path="/" exact>
                        <Home />
                        <RecentlyViewed />
                    </Route>
                    <Route path="/products">
                        <Products />
                        <RecentlyViewed />
                    </Route>
                    <Route path="/favorites">
                        <h1>favorites</h1>
                        <RecentlyViewed />
                    </Route>
                    <Route path="/cart" exact>
                        <Cart />
                        <RecentlyViewed />
                    </Route>
                    <Route path="/checkout" exact component={Checkout} />
                    <Route path="*" component={NotFound} />
                </Switch>
                <Footer />
            </ThemeProvider>
        </>
    );
}

export default App;
