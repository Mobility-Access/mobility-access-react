import React from "react";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { categories } from "./Admin";
import { AdminAmenityUrl, AdminHazardUrl, AdminIncidentUrl } from "../../Constants";
import Colors from "../../Colors";
import { ReportType } from "../../FormTypes";

const drawerWidth = "250px";

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
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

    const getAdminUrl = (type: string) => {
        switch(type) {
            case ReportType.Amenity:
                return AdminAmenityUrl;
            case ReportType.Hazard:
                return AdminHazardUrl;
            case ReportType.Incident:
                return AdminIncidentUrl;
            default:
                return "";
        }
    }

    const handleExport = (type: string, format: string) => {
        const baseUrl = getAdminUrl(type);
        const url = `${baseUrl}/export?format=${format}`;
        const link = document.createElement("a");
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
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
                                // component={props => <Link {...props} to={item.path} />}
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
                            Export to CSV
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Hazard, "json")} variant="outlined">
                            Export to JSON
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Hazard, "geojson")} variant="outlined">
                            Export to GeoJSON
                        </Button>
                    </div>
                </div>
                <div className={classes.exportBlock}>
                    <Typography className={classes.subTitle}>
                        Missing Amenties
                    </Typography>
                    <div className={classes.buttonBar}>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Amenity, "csv")} variant="outlined">
                            Export to CSV
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Amenity, "json")} variant="outlined">
                            Export to JSON
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Amenity, "geojson")} variant="outlined">
                            Export to GeoJSON
                        </Button>
                    </div>
                </div>
                <div className={classes.exportBlock}>
                    <Typography className={classes.subTitle}>
                        Incidents
                    </Typography>
                    <div className={classes.buttonBar}>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Incident, "csv")} variant="outlined">
                            Export to CSV
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Incident, "json")} variant="outlined">
                            Export to JSON
                        </Button>
                        <Button className={classes.button} onClick={() => handleExport(ReportType.Incident, "geojson")} variant="outlined">
                            Export to GeoJSON
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ExportReports;