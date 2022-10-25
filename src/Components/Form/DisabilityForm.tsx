import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { AmenityFields } from "./Amenity/AmenityController";
import FormTitle from "./FormTitle";
import { HazardFields } from "./Hazard/HazardController";
import { IncidentFields } from "./Incident/IncidentController";
import TermsAndConditions from "./TermsAndConditions";
import Colors from "../../Colors";
import { ChoiceItem, Disability, DisabilityType, Mobility, MobilityAid } from "../../FormTypes";

interface DisabilityFormProps {
    formData: AmenityFields | HazardFields | IncidentFields;
    setFormData: Dispatch<SetStateAction<any>>;
    nextStep: () => void,
    prevStep: () => void,
    cancel: () => void,
    submit: (data: any) => void,
}

const minInputHeight = 56;

const useStyles = makeStyles((theme) => ({
    disabilityForm: {
        marginTop: theme.spacing(2),
    },
    buttonBar: {
        marginTop: theme.spacing(0),
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
    error: {
        marginTop: theme.spacing(1),
    },
    input: {
        marginTop: theme.spacing(1),
    },
    link: {
        color: Colors.contrastBrightBlue,
        cursor: "pointer",
        textDecoration: "underline",
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
    termsAndConditions: {
        display: "flex",
        flexDirection: "row",
        marginTop: theme.spacing(2),
    },
    termsAndConditionsButton: {
        color: Colors.contrastBrightBlue,
    },
    termsAndConditionsButtonLabel: {
        textAlign: "start",
    },
    termsAndConditionsMenuItem: {
        color: Colors.contrastBrightBlue,
        marginTop: theme.spacing(0),
    }
}));

const DisabilityForm = (props: DisabilityFormProps) => {
    const { cancel, formData, prevStep, submit, setFormData  } = { ...props };
    const { t } = useTranslation();
    const [accept, setAccept] = useState(false);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    const validationSchema = Yup.object({
        disability: Yup
            .string()
            .required(t("form-required")),
    });

    const formik = useFormik({
        initialValues: { ...formData },
        onSubmit: (values) => {
            setFormData(values);
            submit(values);
        },
        validationSchema: validationSchema,
    });
    const classes = useStyles();
    const disabilityTypes: ChoiceItem[] = [
        { key: Disability.Yes, value: t("form_demographic_disability_yes") },
        { key: Disability.No, value: t("form_demographic_disability_no") },
        { key: Disability.NoResponse, value: t("form_demographic_disability_no-response") },
    ];
    const disabilityTypeTypes: ChoiceItem[] = [
        { key: DisabilityType.Visual, value: t("form_demographic_disability_type_visual") },
        { key: DisabilityType.Hearing, value: t("form_demographic_disability_type_hearing") },
        { key: DisabilityType.Mobility, value: t("form_demographic_disability_type_mobility") },
        { key: DisabilityType.Cognitive, value: t("form_demographic_disability_type_cognitive") },
        { key: DisabilityType.Other, value: t("form_common-other") },
        { key: DisabilityType.NoResponse, value: t("form_demographic_disability_no-response") },
    ];
    const mobilityTypes: ChoiceItem[] = [
        { key: Mobility.Yes, value: t("form_demographic_mobility-yes") },
        { key: Mobility.No, value: t("form_demographic_mobility-no") },
        { key: Mobility.NoResponse, value: t("form_demographic_mobility-no-response") },
    ];
    const mobilityAidTypes: ChoiceItem[] = [
        { key: MobilityAid.WheelChair, value: t("form_demographic_mobility_aid-wheelchair") },
        { key: MobilityAid.Powered, value: t("form_demographic_mobility_aid-powered") },
        { key: MobilityAid.Walker, value: t("form_demographic_mobility_aid-walker") },
        { key: MobilityAid.Cane, value: t("form_demographic_mobility_aid-cane") },
        { key: MobilityAid.Crutches, value: t("form_demographic_mobility_aid-crutches") },
        { key: MobilityAid.ServiceDog, value: t("form_demographic_mobility_aid-service-dog") },
        { key: MobilityAid.Other, value: t("form_common-other") },
    ];

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

    const handlePreviousClick = (event: any) => {
        setFormData(formik.values);
        prevStep();
    };

    const handleSubmit = () => {
        if (!accept) {
            setError(true);
            return;
        }
        // formik.handleSubmit();
        setFormData(formik.values);
        submit(formik.values);
    }

    // ****** Terms and conditions
    const handleAcceptTermsAndConditions = () => {
        setAccept(true);
        setOpen(false);
    };

    const handleDeclineTermsAndConditions = () => {
        setAccept(false);
        setOpen(false);
    };

    const handleTermsAndConditions = () => {
        setAccept(!accept);
    };

    const handleTermsAndConditionsOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <FormTitle title="form_disability_title" />
            <form className={classes.disabilityForm} noValidate>
                <div className={classes.question}>
                    <Typography>
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
                            disabilityTypes.map((item) => {
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
                { formik.values.disability === Disability.Yes && (
                    <div className={classes.question}>
                        <Typography>
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
                                disabilityTypeTypes.map((item) => {
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
                { formik.values.disabilityType === DisabilityType.Other && (
                    <div className={classes.question}>
                        <Typography>
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
                        <Typography>
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
                                mobilityTypes.map((item) => {
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
                { formik.values.mobilityAid === Mobility.Yes && (
                    <div className={classes.question}>
                        <Typography>
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
                                mobilityAidTypes.map((item) => {
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
                { formik.values.mobilityAidType === MobilityAid.Other && (
                    <div className={classes.question}>
                        <Typography>
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
                <div className={classes.termsAndConditions}>
                    <Checkbox checked={accept} color="primary" onChange={handleTermsAndConditions} />                          
                    <Typography>
                        {t("form_disability-terms-and-conditions-start")}<Link className={classes.link} onClick={handleTermsAndConditionsOpen}>{t("form_disability-terms-and-conditions-end")}</Link>
                    </Typography>
                </div>
                {
                    error && !accept && (
                        <Typography className={classes.error} color="error">
                            {t("form_demographic-required")}
                        </Typography>
                    )
                }
                <div className={classes.buttonBar}>
                    <Button
                        className={classes.cancelButton}
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
                        onClick={handleSubmit}
                        variant="contained">
                        {t("form_submit")}
                    </Button>
                </div>
            </form>
            <TermsAndConditions
                location={formData.point}
                onAccept={handleAcceptTermsAndConditions}
                onDecline={handleDeclineTermsAndConditions}
                open={open}
            />
        </>
    );
};

export default DisabilityForm;