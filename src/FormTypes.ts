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

// ********** End Hazard Form enums ********* 

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