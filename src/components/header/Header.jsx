import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { AppBar, Grid, IconButton, InputBase, Menu, MenuItem, Typography, Collapse, Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../../assets/index";
import CommerceHandler from "../../contexts/commerce-context";

import Upperheader from "./Upperheader";
import Subcategories from "./Subcategories";

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff !important",
        fontFamily: "roboto",
        fontWeight: "400",
        boxShadow: "0 0 0 transparent !important",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 5%",
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
});

function Header() {
    const styles = useStyles();
    const commerceHandling = useContext(CommerceHandler);

    const [isExpanded, setIsExpanded] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        window.onscroll = () => {
            window.pageYOffset > 49 ? setIsExpanded(false) : setIsExpanded(true);
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
            <Upperheader />
            <AppBar position="sticky" className={`${styles.header} ${!isExpanded ? styles.header__extended : ""}`}>
                <Grid sx={{ padding: ".5rem 0" }} container justifyContent="space-between" alignItems="center" direction="row" wrap="nowrap">
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
                        <NavLink to="/">SUPPORT</NavLink>
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
                        <IconButton disableRipple className={styles.iconButton} title="Profile" aria-label="profile" size="large">
                            <PermIdentityOutlinedIcon className={styles.icons} style={{ color: "#222222" }} />
                        </IconButton>
                        <IconButton disableRipple className={styles.iconButton} title="Search" aria-label="search" size="large">
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
                            size="large"
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
                            size="large"
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
            <Box sx={{ width: "100%", minHeight: "56px", padding: "0 5%", background: "#ffffff", position: "relative", zIndex: "1000" }}>
                <Collapse sx={{ width: "100%" }} in={isExpanded}>
                    <Subcategories />
                </Collapse>
            </Box>
        </>
    );
}

export default Header;
