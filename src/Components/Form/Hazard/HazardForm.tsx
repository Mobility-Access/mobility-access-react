import React, { Dispatch, SetStateAction } from "react";
import Button from "@material-ui/core/Button";
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// Date/TimePicker imports
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enLocale from "date-fns/locale/en-US";
import frLocale from "date-fns/locale/fr";

import { HazardFields } from "./HazardController";
import FormTitle from "../FormTitle";
import Colors from "../../../Colors";
import {
    ChoiceItem,
    HazardConcernSubtype,
    HazardCrossingSubtype,
    HazardSidewalkSubtype,
    HazardType,
    HazardWeatherSeasonalSubtype
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

    const hazardConcernSubtypes: ChoiceItem[] = [
        { key: HazardConcernSubtype.VehicleNumber, value: t("form_hazard-concern-subtype-vehicle-numbers") },
        { key: HazardConcernSubtype.VehicleSpeed, value: t("form_hazard-concern-subtype-vehicle-speed") },
        { key: HazardConcernSubtype.Bicycles, value: t("form_hazard-concern-subtype-bicycles") },
        { key: HazardConcernSubtype.EScooters, value: t("form_hazard-concern-subtype-escooters") },
        { key: HazardConcernSubtype.OtherWheels, value: t("form_hazard-concern-subtype-other-wheels") },
        { key: HazardConcernSubtype.MobilityWheeled, value: t("form_hazard-concern-subtype-mobility-wheeled") },
        { key: HazardConcernSubtype.Dogs, value: t("form_hazard-concern-subtype-dogs") },
        { key: HazardConcernSubtype.Lighting, value: t("form_hazard-concern-subtype-lighting") },
        { key: HazardConcernSubtype.Isloated, value: t("form_hazard-concern-subtype-isolated") },
        { key: HazardConcernSubtype.Harassment, value: t("form_hazard-concern-subtype-harassment") },
        { key: HazardConcernSubtype.People, value: t("form_hazard-concern-subtype-people") },
        { key: HazardConcernSubtype.Other, value: t("form_common-other") },
    ];

    const hazardCrossingSubtypes: ChoiceItem[] = [
        { key: HazardCrossingSubtype.Crosswalk, value: t("form_hazard-crossing-subtype-crosswalk") },
        { key: HazardCrossingSubtype.VehicleConflictRight, value: t("form_hazard-crossing-subtype-vehicle-right") },
        { key: HazardCrossingSubtype.VehicleConflictRightRed, value: t("form_hazard-crossing-subtype-vehicle-right-red") },
        { key: HazardCrossingSubtype.VehicleConflictLeft, value: t("form_hazard-crossing-subtype-vehicle-left") },
        { key: HazardCrossingSubtype.FailureToYield, value: t("form_hazard-crossing-subtype-yield") },
        { key: HazardCrossingSubtype.SignalShort, value: t("form_hazard-crossing-subtype-signal-short") },
        { key: HazardCrossingSubtype.SignalNotAudible, value: t("form_hazard-crossing-subtype-signal-audible") },
        { key: HazardCrossingSubtype.SignalButton, value: t("form_hazard-crossing-subtype-signal-button") },
        { key: HazardCrossingSubtype.SignalWait, value: t("form_hazard-crossing-subtype-signal-wait") },
        { key: HazardCrossingSubtype.Visibliity, value: t("form_hazard-crossing-subtype-visibility") },
        { key: HazardCrossingSubtype.Markings, value: t("form_hazard-crossing-subtype-markings") },
        { key: HazardCrossingSubtype.Other, value: t("form_common-other") },
    ];

    const hazardSidewalkSubtypes: ChoiceItem[] = [
        { key: HazardSidewalkSubtype.Bollard, value: t("form_hazard-sidewalk-subtype-bollard") },
        { key: HazardSidewalkSubtype.Pole, value: t("form_hazard-sidewalk-subtype-pole") },
        { key: HazardSidewalkSubtype.Uneven, value: t("form_hazard-sidewalk-subtype-uneven") },
        { key: HazardSidewalkSubtype.Mailbox, value: t("form_hazard-sidewalk-subtype-mailbox") },
        { key: HazardSidewalkSubtype.BikeRack, value: t("form_hazard-sidewalk-subtype-bike-rack") },
        { key: HazardSidewalkSubtype.BusShelter, value: t("form_hazard-sidewalk-subtype-bus-shelter") },
        { key: HazardSidewalkSubtype.Vegetation, value: t("form_hazard-sidewalk-subtype-vegetation") },
        { key: HazardSidewalkSubtype.Sign, value: t("form_hazard-sidewalk-subtype-sign") },
        { key: HazardSidewalkSubtype.ParkedBike, value: t("form_hazard-sidewalk-subtype-parked-bike") },
        { key: HazardSidewalkSubtype.Bins, value: t("form_hazard-sidewalk-subtype-bins") },
        { key: HazardSidewalkSubtype.ParkedVehicles, value: t("form_hazard-sidewalk-subtype-parked-vehicles") },
        { key: HazardSidewalkSubtype.Construction, value: t("form_hazard-sidewalk-subtype-construction") },
        { key: HazardSidewalkSubtype.MissingCurbCut, value: t("form_hazard-sidewalk-subtype-missing-curb-cut") },
        { key: HazardSidewalkSubtype.Narrow, value: t("form_hazard-sidewalk-subtype-narrow") },
        { key: HazardSidewalkSubtype.Surface, value: t("form_hazard-sidewalk-subtype-surface") },
        { key: HazardSidewalkSubtype.Slope, value: t("form_hazard-sidewalk-subtype-slope") },
        { key: HazardSidewalkSubtype.Other, value: t("form_common-other") },
    ];

    const hazardTypes: ChoiceItem[] = [
        { key: HazardType.Sidewalk, value: t("form_hazard-type-sidewalk-infrastructure") },
        { key: HazardType.Crossing, value: t("form_hazard-type-crossing") },
        { key: HazardType.WeatherSeasonal, value: t("form_hazard-type-weather-seasonal") },
        { key: HazardType.Concern, value: t("form_hazard-type-concern") },
    ];

    const hazardWeatherSeasonalSubtypes: ChoiceItem[] = [
        { key: HazardWeatherSeasonalSubtype.Snow, value: t("form_hazard-weather-subtype-snow") },
        { key: HazardWeatherSeasonalSubtype.Ice, value: t("form_hazard-weather-subtype-ice") },
        { key: HazardWeatherSeasonalSubtype.Water, value: t("form_hazard-weather-subtype-water") },
        { key: HazardWeatherSeasonalSubtype.Leaves, value: t("form_hazard-weather-subtype-leaves") },
        { key: HazardWeatherSeasonalSubtype.Other, value: t("form_common-other") },
    ];
 
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

    const crossingCrosswalkNeeded = hazardCrossingSubtypes[0];
    const crossingVehicleConflicts = hazardCrossingSubtypes.slice(1,4);
    const crossingYieldIssue = hazardCrossingSubtypes[4];
    const crossingPedestrianIssues = hazardCrossingSubtypes.slice(5, 9);
    const crossingRemainder = hazardCrossingSubtypes.slice(9, 12);

    const sidewalkObstructions = hazardSidewalkSubtypes.slice(0, 11);
    const sidewalkRemainder = hazardSidewalkSubtypes.slice(11);

    return (
        <MuiPickersUtilsProvider locale={enLocale} utils={DateFnsUtils}>
            <FormTitle title="form_hazard-title" />
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <div className={classes.question}>
                    <Typography>
                        {t("form_hazard-type-question")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="hazard-type"
                        name="hazard-type"
                        select
                        value={formik.values.hazardType}
                        onChange={handleHazardTypeSelect}
                        error={formik.touched.hazardType && Boolean(formik.errors.hazardType)}
                        helperText={formik.touched.hazardType && formik.errors.hazardType}
                        variant="outlined"
                    >
                        {
                            hazardTypes.map((item) => {
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
                {formik.values.hazardType === HazardType.Sidewalk && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_hazard-sidewalk-subtype-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="hazard-subtype-sidewalk"
                            name="hazard-subtype-sidewalk"
                            select
                            value={formik.values.hazardSubtype}
                            onChange={handleHazardSubtypeSelect}
                            error={formik.touched.hazardSubtype && Boolean(formik.errors.hazardSubtype)}
                            helperText={formik.touched.hazardSubtype && formik.errors.hazardSubtype}
                            variant="outlined"
                        >
                            <ListSubheader className={classes.listSubHeader} disableSticky={true} key="sidewalk-obstruction-group">
                                {t("form_hazard-sidewalk-obstruction-group")}
                            </ListSubheader>
                            {
                                sidewalkObstructions.map((item) => {
                                    return (
                                        <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                            <Typography className={classes.listItem}>
                                                {item.value}
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
                                                {item.value}
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
                        <Typography>
                            {t("form_hazard-crossing-subtype-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="hazard-subtype-crossing"
                            name="hazard-subtype-crossing"
                            select
                            value={formik.values.hazardSubtype}
                            onChange={handleHazardSubtypeSelect}
                            error={formik.touched.hazardSubtype && Boolean(formik.errors.hazardSubtype)}
                            helperText={formik.touched.hazardSubtype && formik.errors.hazardSubtype}
                            variant="outlined"
                        >
                            <MenuItem className={classes.menuItem} key={crossingCrosswalkNeeded.key} value={crossingCrosswalkNeeded.key}>
                                <Typography>
                                    {crossingCrosswalkNeeded.value}
                                </Typography>
                            </MenuItem>
                            <ListSubheader className={classes.listSubHeader} disableSticky={true} key="vehicle-conflict-group">{t("form_hazard-vehicle-conflict-group")}</ListSubheader>
                            {crossingVehicleConflicts.map((item) => {
                                return (
                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                        <Typography className={classes.listItem}>
                                            {item.value}
                                        </Typography>
                                    </MenuItem>
                                )
                            })}
                            <MenuItem className={classes.menuItem} key={crossingYieldIssue.key} value={crossingYieldIssue.key}>
                                <Typography>
                                    {crossingYieldIssue.value}
                                </Typography>
                            </MenuItem>
                            <ListSubheader className={classes.listSubHeader} disableSticky={true} key="signal-issues-group">{t("form_hazard-signal-issues-group")}</ListSubheader>
                            {crossingPedestrianIssues.map((item) => {
                                return (
                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                        <Typography className={classes.listItem}>
                                            {item.value}
                                        </Typography>
                                    </MenuItem>
                                )
                            })}
                            {crossingRemainder.map((item) => {
                                return (  
                                    <MenuItem className={classes.menuItem} key={item.key} value={item.key}>
                                        <Typography>
                                            {item.value}
                                        </Typography>
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                )}
                {formik.values.hazardType === HazardType.WeatherSeasonal && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_hazard-weather-subtype-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="hazard-subtype-weather"
                            name="hazard-subtype-weather"
                            select
                            value={formik.values.hazardSubtype}
                            onChange={handleHazardSubtypeSelect}
                            error={formik.touched.hazardSubtype && Boolean(formik.errors.hazardSubtype)}
                            helperText={formik.touched.hazardSubtype && formik.errors.hazardSubtype}
                            variant="outlined"
                        >
                            {
                                hazardWeatherSeasonalSubtypes.map((item) => {
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
                )}
                {formik.values.hazardType === HazardType.Concern && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_hazard-concern-subtype-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="hazard-subtype-concern"
                            name="hazard-subtype-concern"
                            select
                            value={formik.values.hazardSubtype}
                            onChange={handleHazardSubtypeSelect}
                            error={formik.touched.hazardSubtype && Boolean(formik.errors.hazardSubtype)}
                            helperText={formik.touched.hazardSubtype && formik.errors.hazardSubtype}
                            variant="outlined"
                        >
                            {
                                hazardConcernSubtypes.map((item) => {
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
                )}
                <div className={classes.question}>
                    <Typography>
                        {t("form_common-describe")}
                    </Typography>
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
                        helperText={formik.touched.description && formik.errors.description}
                    >
                    </TextField>
                </div>
                <div className={classes.question}>
                    <Typography>
                        {t("form_common-suggested-solution")}
                    </Typography>
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
                        helperText={formik.touched.suggestedSolution && formik.errors.suggestedSolution}
                    >
                    </TextField>
                </div>
                <div className={classes.question}>
                    <Typography>
                        {t("form_hazard-date")}
                    </Typography>
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