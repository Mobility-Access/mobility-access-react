import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useTranslation } from "react-i18next";

import Faq, { QuestionAnswer } from "./Faq";
import Supporters from "./Supporters";
import TeamMember from "./TeamMember";
import TeamMembers from "./TeamMembers";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    aboutPaper: {
        backgroundColor: fade(theme.palette.primary.light, 0.1),
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        padding: theme.spacing(5),
    },
    aboutDescription: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
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
                    <Typography variant="h2">
                        {t("common_about")}
                    </Typography>
                    <Typography className={classes.aboutDescription} variant="h5">
                        {t("about_description")}
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
                                    <TeamMember name={item.name} url={item.img} />
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
                                <img src={item.img} className={classes.supporterLogo}/>
                            </Grid>
                            );
                        })}
                    </Grid>
                </AboutGrid>
            </>
        );
    };

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
