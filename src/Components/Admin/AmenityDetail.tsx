import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { KeyboardDateTimePicker } from "@material-ui/pickers";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enLocale from "date-fns/locale/en-US";

import { useHistory, useParams } from  "react-router-dom";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import EditButtonBar from "./EditButtonBar"
import { DeletePoint, GetAmenity, UpdateAmenityReport } from "../../Services/AdminServices";
import Colors from "../../Colors";
import { AdminUrl } from "../../Constants";
import { AmenityFields, initialState } from "../Form/Amenity/AmenityController";

import {
    AmenityTypes,
    Disability,
    DisabilityType,
    DisabilityTypes,
    DisabilityTypeTypes,
    Gender,
    GenderTypes,
    HeardAbout,
    HeardAboutTypes,
    Mobility,
    MobilityAid,
    MobilityTypes,
    MobilityAidTypes,
    ReportType } from "../../FormTypes";
import { NumberItem } from "../Form/DemographicForm";
import AdminMap from "./AdminMap";

interface useParamsInterface {
    id: string;
}

const minInputHeight = 56;

const useStyles = makeStyles((theme) => ({
    amenityForm: {
        marginTop: theme.spacing(3),
    },
    bottomDivider: {
        marginTop: theme.spacing(3),
    },
    buttonBar: {
        marginTop: theme.spacing(3),
    },
    buttonBarButton: {
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
    confirmDeleteButton: {
        color: Colors.contrastRed,
    },
    container: {
        display: "flex",
    },
    containerItem: {
        marginLeft: theme.spacing(10),
        marginTop: theme.spacing(5),
        height: "600px",
        width: "600px",
    },
    continueButton: {
        marginTop: theme.spacing(3),
    },
    date: {
        marginTop: theme.spacing(1),
        minHeight: minInputHeight,
    },
    deleteButton: {
        borderColor: Colors.contrastRed,
        color: Colors.contrastRed,
        minWidth: 90,
        '&:hover': {
            borderColor: Colors.contrastRed
        },
    },
    button: {
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    input: {
        marginTop: theme.spacing(1),
    },
    mapContainer: {
        marginTop: theme.spacing(3),
        width: "100%",
        height: "100%",
    },
    menuItem: {
        minHeight: minInputHeight,
        '&.Mui-selected': {
            borderLeft: `6px solid ${Colors.contrast}`
        }
    },
    message: {
        color: theme.palette.primary.main,
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    multiSelect: {
        minHeight: minInputHeight,
    },
    question: {
        marginTop: theme.spacing(4),
    },
    questionText: {
        fontWeight: "bold",
    },
    root: {
        color: theme.palette.primary.main,
        height: `calc(100vh - 89px)`,
        overflowY: "scroll",
        padding: "15px",
    },
    text: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    title: {
        marginRight: "25px"
    },
    titleBar: {
        display: "flex",
        marginBottom: "20px",
    },
}));

const AmenityDetail = () => {
    const [formData, setFormData] = useState<AmenityFields>(initialState);
    const [open, setOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showDeleteResult, setShowDeleteResult] = useState(false);
    const [showSaveResult, setShowSaveResult] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");
    const [saveMessage, setSaveMessage] = useState("");
    const classes = useStyles();
    const { id } = useParams<useParamsInterface>();
    const history = useHistory();
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        amenityType: Yup
            .string()
            .required(t("form-required")),
        date: Yup
            .date()
            .required(t("form-required")),
        description: Yup
            .string()
            .max(500, t("form-max-length-500"))
            .required(t("form-required")),
        suggestedSolution: Yup
            .string()
            .max(300, t("form-max-length-300")),
        birthYear: Yup
            .number()
            .moreThan(-1, t("form-required"))
            .required(t("form-required")),
        gender: Yup
            .string()
            .max(50, t("form-max-length-30"))
            .required(t("form-required")),
        heardAbout: Yup
            .string(),
        heardAboutOpen: Yup
            .string()
            .max(75, t("form-max-length-75")),
        identity: Yup
            .array()
            .min(1, t("form-required"))
            .required(t("form-required")),
        disability: Yup
            .string()
            .required(t("form-required")),
    });

    const birthYears = () => {
        const birthYears: NumberItem[] = [];
        for (let i = 2010; i > 1921; i--) {
            const item = { key: i, value: i };
            birthYears.push(item);
        }

        return birthYears;
    };

    const birthYearTypes: NumberItem[] = birthYears();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { ...formData },
        onSubmit: () => {
            // setFormData(values);

            console.log("Submitting something");
        },
        validationSchema: validationSchema
    });

    const handleAmenityTypeSelect = (event: any) => {
        formik.setFieldValue("amenityType", event.target.value);
    };

    const handleArchivedChange = (event: any) => {
        formik.setFieldValue("archived", event.target.checked);
    };

    const handleBirthYearSelect = (event: any) => {
        formik.setFieldValue("birthYear", event.target.value);
    };

    const handleCancelButtonClicked = () => {
        history.goBack();
    };

    const handleCancelDelete = () => {
        setOpen(false);
    };

    const handleContinueClick = () => {
        history.goBack();
    };

    const handleConfirmDelete = async () => {
        const url = `${AdminUrl}/amenity/${id}`;
        const result = await DeletePoint(url);

        if (result.success) {
            setDeleteMessage(`The report was successfully deleted.`); 
        } else {
            setDeleteMessage(`An unspecified error occurred while deleting the feature.`);
        }
        setShowForm(false);
        setShowDeleteResult(true);
        setOpen(false);
    };

    const handleDateChange = (value: any) => {
        formik.setFieldValue("date", value);
    };

    const handleDeleteButtonClicked = () => {
        setOpen(true);
    };

    const handleDisabilitySelect = (event: any) => {
        const value = event.target.value;
        formik.setFieldValue("disability", value);

        if (value !== Disability.Yes) {
            formik.setFieldValue("disabilityTypeOpen", "");
            formik.setFieldValue("disabilityType", "");
            formik.setFieldValue("mobilityAid", "");
            formik.setFieldValue("mobilityAidTypeOpen", "");
            formik.setFieldValue("mobilityAidType", "");
        }
    };

    const handleDisabilityTypeOpenChange = (event: any) => {
        formik.setFieldValue("disabilityTypeOpen", event.target.value);
    };

    const handleDisabilityTypeSelect = (event: any) => {
        formik.setFieldValue("disabilityType", event.target.value);

        if (formik.values.disabilityTypeOpen && formik.values.disabilityType !== DisabilityType.Other) {
            formik.setFieldValue("disabilityTypeOpen", "");
        }
    };

    const handleGenderOpenChange = (event: any) => {
        formik.setFieldValue("genderOpen", event.target.value);
    };

    const handleGenderSelect = (event: any) => {
        formik.setFieldValue("gender", event.target.value);

        if (formik.values.genderOpen && event.target.value !== Gender.Other) {
            formik.setFieldValue("genderOpen", "");
        }
    };

    const handleGeometryChange = (coords: number[]) => {
        formik.setFieldValue("point", coords)
    };

    const handleheardAboutSelect = (event: any) => {
        const value = event.target.value;
        formik.setFieldValue("heardAbout", value);

        if (formik.values.heardAboutOpen && formik.values.heardAbout !== HeardAbout.Other) {
            formik.setFieldValue("heardAboutOpen", "");
        }
    };

    const handleHeardAboutOpenChange = (event: any) => {
        formik.setFieldValue("heardAboutOpen", event.target.value);
    };

    const handleIdentityChange = (event: any) => {
        formik.setFieldValue("identity", event.target.value);
    };

    const handleMobilityAidSelect = (event: any) => {
        const value = event.target.value;
        formik.setFieldValue("mobilityAid", value);

        if (value !== Mobility.Yes) {
            formik.setFieldValue("mobilityAidTypeOpen", "");
            formik.setFieldValue("mobilityAidType", "");
        }
    };

    const handleMobilityAidTypeOpenChange = (event: any) => {
        formik.setFieldValue("mobilityAidTypeOpen", event.target.value);
    };

    const handleMobilityAidTypeSelect = (event: any) => {
        formik.setFieldValue("mobilityAidType", event.target.value);
    }

    const handleSaveButtonClicked = async () => {
        setFormData(formik.values);
        const result = await UpdateAmenityReport(formik.values, id);

        if (result.success) {
            setSaveMessage(`The changes were successfully saved.`);
        } else {
            setSaveMessage(`The changes could not be saved. An unspecified error occurred while saving the feature.`);
            
            if (result.serverError) {
                console.warn(`An error occurred while trying to update report with Id: ${id}`);
            } else if (result.networkError) {
                console.warn(`A network error occurred while trying to update report with Id: ${id}`);
            }
        }

        setShowForm(false);
        setShowSaveResult(true);
    };

    const handleVisibleChange = (event: any) => {
        formik.setFieldValue("visible", event.target.checked);
    };

    useEffect(() => {
        (async () => {
            const result  = await GetAmenity(id);
            if (!result || !result.success) {
                setShowError(true);
            } else {
                setShowForm(true);
                setFormData(result.amenity);
            }
        })()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                            Click continue to return to the main admin page.
                        </Typography>
                        <Button color="primary" className={classes.continueButton} onClick={() => handleContinueClick()} variant="outlined">
                            Continue
                        </Button>
                    </div>
                )}
            </div>
            { showForm && (
                <div className={classes.root}>
                    <div className={classes.titleBar}>
                        <Typography className={classes.title} variant="h4">
                            {`Editing Amenity: ${id}`}
                        </Typography>
                        <EditButtonBar
                            cancelClick={handleCancelButtonClicked}
                            deleteClick={handleDeleteButtonClicked}
                            saveClick={handleSaveButtonClicked}
                        />
                    </div>
                    <Divider variant="middle" />
                    <div className={classes.container}>
                        <div>
                            <form className={classes.amenityForm} noValidate onSubmit={formik.handleSubmit}>
                                <div className={classes.question}>
                                    <Typography className={classes.questionText}>
                                        {t("form_amenity-type-question")}
                                    </Typography>
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        id="amenity"
                                        name="amenity"
                                        select
                                        value={formik.values.amenityType}
                                        onChange={handleAmenityTypeSelect}
                                        error={formik.touched.amenityType && Boolean(formik.errors.amenityType)}
                                        helperText={formik.touched.amenityType && formik.errors.amenityType}
                                        variant="outlined"
                                    >
                                        {
                                            AmenityTypes.map((item) => {
                                                return (
                                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                                        <Typography>
                                                            {t(item.value)}
                                                        </Typography>
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </TextField>
                                </div>
                                <div className={classes.question}>
                                    <Typography className={classes.questionText}>
                                        {t("form_common-describe")}
                                    </Typography>
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        id="amenity-description"
                                        name="amenity-description"
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                        value={formik.values.description}
                                        onChange={(event) => formik.setFieldValue("description", event.target.value)}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                    >
                                    </TextField>
                                </div>
                                <MuiPickersUtilsProvider locale={enLocale} utils={DateFnsUtils}>
                                <div className={classes.question}>
                                    <Typography className={classes.questionText}>
                                        {t("form_amenity-date")}
                                    </Typography>
                                    <KeyboardDateTimePicker
                                        className={classes.date}
                                        disableFuture
                                        format="MM/dd/yyyy, hh:mm a"
                                        fullWidth
                                        id="amenity-date-picker"
                                        inputVariant="outlined"
                                        name="amenity-date-picker"
                                        onChange={handleDateChange}
                                        value={formik.values.date}
                                    />
                                </div>
                                </MuiPickersUtilsProvider>
                                <div className={classes.question}>
                                    <Typography className={classes.questionText}>
                                        {t("form_demographic_gender-question")}
                                    </Typography>
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        id="gender"
                                        name="gender"
                                        select
                                        value={formik.values.gender}
                                        onChange={handleGenderSelect}
                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                        helperText={formik.touched.gender && formik.errors.gender}
                                        variant="outlined"
                                    >
                                        {
                                            GenderTypes.map((item) => {
                                                return (
                                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                                        <Typography>
                                                            {t(item.value)}
                                                        </Typography>
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </TextField>
                                </div>
                                { formik.values.gender === Gender.Other && (
                                    <div className={classes.question}>
                                        <Typography className={classes.questionText}>
                                            {t("form_demographic_gender-question-other")}
                                        </Typography>
                                        <TextField
                                            className={classes.input}
                                            fullWidth
                                            id="gender-self-description"
                                            name="gender-self-description"
                                            value={formik.values.genderOpen}
                                            onChange={handleGenderOpenChange}
                                            error={formik.touched.genderOpen && Boolean(formik.errors.genderOpen)}
                                            helperText={formik.touched.genderOpen && formik.errors.genderOpen}
                                            variant="outlined"
                                        />
                                    </div>
                                )}
                                <div className={classes.question}>
                                    <Typography className={classes.questionText}>
                                        {t("form_demographic_identity-question")}
                                    </Typography>
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        id="identity"
                                        name="identity"
                                        value={formik.values.identity}
                                        onChange={handleIdentityChange}
                                        error={formik.touched.identity && Boolean(formik.errors.identity)}
                                        helperText={formik.touched.identity && formik.errors.identity}
                                        variant="outlined"
                                    >
                                    </TextField>
                                </div>
                                <div className={classes.question}>
                                    <Typography className={classes.questionText}>
                                        {t("form_demographic-birth-year")}
                                    </Typography>
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        id="birth-year"
                                        name="birth-year"
                                        select
                                        value={formik.values.birthYear}
                                        onChange={handleBirthYearSelect}
                                        error={formik.touched.birthYear && Boolean(formik.errors.birthYear)}
                                        helperText={formik.touched.birthYear && formik.errors.birthYear}
                                        variant="outlined"
                                    >
                                        {
                                            birthYearTypes.map((item) => {
                                                return (
                                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                                        <Typography>
                                                            {item.value}
                                                        </Typography>
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </TextField>
                                </div>
                                <div className={classes.question}>
                                    <Typography className={classes.questionText}>
                                        {t("form_disability-question")}
                                    </Typography>
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        id="disability"
                                        name="disability"
                                        select
                                        value={formik.values.disability}
                                        onChange={handleDisabilitySelect}
                                        error={formik.touched.disability && Boolean(formik.errors.disability)}
                                        helperText={formik.touched.disability && formik.errors.disability}
                                        variant="outlined"
                                    >
                                        {
                                            DisabilityTypes.map((item: any) => {
                                                return (
                                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                                        <Typography>
                                                            {t(item.value)}
                                                        </Typography>
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </TextField>
                                </div>
                                { formik.values.disability === Disability.Yes && (
                                    <div className={classes.question}>
                                        <Typography className={classes.questionText}>
                                            {t("form_disability-type-question")}
                                        </Typography>
                                        <TextField
                                            className={classes.input}
                                            fullWidth
                                            id="disability-type"
                                            name="disability-type"
                                            select
                                            value={formik.values.disabilityType}
                                            onChange={handleDisabilityTypeSelect}
                                            error={formik.touched.disabilityType && Boolean(formik.errors.disabilityType)}
                                            helperText={formik.touched.disabilityType && formik.errors.disabilityType}
                                            variant="outlined"
                                        >
                                            {
                                                DisabilityTypeTypes.map((item: any) => {
                                                    return (
                                                        <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                                            <Typography>
                                                                {t(item.value)}
                                                            </Typography>
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </TextField>
                                    </div>
                                )}
                                { formik.values.disabilityType === DisabilityType.Other && (
                                    <div className={classes.question}>
                                        <Typography className={classes.questionText}>
                                            {t("form_disability_disability-type-question")}
                                        </Typography>
                                        <TextField
                                            className={classes.input}
                                            fullWidth
                                            id="disability-type-description"
                                            name="disability-type-description"
                                            value={formik.values.disabilityTypeOpen}
                                            onChange={handleDisabilityTypeOpenChange}
                                            error={formik.touched.disabilityType && Boolean(formik.errors.disabilityType)}
                                            helperText={formik.touched.disabilityType && formik.errors.disabilityType}
                                            variant="outlined"
                                        />
                                    </div>
                                )}
                                { formik.values.disability === Disability.Yes && (
                                    <div className={classes.question}>
                                        <Typography className={classes.questionText}>
                                            {t("form_disability-mobility-aid-question")}
                                        </Typography>
                                        <TextField
                                            className={classes.input}
                                            fullWidth
                                            id="mobility-aid"
                                            name="mobility-aid"
                                            select
                                            value={formik.values.mobilityAid}
                                            onChange={handleMobilityAidSelect}
                                            error={formik.touched.mobilityAid && Boolean(formik.errors.mobilityAid)}
                                            helperText={formik.touched.mobilityAid && formik.errors.mobilityAid}
                                            variant="outlined"
                                        >
                                            {
                                                MobilityTypes.map((item: any) => {
                                                    return (
                                                        <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                                            <Typography>
                                                                {t(item.value)}
                                                            </Typography>
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </TextField>
                                    </div>
                                )}
                                { formik.values.mobilityAid === Mobility.Yes && (
                                    <div className={classes.question}>
                                        <Typography className={classes.questionText}>
                                            {t("form_disability-mobility-aid-type-question")}
                                        </Typography>
                                        <TextField
                                            className={classes.input}
                                            fullWidth
                                            id="mobility-aid-type"
                                            name="mobility-aid-type"
                                            select
                                            value={formik.values.mobilityAidType}
                                            onChange={handleMobilityAidTypeSelect}
                                            error={formik.touched.mobilityAidType && Boolean(formik.errors.mobilityAidType)}
                                            helperText={formik.touched.mobilityAidType && formik.errors.mobilityAidType}
                                            variant="outlined"
                                        >
                                            {
                                                MobilityAidTypes.map((item: any) => {
                                                    return (
                                                        <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                                            <Typography>
                                                                {t(item.value)}
                                                            </Typography>
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </TextField>
                                    </div>
                                )}
                                { formik.values.mobilityAidType === MobilityAid.Other && (
                                    <div className={classes.question}>
                                        <Typography className={classes.questionText}>
                                            {t("form_disability_mobility-aid-type-other-question")}
                                        </Typography>
                                        <TextField
                                            className={classes.input}
                                            fullWidth
                                            id="mobility-aid-type-other-description"
                                            name="mobility-aid-type-other-description"
                                            value={formik.values.mobilityAidTypeOpen}
                                            onChange={handleMobilityAidTypeOpenChange}
                                            error={formik.touched.mobilityAidTypeOpen && Boolean(formik.errors.mobilityAidTypeOpen)}
                                            helperText={formik.touched.mobilityAidTypeOpen && formik.errors.mobilityAidTypeOpen}
                                            variant="outlined"
                                        />
                                    </div>
                                )}
                                <div className={classes.question}>
                                    <label htmlFor="heard about">
                                        <Typography className={classes.questionText}>
                                            {t("form_disability_heard_about-question")}
                                        </Typography>
                                    </label>
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        id="heard about"
                                        name="heard about"
                                        select
                                        value={formik.values.heardAbout}
                                        onChange={handleheardAboutSelect}
                                        error={formik.touched.heardAbout && Boolean(formik.errors.heardAbout)}
                                        helperText={formik.touched.heardAbout && (<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required" role="alert">{formik.errors.heardAbout}</p>)}
                                        variant="outlined"
                                        required
                                    >
                                        {
                                            HeardAboutTypes.map((item) => {
                                                return (
                                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                                        <Typography>
                                                            {t(item.value)}
                                                        </Typography>
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </TextField>
                                </div>
                                { formik.values.heardAbout === HeardAbout.Other && (
                                    <div className={classes.question}>
                                        <label htmlFor="heard-about-description">
                                            <Typography className={classes.questionText}>
                                                {t("form_disability_heard_about-question-other")}
                                            </Typography>
                                        </label>
                                        <TextField
                                            className={classes.input}
                                            fullWidth
                                            id="heard-about-description"
                                            name="heard-about-description"
                                            value={formik.values.heardAboutOpen}
                                            onChange={handleHeardAboutOpenChange}
                                            error={formik.touched.heardAboutOpen && Boolean(formik.errors.heardAboutOpen)}
                                            helperText={formik.touched.genderOpen && (<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required" role="alert">{formik.errors.heardAboutOpen}</p>)}
                                            variant="outlined"
                                            required
                                        />
                                    </div>
                                )}
                                <div className={classes.question}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                checked={formik.values.visible}
                                                color="primary"
                                                onChange={handleVisibleChange}
                                            />}
                                        label="Visible. Toggle off the visibility of a report to hide it from the map."
                                    />
                                </div>
                                <div className={classes.question}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formik.values.archived}
                                                color="primary"
                                                onChange={handleArchivedChange}
                                            />}
                                        label="Archived. Mark a report as archived so it is inaccessible through our API, but still editable with the admin UI. Archived reports are not visible on the map."
                                    />
                                </div>
                            </form>
                        </div>
                        <div className={classes.containerItem}>
                            <div className={classes.questionText}>
                                Click and drag the marker to change the report location.
                            </div>
                            <div className={classes.mapContainer}>
                                <AdminMap coords={formik.values.point} handleGometryChange={handleGeometryChange} reportType={ReportType.Amenity} />
                            </div>
                        </div>
                    </div>
                    <Divider className={classes.bottomDivider} variant="middle" />
                    <div className={classes.buttonBar}>
                        <EditButtonBar
                            cancelClick={handleCancelButtonClicked}
                            deleteClick={handleDeleteButtonClicked}
                            saveClick={handleSaveButtonClicked}
                        />
                    </div>
                </div>
            )}
            <ConfirmDeleteDialog handleConfirmNo={handleCancelDelete} handleConfirmYes={handleConfirmDelete} open={open} />
        </>
    );
};

export default AmenityDetail;