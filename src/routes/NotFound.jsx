// This template was made by Colorlib (https://colorlib.com)
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
    notfound: { position: "relative", height: "80vh" },
    notfound__inner: {
        position: "absolute",
        left: "50%",
        top: "50%",
        WebkitTransform: "translate(-50%, -50%)",
        msTransform: "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
        maxWidth: "520px",
        width: "100%",
        lineHeight: "1.4",
        textAlign: "center",
        "& h2": {
            fontFamily: "'Cabin', sans-serif !important",
            fontSize: "20px",
            fontWeight: "400",
            textTransform: "uppercase",
            color: "#000",
            marginTop: "0px",
            marginBottom: "25px",
            padding: "0 4%",
            "@media only screen and (max-width: 480px)": {
                fontSize: "16px",
            },
        },
    },
    notfound404: {
        position: "relative",
        height: "240px",
        "& h1": {
            fontFamily: "'Montserrat', sans-serif !important",
            position: "absolute",
            left: "50%",
            top: "50%",
            WebkitTransform: "translate(-50%, -50%)",
            msTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
            fontSize: "252px",
            fontWeight: "900",
            margin: "0px",
            color: "#262626",
            textTransform: "uppercase",
            letterSpacing: "-40px",
            marginLeft: "-20px",
        },
        "& h1 > span": { textShadow: "-8px 0px 0px #fff" },
        "& h3": {
            fontFamily: "'Cabin', sans-serif !important",
            position: "relative",
            fontSize: "16px",
            fontWeight: "700",
            textTransform: "uppercase",
            color: "#262626",
            margin: "0px",
            letterSpacing: "3px",
            paddingLeft: "6px",
        },
        "@media only screen and (max-width: 767px)": {
            height: "200px",
            "& h1": { fontSize: "200px" },
        },
        "@media only screen and (max-width: 480px)": {
            height: "162px",
            "& h1": {
                fontSize: "162px",
                height: "150px",
                lineHeight: "162px",
                letterSpacing: "-25px",
            },
        },
    },
});

function NotFound() {
    const styles = useStyles();

    return (
        <>
            <div className={styles.notfound}>
                <div className={styles.notfound__inner}>
                    <div className={styles.notfound404}>
                        <h3>Oops! Page not found</h3>
                        <h1>
                            <span>4</span>
                            <span>0</span>
                            <span>4</span>
                        </h1>
                    </div>
                    <h2>we are sorry, but the page you requested was not found</h2>
                    <Button variant="contained" component={Link} to="/">
                        Go home
                    </Button>
                </div>
            </div>
        </>
    );
}

export default NotFound;
