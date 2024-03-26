import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";


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