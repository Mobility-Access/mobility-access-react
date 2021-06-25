import React, { createRef } from "react"
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Snackbar from "@material-ui/core/Snackbar";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import IconButton from '@material-ui/core/IconButton';

import "./Map.css";
import { Coordinate } from "ol/coordinate";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Geolocation from "ol/Geolocation";
import Point from "ol/geom/Point";
import Translate, { TranslateEvent } from "ol/interaction/Translate";
import OLMap from "ol/Map";
import { Vector as VectorSource } from 'ol/source';
import OSMSource from "ol/source/OSM";
import { fromLonLat } from "ol/proj"
import {Circle as CircleStyle, Fill, Icon, RegularShape, Stroke, Style} from "ol/style";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector"
import Overlay from "ol/Overlay";
import OverlayPositioning from "ol/OverlayPositioning";
import OLView from "ol/View";
import MapBrowserEvent from "ol/MapBrowserEvent";

import { withTranslation } from "react-i18next";

import FormWizard from "../Form/FormWizard";

import "ol/ol.css";
import "./Map.css";
import { AmenityFields } from "../Form/Amenity/AmenityController";
import FormTitle from "../Form/FormTitle";
import { GetAmenityFeatureCollection } from "../Form/Amenity/AmenityService";
import { GetIncidentFeatureCollection } from "../Form/Incident/IncidentService";
import { GetMicroBarrierFeatureCollection } from "../Form/MicroBarrier/MicroBarrierService";
import { GetSafetyFeatureCollection } from "../Form/Safety/SafetyService";
import { IncidentType, MicroBarrierType } from "../../FormTypes";

import { squareMarker } from "./Markers";
import Popup, { PopupContentItem } from "./Popup";
import Colors from "../../Colors";
import amenityMarker from "../../images/icons/amenity_marker.svg";
import barrierMarker from "../../images/icons/barrier_marker.svg";
import incidentMarker from "../../images/icons/incident_marker.svg";
import safetyMarker from "../../images/icons/safety_marker.svg";
import reportMarker from "../../images/icons/report_marker.svg";
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import { EventsKey } from "ol/events";
import { unByKey } from "ol/Observable";
import { ReportType } from "../../FormTypes";
import Geometry from "ol/geom/Geometry";

interface MapState {
    amenitySource: VectorSource;
    dialogOpen: boolean;
    dialogVisible: boolean;
    incidentSource: VectorSource;
    markers: Feature[];
    markerLayer: VectorLayer;
    markerSource: VectorSource;
    microBarrierSource: VectorSource;
    mobileLocationVisible: boolean;
    newReportButtonVisible: boolean;
    open: boolean;
    popupContentItems: PopupContentItem[];
    reportCoords: Coordinate;
    safetySource: VectorSource;
    snackbarOpen: boolean;
}

const styles = (theme: any) => createStyles({
    dialog: {
        display: "none",
    },
    disabled: {
        backgroundColor: Colors.contrast,
        color: Colors.primary,
    },
    mobileLocation: {
        backgroundColor: Colors.contrast,
        color: Colors.primary,
        fontWeight: "bold",
        left: "50%",
        position: "absolute",
        bottom: "0.5em",
        transform: "translateX(-50%)",
        "& .Mui-disabled": {
            color: Colors.primary
          }
    },
    mobileLocationButton: {
        fontWeight: "bold",
        left: "50%",
        position: "relative",
        transform: "translateX(-50%)"
    },
    mobileLocationDescription: {
        margin: "5px",
    },
    newReportButton: {
        backgroundColor: Colors.contrast,
        color: Colors.primary,
        fontWeight: "bold",
        left: "0.5em",
        position: "absolute",
        top: "calc(64px + 0.5em)",
    },
    newReportButton2: {
        backgroundColor: Colors.contrast,
        color: Colors.primary,
        fontWeight: "bold",
        left: "50%",
        position: "absolute",
        bottom: "0.5em",
        transform: "translateX(-50%)"
    },
    snackbar: {
        backgroundColor: Colors.contrast,
        color: Colors.primary,
    },
});

interface Map2Props extends WithStyles<typeof styles> {}

class Map2 extends React.Component<Map2Props & {t: any}, MapState> {
    map!: OLMap;
    mapDiv: any;
    positionFeature: Feature;
    accuracyFeature: Feature;
    geolocation!: Geolocation;
    translate!: Translate;
    wrapper: React.RefObject<any>;
    popover!: Overlay;
    popupContainer: React.RefObject<any>;

