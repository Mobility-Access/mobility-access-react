import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

interface FormTitleProps {
    title: string;
}

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "1.25em",
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
                <Typography className={classes.title} variant="h2">
                    {t(title)}
                </Typography>
            </Toolbar>
        </>
    );
};

export default FormTitle;