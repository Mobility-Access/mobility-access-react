import React, { useEffect, useState } from "react"
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';

import "./Map.css";
import { Coordinate } from "ol/coordinate";
import OLMap from "ol/Map";
import OLView from "ol/View";
import TileLayer from "ol/layer/Tile";
import Source from "ol/source/OSM";

import "ol/ol.css";
import "./Map.css";
import Colors from "../../Colors";

import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    drawer: {
        width: "250px",
    },
    legendButton: {
        background: Colors.olButton,
        color: theme.palette.common.white,
        position: "absolute",
        right: theme.spacing(1),
        marginTop: theme.spacing(1),
        "&:hover": {
            background: Colors.secondary,
        },
    },
    map: {
        height: "100%",
        position: "fixed",
        width: "100%",
    },
}));

const Map = () => {
    const [center, setCenter] = useState<Coordinate>([0,0]);
    const [zoom, setZoom] = useState<number>(1);
    const [showLegend, setShowLegend] = useState(false);
    const { t } = useTranslation();
    const classes = useStyles();

    const map = new OLMap({
        layers: [
            new TileLayer({
                source: new Source()
            })
        ],
        view: new OLView({
            center: [0, 0],
            zoom: 1,
        })
    })


    // const updateMap = () => {
    //     map.getView().setCenter(center);
    //     map.getView().setZoom(zoom);
    // }

    useEffect(() => {
        if (map.getTarget() === undefined) {
            map.setTarget("map");
        }
    });

    const toggleLegend = () => {
        setShowLegend(!showLegend);
    };

    return (
        <>
            <div id="map" className={classes.map} ></div>
            {/* <Button 
                aria-label="open legend"
                className={classes.legendButton}
                onClick={toggleLegend}
                variant="contained">
                {t("map_legend")}
            </Button>
            <Drawer
                anchor="right"
                className={classes.drawer}
                open={showLegend}
                variant="persistent"
            >
                <div className={classes.appBarSpacer}></div>
                <div>
                    <IconButton onClick={toggleLegend}>
                        <ChevronRightIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {t("map_legend")}
                    </Typography>
                </div>
                
            </Drawer> */}
        </>

    )
}

export default Map;

// interface MapProps {
//     children: any,
//     zoom: any,
//     center: any,
// }

// const Map = (props: MapProps) => {
//     // const mapRef = useRef<HTMLElement>();
//     const [map, setMap] = useState<ol.Map>();

//     useEffect(() => {
//         let options = {
//           view: new ol.View({ zoom: props.zoom, center: props.zoom }),
//           layers: [],
//           controls: [],
//           overlays: []
//         };

//         let mapObject = new ol.Map(options);
//         // mapObject.setTarget(mapRef);
//         setMap(mapObject);

//         return () => mapObject.setTarget(undefined);
//         }, []
//     );

//     useEffect(() => {
//         if (!map) {
//             return;
//         }

//         map.getView().setZoom(props.zoom);
//         }, [props.zoom]
//     );

//     useEffect(() => {
//         if (!map) {
//             return;
//         }

//         map.getView().setCenter(props.center)
//         }, [props.center]
//     );

//     const { children } = props;
    
//     return (
//         <MapContext.Provider value={{ map }}>
//           <div className="ol-map">
//             {children}
//           </div>
//         </MapContext.Provider>
//       )

// }

// export default Map;