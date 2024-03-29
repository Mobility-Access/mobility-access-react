// Interfaces

export interface BaseFields {
    archived?: boolean;
    birthYear: string;
    date: any;
    description: string;
    disability: string;
    disabilityType?: string;
    disabilityTypeOpen?: string;
    gender: string;
    genderOpen?: string;
    heardAbout: string;
    heardAboutOpen?: string;
    identity: string[];
    identityOpen?: string;
    mobilityAid?: string;
    mobilityAidType?: string;
    mobilityAidTypeOpen?: string;
    point: number[];
    suggestedSolution: string;
    visible?: boolean;
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
    features: AmenityFeature[],
    totalCount: number,
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
}

export enum IncidentType {
    HitBy = "hit by",
    NearMiss = "near miss",
    Fall = "fall",
}

export const IncidentFallSubtypes: ChoiceItem[] = [
    { key: IncidentFallSubtype.Slip, value: "form_incident-subtype-fall-slip" },
    { key: IncidentFallSubtype.Trip, value: "form_incident-subtype-fall-trip" },  
    { key: IncidentFallSubtype.Other, value: "form_incident-subtype-fall-other" },  
];

export const IncidentHitByOrNearmissSubtypes: ChoiceItem[] = [
    { key: IncidentHitByOrNearmissSubtype.VehicleRightTurn, value: "form_incident-subtype-vehicle-right" },
    { key: IncidentHitByOrNearmissSubtype.VehicleRightTurnRed, value: "form_incident-subtype-vehicle-right-red" },  
    { key: IncidentHitByOrNearmissSubtype.VehicleLeftTurn, value: "form_incident-subtype-vehicle-left" },  
    { key: IncidentHitByOrNearmissSubtype.VehicleHeadOn, value: "form_incident-subtype-vehicle-head-on" },  
    { key: IncidentHitByOrNearmissSubtype.VehicleFromBehind, value: "form_incident-subtype-vehicle-from-behind" },  
    { key: IncidentHitByOrNearmissSubtype.Cyclist, value: "form_incident-subtype-cyclist" },  
    { key: IncidentHitByOrNearmissSubtype.Animal, value: "form_incident-subtype-animal" },  
    { key: IncidentHitByOrNearmissSubtype.Other, value: "form_incident-subtype-other" },  
];

export const IncidentInjuryTypes: ChoiceItem[] = [
    { key: IncidentInjury.None, value: "form_incident-injury-none" },
    { key: IncidentInjury.SelfTreatment, value: "form_incident-injury-self-treatment" },
    { key: IncidentInjury.FamilyDoctor, value: "form_incident-injury-family-doctor" },
    { key: IncidentInjury.SelfER, value: "form_incident-injury-self-er" },
    { key: IncidentInjury.AmbulanceER, value: "form_incident-injury-ambulance-er" },
    { key: IncidentInjury.Hospital, value: "form_incident-injury-hospital" },
];


export const IncidentInjuryWitnessTypes: ChoiceItem[] = [
    { key: IncidentInjuryWitness.None, value: "form_incident-injury-witness-none" },
    { key: IncidentInjuryWitness.Minor, value: "form_incident-injury-witness-minor" },
    { key: IncidentInjuryWitness.Ambulance, value: "form_incident-injury-witness-ambulance" },
];

export const IncidentInvolvementTypes: ChoiceItem[] = [
    { key: IncidentInvolvementType.Self, value: "form_incident-involvement-self" },
    { key: IncidentInvolvementType.Care, value: "form_incident-involvement-care" },
    { key: IncidentInvolvementType.Witness, value: "form_incident-involvement-witness" },
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
}

