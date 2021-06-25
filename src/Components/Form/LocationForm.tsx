import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTranslation } from "react-i18next";

import { AmenityFields } from "./Amenity/AmenityController";
import FormTitle from "./FormTitle";
import { IncidentFields } from "./Incident/IncidentController";
import { MicroBarrierFields } from "./MicroBarrier/MicroBarrierController"; 
import { SafetyFields } from "./Safety/SafetyController";
import Colors from "../../Colors";

interface LocationFormProps {
    formData: AmenityFields | IncidentFields | MicroBarrierFields | SafetyFields;
    setFormData: Dispatch<SetStateAction<any>>;
    nextStep: () => void;
    cancel: () => void;
    geolocateHandler: (position: any) => void;
    newReportCoords?: number[];
    prevStep: () => void;
    startMapClickListener?: () => void;
    stopMapClickListener?: () => void;
    toggleDialog: () => void;
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
        geolocateHandler,
        nextStep,
        newReportCoords,
        prevStep,
        setFormData,
        startMapClickListener,
        stopMapClickListener,
        toggleDialog } = { ...props };
    const [reportCoords, setReportCoords] = useState(newReportCoords);
    const [point, setPoint] = useState<number[]>(formData.point);
    const [firstRun, setFirstRun] = useState(true);
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const handleCancelClick = () => {
        if (stopMapClickListener) {
            stopMapClickListener();
        }
        
        cancel();
    };

    const handleChooseLocationClick = () => {
        toggleDialog();
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

    const handleNextClickMobile = () => {
        toggleDialog();
    };

    const handlePreviousClick = () => {
        setFormData(formData);
        prevStep();
    };

    const renderDesktopLocation = () => {
        return (
            <>
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
                        disabled={newReportCoords && newReportCoords.length === 0}
                        onClick={handleNextClick}
                        variant="contained">
                        {t("form_next")}
                    </Button>
                </div>
            </>
        );
    };

    const renderLocationBySize = () => {
        if (matches) {
            return renderDesktopLocation();
        } else {
            return renderMobileLocation();
        }
    };

    const renderMobileLocation = () => {
        return (
            <>
                <Typography className={classes.text}>
                    {t("form_location-description-mobile")}
                </Typography>
                <div style={{textAlign: "center"}}>
                    <Button
                        className={classes.chooseLocation}
                        color="primary"
                        onClick={handleChooseLocationClick}
                        variant="contained">
                        {t("form_location-choose")}
                    </Button>
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
        );
    };

    useEffect(() => {
        if (startMapClickListener) {
            startMapClickListener();
        }
    });

    return (
        <>
            <FormTitle title="form_location-title" />
            { renderLocationBySize() }
        </>
    )
};

export default LocationForm;