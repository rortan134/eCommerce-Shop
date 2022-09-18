import { useEffect, useState } from "react";
import { Container, Box, Grid } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import recentlyViewed from "../features/recentlyViewed/recentlyViewed";

function RecentlyViewed() {
    const recentProducts = recentlyViewed();

    useEffect(() => {
        console.log(recentProducts);
        // recentProducts.map((product) => console.log(product));
    }, []);

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

    return recentProducts.length >= 1 ? (
        <Container>{/* <Carousel responsive={responsive} keyBoardControl={true} draggable={false}></Carousel> */}</Container>
    ) : null;
}

export default RecentlyViewed;
