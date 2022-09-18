import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Button, Container, Divider, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import SwipeableViews from "react-swipeable-views";
import { constants } from "../../constants/commerce-constants";
import CommerceHandler from "../../contexts/commerce-context";
import { commerce } from "../../lib/commerce";

import recentlyViewed from "../../features/recentlyViewed/recentlyViewed";
import AddToCart from "../../components/AddToCart";
import ImageDisplay from "../../components/ImageDisplay";

const useStyles = makeStyles({
    component__wrapper: {
        background: "#ffffff",
        maxWidth: "none",
        padding: "0",
        height: "100%",
        overflowY: "auto",
        position: "relative",
        top: "0",
    },
    product__container: {
        width: "100%",
        padding: "2rem 0",
    },
    product__image: {
        "& img": {
            maxHeight: "230px !important",
            objectFit: "contain",
            objectPosition: "center",
        },
        "& div": {
            maxWidth: "500px",
        },
    },
    actionButton: {
        backgroundColor: "rgba(32, 36, 49, 1)",
        color: "rgba(255, 255, 255, 0.8)",
        padding: "0",
        minWidth: "30px",
        height: "30px",
        marginRight: "0.8em",
        borderRadius: "0",
    },
    actionPaymentOptions: {
        boxShadow: "0px 15px 25px rgba(0,0,0,0.3)",
        padding: ".8rem 3.5rem",
        margin: "0 1.5em",
        borderRadius: "0",
    },
    product__description__container: {
        maxHeight: "none",
    },
    product__content: {
        padding: "2.5% 2rem",
    },
    image__portal: {
        position: "absolute",
        zIndex: "999",
        height: "340px",
        "& div": {
            border: "solid 1px rgba(0,0,0,.4)",
            borderRadius: "6px",
            background: "#ffffff",
            height: "100% !important",
        },
    },
});

