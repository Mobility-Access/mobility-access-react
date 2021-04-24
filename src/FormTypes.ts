// Interfaces

export interface BaseFields {
    age: string;
    disability: string;
    disabilityType?: string;
    disabilityTypeOpen?: string;
    gender: string;
    genderOpen?: string;
    identity: string[];
    identityOpen?: string;
    mobilityAid?: string;
    mobilityAidType?: string;
    mobilityAidTypeOpen?: string;
    point: { x: number, y: number } | null;
}

export interface ChoiceItem {
    key: string;
    value: string;
}

// Enums

export enum Age {
    UnderTwenty = "under-twenty",
    UnderThirty = "under-thirty",
    UnderForty = "under-forty",
    UnderFifty = "under-fifty",
    UnderSixtyFive = "under-sixty-five",
    UnderEighty = "under-eighty",
    OverEighty = "over-eighty",
    UnderThirteen = "under-thirteen",
    NoResponse = "no-response",
}

export enum Amenity {
    Sidewalk = "sidewalk",
    Crosswalk = "crosswalk",
    Benches = "benches",
    Washroom = "washroom",
    Lighting = "lighting",
    Transit = "transit",
    Signs = "signs",
    Connections = "connections",
    Shade = "shade",
    Plants = "plants",
    Other = "other",
}

export enum Disability {
    Yes = "yes",
    No = "no",
    NoResponse = "no-response",
}

export enum DisabilityType {
    Visual = "visual",
    Hearing = "hearing",
    Mobility = "mobility",
    Cognitive = "cognitive",
    Other = "other",
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
    NoResponse = "no-response"
}

export enum Identity {
    Black = "black",
    EastAsian = "east-asian",
    SoutheastAsian = "southeast-asian",
    Indigenous = "indigenous",
    Latino = "latino",
    MiddleEastern = "middle-eastern",
    SouthAsian = "south-asisan",
    White = "white",
    Other = "other",
    NoResponse = "no-response"
}

export enum Mobility {
    Yes = "yes",
    No = "no",
    NoResponse = "no-response",
}

export enum MobilityAid {
    Cane = "cane",
    Crutches = "crutches",
    Other = "other",
    Powered = "powered",
    ServiceDog = "service-dog",
    Walker = "walker",
    WheelChair = "wheel-chair",
}

export enum ReportType {
    Amenity = "amenity",
    Barrier = "barrier",
    Concern = "concern",
    Incident = "incident",
};
