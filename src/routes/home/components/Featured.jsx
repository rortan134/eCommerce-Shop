import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CommerceHandler from "../../../contexts/commerce-context";
import makeStyles from "@mui/styles/makeStyles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Product from "../../../components/Product";

const useStyles = makeStyles({
    carousel__container: {
        paddingBottom: "2em",
    },
    custom__dots: {
        "& button": {
            border: "none",
            marginRight: "8px",
        },
        "& .react-multi-carousel-dot--active button": {
            background: "rgba(0, 0, 0, 0.6)",
        },
    },
});

function Featured() {
    const styles = useStyles();
    const commerceHandling = useContext(CommerceHandler);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1400 },
            items: 5,
            slidesToSlide: 3,
        },
        desktop: {
            breakpoint: { max: 1400, min: 1024 },
            items: 4,
            slidesToSlide: 2,
        },
        tablet: {
            breakpoint: { max: 1024, min: 700 },
            items: 3,
        },
        external: {
            breakpoint: { max: 700, min: 550 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 550, min: 0 },
            items: 1,
        },
    };

    return (
        <Container className={styles.carousel__wrapper}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="defaultMediumTitle" gutterBottom>
                    Featured
                </Typography>
                <Button component={Link} to="/products/">
                    See all
                </Button>
            </Grid>
            <Carousel
                responsive={responsive}
                ssr={true}
                dotListClass={styles.custom__dots}
                autoPlay={false}
                showDots={true}
                draggable={false}
                transitionDuration={500}
                containerClass={styles.carousel__container}
            >
                {commerceHandling.products.length >= 1
                    ? commerceHandling.products.map((product) => <Product product={product} key={product.id} />)
                    : [...Array(6)].map((e, i) => <Product key={i} />)}
            </Carousel>
        </Container>
    );
}

export default Featured;
