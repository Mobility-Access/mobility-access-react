import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import TableReportRow from "./TableReportRow";
import { DeletePoint, GetPoints } from "../../Services/AdminServices";
import Colors from "../../Colors";
import { AdminUrl, HazardUrl } from "../../Constants";
import { TextField } from "@mui/material";
import { categories } from "./Admin";
import { ReportType } from "../../FormTypes";

const drawerWidth = "250px";

const useStyles = makeStyles((theme) => createStyles({
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
        marginLeft: theme.spacing(1),
        minWidth: 90,
    },
    filterContainer: {
        display: "flex",
        marginBottom: theme.spacing(5),
    },
    headerRow: {
        fontWeight: "bold",
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
        fontWeight: "bold",
        marginBottom: theme.spacing(3),
    }
}));

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
        label: "Last Noticed Date",
        minWidth: "250px"
    },
    {
        id: "action",
        label: "Actions",
        minWidth: "125px",
    }
];

const HazardAdmin = () => {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const [filterId, setFilterId] = useState("");
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<any[]>([]);
    const [visibleRows, setVisibleRows] = useState<any[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowToDelete, setRowToDelete] = useState(0);
    const [showFooter, setShowFooter] = useState(true);

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

    const handleFilterById = () => {
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

    const renderTable = () => {
        return (
            <div>
                <TableContainer> 
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
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
                                <TableRow>
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
            const results  = await GetPoints(HazardUrl, page + 1, rowsPerPage);
            const data = results.features;
            setRows(data);
            setVisibleRows(rows);
            setCount(results.totalCount);
        })()
    }, [count]); // eslint-disable-line react-hooks/exhaustive-deps
 
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
                                className={ReportType.Hazard === item.type || "hazard" === item.type ? classes.selected : undefined}
                                key={item.type}
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
                        Hazards/Concerns
                    </Typography>
                    <div className={classes.filterContainer}>
                        <TextField label="Filter by Id" onChange={handleFilterIdChange} value={filterId}>

                        </TextField>
                        <Button className={classes.filterButton} color="primary" onClick={handleFilterById} variant="outlined">
                            Filter
                        </Button>
                        <Button className={classes.filterButton} color="primary" onClick={handleClearFilter} variant="outlined">
                            Clear
                        </Button>
                    </div>
                    { renderTable() }
                </div>
            }
            <ConfirmDeleteDialog handleConfirmNo={handleCancelDelete} handleConfirmYes={handleConfirmDelete} open={open} />
        </div>
    )
};

export default HazardAdmin;