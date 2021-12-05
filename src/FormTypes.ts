// Interfaces

export interface BaseFields {
    birthYear: number;
    date: any;
    description: string;
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
    point: number[];
    suggestedSolution: string;
}

export interface ChoiceItem {
    key: string;
    value: string;
}

export interface AmenityFeature {
    amenity_type: string;
    date: number;
    description: string;
    geometry: number[];
    id: number;
    type: "feature"
}

export interface FeatureCollection {
    type: "FeatureCollection",
    features: AmenityFeature[]
}

// Enums

export enum Amenity {
    Sidewalk = "sidewalk",
    Crosswalk = "marked crosswalk",
    Signal = "traffic or pedestrian signal",
    CurbCut = "curb cut",
    Audible = "audible",
    StopSign = "stop sign",
    Benches = "benches",
    Washroom = "washroom",
    WaterFountain = "water fountain",
    Lighting = "lighting or additional lighting",
    Transit = "access to transit stop",
    Signs = "wayfinding signs",
    Connections = "connections (e.g. cut-through needed)",
    Shade = "shade in summer",
    Other = "other",
}

export const AmenityTypes: ChoiceItem[] = [
        { key: Amenity.Sidewalk, value: "form_amenity-sidewalk" },
        { key: Amenity.Crosswalk , value: "form_amenity-crosswalk" },
        { key: Amenity.CurbCut, value: "form_amenity-curb-cut" },
        { key: Amenity.Signal , value: "form_amenity-signal" },
        { key: Amenity.Audible , value: "form_amenity-audible" },
        { key: Amenity.StopSign , value: "form_amenity-stop-sign" },
        { key: Amenity.Benches , value: "form_amenity-benches" },
        { key: Amenity.Washroom , value: "form_amenity-washroom" },
        { key: Amenity.WaterFountain, value: "form_amenity-water-fountain" },
        { key: Amenity.Lighting , value: "form_amenity-lighting" },
        { key: Amenity.Transit , value: "form_amenity-transit" },
        { key: Amenity.Signs , value: "form_amenity-signs" },
        { key: Amenity.Connections , value: "form_amenity-connections" },
        { key: Amenity.Shade , value: "form_amenity-shade" },
        { key: Amenity.Other , value: "form_common-other" },
    ];

export enum Disability {
    Yes = "yes",
    No = "no",
    NoResponse = "no response",
}

export enum DisabilityType {
    Visual = "visual",
    Hearing = "hearing",
    Mobility = "mobility",
    Cognitive = "cognitive",
    Other = "other",
    NoResponse = "no response",
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
    NoResponse = "no response",
}

// ********** Hazard Form enums ********* 

export enum HazardConcernSubtype {
    Bicycles = "other users - bicycle",
    Dogs = "other users - dogs",
    EScooters = "other users - e-scooters",
    Harassment = "personal safety - harassement or unwanted attention",
    Isloated = "personal safety - isolated",
    Lighting = "personal safety - inaequate lighting",
    MobilityWheeled = "other users - mobility scooters/electric wheelchairs", 
    OtherWheels = "other users - roller blades, skateboards, kick scooters",
    Other = "other",
    People = "personal safety - gathering of unknown people",
    VehicleNumber = "vehicles - number makes uncomfortable",
    VehicleSpeed = "vehicles - speed makes uncomfortable",
}

export enum HazardCrossingSubtype {
    Crosswalk = "crosswalk needed",
    FailureToYield = "drivers don't stop or yield to pedestrians",
    Markings = "crosswalk markings no longer visible",
    Other = "other",
    SignalShort = "signal - pedestrian interval too short",
    SignalNotAudible = "signal - needs an audible",
    SignalButton = "signal - button difficult to access",
    SignalWait = "signal - wait time to cross too long",
    VehicleConflictLeft = "conflict with vehicles turning left",
    VehicleConflictRight = "conflict with vehicles turning right",
    VehicleConflictRightRed = "conflict with vehicles turning righton red",
    Visibliity = "poor visibility of pedestrians",
}

export enum HazardSidewalkSubtype {
    BikeRack = "obstruction - bike rack (including bikeshare)",
    Bins = "obstruction - garbage or recycling bins",
    Bollard = "obstruction - bollard",
    BusShelter = "obstruction - bus shelter",
    Construction = "obstruction - inadequate or lack of safe detour for pedestrians",
    Mailbox = "obstruction - mailbox",
    MissingCurbCut = "missing curb cut",
    Narrow = "too narrrow",
    Other = "other",
    ParkedBike = "obstruction - parked e-scooters/bicycles",
    ParkedVehicles = "obstruction - parked vehicles or delivery vans",
    Pole = "obstruction - pole (hydro, telephone)",
    Sign = "obstruction - sign blocking path",
    Slope = "slope issues (eg. driveways)",
    Surface = "uncomfortable service (for wheelchairs, etc.)",
    Uneven = "obstruction - uneven sidewalk (eg. roots, holes, cracks)",
    Vegetation = "obstruction - vegetaion that narrows pathway",   
}

