import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
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
}));

const PrivacyPolicy = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
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
        </>
    )
};

export default PrivacyPolicy;