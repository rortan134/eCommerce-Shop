import CommerceHandler from "../../contexts/commerce-context";
import { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import { AppBar, IconButton, Grid, Menu, MenuItem, Typography, InputBase } from "@material-ui/core";

import { ReactComponent as Logo } from "../../assets/logo.svg";
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
        fontSize: ".8em",
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
        fontWeight: "400",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 5% 0 5%",
        height: "85px",
        transition: "all 0.5s ease-in-out",
        "& a": {
            color: "#222222",
            textDecoration: "none",
            whiteSpace: "nowrap",
            fontSize: "1.1rem",
        },
        "& a.active": {
            color: "rgba(0,0,0,0.7)",
        },
        "& ul": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "0 auto",
            padding: "0",
            "& li": {
                listStyleType: "none",
                padding: "0 10%",
            },
        },
    },
    header__extended: {
        borderBottom: "solid 1px rgba(0,0,0,0.15)",
        padding: "0 5% 0 5%",
        height: "75px",
    },
    iconButton: {
        padding: "0.4rem",
    },
    icons: {
        padding: "0.4rem",
    },
    iconButton__root: {
        "&:hover": {
            background: "transparent !important",
        },
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
    header__search: {
        position: "relative",
        "& svg": {
            position: "absolute",
            fill: "rgb(34, 34, 34)",
            left: "10px",
        },
        "& input": {
            padding: ".5rem 40px",
        },
    },
    header__search__root: {
        width: "260px",
        background: "#FCFCFC",
        borderRadius: "5px",
        boxShadow: "0 5px 4px rgba(0,0,0,.015)",
        transition: "width 0.4s ease-in",
    },
    header__search__focused: {
        width: "350px",
    },
    header__subheader: {
        fontWeight: "500",
        display: "flex",
        flexDirection: "row",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        background: "#ffffff",
        justifyContent: "space-between",
        alignItems: "center",
        padding: ".4rem 5% 2rem 5%",
        transition: "all 0.5s ease-in-out",
        color: "rgba(0,0,0,0.8)",
    },
    subheader__content__category: {
        padding: "0 2.5rem 0 0",
        "&:hover": {
            transform: "scale(1.05)",
            fontWeight: "600",
        },
    },
    subheader__active: {
        transform: "translateY(-200px)",
        zIndex: "-999",
    },
});
function Header() {
    const styles = useStyles();
    const commerceHandling = useContext(CommerceHandler);

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
            </AppBar>

            <AppBar position="sticky" className={`${styles.header} ${!isAtTop ? styles.header__extended : ""}`}>
                <Grid container justifyContent="space-between" alignItems="center" direction="row" wrap="nowrap">
                    <Grid item xs={2}>
                        <a href="/">
                            <Logo />
                        </a>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={8}
                        justifyContent="space-evenly"
                        alignItems="center"
                        wrap="nowrap"
                        direction="row"
                        className={styles.header__links}
                    >
                        <NavLink to="/products">SHOP</NavLink>
                        <NavLink to="/">SOMETHING</NavLink>
                        <NavLink to="/">ABOUT</NavLink>
                    </Grid>
                    <Grid item xs={8} className={styles.header__search}>
                        <form>
                            <Grid container item alignItems="center" wrap="nowrap" direction="row" justifyContent="space-between">
                                <InputBase
                                    placeholder="Search for products"
                                    inputProps={{ "aria-label": "search for products" }}
                                    classes={{
                                        root: styles.header__search__root,
                                        focused: styles.header__search__focused,
                                    }}
                                />
                                <SearchOutlinedIcon />
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={8} container justifyContent="flex-end" alignItems="center" wrap="nowrap" direction="row">
                        <IconButton disableRipple className={styles.iconButton} title="Profile" aria-label="profile">
                            <PermIdentityOutlinedIcon className={styles.icons} style={{ color: "#222222" }} />
                        </IconButton>
                        <IconButton disableRipple className={styles.iconButton} title="Search" aria-label="search">
                            <FavoriteBorder className={styles.icons} style={{ color: "#222222" }} />
                        </IconButton>
                        <IconButton
                            disableRipple
                            component={NavLink}
                            to="/cart"
                            activeClassName="active"
                            className={styles.iconButton}
                            title="Cart"
                            aria-label="cart"
                            classes={{ root: styles.iconButton__root }}
                        >
                            <Grid container justifyContent="space-evenly" alignItems="center">
                                <LocalMallOutlinedIcon className={styles.icons} style={{ color: "#222222" }} />
                                <Typography variant="body2">{commerceHandling.cartQty ? commerceHandling.cartQty : null}</Typography>
                            </Grid>
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
                    </Grid>
                </Grid>
            </AppBar>
            <AppBar position="sticky" className={`${styles.header__subheader} ${!isAtTop ? styles.subheader__active : ""}`}>
                <Grid className={styles.subheader__content} container alignItems="center">
                    {commerceHandling.productCategories
                        ? Object.entries(commerceHandling.productCategories).map(([key, category]) => (
                              <Typography className={styles.subheader__content__category} key={key} variant="body1">
                                  {category.name}
                              </Typography>
                          ))
                        : null}
                </Grid>
            </AppBar>
        </>
    );
}

export default Header;
