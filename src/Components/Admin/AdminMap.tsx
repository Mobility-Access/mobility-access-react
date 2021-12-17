import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector"
import OLMap from "ol/Map";
import { fromLonLat } from "ol/proj"
import { Vector as VectorSource } from 'ol/source';
import OSMSource from "ol/source/OSM";
import OLView from "ol/View";

import "ol/ol.css";

import { ReportType } from "../../FormTypes";
import { getMarkerStyle } from "../../utilities";


interface AdminMapProps {
    // handleGometryChange: () => void;
    reportType: "amenity" | "hazard-concern" | "incident";
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        width: "100%",
    }
}));

const AdminMap = (props: AdminMapProps) => {
    const classes = useStyles();
    const { reportType } = { ...props }
    const [map, setMap] = useState<OLMap>(new OLMap({
        layers: [
            new TileLayer({
                source: new OSMSource()
            }),
        ],
        view: new OLView({
            center: fromLonLat([-123.3501, 48.42661]),
            zoom: 13,
        }),
    }));

    const style = getMarkerStyle(reportType);

    const layer = new VectorLayer({
        source: new VectorSource({
            features: [
                new Feature({
                    geometry: new Point(fromLonLat([4.35247, 50.84673]))
                })
            ]
        }),
        style,
    });
    

    useEffect(() => {
        if ( map.getTarget() === undefined) {
            map.setTarget("map");
        }
    });

    return (
        <div id="map" className={classes.root}></div>
    );
}

export default AdminMap;