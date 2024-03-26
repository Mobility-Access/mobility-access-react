import React from "react";

import Fab from "@mui/material/Fab";
import makeStyles from '@mui/styles/makeStyles';
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

interface GeolocateProps {
    className?: any;
    handleGeolocate: (value:any) => void,
}

const borderRadius = "5px";
const height = "32px";

const useStyles = makeStyles(() => ({
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

    return (
        <div className={`${className}`}>
            <div className={classes.root}>
                <Fab aria-label="Find my location" className={classes.button} onClick={handleGeolocate}>
                    <GpsFixedIcon titleAccess="Geolocate icon" />
                </Fab>
            </div>            
        </div>
    );
};

export default Geolocate;