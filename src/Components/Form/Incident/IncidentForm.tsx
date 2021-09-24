import React, { Dispatch, SetStateAction } from "react";
import Button from "@material-ui/core/Button";
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from "@material-ui/core/MenuItem";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// Date/TimePicker imports
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enLocale from "date-fns/locale/en-US";
import frLocale from "date-fns/locale/fr";

import FormTitle from "../FormTitle";
import { IncidentFields } from "./IncidentController";
import Colors from "../../../Colors";
import { ChoiceItem,
    IncidentFallSubtype,
    IncidentHitByOrNearmissSubtype,
    IncidentInjury,
    IncidentInjuryWitness,
    IncidentInvolvementType,
    IncidentType } from "../../../FormTypes";

interface IncidentFormProps {
    formData: IncidentFields;
    setFormData: Dispatch<SetStateAction<IncidentFields>>,
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
    question: {
        marginTop: theme.spacing(4),
    },
}));

const IncidentForm = (props: IncidentFormProps) => {
    const { cancel, formData, nextStep, prevStep, setFormData  } = { ...props };
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        injury: Yup
            .string()
            .required(t("form-required")),
        involvement: Yup
            .string()
            .required(t("form-required")),
        incidentSubtype: Yup
            .string()
            .required(t("form-required")),
        incidentType: Yup
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

    const incidentFallSubtypes: ChoiceItem[] = [
        { key: IncidentFallSubtype.Slip, value: t("form_incident-subtype-fall-slip")},
        { key: IncidentFallSubtype.Trip, value: t("form_incident-subtype-fall-trip")},  
        { key: IncidentFallSubtype.Other, value: t("form_incident-subtype-fall-other")},  
    ];

    const incidentHitByOrNearmissSubtypes: ChoiceItem[] = [
        { key: IncidentHitByOrNearmissSubtype.VehicleRightTurn, value: t("form_incident-subtype-vehicle-right")},
        { key: IncidentHitByOrNearmissSubtype.VehicleRightTurnRed, value: t("form_incident-subtype-vehicle-right-red")},  
        { key: IncidentHitByOrNearmissSubtype.VehicleLeftTurn, value: t("form_incident-subtype-vehicle-left")},  
        { key: IncidentHitByOrNearmissSubtype.VehicleHeadOn, value: t("form_incident-subtype-vehicle-head-on")},  
        { key: IncidentHitByOrNearmissSubtype.VehicleFromBehind, value: t("form_incident-subtype-vehicle-from-behind")},  
        { key: IncidentHitByOrNearmissSubtype.Cyclist, value: t("form_incident-subtype-cyclist")},  
        { key: IncidentHitByOrNearmissSubtype.Animal, value: t("form_incident-subtype-animal")},  
        { key: IncidentHitByOrNearmissSubtype.Other, value: t("form_incident-subtype-other")},  
    ];

    const incidentInjuryTypes: ChoiceItem[] = [
        { key: IncidentInjury.None, value: t("form_incident-injury-none")},
        { key: IncidentInjury.SelfTreatment, value: t("form_incident-injury-self-treatment")},
        { key: IncidentInjury.FamilyDoctor, value: t("form_incident-injury-family-doctor")},
        { key: IncidentInjury.SelfER, value: t("form_incident-injury-self-er")},
        { key: IncidentInjury.AmbulanceER, value: t("form_incident-injury-ambulance-er")},
        { key: IncidentInjury.Hospital, value: t("form_incident-injury-hospital")},
    ];

    const incidentInjuryWitnessTypes: ChoiceItem[] = [
        { key: IncidentInjuryWitness.None, value: t("form_incident-injury-witness-none")},
        { key: IncidentInjuryWitness.Minor, value: t("form_incident-injury-witness-minor")},
        { key: IncidentInjuryWitness.Ambulance, value: t("form_incident-injury-witness-ambulance")},
    ];

    const incidentInvolvementTypes: ChoiceItem[] = [
        { key: IncidentInvolvementType.Self, value: t("form_incident-involvement-self")},
        { key: IncidentInvolvementType.Care, value: t("form_incident-involvement-care")},
        { key: IncidentInvolvementType.Witness, value: t("form_incident-involvement-witness")},
    ];
    
    const incidentTypes: ChoiceItem[] = [
        { key: IncidentType.HitBy, value: t("form_incident-type-hit-by")},
        { key: IncidentType.NearMiss, value: t("form_incident-type-near-miss")},
        { key: IncidentType.Fall, value: t("form_incident-type-fall")},
    ];

    const handleDateChange = (value: any) => {
        formik.setFieldValue("date", value);
    };

    const handlePreviousClick = () => {
        setFormData(formData);
        prevStep();
    };

    const handleIncidentSubtypeSelect = (event: any) => {
        // We never want an undefined value, so set to an empty string instead
        const value = event.target.value || "";
        if (value !== formik.values.involvement) {
            // TODO: Reset other fields when selection changes
        }

        formik.setFieldValue("incidentSubtype", value); 
    };

    const handleIncidentInvolvementSelect = (event: any) => {
        if (event.target.value !== formik.values.involvement) {
            formik.setFieldValue("injury", "");
        }

        formik.setFieldValue("involvement", event.target.value);
    };

    const handleIncidentTypeSelect = (event: any) => {
        if (event.target.value !== formik.values.incidentType) {
            formik.setFieldValue("incidentSubtype", "");
            formik.setFieldValue("incidentSubtypeOpen", "");
        }

        formik.setFieldValue("incidentType", event.target.value);
    };

    const handlehandleInjurySelect = (event: any) => {
        if (event.target.value !== formik.values.injury) {
            // TODO: Reset other fields when selection changes
        }

        formik.setFieldValue("injury", event.target.value);
    };

    const renderHitByOrNearmissSubtypes = () => {
        const items = [];

        items.push(<ListSubheader className={classes.listSubHeader} disableSticky={true} key="vehicle-group">{t("form_incident-vehicle")}</ListSubheader>);

        for (let i = 0; i < incidentHitByOrNearmissSubtypes.length; i++ ) {
            // eslint-disable-next-line
            // @ts-ignore
            items.push(
                <MenuItem className={classes.menuItem} key={incidentHitByOrNearmissSubtypes[i].key} value={incidentHitByOrNearmissSubtypes[i].key}>
                <Typography className={i < 5 ? classes.listItem : undefined}>
                    {incidentHitByOrNearmissSubtypes[i].value}
                </Typography>
            </MenuItem>
            );
        }

        return items;
    };

    return (
        <MuiPickersUtilsProvider locale={enLocale} utils={DateFnsUtils}>
            <FormTitle title="form_incident-details" />
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <div className={classes.question}>
                    <Typography>
                        {t("form_incident-type-question")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="incident-type"
                        name="incident-type"
                        select
                        value={formik.values.incidentType}
                        onChange={handleIncidentTypeSelect}
                        error={formik.touched.incidentType && Boolean(formik.errors.incidentType)}
                        helperText={formik.touched.incidentType && formik.errors.incidentType}
                        variant="outlined"
                    >
                        {
                            incidentTypes.map((item) => {
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
                { (formik.values.incidentType === IncidentType.HitBy || formik.values.incidentType === IncidentType.NearMiss) && (
                    <div className={classes.question}>
                        { formik.values.incidentType === IncidentType.HitBy && (
                            <Typography>
                                {t("form_incident-hit-by-question")}
                            </Typography>
                        )}
                        { formik.values.incidentType === IncidentType.NearMiss && (
                            <Typography>
                                {t("form_incident-near-miss-question")}
                            </Typography>
                        )}
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="incident-hit-by-or-near-miss-subtype"
                            name="incident-hit-by-or-near-miss-subtype"
                            select
                            value={formik.values.incidentSubtype}
                            onChange={handleIncidentSubtypeSelect}
                            error={formik.touched.incidentSubtype && Boolean(formik.errors.incidentSubtype)}
                            helperText={formik.touched.incidentSubtype && formik.errors.incidentSubtype}
                            variant="outlined"
                        >
                            {
                                renderHitByOrNearmissSubtypes()
                            }
                        </TextField>
                    </div>
                )}
                { formik.values.incidentType === IncidentType.Fall && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_incident-fall-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="incident-fall-type"
                            name="incident-fall-type"
                            select
                            value={formik.values.incidentSubtype}
                            onChange={handleIncidentSubtypeSelect}
                            error={formik.touched.incidentSubtype && Boolean(formik.errors.incidentSubtype)}
                            helperText={formik.touched.incidentSubtype && formik.errors.incidentSubtype}
                            variant="outlined"
                        >
                            {
                                incidentFallSubtypes.map((item) => {
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
                        {t("form_incident-involvement-question")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="incident-involvement"
                        name="incident-involvement"
                        select
                        value={formik.values.involvement}
                        onChange={handleIncidentInvolvementSelect}
                        error={formik.touched.involvement && Boolean(formik.errors.involvement)}
                        helperText={formik.touched.involvement && formik.errors.involvement}
                        variant="outlined"
                    >
                        {
                            incidentInvolvementTypes.map((item) => {
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
                { formik.values.involvement && formik.values.involvement !== IncidentInvolvementType.Witness && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_incident-injury-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="incident-injury-severity"
                            name="incident-injury-severity"
                            select
                            value={formik.values.injury}
                            onChange={handlehandleInjurySelect}
                            error={formik.touched.injury && Boolean(formik.errors.injury)}
                            helperText={formik.touched.injury && formik.errors.injury}
                            variant="outlined"
                        >
                            {
                                incidentInjuryTypes.map((item) => {
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
                { formik.values.involvement === IncidentInvolvementType.Witness && (
                    <div className={classes.question}>
                        <Typography>
                            {t("form_incident-injury-witness-question")}
                        </Typography>
                        <TextField
                            className={classes.input}
                            fullWidth
                            id="incident-injury-witness-severity"
                            name="incident-injury-witness-severity"
                            select
                            value={formik.values.injury}
                            onChange={handlehandleInjurySelect}
                            error={formik.touched.injury && Boolean(formik.errors.injury)}
                            helperText={formik.touched.injury && formik.errors.injury}
                            variant="outlined"
                        >
                            {
                                incidentInjuryWitnessTypes.map((item) => {
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
                        {t("form_incident-date")}
                    </Typography>
                    <KeyboardDateTimePicker
                        className={classes.date}
                        disableFuture
                        format="MM/dd/yyyy, hh:mm a"
                        fullWidth
                        id="incident-date-picker"
                        inputVariant="outlined"
                        name="incident-date-picker"
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
};

export default IncidentForm;