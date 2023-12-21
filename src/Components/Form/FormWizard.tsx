import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavigateNext from "@material-ui/icons/NavigateNext";
import { useTranslation } from "react-i18next";

import FormTitle from "./FormTitle";
import AmenityController from "./Amenity/AmenityController";
import HazardController from "./Hazard/HazardController";
import IncidentController from "./Incident/IncidentController";
import Colors from "../../Colors";
import { ChoiceItem, ReportType } from "../../FormTypes";

interface FormWizardProps {
    addNewFeature: (reportType: ReportType, fields: any) => void;
    cancelOrComplete: () => void;
    clearFeaturePopup: () => void;
    newReportCoords: number[];    startMapClickListener: () => void;
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
        whiteSpace: "normal",
        width: "95%",
    },
    icon: {
        color: theme.palette.primary.main,
    },
    listItem: {
        minHeight: 64,
    },
    reportQuestion: {
        fontSize: "1rem",
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
        cancelOrComplete,
        newReportCoords,
        startMapClickListener,
        stopMapClickListener } = { ...props } ;
    const [type, setType] = useState<string | null>(null);
    const classes = useStyles();
    const { t } = useTranslation();
    const reportTypes: ChoiceItem[] = [
        { key: ReportType.Hazard, value: "form_report-type-hazard" },
        { key: ReportType.Amenity, value: "form_report_type-amenity" },
        { key: ReportType.Incident, value: "form_report_type-incident" }
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

    const renderBikeMapsLink = () => {
        let hyperlink = "https://BikeMaps.org";

        switch(import.meta.env.VITE_DEFAULT_LANGUAGE) {
            case "fr":
                hyperlink = `${hyperlink}/fr`;
                break;
            case "es":
                hyperlink = `${hyperlink}/es`;
                break;
            default:
                break;
        }

        return (
            <Link href={hyperlink} rel="noopener noreferrer" target="_blank" underline="always">
                BikeMaps.org
            </Link>
        );
    };

    const renderPanel = () => {
        switch(type) {
            
            case ReportType.Amenity: {
                return renderAmenityController();
            }
            case ReportType.Hazard: {
                return renderHazardController();
            }
            case ReportType.Incident: {
                return renderIncidentController();
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
                <Typography className={classes.text}>
                    {t("form_report-description-bikemaps-link")}
                    {renderBikeMapsLink()}
                    {t("form_report-description-bikemaps-link-suffix")}
                </Typography>
                <Typography className={classes.reportQuestion} variant="h3">
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
            <List>
                {
                    reportTypes.map(
                        (item) => (
                            <ListItem
                                button
                                className={classes.listItem}
                                component={"li"}
                                key={item.key}
                                onClick={() => handleReportTypeClick(item.key)}
                                role={"listitem"}
                            >
                                <Typography className={classes.choiceLabel}>
                                    {t(item.value)}
                                </Typography>
                                <ListItemIcon>
                                    <NavigateNext className={classes.icon}/>
                                </ListItemIcon>   
                            </ListItem>
                        )
                    )
                }
            </List>
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
                newReportCoords={newReportCoords}
                startMapClickListener={startMapClickListener}
                stopMapClickListener={stopMapClickListener}
            />
        )
    };

    const renderHazardController = () => {
        return (
            <HazardController
                addNewFeature={addNewFeature}
                cancelOrComplete={handleCancelorComplete}
                newReportCoords={newReportCoords}
                startMapClickListener={startMapClickListener}
                stopMapClickListener={stopMapClickListener}
            />
        )
    };

    const renderIncidentController = () => {
        return (
            <IncidentController
                addNewFeature={addNewFeature}
                cancelOrComplete={handleCancelorComplete}
                newReportCoords={newReportCoords}
                startMapClickListener={startMapClickListener}
                stopMapClickListener={stopMapClickListener}
            />
        )
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