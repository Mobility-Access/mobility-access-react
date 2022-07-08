import React, { useEffect, useState } from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        display: "flex",
        height: "100%",
        overflowY: "scroll",
        width: "100%"
    }
}));

/*
 * A basic component used to display the Walk Roll Map shiny app visualizations in an iframe.
 */

const ExplorationPanel = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(true);
    const [hasFrame, setHasFrame] = useState<boolean>(false);

    useEffect(() => {
        if (hasFrame) {
            return;
        }
        const frame = document.getElementById("explorationFrame");

        if (frame) {
            setHasFrame(true);
            frame.onload = () => setLoading(false);
        }
    });

    return (
        <div className={classes.root}>
            <iframe id="explorationFrame" className={classes.root} src="https://walkrollmap.shinyapps.io/visualize_wrm_app/"/>
            <Backdrop
                className={classes.backdrop}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
        
    );
};

export default ExplorationPanel;