export enum HazardType {
    Concern = "safety/comfort concern",
    Crossing = "crossing issue",
    Sidewalk = "side walk infrastructure issue",
    WeatherSeasonal = "weather related or seasonal",
}

export enum HazardWeatherSeasonalSubtype {
    Ice = "ice",
    Leaves = "leaves",
    Other = "other",
    Snow = "snow",
    Water = "puddles, flooding, splash zone",
}

export const HazardTypes: ChoiceItem[] = [
    { key: HazardType.Sidewalk, value: "form_hazard-type-sidewalk-infrastructure" },
    { key: HazardType.Crossing, value: "form_hazard-type-crossing" },
    { key: HazardType.WeatherSeasonal, value: "form_hazard-type-weather-seasonal" },
    { key: HazardType.Concern, value: "form_hazard-type-concern" },
];

export const HazardConcernSubtypes: ChoiceItem[] = [
    { key: HazardConcernSubtype.VehicleNumber, value: "form_hazard-concern-subtype-vehicle-numbers" },
    { key: HazardConcernSubtype.VehicleSpeed, value: "form_hazard-concern-subtype-vehicle-speed" },
    { key: HazardConcernSubtype.Bicycles, value: "form_hazard-concern-subtype-bicycles" },
    { key: HazardConcernSubtype.EScooters, value: "form_hazard-concern-subtype-escooters" },
    { key: HazardConcernSubtype.OtherWheels, value: "form_hazard-concern-subtype-other-wheels" },
    { key: HazardConcernSubtype.MobilityWheeled, value: "form_hazard-concern-subtype-mobility-wheeled" },
    { key: HazardConcernSubtype.Dogs, value: "form_hazard-concern-subtype-dogs" },
    { key: HazardConcernSubtype.Lighting, value: "form_hazard-concern-subtype-lighting" },
    { key: HazardConcernSubtype.Isloated, value: "form_hazard-concern-subtype-isolated" },
    { key: HazardConcernSubtype.Harassment, value: "form_hazard-concern-subtype-harassment" },
    { key: HazardConcernSubtype.People, value: "form_hazard-concern-subtype-people" },
    { key: HazardConcernSubtype.Other, value: "form_common-other" },
];

export const HazardCrossingSubtypes: ChoiceItem[] = [
    { key: HazardCrossingSubtype.Crosswalk, value: "form_hazard-crossing-subtype-crosswalk" },
    { key: HazardCrossingSubtype.VehicleConflictRight, value: "form_hazard-crossing-subtype-vehicle-right" },
    { key: HazardCrossingSubtype.VehicleConflictRightRed, value: "form_hazard-crossing-subtype-vehicle-right-red" },
    { key: HazardCrossingSubtype.VehicleConflictLeft, value: "form_hazard-crossing-subtype-vehicle-left" },
    { key: HazardCrossingSubtype.FailureToYield, value: "form_hazard-crossing-subtype-yield" },
    { key: HazardCrossingSubtype.SignalShort, value: "form_hazard-crossing-subtype-signal-short" },
    { key: HazardCrossingSubtype.SignalNotAudible, value: "form_hazard-crossing-subtype-signal-audible" },
    { key: HazardCrossingSubtype.SignalButton, value: "form_hazard-crossing-subtype-signal-button" },
    { key: HazardCrossingSubtype.SignalWait, value: "form_hazard-crossing-subtype-signal-wait" },
    { key: HazardCrossingSubtype.Visibliity, value: "form_hazard-crossing-subtype-visibility" },
    { key: HazardCrossingSubtype.Markings, value: "form_hazard-crossing-subtype-markings" },
    { key: HazardCrossingSubtype.Other, value: "form_common-other" },
];

export const HazardSidewalkSubtypes: ChoiceItem[] = [
    { key: HazardSidewalkSubtype.Bollard, value: "form_hazard-sidewalk-subtype-bollard" },
    { key: HazardSidewalkSubtype.Pole, value: "form_hazard-sidewalk-subtype-pole" },
    { key: HazardSidewalkSubtype.Uneven, value: "form_hazard-sidewalk-subtype-uneven" },
    { key: HazardSidewalkSubtype.Mailbox, value: "form_hazard-sidewalk-subtype-mailbox" },
    { key: HazardSidewalkSubtype.BikeRack, value: "form_hazard-sidewalk-subtype-bike-rack" },
    { key: HazardSidewalkSubtype.BusShelter, value: "form_hazard-sidewalk-subtype-bus-shelter" },
    { key: HazardSidewalkSubtype.Vegetation, value: "form_hazard-sidewalk-subtype-vegetation" },
    { key: HazardSidewalkSubtype.Sign, value: "form_hazard-sidewalk-subtype-sign" },
    { key: HazardSidewalkSubtype.ParkedBike, value: "form_hazard-sidewalk-subtype-parked-bike" },
    { key: HazardSidewalkSubtype.Bins, value: "form_hazard-sidewalk-subtype-bins" },
    { key: HazardSidewalkSubtype.ParkedVehicles, value: "form_hazard-sidewalk-subtype-parked-vehicles" },
    { key: HazardSidewalkSubtype.Construction, value: "form_hazard-sidewalk-subtype-construction" },
    { key: HazardSidewalkSubtype.MissingCurbCut, value: "form_hazard-sidewalk-subtype-missing-curb-cut" },
    { key: HazardSidewalkSubtype.Narrow, value: "form_hazard-sidewalk-subtype-narrow" },
    { key: HazardSidewalkSubtype.Surface, value: "form_hazard-sidewalk-subtype-surface" },
    { key: HazardSidewalkSubtype.Slope, value: "form_hazard-sidewalk-subtype-slope" },
    { key: HazardSidewalkSubtype.Other, value: "form_common-other" },
];

