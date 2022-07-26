import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";

import { useTranslation } from "react-i18next";

import booleanWithin from "@turf/boolean-within";
import { feature, multiPolygon, point } from "@turf/helpers";
import { toWgs84 } from "@turf/projection";


import Colors from "../../Colors";
import PrivacyPolicy from "./PrivacyPolicy";
import { US_Boundary } from "./US_Boundary";

interface TermsAndConditionsProps {
    location: number[];
    onAccept: () => void;
    onDecline: () => void;
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
    const { location, onAccept, onDecline, open } = {...props};
    const classes = useStyles();

    // Determine if this report is located within the US
    const turfPoint3857 = point(location);
    const turfPoint4326 = toWgs84(turfPoint3857);
    const multipolygon = multiPolygon(US_Boundary.features[0].geometry.coordinates);

    const withinUS = booleanWithin(turfPoint4326, multipolygon);
    console.log(`We're within the US: ${withinUS}`);

    const renderInformedConsent = () => {
        return (
            <>
                <Typography className={classes.text}>
                    {t("form_consent-preamble-1")}
                </Typography>
                <Typography className={classes.text}>
                    {t("form_consent-preamble-2")}
                </Typography>
                <Typography className={classes.text}>
                    {t("form_consent-preamble-3")}
                </Typography>
                <div className={classes.text}>
                    <Typography display="inline">
                        {t("form_consent-preamble-4")}
                    </Typography>
                    <Typography display="inline">
                        <a href="mailto:trisalyn@uvic.ca">trisalyn@uvic.ca</a>.&nbsp;
                    </Typography>
                    <Typography display="inline">
                        {t("form_consent-preamble-5")}
                    </Typography>
                    <Typography display="inline">
                        (<a href="tel:250-472-4545">250-472-4545</a>
                        &nbsp;{t("form_consent-or")}&nbsp;
                        <a href="mailto:ethics.uvic.ca">ethics@uvic.ca</a>).
                    </Typography>
                </div>
            </>
        );
    };

    const renderInformedConsentUS = () => {
        return (
            <>
                <Typography className={classes.text}>
                    {t("form_consent-preamble-us-1")}
                </Typography>
                <Typography className={classes.text}>
                    {t("form_consent-preamble-us-2")}
                </Typography>
                <Typography className={classes.text}>
                    {t("form_consent-preamble-us-3")}
                </Typography>
                <div className={classes.text}>
                    <Typography display="inline">
                        {t("form_consent-preamble-us-4")}
                    </Typography>
                    <Typography display="inline">
                        <a href="mailto:trisalyn@uvic.ca">trisalyn@uvic.ca</a>.&nbsp;
                    </Typography>
                </div>
                <div className={classes.text}>
                    <Typography display="inline">
                        {t("form_consent-preamble-us-5")}
                    </Typography>
                    <Typography display="inline">
                        (<a href="mailto:hsc@research.ucsb.edu">hsc@research.ucsb.edu</a>).
                    </Typography>
                </div>
            </>
        );
    };

    return (
        <>
            <Dialog className={classes.dialog} fullWidth={true} maxWidth="lg" open={open} scroll="body">
                <DialogContent>
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
                        { withinUS && renderInformedConsentUS() }
                        { !withinUS && renderInformedConsent()}
                        <PrivacyPolicy />
                        <DialogActions>
                            <Button autoFocus className={classes.button} onClick={onDecline} variant="outlined">
                                {t("form_common-decline")}
                            </Button>
                            <Button autoFocus className={classes.button} color="primary" onClick={onAccept} variant="contained">
                                {t("form_common-accept")}
                            </Button>
                        </DialogActions>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TermsAndConditions;