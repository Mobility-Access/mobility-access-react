import { IncidentFields } from "./IncidentController";
import { IncidentUrl } from "../../../Constants";
import { FeatureCollection, ReportType } from "../../../FormTypes";

export const SubmitincidentReport = async (report: IncidentFields) => {
    const data = {
        incident_type: report.incidentType,
        incident_with: report.incidentSubtype,
        injury_type: report.injury,
        involvement: report.involvement,
        birth_year: report.birthYear,
        date: report.date.valueOf(),
        description: report.description,
        disability: report.disability,
        disability_type: report.disabilityTypeOpen ? `${report.disabilityType} - ${report.disabilityTypeOpen}` : report.disabilityType,
        gender: report.genderOpen ? `${report.gender} - ${report.genderOpen}` : report.gender,
        geom: report.point,
        mobility_aid: report.mobilityAid,
        mobility_aid_type: report.mobilityAidTypeOpen ? `${report.mobilityAidType} - ${report.mobilityAidTypeOpen}` : report.mobilityAidType,
        race: report.identityOpen ? `${report.identity}, ${report.identityOpen}` : report.identity,
        type: ReportType.Incident,
    };

    const options: RequestInit = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        referrerPolicy: "origin",
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(IncidentUrl, options);
        
        if (response.ok) {
            // Success, return the point to the controller so it can be added to the map.
            return response.json();
        }
        else {
            // The server returned an error
            console.log(`An error occurred while processing your request: ${response.status} - ${response.statusText}`);
            return {
                serverError: true
            };
        }
    } catch (e) {
        // A network error occurred
        console.log(`A network error occurred: ${e}`)
        return {
            networkError: true
        };
    }
};

export const GetIncidentFeatureCollection = async (): Promise<FeatureCollection> => {
    const response = await fetch(`${IncidentUrl}`);

    if (response.ok) {
        return await response.json() as FeatureCollection;
    } else {
        console.log(`An error occurred while fetching the Incident features: ${response.status} - ${response.statusText}`);
        return {
            type: "FeatureCollection",
            features: []
        };
    }
};