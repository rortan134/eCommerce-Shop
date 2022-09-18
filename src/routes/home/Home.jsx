import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Container, Fade, Grid, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useContext, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";

import ProgressBar from "../../components/ProgressBar";
import { constants } from "../../constants/commerce-constants";
import CommerceHandler from "../../contexts/commerce-context";

import CustomCards from "./components/CustomCards";
import Discover from "./components/Discover";
import Landing from "./components/Landing";
import Featured from "./components/Featured";
import Promote from "../../components/Promote";

const useStyles = makeStyles({
    root: {
        width: "100%",
        "& .orbsBg": {
            maxHeight: "1200px",
            height: "50vw",
            transform: "translateY(-50%) scale(1.5)",
            position: "absolute",
            width: "100% !important",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap",
            maxWidth: "100% !important",
            "& .orb__gradient": {
                width: "60%",
                height: "60%",
                borderRadius: "50%",
            },
            "& .orb__gradient__1": {
                background: "radial-gradient(circle at 10% 0,rgba(231,126,144,.5) 80%,hsla(0,0%,100%,0) 0)",
                mask: "radial-gradient(circle at 10% 0,rgba(231,126,144,.5) 45%,hsla(0,0%,100%,0) 70%)",
                WebkitMask: "radial-gradient(circle at 10% 0,rgba(231,126,144,.5) 45%,hsla(0,0%,100%,0) 70%)",
            },
            "& .orb__gradient__2": {
                background: "radial-gradient(circle,rgba(156,139,218,.42) 80%,hsla(0,0%,100%,0) 0)",
                mask: "radial-gradient(circle,rgba(156,139,218,.42) 30%,hsla(0,0%,100%,0) 70%)",
                WebkitMask: "radial-gradient(circle,rgba(156,139,218,.42) 30%,hsla(0,0%,100%,0) 70%)",
            },
            "& .orb__gradient__3": {
                background: "radial-gradient(circle at 90% 0,rgba(66, 74, 102, .65) 80%,hsla(0,0%,100%,0) 0)",
                mask: "radial-gradient(circle at 90% 0,rgba(66, 74, 102, .65) 45%,hsla(0,0%,100%,0) 70%)",
                WebkitMask: "radial-gradient(circle at 90% 0,rgba(66, 74, 102, .65) 45%,hsla(0,0%,100%,0) 70%)",
            },
        },
    },
});

function Home() {
    const styles = useStyles();
    const commerceHandling = useContext(CommerceHandler);

    const [products, setProduct] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);

    useEffect(() => {
        // Get products with the attribute "Show in landing page" checked
        commerceHandling.products
            ? commerceHandling.products.map((product) => {
                  product.attributes.map((attribute) =>
                      attribute.id === constants.landingId && attribute.value === true
                          ? setProduct((prevProducts) => [...prevProducts, product])
                          : null
                  );
              })
            : null;
    }, [commerceHandling.products]);

    const handleChangeIndex = (step) => {
        setCurrIndex(step);
    };

    const increaseIndex = () => {
        if (currIndex === products.length - 1) {
            setCurrIndex(0);
            return;
        }
        setCurrIndex((index) => index + 1);
    };

    const decreaseIndex = () => {
        if (currIndex === 0) return;
        setCurrIndex((index) => index - 1);
    };

    const ProductContainerComponent = ({ products, currIndex }) => {
        return products && products.length >= 1 ? (
            <Container sx={{ width: "100%", padding: "0 !important" }}>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={11}>
                        <SwipeableViews
                            enableMouseEvents
                            index={currIndex}
                            onChangeIndex={handleChangeIndex}
                            axis="y"
                            animateHeight
                            disableLazyLoading
                            resistance
                        >
                            {Object.values(products).map((product, i) => (
                                <div key={i} index={i} style={Object.assign({})}>
                                    <Fade in={true}>
                                        <div>
                                            <Landing product={product} />
                                        </div>
                                    </Fade>
                                </div>
                            ))}
                        </SwipeableViews>
                    </Grid>
                    <Grid container item xs={1} direction="column" justifyContent="space-between">
                        <IconButton
                            onClick={decreaseIndex}
                            style={
                                currIndex === 0 ? { background: "transparent" } : { background: "#ffffff", boxShadow: "0 10px 15px rgba(0,0,0, .05)" }
                            }
                            sx={{
                                background: "#ffffff",
                                padding: "0.1rem 1.3rem",
                                borderRadius: "20px",
                                width: "fit-content",
                                margin: "1rem 0",
                            }}
                        >
                            <KeyboardArrowUpIcon />
                        </IconButton>
                        <IconButton
                            onClick={increaseIndex}
                            style={
                                currIndex === products.length - 1
                                    ? { background: "transparent" }
                                    : { background: "#ffffff", boxShadow: "0 10px 15px rgba(0,0,0, .05)" }
                            }
                            sx={{
                                padding: "0.1rem 1.3rem",
                                borderRadius: "20px",
                                width: "fit-content",
                                margin: "1rem 0",
                            }}
                        >
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Container>
        ) : null;
    };

    return (
        <Box component="article" className={styles.root}>
            <Box className="orbsBg">
                <div className="orb__gradient orb__gradient__1" />
                <div className="orb__gradient orb__gradient__2" />
                <div className="orb__gradient orb__gradient__3" />
            </Box>
            <ProductContainerComponent products={products} currIndex={currIndex} />
            <ProgressBar duration={1500} dispatch={increaseIndex} />
            <CustomCards />
            <Featured />
            <Discover />
            <Promote />
        </Box>
    );
}
export default Home;
