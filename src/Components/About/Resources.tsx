const BaseUrl = import.meta.env.BASE_URL

export const englishReports: { text: string, hyperlink: string }[] = [
    {
        text: "Summary report for the Capital Regional District (BC), March 31, 2024",
        hyperlink: `${BaseUrl}/static/CRD_WRM_Final_Report.pdf`
    },
    {
        text: "Engagement and Promotion Summary, March 31, 2024",
        hyperlink: `${BaseUrl}/static/WRM_Promotion_And_Engagement.pdf`
    },
    {
        text: "Example Guided Walk, prepared by Envirocentre, November 2022",
        hyperlink: `${BaseUrl}/static/Guided_Walk_Summary.pdf`
    }

];

export const frenchReports: { text: string, hyperlink: string }[] = [
    {
        text: "OnMarcheOnRoule au Québec, le 31 mars 2024",
        hyperlink: `${BaseUrl}/static/Final_Quebec_OMOR.pdf`
    }
]