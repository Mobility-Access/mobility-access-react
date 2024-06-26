import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import { alpha, useTheme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Link as RouterLink } from "react-router-dom";

import ReactGA from "react-ga4";

import { useTranslation } from "react-i18next";

import Faq, { QuestionAnswer } from "./Faq";
import Supporters from "./Supporters";
import TeamMember from "./TeamMember";
import TeamMembers from "./TeamMembers";
import { englishReports, frenchReports } from "./Resources";
import Colors from "../../Colors";
import { AmenityUrl, HazardUrl, IncidentUrl } from "../../Constants";
import { ReportType } from "../../FormTypes";

const BaseUrl = import.meta.env.BASE_URL
const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: "flex",
        height: "calc(100vh - 64px)",
        overflowY: "scroll",
    },
    aboutPaper: {
        backgroundColor: alpha(Colors.gray, 0.1),
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
    description: {
        fontSize: '1.25rem'
    },
    exportBlock: {
        marginBottom: theme.spacing(5),
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    link: {
        color: "#0000EE"
    },
    publication: {
        paddingLeft: theme.spacing(8),
        textIndent: theme.spacing(-4)
    },
    question: {
        color: theme.palette.primary.main,
        fontWeight: "bold",
        marginBottom: theme.spacing(1),
    },
    resourceLink: {
        paddingLeft: theme.spacing(4)
    },
    resourceList: {
        listStyleType: "disc",
        paddingLeft: theme.spacing(6)
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
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

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
        switch (type) {
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
                    <Typography className={classes.aboutTitle} variant="h2">
                        {t("common_about")}
                    </Typography>
                    <div className={classes.aboutDescription}>
                        <Typography className={classes.description}>{t("about_description1")}</Typography>
                        <br></br>
                        <Typography className={classes.description}>{t("about_description2")}</Typography>
                        <br></br>
                        <Typography className={classes.description}>{t("about_description3")}</Typography>
                    </div>
                </Paper>
            </AboutGrid>
        );
    };

    const qa: QuestionAnswer[] = [
        { question: "q1", answer: "a1" },
        { question: "q2", answer: "a2" },
        { question: "q3", answer: "a3" },
        { question: "q4", answer: "a4" },
        { question: "q5", answer: "a5" },
    ];

    const renderFaq = () => {
        return (
            <>
                <AboutGrid className={classes.sectionTitle}>
                    <Typography className={classes.subHeading} variant="h3">
                        {t("about_faq")}
                    </Typography>
                </AboutGrid>
                <AboutGrid className={classes.sectionBody}>
                    <Grid container alignItems="stretch" spacing={1} className={classes.subContainerGrid}>
                        <List>
                            {
                                qa.map((item, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <Grid item xs={12}>
                                                <Faq qa={item} />
                                            </Grid>
                                        </ListItem>
                                    );
                                })
                            }
                            {/* FAQ #6 has a hyperlink in it, so the Faq component can't be used to render it. */}
                            {
                                i18n.language.startsWith("en") && (
                                    <ListItem>
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
                                    </ListItem>
                                )
                            }
                        </List>
                    </Grid>
                </AboutGrid>
            </>
        );
    };

    const renderOpenData = () => {
        return (
            <>
                <AboutGrid>
                    <Typography className={classes.subHeading} variant="h3">
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
                        <Typography className={classes.subTitle} variant="h4">
                            {t("about_open-data-hazard-concern")}
                        </Typography>
                        <div className={classes.buttonBar}>
                            <Button aria-label="Click to export hazard data in CSV format" className={classes.button} onClick={() => handleExport(ReportType.Hazard, "csv")} variant="outlined">
                                CSV
                            </Button>
                            <Button aria-label="Click to export hazard data in JSON format" className={classes.button} onClick={() => handleExport(ReportType.Hazard, "json")} variant="outlined">
                                JSON
                            </Button>
                            <Button aria-label="Click to export hazard data in GeoJSON format" className={classes.button} onClick={() => handleExport(ReportType.Hazard, "geojson")} variant="outlined">
                                GeoJSON
                            </Button>
                        </div>
                    </div>
                    <div className={classes.exportBlock}>
                        <Typography className={classes.subTitle} variant="h4">
                            {t("about_open-data-missing-amenities")}
                        </Typography>
                        <div className={classes.buttonBar}>
                            <Button aria-label="Click to export amenity data in CSV format" className={classes.button} onClick={() => handleExport(ReportType.Amenity, "csv")} variant="outlined">
                                CSV
                            </Button>
                            <Button aria-label="Click to export amenity data in JSON format" className={classes.button} onClick={() => handleExport(ReportType.Amenity, "json")} variant="outlined">
                                JSON
                            </Button>
                            <Button aria-label="Click to export amenity data in GeoJSON format" className={classes.button} onClick={() => handleExport(ReportType.Amenity, "geojson")} variant="outlined">
                                GeoJSON
                            </Button>
                        </div>
                    </div>
                    <div className={classes.exportBlock}>
                        <Typography className={classes.subTitle} variant="h4">
                            {t("about_open-data-incident")}
                        </Typography>
                        <div className={classes.buttonBar}>
                            <Button aria-label="Click to export incident data in CSV format" className={classes.button} onClick={() => handleExport(ReportType.Incident, "csv")} variant="outlined">
                                CSV
                            </Button>
                            <Button aria-label="Click to export incident data in JSON format" className={classes.button} onClick={() => handleExport(ReportType.Incident, "json")} variant="outlined">
                                JSON
                            </Button>
                            <Button aria-label="Click to export incident data in GeoJSON format" className={classes.button} onClick={() => handleExport(ReportType.Incident, "geojson")} variant="outlined">
                                GeoJSON
                            </Button>
                        </div>
                    </div>
                </AboutGrid>
            </>
        );
    };

    const renderResources = () => {
        if (i18n.language.startsWith("es")) {
            return (<></>);
        }
        const reports = i18n.language.startsWith("en") ? englishReports : frenchReports;
        return (
            <>
                <AboutGrid>
                    <Typography className={classes.subHeading} variant="h3">
                        {t("about_resources")}
                    </Typography>
                </AboutGrid>
                <AboutGrid className={classes.sectionBody}>
                    <List className={classes.resourceList} >
                        { reports.map((report: { text: string, hyperlink: string }, index: number) => {
                            return (
                                <ListItem key={index}  sx={{ display: 'list-item' }}>
                                    <Link href={report.hyperlink} rel="noopener" target="_blank">{report.text}</Link>
                                </ListItem>
                            )
                        })}
                    </List>
                </AboutGrid>
            </>
        );
    }

    const renderOurTeam = () => {
        return (
            <>
                <AboutGrid className={classes.sectionTitle}>
                    <Typography className={classes.subHeading} variant="h3">
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

    const renderPublications = () => {
        return (
            <>
                <AboutGrid>
                    <Typography className={classes.subHeading} variant="h3">
                        {t("about_publications")}
                    </Typography>
                </AboutGrid>
                <AboutGrid className={classes.sectionBody}>
                    <div className={classes.publication}>Laberee K, Nelson T, Boss D, Ferster C, Hosford K, Fuller D, Cloutier MS, & Winters M. (2023). WalkRollMap.org: Crowdsourcing barriers to mobility. <i>Frontiers in Rehabilitation Sciences</i>. Vol 4. [<a href={'https://doi.org/10.3389/fresc.2023.1023582'} rel="noopener noreferrer" target="_blank">article</a>]</div>
                </AboutGrid>
            </>
        );
    }

    const renderSupporters = () => {
        return (
            <>
                <AboutGrid>
                    <Typography className={classes.subHeading} variant="h3">
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
        ReactGA.send({ hitType: "pageview", page: "about" });
    });

    return (
        <div className={classes.root} id="about-tabpanel" role="tabpanel">
            <Grid
                container
                justifyContent="center"
            >
                {renderAboutDescription()}
                {renderFaq()}
                {renderSupporters()}
                {renderPublications()}
                {renderResources()}
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
