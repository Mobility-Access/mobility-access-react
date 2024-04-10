import React from "react";
import Button from "@mui/material/Button";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { Link } from "react-router-dom";

import Colors from "../../Colors";
import { getLocalDateFromUtcMilliseconds } from "../../utilities";

interface TableReportRowInterface {
    date: number;
    date_reported: number;
    id: number;
    type: string;
}

interface TableReportRowProps {
    handleDelete: (id: number, type: string) => void;
    row: TableReportRowInterface;
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

const TableReportRow = (props: TableReportRowProps) => {
    const { handleDelete, row } = props;
    const classes = useStyles();
    const rowType = row.type === "hazard-concern" ? "hazard" : row.type;

    const handleDeleteButtonClicked = (id: number, type: string) => {
        handleDelete(id, type);
    };

    return (
        <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{rowType}</TableCell>
            <TableCell>{getLocalDateFromUtcMilliseconds(row.date)}</TableCell>
            <TableCell>{getLocalDateFromUtcMilliseconds   (row.date_reported)}</TableCell>
            <TableCell>
                <Button
                    className={classes.editButton}
                    color="primary"
                    component={Link}
                    to={`/reports/${rowType}/${row.id}`}
                    variant="outlined"
                >
                    Edit
                </Button>
                <Button
                    className={classes.deleteButton}
                    onClick={() => handleDeleteButtonClicked(row.id, rowType)}
                    variant="outlined"
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default TableReportRow;