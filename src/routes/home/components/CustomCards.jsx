import Carousel from "react-multi-carousel";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, CardActionArea, Button, Grid, Container } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";

import useProducts from "../../../hooks/useProducts";
import styles from "./styles.module.scss";

const useStyles = makeStyles({
    card__wrapper: {
        height: "32vh",
        display: "flex",
        boxShadow: "0 0 0 transparent",
        marginRight: "0.6rem",
        "@media (max-width: 1000px)": {
            height: "40vh",
        },
    },
    action__area: {
        position: "relative",
        padding: "1rem 1.5rem",
        background: "rgba(0, 0, 0, 0.05)",
    },
    action__area__grid: {
        height: "100%",
        "@media (max-width: 1000px)": {
            flexDirection: "column-reverse !important",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
        },
    },
    card__container: {
        "& ul": {
            "& li:nth-child(even)": {
                "& .card__image__wrap": {
                    transform: "scaleX(-1)",
                },
                "& .action__area__grid": {
                    flexDirection: "row-reverse",
                },
            },
        },
    },
    card__image__wrap: {
        display: "flex",
        alignItems: "end",
        height: "100%",
        "@media (max-width: 1000px)": {
            alignItems: "center",
            justifyContent: "center",
            height: "80%",
        },
        "& img": {
            display: "block",
            height: "80%",
            width: "auto",
            objectFit: "contain",
            objectPosition: "center",
        },
    },
    custom__arrow: {
        position: "absolute",
        height: "100%",
        width: "30px",
        background: "rgba(255,255,255,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        right: "0.55rem",
        cursor: "pointer",
    },
    card__actions: {
        color: "rgb(0, 0, 0)",
        marginTop: "2rem",
        fontWeight: "600",
        padding: "0 0 0 1.5rem",
        "& button": {
            padding: "0",
            color: "rgb(0, 0, 0)",
        },
    },
});

function CustomCards() {
    const classes = useStyles();
    const history = useHistory();

    const products = useProducts("category_slug", "new-in");

    const [productsLength, setProductsLength] = useState({});
    const [responsive, setResponsive] = useState({});

    useEffect(() => {
        if (products && products.length >= 2) {
            setProductsLength({
                breakpoint: { max: 4000, min: 900 },
                items: 2,
            });
        } else
            setProductsLength({
                breakpoint: { max: 4000, min: 900 },
                items: 1,
            });
    }, [products]);

    useEffect(() => {
        setResponsive({
            desktop: productsLength ? productsLength : null,
            mobile: {
                breakpoint: { max: 900, min: 0 },
                items: 1,
            },
        });
    }, [productsLength]);

    const CustomRightArrow = ({ onClick }) => {
        return (
            <button className={classes.custom__arrow} onClick={() => onClick()}>
                <ArrowForward />
            </button>
        );
    };
    const CustomLeftArrow = ({ onClick }) => {
        return (
            <button style={{ left: "0" }} className={classes.custom__arrow} onClick={() => onClick()}>
                <ArrowBack />
            </button>
        );
    };

    return (
        <div className={styles.carousel__wrapper}>
            <Container className={styles.carousel_content}>
                <div>
                    {products ? (
                        <Carousel
                            responsive={responsive}
                            ssr={true}
                            autoPlay={false}
                            draggable={false}
                            transitionDuration={500}
                            customRightArrow={<CustomRightArrow />}
                            customLeftArrow={<CustomLeftArrow />}
                            containerClass={classes.card__container}
                        >
                            {products
                                ? products.map((product) => (
                                      <Paper
                                          className={`custom__card__wrapper ${classes.card__wrapper}`}
                                          style={{
                                              background: `url(${product.attributes
                                                  .map((attribute) =>
                                                      attribute.id === "attr_LkpnNwAqawmXB3" && attribute.value !== null ? attribute.value : ""
                                                  )
                                                  .join("")})`,
                                          }}
                                          key={product.id}
                                      >
                                          <CardActionArea
                                              className={classes.action__area}
                                              component="span"
                                              onClick={() => {
                                                  let path = `/products/${product.permalink}`;
                                                  history.push(path);
                                              }}
                                          >
                                              <Grid
                                                  container
                                                  justifyContent="space-between"
                                                  className={`action__area__grid ${classes.action__area__grid}`}
                                              >
                                                  <Grid item zeroMinWidth md={4} xs={6} className={`card__image__wrap ${classes.card__image__wrap}`}>
                                                      <img src={product.image.url} alt={product.name} />
                                                  </Grid>
                                                  <Grid
                                                      container
                                                      item
                                                      md={8}
                                                      xs={12}
                                                      direction="column"
                                                      className={`card__actions ${classes.card__actions}`}
                                                  >
                                                      <Grid item xs={12}>
                                                          <Typography variant="h5">{product.name}</Typography>
                                                          <Button
                                                              variant="text"
                                                              onClick={() => {
                                                                  let path = `/products/${product.permalink}`;
                                                                  history.push(path);
                                                              }}
                                                          >
                                                              Discover
                                                          </Button>
                                                      </Grid>
                                                  </Grid>
                                              </Grid>
                                          </CardActionArea>
                                      </Paper>
                                  ))
                                : null}
                        </Carousel>
                    ) : null}
                </div>
            </Container>
        </div>
    );
}

export default CustomCards;
