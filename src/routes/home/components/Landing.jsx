import RemoveIcon from "@mui/icons-material/Remove";
import { Container, Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState } from "react";

import GoToProduct from "../../../components/GoToProduct";
import ImageDisplay from "../../../components/ImageDisplay";

const useStyles = makeStyles({
    home: {
        flexDirection: "row-reverse",
        justifyContent: "center",
        position: "relative",
        zIndex: "1",
        height: "50vh",
        padding: "5% 0 2rem 0",
        flexWrap: "wrap",
        "& .activeImg": {
            objectPosition: "center",
            objectFit: "contain",
            width: "100%",
            height: "300px",
        },
        "& .activeImgWrapper": {
            flexWrap: "nowrap !important",
        },
    },
});

function Landing({ product }) {
    const styles = useStyles();

    const [activeImgUrl, setActiveImgUrl] = useState();

    useEffect(() => {
        setActiveImgUrl(product ? product.image.url : null);
    }, [product]);

    return (
        <>
            <Container className={styles.home}>
                {product ? (
                    <Grid container justifyContent="center" wrap="wrap" spacing={4}>
                        <Grid container item xs={6} justifyContent="space-between" direction="column" wrap="nowrap">
                            <Grid container alignItems="center" direction="row" wrap="nowrap">
                                <RemoveIcon sx={{ color: "rgba(156,139,218,.42)" }} />
                                <Typography align="left" variant="defaultBody">
                                    {`${product.categories[0].name} collection `}
                                </Typography>
                            </Grid>
                            <Typography align="left" variant="defaultTitle">
                                {product.name}
                            </Typography>
                            <Typography
                                align="left"
                                component="p"
                                variant="defaultSubtitle"
                                sx={{ marginBottom: "1.50rem" }}
                                dangerouslySetInnerHTML={{
                                    __html: product.description,
                                }}
                            />
                            <Grid item xs={6}>
                                <GoToProduct product={product} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={6} alignItems="center" justifyContent="center" direction="column" wrap="nowrap">
                            <Grid container item xs={10} align="center" justifyContent="center" sx={{ height: "fit-content", position: "relative" }}>
                                <img className="activeImg" src={activeImgUrl ? activeImgUrl : null} alt={product.name} />
                            </Grid>
                            <Grid container item xs={2} direction="row" justifyContent="center" alignItems="center" className="activeImgWrapper">
                                <ImageDisplay product={product} dispatch={setActiveImgUrl} />
                            </Grid>
                        </Grid>
                    </Grid>
                ) : null}
            </Container>
        </>
    );
}

export default Landing;
