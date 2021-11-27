import Carousel from "react-multi-carousel";
import { useContext, useState, useEffect, useLayoutEffect } from "react";
import CommerceHandler from "../../shared/commerce-context";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import {
    Paper,
    Typography,
    CardActionArea,
    CardContent,
    ButtonGroup,
    Button,
    Grid,
    Container,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import styles from "./styles.module.scss";

const useStyles = makeStyles({
    card__wrapper: {
        height: "30vh",
        display: "flex",
        boxShadow: "0 0 0 transparent",
        background: "cyan",
        padding: "0 1rem",
        marginRight: "0.6rem",
    },
    card__container: {
        "& ul": {
            "& li:nth-child(even)": {
                "& .card__image__wrap": {
                    transform: "scaleX(-1)",
                }
            },
        },
    },
    card__image__wrap: {
        display: "flex",
        alignItems: "end",
        height: "100%",
        "& img": {
            display: "block",
            height: "80%",
            width: "auto",
            objectFit: "contain",
            objectPosition: "center",
        },
    },
    card__actions: {
        position: "absolute",
    },
});

function CustomCards() {
    const classes = useStyles();
    const commerceHandling = useContext(CommerceHandler);
    const history = useHistory();

    const [productsLength, setProductsLength] = useState({});
    const [newProducts, setNewProducts] = useState([]);
    const [responsive, setResponsive] = useState({});
    const [newsInSlug, setNewsInSlug] = useState("new-in");

    useEffect(() => {
        const filterNewProducts = () => {
            setNewProducts([]);
            commerceHandling.products.map((product) =>
                product.categories.map((category) =>
                    category.slug === newsInSlug ? setNewProducts((prevArray) => [...prevArray, product]) : null
                )
            );
        };
        filterNewProducts();
    }, [commerceHandling.products]);

    useEffect(() => {
        if (newProducts && newProducts.length >= 2) {
            setProductsLength({
                breakpoint: { max: 4000, min: 0 },
                items: 2,
            });
        } else
            setProductsLength({
                breakpoint: { max: 4000, min: 0 },
                items: 1,
            });
    }, [newProducts]);

    useEffect(() => {
        setResponsive({
            desktop: productsLength ? productsLength : null,
            mobile: productsLength ? productsLength : null,
        });
    }, [productsLength]);

    const [addToCartClicked, clickAddToCart] = useState();

    function addToCartClickedHandler(itemId) {
        clickAddToCart(itemId);
    }

    return (
        <div className={styles.carousel__wrapper}>
            <Container className={styles.carousel_content}>
                {newProducts ? (
                    <Carousel
                        responsive={responsive}
                        ssr={true}
                        autoPlay={false}
                        showDots={true}
                        draggable={false}
                        transitionDuration={500}
                        containerClass={classes.card__container}
                    >
                        {newProducts.map((product) => (
                            <Paper className={classes.card__wrapper} key={product.id}>
                                <CardActionArea
                                    component="span"
                                    onClick={() => {
                                        let path = `/products/${product.permalink}`;
                                        history.push(path);
                                    }}
                                >
                                    <div className={`card__image__wrap ${classes.card__image__wrap}`}>
                                        <img src={product.media.source} alt={product.name} />
                                    </div>
                                    <Container className={classes.card__actions}>
                                        <Button
                                            variant="text"
                                            onClick={() => {
                                                let path = `/products/${product.permalink}`;
                                                history.push(path);
                                            }}
                                        >
                                            Discover
                                        </Button>
                                    </Container>
                                </CardActionArea>
                            </Paper>
                        ))}
                    </Carousel>
                ) : null}
            </Container>
        </div>
    );
}

export default CustomCards;
