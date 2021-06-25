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
    Audible = "audible",
    StopSign = "stop sign",
    Benches = "benches",
    Washroom = "washroom",
    Lighting = "lighting or additional lighting",
    Transit = "access to transit stop",
    Signs = "wayfinding signs",
    Connections = "connections (e.g. cut-through needed)",
    Shade = "shade in summer",
    Other = "other",
}

export enum AmenityOld {
    Sidewalk = "sidewalk",
    Crosswalk = "crosswalk",
    Signal = "signal",
    StopSign = "stop-sign",
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

export enum MicroBarrierEnvironmentalSubtype {
    Snow = "snow",
    Ice = "ice",
    Puddles = "puddles or splash zone",
    Vegetation = "vegetation",
    Other = "other",
}

export enum MicroBarrierInfrastructureCrossingSubtype {
    Missing = "crosswalk is missing",
    DangerousDrivers = "crosswalk dangerous - drivers",
    DangerousVolume = "crosswalk dangerous - vehicle high volume",
    DangerousSpeed = "crosswalk dangerous - vehicle high speeds",
    DangerousVisibility = "crosswalk dangerous - poor visibliity of pedestrians",
    WaitTime = "long wait time to cross",
    Other = "other",
}

export enum MicroBarrierInfrastructureIntersectionSubtype {
    CurbCutMissing = "curb cut - missing",
    CurbCutDesign = "curb cut - poor design",
    TrafficShortSignal = "traffic signal - short pedestrian interval",
    TrafficSignalNotAudible = "traffic signal - needs audible",
    TrafficSignalButtonAccess = "traffic signal - push button difficult access",
    VehicleConflictLeft = "conflict left turning vehicle",
    VehicleConflictRight = "conflict right turning vehicle",
    VehicleConflictRightRed = "conflict right turning vehicle on red",
    Visibility = "poor visibility of pedestrians",
    Other = "other",
}

export enum MicroBarrierInfrastructureSidewalkType {
    Narrow = "too narrow",
    TripRoots = "tripping hazard - buckling pavement roots",
    TripUneven = "tripping hazard - uneven",
    TripHolesCracks = "tripping hazard - holes cracks",
    Uncomfortable = "uncomfortable surface",
    Driveway = "driveway slope issue",
    Other = "other",
}

export enum MicroBarrierInfrastructureSubtype {
    Sidewalk = "sidewalk",
    Crossing = "crossing",
    Intersection = "intersection",
}

export enum MicroBarrierObstructionFixedSubtype {
    Bollard = "bollard",
    Pole = "pole",
    Mailbox = "mailbox",
    BikeRack = "bike rack",
    BusShelter = "bus shelter",
    Other = "other"
}

export enum MicroBarrierObstructionSubtype {
    Fixed = "fixed",
    Transient = "transient",
}

export enum MicroBarrierObstructionTransientSubtype {
    Sandwich = "sandwich board",
    BicycleParking = "parked bicycle or scooter",
    Trash = "garbage or recycling bins",
    Vehicle = "parked vehicle or delivery van",
    ConstructionUnsafe = "construction inadequate or missing pedestrian detour",
    ConstructionSigns = "construction signs blocking sidewalk",
    Other = "other"
}

export enum MicroBarrierType {
    Infrastructure = "infrastructure",
    Obstruction = "obstruction",
    Environmental = "environmental",
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
    Incident = "incident",
    MicroBarrier = "barrier",
    Safety = "safety",
};

export enum SafetyType {
    VehicleTraffic = "vehicle traffic",
    PersonalSafety = "personal safety",
    OtherUsers = "other path users",
    PoorAesthetics = "poor aesthetics",
}

export enum SafetyOtherUsersSubtype {
    Bicycles = "bicycles",
    Dogs = "dogs",
    EScooters = "e-scooters",
    Mobility = "mobility scooters or electric wheelchairs",
    Other = "other",
    OtherWheeled = "roller blades skateboards kick scooters",
}

export enum SafetyPoorAestheticsSubtype {
    BlankWall = "blank wall",
    Litter = "litter",
    Maintenance = "unmaintained infrastructure or vegetation",
    Other = "other",
}

export enum SafetyPersonalSafetySubtype {
    DeadEnds = "dead ends",
    Gathering = "gathering of unknown people",
    Harrassment = "harrassment or unwanted attention",
    Lighting = "inadequate lighting",
    Other = "other",
}

export enum SafetyVehicleTrafficSubtype {
    Exhaust = "exhaust",
    Noise = "noise",
    Other = "other",
    Speed = "speed",
    Volume = "volume",
}