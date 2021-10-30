import { useContext, useState, useEffect } from "react";
import CommerceHandler from "../../shared/commerce-context";
import { makeStyles } from "@material-ui/core/styles";

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
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles({
    root: {
        width: "100%",
        background: "#f0f0f8",
        paddingBottom: "5rem",
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
                background: "radial-gradient(circle at 90% 0,rgba(66, 74, 102, .5) 80%,hsla(0,0%,100%,0) 0)",
                mask: "radial-gradient(circle at 90% 0,rgba(66, 74, 102, .5) 45%,hsla(0,0%,100%,0) 70%)",
                WebkitMask: "radial-gradient(circle at 90% 0,rgba(66, 74, 102, .5) 45%,hsla(0,0%,100%,0) 70%)",
            },
        },
        "& .circleIcon": {
            position: "absolute",
            fontSize: "2.2rem",
            color: "#2d3245",
            left: "50%",
            transform: "translate(-50%, -35%)",
            borderRadius: "50%",

            margin: "0",
            padding: "1px",
            border: "solid #f0f0f8 10px",
            zIndex: "1",
            boxShadow: "inset 0 0 10px 10px rgba(0,0,0,0.5)",
        },
        "& .circleIcon:hover ": {
            transform: "translate(-50%, -35%), scale(1.1)",
            boxShadow: "inset 0 0 20px 20px rgba(0,0,0,0.5) !important",
            "& .circleIconImg": {
                transform: "scale(1.1)",
                borderRadius: "50%",
            },
        },
    },
    home: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
        position: "relative",
        zIndex: "1",
        height: "fit-content",
        width: "90%",
        maxWidth: "1200px",
        padding: "6% 0 2rem 0",
        borderBottomLeftRadius: "60px",
        borderBottomRightRadius: "60px",
        flexWrap: "wrap",
        "& .activeImg": {
            objectPosition: "center",
            objectFit: "contain",
            background: "radial-gradient(rgba(0,0,0,.4) 0% , transparent 70%)",

            width: "100%",
            height: "100%",

            maxHeight: "300px",
        },
        "& .activeImgWrapper": {
            flexWrap: "nowrap !important",
        },
        "& .homeContainer_wrap": {
            width: "50%",
            minWidth: "250px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "@media (max-width: 600px)": {
                width: "90%",
                marginBottom: "2em",
            },
        },
        "& .imageDemoButton": {
            width: "60px",
            height: "60px",
            borderRadius: "0 !important",
            padding: "3px",
            margin: "4px",
            "& img": {
                objectFit: "contain",
                objectPosition: "center",
                width: "100%",
                height: "100%",
            },
        },
    },
});

function Landing() {
    const classes = useStyles();

    const commerceHandling = useContext(CommerceHandler);
    let product = commerceHandling.landingProduct;

    const [activeImgUrl, setActiveImgUrl] = useState();
    let landingImages = [];

    const fetchImages = () => {
        if (product) {
            product.assets.map((images) => landingImages.push(images.url));
        }
    };
    useEffect(() => {
        fetchImages();
        setActiveImgUrl(landingImages[0]);
    }, [product]);

    const [checkbox, setCheckbox] = useState("color1");
    const handleChange = (event) => {
        setCheckbox(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Container className="orbsBg">
                <div className="orb__gradient orb__gradient__1" />
                <div className="orb__gradient orb__gradient__2" />
                <div className="orb__gradient orb__gradient__3" />
            </Container>
            <Container className={classes.home}>
                <div className="homeContainer_wrap">
                    <Grid container align="center" justifyContent="center" style={{ height: "fit-content" }}>
                        <img className="activeImg" src={activeImgUrl} alt={product ? product.name : null} />
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        className="activeImgWrapper"
                    >
                        {product
                            ? product.assets.map((images) => (
                                  <Grid key={images.id} item zeroMinWidth>
                                      <IconButton
                                          onClick={() => setActiveImgUrl(images.url)}
                                          className="imageDemoButton"
                                      >
                                          <img src={images.url} width="25px" alt="Buy now" />
                                      </IconButton>
                                  </Grid>
                              ))
                            : null}
                            
                    </Grid>
                </div>

                <div className="homeContainer_wrap">
                    <Container align="left" style={{ padding: "0 3rem" }}>
                        <Typography
                            align="left"
                            style={{ color: "#4875ca", fontWeight: "500" }}
                            variant="subtitle1"
                            nowrap
                        >
                            {product ? product.price.formatted_with_symbol : null}
                        </Typography>
                        <Typography
                            align="left"
                            style={{ fontWeight: "700", color: "#222222" }}
                            variant="h4"
                            gutterBottom
                        >
                            {product ? product.name : null}
                        </Typography>
                        <Typography
                            align="left"
                            variant="subtitle1"
                            style={{ color: "#333333", paddingBottom: "1rem", fontWeight: "300" }}
                            nowrap
                            dangerouslySetInnerHTML={{
                                __html: product ? product.description : null,
                            }}
                        />
                        <FormControl component="fieldset" style={{ width: "100%", paddingBottom: "2rem" }}>
                            <RadioGroup
                                style={{ flexWrap: "nowrap" }}
                                aria-label="colors"
                                row
                                className="radioGroup"
                                name="colors"
                                value={checkbox}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="color1" control={<Radio color="primary" />} label="" />
                                <FormControlLabel value="color2" control={<Radio color="secondary" />} label="" />
                                <FormControlLabel value="color3" control={<Radio color="primary" />} label="" />
                                <FormControlLabel value="color4" control={<Radio color="default" />} label="" />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            style={{
                                background: "#2d3245",
                                color: "#ffffff",
                                boxShadow: "0px 15px 25px rgba(0,0,0,0.3)",
                                padding: ".8rem 3.5rem",
                                borderRadius: "0",
                            }}
                            variant="contained"
                            size="large"
                            title="Add To Cart"
                            disabled={commerceHandling.itemAddedToCart ? true : false}
                            onClick={() => {
                                if (!commerceHandling.itemAddedToCart) {
                                    commerceHandling.addToCart(product.id, 1);
                                } else return;
                            }}
                        >
                            {commerceHandling.itemAddedToCart ? "Added To Cart!" : "Add To Cart"}
                        </Button>
                    </Container>
                </div>
            </Container>
            <IconButton title="Expand" className="circleIcon" component="span">
                <AddCircleIcon className="circleIconImg" />
            </IconButton>
        </div>
    );
}
export default Landing;