export const GenderTypes: ChoiceItem[] = [
    { key: Gender.Male, value: "form_demographic_gender-male" },
    { key: Gender.Female, value: "form_demographic_gender-female" },
    { key: Gender.Other, value: "form_common-other" },
    { key: Gender.NoResponse, value: "form_demographic_gender-no-response" },
];
export const IdentityTypes: ChoiceItem[] = [
    { key: Identity.Black, value: "form_demographic_identity_black" },
    { key: Identity.EastAsian, value: "form_demographic_identity_east-asian" },
    { key: Identity.SoutheastAsian, value: "form_demographic_identity_southeast-asian" },
    { key: Identity.Indigenous, value: "form_demographic_identity_indigenous" },
    { key: Identity.Latino, value: "form_demographic_identity_latino" },
    { key: Identity.MiddleEastern, value: "form_demographic_identity_middle-eastern" },
    { key: Identity.SouthAsian, value: "form_demographic_identity_south-asian" },
    { key: Identity.White, value: "form_demographic_identity_white" },
    { key: Identity.Other, value: "form_common-other" },
    { key: Identity.NoResponse, value: "form_demographic_identity_no-response" },
];

export const DisabilityTypes: ChoiceItem[] = [
    { key: Disability.Yes, value: "form_demographic_disability_yes" },
    { key: Disability.No, value: "form_demographic_disability_no" },
    { key: Disability.NoResponse, value: "form_demographic_disability_no-response" },
];
export const DisabilityTypeTypes: ChoiceItem[] = [
    { key: DisabilityType.Visual, value: "form_demographic_disability_type_visual" },
    { key: DisabilityType.Hearing, value: "form_demographic_disability_type_hearing" },
    { key: DisabilityType.Mobility, value: "form_demographic_disability_type_mobility" },
    { key: DisabilityType.Cognitive, value: "form_demographic_disability_type_cognitive" },
    { key: DisabilityType.Other, value: "form_common-other" },
];
export const MobilityTypes: ChoiceItem[] = [
    { key: Mobility.Yes, value: "form_demographic_mobility-yes" },
    { key: Mobility.No, value: "form_demographic_mobility-no" },
    { key: Mobility.NoResponse, value: "form_demographic_mobility-no-response" },
];
export const MobilityAidTypes: ChoiceItem[] = [
    { key: MobilityAid.WheelChair, value: "form_demographic_mobility_aid-wheelchair" },
    { key: MobilityAid.Powered, value: "form_demographic_mobility_aid-powered" },
    { key: MobilityAid.Walker, value: "form_demographic_mobility_aid-walker" },
    { key: MobilityAid.Cane, value: "form_demographic_mobility_aid-cane" },
    { key: MobilityAid.Crutches, value: "form_demographic_mobility_aid-crutches" },
    { key: MobilityAid.ServiceDog, value: "form_demographic_mobility_aid-service-dog" },
    { key: MobilityAid.Other, value: "form_common-other" },
];

export enum HeardAbout {
    Blogs = "blogs",
    CommunityOrganization = "community organization",
    Twitter = "twitter",
    Facebook = "facebook",
    Instagram = "instagram",
    WordOfMouth = "word of mount",
    GovernmentOfficial = "government official",
    EmailOrNewsletter = "email/newsletter",
    FlyerOrStickerOrMagnets = "flyer/sticker/magnets",
    News = "news",
    InPersonEvents = "in person events",
    Other = "other"
}

export const HeardAboutTypes: ChoiceItem[] = [
    { key: HeardAbout.Blogs, value: "form_disability_heard_about-blogs" },
    { key: HeardAbout.CommunityOrganization, value: "form_disability_heard_about-community-organization" },
    { key: HeardAbout.Twitter, value: "form_disability_heard_about-twitter" },
    { key: HeardAbout.Facebook, value: "form_disability_heard_about-facebook" },
    { key: HeardAbout.Instagram, value: "form_disability_heard_about-instagram" },
    { key: HeardAbout.WordOfMouth, value: "form_disability_heard_about-word-of-mouth" },
    { key: HeardAbout.GovernmentOfficial, value: "form_disability_heard_about-government-official" },
    { key: HeardAbout.EmailOrNewsletter, value: "form_disability_heard_about-email-newsletter" },
    { key: HeardAbout.FlyerOrStickerOrMagnets, value: "form_disability_heard_about-flyer-sticker-magnet" },
    { key: HeardAbout.News, value: "form_disability_heard_about-news" },
    { key: HeardAbout.InPersonEvents, value: "form_disability_heard_about-in-person-events" },
    { key: HeardAbout.Other, value: "form_disability_heard_about-other" }
];