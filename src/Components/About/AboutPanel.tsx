import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Link as RouterLink } from "react-router-dom";

import ReactGA from "react-ga4";

import { useTranslation } from "react-i18next";

import Faq, { QuestionAnswer } from "./Faq";
import Supporters from "./Supporters";
import TeamMember from "./TeamMember";
import TeamMembers from "./TeamMembers";
import { BaseUrl } from "../../config";
import Colors from "../../Colors";
import { AmenityUrl, HazardUrl, IncidentUrl } from "../../Constants";
import { ReportType } from "../../FormTypes";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: "calc(100vh - 64px)",
        overflowY: "scroll",
    },
    aboutPaper: {
        backgroundColor: fade(Colors.gray, 0.1),
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        padding: theme.spacing(5),
    },
    aboutDescription: {
        fontSize: "1.25rem",
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    aboutTitle: {
        fontSize: "3rem",
        fontWeight: 500
    },
    answer: {
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(1),
    },
    button: {
        marginRight: theme.spacing(1),
        minWidth: "95px",
    },
    buttonBar: {
        display: "flex",
        marginTop: theme.spacing(2),
    },
    exportBlock: {
        marginBottom: theme.spacing(5),
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    link: {
       color: "#0000EE" 
    },
    question: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(1),
    },
    sectionBody: {
        marginBottom: theme.spacing(3),
    },
    sectionTitle: {
        marginBottom: theme.spacing(2),
    },
    subContainerGrid: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    subHeading: {
        color: theme.palette.primary.main,
        fontSize: "2rem",
        fontWeight: 500,
        marginBottom: theme.spacing(2),
    },
    subTitle: {
        color: theme.palette.primary.main,
        fontSize: "20px",
        marginRight: theme.spacing(1),
    },
    supporterLogo: {
        maxWidth: "200px",
    },
}));

