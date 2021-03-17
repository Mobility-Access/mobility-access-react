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

const Faq = (props: FaqProps) => {
    const { t } = useTranslation();
    const { qa } = props;

    return (
        <>
            <Typography variant="body1">
                <Box fontWeight="fontWeightBold">
                    {t(`about_${qa.question}`)}
                </Box>
            </Typography>
            <Typography>
                {t(`about_${qa.answer}`)}
            </Typography>
        </>
    );
};

export default Faq;