    // Feature layer sources
    amenityFeatures: Feature[] = [];
    microBarrierFeatures: Feature[] = [];
    incidentFeatures: Feature[] = [];
    safetyFeatures: Feature[] = [];

    constructor(props: any) {
        super(props);
        this.positionFeature = new Feature();
        this.accuracyFeature = new Feature();
        this.state = {
            amenitySource: new VectorSource(),
            dialogOpen: false,
            dialogVisible: true,
            incidentSource: new VectorSource(),
            markers: [],
            markerLayer: new VectorLayer(),
            markerSource: new VectorSource(),
            microBarrierSource: new VectorSource(),
            mobileLocationVisible: false,
            newReportButtonVisible: true,
            open: true,
            popupContentItems: [],
            reportCoords: [],
            safetySource: new VectorSource(),
            snackbarOpen: false,
        };

        this.wrapper = createRef();
        this.popupContainer = createRef();

        // Bind functions
        this.disableMapClickListener = this.disableMapClickListener.bind(this);
        this.enableMapClickListener = this.enableMapClickListener.bind(this);
        this.handleAddNewFeature = this.handleAddNewFeature.bind(this);
        this.handleCancelOrComplete = this.handleCancelOrComplete.bind(this);
        this.handleFeatureClick = this.handleFeatureClick.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMobileNewReportClick = this.handleMobileNewReportClick.bind(this);
        this.handleNewMobileMarker = this.handleNewMobileMarker.bind(this);
        this.handleTranslateEnd = this.handleTranslateEnd.bind(this);
        this.hideFeaturePopupOverlay = this.hideFeaturePopupOverlay.bind(this);
        this.renderFormWizard = this.renderFormWizard.bind(this);
        this.setReportCoords = this.setReportCoords.bind(this);
        // this.toggleDialog = this.toggleDialog.bind(this);
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
                zoom: 13,
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

        this.addFeatureLayers();

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

        this.popover = new Overlay({
            element: this.popupContainer.current,
            positioning: OverlayPositioning.BOTTOM_CENTER,
            stopEvent: false,
            offset: [0, -50]
        });

        this.map.addOverlay(this.popover);

        // Start listening for clicks on features for popups
        this.map.on("singleclick", this.handleFeatureClick);

        this.map.updateSize();
    }

    addFeatureLayers() {
        this.addAmenityFeatureLayer();
        this.addMicroBarrierFeatureLayer();
        this.addSafetyFeatureLayer();
        this.addIncidentFeatureLayer();
    }

    async addAmenityFeatureLayer() {
        const amenityFeatureCollection = await GetAmenityFeatureCollection() || {
            type: "FeatureCollection",
            features: []
        };

        this.state.amenitySource.addFeatures(new GeoJSON().readFeatures(amenityFeatureCollection));

        const amenityLayer = new VectorLayer({
            map: this.map,
            source: this.state.amenitySource,
            style: this.getMarkerStyle(ReportType.Amenity)
        });
    }

    async addMicroBarrierFeatureLayer() {
        const barrierFeatureCollection = await GetMicroBarrierFeatureCollection() || {
            type: "FeatureCollection",
            features: []
        };

        this.state.microBarrierSource.addFeatures(new GeoJSON().readFeatures(barrierFeatureCollection));

        const barrierLayer = new VectorLayer({
            map: this.map,
            source: this.state.microBarrierSource,
            style: this.getMarkerStyle(ReportType.MicroBarrier)
        });
    }

    async addIncidentFeatureLayer() {
        const incidentFeatureCollection = await GetIncidentFeatureCollection() || {
            type: "FeatureCollection",
            features: []
        };

        this.state.incidentSource.addFeatures(new GeoJSON().readFeatures(incidentFeatureCollection));

        const incidentLayer = new VectorLayer({
            map: this.map,
            source: this.state.incidentSource,
            style: this.getMarkerStyle(ReportType.Incident)
        });
    }

    async addSafetyFeatureLayer() {
        const safetyFeatureCollection = await GetSafetyFeatureCollection() || [{
            type: "FeatureCollection",
            features: []
        }];

        this.state.safetySource.addFeatures(new GeoJSON().readFeatures(safetyFeatureCollection));

        const safetyLayer = new VectorLayer({
            map: this.map,
            source: this.state.safetySource,
            style: this.getMarkerStyle(ReportType.Safety)
        });
    }

    disableMapClickListener() {
        // Stop listening for map click events for new report marker
        this.map.un("singleclick", this.handleMapClick);

        // Stop listening for drag events on the report marker
        this.map.removeInteraction(this.translate);

        // Start listening for map clicks on features
        this.map.on("singleclick", this.handleFeatureClick);
     };

