import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";

import { useTranslation, Trans } from "react-i18next";

import Colors from "../../Colors";

interface TermsAndConditionsProps {
    onAccept: () => void;
    onDecline: () =>void;
    open: boolean;
}

const useStyles = makeStyles((theme) => ({
    button: {
        minWidth: 90,
    },
    dialog: {
        backgroundColor: fade(Colors.gray, 0.1),
    },
    subtitle: {
        color: theme.palette.primary.main,
        fontSize: "1rem",
        fontWeight: "bold",
        marginTop: theme.spacing(2),
        textAlign: "center",
    },
    text: {
        color: theme.palette.primary.main,
        fontSize: "1rem",
        marginTop: theme.spacing(1),
    },
    title: {
        color: theme.palette.primary.main,
        fontSize: "1.6rem",
        fontWeight: "bold",
        textAlign: "center",
    },
}));

const TermsAndConditions = (props: TermsAndConditionsProps) => {
    const { t } = useTranslation();
    const { onAccept, onDecline, open } = {...props};
    const classes = useStyles();

    return (
        <>
            <Dialog className={classes.dialog} fullWidth={true} maxWidth="lg" open={open} scroll="body">
                <DialogContent>
                    <DialogContentText>
                        <Container maxWidth="lg">
                            <Typography className={classes.title}>
                                {t("form_consent-title")}
                            </Typography>
                            <Typography className={classes.subtitle}>
                                {t("form_consent-subtitle")}
                            </Typography>
                            <Typography className={classes.subtitle}>
                                {t("form_consent-walk-roll-map")}
                            </Typography>
                            <Typography className={classes.text}>
                                {t("form_consent-preamble-1")}
                            </Typography>
                            <Typography className={classes.text}>
                                {t("form_consent-preamble-2")}
                            </Typography>
                            <Typography className={classes.text}>
                                {t("form_consent-preamble-3")}
                            </Typography>
                            <Typography className={classes.text} display="inline">
                                {t("form_consent-preamble-4")}
                            </Typography>
                            <Typography display="inline">
                                <a href="mailto:trisalyn@uvic.ca">trisalyn@uvic.ca</a>.&nbsp;
                            </Typography>
                            <Typography className={classes.text} display="inline">
                                {t("form_consent-preamble-5")}
                            </Typography>
                            <Typography display="inline">
                                (<a href="tel:250-472-4545">250-472-4545</a>
                                &nbsp;{t("form_consent-or")}&nbsp;
                                <a href="mailto:ethics.uvic.ca">ethics@uvic.ca</a>).
                            </Typography>
                            <Typography className={classes.subtitle}>
                                {t("form_consent-privacy-policy-title")}
                            </Typography>
                            <Typography className={classes.text}>
                                {t("form_consent-privacy-policy-content-1")}
                            </Typography>
                            <Typography className={classes.text}>
                                {t("form_consent-privacy-policy-content-2")}
                            </Typography>
                            <Typography className={classes.text}>
                                {t("form_consent-privacy-policy-content-3")}
                            </Typography>
                            <Typography className={classes.text}>
                                {t("form_consent-privacy-policy-content-4")}
                            </Typography>
                            <DialogActions>
                                <Button autoFocus className={classes.button} onClick={onDecline} variant="outlined">
                                    {t("form_common-decline")}
                                </Button>
                                <Button autoFocus className={classes.button} color="primary" onClick={onAccept} variant="contained">
                                    {t("form_common-accept")}
                                </Button>
                            </DialogActions>
                        </Container>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TermsAndConditions;