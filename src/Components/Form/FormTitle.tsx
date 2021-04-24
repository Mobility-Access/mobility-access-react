import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

interface FormTitleProps {
    title: string;
}

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
    },
    toolbar: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        display: "flex",
        margin: theme.spacing(1),
    }
}));

const FormTitle = (props: FormTitleProps) => {
    const { title } = {...props};
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
        <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant="h6">
                {t(title)}
            </Typography>
        </Toolbar>
    </>
    );
};

export default FormTitle;