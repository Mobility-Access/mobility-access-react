import React from "react"
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
import Translate, { TranslateEvent } from "ol/interaction/Translate";
import OLMap from "ol/Map";
import { Vector as VectorSource } from 'ol/source';
import OSMSource from "ol/source/OSM";
import { fromLonLat } from "ol/proj"
import {Circle as CircleStyle, Fill, Icon, RegularShape, Stroke, Style} from "ol/style";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector"
import OLView from "ol/View";
import MapBrowserEvent from "ol/MapBrowserEvent";

import FormWizard from "../Form/FormWizard";

import "ol/ol.css";
import "./Map.css";
import { squareMarker } from "./Markers";
import Colors from "../../Colors";
import pin from "../../images/icons/marker.svg";
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import { EventsKey } from "ol/events";
import { unByKey } from "ol/Observable";

interface MapState {
    markers: Feature[];
    markerLayer: VectorLayer;
    markerSource: VectorSource;
    open: boolean;
    reportCoords: Coordinate;
}

class Map2 extends React.Component<{}, MapState> {

    map!: OLMap;
    mapDiv: any;
    positionFeature: Feature;
    accuracyFeature: Feature;
    geolocation!: Geolocation;
    translate!: Translate;

    constructor(props: any) {
        super(props);
        this.positionFeature = new Feature();
        this.accuracyFeature = new Feature();
        this.state = {
            markers: [],
            markerSource: new VectorSource(),
            markerLayer: new VectorLayer(),
            open: true,
            reportCoords: [],
        };

        // Bind functions
        this.disableMapClickListener = this.disableMapClickListener.bind(this);
        this.enableMapClickListener = this.enableMapClickListener.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleTranslateEnd = this.handleTranslateEnd.bind(this);
        this.resetReportCoords = this.resetReportCoords.bind(this);
        this.setReportCoords = this.setReportCoords.bind(this);
        this.updatePositionFromGeolocation = this.updatePositionFromGeolocation.bind(this);
    }

    componentDidMount() {
        this.map = new OLMap({
            layers: [
                new TileLayer({
                    source: new OSMSource()
                }),
            ],
            view: new OLView({
                center: fromLonLat([-123.3501, 48.42661]),
                zoom: 1,
            }),
        });

        this.positionFeature.setStyle(
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

        new VectorLayer({
            map: this.map,
            source: new VectorSource({
                features: [this.accuracyFeature, this.positionFeature]
            })
        });

        this.state.markerSource.addFeatures(this.state.markers);
        this.state.markerLayer.setMap(this.map);
        this.state.markerLayer.setSource(this.state.markerSource);
        this.translate = new Translate({
            features: this.state.markerLayer.getSource().getFeaturesCollection(),
        });

        this.translate.on("translateend", this.handleTranslateEnd);

        this.geolocation = new Geolocation({
            trackingOptions: {
                enableHighAccuracy: true,
            },
            projection: this.map.getView().getProjection(),
        });
        
        if (this.map.getTarget() === undefined) {
            this.map.setTarget("map");
        }

        if (navigator && "geolocation in navigator") {
            navigator.geolocation.getCurrentPosition(this.updatePositionFromGeolocation);
        }
    }

    disableMapClickListener() {
        this.map.un("click", this.handleMapClick);

        // Stop listening for drag events on the report marker
        this.map.removeInteraction(this.translate);
     };

    enableMapClickListener() {
        // setHandleClick(true);
        this.map.on("click", this.handleMapClick);
    };

    getMarkerStyle(reportType: string) {
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

    handleMapClick(event: MapBrowserEvent) {
        if (event && event.coordinate) {
            this.state.markerSource.clear();
            this.setReportCoords(event.coordinate);
            const feature = new Feature();
            const style = this.getMarkerStyle("red");
            feature.setStyle(style);
            feature.setGeometry(new OLPoint(event.coordinate));
            this.state.markerSource.addFeature(feature);

            // Listen for drag events on the report marker
            this.map.addInteraction(this.translate);
        }
    }

    handleTranslateEnd(event: TranslateEvent) {
        if (event && event.coordinate) {
            this.setState({reportCoords: event.coordinate});
        }
    }

    resetReportCoords() {
        this.setReportCoords([]);
        this.state.markerSource.clear();
    };

    setReportCoords(coords: Coordinate) {
        if (coords) {
            this.setState({reportCoords: coords});
        }
    }

    updatePositionFromGeolocation(position: any) {
        if (position && position.coords) {
            const { latitude, longitude } = position.coords;
            const coords = fromLonLat([longitude, latitude]);
            this.map.getView().setCenter(coords);
            this.map.getView().setZoom(15);

            console.log(coords);

            this.positionFeature.setGeometry(coords ? new OLPoint(coords) : undefined);
            this.accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
        }
    }

    render() {
        return  (
            <>
                <Drawer
                    anchor="left"
                    classes={{
                        paper: "drawerPaper"
                    }}
                    className="drawer"
                    open={this.state.open}
                    variant="persistent"
                >
                    <Toolbar />
                    <FormWizard
                        geolocateHandler={this.updatePositionFromGeolocation}
                        newReportCoords={this.state.reportCoords}
                        resetReportCoords={this.resetReportCoords}
                        startMapClickListener={this.enableMapClickListener}
                        stopMapClickListener={this.disableMapClickListener} />
                </Drawer>
                <div id="map" className="map" ></div>
            </>
        );
    }
}

export default Map2;