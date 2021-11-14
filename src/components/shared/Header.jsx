import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";

import { AppBar, IconButton, Grid, Menu, MenuItem, Typography } from "@material-ui/core";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    upperHeader: {
        width: "100%",
        background: "#2D3245",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        padding: ".7em 5%",
        maxHeight: "40px",
        zIndex: "2000",
        fontSize: ".8em",
        color: "black",
        position: "relative",
        zIndex: "999",
        color: "#ffffff",
        "& a": {
            color: "#ffffff",
        },
    },
    header: {
        display: "flex",
        flexDirection: "row",
        background: "#ffffff",
        fontFamily: "roboto",
        fontWeight: "600",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em 5%",
        height: "85px",
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
    header__extended: {
        borderBottom: "solid 1px rgba(0,0,0,0.15)",
    },
    iconButton: {
        padding: "0",
    },
    icons: {
        padding: "0.8rem",
    },
    header__links: {
        "@media (max-width: 800px)": {
            display: "none",
        },
    },
    header__menuIcon: {
        "@media (min-width: 800px)": {
            display: "none",
        },
    },
});
function Header() {
    const styles = useStyles();
    const [isAtTop, setAtTop] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        window.onscroll = function () {
            if (window.pageYOffset <= 50) {
                setAtTop(true);
            } else setAtTop(false);
        };
    });

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="static" className={styles.upperHeader}>
                <Grid container direction="row" justifyContent="space-around" alignItems="center">
                    <Grid item>
                        <Typography variant="subtitle2">
                            contact@gmail.com
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component={Link} variant="subtitle2">
                            Test the Shopping System
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2">
                            Help Center
                        </Typography>
                        
                    </Grid>
                </Grid>
            </AppBar>
            <AppBar position="sticky" className={`${styles.header} ${!isAtTop ? styles.header__extended : ""}`}>
                <div>
                    <Logo />
                </div>
                <div className={styles.header__links}>
                    <ul>
                        <li>
                            <NavLink activeClassName="active" to="/" exact>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/news">
                                New in
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/products">
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/favorites">
                                Favorites
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <IconButton className={styles.iconButton} title="Profile" aria-label="profile">
                        <PermIdentityOutlinedIcon className={styles.icons} style={{ color: "#222222" }} />
                    </IconButton>
                    <IconButton className={styles.iconButton} title="Search" aria-label="search">
                        <FavoriteBorder className={styles.icons} style={{ color: "#222222" }} />
                    </IconButton>
                    <IconButton
                        component={NavLink}
                        to="/cart"
                        activeClassName="active"
                        className={styles.iconButton}
                        title="Cart"
                        aria-label="cart"
                    >
                        <LocalMallOutlinedIcon className={styles.icons} style={{ color: "#222222" }} />
                    </IconButton>
                    <IconButton
                        className={styles.header__menuIcon}
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        aria-label="menu"
                    >
                        <MenuIcon className={styles.iconButton} />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleClose} component={NavLink} activeClassName="active" to="/" exact>
                            Home
                        </MenuItem>
                        <MenuItem onClick={handleClose} component={NavLink} activeClassName="active" to="/news/">
                            New in
                        </MenuItem>
                        <MenuItem onClick={handleClose} component={NavLink} activeClassName="active" to="/products/">
                            Products
                        </MenuItem>
                        <MenuItem onClick={handleClose} component={NavLink} activeClassName="active" to="/favorites/">
                            Favorites
                        </MenuItem>
                    </Menu>
                </div>
            </AppBar>
        </>
    );
}

export default Header;
