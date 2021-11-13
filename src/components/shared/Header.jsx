import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import { ReactComponent as Logo } from "../assets/logo.svg";

import { AppBar, IconButton, Grid, Menu, MenuItem } from "@material-ui/core";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import MenuIcon from "@material-ui/icons/Menu";

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
        height: "28px",
        zIndex: "2000",
        fontSize: ".8em",

        position: "sticky",
    },
    header: {
        display: "flex",

        flexDirection: "row",
        background: "#f0f0f8",
        fontFamily: "roboto",
        fontWeight: "600",
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em 5%",
        borderBottom: "solid rgba(0,0,0,.1) 1px",
        height: "85px",

        position: "sticky",
        top: "28px",
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

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="sticky" className={styles.upperHeader}>
                <Grid container direction="row" justifyContent="space-around" alignItems="center">
                    <span>+625 252 256 642</span>
                    <span>contact@ourshop.com</span>
                </Grid>
            </AppBar>
            <AppBar position="sticky" className={styles.header}>
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
                        <SearchOutlinedIcon className={styles.icons} style={{ color: "#222222" }} />
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
