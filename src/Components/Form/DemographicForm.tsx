import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import NavigateNext from "@material-ui/icons/NavigateNext";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { AmenityFields } from "./Amenity/AmenityController";
import FormTitle from "./FormTitle";
import { HazardFields } from "./Hazard/HazardController";
import { IncidentFields } from "./Incident/IncidentController";
import Colors from "../../Colors";
import { ChoiceItem, Gender, Identity } from "../../FormTypes";

interface DemographicFormProps {
    formData: AmenityFields | HazardFields | IncidentFields;
    setFormData: Dispatch<SetStateAction<any>>;
    nextStep: () => void,
    prevStep: () => void,
    cancel: () => void,
}

interface NumberItem {
    key: number;
    value: number;
}

const minInputHeight = 56;

const useStyles = makeStyles((theme) => ({
    demographicForm: {
        marginTop: theme.spacing(1),
    },
    buttonBar: {
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
    demographicQuestion: {
        color: Colors.contrastBrightBlue,
        minHeight: "64px",
    },
    demographicReasonCollapse: {
        color: Colors.contrastBrightBlue,
    },
    demographicReasonDialog: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    icon: {
        color: Colors.contrastBrightBlue,
    },
    iconContainer: {
        minWidth: "0px",
    },
    input: {
        marginTop: theme.spacing(1),
    },
    label: {
        flexGrow: 1,
    },
    menuItem: {
        minHeight: minInputHeight,
        '&.Mui-selected': {
            borderLeft: `6px solid ${Colors.contrast}`
        },
        whiteSpace: "normal"
    },
    multiSelect: {
        minHeight: minInputHeight,
    },
    question: {
        marginTop: theme.spacing(4),
    },
}));

const DemographicForm = (props: DemographicFormProps) => {
    const { cancel, formData, nextStep, prevStep, setFormData  } = { ...props };
    const { t } = useTranslation();
    const theme = useTheme();
    const [demographicOpen, setDemographicOpen] = useState(false);
    const [identitySelectOpen, setIdentitySelectOpen] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const validationSchema = Yup.object({
        birthYear: Yup
            .number()
            .moreThan(-1, t("form-required"))
            .required(t("form-required")),
        gender: Yup
            .string()
            .max(50, t("form-max-length-30"))
            .required(t("form-required")),
        identity: Yup
            .array()
            .min(1, t("form-required"))
            .required(t("form-required")),
    });

    const formik = useFormik({
        initialValues: { ...formData },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setFormData(values);
            nextStep();
        }
    });
    const classes = useStyles();
    const birthYears = () => {
        const birthYears: NumberItem[] = [];
        for (let i = 2010; i > 1921; i--) {
            const item = { key: i, value: i };
            birthYears.push(item);
        }

        return birthYears;
    };

    const birthYearTypes: NumberItem[] = birthYears();

    const genderTypes: ChoiceItem[] = [
        { key: Gender.Male, value: t("form_demographic_gender-male") },
        { key: Gender.Female, value: t("form_demographic_gender-female") },
        { key: Gender.Other, value: t("form_common-other") },
        { key: Gender.NoResponse, value: t("form_demographic_gender-no-response") },
    ];
    const identityTypes: ChoiceItem[] = [
        { key: Identity.Black, value: t("form_demographic_identity_black") },
        { key: Identity.EastAsian, value: t("form_demographic_identity_east-asian") },
        { key: Identity.SoutheastAsian, value: t("form_demographic_identity_southeast-asian") },
        { key: Identity.Indigenous, value: t("form_demographic_identity_indigenous") },
        { key: Identity.Latino, value: t("form_demographic_identity_latino") },
        { key: Identity.MiddleEastern, value: t("form_demographic_identity_middle-eastern") },
        { key: Identity.SouthAsian, value: t("form_demographic_identity_south-asian") },
        { key: Identity.White, value: t("form_demographic_identity_white") },
        { key: Identity.Other, value: t("form_common-other") },
        { key: Identity.NoResponse, value: t("form_demographic_identity_no-response") },
    ];

    const handleBirthYearSelect = (event: any) => {
        formik.setFieldValue("birthYear", event.target.value);
    };

    const handleDemographicClose = () => {
        setDemographicOpen(false);
    };

    const handleDemographicReasonClick = () => {
        setDemographicOpen(true)
    };

    const handleGenderOpenChange = (event: any) => {
        formik.setFieldValue("genderOpen", event.target.value);
    };

    const handleGenderSelect = (event: any) => {
        formik.setFieldValue("gender", event.target.value);

        if (formik.values.genderOpen && formik.values.gender !== Gender.Other) {
            formik.setFieldValue("genderOpen", "");
        }
    };

    const handleIdentityCloseButton = (event: any) => {
        event.stopPropagation();
        setIdentitySelectOpen(false);
    };

    const handleIdentityClick = () => {
        if (!identitySelectOpen) {
            setIdentitySelectOpen(true);
        }
    };

    const handleIdentityOpenChange = (event: any) => {
        formik.setFieldValue("identityOpen", event.target.value);
    };

    const handleIdentitySelect = (event: any) => {
        const values = event.target.value as string[];

        // If the last value in the array is undefined, it means the OK button was
        // pressed and we need to remove this item from the array of values
        if (values.length && values[values.length - 1] === undefined) {
            values.splice(values.length - 1, 1)
        }

        if (formik.values.identity[0] === Identity.NoResponse && values.length > -1) {
            values.splice(0, values.length - 1);
        }

        if (values.includes(Identity.NoResponse)) {
            formik.setFieldValue("identity", [Identity.NoResponse]);
        } else {
            formik.setFieldValue("identity", event.target.value);
        }

        if (formik.values.identityOpen && formik.values.identity.includes(Identity.Other)) {
            formik.setFieldValue("identityOpen", "");
        }
    };

    const handlePreviousClick = () => {
        setFormData(formData);
        prevStep();
    };

    return (
        <>
            <FormTitle title="form_demographics" />
            <ListItem
                button
                className={classes.demographicQuestion}
                disableGutters={true}
                key="demographicQuestion"
                onClick={handleDemographicReasonClick}
            >
                <Typography className={classes.label}>
                    {t("form_demographic_why-demographic-info")}
                </Typography>
                <ListItemIcon className={classes.iconContainer}>
                    <NavigateNext className={classes.icon}/>
                </ListItemIcon>   
            </ListItem>
            <form className={classes.demographicForm} noValidate onSubmit={formik.handleSubmit}>
                <div>
                    <Typography>
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
                            genderTypes.map((item) => {
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
                { formik.values.gender === Gender.Other && (
                    <div className={classes.question}>
                    <Typography>
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
                    <Typography>
                        {t("form_demographic_identity-question")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="identity"
                        name="identity"
                        select
                        value={formik.values.identity}
                        onChange={handleIdentitySelect}
                        onClick={handleIdentityClick}
                        error={formik.touched.identity && Boolean(formik.errors.identity)}
                        helperText={formik.touched.identity && formik.errors.identity}
                        variant="outlined"
                        SelectProps={{
                            multiple: true,
                            open: identitySelectOpen,
                            renderValue: (selected) => {
                                const values = (selected as string[]).map((val: string) => {
                                    const identity = identityTypes.find(x => x.key === val);
                                    return identity ? identity.value : undefined;
                                });
                                return <div>{values.length === 1 ? values[0] : values.join(", ")}</div>
                            }
                        }}
                    >
                        {
                            identityTypes.map((item) => {
                                return (
                                    <MenuItem className={classes.multiSelect} key={item.key} value={item.key}>
                                        <Checkbox
                                            checked={formik.values.identity.indexOf(item.key) > -1}
                                            color="primary"
                                        />
                                        <Typography>
                                            {item.value}
                                        </Typography>
                                    </MenuItem>
                                )
                            })
                        }
                        <Button
                            className={classes.buttonBarButton}
                            color="primary"
                            onClick={handleIdentityCloseButton} 
                            variant="contained">
                                {t("form_common-ok")}
                        </Button>
                    </TextField>
                </div>
                { formik.values.identity.includes(Gender.Other) && (
                    <div className={classes.question}>
                    <Typography>
                        {t("form_demographic_identity-question-other")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="identity-self-description"
                        name="identity-self-description"
                        value={formik.values.identityOpen}
                        onChange={handleIdentityOpenChange}
                        error={formik.touched.identityOpen && Boolean(formik.errors.identityOpen)}
                        helperText={formik.touched.identityOpen && formik.errors.identityOpen}
                        variant="outlined"
                    />
                    </div>
                )}
                <div className={classes.question}>
                    <Typography>
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
            <Dialog
                aria-labelledby="demographic-reason-dialog-title"
                fullScreen={fullScreen}
                onClose={handleDemographicClose}
                open={demographicOpen}
                >
                <DialogTitle id="demographic-reason-dialog-title">
                    {t("form_demographic_why-demographic-info")}
                </DialogTitle>
                <DialogContent>
                    <Typography className={classes.demographicReasonDialog}>
                        {t("form_demographic-reason")}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="primary" onClick={handleDemographicClose}>
                        {t("form_common-close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DemographicForm;