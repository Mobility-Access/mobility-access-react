import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import { AmenityFields } from "./Amenity/AmenityController";
import FormTitle from "./FormTitle";
import { HazardFields } from "./Hazard/HazardController";
import { IncidentFields } from "./Incident/IncidentController";
import Colors from "../../Colors";

interface LocationFormProps {
    formData: AmenityFields | HazardFields | IncidentFields;
    setFormData: Dispatch<SetStateAction<any>>;
    nextStep: () => void;
    cancel: () => void;
    newReportCoords?: number[];
    prevStep: () => void;
    startMapClickListener?: () => void;
    stopMapClickListener?: () => void;
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
    chooseLocation: {
        left: 0,
        right: 0,
    },
    input: {
        marginTop: theme.spacing(1),
    },
    menuItem: {
        minHeight: minInputHeight,
        '&.Mui-selected': {
            borderLeft: `6px solid ${theme.palette.secondary.main}`
        }
    },
    question: {
        marginTop: theme.spacing(4),
    },
    text: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
}));

const LocationForm = (props: LocationFormProps) => {
    const { cancel,
        formData,
        nextStep,
        newReportCoords,
        prevStep,
        setFormData,
        startMapClickListener,
        stopMapClickListener } = { ...props };
    const [locationError, setLocationError] = useState(false);
    const { t } = useTranslation();
    const classes = useStyles();

    const handleNextClick = () => {
        if (!newReportCoords) {
            setLocationError(true);
            return;
        }

        if (newReportCoords && !newReportCoords.length) {
            setLocationError(true);
            return;
        }

        formData.point = newReportCoords;
        
        setFormData(formData);

        if (stopMapClickListener) {
            stopMapClickListener();
        }
        
        nextStep();
    };

    const handlePreviousClick = () => {
        setFormData(formData);
        prevStep();
    };

    useEffect(() => {
        if (startMapClickListener) {
            startMapClickListener();
        }
    });

    return (
        <>
            <FormTitle title="form_location-title" />
            <Typography className={classes.text}>
                    {t("form_location-description")}
            </Typography>
            {
                newReportCoords && newReportCoords.length === 2 && (
                    <Typography className={classes.text}>
                        {t("form_location-captured")}
                    </Typography>
                )
            }
            {
                locationError && (!newReportCoords || newReportCoords.length !== 2) && (
                    <Typography className={classes.text} color="error" role="alert">
                        {t("form_location-required")}
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
                    onClick={handleNextClick}
                    variant="contained">
                    {t("form_next")}
                </Button>
            </div>
        </>
    )
};

export default LocationForm;