function ProductView({ match }) {
    const styles = useStyles();
    const commerceHandling = useContext(CommerceHandler);

    const [activeImgUrl, setActiveImgUrl] = useState();
    const [productQty, setProductQty] = useState(1);
    const [product, setProduct] = useState({});
    const [value, setValue] = useState(0);
    const [invalidProduct, setProductIsInvalid] = useState(false);

    useEffect(() => {
        try {
            commerce.products.retrieve(match.params.permalink, { type: "permalink" }).then((currProduct) => {
                setProduct(currProduct);
            });
        } catch (error) {
            setProductIsInvalid(true);
            console.log(error);
        }
    }, [match.params.permalink]);

    useEffect(() => {
        setActiveImgUrl(product.assets ? product.assets[0] : null);
    }, [product]);

    const increaseQty = () => {
        if (productQty >= product.inventory.available && product.inventory.managed) {
            return;
        } else if (productQty < 10) setProductQty((qty) => qty + 1);
    };

    const decreaseQty = () => {
        if (productQty !== 1) {
            setProductQty((qty) => qty - 1);
        }
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
                {value === index && (
                    <Container sx={{ p: 3 }} className={styles.product__description__container}>
                        <>{children}</>
                    </Container>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            "aria-controls": `full-width-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const zoomHintComponent = () => (
        <>
            <ZoomInIcon
                style={{
                    position: "absolute",
                    right: "15px",
                    bottom: "0",
                    background: "rgba(245, 246, 244, 0.3)",
                    padding: ".2rem",
                }}
            />
        </>
    );

    const lastUpdated = new Date(product.updated * 1000).toLocaleString(`${navigator.language}`).split(" ")[0];

    return (
        <>
            {invalidProduct ? (
                <Redirect to="/404" />
            ) : (
                <>
                    <Container className={styles.component__wrapper}>
                        <Grid container className={styles.product__container}>
                            <Grid container item>
                                <Grid className={styles.product__content} item container xs={12} md={6} justifyContent="center" alignItems="center">
                                    <Grid item xs={12}>
                                        <ReactImageMagnify
                                            className={styles.product__image}
                                            {...{
                                                smallImage: {
                                                    alt: `${product ? product.name : null}`,
                                                    src: `${activeImgUrl ? activeImgUrl.url : null}`,
                                                    isFluidWidth: true,
                                                },
                                                largeImage: {
                                                    width: activeImgUrl ? activeImgUrl.image_dimensions.width : null,
                                                    height: activeImgUrl ? activeImgUrl.image_dimensions.height : null,
                                                    src: `${activeImgUrl ? activeImgUrl.url : null}`,
                                                },
                                                enlargedImagePortalId: "magnified__portal",
                                                shouldUsePositiveSpaceLens: true,
                                                isHintEnabled: true,
                                                shouldHideHintAfterFirstActivation: false,
                                                hintComponent: zoomHintComponent,
                                            }}
                                        />
                                    </Grid>
                                    <Grid container direction="row" justifyContent="center" alignItems="center" className="activeImgWrapper">
                                        <ImageDisplay product={product} dispatch={setActiveImgUrl} />
                                    </Grid>
                                </Grid>
                                <Grid
                                    className={styles.product__content}
                                    container
                                    direction="column"
                                    item
                                    xs={12}
                                    md={6}
                                    justifyContent="space-around"
                                >
                                    <div id="magnified__portal" className={styles.image__portal} />
                                    <Grid item container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                        <Typography variant="h4">{product ? product.name : null}</Typography>
                                        <IconButton style={{ background: "#F5F6F4" }} size="large">
                                            <FavoriteBorderIcon style={{ color: "#2d3245" }} />
                                        </IconButton>
                                    </Grid>
                                    <Typography
                                        align="left"
                                        style={{ color: "#333333", marginBottom: "1.25rem", fontWeight: "300" }}
                                        dangerouslySetInnerHTML={{
                                            __html: product ? product.description : null,
                                        }}
                                    />
                                    <Typography gutterBottom variant="h6">
                                        {product.price ? product.price.formatted_with_symbol : null}
                                    </Typography>
                                    <Grid container item alignItems="center" wrap="nowrap" style={{ marginBottom: "1.5rem" }}>
                                        <Button
                                            onClick={() => {
                                                decreaseQty();
                                            }}
                                            className={styles.actionButton}
                                            type="button"
                                            size="small"
                                        >
                                            -
                                        </Button>
                                        <Typography style={{ marginRight: "0.8em" }}>{productQty}</Typography>
                                        <Button
                                            onClick={() => {
                                                increaseQty();
                                            }}
                                            className={styles.actionButton}
                                            type="button"
                                            size="small"
                                        >
                                            +
                                        </Button>
                                        <AddToCart product={product} amount={productQty} />
                                    </Grid>
                                    {product.inventory && product.inventory.managed && product.inventory.available <= 10 ? (
                                        <Typography variant="subtitle2" style={{ color: "rgba(255,0,0,1)" }}>
                                            Only {product.inventory.available} left.
                                        </Typography>
                                    ) : (
                                        <Typography variant="body2" style={{ color: "#007600" }}>
                                            In Stock.
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container>
                        <Tabs scrollButtons="auto" value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
                            {product.attributes
                                ? product.attributes.map((attribute, index) =>
                                      constants.attributesExceptions.includes(attribute.id) === false ? (
                                          <Tab key={attribute.id} label={attribute.name} {...a11yProps(index)} />
                                      ) : null
                                  )
                                : null}
                        </Tabs>
                        <Divider style={{ margin: "1rem 0 2.5rem 0" }} variant="fullWidth" />
                        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                            <div>
                                {product.attributes
                                    ? product.attributes.map((attribute, index) => (
                                          <TabPanel key={attribute.id} value={value} index={index}>
                                              <Typography gutterBottom variant="h6">
                                                  {attribute.name}
                                              </Typography>
                                              <Typography
                                                  align="left"
                                                  variant="subtitle1"
                                                  style={{
                                                      color: "#333333",
                                                      marginBottom: "1.25rem",
                                                      fontWeight: "300",
                                                  }}
                                                  dangerouslySetInnerHTML={{
                                                      __html: attribute.value,
                                                  }}
                                              />
                                              <br />
                                              <Typography style={{ color: "rgba(0,0,0,.4)" }} variant="caption">
                                                  Last updated: {lastUpdated}
                                              </Typography>
                                          </TabPanel>
                                      ))
                                    : null}
                            </div>
                        </SwipeableViews>
                    </Container>
                </>
            )}
        </>
    );
}

export default ProductView;
