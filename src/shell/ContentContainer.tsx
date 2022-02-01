import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";

import Admin from "../Components/Admin/Admin";
import AmenityAdmin from "../Components/Admin/AmenityAdmin";
import AmenityDetail from "../Components/Admin/AmenityDetail";
import ExportReports from "../Components/Admin/ExportReports";
import HazardAdmin from "../Components/Admin/HazardAdmin";
import HazardDetail from "../Components/Admin/HazardDetail";
import IncidentAdmin from "../Components/Admin/IncidentAdmin";
import IncidentDetail from "../Components/Admin/IncidentDetail";
import Map from "../Components/Map/Map";
import AboutPanel from "../Components/About/AboutPanel";
import ContactPanel from "../Components/Contact/ContactPanel";
import ExplorationPanel from "../Components/Exploration/ExplorationPanel";
import HelpPanel from "../Components/Help/HelpPanel";
import Header from "./Header";


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
            <Route exact path="/"><Map /></Route>
            <Route path="/about"><AboutPanel /></Route>
            <Route path="/contact"><ContactPanel /></Route>
            <Route path="/explore"><ExplorationPanel /></Route>
            <Route path="/help"><HelpPanel /></Route>
            <Route path="/reports/amenity/:id"><AmenityDetail /></Route>
            <Route exact path="/reports/amenity"><AmenityAdmin /></Route>
            <Route exact path="/reports/export"><ExportReports /></Route>
            <Route path="/reports/hazard/:id"><HazardDetail /></Route>
            <Route exact path="/reports/hazard"><HazardAdmin /></Route>
            <Route path="/reports/incident/:id"><IncidentDetail /></Route>
            <Route exact path="/reports/incident"><IncidentAdmin /></Route>
            <Route exact path="/reports"><Admin /></Route>
        </div>
    )
};

export default ContentContainer;