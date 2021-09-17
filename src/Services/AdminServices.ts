import { FeatureCollection, ReportType } from "../FormTypes";

export const GetPoints = async (url: string, page?: number, rows?: number): Promise<FeatureCollection> => {
    if (page !== undefined && page >= 0 && rows !== undefined && rows > 0) {
        url = `${url}?page=${page}&rows=${rows}`
    }
    
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