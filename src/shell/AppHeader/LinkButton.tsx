import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

interface LinkButtonProps {
    className?: any;
    label: string;
    path: string;
}

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    link: {
        color: "#FFF",
        textDecoration: "none",
    },
}));

// A Button component wrapped in a Link component so we can leverage
// react-router-dom
const LinkButton = (props: LinkButtonProps) => {
    const { className, label, path } = props;
    const classes = useStyles();
    
    return (
        <Link to={path} className={`${classes.link} ${className}`}>
            <Button className={classes.button} color="inherit">
                {label}
            </Button>
        </Link>            
    );
};

export default LinkButton;