import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";
import Alert, { Color } from "@material-ui/lab/Alert";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useHistory, useLocation } from "react-router-dom";

import { GetUserToken } from "../../Services/AdminServices";

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

interface LocationState {
    from: {
        pathname: string;
    };
}

const Login = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<Color>("success");
    const location = useLocation<LocationState>();
    const history = useHistory();
    const { from } = location.state || {from: { pathname: "/"}};

    const validationSchema = Yup.object({
        password: Yup
            .string()
            .required("Password is required."),
        username: Yup
            .string()
            .required("Username is required."),
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            username: ""
        },
        onSubmit: () => {
            handleSubmit();
        },
        validationSchema: validationSchema
    });

    const handleSnackbarClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        const result = await GetUserToken(formik.values.username, formik.values.password);

        if (result.success) {
            localStorage.setItem("wrmjwt", result.token);
            history.push(from);
            // return  (
            //     <Redirect to={from} />
            // );
        } else if (result.status === 401) {
            setSeverity("warning");
            setMessage(result.message);
            setOpen(true);
        } else {
            setSeverity("error");
            setMessage(result.message);
            setOpen(true);
        }
    };


    return (
        <div className={classes.root}>
            <Grid
                alignItems="center"
                container
                direction="column"
                justifyContent="center"
            >
                <Grid item xs={6}>
                    <Typography className={classes.title}>
                        Login
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
                            id="password"
                            label="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
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
                                Login
                            </Button>
                        </div>
                    </form>
                </Grid>
            </Grid>
            <Snackbar
                autoHideDuration={10000}
                onClose={handleSnackbarClose}
                open={open}
            >
                <Alert onClose={handleSnackbarClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;