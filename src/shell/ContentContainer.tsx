import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Link, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Map from "../Components/Map/Map";
import AboutPanel from "../Components/About/AboutPanel";
import ContactPanel from "../Components/Contact/ContactPanel";
import ExplorationPanel from "../Components/Exploration/ExplorationPanel";
import HelpPanel from "../Components/Help/HelpPanel";
import ReportContainer from "../Components/Report/ReportContainer";
import SettingsPanel from "../Components/Settings/SettingsPanel";
import TabPanel from "./TabPanel";

import "./ContentContainer.css";

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
}));

const ContentContainer = () => {
    const classes = useStyles();

    return  (
        <div>
            <Header />
            <div className={classes.appBarSpacer}></div>
            <Route exact path="/"><Map /></Route>
            <Route path="/about"><AboutPanel /></Route>
            <Route path="/contact"><ContactPanel /></Route>
            <Route path="/explore"><ExplorationPanel /></Route>
            <Route path="/help"><HelpPanel /></Route>
        </div>
    )
};

export default ContentContainer;