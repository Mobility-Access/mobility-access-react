export const ApiUrl = "http://127.0.0.1:5000/api";
// export const ApiUrl = "http://178.128.225.253/api";
export const AdminUrl = "http://127.0.0.1:5000/admin";
// export const AdminUrl = "https://walkrollmap.org/admin";
export const GeocoderUrl = "https://nominatim.openstreetmap.org/search";

// Basic API URLs that return limited fields for each report
export const PointUrl = `${ApiUrl}/point`;
export const AmenityUrl = `${ApiUrl}/amenity`;
export const HazardUrl = `${ApiUrl}/hazard`;
export const IncidentUrl = `${ApiUrl}/incident`;
export const UserUrl = `${ApiUrl}/user`;

// URLs used by admin pages with full access to all report fields
export const AdminPointUrl = `${AdminUrl}/point`;
export const AdminAmenityUrl = `${AdminUrl}/amenity`;
export const AdminHazardUrl = `${AdminUrl}/hazard`;
export const AdminIncidentUrl = `${AdminUrl}/incident`;
export const AdminTokenUrl = `${AdminUrl}/token`;
export const AdminUserUrl = `${AdminUrl}/users`;
