import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import { ReactComponent as Logo } from "../assets/logo.svg";

import { AppBar, IconButton, Grid } from "@material-ui/core";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        background: "#f0f0f8",
    },
    iconButton: {
        padding: "0",
    },
    icons: {
        padding: "0.8rem",
    },
    upperHeader: {
        width: "100%",
        background: "#1D1C1B",
        padding: ".5em 5%",
        position: "relative",
        zIndex: "999",
        fontSize: ".8em"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        background: "#f0f0f8",
        position: "relative",
        fontFamily: "roboto",
        fontWeight: "600",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em 5%",
        borderBottom: "solid rgba(0,0,0,.1) 1px",
        
        "& ul": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "0 auto",
            padding: "0",
            "& li": {
                listStyleType: "none",
                padding: "0 10%",
                "& a": {
                    color: "rgba(0,0,0,0.6)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    fontSize: "1.1rem",
                },
                "& a.active": {
                    color: "#222222",
                },
            },
        },
    },
});
function Header() {
    const mClasses = useStyles();
    const location = useLocation();
    return (
        <div>
        <AppBar className={mClasses.upperHeader}>
            <Grid container direction="row" justifyContent="space-around" alignItems="center">
                <span>+625 252 256 642</span>
                <span>contact@ourshop.com</span>
            </Grid>
        </AppBar>
        <AppBar className={mClasses.header}>
            <div>
                <Logo />
            </div>
            <div>
                <ul>
                    <li>
                        <NavLink activeClassName="active" to="/" exact>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/news/">
                            New in
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/products/">
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/favorites/">
                            Favorites
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <IconButton className={mClasses.iconButton} title="Profile">
                    <PermIdentityOutlinedIcon className={mClasses.icons} style={{ color: "#222222" }} />
                </IconButton>
                <IconButton className={mClasses.iconButton} title="Search">
                    <SearchOutlinedIcon className={mClasses.icons} style={{ color: "#222222" }} />
                </IconButton>
                <IconButton
                    component={NavLink}
                    to={`${location.pathname}cart`}
                    activeClassName="active"
                    className={mClasses.iconButton}
                    title="Cart"
                >
                    <LocalMallOutlinedIcon className={mClasses.icons} style={{ color: "#222222" }} />
                </IconButton>
            </div>
        </AppBar>
        </div>
    );
}

export default Header;
