import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ReactGA from "react-ga4";

import { useTranslation } from "react-i18next";

import Faq, { QuestionAnswer } from "./Faq";
import Supporters from "./Supporters";
import TeamMember from "./TeamMember";
import TeamMembers from "./TeamMembers";
import Colors from "../../Colors";

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
        marginBottom: theme.spacing(2),
    },
    supporterLogo: {
        maxWidth: "200px",
    },
}));

const AboutPanel = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));

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
                    <Typography className={classes.subHeading} variant="h4">
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
                        </Grid>
                </AboutGrid>
            </>
        );
    };

    const renderOurTeam = () => {
        return (
            <>
                <AboutGrid className={classes.sectionTitle}>
                    <Typography className={classes.subHeading} variant="h4">
                        {t("about_our-team")}
                    </Typography>
                </AboutGrid>
                <AboutGrid>
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
                    <Typography className={classes.subHeading} variant="h4">
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
