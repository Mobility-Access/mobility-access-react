import React, { createRef } from "react"
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Hidden from "@material-ui/core/Hidden";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from "ol/style";
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
import Geocoder from "./Geocoder";
import CancelDialog from "../Form/CancelDialog";
import { GetAmenityFeatureCollection } from "../Form/Amenity/AmenityService";
import { GetHazardFeatureCollection } from "../Form/Hazard/HazardService"; 
import { GetIncidentFeatureCollection } from "../Form/Incident/IncidentService";

import Legend from "./Legend";
import Popup, { PopupContentItem } from "./Popup";
import Colors from "../../Colors";
import amenityMarker from "../../images/icons/amenity_marker.svg";
import hazardMarker from "../../images/icons/hazard_marker.svg";
import incidentMarker from "../../images/icons/incident_marker.svg";
import reportMarker from "../../images/icons/report_marker.svg";
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import { ReportType } from "../../FormTypes";

interface MapState {
    amenitySource: VectorSource;
    cancelDialogOpen: boolean;
    dialogOpen: boolean;
    dialogVisible: boolean;
    hazardSource: VectorSource;
    incidentSource: VectorSource;
    legendVisible: boolean;
    legendVisible2: boolean;
    locationError: boolean;
    markers: Feature[];
    markerLayer: VectorLayer;
    markerSource: VectorSource;
    mobileLocationVisible: boolean;
    newReportButtonVisible: boolean;
    open: boolean;
    popupContentItems: PopupContentItem[];
    reportCoords: Coordinate;
    snackbarOpen: boolean;
}

