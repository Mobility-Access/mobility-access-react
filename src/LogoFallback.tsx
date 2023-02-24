import React from "react"
import Grid from "@material-ui/core/Grid";
import logo from "./images/logos/logo.png";

const LogoFallback = () => {

    return (
        <Grid
            alignItems="center"
            container
            justifyContent="center"
            style={{
                height: "100%"
            }}
        >
            <img
                alt="Walk Roll Map logo"
                src={logo}
                style={{
                    height: 300,
                }}
            />
        </Grid>
    );
};

export default LogoFallback;