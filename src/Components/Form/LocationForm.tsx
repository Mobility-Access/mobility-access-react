import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import MyLocation from "@material-ui/icons/MyLocation";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

import { AmenityFields } from "./Amenity/AmenityController";
import FormTitle from "./FormTitle";
import { IncidentFields } from "./Incident/IncidentController";
import { MicroBarrierFields } from "./MicroBarrier/MicroBarrierController"; 
import { SafetyFields } from "./Safety/SafetyController";
import { Point } from "../Map/Map";
import Colors from "../../Colors";

interface LocationFormProps {
    formData: AmenityFields | IncidentFields | MicroBarrierFields | SafetyFields;
    setFormData: Dispatch<SetStateAction<any>>;
    nextStep: () => void;
    cancel: () => void;
    geolocateHandler: (position: any) => void;
    newReportCoords?: number[];
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
    currentLocation: {
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
    const { cancel, formData, geolocateHandler, nextStep, newReportCoords, setFormData, startMapClickListener, stopMapClickListener } = { ...props };
    const [reportCoords, setReportCoords] = useState(newReportCoords);
    const [point, setPoint] = useState<number[]>(formData.point);
    const [firstRun, setFirstRun] = useState(true);
    const { t } = useTranslation();
    const classes = useStyles();

    const handleCancelClick = () => {
        if (stopMapClickListener) {
            stopMapClickListener();
        }
        
        cancel();
    };

    const handleCurrentLocationClick = () => {
        if (navigator && "geolocation in navigator") {
            const position = navigator.geolocation.getCurrentPosition(geolocateHandler);
        }
    };

    const handleNextClick = () => {
        if (newReportCoords) {
            formData.point = newReportCoords;
        }
        
        setFormData(formData);

        if (stopMapClickListener) {
            stopMapClickListener();
        }
        
        nextStep();
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
            <div style={{textAlign: "center"}}>
                {/* <Button
                    className={classes.currentLocation}
                    color="primary"
                    onClick={handleCurrentLocationClick}
                    startIcon={<MyLocation />}
                    variant="contained">
                    {t("form_current-location")}
                </Button> */}
            </div>
            {
                newReportCoords && newReportCoords.length === 2 && (
                    <Typography className={classes.text}>
                        {t("form_location-captured")}
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
                    disabled={newReportCoords && newReportCoords.length === 0}
                    onClick={handleNextClick}
                    variant="contained">
                    {t("form_next")}
                </Button>
            </div>
        </>
    )
};

export default LocationForm;