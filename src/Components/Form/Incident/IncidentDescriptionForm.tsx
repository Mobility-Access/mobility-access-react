import React, { Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import makeStyles from '@mui/styles/makeStyles';
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// Date/TimePicker imports
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enLocale from "date-fns/locale/en-US";

import FormTitle from "../FormTitle";
import { IncidentFields } from "./IncidentController";
import Colors from "../../../Colors";

interface IncidentDescriptionFormProps {
    formData: IncidentFields;
    setFormData: Dispatch<SetStateAction<IncidentFields>>,
    nextStep: () => void,
    prevStep: () => void;
    cancel: () => void,
}

const minInputHeight = 56;

const useStyles = makeStyles((theme) => ({
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
    question: {
        marginTop: theme.spacing(4),
    },
}));

const IncidentDescriptionForm = (props: IncidentDescriptionFormProps) => {
    const { cancel, formData, nextStep, prevStep, setFormData  } = { ...props };
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        incidentSubtype: Yup
            .string()
            .required(t("form-required")),
        incidentType: Yup
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
            .max(300, t("form-max-length-300"))
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

    const handlePreviousClick = () => {
        setFormData(formData);
        prevStep();
    };

    return (
        <MuiPickersUtilsProvider locale={enLocale} utils={DateFnsUtils}>
            <FormTitle title="form_incident-description" />
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <div className={classes.question}>
                    <label htmlFor="incident-description">
                        <Typography>
                            {t("form_incident-describe")}
                        </Typography>
                    </label>
                    <TextField
                        autoFocus
                        className={classes.input}
                        fullWidth
                        id="incident-description"
                        name="incident-description"
                        multiline
                        rows={8}
                        variant="outlined"
                        value={formik.values.description}
                        onChange={(event) => formik.setFieldValue("description", event.target.value)}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && (<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required" role="alert">{formik.errors.description}</p>)}
                        required
                    >
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
        </MuiPickersUtilsProvider>
    );
};

export default IncidentDescriptionForm;