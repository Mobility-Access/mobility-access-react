import React, { createRef } from "react"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import "./AdminMap.css";
import { Coordinate } from "ol/coordinate";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Translate, { TranslateEvent } from "ol/interaction/Translate";
import OLMap from "ol/Map";
import { Vector as VectorSource } from 'ol/source';
import OSMSource from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector"
import OLView from "ol/View";

import "ol/ol.css";
import { getMarkerStyle } from "../../utilities";

interface AdminMapState {
    markers: Feature[];
    markerLayer: VectorLayer<VectorSource>;
    markerSource: VectorSource;
    reportCoords: Coordinate;
}

const styles = (theme: any) => createStyles({
    mapContainer: {
        flexGrow: 1,
    },
    root: {
        display: "flex",
        height: "calc(100% - 65px)",
    },
});

interface AdminMapProps extends WithStyles<typeof styles> {
    coords: number[];
    handleGometryChange: (coords: number[]) => void;
    reportType: "amenity" | "hazard-concern" | "incident";
}

class AdminMap extends React.Component<AdminMapProps, AdminMapState> {
    centerMap: boolean = true;
    map!: OLMap;
    mapDiv: any;
    translate!: Translate;
    wrapper: React.RefObject<any>;

    constructor(props: any) {
        super(props);

        this.state = {
            markers: [],
            markerLayer: new VectorLayer(),
            markerSource: new VectorSource(),
            reportCoords: [],
        };

        this.wrapper = createRef();

        // Bind functions so 'this' is accessible at run time
        this.handleTranslateEnd = this.handleTranslateEnd.bind(this);    }

    componentDidMount() {
        this.map = new OLMap({
            layers: [
                new TileLayer({
                    source: new OSMSource()
                }),
            ],
            view: new OLView({
                center: [0,0],
                zoom: 16,
            }),
            target: "adminMap"
        });

        this.state.markerSource.addFeatures(this.state.markers);
        this.state.markerLayer.setMap(this.map);
        this.state.markerLayer.setSource(this.state.markerSource);
        
        const markerLayerSource = this.state.markerLayer.getSource()

        if (markerLayerSource !== null) {
            this.translate = new Translate({
                features: markerLayerSource.getFeaturesCollection() || undefined,
            });
        }

        this.translate.on("translateend", this.handleTranslateEnd);
        // Listen for drag events on the report marker
        this.map.addInteraction(this.translate);

        this.map.updateSize();
    }

    componentDidUpdate() {
        // The map only needs to be centered once when the coords prop becomes available
        if (this.centerMap && this.props.coords.length === 2) {
            this.map.getView().setCenter(this.props.coords);
            
            // The marker source object also needs to be updated at this point and the
            // feature only added once.
            const feature = new Feature();
            const style = getMarkerStyle(this.props.reportType);
            feature.setGeometry(new Point(this.props.coords));
            feature.setStyle(style);
    
            this.state.markerSource.addFeature(feature);
            this.centerMap = false;
        }
    }

    // Handler that gets called when the dragging of the report marker stops.
    // Calls the handleGeometryChange function from the parent component in
    // order to update the geometry stored in the form of the parent component.
    handleTranslateEnd(event: TranslateEvent) {
        const feature = this.state.markerSource.getFeatures()[0];
        const geometry = feature.getGeometry() as Point;
        if (geometry) {
            const coordinate = geometry.getCoordinates();
            this.props.handleGometryChange(coordinate)
        }
    }

    render() {
        const { classes} = this.props;
        return  (
            <div className={classes.root}>
                <div id="adminMap" className="adminMap" ref={this.wrapper} >
                </div>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(AdminMap);