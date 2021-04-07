import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { useTranslation } from "react-i18next";

interface TeamMemberProps {
    alt: string;
    name: string;
    url: string;
}

const useStyles = makeStyles((theme) => ({
    description: {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    image: {
        borderRadius: "50%",
        [theme.breakpoints.down("sm")]: {
            height: "125px",
            width: "125px",
        },
        [theme.breakpoints.up("md")]: {
            height: "160px",
            width: "160px",
        },
        [theme.breakpoints.up("lg")]: {
            height: "200px",
            width: "200px",
        },
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    root: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
}));

const TeamMember = (props: TeamMemberProps) => {
    const { t } = useTranslation("");
    const { alt, name, url } = props;
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={3}>
            <Typography variant="h5">
                {t(`about_${name}-name`)}
            </Typography>
            <Typography variant="subtitle1">
                <Box fontStyle="italic">
                    {t(`about_${name}-title`)}
                </Box>
            </Typography>
            <img src={url} className={classes.image} alt={alt}/>
            <Typography align="center" className={classes.description}>
                    {t(`about_${name}-description`)}
            </Typography>
        </Paper>
    )
};

export default TeamMember;