    enableMapClickListener() {
        // Stop listening for map clicks on features
        this.map.un("singleclick", this.handleFeatureClick);

        // Start listening for map click for new report marker
        this.map.on("singleclick", this.handleMapClick);
    };

    getMarkerStyle(reportType?: string) {
        let marker;
        switch (reportType) {
            case ReportType.Amenity:
                marker = amenityMarker;
                break;
            case ReportType.Incident:
                marker = incidentMarker;
                break;
            case ReportType.MicroBarrier:
                marker = barrierMarker;
                break;
            case ReportType.Safety:
                marker = safetyMarker;
                break;
            default:
                marker = reportMarker;
        }

        return new Style({
            image: new Icon({
                anchor: [0.5, 0.75],
                anchorYUnits: IconAnchorUnits.FRACTION,
                scale: 0.35,
                src: marker
            })
        });
    };

    getPopupContentItems(feature: any): PopupContentItem[] {
        const capitalizeFirst = (str: string) => {
            if (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            } else {
                return "";
            }
        };

        if (!feature) {
            return [];
        }

        const items: PopupContentItem[] = [];
        const t = this.props.t;

        switch (feature.get("type")) {
            case ReportType.Amenity:
                const amenityType = feature.get("amenity_type");
                items.push({
                    key: t("popup_missing-amenity"),
                    value: capitalizeFirst(amenityType)
                });
                break;
            case ReportType.Incident:
                const incidentType = feature.get("incident_type");
                const incidentWith = feature.get("incident_with");
                items.push({
                    key: t("popup_incident"),
                    value: `${capitalizeFirst(incidentType)} - ${capitalizeFirst(incidentWith)}`
                });
                break;
            case ReportType.MicroBarrier:
                const microbarrierType = feature.get("barrier_type");
                const microbarrierSubtype = feature.get("barrier_subtype");

                items.push({
                    key: t("popup_microbarrier"),
                    value: `${capitalizeFirst(microbarrierType)} - ${capitalizeFirst(microbarrierSubtype)}`
                });

                if (microbarrierType === MicroBarrierType.Infrastructure) {

                    const infrastructureDetail = feature.get("barrier_detail");
                    items.push({
                        key: t("popup_microbarrier-infrastructure-detail"),
                        value: capitalizeFirst(infrastructureDetail)
                    });
                }
                break;
            case ReportType.Safety:
                const concernType = feature.get("concern_type");
                const concernWith = feature.get("concern_with");

                items.push({
                    key: t("popup_concern"),
                    value: `${capitalizeFirst(concernType)} - ${capitalizeFirst(concernWith)}`
                });
            break;
        }


        const dateString = feature.get("date");

        if (dateString) {
            const utcMilliseconds = parseInt(dateString);

            if (utcMilliseconds) {
                const date = new Date(0);
                date.setUTCMilliseconds(utcMilliseconds);

                items.push({
                    key: t("popup_date"),
                    value: date.toLocaleString()
                });
            }
        }

        const description = feature.get("description");

        if (description) {
            items.push({
                key: t("popup_description"),
                value: capitalizeFirst(description)
            });
        }

        return items;
    }

    handleAddNewFeature(reportType: ReportType, geojson: any) {
        const feature = new GeoJSON().readFeature(geojson);
        const style = this.getMarkerStyle(reportType);
        feature.setStyle(style);

        switch (reportType) {
            case ReportType.Amenity:
                this.state.amenitySource.addFeature(feature);
                break;
            case ReportType.Incident:
                this.state.incidentSource.addFeature(feature);
                break;
            case ReportType.MicroBarrier:
                this.state.microBarrierSource.addFeature(feature);
                break;
            case ReportType.Safety:
                this.state.safetySource.addFeature(feature);
                break;
            default:
                console.log("Invalid ReportType detected, unable to add new feature to the map."); 
        }
    }

    handleCancelOrComplete() {
        this.setReportCoords([]);
        this.state.markerSource.clear();
        this.setState({ dialogOpen: false, newReportButtonVisible: true });
    }

