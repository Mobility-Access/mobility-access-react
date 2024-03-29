import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

interface NavigationWarningProps {
    open: boolean;
    handleConfirmYes: () => void;
    handleConfirmNo: () => void;
}

const useStyles = makeStyles((theme) => ({
    text: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
}));

const NavigationWarning = (props: NavigationWarningProps) => {
    const { handleConfirmNo, handleConfirmYes, open } =  { ...props };
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Dialog open={open} onClose={handleConfirmNo}>
            <DialogContent>
                <Typography className={classes.text}>
                    {t("navigation_dialog_warn")}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleConfirmNo}>
                    {t("form_no")}
                </Button>
                <Button color="primary" onClick={handleConfirmYes}>
                    {t("form_yes")}
                </Button>
            </DialogActions>
        </Dialog>
    </>
    );
};

export default NavigationWarning;