import { Box, Grid, Paper, Typography } from "@mui/material";
import CommerceHandler from "../../contexts/commerce-context";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
    header__subheader: {
        width: "100%",
        padding: ".5rem 0 1.5rem 0",
        position: "relative",
        zIndex: "1000",
    },
    subheader__content__category: {
        padding: "0 2.5rem 0 0",
        color: "rgba(0,0,0,0.8)",
        "&:hover": {
            transform: "scale(1.05)",
            fontWeight: "600",
        },
    },
});

function Subcategories() {
    const styles = useStyles();
    const commerceHandling = useContext(CommerceHandler);

    return (
        <Box className={styles.header__subheader}>
            <Grid className={styles.subheader__content} container alignItems="center">
                {commerceHandling.productCategories
                    ? Object.entries(commerceHandling.productCategories).map(([key, category]) => (
                          <Typography className={styles.subheader__content__category} key={key} variant="body1">
                              {category.name}
                          </Typography>
                      ))
                    : null}
            </Grid>
        </Box>
    );
}

export default Subcategories;
