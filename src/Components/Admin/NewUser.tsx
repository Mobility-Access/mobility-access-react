import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";

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

const NewUser = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper>
                This is a piece of paper.
            </Paper>

        </div>
    );
}

export default NewUser;