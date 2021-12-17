import { Icon, Style } from "ol/style";
import IconAnchorUnits from "ol/style/IconAnchorUnits";

import { ReportType } from "./FormTypes";
import amenityMarker from "./images/icons/amenity_marker.svg";
import hazardMarker from "./images/icons/hazard_marker.svg";
import incidentMarker from "./images/icons/incident_marker.svg";
import reportMarker from "./images/icons/report_marker.svg";

export const getLocalDateFromUtcMilliseconds = (millis: number) => {
    const date = new Date(0);
    date.setUTCMilliseconds(millis);

    return date.toLocaleString();
};

export const getMarkerStyle = (reportType?: string) => {
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