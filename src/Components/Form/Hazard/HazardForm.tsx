import React, { Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from "@mui/material/MenuItem";
import makeStyles from '@mui/styles/makeStyles';
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// Date/TimePicker imports
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enLocale from "date-fns/locale/en-US";

import { HazardFields } from "./HazardController";
import FormTitle from "../FormTitle";
import Colors from "../../../Colors";
import {
    HazardConcernSubtypes,
    HazardCrossingSubtypes,
    HazardSidewalkSubtypes,
    HazardType,
    HazardTypes,
    HazardWeatherSeasonalSubtypes
} from "../../../FormTypes";

interface HazardFormProps {
    formData: HazardFields;
    setFormData: Dispatch<SetStateAction<any>>,
    nextStep: () => void,
    prevStep: () => void;
    cancel: () => void,
}

const minInputHeight = 56;

const useStyles = makeStyles((theme) => ({
    buttonBar: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        textAlign: "right",
    },
    buttonBarButton: {
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
    cancelButton: {
        borderColor: Colors.contrastRed,
        color: Colors.contrastRed,
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
        '&:hover': {
            borderColor: Colors.contrastRed
        },
    },
    date: {
        marginTop: theme.spacing(1),
        minHeight: minInputHeight,
    },
    form: {
        marginTop: theme.spacing(3),
    },
    input: {
        marginTop: theme.spacing(1),
    },
    listItem: {
        marginLeft: theme.spacing(3),
    },
    listSubHeader: {
        color: theme.palette.primary.main,
        fontSize: 16,
        fontWeight: 600
    },
    menuItem: {
        minHeight: minInputHeight,
        '&.Mui-selected': {
            borderLeft: `6px solid ${Colors.contrast}`
        },
        whiteSpace: "normal",
    },
    option: {
        marginLeft: theme.spacing(1),
    },
    question: {
        marginTop: theme.spacing(4),
    },
    subMenuItem: {
        minHeight: minInputHeight,
        '&.Mui-selected': {
            borderLeft: `6px solid ${Colors.contrast}`
        }
    },
}));

const HazardForm = (props: HazardFormProps) => {
    const { cancel, formData, nextStep, prevStep, setFormData  } = { ...props };
    const { t } = useTranslation();
    const classes = useStyles();
    const validationSchema = Yup.object({
        date: Yup
            .date()
            .required(t("form-required")),
        description: Yup
            .string()
            .max(500, t("form-max-length-500"))
            .required(t("form-required")),
        hazardType: Yup
            .string()
            .required(t("form-required")),
        hazardSubtype: Yup
            .string()
            .required(t("form-required")),
        suggestedSolution: Yup
            .string()
            .max(300, t("form-max-length-300")),
    });

    const formik = useFormik({
        initialValues: { ...formData },
        onSubmit: (values) => {
            setFormData(values);
            nextStep();
        },
        validationSchema: validationSchema
    });
 
    const handleDateChange = (value: any) => {
        formik.setFieldValue("date", value);
    };

    const handleHazardSubtypeSelect = (event: any) => {
        // We never want an undefined value, so set to an empty string instead
        const value = event.target.value || "";
        if (value !== formik.values.hazardSubtype) {
            formik.setFieldValue("hazardSubtypeDetail", "" );
        }

        formik.setFieldValue("hazardSubtype", value);
    };

    const handleHazardTypeSelect = (event: any) => {
        if (event.target.value !== formik.values.hazardType) {
            formik.setFieldValue("hazardSubtype", "");
            formik.setFieldValue("hazardSubtypeDetail", "");
        }

        formik.setFieldValue("hazardType", event.target.value);
    };

    const handlePreviousClick = () => {
        setFormData(formData);
        prevStep();
    };

    const crossingCrosswalkNeeded = HazardCrossingSubtypes[0];
    const crossingVehicleConflicts = HazardCrossingSubtypes.slice(1,4);
    const crossingYieldIssue = HazardCrossingSubtypes[4];
    const crossingPedestrianIssues = HazardCrossingSubtypes.slice(5, 9);
    const crossingRemainder = HazardCrossingSubtypes.slice(9, 12);

    const sidewalkObstructions = HazardSidewalkSubtypes.slice(0, 11);
    const sidewalkRemainder = HazardSidewalkSubtypes.slice(11);

    return (
        <MuiPickersUtilsProvider locale={enLocale} utils={DateFnsUtils}>
            <FormTitle title="form_hazard-title" />
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <div className={classes.question}>
                    <label htmlFor="hazard-type">
                        <Typography>
                            {t("form_hazard-type-question")}
                        </Typography>
                    </label>
                    <TextField
                        autoFocus
                        className={classes.input}
                        fullWidth
                        id="hazard-type"
                        name="hazard-type"
                        select
                        value={formik.values.hazardType}
                        onChange={handleHazardTypeSelect}
                        error={formik.touched.hazardType && Boolean(formik.errors.hazardType)}
                        helperText={formik.touched.hazardType && (<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required" role="alert">{formik.errors.hazardType}</p>)}
                        variant="outlined"
                        required
                    >
                        {
                            HazardTypes.map((item) => {
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
                {formik.values.hazardType === HazardType.Sidewalk && (
                    <div className={classes.question}>
                        <label htmlFor="hazard-subtype-sidewalk">
                            <Typography>
                                {t("form_hazard-sidewalk-subtype-question")}
                            </Typography>
                        </label>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="hazard-subtype-sidewalk"
                            name="hazard-subtype-sidewalk"
                            select
                            value={formik.values.hazardSubtype}
                            onChange={handleHazardSubtypeSelect}
                            error={formik.touched.hazardSubtype && Boolean(formik.errors.hazardSubtype)}
                            helperText={formik.touched.hazardSubtype && (<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required" role="alert">{formik.errors.hazardSubtype}</p>)}
                            variant="outlined"
                            required
                        >
                            <ListSubheader className={classes.listSubHeader} disableSticky={true} key="sidewalk-obstruction-group">
                                {t("form_hazard-sidewalk-obstruction-group")}
                            </ListSubheader>
                            {
                                sidewalkObstructions.map((item) => {
                                    return (
                                        <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                            <Typography className={classes.listItem}>
                                                {t(item.value)}
                                            </Typography>
                                        </MenuItem>
                                    )
                                })
                            }
                            {
                                sidewalkRemainder.map((item) => {
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
                {formik.values.hazardType === HazardType.Crossing && (
                    <div className={classes.question}>
                        <label htmlFor="hazard-subtype-crossing">
                            <Typography>
                                {t("form_hazard-crossing-subtype-question")}
                            </Typography>
                        </label>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="hazard-subtype-crossing"
                            name="hazard-subtype-crossing"
                            select
                            value={formik.values.hazardSubtype}
                            onChange={handleHazardSubtypeSelect}
                            error={formik.touched.hazardSubtype && Boolean(formik.errors.hazardSubtype)}
                            helperText={formik.touched.hazardSubtype && (<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required" role="alert">{formik.errors.hazardSubtype}</p>)}
                            variant="outlined"
                            required
                        >
                            <MenuItem className={classes.menuItem} key={crossingCrosswalkNeeded.key} value={crossingCrosswalkNeeded.key}>
                                <Typography>
                                    {t(crossingCrosswalkNeeded.value)}
                                </Typography>
                            </MenuItem>
                            <ListSubheader className={classes.listSubHeader} disableSticky={true} key="vehicle-conflict-group">{t("form_hazard-vehicle-conflict-group")}</ListSubheader>
                            {crossingVehicleConflicts.map((item) => {
                                return (
                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                        <Typography className={classes.listItem}>
                                            {t(item.value)}
                                        </Typography>
                                    </MenuItem>
                                )
                            })}
                            <MenuItem className={classes.menuItem} key={crossingYieldIssue.key} value={crossingYieldIssue.key}>
                                <Typography>
                                    {t(crossingYieldIssue.value)}
                                </Typography>
                            </MenuItem>
                            <ListSubheader className={classes.listSubHeader} disableSticky={true} key="signal-issues-group">{t("form_hazard-signal-issues-group")}</ListSubheader>
                            {crossingPedestrianIssues.map((item) => {
                                return (
                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                        <Typography className={classes.listItem}>
                                            {t(item.value)}
                                        </Typography>
                                    </MenuItem>
                                )
                            })}
                            {crossingRemainder.map((item) => {
                                return (  
                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                        <Typography>
                                            {t(item.value)}
                                        </Typography>
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                )}
                {formik.values.hazardType === HazardType.WeatherSeasonal && (
                    <div className={classes.question}>
                        <label htmlFor="hazard-subtype-weather">
                            <Typography>
                                {t("form_hazard-weather-subtype-question")}
                            </Typography>
                        </label>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="hazard-subtype-weather"
                            name="hazard-subtype-weather"
                            select
                            value={formik.values.hazardSubtype}
                            onChange={handleHazardSubtypeSelect}
                            error={formik.touched.hazardSubtype && Boolean(formik.errors.hazardSubtype)}
                            helperText={formik.touched.hazardSubtype && (<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required" role="alert">{formik.errors.hazardSubtype}</p>)}
                            variant="outlined"
                            required
                        >
                            {
                                HazardWeatherSeasonalSubtypes.map((item) => {
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
                {formik.values.hazardType === HazardType.Concern && (
                    <div className={classes.question}>
                        <label htmlFor="hazard-subtype-concern">
                            <Typography>
                                {t("form_hazard-concern-subtype-question")}
                            </Typography>
                        </label>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="hazard-subtype-concern"
                            name="hazard-subtype-concern"
                            select
                            value={formik.values.hazardSubtype}
                            onChange={handleHazardSubtypeSelect}
                            error={formik.touched.hazardSubtype && Boolean(formik.errors.hazardSubtype)}
                            helperText={formik.touched.hazardSubtype && (<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required" role="alert">{formik.errors.hazardSubtype}</p>)}
                            variant="outlined"
                            required
                        >
                            {
                                HazardConcernSubtypes.map((item) => {
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
                <div className={classes.question}>
                    <label htmlFor="hazard-description">
                        <Typography>
                            {t("form_common-describe")}
                        </Typography>
                    </label>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="hazard-description"
                        name="hazard-description"
                        multiline
                        rows={5}
                        variant="outlined"
                        value={formik.values.description}
                        onChange={(event) => formik.setFieldValue("description", event.target.value)}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && (<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required" role="alert">{formik.errors.description}</p>)}
                        required
                    >
                    </TextField>
                </div>
                <div className={classes.question}>
                    <label htmlFor="hazard-suggested-solution">
                        <Typography>
                            {t("form_common-suggested-solution")}
                        </Typography>
                    </label>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="hazard-suggested-solution"
                        name="hazard-suggested-solution"
                        multiline
                        rows={5}
                        variant="outlined"
                        value={formik.values.suggestedSolution}
                        onChange={(event) => formik.setFieldValue("suggestedSolution", event.target.value)}
                        error={formik.touched.suggestedSolution && Boolean(formik.errors.suggestedSolution)}
                        helperText={formik.touched.suggestedSolution && (<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required" role="alert">{formik.errors.suggestedSolution}</p>)}
                    >
                    </TextField>
                </div>
                <div className={classes.question}>
                    <label htmlFor="hazard-date-picker">
                        <Typography>
                            {t("form_hazard-date")}
                        </Typography>
                    </label>
                    <KeyboardDateTimePicker
                        className={classes.date}
                        disableFuture
                        format="MM/dd/yyyy, hh:mm a"
                        fullWidth
                        id="hazard-date-picker"
                        inputVariant="outlined"
                        name="hazard-date-picker"
                        onChange={handleDateChange}
                        value={formik.values.date}
                        required
                    />
                </div>
                <div className={classes.buttonBar}>
                    <Button
                        className={classes.cancelButton}
                        color="secondary"
                        onClick={cancel}
                        variant="outlined">
                        {t("form_cancel")}
                    </Button>
                    <Button
                        className={classes.buttonBarButton}
                        color="primary"
                        onClick={handlePreviousClick}
                        variant="outlined">
                        {t("form_previous")}
                    </Button>
                    <Button
                        className={classes.buttonBarButton}
                        color="primary"
                        type="submit"
                        variant="contained">
                        {t("form_next")}
                    </Button>
                </div>
            </form>
        </MuiPickersUtilsProvider>
    );
}

export default HazardForm;