const styles = (theme: any) => createStyles({
    buttonBar: {
        marginTop: theme.spacing(2),
        textAlign: "right",
    },
    buttonBarButton: {
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
    cancelButton: {
        borderColor: Colors.contrastRed,
        color: Colors.contrastRed,
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
        '&:hover': {
            borderColor: Colors.contrastRed
        },
    },
    dialog: {
        display: "none",
    },
    disabled: {
        backgroundColor: Colors.contrast,
        color: Colors.primary,
    },
    formContainer: {
        color: theme.palette.primary.main,
        overflowY: "auto",
        width: "400px",
    },
    geocoder: {
        position: "absolute",
        top: 90,
        left: 11,
        zIndex: 2
    },
    locationForm: {
        backgroundColor: "white",
        bottom: 0,
        position: "absolute",
        width: "100%",
        zIndex: 3001
    },
    locationError: {
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    locationText: {
        color: Colors.primary,
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    mapContainer: {
        flexGrow: 1,
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
        bottom: "1.5em",
        transform: "translateX(-50%)"
    },
    root: {
        display: "flex",
        height: "calc(100% - 65px)",
    },
});

interface MapProps extends WithStyles<typeof styles> {}

class Map extends React.Component<MapProps & {t: any}, MapState> {
    map!: OLMap;
    mapDiv: any;
    positionFeature: Feature;
    accuracyFeature: Feature;
    geolocation!: Geolocation;
    translate!: Translate;
    wrapper: React.RefObject<any>;
    popover!: Overlay;
    popupContainer: React.RefObject<any>;

    // Feature layers
    amenityLayer!: VectorLayer;
    hazardLayer!: VectorLayer;
    incidentLayer!: VectorLayer;

    constructor(props: any) {
        super(props);
        this.positionFeature = new Feature();
        this.accuracyFeature = new Feature();
        this.state = {
            amenitySource: new VectorSource(),
            cancelDialogOpen: false,
            dialogOpen: false,
            dialogVisible: true,
            hazardSource: new VectorSource(),
            incidentSource: new VectorSource(),
            legendVisible: false,
            legendVisible2: false,
            locationError: false,
            markers: [],
            markerLayer: new VectorLayer(),
            markerSource: new VectorSource(),
            mobileLocationVisible: false,
            newReportButtonVisible: true,
            open: true,
            popupContentItems: [],
            reportCoords: [],
            snackbarOpen: false,
        };

        this.wrapper = createRef();
        this.popupContainer = createRef();

        // Bind functions
        this.disableMapClickListener = this.disableMapClickListener.bind(this);
        this.enableMapClickListener = this.enableMapClickListener.bind(this);
        this.handleAddNewFeature = this.handleAddNewFeature.bind(this);
        this.handleCancelMobileLocation = this.handleCancelMobileLocation.bind(this);
        this.handleCancelOrComplete = this.handleCancelOrComplete.bind(this);
        this.handleConfirmNo = this.handleConfirmNo.bind(this);
        this.handleConfirmYes = this.handleConfirmYes.bind(this)
        this.handleFeatureClick = this.handleFeatureClick.bind(this);
        this.handleGeocodeResult = this.handleGeocodeResult.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMobileNewReportClick = this.handleMobileNewReportClick.bind(this);
        this.handleNewMobileMarker = this.handleNewMobileMarker.bind(this);
        this.handleToggleLayerVisibliity = this.handleToggleLayerVisibliity.bind(this);
        this.handleTranslateEnd = this.handleTranslateEnd.bind(this);
        this.hideFeaturePopupOverlay = this.hideFeaturePopupOverlay.bind(this);
        this.renderFormWizard = this.renderFormWizard.bind(this);
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
        this.addHazardFeatureLayer();
        this.addIncidentFeatureLayer();
    }

    async addAmenityFeatureLayer() {
        const amenityFeatureCollection = await GetAmenityFeatureCollection() || {
            type: "FeatureCollection",
            features: []
        };

        this.state.amenitySource.addFeatures(new GeoJSON().readFeatures(amenityFeatureCollection));

        this.amenityLayer = new VectorLayer({
            map: this.map,
            source: this.state.amenitySource,
            style: this.getMarkerStyle(ReportType.Amenity)
        });
    }

    async addHazardFeatureLayer() {
        const hazardFeatureCollection = await GetHazardFeatureCollection() || {
            type: "FeatureCollection",
            features: []
        };

        this.state.hazardSource.addFeatures(new GeoJSON().readFeatures(hazardFeatureCollection));

        this.hazardLayer = new VectorLayer({
            map: this.map,
            source: this.state.hazardSource,
            style: this.getMarkerStyle(ReportType.Hazard)
        });
    }

    async addIncidentFeatureLayer() {
        const incidentFeatureCollection = await GetIncidentFeatureCollection() || {
            type: "FeatureCollection",
            features: []
        };

        this.state.incidentSource.addFeatures(new GeoJSON().readFeatures(incidentFeatureCollection));

        this.incidentLayer = new VectorLayer({
            map: this.map,
            source: this.state.incidentSource,
            style: this.getMarkerStyle(ReportType.Incident)
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
            case ReportType.Hazard:
                marker = hazardMarker;
                break;
            case ReportType.Incident:
                marker = incidentMarker;
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
            case ReportType.Hazard:
                const hazardType = feature.get("hazard_type");
                const hazardSubtype = feature.get("hazard_subtype");
                items.push({
                    key: t("popup_hazard"),
                    value: `${capitalizeFirst(hazardType)} - ${capitalizeFirst(hazardSubtype)}`
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

        const id = feature.get("id");

        if (id) {
            items.push({
                key: t("popup_id"),
                value: id
            });
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
            case ReportType.Hazard:
                this.state.hazardSource.addFeature(feature);
                break;
            case ReportType.Incident:
                this.state.incidentSource.addFeature(feature);
                break;
            default:
                console.log("Invalid ReportType detected, unable to add new feature to the map."); 
        }
    }

    handleCancelMobileLocation() {
        this.setState({ cancelDialogOpen: true });
    }

    handleCancelOrComplete() {
        this.setReportCoords([]);
        this.state.markerSource.clear();
        this.setState({ dialogOpen: false, locationError: false, newReportButtonVisible: true });
    }

    handleConfirmNo() {
        this.setState({ cancelDialogOpen: false});
    }

    handleConfirmYes() {
        this.setState({ cancelDialogOpen: false, mobileLocationVisible: false });
        this.handleCancelOrComplete();
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

    handleGeocodeResult = (coords: Coordinate) => {
        if (coords && coords.length) {
            this.map.getView().setCenter(coords);
            this.map.getView().setZoom(12);
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
        if (!this.state.reportCoords || this.state.reportCoords.length !== 2) {
            this.setState( {locationError: true} );
            return;
        }

        this.disableMapClickListener();
        this.setState({
            dialogOpen: !this.state.dialogOpen,
            mobileLocationVisible: !this.state.mobileLocationVisible
        });
    }

    handleToggleLayerVisibliity(layerId: string, visible: boolean) {
        switch (layerId) {
            case "hazard":
                this.hazardLayer.setSource(visible ? this.state.hazardSource : new VectorSource());
                break;
            case "amenity":
                this.amenityLayer.setSource(visible ? this.state.amenitySource : new VectorSource());
                break;
            case "incident":
                this.incidentLayer.setSource(visible ? this.state.incidentSource : new VectorSource());
                break;
        }
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

    updatePositionFromGeolocation(position: any) {
        if (position && position.coords) {
            const { latitude, longitude } = position.coords;
            const coords = fromLonLat([longitude, latitude]);
            this.map.getView().setCenter(coords);
            this.map.getView().setZoom(15);

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
            <div className={classes.root}>
                <Hidden smDown>
                    <div className={classes.formContainer}>
                        <FormWizard
                            addNewFeature={this.handleAddNewFeature}
                            clearFeaturePopup={this.hideFeaturePopupOverlay}
                            newReportCoords={this.state.reportCoords}
                            cancelOrComplete={this.handleCancelOrComplete}
                            startMapClickListener={this.enableMapClickListener}
                            stopMapClickListener={this.disableMapClickListener} />
                    </div>
                </Hidden>
                <div id="map" className="map" ref={this.wrapper} >
                    <Geocoder className={classes.geocoder} handleGeocodeResult={this.handleGeocodeResult}/>
                    <Legend toggleLayer={this.handleToggleLayerVisibliity} />
                    <Popup items={this.state.popupContentItems} ref={this.popupContainer} />
                    <Hidden mdUp>
                        { this.state.newReportButtonVisible && (
                            <>
                                <Button className={classes.newReportButton2} color="secondary" onClick={this.handleMobileNewReportClick} variant="contained">{ t("form_new-report") }</Button>
                            </>
                        )}
                        {
                            this.state.mobileLocationVisible && (
                                <div className={classes.locationForm}>
                                    <Typography className={classes.locationText}>
                                        { t("form_location-description-mobile2") }
                                    </Typography>
                                    {
                                        this.state.locationError && (this.state.reportCoords.length !== 2) && (
                                            <Typography className={classes.locationError} color="error">
                                                { t("form_location-required") }
                                            </Typography>
                                        )
                                    }
                                    {
                                        this.state.reportCoords && this.state.reportCoords.length === 2 && (
                                            <Typography className={classes.locationText}>
                                                {t("form_location-captured")}
                                            </Typography>
                                        )
                                    }
                                    <div className={classes.buttonBar}>
                                        <Button
                                            className={classes.cancelButton}
                                            color="secondary"
                                            onClick={this.handleCancelMobileLocation}
                                            variant="outlined">
                                            {t("form_cancel")}
                                        </Button>
                                        <Button
                                            className={classes.buttonBarButton}
                                            color="primary"
                                            onClick={this.handleNewMobileMarker}
                                            variant="contained">
                                            {t("form_next")}
                                        </Button>
                                    </div>
                                </div>
                            )
                        }
                        <Dialog className={ this.state.dialogVisible ? undefined : classes.dialog } fullScreen open={this.state.dialogOpen}>
                            <FormWizard
                                addNewFeature={this.handleAddNewFeature}
                                cancelOrComplete={this.handleCancelOrComplete}
                                clearFeaturePopup={this.hideFeaturePopupOverlay}
                                newReportCoords={this.state.reportCoords}
                                startMapClickListener={this.enableMapClickListener}
                                stopMapClickListener={this.disableMapClickListener}
                            />
                        </Dialog>
                        <CancelDialog 
                            handleConfirmNo={this.handleConfirmNo}
                            handleConfirmYes={this.handleConfirmYes}
                            open={this.state.cancelDialogOpen}
                        />
                    </Hidden>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(withTranslation()(Map));