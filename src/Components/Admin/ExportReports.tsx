import React from "react";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { categories } from "./Admin";
import { AdminAmenityUrl, AdminHazardUrl, AdminIncidentUrl } from "../../Constants";
import Colors from "../../Colors";
import { ReportType } from "../../FormTypes";
import { ExportReports as ExportReportsAdmin } from "../../Services/AdminServices";

const drawerWidth = "250px";

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
        minWidth: "95px",
    },
    buttonBar: {
        marginTop: theme.spacing(2),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    exportBlock: {
        marginBottom: theme.spacing(5),
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    exportPanel: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    root: {
        display: "flex",
        height: "calc(100vh - 64px)",
        overflowY: "scroll",
    },
    selected: {
        backgroundColor: "#d5d5d5",
        borderLeft: `6px solid ${Colors.contrast}`,
    },
    subTitle: {
        color: theme.palette.primary.main,
        fontSize: "20px",
    },
    title: {
        color: theme.palette.primary.main,
        fontSize: "32px",
    }
}));

const ExportReports = () => {
    const classes = useStyles();

    const handleExport = async (type: string, format: string) => {
        const response = await ExportReportsAdmin(type, format);

        if (response && response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } else if (response && response.status === 401) {
            console.log("Received a 401 on export.");
        } else {
            console.log("Some other error happened. ");
        }
    };

    return (
        <div className={classes.root}>
            <Drawer
                classes={{ paper: classes.drawerPaper }}
                className={classes.drawer} 
                variant="permanent"
            >
                <Toolbar />
                <List>
                    { categories.map((item) => {
                        return (
                            <ListItem
                                className={undefined}
                                key={item.type}
                            >
                                <Link to={item.path}>
                                    <ListItemText primary={item.display} />
                                </Link>
                            </ListItem>
                        )
                    })}
                    <ListItem
                        className={classes.selected}
                        key="export"
                    >
                        <Link to={"/reports/export"}>
                            <ListItemText primary={"Export Data"} />
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
            <div className={classes.exportPanel}>
                <Typography className={classes.title}>
                    Export Data
                </Typography>
                <div className={classes.exportBlock}>
                    <Typography className={classes.subTitle}>
                        Hazards/Concerns
                    </Typography>
                    <div className={classes.buttonBar}>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Hazard, "csv")} variant="outlined">
                            CSV
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Hazard, "json")} variant="outlined">
                            JSON
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Hazard, "geojson")} variant="outlined">
                            GeoJSON
                        </Button>
                    </div>
                </div>
                <div className={classes.exportBlock}>
                    <Typography className={classes.subTitle}>
                        Missing Amenties
                    </Typography>
                    <div className={classes.buttonBar}>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Amenity, "csv")} variant="outlined">
                            CSV
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Amenity, "json")} variant="outlined">
                            JSON
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Amenity, "geojson")} variant="outlined">
                            GeoJSON
                        </Button>
                    </div>
                </div>
                <div className={classes.exportBlock}>
                    <Typography className={classes.subTitle}>
                        Incidents
                    </Typography>
                    <div className={classes.buttonBar}>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Incident, "csv")} variant="outlined">
                            CSV
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Incident, "json")} variant="outlined">
                            JSON
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Incident, "geojson")} variant="outlined">
                            GeoJSON
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ExportReports;