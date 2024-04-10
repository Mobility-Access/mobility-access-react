import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import LayersIcon from "@mui/icons-material/Layers";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";

import { useTranslation } from "react-i18next";
import Colors from "../../Colors";

import amenityMarker from "../../images/icons/amenity_marker.svg";
import hazardMarker from "../../images/icons/hazard_marker.svg";
import incidentMarker from "../../images/icons/incident_marker.svg";

interface LegendProps {
    toggleLayer: (layerid: string, visibile: boolean) => void,
}

const defaultPopupContentFontSize = "0.75em";
const buttonHeight = "32px";

const useStyles = makeStyles((theme) => ({
    close: {
        color: theme.palette.primary.light,
        cursor: "pointer",
        fontSize: "1.35em",
        position: "absolute",
        right: 5,
        top: 8,
    },
    closed: {
        display: "none",
    },
    fab: {
        backgroundColor: "white",
        borderRadius: "5px",
        height: buttonHeight,
        minHeight: buttonHeight,
        width: buttonHeight,
    },
    item: {
        fontSize: defaultPopupContentFontSize,
    },
    itemContainer: {
        color: theme.palette.primary.main,
        margin: "2px",
    },
    legend: {
        backgroundColor: theme.palette.common.white,
        borderRadius: "5px",
        boxShadow: "0 1px 5px rgb(0 0 0 / 40%)",
        color: Colors.primary,
        position: "absolute",
        top: 10,
        right: 10,
        width: "225px",
        zIndex: 1,
    },
    legendButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
        "&:hover": {
            backgroundColor: "#d5d5d5"
        }
    },
    legendCloseButton: {
        flex: "0 1 auto",
        marginLeft: "auto",
    },
    legendHeader: {
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
        position: "relative",
    },
    legendMarker: {
        height: "1.6em"
    },
    legendText: {
        fontSize: "0.95em",
        marginLeft: theme.spacing(1),
    },
    legendTitle: {
        flex: "0 1 auto",
        fontSize: "1em",
        fontWeight: "bold",
        left: "50%",
        position: "absolute",
        transform: "translateX(-50%)",
    },
    marker: {
        height: 100,
        viewBox: "0 0 100 100",
        width: 100,
        textAlign: "center",
    },
    open: {
        display: "block",
    },
    title: {
        fontWeight: "bold",
        margin: theme.spacing(1),
        textAlign: "center",
    },
    popup: {
        position: "absolute",
        backgroundColor: "white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        padding: "15px",
        borderRadius: "10px",
        border: "1px solid #cccccc",
        bottom: "-8px",
        left: "-156px",
        minWidth: "280px",
    },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Legend = React.forwardRef((props: LegendProps, ref: any) => {
    const { toggleLayer } = { ...props };
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
    const [open, setOpen] = useState(matches);
    const classes = useStyles();
    const { t } = useTranslation();
    const [hazardVisible, setHazardVisible] = useState(true);
    const [amenityVisible, setAmenityVisible] = useState(true);
    const [incidentVisible, setIncidentVisible] = useState(true);

    const handleToggleVisibility = (e: any) => {
        switch (e.target.id) {
            case "legend-hazard-checkbox":
                toggleLayer("hazard", !hazardVisible);
                setHazardVisible(!hazardVisible);
                break;
            case "legend-amenity-checkbox":
                toggleLayer("amenity", !amenityVisible);
                setAmenityVisible(!amenityVisible);
                break;
            case "legend-incident-checkbox":
                toggleLayer("incident", !incidentVisible);
                setIncidentVisible(!incidentVisible);
                break;
        }
    };

    const toggleLegend = () => {
        setOpen(!open);
    };

    return (
        <div>
            <div className={open ? classes.open : classes.closed}>
                <div className={classes.legend}>
                <div className={classes.legendHeader}>
                        <Typography className={classes.legendTitle} variant="h3">
                            { t("legend-title") }
                        </Typography>
                        <IconButton
                            aria-label="close-legend-button"
                            className={classes.legendCloseButton}
                            onClick={toggleLegend}
                            size="large">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List >
                        <ListItem disableGutters={true} key="hazard">
                            <Checkbox
                                checked={hazardVisible}
                                color="primary"
                                id="legend-hazard-checkbox"
                                onChange={handleToggleVisibility}
                                role="checkbox"
                                aria-checked={hazardVisible}/>
                            <img alt="hazard marker" className={classes.legendMarker}  src={hazardMarker} />
                            <label htmlFor="legend-hazard-checkbox">
                                <div className={classes.legendText}>
                                    { t("legend_hazard") }
                                </div>
                            </label>
                        </ListItem>
                        <ListItem disableGutters={true} key="amenity">
                            <Checkbox
                                checked={amenityVisible}
                                color="primary"
                                id="legend-amenity-checkbox"
                                onChange={handleToggleVisibility}
                                role="checkbox"
                                aria-checked={amenityVisible}/>
                            <img alt="amenity marker" className={classes.legendMarker}  src={amenityMarker} />
                            <label htmlFor="legend-amenity-checkbox">
                                <div className={classes.legendText}>
                                    { t("legend_amenity") }
                                </div>
                            </label>
                        </ListItem>
                        <ListItem disableGutters={true} key="incident">
                            <Checkbox
                                checked={incidentVisible}
                                color="primary"
                                id="legend-incident-checkbox"
                                onChange={handleToggleVisibility}
                                role="checkbox"
                                aria-checked={incidentVisible}/>
                            <img alt="incident marker" className={classes.legendMarker}  src={incidentMarker} />
                            <label htmlFor="legend-incident-checkbox">
                                <div className={classes.legendText}>
                                    { t("legend_incident") }
                                </div>
                            </label>
                        </ListItem>
                    </List>
                </div>
            </div>
            {!open && (
                <Fab
                    aria-label="Legend toggle"
                    classes={{
                        root: classes.fab
                    }}
                    className={classes.legendButton}
                    color="secondary"
                    onClick={toggleLegend}>
                    <LayersIcon />
                </Fab>
            )}
        </div>
    );
});


export default Legend;