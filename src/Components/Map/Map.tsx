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
import {Circle as CircleStyle, Fill, Icon, RegularShape, Stroke, Style} from "ol/style";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector"
import OLView from "ol/View";
import MapBrowserEvent from "ol/MapBrowserEvent";

import { AmenityFields } from "../Form/Amenity/AmenityController";
import FormWizard from "../Form/FormWizard";
import { ReportType } from "../../FormTypes";

import "ol/ol.css";
import "./Map.css";
import { squareMarker } from "./Markers";
import Colors from "../../Colors";
import pin from "../../images/icons/marker.svg";
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import { EventsKey } from "ol/events";
import { unByKey } from "ol/Observable";

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
    const [geolocation] = useState(new Geolocation({
        trackingOptions: {
            enableHighAccuracy: true,
        },
        projection: map.getView().getProjection(),
    }));
    const [accuracyFeature] = useState<Feature>(new Feature());
    const [positionFeature] = useState<Feature>(new Feature());
    const [markers] = useState<Feature[]>([]);
    const [markerSource] = useState(new VectorSource({ features: markers}));
    const [markerLayer] = useState(new VectorLayer({ map, source: markerSource}));
    const [newReportCoords, setNewReportCoords] = useState<Coordinate>([]);
    const [reportPoint, setReportPoint] = useState<Coordinate>([]);
    const [handleClick, setHandleClick] = useState(false);
    // let mapClickEventHandler: EventsKey;

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

            console.log(coords);

            positionFeature.setGeometry(coords ? new OLPoint(coords) : undefined);
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        }
    }

    const getMarkerStyle = (reportType: string) => {
        if (reportType) {
            return new Style({
                image: new Icon({
                    anchor: [0.5, 0.75],
                    anchorYUnits: IconAnchorUnits.FRACTION,
                    src: pin
                })
            });
        } else {
            new Style({
                image: new Icon({
                    anchor: [0.5, 50],
                    src: pin
                }),
            });
        }
    };

    const handleMapClick =  (event: MapBrowserEvent) => {
        if (event && event.coordinate && handleClick) {
            markerSource.clear();
            setNewReportCoords(event.coordinate);
            const feature = new Feature();
            const style = getMarkerStyle("red");
            feature.setStyle(style);
            feature.setGeometry(new OLPoint(event.coordinate));
            markerSource.addFeature(feature);
        }
    }

    const enableMapClickListener = () => {
        setHandleClick(true);
        map.on("click", handleMapClick);
    };

    const disableMapClickListener = () => {
        setHandleClick(false);
    };

    const resetReportCoords = () => {
        setNewReportCoords([]);
        markerSource.clear();
    };

    // const handleMapClick = (event: MapBrowserEvent) => {
    //     if (event && event.coordinate) {
    //         console.log(event.coordinate);
    //         const feature = new Feature();
    //         feature.setStyle(new Style({
    //             image: new CircleStyle({
    //                 radius: 6,
    //                 fill: new Fill({
    //                     color: '#3399CC',
    //                 }),
    //             stroke: new Stroke({
    //                 color: '#fff',
    //                 width: 2,
    //             }),
    //         })}));
    //         feature.setGeometry(new OLPoint(event.coordinate));
    //         markerSource.addFeature(feature);
    //     }
    // };

    useEffect(() => {
        if (map.getTarget() === undefined) {
            map.setTarget("map");
        }

        if (firstLoad) {
            if (navigator && "geolocation in navigator") {
                const position = navigator.geolocation.getCurrentPosition(updatePositionFromGeolocation);
            }

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
            firstLoad = false;
        }

        new VectorLayer({
            map: map,
            source: new VectorSource({
                features: [accuracyFeature, positionFeature]
            })
        });

        

        window.dispatchEvent(new CustomEvent("resize"));
    });

    // Placeholder function
    const handleAddNewFeature= (reportType: ReportType, fields: AmenityFields) => {
        console.log("placeholder");
    }

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
                    <FormWizard
                        addNewFeature={handleAddNewFeature}
                        clearFeaturePopup={() => console.log("Hide the popup overlay")}
                        geolocateHandler={updatePositionFromGeolocation}
                        newReportCoords={newReportCoords}
                        resetReportCoords={resetReportCoords}
                        startMapClickListener={enableMapClickListener}
                        stopMapClickListener={disableMapClickListener} />
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