import React, { useState } from "react";
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

import "@fontsource/ubuntu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    langaugeMenu: {
        zIndex: 1,
    },
    link: {
        color: theme.palette.common.white,
        textDecoration: "none",
    },
    linkButton: {
        color: theme.palette.common.black,
    },
    menuButton: {
        color: theme.palette.common.white,
    },
    menuLink: {
        color: theme.palette.common.black,
        textDecoration: "none",
    },
    tabs: {
        color: theme.palette.common.white,
        flexGrow: 1,
    },
    title: {
        fontFamily: "Ubuntu",
        [theme.breakpoints.down("md")]: {
            flexGrow: 1,
        }
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

    const renderHelpButton = () => {
        return (
            <LinkButton path="/help" label={t("help")} />
        );
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
            <Hidden mdDown>
                <LanguageSelector languages={languages} />
                {renderHelpButton()}
            </Hidden>
        );
    };

    // Render a navigation menu when screen size is <= 960px
    const renderSecondaryNavAsList = () => {
        return (
            <Hidden lgUp>
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
                    <Hidden mdUp>
                        <Link className={classes.menuLink} to="/">
                            <MenuItem
                                onClick={handleMenuClose}
                            >
                                {t("map")}
                            </MenuItem>
                        </Link>
                        <Link className={classes.menuLink} to="/explore">
                            <MenuItem
                                onClick={handleMenuClose}
                            >
                                {t("explore")}
                            </MenuItem>
                        </Link>
                        <Link className={classes.menuLink} to="/about">
                            <MenuItem
                                onClick={handleMenuClose}
                            >
                                {t("common_about")}
                            </MenuItem>
                        </Link>
                        <Link className={classes.menuLink} to="/contact">
                            <MenuItem
                                onClick={handleMenuClose}
                            >
                                {t("contact")}
                            </MenuItem>
                        </Link>
                    </Hidden>
                    <Link className={classes.menuLink} to="/help">
                        <MenuItem
                            onClick={handleMenuClose}
                        >
                            {t("help")}
                        </MenuItem>
                    </Link>
                    <MenuItem
                        onClick={handleLanguageChange}
                    >
                        {"English"}
                        <ListItemIcon>
                            <ArrowRight />
                        </ListItemIcon>
                    </MenuItem>
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
                    className={classes.tabs}
                    onChange={handleTabChange}
                    value={tabValue} 
                >
                    <Tab component={Link} label={t("map")} to="/" />
                    <Tab component={Link} label={t("explore")} to="/explore" />
                    <Tab component={Link} label={t("common_about")} to="/about" />
                    <Tab component={Link} label={t("contact")} to="/contact" />
                </Tabs>
            </Hidden>
        );
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} color="primary" position="fixed">
                <Toolbar>
                    <Typography className={classes.title} variant="h5">
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

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     appBar: {
//         background: theme.palette.primary.main,
//         zIndex: theme.zIndex.drawer + 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(0),
//         color: "white",
//     },
//     tabs: {
//         flexGrow: 2,
//     },
//     title: {
//         paddingLeft: 35,
//         flexGrow: 1,
//         fontFamily: "Ubuntu",
//     },
//   }));

// interface HeaderProps {
//     tabChangedHandler: (index: number) => void;
// }

// const Header = (props: HeaderProps) => {
//     const classes = useStyles();
//     const [value, setValue] = useState(0);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);

//     const onChangeHandler = (event: any, index: number) => {
//         if (value !== index) {
//             setValue(index);
//             changeTab(index);
//         }
//     };

//     const changeTab = (tabIndex: number) => {
//         props.tabChangedHandler(tabIndex);
//     };

//     const handleMenuButtonClick = (event: any) => {
//         setAnchorEl(event.target);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <div className={classes.root}>
//             <AppBar position="fixed" className={classes.appBar}>
//                 <Toolbar>
//                     <AccessibleForwardIcon fontSize="large" />
//                     <DirectionsWalkIcon fontSize="large" />
//                     <DirectionsBikeIcon fontSize="large" />
//                     <Typography align="left" variant="h4" className={classes.title}>
//                         Walk Roll Map
//                     </Typography>
//                     <Tabs value={value} onChange={onChangeHandler} aria-label="Sample layouts" className={classes.tabs}>
//                         <Tab label="Home" {...a11yProps(0)} />
//                         <Tab label="Explore" {...a11yProps(1)} />
//                         <Tab label="About" {...a11yProps(2)} />
//                         <Tab label="Contact Us" {...a11yProps(3)} />
//                     </Tabs>
//                     <IconButton edge="end" className={classes.menuButton} onClick={handleMenuButtonClick}>
//                         <MenuIcon fontSize="large" />
//                     </IconButton>
//                     <Menu
//                         anchorEl={anchorEl}
//                         keepMounted
//                         open={open}
//                         onClose={handleMenuClose}
//                         TransitionComponent={Fade}
//                     >
//                         <MenuItem
//                             onClick={handleMenuClose}
//                         >
//                             Help
//                         </MenuItem>
//                         <MenuItem
//                             onClick={handleMenuClose}
//                         >
//                             Settings
//                         </MenuItem>
//                         <MenuItem
//                             onClick={handleMenuClose}
//                         >
//                             Language
//                         </MenuItem>
//                     </Menu>
//                 </Toolbar>
//             </AppBar>
//         </div>
//     );
// }


// function a11yProps(index: number) {
//     return {
//       id: `simple-tab-${index}`,
//       'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

export default Header;