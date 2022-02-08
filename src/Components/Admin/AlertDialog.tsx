import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


interface AlertDialogProps {
    buttonClick: () => void;
    open: boolean;
    message: string;
}

const useStyles = makeStyles((theme) => ({
    text: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
}));

const AlertDialog = (props: AlertDialogProps) => {
    const { buttonClick, open, message } =  { ...props };
    const classes = useStyles();

    return (
        <>
            <Dialog open={open} onClose={buttonClick}>
            <DialogContent>
                <Typography className={classes.text}>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={buttonClick}> 
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    </>
    );
};

export default AlertDialog;