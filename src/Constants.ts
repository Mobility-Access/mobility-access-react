const BaseUrl = import.meta.env.VITE_BASE_URL

export const ApiUrl = `${BaseUrl}/api`;
export const AdminUrl = `${BaseUrl}/admin`;
export const StaticUrl = `${BaseUrl}/static`
export const GeocoderUrl = "https://nominatim.openstreetmap.org/search";

// Basic API URLs that return limited fields for each report
export const PointUrl = `${ApiUrl}/point`;
export const AmenityUrl = `${ApiUrl}/amenity`;
export const HazardUrl = `${ApiUrl}/hazard`;
export const IncidentUrl = `${ApiUrl}/incident`;
export const UserUrl = `${ApiUrl}/user`;
export const SwaggerUrl = `${ApiUrl}/swagger.json`;

// URLs used by admin pages with full access to all report fields
export const AdminPointUrl = `${AdminUrl}/point`;
export const AdminAmenityUrl = `${AdminUrl}/amenity`;
export const AdminHazardUrl = `${AdminUrl}/hazard`;
export const AdminIncidentUrl = `${AdminUrl}/incident`;
export const AdminTokenUrl = `${AdminUrl}/token`;
export const AdminUserUrl = `${AdminUrl}/users`;

