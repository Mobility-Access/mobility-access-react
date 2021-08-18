import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import LayersIcon from "@material-ui/icons/Layers";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

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

const Legend = React.forwardRef((props: LegendProps, ref: any) => {
    const { toggleLayer } = { ...props };
    const [open, setOpen] = useState(true);
    const classes = useStyles();
    const { t } = useTranslation();
    const [hazardVisible, setHazardVisible] = useState(true);
    const [amenityVisible, setAmenityVisible] = useState(true);
    const [incidentVisible, setIncidentVisible] = useState(true);

    const handleToggleVisibility = (e: any) => {
        switch (e.target.id) {
            case "hazard":
                toggleLayer(e.target.id, !hazardVisible);
                setHazardVisible(!hazardVisible);
                break;
            case "amenity":
                toggleLayer(e.target.id, !amenityVisible);
                setAmenityVisible(!amenityVisible);
                break;
            case "incident":
                toggleLayer(e.target.id, !incidentVisible);
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
                        <Typography className={classes.legendTitle}>
                            { t("legend-title") }
                        </Typography>
                        <IconButton aria-label="close-legend-button" className={classes.legendCloseButton} onClick={toggleLegend}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List >
                        <ListItem disableGutters={true} key="hazard">
                            <Checkbox
                                checked={hazardVisible}
                                color="primary"
                                id="hazard"
                                onChange={handleToggleVisibility}/>
                            <img className={classes.legendMarker}  src={hazardMarker} />
                            <div className={classes.legendText}>
                                { t("legend_hazard") }
                            </div>
                        </ListItem>
                        <ListItem disableGutters={true} key="amenity">
                            <Checkbox
                                checked={amenityVisible}
                                color="primary"
                                id="amenity"
                                onChange={handleToggleVisibility}/>
                            <img className={classes.legendMarker}  src={amenityMarker} />
                            <div className={classes.legendText}>
                                { t("legend_amenity") }
                            </div>
                        </ListItem>
                        <ListItem disableGutters={true} key="incident">
                            <Checkbox
                                checked={incidentVisible}
                                color="primary"
                                id="incident"
                                onChange={handleToggleVisibility}/>
                            <img className={classes.legendMarker}  src={incidentMarker} />
                            <div className={classes.legendText}>
                                { t("legend_incident") }
                            </div>
                        </ListItem>
                    </List>
                </div>
            </div>
            {!open && (
                <Fab
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