export const HazardWeatherSeasonalSubtypes: ChoiceItem[] = [
    { key: HazardWeatherSeasonalSubtype.Snow, value: "form_hazard-weather-subtype-snow" },
    { key: HazardWeatherSeasonalSubtype.Ice, value: "form_hazard-weather-subtype-ice" },
    { key: HazardWeatherSeasonalSubtype.Water, value: "form_hazard-weather-subtype-water" },
    { key: HazardWeatherSeasonalSubtype.Leaves, value: "form_hazard-weather-subtype-leaves" },
    { key: HazardWeatherSeasonalSubtype.Other, value: "form_common-other" },
];

// ********** End Hazard Form ********* 

export enum Identity {
    Black = "black",
    EastAsian = "east asian",
    SoutheastAsian = "southeast asian",
    Indigenous = "indigenous",
    Latino = "latino",
    MiddleEastern = "middle eastern",
    SouthAsian = "south asisan",
    White = "white",
    Other = "other",
    NoResponse = "no response",
}

export enum IncidentFallSubtype {
    Slip = "slipped",
    Trip = "tripped",
    Other = "other",
}

export enum IncidentHitByOrNearmissSubtype {
    VehicleFromBehind = "vehicle from behind",
    VehicleHeadOn = "vehicle turning head-on",
    VehicleLeftTurn = "vehicle turning left",
    VehicleRightTurn = "vehicle turning right",
    VehicleRightTurnRed = "vehicle turning right on red",
    Cyclist = "cyclist",
    Animal = "animal",
    Other = "other",
}

export enum IncidentInjury {
    None = "no injury",
    SelfTreatment = "injury self treatment",
    FamilyDoctor = "saw family doctor",
    SelfER = "emergency room by myself",
    AmbulanceER = "ambulance to emergency room",
    Hospital = "hospitalized",
}

export enum IncidentInjuryWitness {
    None = "no apparent injury",
    Minor = "minor injuries",
    Ambulance = "ambulance attended",
}

export enum IncidentInvolvementType {
    Self = "self",
    Care = "someone in my care",
    Witness = "witness",
};

export enum IncidentType {
    HitBy = "hit by",
    NearMiss = "near miss",
    Fall = "fall",
}

export const IncidentFallSubtypes: ChoiceItem[] = [
    { key: IncidentFallSubtype.Slip, value: "form_incident-subtype-fall-slip"},
    { key: IncidentFallSubtype.Trip, value: "form_incident-subtype-fall-trip"},  
    { key: IncidentFallSubtype.Other, value: "form_incident-subtype-fall-other"},  
];

export const IncidentHitByOrNearmissSubtypes: ChoiceItem[] = [
    { key: IncidentHitByOrNearmissSubtype.VehicleRightTurn, value: "form_incident-subtype-vehicle-right"},
    { key: IncidentHitByOrNearmissSubtype.VehicleRightTurnRed, value: "form_incident-subtype-vehicle-right-red"},  
    { key: IncidentHitByOrNearmissSubtype.VehicleLeftTurn, value: "form_incident-subtype-vehicle-left"},  
    { key: IncidentHitByOrNearmissSubtype.VehicleHeadOn, value: "form_incident-subtype-vehicle-head-on"},  
    { key: IncidentHitByOrNearmissSubtype.VehicleFromBehind, value: "form_incident-subtype-vehicle-from-behind"},  
    { key: IncidentHitByOrNearmissSubtype.Cyclist, value: "form_incident-subtype-cyclist"},  
    { key: IncidentHitByOrNearmissSubtype.Animal, value: "form_incident-subtype-animal"},  
    { key: IncidentHitByOrNearmissSubtype.Other, value: "form_incident-subtype-other"},  
];

export const IncidentTypes: ChoiceItem[] = [
    { key: IncidentType.HitBy, value: "form_incident-type-hit-by"},
    { key: IncidentType.NearMiss, value: "form_incident-type-near-miss"},
    { key: IncidentType.Fall, value: "form_incident-type-fall"},
];

export enum Mobility {
    Yes = "yes",
    No = "no",
    NoResponse = "no response",
}

export enum MobilityAid {
    Cane = "cane",
    Crutches = "crutches",
    Other = "other",
    Powered = "powered",
    ServiceDog = "service dog",
    Walker = "walker",
    WheelChair = "wheel chair",
}

export enum ReportType {
    Amenity = "amenity",
    Hazard = "hazard-concern",
    Incident = "incident",
};