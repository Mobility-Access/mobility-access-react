import React, { useEffect, useState } from "react"
// import AppBar from "@material-ui/core/AppBar";
// import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import IconButton from '@material-ui/core/IconButton';

import "./Map.css";
import { Coordinate } from "ol/coordinate";
import Feature from "ol/Feature";
import Geolocation from "ol/Geolocation";
import OLPoint from "ol/geom/Point";
import OLMap from "ol/Map";
import { Vector as VectorSource } from 'ol/source';
import Source from "ol/source/OSM";
import { fromLonLat } from "ol/proj"
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector"
import OLView from "ol/View";

import FormWizard from "../Form/FormWizard";

import "ol/ol.css";
import "./Map.css";
import Colors from "../../Colors";

// import { useTranslation } from "react-i18next";

const drawerWidth = 400;

export interface Point {
    x: number,
    y: number,
};

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    drawer: {
        backgroundColor: "red",
        flexShrink: 0,
        width: drawerWidth,
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
        flexGrow: 1,
        height: "100%",
        position: "fixed",
        width: "100%",
    },
    drawerPaper: {
        width: drawerWidth,
    },
    root: {
        display: "flex"
    },
}));

const Map = () => {
    const [center, setCenter] = useState<Coordinate>([0,0]);
    const [map, setMap] = useState(new OLMap({
        layers: [
            new TileLayer({
                source: new Source()
            })
        ],
        view: new OLView({
            center: fromLonLat([0, 0]),
            zoom: 1,
        }),
    }));
    const [open, setOpen] = useState(true);
    const [zoom, setZoom] = useState<number>(1);
    // const [showLegend, setShowLegend] = useState(false);
    // const { t } = useTranslation();
    const classes = useStyles();
    let firstLoad = true;

    map.on("moveend", () => {
        map.updateSize();
    });
 
    const updatePositionFromGeolocation = (position: any) => {
        if (position && position.coords) {
            const { latitude, longitude } = position.coords;
            const coords = fromLonLat([longitude, latitude]);
            map.getView().setCenter(coords);
            map.getView().setZoom(15);
        }
    }

    useEffect(() => {
        if (map.getTarget() === undefined) {
            map.setTarget("map");
        }

        if (firstLoad) {
            if (navigator && "geolocation in navigator") {
                const position = navigator.geolocation.getCurrentPosition(updatePositionFromGeolocation);
            }
            firstLoad = false;
        }

        const geolocation = new Geolocation({
            trackingOptions: {
                enableHighAccuracy: true,
            },
            projection: map.getView().getProjection(),
        });

        const accuracyFeature = new Feature();
        geolocation.on('change:accuracyGeometry', () => {
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        });

        const positionFeature = new Feature();
        positionFeature.setStyle(
            new Style({
                image: new CircleStyle({
					radius: 6,
					fill: new Fill({
						color: '#3399CC',
					}),
				stroke: new Stroke({
					color: '#fff',
					width: 2,
				}),
			})}),
		);

        geolocation.on('change:position', function () {
            var coordinates = geolocation.getPosition();
            positionFeature.setGeometry(coordinates ? new OLPoint(coordinates) : undefined);
          });

        new VectorLayer({
            map: map,
            source: new VectorSource({
                features: [accuracyFeature, positionFeature]
            })
        });

        window.dispatchEvent(new CustomEvent("resize"));
    });

    return (
        <>
            <Drawer
                anchor="left"
                classes={{
                    paper: classes.drawerPaper
                }}
                className={classes.drawer}
                open={open}
                variant="persistent"
            >
                <div className={classes.appBarSpacer}></div>
                    <FormWizard geolocateHandler={updatePositionFromGeolocation}></FormWizard>
            </Drawer>
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