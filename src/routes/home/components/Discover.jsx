import { Box, Button, Container, Fade, Grid, Typography, Tabs, Tab, Skeleton } from "@mui/material";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import makeStyles from "@mui/styles/makeStyles";
import { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import useProducts from "../../../hooks/useProducts";
import Product from "../../../components/Product";

import CommerceHandler from "../../../contexts/commerce-context";
import getPalette from "../../../utils/getPalette";

const useStyles = makeStyles({
    image__container: {
        position: "relative",
        backdropFilter: "blur(5vw)",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0,0,0,.3)",
    },
    image__backdisplay: {
        position: "absolute",
        height: "98%",
        width: "100%",
        borderRadius: "10px",
        zIndex: "-1",
        top: "3vw",
        left: "-2.5vw",
        background: "rgba(0,0,0,.05)",
    },
    discover__image: {
        height: "100%",
        width: "-webkit-fill-available",
        borderRadius: "10px",
        objectFit: "cover",
        display: "block",
    },
    category__button: {
        paddingBottom: "4px",
        position: "relative",
        "&:after": {
            content: "''",
            background: "linear-gradient(300deg, transparent, rgba(31, 31, 31, 0.9), transparent)",
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "1px",
        },
    },
    discover__carousel: {
        zIndex: "1",
        left: "0",
        top: "0",
        height: "100%",
        width: "100%",
        overflow: "visible",
        "&:after": {
            content: "''",
            position: "absolute",
            width: "15%",
            height: "100%",
            zIndex: "2",
            right: "0",
            top: "0",
            background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 1))",
        },
        "@media only screen and (max-width: 1200px)": { overflow: "hidden" },
    },
    discover__carousel__active: {
        overflow: "visible !important",
        "&:after": {
            content: "''",
            width: "25%",
            right: "-20%",
        },
    },
    discover__content__grid: {
        background: "#fafafa",
        borderRadius: "20px",
        paddingRight: "1rem",
        "@media only screen and (max-width: 1200px)": { marginLeft: "0 !important" },
    },
    custom__arrows: {
        position: "absolute",
        left: "45vw",
        top: "calc(-12% - 0.35em)",
        zIndex: "1",
    },
});

function Discover() {
    const styles = useStyles();
    const commerceHandling = useContext(CommerceHandler);

    const [value, setValue] = useState(0);
    const [transition, setTransition] = useState(false);

    const [activeCategory, setActiveCategory] = useState();
    const [currProducts, setCurrProducts] = useState([]);
    const { products, error } = useProducts("category_slug", activeCategory ? activeCategory.slug : null);

    const palette = getPalette(activeCategory ? activeCategory.assets[0].url : null);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 2000 },
            items: 3,
            partialVisibilityGutter: 20,
        },
        desktop: {
            breakpoint: { max: 2000, min: 1200 },
            items: 2,
            partialVisibilityGutter: 20,
        },
        tablet: {
            breakpoint: { max: 1200, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    useEffect(() => {
        if (commerceHandling.productCategories) setActiveCategory(commerceHandling.productCategories[0]);
    }, [commerceHandling.productCategories]);

    useEffect(() => {
        if (error) console.error(error);
        if (products) setCurrProducts(products);
    }, [products, error]);

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            "aria-controls": `vertical-tabpanel-${index}`,
        };
    }

    const CustomArrows = ({ next, previous, ...rest }) => {
        const {
            carouselState: { currentSlide },
        } = rest;

        useEffect(() => {
            if (currentSlide > 0) {
                setTransition(true);
            } else setTransition(false);
        }, [currentSlide]);

        return (
            <Box className={styles.custom__arrows}>
                <Button
                    style={currentSlide === 0 ? { border: "1px solid rgba(0,0,0,0.2)", color: "rgba(0,0,0,0.2)" } : { border: "1px solid" }}
                    onClick={() => previous()}
                    sx={{ borderRadius: "50%", margin: ".3rem", width: "45px", height: "45px", minWidth: "45px" }}
                >
                    <KeyboardArrowLeft />
                </Button>
                <Button
                    onClick={() => next()}
                    sx={{ borderRadius: "50%", margin: ".3rem", border: "1px solid", width: "45px", height: "45px", minWidth: "45px" }}
                >
                    <KeyboardArrowRight />
                </Button>
            </Box>
        );
    };

    return (
        <>
            <Container>
                <Typography variant="defaultMediumTitle" gutterBottom>
                    Discover what fits best for you
                </Typography>
                <Grid container alignItems="center" justifyContent="space-between" wrap="nowrap">
                    <Grid item xs="0" sm="0" md="0" lg={3}>
                        <Fade in={!transition}>
                            <Box className={styles.image__container}>
                                {activeCategory ? (
                                    <Fade in={true}>
                                        <img className={styles.discover__image} src={activeCategory.assets[0].url} alt={activeCategory.name} />
                                    </Fade>
                                ) : (
                                    <Skeleton />
                                )}
                                <div
                                    className={styles.image__backdisplay}
                                    style={palette ? { boxShadow: `0 10px 20px rgba(${palette.Muted.rgb.join()}, 0.3)` } : {}}
                                />
                            </Box>
                        </Fade>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        alignItems="center"
                        direction="row"
                        className={styles.discover__content__grid}
                        style={
                            !transition
                                ? {
                                      marginLeft: "2rem",
                                      transition: "background 0.3s ease-in",
                                  }
                                : { background: "transparent", transition: "background 0.3s ease-in" }
                        }
                    >
                        <Grid
                            item
                            xs={3}
                            style={!transition ? { transition: "width 0.5s ease-in" } : { width: "0px", transition: "width 0.5s ease-in" }}
                        >
                            <Box>
                                <Fade in={!transition}>
                                    <Tabs
                                        orientation="vertical"
                                        variant="scrollable"
                                        value={value}
                                        aria-label="Product category tabs"
                                        sx={{ borderRight: 1, borderColor: "divider", minWidth: "240px" }}
                                    >
                                        {Object.entries(commerceHandling.productCategories).map(([key, category]) => (
                                            <Tab
                                                onClick={() => {
                                                    setActiveCategory(category);
                                                    setValue(parseInt(key));
                                                    if (activeCategory !== category) setCurrProducts([]);
                                                }}
                                                key={key}
                                                label={category.name}
                                                {...a11yProps(key)}
                                                className={styles.category__button}
                                                sx={{
                                                    margin: "0.6rem",
                                                    padding: "0.5rem 0.4rem",
                                                }}
                                            />
                                        ))}
                                    </Tabs>
                                </Fade>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box
                                sx={{
                                    position: "relative",
                                    height: "100%",
                                    width: "100%",
                                    padding: "1rem",
                                    borderRadius: "20px",
                                }}
                            >
                                <Carousel
                                    className={`${!transition ? "" : styles.discover__carousel__active} ${styles.discover__carousel}`}
                                    renderButtonGroupOutside={true}
                                    customButtonGroup={<CustomArrows />}
                                    draggable={false}
                                    arrows={false}
                                    partialVisible={true}
                                    responsive={responsive}
                                    ssr={true}
                                    keyBoardControl={true}
                                >
                                    {currProducts.length >= 1
                                        ? currProducts.map((product) => <Product key={product.id} product={product} />)
                                        : [...Array(5)].map((e, i) => <Product key={i} />)}
                                </Carousel>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
export default Discover;
