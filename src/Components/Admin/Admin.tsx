import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
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
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { GetPoints } from "../../Services/AdminServices";
import Colors from "../../Colors";
import { AmenityUrl, HazardUrl, IncidentUrl, PointUrl } from "../../Constants";
import { getLocalDateFromUtcMilliseconds } from "../../utilities";

interface Category {
    display: string;
    type: string;
    url: string;
}

const drawerWidth = "250px";

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        borderColor: Colors.contrastRed,
        color: Colors.contrastRed,
        minWidth: 90,
        '&:hover': {
            borderColor: Colors.contrastRed
        }
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
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

const categories = [
    {
        display: "All Points",
        type: "point",
        url: PointUrl
    },
    {
        display: "Hazards/Concerns",
        type: "hazard",
        url: HazardUrl
    },
    {
        display: "Missing Amenities",
        type: "amenity",
        url: AmenityUrl
    },
    {
        display: "Incidents",
        type: "incident",
        url: IncidentUrl
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
        label: "ReportType",
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
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<any[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleCancelDelete = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        console.log("Item deleted");
        setOpen(false);
    };

    const handleDelete = (id: number, type: string) => {
        setOpen(true);
    };

    const handlePageChange = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: any) => {
        setRowsPerPage(event.target.value);
    };
    
    const handleSelection = (item: Category) => {
        setCategory(item);
    };

    const renderTable = () => {
        return (
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
                    <TableBody>
                        { rows.map((item) => (
                            <TableReportRow handleDelete={handleDelete} key={item.id} row={item.properties} />
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                ActionsComponent={CustomTablePaginationActions}
                                colSpan={columns.length}
                                count={count}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOptions={[10, 25, 50, 100]}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        );
    };

    useEffect(() => {
        (async () => {
            const results  = await GetPoints(category.url, page + 1, rowsPerPage);
            const data = results.features;
            setRows(data);
            setCount(results.totalCount);
        })()
    }, [category, page, rowsPerPage]);
 
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
                                button
                                className={category.type === item.type ? classes.selected : undefined}
                                key={item.type}
                                onClick={() => handleSelection(item)}
                            >
                                <ListItemText primary={item.display} />
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
            {
                <div className={classes.tableContainer}>
                    <Typography className={classes.title}>
                        { category.display }
                    </Typography>
                     { renderTable() }
                </div>
            }
            <ConfirmDeleteDialog handleConfirmNo={handleCancelDelete} handleConfirmYes={handleConfirmDelete} open={open} />
        </div>
    )
};

interface ReportRow {
    date: number;
    date_reported: number;
    id: number;
    type: string;
}

interface ReportRowProps {
    handleDelete: (id: number, type: string) => void;
    row: ReportRow;
}

const TableReportRow = (props: ReportRowProps) => {
    const { handleDelete, row } = props;
    const classes = useStyles();

    const handleDeleteButtonClicked = (id: number, type: string) => {
        console.log("Asked to delete: " + id);
        handleDelete(id, type);
    };

    return (
        <>
            <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{getLocalDateFromUtcMilliseconds(row.date)}</TableCell>
                <TableCell>{getLocalDateFromUtcMilliseconds   (row.date_reported)}</TableCell>
                <TableCell>
                    <Button
                        className={classes.deleteButton}
                        onClick={() => handleDeleteButtonClicked(row.id, row.type)}
                        variant="outlined"
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
};

interface CustomTablePaginationActionsProps {
    count: number;
    onPageChange: (event: any, page: number) => void;
    page: number;
    rowsPerPage: number;
}

const useStylesTablePaginationActions = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));

const CustomTablePaginationActions = (props: CustomTablePaginationActionsProps) => {
    const classes = useStylesTablePaginationActions();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: any) => {
        onPageChange(event, 0);
    };
    
      const handleBackButtonClick = (event: any) => {
        onPageChange(event, page - 1);
    };
    
      const handleNextButtonClick = (event: any) => {
        onPageChange(event, page + 1);
    };
    
      const handleLastPageButtonClick = (event: any) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                aria-label="first page"
                disabled={page === 0}
                onClick={handleFirstPageButtonClick}
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                aria-label="previous page"
                disabled={page === 0} 
                onClick={handleBackButtonClick}
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                aria-label="next page"
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                onClick={handleNextButtonClick}
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                aria-label="last page" 
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                onClick={handleLastPageButtonClick}
            >
                <LastPageIcon />
            </IconButton>
        </div>
    );
}

export default Admin;