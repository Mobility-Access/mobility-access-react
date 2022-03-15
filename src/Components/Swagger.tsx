import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "calc(100vh - 64px)",
        overflowY: "scroll",
    },
}));


const Swagger = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SwaggerUI url="http://localhost:5000/api/swagger.json" />
        </div>
    );
};

export default Swagger;