import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import { SwaggerUrl } from "../Constants";

const useStyles = makeStyles(() => ({
    root: {
        height: "calc(100vh - 64px)",
        overflowY: "scroll",
    },
}));


const Swagger = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SwaggerUI url={SwaggerUrl} />
        </div>
    );
};

export default Swagger;