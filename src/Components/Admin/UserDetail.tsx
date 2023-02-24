import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from  "react-router-dom";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import EditButtonBar from "./EditButtonBar"
import { AdminUrl } from "../../Constants";
import { DeleteUser, GetUser, UpdateUser } from "../../Services/AdminServices";

interface useParamsInterface {
    id: string;
}

interface UserFields {
    canDownload: boolean;
    canEdit: boolean;
    email: string;
    isAdmin: boolean;
    password: string;
    username: string;
}

const useStyles = makeStyles((theme) => ({
    button: {
        minWidth: "95px",
    },
    buttonBar: {
        marginTop: theme.spacing(2),
        textAlign: "right",
    },
    continueButton: {
        marginTop: theme.spacing(3),
    },
    form: {
        marginTop: theme.spacing(3),
    },
    grid: {
        flexDirection: "column",
    },
    input: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    message: {
        color: theme.palette.primary.main,
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
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

const initialState = {
    canDownload: false,
    canEdit: false,
    email: "",
    isAdmin: false,
    password: "",
    username: ""
};

const UserDetail = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState<UserFields>(initialState);
    const [open, setOpen] = useState(false);
    const { id } = useParams<useParamsInterface>();
    const history = useHistory();
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showDeleteResult, setShowDeleteResult] = useState(false);
    const [showSaveResult, setShowSaveResult] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");
    const [saveMessage, setSaveMessage] = useState("");

    const validationSchema = Yup.object({
        email: Yup
            .string()
            .required("Email is required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { ...formData },
        onSubmit: (values) => {
            handleSubmit();
        },
        validationSchema: validationSchema
    });

    const handleCancelButtonClicked = () => {
        history.goBack();
    };

    const handleCancelDelete = () => {
        setOpen(false);
    };

    const handleConfirmDelete = async () => {
        const url = `${AdminUrl}/user/${id}`;
        const response = await DeleteUser(url);
        setOpen(false);

        if (response.ok) {
            setDeleteMessage("The user was successfully deleted");
        } else if (response.status === 401) {
            setDeleteMessage("You must be logged in to edit user details.");
        } else if (response.status === 403) {
            setDeleteMessage("You are not authorized to edit user details.");
        } else {
            setDeleteMessage("An unspecified error occurred.");
        }

        setShowForm(false);
        setShowDeleteResult(true);
    };

    const handleContinueClick = () => {
        history.goBack();
    };

    const handleDeleteButtonClicked = () => {
        setOpen(true);
    };

    const handleSaveButtonClicked = async () => {
        setFormData(formik.values);
        const response = await UpdateUser(formik.values, id);

        if (response.ok) {
            setSaveMessage("The changes were successfully saved.");
        } else if (response.status === 401) {
            setSaveMessage("You must be logged in to edit user details.");
        } else if (response.status === 403) {
            setSaveMessage("You are not authorized to edit user details.");
        } else {
            setSaveMessage("An unspecified network error occurred.");
        }

        setShowForm(false);
        setShowSaveResult(true);
    };


    const handleSnackbarClose = () => {
        console.log("Redirecting to login page.");
        setOpen(false);
    };

    const handleSubmit = async () => {
        const response = await UpdateUser(formik.values, id);

        if (response.ok) {
            const result = response.json();
            setOpen(true);
        } else if (response.status === 401) {
            console.log("You must be logged in to edit a user's details.");
        } else if (response.status === 403) {
            console.log("You are not authorized to edit a user's details.");
        } else {
            console.log("An unspecified error occurred.");
        }
    };

    useEffect(() => {
        (async () => {
            const response  = await GetUser(id);

            if (response.ok) {
                const result = await response.json()
                setFormData(result.user);
                setShowForm(true);
            } else if (response.status === 401) {
                console.log("You must be logged in to edit a user's details.");
            } else if (response.status === 403) {
                console.log("You are not authorized to edit a user's details.");
            } else {
                console.log("An unspecified error occurred.");
            }
        })()
    }, []);

    return (
        <>
            <div>
                { showDeleteResult && (
                    <div className={classes.message}>
                        <Typography>      
                            {deleteMessage}
                        </Typography> 
                        <Button color="primary" className={classes.continueButton} onClick={() => handleContinueClick()} variant="outlined">
                            Continue
                        </Button>
                    </div>
                )}
                { showSaveResult && (
                    <div className={classes.message}>
                        <Typography> 
                            {saveMessage}
                        </Typography> 
                        <Button color="primary" className={classes.continueButton} onClick={() => handleContinueClick()} variant="outlined">
                            Continue
                        </Button>
                    </div>
                )}
                { showError && (
                    <div className={classes.message}>
                        <Typography>
                            The requested report could not be found. Please check the report ID and try again.
                        </Typography>
                        <Typography>
                            Click continue to return to the previous page.
                        </Typography>
                        <Button color="primary" className={classes.continueButton} onClick={() => handleContinueClick()} variant="outlined">
                            Continue
                        </Button>
                    </div>
                )}
            </div>
            {showForm && (
                <div className={classes.root}>
                    <Grid
                        alignItems="center"
                        container
                        direction="column"
                        justifyContent="center"
                    >
                        <Grid item xs={6}>
                            <Typography className={classes.title}>
                                Editing User: {formik.values.username}
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                                <div>
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
                                </div>
                                <FormControlLabel
                                    checked={formik.values.isAdmin} 
                                    control={<Checkbox id="isAdmin" color="primary" />}
                                    label="Is Admin"
                                    labelPlacement="start"
                                    onChange={formik.handleChange}
                                    value={formik.values.isAdmin}
                                />
                                {/* <FormControlLabel
                                    checked={formik.values.canDownload} 
                                    control={<Checkbox color="primary" id="canDownload" value={formik.values.canDownload} />}
                                    label="Can Download"
                                    labelPlacement="start"
                                    onChange={formik.handleChange}
                                    value={formik.values.canDownload}
                                />
                                <FormControlLabel
                                    checked={formik.values.canEdit} 
                                    control={<Checkbox color="primary" id="canEdit" value={formik.values.canEdit} />}
                                    label="Can Edit"
                                    labelPlacement="start"
                                    onChange={formik.handleChange}
                                    value={formik.values.canEdit}
                                /> */}
                                <div className={classes.buttonBar}>
                                    <EditButtonBar
                                        cancelClick={handleCancelButtonClicked}
                                        deleteClick={handleDeleteButtonClicked}
                                        saveClick={handleSaveButtonClicked}
                                    />
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </div>
            )}
            <ConfirmDeleteDialog handleConfirmNo={handleCancelDelete} handleConfirmYes={handleConfirmDelete} open={open} />
        </>
    );
}

export default UserDetail;