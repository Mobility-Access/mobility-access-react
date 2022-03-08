import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";

import Colors from "../../Colors";
import { CreateUserService } from "../../Services/AdminServices";

const useStyles = makeStyles((theme) => ({
    button: {
        minWidth: "95px",
    },
    buttonBar: {
        marginTop: theme.spacing(2),
        textAlign: "right",
    },
    form: {
        marginTop: theme.spacing(3),
    },
    grid: {
        flexDirection: "column",
    },
    input: {
        marginTop: theme.spacing(2),
    },
    root: {
        display: "flex",
        marginTop: theme.spacing(5),
        overflowY: "scroll",
    },
    title: {
        color: theme.palette.primary.main,
        fontSize: "36px"
    },
}));

const NewUser = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const validationSchema = Yup.object({
        confirmPassword: Yup
            .string()
            .required("Confirmation password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        email: Yup
            .string()
            .required("Email is required"),
        password: Yup
            .string()
            .min(6, "Password must be at least 6 characters long")
            .required("Password is required."),
        username: Yup
            .string()
            .required("Username is required."),
    });

    const formik = useFormik({
        initialValues: {
            confirmPassword: "",
            email: "",
            password: "",
            username: ""
        },
        onSubmit: (values) => {
            handleSubmit();
        },
        validationSchema: validationSchema
    });

    const handleSnackbarClose = () => {
        setOpen(false);
        setRedirect(true);
    };

    const handleSubmit = async () => {
        const result = await CreateUserService(formik.values.username, formik.values.password, formik.values.email);

        if (result.success) {
            setOpen(true);
        }
        setOpen(true);
    };

    // TODO - Add handler to redirect user to login page/main reports page after creating a new account

    return (
        <>
            {
                !redirect && (
                    <div className={classes.root}>
                        <Grid
                            alignItems="center"
                            container
                            direction="column"
                            justify="center"
                            
                        >
                            <Grid item xs={6}>
                                <Typography className={classes.title}>
                                    New User
                                </Typography>
                                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        error={formik.touched.username && Boolean(formik.errors.username)}
                                        helperText={formik.touched.username && formik.errors.username}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        type="password"
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        id="confirm-password"
                                        label="Confirm Password"
                                        value={formik.values.confirmPassword}
                                        onChange={(event) => formik.setFieldValue("confirmPassword", event.target.value)}
                                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                        type="password"
                                        variant="outlined"
                                    />
                                    <div className={classes.buttonBar}>
                                        <Button
                                            className={classes.button}
                                            color="primary"
                                            type="submit"
                                            variant="outlined"
                                        >
                                            Create
                                        </Button>
                                    </div>
                                </form>
                            </Grid>
                        </Grid>
                        <Snackbar
                            autoHideDuration={5000}
                            onClose={handleSnackbarClose}
                            open={open}
                        >
                            <Alert onClose={handleSnackbarClose} severity="success">
                                "New user successfully created. An admin must now activate your account."
                            </Alert>
                        </Snackbar>
                    </div>
                )
            }
            {
                redirect && (
                    <Redirect to={{pathname: "/"}} />
                )
            }
        </>
        
        
    );
}

export default NewUser;