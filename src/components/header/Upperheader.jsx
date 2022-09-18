import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
    upperHeader: {
        width: "100%",
        background: "#222222",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        padding: ".7em 5%",
        maxHeight: "40px",
        fontSize: ".8em",
        position: "relative",
        zIndex: "999",
        color: "#ffffff",
        "& a": {
            color: "#ffffff",
        },
    },
});

function Upperheader() {
    const styles = useStyles();

    return (
        <Box className={styles.upperHeader}>
            <Grid container direction="row" justifyContent="space-around" alignItems="center">
                <Grid item>
                    <Typography variant="subtitle2">contact@gmail.com</Typography>
                </Grid>
                <Grid item>
                    <Typography component={Link} to="/" variant="subtitle2">
                        Test the Shopping System
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">Help Center</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Upperheader;
