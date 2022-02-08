import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";

import { useFormik } from "formik";
import * as Yup from "yup";

import Colors from "../../Colors";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        marginTop: theme.spacing(5),
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

const Login = () => {
    const classes = useStyles();

    const validationSchema = Yup.object({
        password: Yup
            .string()
            .required("Username is required."),
        userName: Yup
            .string()
            .required("Username is required."),
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            userName: ""
        },
        onSubmit: (values) => {
            setFormData(values);
            nextStep();
        },
        validationSchema: validationSchema
    });

    return (
        <div className={classes.root}>
            <Grid
                container
                justify="center"
                
            >
                <Paper>
                    <Typography>
                        Login

                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
}

export default Login;