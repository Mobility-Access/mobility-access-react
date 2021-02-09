import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccessibleForwardIcon from "@material-ui/icons/AccessibleForward";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import MenuIcon from "@material-ui/icons/Menu";

import "@fontsource/ubuntu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        background: "#043927",
    },
    menuButton: {
        marginRight: theme.spacing(0),
        color: "white",
    },
    tabs: {
        flexGrow: 2,
    },
    title: {
        paddingLeft: 35,
        flexGrow: 1,
        fontFamily: "Ubuntu",
    },
  }));

interface HeaderProps {
    tabChangedHandler: (index: number) => void;
}

const Header = (props: HeaderProps) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const onChangeHandler = (event: any, index: number) => {
        if (value !== index) {
            setValue(index);
            props.tabChangedHandler(index);
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <AccessibleForwardIcon fontSize="large" />
                    <DirectionsWalkIcon fontSize="large" />
                    <DirectionsBikeIcon fontSize="large" />
                    <Typography align="left" variant="h4" className={classes.title}>
                        Mobility Access
                    </Typography>
                    <Tabs value={value} onChange={onChangeHandler} aria-label="Sample layouts" className={classes.tabs}>
                        <Tab label="Home" {...a11yProps(0)} />
                        <Tab label="About" {...a11yProps(1)} />
                        <Tab label="Explore" {...a11yProps(2)} />
                        <Tab label="Contact Us" {...a11yProps(3)} />
                    </Tabs>
                    <IconButton edge="end" className={classes.menuButton} >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}


function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default Header;