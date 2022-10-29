import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";

import AboutPanel from "../Components/About/AboutPanel";
import Admin from "../Components/Admin/Admin";
import AmenityAdmin from "../Components/Admin/AmenityAdmin";
import AmenityDetail from "../Components/Admin/AmenityDetail";
import ExportReports from "../Components/Admin/ExportReports";
import HazardAdmin from "../Components/Admin/HazardAdmin";
import HazardDetail from "../Components/Admin/HazardDetail";
import IncidentAdmin from "../Components/Admin/IncidentAdmin";
import IncidentDetail from "../Components/Admin/IncidentDetail";
import Login from "../Components/Admin/Login";
import NewUser from "../Components/Admin/NewUser";
import UserAdmin from "../Components/Admin/UserAdmin";
import ExplorationPanel from "../Components/Exploration/ExplorationPanel";
import HelpPanel from "../Components/Help/HelpPanel";
import Map from "../Components/Map/Map";
import UserDetail from "../Components/Admin/UserDetail";
import Swagger from "../Components/Swagger";

import Header from "./Header";
import PrivateRoute from "./PrivateRoute";

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
            <main 
                className={classes.container}
                aria-live="polite"
                id="main-content"
                role="region"
            >
                <Route exact path="/"><Map /></Route>
                <Route path="/about"><AboutPanel /></Route>
                <Route path="/explore"><ExplorationPanel /></Route>
                <Route path="/help"><HelpPanel /></Route>
                <PrivateRoute path="/reports/amenity/:id"><AmenityDetail /></PrivateRoute>
                <PrivateRoute exact path="/reports/amenity"><AmenityAdmin /></PrivateRoute>
                <PrivateRoute exact path="/reports/export"><ExportReports /></PrivateRoute>
                <PrivateRoute path="/reports/hazard/:id"><HazardDetail /></PrivateRoute>
                <PrivateRoute exact path="/reports/hazard"><HazardAdmin /></PrivateRoute>
                <PrivateRoute path="/reports/incident/:id"><IncidentDetail /></PrivateRoute>
                <PrivateRoute exact path="/reports/incident"><IncidentAdmin /></PrivateRoute>
                <PrivateRoute exact path="/reports"><Admin /></PrivateRoute>
                <Route exact path="/reports/login"><Login /></Route>
                <Route exact path="/reports/newuser"><NewUser /></Route>
                <PrivateRoute path="/reports/user/:id"><UserDetail /></PrivateRoute>
                <PrivateRoute exact path="/reports/user"><UserAdmin /></PrivateRoute>
                <Route exact path="/swagger.json"><Swagger /></Route>
            </main>
        </div>
    )
};

export default ContentContainer;