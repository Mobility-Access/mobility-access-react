import React from "react";
import Button from "@mui/material/Button";
import makeStyles from '@mui/styles/makeStyles';

import { Link } from "react-router-dom";

interface LinkButtonProps {
    className?: any;
    label: string;
    onClick: () => void;
    path: string;
}

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none",
    },
}));

// A Button component wrapped in a Link component so we can leverage
// react-router-dom
const LinkButton = React.forwardRef((props: LinkButtonProps, ref: any) => {
    const { className, label, onClick, path } = props;
    const classes = useStyles();
    
    return (
        <Link ref={ref} to={path} className={`${classes.link} ${className}`}>
            <Button className={classes.button} color="inherit" onClick={onClick}>
                {label}
            </Button>
        </Link>            
    );
});

export default LinkButton;