import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import ArrowRight from "@material-ui/icons/ArrowRight";
import Fade from "@material-ui/core/Fade/Fade"
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import LanguageSelector from "./AppHeader/LanguageSelector";
import LinkButton from "./AppHeader/LinkButton";
import Colors from "../Colors";
import Logo from "../images/logos/logo.png";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarStatic: {
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: Colors.primary,
    },
    button: {
        color: theme.palette.primary.main,
        margin: theme.spacing(1),
    },
    indicator: {
        backgroundColor: theme.palette.primary.main,
    },
    langaugeMenu: {
        zIndex: 1001,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none",
    },
    linkButton: {
        color: theme.palette.primary.main,
    },
    logo: {
        height: 56,
        marginRight: theme.spacing(3),
    },
    menuButton: {
        color: theme.palette.primary.main,
    },
    menuItem: {
        '&.Mui-selected': {
            borderLeft: `6px solid ${Colors.contrast}`
        }
    },
    menuLink: {
        color: theme.palette.primary.main,
        textDecoration: "none",
    },
    tabs: {
        color: theme.palette.primary.main,
        flexGrow: 1,
        indicator: Colors.contrast,
    },
    title: {
        [theme.breakpoints.down("md")]: {
            flexGrow: 1,
        },
        color: theme.palette.primary.main,
        fontWeight: "bold"
    }
}));


const Header = () => {
    // The supported languages keyed by their language code.
    const languages = [
        { key: "en", value: "english" },
        { key: "fr", value: "french" }
    ];

    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [languageMenuAnchorEl, setlanaguageMenuAnchorEl] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

    const handleLanguageChange = (event: any) => {
        setlanaguageMenuAnchorEl(event.target);
    };

    const handleLanguageMenuClose = () => {
        setlanaguageMenuAnchorEl(null);
    };

    const handleMenuButtonClick = (event: any) => {
        setAnchorEl(event.target);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setlanaguageMenuAnchorEl(null);
    };

    const handleSelectLanguage = (item: {key: string, value: string}) => {
        if (item.key !== currentLanguage.key) {
            setCurrentLanguage(item);
            i18n.changeLanguage(item.key)
        }

        handleLanguageMenuClose();
    };

    const handleTabChange = (event: any, index: number) => {
        setTabValue(index);
    };

    // const renderHelpButton = () => {
    //     return (
    //         <LinkButton path="/help" label={t("help")} />
    //     );
    // };

    const renderLanguageMenu = () => {
        return (
            <Menu
                id="app-bar-language-selector"
                anchorEl={languageMenuAnchorEl}
                className={classes.langaugeMenu}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: "top", horizontal: "left"}}
                transformOrigin={{vertical: "top", horizontal: "right"}}
                keepMounted
                open={Boolean(languageMenuAnchorEl)}
                onClose={handleLanguageMenuClose}
                TransitionComponent={Fade}
            >
                {languages.map(
                    (item) => (
                        <MenuItem
                            className={classes.menuItem}
                            key={item.key}
                                onClick={() => handleSelectLanguage(item)}
                        >
                            {t(item.value)}    
                        </MenuItem>
                    )
                )}
            </Menu>
        );
    };

    const renderSecondaryNav = () => {
        return (
            <Hidden smDown>
                <LanguageSelector languages={languages} />
                {/* {renderHelpButton()} */}
            </Hidden>
        );
    };

    // Render a navigation menu when screen size is <= 960px
    const renderSecondaryNavAsList = () => {
        return (
            <Hidden mdUp>
                <LanguageSelector languages={languages} />
                <IconButton
                    aria-controls="app-bar-secondary-navigation-menu"
                    aria-haspopup="true"
                    className={classes.menuButton}
                    edge="end"
                    onClick={handleMenuButtonClick}
                >
                    <MenuIcon  />
                </IconButton>
                <Menu 
                    anchorEl={anchorEl}
                    id="app-bar-secondary-navigation-menu"
                    keepMounted
                    onClose={handleMenuClose}
                    open={Boolean(anchorEl)}
                    TransitionComponent={Fade}
                >
                    {/* <div>
                        <LinkButton
                            label={t("map")}
                            onClick={handleMenuClose}
                            path="/"
                        />
                    </div>
                    <div>
                        <LinkButton
                            label={t("common_about")}
                            onClick={handleMenuClose}
                            path="/about"
                        />
                    </div>
                    <MenuItem
                        component={Link}
                        to="/"
                    >
                        Map
                    </MenuItem>
                    <MenuItem
                        onClick={handleLanguageChange}
                    >
                        {"English"}
                        <ListItemIcon>
                            <ArrowRight />
                        </ListItemIcon>
                    </MenuItem> */}
                    <MenuItem
                        component={Link}
                        onClick={handleMenuClose}
                        to="/"
                    >
                        {t("map")}
                    </MenuItem>
                    {/* <Link className={classes.menuLink} to="/explore">
                        <MenuItem
                            onClick={handleMenuClose}
                        >
                            {t("explore")}
                        </MenuItem>
                    </Link> */}
                    <Link className={classes.menuLink} to="/about">
                        <MenuItem
                            onClick={handleMenuClose}
                        >
                            {t("common_about")}
                        </MenuItem>
                    </Link>
                    {/* <Link className={classes.menuLink} to="/contact">
                        <MenuItem
                            onClick={handleMenuClose}
                        >
                            {t("contact")}
                        </MenuItem>
                    </Link> */}
                    {/* <Link className={classes.menuLink} to="/help">
                        <MenuItem
                            onClick={handleMenuClose}
                        >
                            {t("help")}
                        </MenuItem>
                    </Link> */}
                    {/* <MenuItem
                        onClick={handleLanguageChange}
                    >
                        {"English"}
                        <ListItemIcon>
                            <ArrowRight />
                        </ListItemIcon>
                    </MenuItem> */}
                </Menu>
            </Hidden>
        );
    };

    // Render the navigation tabs for screen sizes > 960px
    const renderTabs = () => {
        return (
            <Hidden smDown>
                <Tabs
                    centered
                    classes={{
                        indicator: classes.indicator
                    }}
                    className={classes.tabs}
                    onChange={handleTabChange}
                    value={tabValue} 
                >
                    <Tab component={Link} label={t("map")} to="/" />
                    {/* <Tab component={Link} label={t("explore")} to="/explore" /> */}
                    <Tab component={Link} label={t("common_about")} to="/about" />
                    {/* <Tab component={Link} label={t("contact")} to="/contact" /> */}
                </Tabs>
            </Hidden>
        );
    };

    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appBar}
                classes={{positionFixed: classes.appBarStatic}}
                color="secondary"
                position="fixed" >
                <Toolbar>
                    { currentLanguage.key === "en" && (
                        <img
                            alt="Walk Roll Map logo"
                            className={classes.logo}
                            src={Logo}
                        />
                    )}
                    <Typography className={classes.title} variant="h4">
                        {t("site-name")}
                    </Typography>
                    {renderTabs()}
                    {renderLanguageMenu()}
                    {renderSecondaryNav()}
                    {renderSecondaryNavAsList()}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;