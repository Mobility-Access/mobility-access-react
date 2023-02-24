import React, { useEffect, useState } from "react";
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

import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import TableReportRow from "./TableReportRow";
import { DeletePoint, GetPoints } from "../../Services/AdminServices";
import Colors from "../../Colors";
import { AdminUrl, AmenityUrl, HazardUrl, IncidentUrl, PointUrl, AdminUserUrl } from "../../Constants";
import { getLocalDateFromUtcMilliseconds } from "../../utilities";

interface Category {
    display: string;
    path: string;
    type: string;
    url: string;
}

const drawerWidth = "250px";

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        borderColor: Colors.contrastRed,
        color: Colors.contrastRed,
        minWidth: 75,
        '&:hover': {
            borderColor: Colors.contrastRed
        },
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    editButton: {
        marginRight: "5px",
        minWidth: 75,
    },
    filterButton: {
        height: "48px",
        marginLeft: theme.spacing(1),
        minWidth: 90,
    },
    filterContainer: {
        display: "flex",
        marginBottom: theme.spacing(5),
    },
    headerRow: {
        fontWeight: theme.typography.fontWeightBold,
    },
    root: {
        color: theme.palette.primary.main,
        display: "flex",
        height: "calc(100vh - 65px)",
        overflow: "auto",
    },
    selected: {
        backgroundColor: "#d5d5d5",
        borderLeft: `6px solid ${Colors.contrast}`,
    },
    tableContainer: {
        margin: theme.spacing(2),
        height: "calc(100vh - 65px)",
        width: "100%",
    },
    title: {
        fontSize: "32px",
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(3),
    }
}));

export const categories = [
    {
        display: "All Reports",
        path: "/reports",
        type: "point",
        url: PointUrl
    },
    {
        display: "Hazards/Concerns",
        path: "/reports/hazard",
        type: "hazard",
        url: HazardUrl
    },
    {
        display: "Missing Amenities",
        path: "/reports/amenity",
        type: "amenity",
        url: AmenityUrl
    },
    {
        display: "Incidents",
        path: "/reports/incident",
        type: "incident",
        url: IncidentUrl
    },
    {
        display: "Users",
        path: "/reports/user",
        type: "user",
        url: AdminUserUrl
    },
];

const columns = [
    {
        id: "id",
        label: "Id",
        minWidth: "150px"
    },
    {
        id: "type",
        label: "Report Type",
        minWidth: "200px"
    },
    {
        id: "dateReported",
        label: "Date Reported",
        minWidth: "250px"
    },
    {
        id: "incidentDate",
        label: "Incident/Last Noticed Date",
        minWidth: "250px"
    },
    {
        id: "action",
        label: "Actions",
        minWidth: "125px",
    }
];

const Admin = () => {
    const classes = useStyles();
    const [category, setCategory] = useState<Category>(categories[0]);
    const [count, setCount] = useState(0);
    const [filterId, setFilterId] = useState("");
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<any[]>([]);
    const [visibleRows, setVisibleRows] = useState<any[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowToDelete, setRowToDelete] = useState(0);
    const [showFooter, setShowFooter] = useState(true);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleCancelDelete = () => {
        setRowToDelete(0);
        setOpen(false);
    };

    const handleClearFilter = () => {
        setFilterId("");
        setVisibleRows(rows);
        setShowFooter(true);
    };

    const handleConfirmDelete = async () => {
        const row = rows.find((row: any) => row.properties.id === rowToDelete);
        if (row) {
            const type = row.properties.type === "hazard-concern" ? "hazard": row.properties.type;
            const url = `${AdminUrl}/${type}/${rowToDelete}`;
            const result = await DeletePoint(url);

            if (result.success) {
                setCount(count - 1);
            } else {
                console.log(`An error occurred while trying to delete report with ID: ${rowToDelete}.`);
            }   
        }
        setRowToDelete(0);
        setOpen(false);
    };

    const handleDelete = (id: number) => {
        setRowToDelete(id);
        setOpen(true);
    };

    const handleFilterById = (e: any) => {
        e.preventDefault();
        if (!filterId) {
            handleClearFilter();
            return;
        }

        const row = rows.find((row: any) => row.properties.id === parseInt(filterId));

        if (row) {
            setVisibleRows([row]);
        } else {
            setVisibleRows([]);
        }

        setShowFooter(false);
    };

    const handleFilterIdChange = (event: any) => {
        setFilterId(event.target.value);
    };

    const handlePageChange = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: any) => {
        setRowsPerPage(event.target.value);
    };
    
    const handleSelection = (item: Category) => {
        setCategory(item);
        setPage(0);
    };

    const renderTable = () => {
        return (
            <div>
                <TableContainer> 
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow key="tableHeader">
                                { columns.map((column) => (
                                    <TableCell
                                        className={classes.headerRow}
                                        key={column.id}
                                        style={{ minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}

                            </TableRow>
                        </TableHead>
                        { visibleRows.length > 0 && (
                            <TableBody>
                                { visibleRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                    <TableReportRow handleDelete={handleDelete} key={item.properties.id} row={item.properties} />
                                ))}
                            </TableBody>
                        )}
                        {showFooter && ( 
                            <TableFooter>
                                <TableRow key="tableFooter">
                                    <TablePagination
                                        count={count}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        rowsPerPageOptions={[10, 25, 50, 100]}
                                    />
                                </TableRow>
                            </TableFooter>
                        )}
                    </Table>
                </TableContainer>
            </div>
        );
    };

    useEffect(() => {
        (async () => {
            const results  = await GetPoints(category.url, page + 1, rowsPerPage);
            const data = results.features;
            setRows(data);
            setVisibleRows(rows);
            setCount(results.totalCount);
        })()
    }, [category, count]);
 
    return (
        <div className={classes.root}>
            <Drawer
                classes={{ paper: classes.drawerPaper }}
                className={classes.drawer} 
                variant="permanent"
            >
                <Toolbar />
                <List>
                    { categories.map((item, index) => {
                        return (
                            <ListItem
                                className={category.type === item.type ? classes.selected : undefined}
                                // component={props => <Link {...props} to={item.path} />}
                                key={index}
                            >
                                <Link to={item.path}>
                                    <ListItemText primary={item.display} />
                                </Link>
                            </ListItem>
                        )
                    })}
                    <ListItem
                        key="export"
                    >
                        <Link to={"/reports/export"}>
                            <ListItemText primary={"Export Data"} />
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
            {
                <div className={classes.tableContainer}>
                    <Typography className={classes.title}>
                        { category.display }
                    </Typography>
                    <div className={classes.filterContainer}>
                        <form onSubmit={handleFilterById}>
                            <TextField label="Filter by Id" onChange={handleFilterIdChange} value={filterId}>

                            </TextField>
                            <Button className={classes.filterButton} color="primary" type="submit" variant="outlined">
                                Filter
                            </Button>
                            <Button className={classes.filterButton} color="primary" onClick={handleClearFilter} variant="outlined">
                                Clear
                            </Button>
                        </form>
                    </div>
                    { renderTable() }
                </div>
            }
            <ConfirmDeleteDialog handleConfirmNo={handleCancelDelete} handleConfirmYes={handleConfirmDelete} open={open} />
        </div>
    )
};

export default Admin;