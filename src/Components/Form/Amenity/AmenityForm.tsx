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

import { AmenityFields } from "./AmenityController";
import FormTitle from "../FormTitle";
import Colors from "../../../Colors";
import { Amenity, ChoiceItem } from "../../../FormTypes";

interface AmenityProps {
    formData: AmenityFields;
    setFormData: Dispatch<SetStateAction<AmenityFields>>,
    nextStep: () => void,
    prevStep: () => void;
    cancel: () => void,
}

const minInputHeight = 56;

const useStyles = makeStyles((theme) => ({
    amenityForm: {
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
        }
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

const AmenityForm = (props: AmenityProps) => {
    const { cancel, formData, nextStep, prevStep, setFormData  } = { ...props };
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        amenity: Yup
            .string()
            .required(t("form-required")),
        date: Yup
            .date()
            .required(t("form-required")),
        description: Yup
            .string()
            .max(500, t("form-max-length-500"))
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
    const amenityTypes: ChoiceItem[] = [
        { key: Amenity.Sidewalk, value: t("form_amenity-sidewalk")},
        { key: Amenity.Crosswalk , value: t("form_amenity-crosswalk") },
        { key: Amenity.Signal , value: t("form_amenity-signal") },
        { key: Amenity.StopSign , value: t("form_amenity-stop-sign") },
        { key: Amenity.Benches , value: t("form_amenity-benches") },
        { key: Amenity.Washroom , value: t("form_amenity-washroom") },
        { key: Amenity.Lighting , value: t("form_amenity-lighting") },
        { key: Amenity.Transit , value: t("form_amenity-transit") },
        { key: Amenity.Signs , value: t("form_amenity-signs") },
        { key: Amenity.Connections , value: t("form_amenity-connections") },
        { key: Amenity.Shade , value: t("form_amenity-shade") },
        { key: Amenity.Plants , value: t("form_amenity-plants") },
        { key: Amenity.Other , value: t("form_common-other") },

    ];

    const handleDateChange = (value: any) => {
        formik.setFieldValue("date", value);
    };

    const handlePreviousClick = () => {
        setFormData(formData);
        prevStep();
    };

    return (
        <MuiPickersUtilsProvider locale={enLocale} utils={DateFnsUtils}>
            <FormTitle title="form_amenity" />
            <form className={classes.amenityForm} noValidate onSubmit={formik.handleSubmit}>
                <div className={classes.question}>
                    <Typography>
                        {t("form_amenity-question-1")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="amenity"
                        name="amenity"
                        select
                        value={formik.values.amenity}
                        onChange={formik.handleChange}
                        error={formik.touched.amenity && Boolean(formik.errors.amenity)}
                        helperText={formik.touched.amenity && formik.errors.amenity}
                        variant="outlined"
                    >
                        {
                            amenityTypes.map((item) => {
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
                    <Typography>
                        {t("form_amenity-describe")}
                    </Typography>
                    <TextField
                        className={classes.input}
                        fullWidth
                        id="amenity-description"
                        name="amenity-description"
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
                        {t("form_amenity-date")}
                    </Typography>
                    <KeyboardDatePicker
                        className={classes.date}
                        disableFuture
                        format="MM/dd/yyyy"
                        fullWidth
                        id="amenity-date-picker"
                        inputVariant="outlined"
                        name="amenity-date-picker"
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

export default AmenityForm;