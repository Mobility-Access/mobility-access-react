import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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

    return (
        <>
            <FormTitle title="form_success-title" />
            <Typography className={classes.text}>
                {t("form_success-description")}
            </Typography>
            <div className={classes.buttonBar}>
                <Button
                    className={classes.buttonBarButton}
                    color="primary"
                    onClick={reset}
                    variant="contained">
                    {t("form_new-report")}
                </Button>
            </div>
        </>
    )
};

export default SuccessForm;