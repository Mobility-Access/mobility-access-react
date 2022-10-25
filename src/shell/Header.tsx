import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade"
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation } from "react-router-dom";

import LanguageSelector from "./AppHeader/LanguageSelector";
import Colors from "../Colors";
import Logo from "../images/logos/logo.png";
import BikeMapsLogo from "../images/logos/BikeMapsORG_Logo_notxt_sm.png";

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
    languageLink: {
        marginRight: theme.spacing(5),
    },
    langaugeMenu: {
        zIndex: 1001,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none",
    },
    linkButton: {
        minHeight: 0,
        minWidth: 0,
        padding: 0
    },
    logo: {
        height: 56,
        marginRight: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            height: 48,
            marginRight: theme.spacing(2),
        },
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
            fontSize: "1.25em",
        },
        color: theme.palette.primary.main,
        fontSize: "2em",
        fontWeight: "bold"
    }
}));


const Header = () => {
    // The supported languages keyed by their language code.
    const languages = [
        { key: "en", value: "english" },
        { key: "fr", value: "french" },
        { key: "es", value: "spanish" }
    ];

    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [languageMenuAnchorEl, setlanaguageMenuAnchorEl] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
    const history = useHistory();
    const location = useLocation();

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

    const handleLanguageChange = () => {
        if (location.pathname === "/explore") {
            history.push("/");
        }
    };

    const handleSelectLanguage = (item: {key: string, value: string}) => {
        if (item.key !== currentLanguage.key) {
            setCurrentLanguage(item);
            i18n.changeLanguage(item.key)
        }
        console.log(location.pathname);

        handleLanguageMenuClose();
    };

    const handleTabChange = (event: any, index: number) => {
        setTabValue(index);
    };

    const renderBikeMapsLink = () => {
        if (i18n.language.startsWith("fr")) {
            return (
                <IconButton aria-label="Hyperlink to BikeMaps French site." className={classes.linkButton} href="https://bikemaps.org/fr" target="_blank">
                    <img
                        alt="BikeMaps logo"
                        src={BikeMapsLogo}
                    />
                </IconButton>
            )
        }

        // French site
        return (
            <IconButton aria-label="Hyperlink to BikeMaps English site." className={classes.linkButton} href="https://bikemaps.org" target="_blank">
                <img
                    alt="BikeMaps logo"
                    src={BikeMapsLogo}
                />
            </IconButton>
        )
    };

    const renderLanguageLink = () => {
        if (i18n.language.startsWith("fr")) {
            return (
                <Button aria-label="Hyperlink to English version of WalkRollMap." className={classes.languageLink} color="primary" href="https://walkrollmap.org" target="_blank">
                    English
                </Button>
            )
        }

        // French site
        return (
            <Button aria-label="Hyperlink to French version of WalkRollMap." className={classes.languageLink} color="primary" href="https://onmarcheonroule.org" target="_blank">
                Francais
            </Button>
        )
    };

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

    // const renderSecondaryNav = () => {
    //     return (
    //         <Hidden smDown>
    //             <LanguageSelector languages={languages} />
    //             {/* {renderHelpButton()} */}
    //         </Hidden>
    //     );
    // };

    // Render a navigation menu when screen size is <= 960px
    const renderSecondaryNavAsList = () => {
        return (
            <Hidden mdUp>
                {/* <LanguageSelector languages={languages} /> */}
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
                    <MenuItem
                        component={Link}
                        onClick={handleMenuClose}
                        to="/"
                    >
                        {t("map")}
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        onClick={handleMenuClose}
                        to="/explore"
                    >
                        {t("header-explore")}
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        onClick={handleMenuClose}
                        to="/about"
                    >
                        {t("common_about")}
                    </MenuItem>
                    <MenuItem>
                    </MenuItem>
                </Menu>
            </Hidden>
        );
    };

    // Render the navigation tabs for screen sizes > 960px
    const renderTabs = () => {
        const isEnglish = (i18n.language.startsWith("en"));

        return (
            <Tabs
                centered
                classes={{
                    indicator: classes.indicator
                }}
                className={classes.tabs}
                onChange={handleTabChange}
                value={tabValue} 
            >
                <Tab aria-controls="map-tabpanel" component={Link} id="map-tab" label={t("map")} to="/" />
                { isEnglish && (
                    <Tab aria-controls="explore-tabpanel" component={Link} id="explore-tab" label={t("header-explore")} to="/explore" />
                )}
                <Tab component={Link} id="about-tabpanel" label={t("common_about")} to="/about" />
            </Tabs>
        );
    };

    return (
        <nav className={classes.root}>
            <AppBar
                className={classes.appBar}
                classes={{positionFixed: classes.appBarStatic}}
                color="secondary"
                position="fixed" >
                <Toolbar>
                    <img
                        alt="Walk Roll Map logo"
                        className={classes.logo}
                        src={Logo}
                    />
                    <Typography className={classes.title} variant="h1">
                            {t("site-name")}
                    </Typography>
                    <Hidden smDown>
                        {renderTabs()}
                    </Hidden>
                    <LanguageSelector handleLanguageChange={handleLanguageChange} languages={languages} position="below" />
                    <Hidden smDown>
                        {renderBikeMapsLink()}
                    </Hidden>
                    
                    {/* {renderLanguageMenu()} */}
                    {/* {renderSecondaryNav()} */}
                    {renderSecondaryNavAsList()}

                    
                    {/*renderSecondaryNav()}
                    {renderSecondaryNavAsList()} */}
                    {/* {renderLanguageLink()} */}
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Header;