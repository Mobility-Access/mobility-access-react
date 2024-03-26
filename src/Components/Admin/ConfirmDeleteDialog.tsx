import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";

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