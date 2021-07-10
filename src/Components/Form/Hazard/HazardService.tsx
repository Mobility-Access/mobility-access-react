import { HazardFields } from "./HazardController";
import { HazardUrl } from "../../../Constants";
import { FeatureCollection, ReportType } from "../../../FormTypes";

export const SubmitHazardReport = async (report: HazardFields) => {
    const data = {
        hazard_type: report.hazardType,
        hazard_subtype: report.hazardSubtype,
        hazard_subtype_detail: report.hazardSubtypeDetail,
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
        suggestedSolution: report.suggestedSolution,
        type: ReportType.Hazard,
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
        const response = await fetch(HazardUrl, options);
        
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

export const GetHazardFeatureCollection = async (): Promise<FeatureCollection> => {
    const response = await fetch(`${HazardUrl}`);

    if (response.ok) {
        return await response.json() as FeatureCollection;
    } else {
        console.log(`An error occurred while fetching the Hazard/Concern features: ${response.status} - ${response.statusText}`);
        return {
            type: "FeatureCollection",
            features: []
        };
    }
};