import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavigateNext from "@material-ui/icons/NavigateNext";
import { useTranslation } from "react-i18next";

import FormTitle from "./FormTitle";
import { ReportType } from "../../FormTypes"
import AmenityController from "./Amenity/AmenityController";
import IncidentController from "./Incident/IncidentController";
import MicroBarrierController from "./MicroBarrier/MicroBarrierController";
import SafetyController from "./Safety/SafetyController";
import { ChoiceItem } from "../../FormTypes";

interface FormWizardProps {
    geolocateHandler: (position: any) => void;
    newReportCoords: number[];
    resetReportCoords: () => void;
    startMapClickListener: () => void;
    stopMapClickListener: () => void;
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
    const { geolocateHandler, newReportCoords, resetReportCoords, startMapClickListener, stopMapClickListener } = { ...props } ;
    const [index, setIndex] = useState(0);
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
        setType(key);
    };

    const handleCancelorComplete = () => {
        stopMapClickListener();
        resetReportCoords();
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
                cancelOrComplete={handleCancelorComplete}
                geolocateHandler={geolocateHandler}
                newReportCoords={newReportCoords}
                startMapClickListener={startMapClickListener}
                stopMapClickListener={stopMapClickListener}/>
        )
    };

    const renderIncidentController = () => {
        return (
            <IncidentController
                cancelOrComplete={handleCancelorComplete}
                geolocateHandler={geolocateHandler}
                newReportCoords={newReportCoords}
                startMapClickListener={startMapClickListener}
                stopMapClickListener={stopMapClickListener}/>
        )
    };

    const renderMicroBarrierController = () => {
        return (
            <MicroBarrierController
                cancelOrComplete={handleCancelorComplete}
                geolocateHandler={geolocateHandler}
                newReportCoords={newReportCoords}
                startMapClickListener={startMapClickListener}
                stopMapClickListener={stopMapClickListener}/>
        );
    };

    const renderSafetyController = () => {
        return <SafetyController
            cancelOrComplete={handleCancelorComplete}
            geolocateHandler={geolocateHandler}
            newReportCoords={newReportCoords}
            startMapClickListener={startMapClickListener}
            stopMapClickListener={stopMapClickListener}/>
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