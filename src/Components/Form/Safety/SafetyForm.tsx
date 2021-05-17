import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// Date/TimePicker imports
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enLocale from "date-fns/locale/en-US";
import frLocale from "date-fns/locale/fr";

import { SafetyFields } from "./SafetyController";
import FormTitle from "../FormTitle";
import Colors from "../../../Colors";
import { ChoiceItem, SafetyType, SafetyOtherUsersSubtype, SafetyPersonalSafetySubtype, SafetyPoorAestheticsSubtype, SafetyVehicleTrafficSubtype } from "../../../FormTypes";

interface SafetyFormProps {
    formData: SafetyFields;
    setFormData: Dispatch<SetStateAction<SafetyFields>>,
    nextStep: () => void,
    prevStep: () => void;
    cancel: () => void,
}

const minInputHeight = 56;

const useStyles = makeStyles((theme) => ({
    safetyForm: {
        marginTop: theme.spacing(3),
    },
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
    input: {
        marginTop: theme.spacing(1),
    },
    menuItem: {
        minHeight: minInputHeight,
        '&.Mui-selected': {
            borderLeft: `6px solid ${Colors.contrast}`
        }
    },
    question: {
        marginTop: theme.spacing(4),
    },
}));

const SafetyForm = (props: SafetyFormProps) => {
    const { cancel, formData, nextStep, prevStep, setFormData  } = { ...props };
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        date: Yup
            .date()
            .required(t("form-required")),
        description: Yup
            .string()
            .max(500, t("form-max-length-500"))
            .required(t("form-required")),
        safetySubtype: Yup
            .string()
            .required(t("form-required")),
        safetyType: Yup
            .string()
            .required(t("form-required")),
    });

    const formik = useFormik({
        initialValues: { ...formData },
        onSubmit: (values) => {
            setFormData(values);
            nextStep();
        },
        validationSchema: validationSchema
    });
    const classes = useStyles();
    
    const safetyTypes: ChoiceItem[] = [
        { key: SafetyType.VehicleTraffic, value: t("form_safety-vehicle-traffic")},
        { key: SafetyType.PersonalSafety, value: t("form_safety-personal-safety")},
        { key: SafetyType.OtherUsers, value: t("form_safety-other-users")},
        { key: SafetyType.PoorAesthetics, value: t("form_safety-poor-aesthetics")},
    ];
    
    const safetyVehicleTrafficSubtypes: ChoiceItem[] = [
        { key: SafetyVehicleTrafficSubtype.Volume, value: t("form_safety-vehicle-traffic-volume")},
        { key: SafetyVehicleTrafficSubtype.Speed, value: t("form_safety-vehicle-traffic-speed")},
        { key: SafetyVehicleTrafficSubtype.Noise, value: t("form_safety-vehicle-traffic-noise")},
        { key: SafetyVehicleTrafficSubtype.Exhaust, value: t("form_safety-vehicle-traffic-exhaust")},
        { key: SafetyVehicleTrafficSubtype.Other, value: t("form_common-other")},
    ];

    const safetyPersonalSafetySubtypes: ChoiceItem[] = [
        { key: SafetyPersonalSafetySubtype.Harrassment, value: t("form_safety-personal-safety-harrassment")},
        { key: SafetyPersonalSafetySubtype.Gathering, value: t("form_safety-personal-safety-gathering")},
        { key: SafetyPersonalSafetySubtype.Lighting, value: t("form_safety-personal-safety-lighting")},
        { key: SafetyPersonalSafetySubtype.DeadEnds, value: t("form_safety-personal-safety-dead-ends")},
        { key: SafetyPersonalSafetySubtype.Other, value: t("form_common-other")},

    ];

    const safetyOtherUsersSubtypes: ChoiceItem[] = [
        { key: SafetyOtherUsersSubtype.Bicycles, value: t("form_safety-other-users-bicycle")},
        { key: SafetyOtherUsersSubtype.EScooters, value: t("form_safety-other-users-e-scooters")},
        { key: SafetyOtherUsersSubtype.Mobility, value: t("form_safety-other-users-mobility-scooters-electric-wheelchairs")},
        { key: SafetyOtherUsersSubtype.Dogs, value: t("form_safety-other-users-dogs")},
        { key: SafetyOtherUsersSubtype.OtherWheeled, value: t("form_safety-other-users-other-wheeled")},
        { key: SafetyOtherUsersSubtype.Other, value: t("form_common-other")},
    ];

    const safetyPoorAestheticsSubtypes: ChoiceItem[] = [
        { key: SafetyPoorAestheticsSubtype.Litter, value: t("form_safety-poor-aesthetics-litter")},
        { key: SafetyPoorAestheticsSubtype.Maintenance, value: t("form_safety-poor-aesthetics-unmaintained-infrastructure-vegetation")},
        { key: SafetyPoorAestheticsSubtype.BlankWall, value: t("form_safety-poor-aesthetics-blank-wall")},
        { key: SafetyPoorAestheticsSubtype.Other, value: t("form_common-other")},
    ];

    const handleDateChange = (value: any) => {
        formik.setFieldValue("date", value);
    };

    const handlePreviousClick = () => {
        setFormData(formData);
        prevStep();
    };

    const handleSafetySubtypeOpenChange = (event: any) => {
        formik.setFieldValue("safetySubtypeOpen", event.target.value);
    };

    const handleSafetySubtypeSelect = (event: any) => {
        if (event.target.value !== formik.values.safetySubtype) {
            formik.setFieldValue("safetySubtypeOpen", "");
        }

        formik.setFieldValue("safetySubtype", event.target.value); 
    };

    const handleSafetyTypeSelect = (event: any) => {
        if (event.target.value !== formik.values.safetyType) {
            formik.setFieldValue("safetySubtype", "");
            formik.setFieldValue("safetySubtypeOpen", "");
        }

        formik.setFieldValue("safetyType", event.target.value);
    };

    return (
        <MuiPickersUtilsProvider locale={enLocale} utils={DateFnsUtils}>
            <FormTitle title="form_safety" />
            <form className={classes.safetyForm} noValidate onSubmit={formik.handleSubmit}>
                <div className={classes.question}>
                    <Typography>
                        {t("form_safety-type-question")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="safety-type"
                        name="safety-type"
                        select
                        value={formik.values.safetyType}
                        onChange={handleSafetyTypeSelect}
                        error={formik.touched.safetyType && Boolean(formik.errors.safetyType)}
                        helperText={formik.touched.safetyType && formik.errors.safetyType}
                        variant="outlined"
                    >
                        {
                            safetyTypes.map((item) => {
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
                { formik.values.safetyType === SafetyType.VehicleTraffic && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_safety-vehicle-traffic-subtype-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="safety-vehicle-traffic-subtype"
                            name="safety-vehicle-traffic-subtype"
                            select
                            value={formik.values.safetySubtype}
                            onChange={handleSafetySubtypeSelect}
                            error={formik.touched.safetySubtype && Boolean(formik.errors.safetySubtype)}
                            helperText={formik.touched.safetySubtype && formik.errors.safetySubtype}
                            variant="outlined"
                        >
                            {
                                safetyVehicleTrafficSubtypes.map((item) => {
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
                { formik.values.safetyType === SafetyType.PersonalSafety && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_safety-personal-safety-subtype-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="safety-personal-safety-subtype"
                            name="safety-personal-safety-subtype"
                            select
                            value={formik.values.safetySubtype}
                            onChange={handleSafetySubtypeSelect}
                            error={formik.touched.safetySubtype && Boolean(formik.errors.safetySubtype)}
                            helperText={formik.touched.safetySubtype && formik.errors.safetySubtype}
                            variant="outlined"
                        >
                            {
                                safetyPersonalSafetySubtypes.map((item) => {
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
                { formik.values.safetyType === SafetyType.OtherUsers && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_safety-other-users-subtype-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="safety-other-users-subtype"
                            name="safety-other-users-subtype"
                            select
                            value={formik.values.safetySubtype}
                            onChange={handleSafetySubtypeSelect}
                            error={formik.touched.safetySubtype && Boolean(formik.errors.safetySubtype)}
                            helperText={formik.touched.safetySubtype && formik.errors.safetySubtype}
                            variant="outlined"
                        >
                            {
                                safetyOtherUsersSubtypes.map((item) => {
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
                { formik.values.safetyType === SafetyType.PoorAesthetics && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_safety-poor-aesthetics-subtype-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="safety-poor-aesthetics-subtype"
                            name="safety-poor-aesthetics-subtype"
                            select
                            value={formik.values.safetySubtype}
                            onChange={handleSafetySubtypeSelect}
                            error={formik.touched.safetySubtype && Boolean(formik.errors.safetySubtype)}
                            helperText={formik.touched.safetySubtype && formik.errors.safetySubtype}
                            variant="outlined"
                        >
                            {
                                safetyPoorAestheticsSubtypes.map((item) => {
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
                {/* { formik.values.safetyType === SafetyType.PoorAesthetics
                    && formik.values.safetySubtype === SafetyPoorAestheticsSubtype.Other
                    && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_safety-poor-aesthetics-question-other")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="safety-poor-aesthetics-other"
                            name="safety-poor-aesthetics-other"
                            value={formik.values.safetySubtypeOpen}
                            onChange={handleSafetySubtypeOpenChange}
                            error={formik.touched.safetySubtypeOpen && Boolean(formik.errors.safetySubtypeOpen)}
                            helperText={formik.touched.safetySubtypeOpen && formik.errors.safetySubtypeOpen}
                            variant="outlined"
                        />
                    </div>
                )} */}
                <div className={classes.question}>
                    <Typography>
                        {t("form_safety-describe")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="safety-description"
                        name="safety-description"
                        multiline
                        rows={8}
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
                        {t("form_safety-date")}
                    </Typography>
                    <KeyboardDatePicker
                        className={classes.date}
                        disableFuture
                        format="MM/dd/yyyy"
                        fullWidth
                        id="safety-date-picker"
                        inputVariant="outlined"
                        name="safety-date-picker"
                        onChange={handleDateChange}
                        value={formik.values.date}
                        variant="inline"
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
};

export default SafetyForm;