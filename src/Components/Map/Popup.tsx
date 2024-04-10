import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

export interface PopupContentItem {
    key: string;
    value: string;
}

interface PopupProps {
    items?: PopupContentItem[];
}

const defaultPopupContentFontSize = "0.75em";

const useStyles = makeStyles((theme) => ({
    close: {
        color: theme.palette.primary.light,
        cursor: "pointer",
        fontSize: "1.125em",
        position: "absolute",
        right: 3,
        top: 3,
    },
    item: {
        fontSize: defaultPopupContentFontSize,
    },
    itemContainer: {
        color: theme.palette.primary.main,
        margin: "2px",
    },
    popup: {
        position: "absolute",
        backgroundColor: "white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        padding: "15px",
        borderRadius: "10px",
        border: "1px solid #cccccc",
        bottom: "-8px",
        left: "-156px",
        minWidth: "280px",
    },
    popupTip: {
        position: "absolute",
        backgroundColor: "white",
        borderBottom: "1px solid #cccccc",
        borderRight: "1px solid #cccccc",
        width: "18px",
        height: "18px",
        marginTop: "6px",
        marginRight: "auto",
        marginBottom: "0px",
        marginLeft: "131px",
        webkitTransform: "rotate(45deg)",
        transform: "rotate(45deg)",
    },
}));

const Popup = React.forwardRef((props: PopupProps, ref: any) => {
    const { items } = {...props};
    const classes = useStyles();

    return (
        <div className={classes.popup} ref={ref}>
            <div>
                <div>
                    <CloseIcon className={classes.close} />
                </div>
                {
                    items && items.map((item) =>{
                        return (
                            <div className={classes.itemContainer} key={item.key}>
                                <Typography className={classes.item}>
                                    <strong>{ item.key }</strong>: { item.value }
                                </Typography>
                            </div>
                        )
                    })
                }
            </div>
            <div className={classes.popupTip}></div>
        </div>
    );
});


export default Popup;