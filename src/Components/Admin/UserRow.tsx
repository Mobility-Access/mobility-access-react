import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import { Link } from "react-router-dom";

import Colors from "../../Colors";

interface UserRowInterface {
    canDownload: boolean;
    canEdit: boolean;
    email: string;
    id: number;
    isAdmin: boolean;
    username: string;
}

interface UserRowProps {
    handleDelete: (id: number, type: string) => void;
    row: UserRowInterface;
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

const UserRow = (props: UserRowProps) => {
    const { handleDelete, row } = props;
    const classes = useStyles();

    const handleDeleteButtonClicked = (id: number, type: string) => {
        handleDelete(id, type);
    };

    const getIcon = (value: boolean) => {
        if (value) {
            return (
                <CheckIcon />
            );
        }
        return (
            <ClearIcon />
        );
    };

    return (
        <>
            <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{ getIcon(row.isAdmin) }</TableCell>
                <TableCell>
                    <Button
                        className={classes.editButton}
                        color="primary"
                        component={Link}
                        to={`/reports/user/${row.id}`}
                        variant="outlined"
                    >
                        Edit
                    </Button>
                    <Button
                        className={classes.deleteButton}
                        onClick={() => handleDeleteButtonClicked(row.id, "user")}
                        variant="outlined"
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default UserRow;