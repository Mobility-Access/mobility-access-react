import React, { Dispatch, SetStateAction } from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { AmenityFields } from "./Amenity/AmenityController";
import FormTitle from "./FormTitle";
import { IncidentFields } from "./Incident/IncidentController";
import { MicroBarrierFields } from "./MicroBarrier/MicroBarrierController";
import { SafetyFields } from "./Safety/SafetyController";
import Colors from "../../Colors";
import { ChoiceItem, Gender, Identity } from "../../FormTypes";
import Checkbox from "@material-ui/core/Checkbox";

interface DemographicFormProps {
    formData: AmenityFields | IncidentFields | MicroBarrierFields | SafetyFields;
    setFormData: Dispatch<SetStateAction<any>>;
    nextStep: () => void,
    prevStep: () => void,
    cancel: () => void,
    submit: (data: any) => void,
}

interface NumberItem {
    key: number;
    value: number;
}

const minInputHeight = 56;

const useStyles = makeStyles((theme) => ({
    demographicForm: {
        marginTop: theme.spacing(3),
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
    input: {
        marginTop: theme.spacing(1),
    },
    menuItem: {
        minHeight: minInputHeight,
        '&.Mui-selected': {
            borderLeft: `6px solid ${Colors.contrast}`
        }
    },
    multiSelect: {
        minHeight: minInputHeight,
    },
    question: {
        marginTop: theme.spacing(4),
    },
}));

const DemographicForm = (props: DemographicFormProps) => {
    const { cancel, formData, nextStep, prevStep, submit, setFormData  } = { ...props };
    const { t } = useTranslation();
    const validationSchema = Yup.object({
        age: Yup
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
    const ages = () => {
        const ages: NumberItem[] = [];
        for (let i = 2010; i > 1921; i--) {
            const item = { key: i, value: i };
            ages.push(item);
        }

        return ages;
    };

    const ageTypes: NumberItem[] = ages();

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

    const handleAgeSelect = (event: any) => {
        formik.setFieldValue("age", event.target.value);
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

    const handleIdentityOpenChange = (event: any) => {
        formik.setFieldValue("identityOpen", event.target.value);
    };

    const handleIdentitySelect = (event: any) => {
        const values = event.target.value as string[];

        if (formik.values.identity[0] === Identity.NoResponse && values.length > -1) {
            values.splice(0, values.length-1);
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
            <form className={classes.demographicForm} noValidate onSubmit={formik.handleSubmit}>
                <div className={classes.question}>
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
                        error={formik.touched.identity && Boolean(formik.errors.identity)}
                        helperText={formik.touched.identity && formik.errors.identity}
                        variant="outlined"
                        SelectProps={{
                            multiple: true,
                            // renderValue: selected => { return <div>horse</div>}
                            renderValue: (selected) => {
                                const values = (selected as string[]).map((val: string) => {
                                    const identity = identityTypes.find(x => x.key === val);
                                    return identity ? identity.value : undefined;
                                });
                                return <div>{values.join(", ")}</div>
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
                        {t("form_demographic-age")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="age-group"
                        name="age-group"
                        select
                        value={formik.values.age}
                        onChange={handleAgeSelect}
                        error={formik.touched.age && Boolean(formik.errors.age)}
                        helperText={formik.touched.age && formik.errors.age}
                        variant="outlined"
                    >
                        {
                            ageTypes.map((item) => {
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
        </>
    );
};

export default DemographicForm;