import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTranslation } from "react-i18next";
import FormTitle from "./FormTitle";
import Colors from "../../Colors";

interface SuccessFormProps {
    reset: () => void;
}

const minInputHeight = 56;

const useStyles = makeStyles((theme) => ({
    successForm: {
        marginTop: theme.spacing(3),
    },
    buttonBar: {
        marginTop: theme.spacing(2),
        textAlign: "right",
    },
    buttonBarButton: {
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
    cancelButton: {
        borderColor: Colors.contrastRed,
        color: Colors.contrastRed,
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
    input: {
        marginTop: theme.spacing(1),
    },
    menuItem: {
        minHeight: minInputHeight,
        '&.Mui-selected': {
            borderLeft: `6px solid ${theme.palette.secondary.main}`
        }
    },
    question: {
        marginTop: theme.spacing(4),
    },
    text: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
}));

const SuccessForm = (props: SuccessFormProps) => {
    const { reset } = { ...props };
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });

    return (
        <>
            <FormTitle title="form_success-title" />
            <Typography className={classes.text}>
                { matches ? t("form_success-description") : t("form_success_description-mobile")}
            </Typography>
            <div className={classes.buttonBar}>
                <Button
                    className={classes.buttonBarButton}
                    color="primary"
                    onClick={reset}
                    variant="contained">
                    { matches ? t("form_new-report") : t("form_common-close") }
                </Button>
            </div>
        </>
    )
};

export default SuccessForm;