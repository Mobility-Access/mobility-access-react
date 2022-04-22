
import { AmenityUrl, HazardUrl, IncidentUrl } from "../Constants";
import { FeatureCollection, ReportType } from "../FormTypes";

export const GetReportsAsFeatureCollection = async (type: ReportType, filter: boolean): Promise<FeatureCollection> => {
    let url = getReportTypeUrl(type);
    if (filter) {
        url = `${url}?filter=${filter}`;
    }

    const response = await fetch(url);

    if (response.ok) {
        return await response.json() as FeatureCollection;
    } else {
        console.log(`An error occurred while fetching the Amenity features: ${response.status} - ${response.statusText}`);
        return {
            type: "FeatureCollection",
            features: [],
            totalCount: 0,
        };
    }
};

const getReportTypeUrl = (type: ReportType) => {
    switch (type) {
        case ReportType.Amenity:
            return AmenityUrl;
        case ReportType.Hazard:
            return HazardUrl;
        case ReportType.Incident:
            return IncidentUrl;
        default:
            console.log("Unrecognized report type.")
            return "";
    }
};