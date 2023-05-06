import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const baseExploreUrl = 'https://walkrollmap.shinyapps.io'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    frame: {
        border: 0,
        display: "flex",
        height: "100%",
        overflowY: "scroll",
        width: "100%"
    },
    root: {
        display: "flex",
        height: "100%",
        overflowY: "scroll",
        paddingTop: "16px",
        paddingRight: "15px",
        paddingBottom: "15px",
        width: "100%"
    }
}));

/*
 * A basic component used to display the Walk Roll Map shiny app visualizations in an iframe.
 */

const ExplorationPanel = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(true);
    const [hasFrame, setHasFrame] = useState<boolean>(false);
    const { i18n } = useTranslation();
    const srcUrl = i18n.language.startsWith("en") ? 
    `${baseExploreUrl}/visualize_wrm_app` :
    `${baseExploreUrl}/onmarcheonroule_visualiser`
    
    useEffect(() => {
        if (hasFrame) {
            return;
        }
        const frame = document.getElementById("explorationFrame");

        if (frame) {
            setHasFrame(true);
            frame.onload = () => setLoading(false);
        }
    }, [hasFrame]);

    return (
        <div className={classes.root} id="explore-tabpanel" role="tabpanel">
            <iframe id="explorationFrame" className={classes.frame} src={srcUrl} title="Data visualization"/>
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
