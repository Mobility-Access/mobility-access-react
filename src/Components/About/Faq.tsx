import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { useTranslation } from "react-i18next";

interface FaqProps {
    qa: QuestionAnswer
}

export interface QuestionAnswer {
    question: string;
    answer: string;
}

const useStyles = makeStyles((theme) => ({
    answer: {
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(1),
    },
    question: {
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(1),
    }
}));

const Faq = (props: FaqProps) => {
    const { t } = useTranslation();
    const { qa } = props;
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.question} variant="body1">
                <Box fontWeight="fontWeightBold">
                    {t(`about_${qa.question}`)}
                </Box>
            </Typography>
            <Typography className={classes.answer}>
                {t(`about_${qa.answer}`)}
            </Typography>
        </>
    );
};

export default Faq;