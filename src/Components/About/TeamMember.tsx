import React from "react";
import Box from "@mui/material/Box";
import makeStyles from '@mui/styles/makeStyles';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
        [theme.breakpoints.down('md')]: {
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
    name: {
        fontSize: "1.5rem"
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
        <Paper aria-label="Card with team member information" className={classes.root} elevation={3}>
            <Typography className={classes.name} variant="h4">
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