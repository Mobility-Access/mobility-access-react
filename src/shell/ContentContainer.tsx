import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import Header from "./Header";
import Map2 from "../Components/Map/Map2";
import AboutPanel from "../Components/About/AboutPanel";
import ContactPanel from "../Components/Contact/ContactPanel";
import ExplorationPanel from "../Components/Exploration/ExplorationPanel";
import HelpPanel from "../Components/Help/HelpPanel";


import "./ContentContainer.css";

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    contentBody: theme.mixins.toolbar,
    container: {
        height: "100%",
        overflow: "hidden",
    },
}));

const ContentContainer = () => {
    const classes = useStyles();

    return  (
        <div className={classes.container}>
            <Header />
            <div className={classes.appBarSpacer}></div>
            <Route exact path="/"><Map2 /></Route>
            <Route path="/about"><AboutPanel /></Route>
            <Route path="/contact"><ContactPanel /></Route>
            <Route path="/explore"><ExplorationPanel /></Route>
            <Route path="/help"><HelpPanel /></Route>
        </div>
    )
};

export default ContentContainer;