import { useContext, useState } from "react";
import CommerceHandler from "../../shared/commerce-context";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink, useHistory } from "react-router-dom";
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
import CompareArrowsIcon from "@material-ui/icons/CompareArrowsOutlined";

import styles from "./styles.module.scss";

function NewsCarousel() {
    const commerceHandling = useContext(CommerceHandler);
    const history = useHistory();

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 2300 },
            items: 5,
            slidesToSlide: 3,
        },
        desktop: {
            breakpoint: { max: 2300, min: 1024 },
            items: 5,
            slidesToSlide: 2,
        },
        tablet: {
            breakpoint: { max: 1024, min: 550 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 550, min: 0 },
            items: 1,
        },
    };

    const [addToCartClicked, clickAddToCart] = useState();

    function addToCartClickedHandler(itemId) {
        clickAddToCart(itemId);
    }

    return (
        <div className={styles.carousel__wrapper}>
            <Container className={styles.carousel_content}>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    className={styles.carousel__title__container}
                >
                    <Typography className={styles.carousel__title} variant="h4">
                        News
                    </Typography>
                    <Button component={NavLink} to="/products/" className={styles.carousel__btn}>
                        See all
                    </Button>
                </Grid>
                <Carousel
                    responsive={responsive}
                    ssr={true}
                    autoPlay={false}
                    showDots={true}
                    draggable={false}
                    transitionDuration={500}
                    containerClass={styles.carousel__container}
                >
                    {commerceHandling.products.map((product) => (
                        <Paper className={styles.carousel__card} key={product.id} item xs={12} sm={6}>
                            <CardActionArea
                                className={styles.carousel__cardActionArea}
                                onClick={() => {
                                    let path = `/products/${product.permalink}`;
                                    history.push(path);
                                }}
                            >
                                <div className={styles.carousel__cardImageWrapper}>
                                    <img src={product.media.source} alt="product" />
                                </div>
                                <CardContent className={styles.carousel__content}>
                                    <Typography
                                        style={{ display: "inline", color: "rgb(45, 85, 158)" }}
                                        gutterBottom
                                        variant="subtitle2"
                                    >
                                        {product.price.raw + " €"}
                                    </Typography>
                                    <Typography variant="body2">{product.name}</Typography>
                                    <Typography
                                        dangerouslySetInnerHTML={{
                                            __html: product.description,
                                        }}
                                        align="left"
                                        style={{ color: "#555555", fontWeight: "300" }}
                                        variant="caption"
                                        nowrap
                                    />
                                </CardContent>
                            </CardActionArea>
                            <ButtonGroup className={styles.carousel__card__actionButtons}>
                                <Button>
                                    <FavoriteBorderIcon />
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (!commerceHandling.itemAddedToCart) {
                                            addToCartClickedHandler(product.id);
                                            commerceHandling.addToCart(product.id, 1);
                                        } else return;
                                    }}
                                >
                                    {addToCartClicked === product.id ? "Added To Cart!" : "Add To Cart"}
                                </Button>
                                <Button>
                                    <CompareArrowsIcon />
                                </Button>
                            </ButtonGroup>
                        </Paper>
                    ))}
                </Carousel>
            </Container>
        </div>
    );
}

export default NewsCarousel;
