import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Colors from "../../Colors";

interface ConfirmDeleteDialogProps {
    open: boolean;
    handleConfirmYes: () => void;
    handleConfirmNo: () => void;
}

const useStyles = makeStyles((theme) => ({
    confirmDeleteButton: {
        color: Colors.contrastRed,
    },
    text: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
}));

const ConfirmDeleteDialog = (props: ConfirmDeleteDialogProps) => {
    const { handleConfirmNo, handleConfirmYes, open } =  { ...props };
    const classes = useStyles();

    return (
        <>
            <Dialog open={open} onClose={handleConfirmNo}>
            <DialogContent>
                <Typography className={classes.text}>
                    Are you sure you want to delete this report? This action cannot be undone!
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button className={classes.confirmDeleteButton} onClick={handleConfirmYes}>
                    Confirm Delete
                </Button>
                <Button color="primary" onClick={handleConfirmNo}> 
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    </>
    );
};

export default ConfirmDeleteDialog;