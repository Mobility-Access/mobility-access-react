import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Fade from "@mui/material/Fade"
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import makeStyles from '@mui/styles/makeStyles';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useTranslation } from "react-i18next";
import { Link, matchPath, useHistory, useLocation } from "react-router-dom";

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
        minWidth: "39px",
        padding: 0
    },
    logo: {
        height: 56,
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('lg')]: {
            flexGrow: 1,
            fontSize: "1.25em",
        },
        color: theme.palette.primary.main,
        fontSize: "2em",
        fontWeight: "bold"
    }
}));

const useRouteMatch = (patterns: readonly string[]) => {
    const { pathname } = useLocation();

    for (const pattern of patterns) {
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null && possibleMatch !== undefined) {
            return possibleMatch;
        }
    }

    return null;
}


const Header: React.FC = () => {
    // The supported languages keyed by their language code.
    const languages = [
        { key: "en", value: "english" },
        { key: "fr", value: "french" },
        { key: "es", value: "spanish" }
    ];

    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const history = useHistory();
    const location = useLocation();
    const routeMatch = useRouteMatch(["/", "/about", "/explore"])

    useEffect(() => {
        const currentTabName = routeMatch?.path;
        switch(currentTabName) {
            case "/":
                setTabValue(0);
                break;
            case "/explore":
                setTabValue(1);
                break;
            case "/about":
                setTabValue(2);
                break;
            default:
                setTabValue(0)
        }
    }, [])

    const handleMenuButtonClick = (event: any) => {
        setAnchorEl(event.target);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = () => {
        if (location.pathname === "/explore") {
            history.push("/");
        }
    };

    const handleTabChange = (event: any, index: number) => {        
        setTabValue(index);
    };

    const renderBikeMapsLink = () => {
        if (i18n.language.startsWith("fr")) {
            return (
                <IconButton
                    aria-label="Hyperlink to BikeMaps French site."
                    className={classes.linkButton}
                    href="https://bikemaps.org/fr"
                    target="_blank"
                    size="large">
                    <img
                        alt="BikeMaps logo"
                        src={BikeMapsLogo}
                    />
                </IconButton>
            );
        }

        // French site
        return (
            <IconButton
                aria-label="Hyperlink to BikeMaps English site."
                className={classes.linkButton}
                href="https://bikemaps.org"
                target="_blank"
                size="large">
                <img
                    alt="BikeMaps logo"
                    src={BikeMapsLogo}
                />
            </IconButton>
        );
    };

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
                    size="large">
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
        const isNotSpanish= !(i18n.language.startsWith("es"));

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
                <Tab aria-controls="map-tabpanel" component={Link} id="map-tab" label={t("map")} to="/" value={0} />
                { isNotSpanish && (
                    <Tab aria-controls="explore-tabpanel" component={Link} id="explore-tab" label={t("header-explore")} to="/explore" value={1} />
                )}
                <Tab component={Link} id="about-tabpanel" label={t("common_about")} to="/about" value={2} />
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
                    <Hidden mdDown>
                        {renderTabs()}
                    </Hidden>
                    <LanguageSelector handleLanguageChange={handleLanguageChange} languages={languages} position="below" />
                    <Hidden mdDown>
                        {renderBikeMapsLink()}
                    </Hidden>
                    {renderSecondaryNavAsList()}
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Header;