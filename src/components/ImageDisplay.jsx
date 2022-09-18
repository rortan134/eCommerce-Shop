import { Grid, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
    imageDemoButton: {
        background: "#ffffff",
        width: "80px",
        height: "80px",
        borderRadius: "0 !important",
        padding: "2px",
        margin: "4px",
        "& img": {
            objectFit: "contain",
            objectPosition: "center",
            width: "100%",
            height: "100%",
        },
        "& div": {
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%",
        },
    },
});

function ImageDisplay({ product, dispatch }) {
    const styles = useStyles();

    return product.assets
        ? product.assets.map((images) => (
              <Grid key={images.id} item zeroMinWidth>
                  <IconButton
                      onClick={() => dispatch(images.url)}
                      onMouseEnter={() => dispatch(images.url)}
                      className={styles.imageDemoButton}
                      size="large"
                  >
                      <img src={images.url} width="25px" alt="Buy now" />
                  </IconButton>
              </Grid>
          ))
        : null;
}

export default ImageDisplay;
