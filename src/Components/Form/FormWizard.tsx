import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavigateNext from "@material-ui/icons/NavigateNext";
import { useTranslation } from "react-i18next";

import FormTitle from "./FormTitle";
import AmenityController from "./Amenity/AmenityController";
import IncidentController from "./Incident/IncidentController";
import MicroBarrierController from "./MicroBarrier/MicroBarrierController";
import SafetyController from "./Safety/SafetyController";
import Colors from "../../Colors";
import { ChoiceItem, ReportType } from "../../FormTypes";

interface FormWizardProps {
    addNewFeature: (reportType: ReportType, fields: any) => void;
    cancelOrComplete: () => void;
    clearFeaturePopup: () => void;
    geolocateHandler: (position: any) => void;
    newReportCoords: number[];    startMapClickListener: () => void;
    stopMapClickListener: () => void;
    toggleDialog: () => void;
}

const useStyles = makeStyles((theme) => ({
    buttonBar: {
        marginTop: theme.spacing(2),
        textAlign: "right",
    },
    buttonBarButton: {
        minWidth: 100,
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
    choiceLabel: {
        flexGrow: 1,
    },
    icon: {
        color: theme.palette.primary.main,
    },
    menuItem: {
        minHeight: 64,
    },
    reportQuestion: {
        fontWeight: 600,
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    text: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
}));

const FormWizard = (props: FormWizardProps) => {
    const { addNewFeature,
        clearFeaturePopup,
        geolocateHandler,
        cancelOrComplete,
        newReportCoords,
        startMapClickListener,
        stopMapClickListener,
        toggleDialog } = { ...props } ;
    const [type, setType] = useState<string | null>(null);
    const classes = useStyles();
    const { t } = useTranslation();
    const reportTypes: ChoiceItem[] = [
        { key: ReportType.MicroBarrier, value: "form_micro-barrier" },
        { key: ReportType.Safety, value: "form_concern" },
        { key: ReportType.Amenity, value: "form_amenity" },
        { key: ReportType.Incident, value: "form_incident" }
    ];

    const handleReportTypeClick = (key: string) => {
        clearFeaturePopup();
        setType(key);
    };

    const handleCancelorComplete = () => {
        stopMapClickListener();
        cancelOrComplete();
        setType(null);
    };

    const renderPanel = () => {
        switch(type) {
            
            case ReportType.Amenity: {
                return renderAmenityController();
            }
            case ReportType.MicroBarrier: {
                return renderMicroBarrierController();
            }
            case ReportType.Incident: {
                return renderIncidentController();
            }
            case ReportType.Safety: {
                return renderSafetyController();
            }
            default: {
                return renderReportSelection();
            }
        }
    }

    const renderReportSelection = () => {
        return (
            <>
                <FormTitle title="form_title" />
                <Typography className={classes.text}>
                    {t("form_report-description")}
                </Typography>
                <Typography className={classes.reportQuestion}>
                    {t("form_report-type")}
                </Typography>
                {renderReportTypeOptions()}
                <Hidden mdUp >
                    <Button
                        className={classes.cancelButton}
                        color="secondary"
                        onClick={cancelOrComplete}
                        variant="outlined">
                        {t("form_cancel")}
                    </Button>
                </Hidden>
            </>
        );
    }

    const renderReportTypeOptions = () => {
        return (
            reportTypes.map(
                (item) => (
                    <MenuItem
                        className={classes.menuItem}
                        key={item.key}
                            onClick={() => handleReportTypeClick(item.key)}
                    >
                        <Typography className={classes.choiceLabel}>
                            {t(item.value)}
                        </Typography>
                        <ListItemIcon>
                            <NavigateNext className={classes.icon}/>
                        </ListItemIcon>   
                    </MenuItem>
                )
            )
        );
    };

    /**
     * Individual form rendering
     */

    const renderAmenityController = () => {
        return (
            <AmenityController
                addNewFeature={addNewFeature}
                cancelOrComplete={handleCancelorComplete}
                geolocateHandler={geolocateHandler}
                newReportCoords={newReportCoords}
                startMapClickListener={startMapClickListener}
                stopMapClickListener={stopMapClickListener}
                toggleDialog={toggleDialog}/>
        )
    };

    const renderIncidentController = () => {
        return (
            <IncidentController
                addNewFeature={addNewFeature}
                cancelOrComplete={handleCancelorComplete}
                geolocateHandler={geolocateHandler}
                newReportCoords={newReportCoords}
                startMapClickListener={startMapClickListener}
                stopMapClickListener={stopMapClickListener}
                toggleDialog={toggleDialog}/>
        )
    };

    const renderMicroBarrierController = () => {
        return (
            <MicroBarrierController
                addNewFeature={addNewFeature}
                cancelOrComplete={handleCancelorComplete}
                geolocateHandler={geolocateHandler}
                newReportCoords={newReportCoords}
                startMapClickListener={startMapClickListener}
                stopMapClickListener={stopMapClickListener}
                toggleDialog={toggleDialog}/>
        );
    };

    const renderSafetyController = () => {
        return <SafetyController
            addNewFeature={addNewFeature}
            cancelOrComplete={handleCancelorComplete}
            geolocateHandler={geolocateHandler}
            newReportCoords={newReportCoords}
            startMapClickListener={startMapClickListener}
            stopMapClickListener={stopMapClickListener}
            toggleDialog={toggleDialog}/>
    };

    return (
        <>
            <Container>
                { renderPanel() }
            </Container>
        </>
    );
};

export default FormWizard;