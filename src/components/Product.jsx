import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Grid, Box, Typography, CardActionArea, CardMedia, Skeleton } from "@mui/material";
import { useHistory } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
    product__image__wrapper: {
        padding: "1rem 1.5rem",
        background: "#F2F2F2",
    },
    product__image: {
        height: "300px",
        objectFit: "contain !important",
        objectPosition: "center",
    },
    product__description: {
        "& p": {
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
    },
});

function Product({ product }) {
    const styles = useStyles();
    const history = useHistory();

    return (
        <>
            <Box sx={{ position: "relative", marginRight: "0.6rem", background: "#ffffff", height: "100%" }}>
                {product ? (
                    <>
                        <FavoriteBorderIcon sx={{ position: "absolute", right: "10px", top: "10px", zIndex: "2" }} />
                        <CardActionArea
                            sx={{ height: "100%" }}
                            onClick={() => {
                                let path = `/products/${product.permalink}`;
                                history.push(path);
                            }}
                        >
                            <Grid container direction="column" sx={{ height: "100%" }}>
                                <Grid className={styles.product__image__wrapper} container item>
                                    <CardMedia component={"img"} className={styles.product__image} image={product.image.url} alt="product" />
                                </Grid>
                                <Grid sx={{ padding: "1rem 0.5rem" }} container item justifyContent="space-between" direction="column" wrap="nowrap">
                                    <Grid item xs={12}>
                                        <Typography align="left" variant="defaultSubtitle">
                                            {product.name}
                                        </Typography>
                                        <Typography align="left" variant="contrastSubtitle">
                                            {product.price.raw + " €"}
                                        </Typography>
                                    </Grid>
                                    <Typography
                                        dangerouslySetInnerHTML={{
                                            __html: product.description,
                                        }}
                                        className={styles.product__description}
                                        align="left"
                                        variant="defaultSubtitle"
                                    />
                                </Grid>
                            </Grid>
                        </CardActionArea>
                    </>
                ) : (
                    <Skeleton animation="wave" sx={{ transform: "scale(1)" }} height={480} width="100%" />
                )}
            </Box>
        </>
    );
}

export default Product;
