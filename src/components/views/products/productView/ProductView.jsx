import { useContext, useState, useEffect } from "react";
import CommerceHandler from "../../../shared/commerce-context";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import {
    Button,
    Radio,
    Typography,
    Container,
    FormControl,
    FormControlLabel,
    RadioGroup,
    IconButton,
    Grid,
    Tabs,
    Tab,
    Divider,
    Backdrop,
} from "@material-ui/core";

import { ArrowUpward } from "@material-ui/icons";

const useStyles = makeStyles({
    component__wrapper: {
        zIndex: "999",
        position: "absolute",
        background: "#ffffff",
        maxWidth: "none",
        padding: "0",
        maxHeight: "90vh",
        overflowY: "auto",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
        boxShadow: "0 0 15px rgba(0,0,0,.5)",
    },
    product__container: {
        width: "100%",
        height: "100%",
        padding: "0 0 2rem 0",
    },
    product__background: {
        position: "absolute",
        background: "linear-gradient(to right, rgba(32, 36, 49, .85) 40%, #fafafa 0%)",
        width: "100%",
        height: "calc(100% - 40px)",
        zIndex: "-2",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
        "@media (max-width: 960px)": {
            background: "none",
        },
    },
    product__wrapper: {
        paddingTop: "1em",
    },
    product__image: {
        width: "auto",
        minWidth: "0",
        maxHeight: "230px",
        minHeight: "0px",
        padding: "4% 2rem",
        background: "radial-gradient(rgba(0,0,0,.4) 0% , transparent 70%)",
        objectFit: "contain",
        objectPosition: "center",
    },
    imageDemoButton: {
        background: "#ffffff",
        width: "60px",
        height: "60px",
        borderRadius: "0 !important",
        margin: "4px",
        "& img": {
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%",
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
    product__info: {
        marginTop: "1rem",
        background: "#ffffff",
        width: "100%",
        maxWidth: "None",
        padding: ".8rem 10%",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
    },
    product__description__container: {
        maxHeight: "none",
    },
});

function ProductView() {
    const styles = useStyles();
    const commerceHandling = useContext(CommerceHandler);

    const [activeImgUrl, setActiveImgUrl] = useState();
    const [productQty, setProductQty] = useState(1);

    const product = commerceHandling.productInView;

    const increaseQty = () => {
        setProductQty(productQty + 1);
    };

    const decreaseQty = () => {
        if (productQty !== 1) {
            setProductQty(productQty - 1);
        }
    };

    useEffect(() => {
        setActiveImgUrl(product.media ? product.media.source : null);
    }, [product]);

    const [checkbox, setCheckbox] = useState("color1");
    const handleRadio = (event) => {
        setCheckbox(event.target.value);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Container sx={{ p: 3 }} className={styles.product__description__container}>
                        <Typography>{children}</Typography>
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

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Backdrop
            style={{
                zIndex: "1001",
                alignItems: "flex-start",
                top: "auto",
                bottom: "auto",
                width: "100%",
                height: "100%",
            }}
            open={commerceHandling.productViewIsOpen === true ? true : false}
        >
            <Container className={styles.component__wrapper}>
                <div
                    style={{
                        width: "100%",
                        height: "40px",
                        background: "rgba(32, 36, 49, .5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fafafa",
                        cursor: "pointer",
                    }}
                    onClick={() => commerceHandling.closeProductView()}
                >
                    <ArrowUpward />
                </div>
                <Grid container className={styles.product__container}>
                    <div className={styles.product__background} />
                    <Grid container item className={styles.product__wrapper}>
                        <Grid
                            className={styles.product__image__grid}
                            item
                            container
                            xs={12}
                            md={6}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <img
                                className={styles.product__image}
                                src={activeImgUrl ? activeImgUrl : null}
                                alt={product ? product.name : null}
                            />
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                className="activeImgWrapper"
                            >
                                {product.assets
                                    ? product.assets.map((images) => (
                                          <Grid key={images.id} item zeroMinWidth>
                                              <IconButton
                                                  onClick={() => setActiveImgUrl(images.url)}
                                                  className={styles.imageDemoButton}
                                              >
                                                  <img src={images.url} width="25px" alt="Buy now" />
                                              </IconButton>
                                          </Grid>
                                      ))
                                    : null}
                            </Grid>
                        </Grid>
                        <Grid
                            style={{ padding: "2.5% 2rem" }}
                            container
                            direction="column"
                            item
                            xs={12}
                            md={6}
                            justifyContent="space-around"
                        >
                            <Typography gutterBottom variant="h4">
                                {product ? product.name : null}
                            </Typography>
                            <Typography gutterBottom variant="h6">
                                {product.price ? product.price.formatted_with_symbol : null}
                            </Typography>
                            <FormControl component="fieldset" style={{ width: "100%", marginBottom: "3rem" }}>
                                <RadioGroup
                                    style={{ flexWrap: "nowrap" }}
                                    aria-label="colors"
                                    row
                                    className="radioGroup"
                                    name="colors"
                                    value={checkbox}
                                    onChange={handleRadio}
                                >
                                    <FormControlLabel value="color1" control={<Radio color="primary" />} label="" />
                                    <FormControlLabel value="color2" control={<Radio color="secondary" />} label="" />
                                    <FormControlLabel value="color3" control={<Radio color="primary" />} label="" />
                                    <FormControlLabel value="color4" control={<Radio color="default" />} label="" />
                                </RadioGroup>
                            </FormControl>
                            <Grid container item alignItems="center" wrap="nowrap">
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
                                <Button
                                    style={{
                                        background: "#2d3245",
                                        color: "#ffffff",
                                    }}
                                    className={styles.actionPaymentOptions}
                                    variant="contained"
                                    size="large"
                                    title="Add To Cart"
                                    disabled={commerceHandling.itemAddedToCart ? true : false}
                                    onClick={() => {
                                        if (!commerceHandling.itemAddedToCart) {
                                            commerceHandling.addToCart(product.id, productQty);
                                        } else return;
                                    }}
                                >
                                    {commerceHandling.itemAddedToCart ? "Added To Cart!" : "Add To Cart"}
                                </Button>
                                <Button
                                    variant="outlined"
                                    className={styles.actionPaymentOptions}
                                    style={{
                                        border: "solid 2px #2d3245",
                                    }}
                                >
                                    Extra
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Container className={styles.product__info}>
                    <Tabs
                        scrollButtons="auto"
                        value={value}
                        onChange={handleChange}
                        centered
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Detail" {...a11yProps(0)} />
                        <Tab label="Warranty" {...a11yProps(1)} />
                        <Tab disabled label="Customize" {...a11yProps(2)} />
                        <Tab disabled label="How to Care" {...a11yProps(3)} />
                        <Tab disabled label="Gallery" {...a11yProps(4)} />
                    </Tabs>
                    <Divider style={{ margin: "1rem 0" }} variant="fullWidth" />
                    <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                        <TabPanel value={value} index={0}>
                            <Typography variant="h6">Description</Typography>
                            <Typography
                                align="left"
                                variant="subtitle1"
                                style={{ color: "#333333", marginBottom: "1.25rem", fontWeight: "300" }}
                                dangerouslySetInnerHTML={{
                                    __html: product ? product.description : null,
                                }}
                            />
                            <br />
                            <Typography variant="h6">Material</Typography>
                            <Typography
                                align="left"
                                variant="subtitle1"
                                style={{ color: "#333333", marginBottom: "1.25rem", fontWeight: "300" }}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum at doloribus
                                quisquam autem voluptates. Architecto, non. Dolorem aliquid adipisci dolor perferendis
                                voluptatum at rem provident. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Rem, libero? Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
                                architecto consequatur ipsam veniam modi neque, magnam itaque optio blanditiis ut dolor
                                sapiente labore necessitatibus doloribus veritatis suscipit exercitationem vitae
                                corrupti fugit, eligendi repudiandae debitis! Unde possimus itaque adipisci quidem id.
                            </Typography>
                            <br />
                            <Typography variant="h6">Notes</Typography>
                            <Typography
                                align="left"
                                variant="subtitle1"
                                style={{ color: "#333333", marginBottom: "1.25rem", fontWeight: "300" }}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci ullam expedita
                                laborum, saepe repellat.
                            </Typography>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            No Warranty
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            Item Three
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            Item Three
                        </TabPanel>
                    </SwipeableViews>
                </Container>
            </Container>
        </Backdrop>
    );
}

export default ProductView;