    handleFeatureClick(event: MapBrowserEvent) {
        const feature = this.map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
            return feature;
        });

        if (feature) {
            const geometry = feature.getGeometry() as Point;

            if (!geometry) {
                return;
            }

            const coords = geometry.getCoordinates();
            const items = this.getPopupContentItems(feature);
            this.setState({popupContentItems: items});
            this.popover.setPosition(coords);
        } else {
            this.popover.setPosition(undefined);
        }
    }

    handleMapClick(event: MapBrowserEvent) {
        if (event && event.coordinate) {
            this.state.markerSource.clear();
            this.setReportCoords(event.coordinate);
            const feature = new Feature();
            const style = this.getMarkerStyle();
            feature.setStyle(style);
            feature.setGeometry(new Point(event.coordinate));
            this.state.markerSource.addFeature(feature);

            // Listen for drag events on the report marker
            this.map.addInteraction(this.translate);
        }
    }

    handleMobileNewReportClick() {
        this.setState({
            mobileLocationVisible: !this.state.mobileLocationVisible,
            newReportButtonVisible: !this.state.newReportButtonVisible
        });
        this.enableMapClickListener();

    }

    handleNewMobileMarker() {
        this.disableMapClickListener();
        this.setState({
            dialogOpen: !this.state.dialogOpen,
            mobileLocationVisible: !this.state.mobileLocationVisible
        });
    }

    handleTranslateEnd(event: TranslateEvent) {
        if (event && event.coordinate) {
            this.setReportCoords(event.coordinate);
        }
    }

    hideFeaturePopupOverlay() {
        this.popover.setPosition(undefined);
    }

    setReportCoords(coords: Coordinate) {
        let newCoords = coords || [];
        this.setState({reportCoords: newCoords});
    }

    toggleDialog() {
        console.log("Toggling");
    }

    updatePositionFromGeolocation(position: any) {
        if (position && position.coords) {
            const { latitude, longitude } = position.coords;
            const coords = fromLonLat([longitude, latitude]);
            this.map.getView().setCenter(coords);
            this.map.getView().setZoom(15);

            console.log(coords);

            this.positionFeature.setGeometry(coords ? new Point(coords) : undefined);
            this.accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
        }
    }

    renderFormWizard() {
        this.setState({ dialogOpen: true, newReportButtonVisible: false });
    }

    render() {
        const { classes, t } = this.props;
        return  (
            <>
                <Hidden smDown>
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
                            addNewFeature={this.handleAddNewFeature}
                            clearFeaturePopup={this.hideFeaturePopupOverlay}
                            geolocateHandler={this.updatePositionFromGeolocation}
                            newReportCoords={this.state.reportCoords}
                            cancelOrComplete={this.handleCancelOrComplete}
                            startMapClickListener={this.enableMapClickListener}
                            stopMapClickListener={this.disableMapClickListener}
                            toggleDialog={this.toggleDialog} />
                    </Drawer>
                </Hidden>
                <div id="map" className="map" ref={this.wrapper} >
                    <Popup items={this.state.popupContentItems} ref={this.popupContainer} />
                    <Hidden mdUp>
                        { this.state.newReportButtonVisible && (
                            <>
                                {/* <Button className={classes.newReportButton} color="secondary" onClick={this.handleMobileNewReportClick} variant="contained">{ t("form_new-report") }</Button>     */}
                                <Button className={classes.newReportButton2} color="secondary" onClick={this.handleMobileNewReportClick} variant="contained">{ t("form_new-report") }</Button>
                            </>
                        )}
                        <Dialog className={ this.state.dialogVisible ? undefined : classes.dialog } fullScreen open={this.state.dialogOpen}>
                            <FormWizard
                                addNewFeature={this.handleAddNewFeature}
                                cancelOrComplete={this.handleCancelOrComplete}
                                clearFeaturePopup={this.hideFeaturePopupOverlay}
                                geolocateHandler={this.updatePositionFromGeolocation}
                                newReportCoords={this.state.reportCoords}
                                startMapClickListener={this.enableMapClickListener}
                                stopMapClickListener={this.disableMapClickListener}
                                toggleDialog={this.toggleDialog} />
                        </Dialog>
                        { this.state.mobileLocationVisible && ( 
                            <Button
                                classes={{ root: classes.mobileLocation}}
                                color="secondary"

                                onClick={this.handleNewMobileMarker}
                                variant="contained">
                                {t("form_location-description-mobile")}
                            </Button>
                            // <Snackbar 
                            //     ContentProps={{
                            //         className: classes.snackbar
                            //     }}
                            //  open={this.state.mobileLocationVisible} message={t("form_location-description-mobile")}/>
                            // <div className={classes.mobileLocation}>
                            //     <div className={classes.mobileLocationDescription}>
                            //         {t("form_location-description-mobile")}
                            //     </div>
                            //     <div>
                            //         <Button className={classes.mobileLocationButton} onClick={() => console.log("click")} variant="outlined">Continue</Button>
                            //     </div>
                            // </div>
                        )}
                    </Hidden>
                </div>
            </>
        );
    }
}

export default withStyles(styles, {withTheme: true})(withTranslation()(Map2));