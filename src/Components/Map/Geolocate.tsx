import React, { useCallback, useState } from "react";

import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";

import { useTranslation } from "react-i18next";

interface GeolocateProps {
    className?: any;
    handleGeolocate: (value:any) => void,
}

const borderRadius = "5px";
const height = "32px";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "white",
        borderRadius: borderRadius,
        height: height,
        minHeight: height,
        width: height,
    },
    root: {
        display: "flex"
    }
}));


// A component Material UI Floating Action Button used for triggering geolocation.
const Geolocate = (props: GeolocateProps) => {
    const { className, handleGeolocate } = props;
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={`${className}`}>
            <div className={classes.root}>
                <Fab className={classes.button} onClick={handleGeolocate}>
                    <GpsFixedIcon />
                </Fab>
            </div>            
        </div>
    );
};

export default Geolocate;