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
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { categories } from "./Admin";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import UserRow from "./UserRow";
import { DeleteUser, GetUsers } from "../../Services/AdminServices";
import Colors from "../../Colors";
import { AdminUrl } from "../../Constants";

interface Category {
    display: string;
    path: string;
    type: string;
    url: string;
}

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
        height: "48px",
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
        minWidth: "100px"
    },
    {
        id: "username",
        label: "Username",
        minWidth: "150px"
    },
    {
        id: "email",
        label: "Email",
        minWidth: "250px"
    },
    {
        id: "isAdmin",
        label: "Is Admin",
        minWidth: "125px"
    },
    // {
    //     id: "canDownload",
    //     label: "Can Download Reports",
    //     minWidth: "125px"
    // },
    // {
    //     id: "canEdit",
    //     label: "Can Edit Reports",
    //     minWidth: "125px",
    // },
    {
        id: "action",
        label: "Actions",
        minWidth: "125px",
    }
];

const UserAdmin = () => {
    const classes = useStyles();
    const [category] = useState<Category>(categories[4]);
    const [count, setCount] = useState(0);
    const [filterId, setFilterId] = useState("");
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<any[]>([]);
    const [visibleRows, setVisibleRows] = useState<any[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowToDelete, setRowToDelete] = useState(0);
    const [showFooter, setShowFooter] = useState(true);

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
        const row = rows.find((row: any) => row.id === rowToDelete);
        if (row) {
            const url = `${AdminUrl}/user/${rowToDelete}`;
            const response = await DeleteUser(url);

            if (response.ok) {
                setCount(count - 1);
            } else if (response.status === 401) {
                console.warn("You must be logged in to delete a user.");
            } else if (response.status === 403) {
                console.warn("You are not authorized to delete a user.");
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

        const row = rows.find((row: any) => row.id === parseInt(filterId));

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
                                    <UserRow handleDelete={handleDelete} key={item.id} row={item} />
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
            const results  = await GetUsers(category.url, page + 1, rowsPerPage);
            const data = results.users;
            setRows(data);
            setVisibleRows(data);
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
                                className={category.type === item.type ? classes.selected : undefined}
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

export default UserAdmin;