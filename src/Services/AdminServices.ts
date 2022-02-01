import { AdminUrl, AdminAmenityUrl, AdminHazardUrl, AdminIncidentUrl } from "../Constants";
import { AmenityFields } from "../Components/Form/Amenity/AmenityController";
import { HazardFields } from "../Components/Form/Hazard/HazardController";
import { IncidentFields } from "../Components/Form/Incident/IncidentController"
import { FeatureCollection, Gender, MobilityAid, ReportType } from "../FormTypes";

export const DeletePoint = async (url: string) => {
    const response = await fetch(`${url}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
        referrerPolicy: "origin",
        method: "DELETE",
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.log(`An error occured while deleting feature at ${url}`);
        return {
            success: false
        };
    }
}

export const GetAmenity = async (id: string) => {
    const url = `${AdminUrl}/amenity/${id}`;
    const response = await fetch(`${url}`);

    if (response.ok) {
        const result = await response.json();

        if (result.success) {
            const data = result.feature;
            const genderValues = parseGender(data.gender);
            const mobilityAidTypeValues = parseMobilityAid(data.mobility_aid_type);
            const amenity: AmenityFields = {
                amenityType: data.amenity_type,
                birthYear: data.birth_year,
                date: data.date,
                description: data.description,
                disability: data.disability,
                disabilityType: data.disability_type,
                disabilityTypeOpen: "",
                gender: genderValues.gender,
                genderOpen: genderValues.genderOpen,
                identity: data.race,
                identityOpen: "",
                mobilityAid: data.mobility_aid,
                mobilityAidType: mobilityAidTypeValues.mobilityAidType,
                mobilityAidTypeOpen: mobilityAidTypeValues.mobilityAidTypeOpen,
                point: data.geom,
                suggestedSolution: data.suggestedSolution 
            };
            return {
                amenity,
                success: result.success
            };
        } else {
            return result;
        }
        
    } else {
        console.log(`An error occurred while fetching amenity with id: ${id}.`);
        return undefined;
    }
};

export const GetHazard = async (id: string) => {
    const url = `${AdminUrl}/hazard/${id}`;
    const response = await fetch(`${url}`);

    if (response.ok) {
        const result = await response.json();

        if (result.success) {
            const data = result.feature;
            const genderValues = parseGender(data.gender);
            const mobilityAidTypeValues = parseMobilityAid(data.mobility_aid_type);
            const hazard: HazardFields = {
                hazardType: data.hazard_type,
                hazardSubtype: data.hazard_subtype,
                hazardSubtypeDetail: data.hazard_subtype_detail,
                birthYear: data.birth_year,
                date: data.date,
                description: data.description,
                disability: data.disability,
                disabilityType: data.disability_type,
                disabilityTypeOpen: "",
                gender: genderValues.gender,
                genderOpen: genderValues.genderOpen,
                identity: data.race,
                identityOpen: "",
                mobilityAid: data.mobility_aid,
                mobilityAidType: mobilityAidTypeValues.mobilityAidType,
                mobilityAidTypeOpen: mobilityAidTypeValues.mobilityAidTypeOpen,
                point: data.geom,
                suggestedSolution: data.suggestedSolution 
            };
            return {
                hazard,
                success: result.success
            };
        } else {
            return result;
        }
        
    } else {
        console.log(`An error occurred while fetching amenity with id: ${id}.`);
        return undefined;
    }
};

export const GetIncident = async (id: string) => {
    const url = `${AdminUrl}/incident/${id}`;
    const response = await fetch(`${url}`);

    if (response.ok) {
        const result = await response.json();

        if (result.success) {
            const data = result.feature;
            const genderValues = parseGender(data.gender);
            const mobilityAidTypeValues = parseMobilityAid(data.mobility_aid_type);
            const incident: IncidentFields = {
                incidentType: data.incident_type,
                incidentSubtype: data.incident_with,
                injury: data.injury_type,
                involvement: data.involvement,
                birthYear: data.birth_year,
                date: data.date,
                description: data.description,
                disability: data.disability,
                disabilityType: data.disability_type,
                disabilityTypeOpen: "",
                gender: genderValues.gender,
                genderOpen: genderValues.genderOpen,
                identity: data.race,
                identityOpen: "",
                mobilityAid: data.mobility_aid,
                mobilityAidType: mobilityAidTypeValues.mobilityAidType,
                mobilityAidTypeOpen: mobilityAidTypeValues.mobilityAidTypeOpen,
                point: data.geom,
                suggestedSolution: data.suggestedSolution 
            };

            return {
                incident,
                success: result.success
            };
        } else {
            return result;
        }
        
    } else {
        console.log(`An error occurred while fetching amenity with id: ${id}.`);
        return undefined;
    }
};

export const GetPoints = async (url: string, page?: number, rows?: number): Promise<FeatureCollection> => {
    // if (page !== undefined && page >= 0 && rows !== undefined && rows > 0) {
    //     url = `${url}?page=${page}&rows=${rows}`
    // }
    
    const response = await fetch(`${url}`);

    if (response.ok) {
        return await response.json() as FeatureCollection;
    } else {
        console.log(`An error occurred while fetching the features: ${response.status} - ${response.statusText}`);
        return {
            type: "FeatureCollection",
            features: [],
            totalCount: 0,
        };
    }
};

export const UpdateAmenityReport = async (report: any, id: string) => {
    const data = {
        amenity_type: report.amenityType,
        birth_year: report.birthYear,
        date: report.date.valueOf(),
        description: report.description,
        disability: report.disability,
        disability_type: report.disabilityTypeOpen ? `${report.disabilityType} - ${report.disabilityTypeOpen}` : report.disabilityType,
        gender: report.genderOpen ? `${report.gender} - ${report.genderOpen}` : report.gender,
        geom: report.point,
        mobility_aid: report.mobilityAid,
        mobility_aid_type: report.mobilityAidTypeOpen ? `${report.mobilityAidType} - ${report.mobilityAidTypeOpen}` : report.mobilityAidType,
        race: report.identityOpen ? `${report.identity},${report.identityOpen}` : report.identity,
        suggestedSolution: report.suggestedSolution,
        type: ReportType.Amenity,
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
        const response = await fetch(`${AdminAmenityUrl}/${id}`, options);
        
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
}

export const UpdateHazardReport = async (report: any, id: string) => {
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
        race: report.identityOpen ? `${report.identity},${report.identityOpen}` : report.identity,
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
        const response = await fetch(`${AdminHazardUrl}/${id}`, options);
        
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
}

export const UpdateIncidentReport = async (report: any, id: string) => {
    const data = {
        incident_type: report.incidentType,
        incident_subtype: report.indicentSubtype,
        injury: report.injury,
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
        race: report.identityOpen ? `${report.identity},${report.identityOpen}` : report.identity,
        suggestedSolution: report.suggestedSolution,
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
        const response = await fetch(`${AdminIncidentUrl}/${id}`, options);
        
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
}

function parseGender(value: string) {
    const genderValues = {
        gender: "",
        genderOpen: ""
    };

    if (value === Gender.Female || value === Gender.Male || value === Gender.NoResponse) {
        genderValues.gender = value;
    } else {
        genderValues.gender = Gender.Other;
        genderValues.genderOpen = value.substring(8);
    }

    return genderValues;
}

function parseMobilityAid(value: string) {
    const mobValues = {
        mobilityAidType: "",
        mobilityAidTypeOpen: ""
    };

    if (value.startsWith(MobilityAid.Other)) {
        mobValues.mobilityAidType = MobilityAid.Other;
        mobValues.mobilityAidTypeOpen = value.substring(8);
    } else {
        mobValues.mobilityAidType = value;
    }

    return mobValues;
}


// function parseIdentity(value: string) {
//     const identities: string[] = [];
//     let identityOpen = "";

//     const identityArray = value.split(",");
//     const trimmedArray: string[] = [];

//     identityArray.forEach((x: string) => trimmedArray.push(x.trim()));

//     for (let x of trimmedArray) {
//         if (Object.values<string>(Identity).includes(x)) {
//             identities.push(x);
//         } else {
//             if (identityOpen) {
//                 identityOpen += `,${x}`
//             } else {
//                 identityOpen += x;
//             }
//         }
//     }

//     return {
//         identity: identities,
//         identityOpen,
//     };
// }