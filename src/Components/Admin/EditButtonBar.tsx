import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Colors from "../../Colors";

interface EditButtonBarProps {
    cancelClick: () => void;
    deleteClick: () => void;
    saveClick: () => void;
}

const useStyles = makeStyles((theme) => ({
    button: {
        minWidth: 90,
        marginRight: theme.spacing(1),
    },
    deleteButton: {
        borderColor: Colors.contrastRed,
        color: Colors.contrastRed,
        marginRight: theme.spacing(1),
        minWidth: 90,
        '&:hover': {
            borderColor: Colors.contrastRed
        },
    },
}));

const EditButtonBar = (props: EditButtonBarProps) => {
    const { cancelClick, deleteClick, saveClick } =  { ...props };
    const classes = useStyles();

    return (
        <>
            <Button
                className={classes.button}
                color="primary"
                onClick={() => saveClick()}
                variant="outlined"
            >
                Save
            </Button>
            <Button
                className={classes.deleteButton}
                onClick={() => deleteClick()}
                variant="outlined"
            >
                Delete
            </Button>
            <Button
                    className={classes.button}
                    onClick={() => cancelClick()}
                    variant="outlined"
                >
                    Cancel
            </Button>
        </>
    );
}

export default EditButtonBar;