const AboutPanel = () => {
    const { i18n, t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));

    const exportReports = async (type: string, format: string) => {
        const options: RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const baseUrl = getUrlByType(type);
        const url = `${baseUrl}/export?format=${format}`;
    
        try {
            return await fetch(url, options);
        } catch (e) {
            // A network error occurred
            console.log(`A network error occurred: ${e}`)
            return undefined;
        }
    };

    const getUrlByType = (type: string) => {
        switch(type) {
            case ReportType.Amenity:
                return AmenityUrl;
            case ReportType.Hazard:
                return HazardUrl;
            case ReportType.Incident:
                return IncidentUrl;
            default:
                return "";
        }
    }

    const handleExport = async (type: string, format: string) => {
        const response = await exportReports(type, format);

        if (response && response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            document.body.appendChild(link);
            link.setAttribute("download", `${type}.${format}`);
            link.click();
            link.parentNode?.removeChild(link);
        } else if (response && response.status === 401) {
            console.log("Received a 401 on export.");
        } else {
            console.log("Some other error happened. ");
        }
    };

    const renderAboutDescription = () => {
        return (
            <AboutGrid>
                <Paper className={classes.aboutPaper} variant="outlined">
                    <Typography className={classes.aboutTitle}>
                        {t("common_about")}
                    </Typography>
                    <Typography className={classes.aboutDescription}>
                        <div>{t("about_description1")}</div>
                        <br></br>
                        <div>{t("about_description2")}</div>
                        <br></br>
                        <div>{t("about_description3")}</div>
                    </Typography>
                </Paper>
            </AboutGrid>
        );
    };

    const qa: QuestionAnswer[] = [
        {question: "q1", answer: "a1"},
        {question: "q2", answer: "a2"},
        {question: "q3", answer: "a3"},
        {question: "q4", answer: "a4"},
        {question: "q5", answer: "a5"},
    ];

    const renderFaq = () => {
        return (
            <>
                <AboutGrid className={classes.sectionTitle}>
                    <Typography className={classes.subHeading}>
                        {t("about_faq")}
                    </Typography>
                </AboutGrid>
                <AboutGrid className={classes.sectionBody}>
                    <Grid container alignItems="stretch" spacing={1} className={classes.subContainerGrid}>
                        {
                            qa.map((item, index) => {
                                return (
                                    <Grid item xs={12} key={index}>
                                        <Faq qa={item} />
                                    </Grid>
                                );
                            })
                        }
                        {/* FAQ #6 has a hyperlink in it, so the Faq component can't be used to render it. */}
                        {
                            i18n.language.startsWith("en") && (
                                <Grid item xs={12} key={qa.length}>
                                    <Typography className={classes.question} variant="body1">
                                        {t(`about_q6`)}
                                    </Typography>
                                    <Typography className={classes.answer}>
                                        {t(`about_a6`)}
                                        <Link className={classes.link} href="https://youtu.be/xl4mwfglA_0" target="_blank">
                                            {"https://youtu.be/xl4mwfglA_0"}
                                        </Link>
                                    </Typography>    
                                </Grid>
                            )
                        }
                        </Grid>
                </AboutGrid>
            </>
        );
    };

    const renderOpenData = () => {
        return (
            <>
                <AboutGrid>
                    <Typography className={classes.subHeading}>
                        {t("about_open-data")} 
                    </Typography>
                </AboutGrid>
                <AboutGrid className={classes.sectionBody}>
                    <Typography>
                        {t("about_open-data-description-1")}
                        <RouterLink to="/swagger.json">
                            {t("about_open-data-description-2")}
                        </RouterLink>
                        {t("about_open-data-description-3")}
                        <RouterLink target="_blank" to="/api/swagger.json">
                            {`${BaseUrl}/api/swagger.json.`}
                        </RouterLink>
                        {t("about_open-data-description-4")}
                    </Typography>
                    <div className={classes.exportBlock}>
                        <Typography className={classes.subTitle}>
                            {t("about_open-data-hazard-concern")}
                        </Typography>
                        <div className={classes.buttonBar}>
                            <Button className={classes.button} onClick={() => handleExport(ReportType.Hazard, "csv")} variant="outlined">
                                CSV
                            </Button>
                            <Button className={classes.button} onClick={() => handleExport(ReportType.Hazard, "json")} variant="outlined">
                                JSON
                            </Button>
                            <Button className={classes.button} onClick={() => handleExport(ReportType.Hazard, "geojson")} variant="outlined">
                                GeoJSON
                            </Button>
                        </div>
                    </div>
                    <div className={classes.exportBlock}>
                        <Typography className={classes.subTitle}>
                            {t("about_open-data-missing-amenities")}
                        </Typography>
                        <div className={classes.buttonBar}>
                            <Button className={classes.button} onClick={() => handleExport(ReportType.Amenity, "csv")} variant="outlined">
                                CSV
                            </Button>
                            <Button className={classes.button} onClick={() => handleExport(ReportType.Amenity, "json")} variant="outlined">
                                JSON
                            </Button>
                            <Button className={classes.button} onClick={() => handleExport(ReportType.Amenity, "geojson")} variant="outlined">
                                GeoJSON
                            </Button>
                        </div>
                    </div>
                    <div className={classes.exportBlock}>
                        <Typography className  ={classes.subTitle}>
                            {t("about_open-data-incident")}
                        </Typography>
                        <div className={classes.buttonBar}>
                            <Button className={classes.button} onClick={() => handleExport(ReportType.Incident, "csv")} variant="outlined">
                                CSV
                            </Button>
                            <Button className={classes.button} onClick={() => handleExport(ReportType.Incident, "json")} variant="outlined">
                                JSON
                            </Button>
                            <Button className={classes.button} onClick={() => handleExport(ReportType.Incident, "geojson")} variant="outlined">
                                GeoJSON
                            </Button>
                        </div>
                    </div>
                </AboutGrid>
            </>
        );
    };

    const renderOurTeam = () => {
        return (
            <>
                <AboutGrid className={classes.sectionTitle}>
                    <Typography className={classes.subHeading}>
                        {t("about_our-team")}
                    </Typography>
                </AboutGrid>
                <AboutGrid className={classes.sectionBody}>
                    <Grid container alignItems="stretch" spacing={isXs ? 0 : 4} className={classes.subContainerGrid}>
                    {
                        TeamMembers.map((item, index) => {
                            return (
                                <Grid item xs={12} md={6} key={index}>
                                    <TeamMember alt={item.alt} name={item.name} url={item.img} />
                                </ Grid>
                            );
                        })
                    }
                    </Grid>
                </AboutGrid>
            </>
        );
    };

    const renderSupporters = () => {
        return (
            <>
                <AboutGrid>
                    <Typography className={classes.subHeading}>
                        {t("about_supporters")} 
                    </Typography>
                </AboutGrid>
                <AboutGrid className={classes.sectionBody}>
                    <Grid container alignItems="center" spacing={isXs ? 0 : 4} className={classes.subContainerGrid}>
                        {Supporters.map((item, index) => {
                            return (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <img src={item.img} className={classes.supporterLogo} alt={item.alt} />
                            </Grid>
                            );
                        })}
                    </Grid>
                </AboutGrid>
            </>
        );
    };

    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: "about"});
    });

    return (
        <div className={classes.root}>
            <Grid
                container
                justify="center"
                
            >
                {renderAboutDescription()}
                {renderFaq()}
                {renderSupporters()}
                {renderOurTeam()}
                {renderOpenData()}
            </Grid>

        </div>
    );
};

interface AboutGridProps {
    children: any;
    className?: any;
}

const AboutGrid = (props: AboutGridProps) => {
    const { className } = props;
    return (
        <Grid item xs={11} sm={10} md={8} lg={8} className={className}>
            {props.children}
        </Grid> 
    );
};

export default AboutPanel;
