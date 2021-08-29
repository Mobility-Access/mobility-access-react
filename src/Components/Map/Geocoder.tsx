import React, { useState } from "react";

import Collapse from "@material-ui/core/Collapse";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

import { Coordinate } from "ol/coordinate";
import { fromLonLat } from "ol/proj"

import { useTranslation } from "react-i18next";

import { GeocoderUrl }  from "../../Constants";

interface GeocoderProps {
    className?: any;
    handleGeocodeResult?: (value:any) => void,
}

interface GeocodeResultItem {
    coords: Coordinate;
    displayName: string;
    id: number
}

const borderRadius = "4px";
const height = "32px";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "white",
        borderRadius: "5px",
        height: height,
        minHeight: height,
        width: height,

    },
    collapse: {
        height: height
    },
    input: {
        background: "white",
        borderRadius: borderRadius,
        height: height,
        paddingBottom: 0,
        paddingTop: 0,
    },
    listItem: {
        background: "white",
        maxWidth: "400px",
        "&:hover": {
            background: "#d5d5d5",
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: "50%",
        }
    },
    listItemText: {
        color: theme.palette.primary.main,
    },
    root: {
        display: "flex"
    },
    textField: {
        height: height,
    },
    wrapper: {
        height: height,
    }
}));

const Geocoder = (props: GeocoderProps) => {
    const { className, handleGeocodeResult } = props;
    const classes = useStyles();
    const [geocodeResult, setGeocodeResult] = useState<GeocodeResultItem[]>([]);
    const [inputOpen, setInputOpen] = useState(false);
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const onClickFab = () => {
        setGeocodeResult([]);
        setInputOpen(!inputOpen);
    };

    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    const handleGeocodeResultClick = (item: GeocodeResultItem) => {
        if (item && item.coords && item.coords.length) {
            setGeocodeResult([]);
            setInputOpen(false);
            handleGeocodeResult && handleGeocodeResult(item.coords);
        }
    };

    const handleKeyDown = (event: any) => {
        if (event.keyCode === 13 && value) {
            performGeocode();
        }

        // If the user is deleting text and we already have results,
        // assume a new search and clear the results
        if (event.keyCode === 8 && geocodeResult && geocodeResult.length) {
            setGeocodeResult([]);
        }
    };

    const performGeocode = async () => {
        const url = `${GeocoderUrl}?q=${value}&limit=5&format=json`;
        const response = await fetch(url);

        if (response.ok) {
            const json = await response.json();
            processResults(json);
        } else {
            // The server returned an error
            console.log(`An error occurred while processing your request: ${response.status} - ${response.statusText}`);
        }
    };

    const processResults = (json: any) => {
        if (json && json.length) {
            const resultList = [];
            for (const item of json) {
                const resultItem = {
                    displayName: item.display_name,
                    coords: fromLonLat([item.lon, item.lat]),
                    id: item.osm_id
                };
                resultList.push(resultItem);
            }
            setGeocodeResult(resultList);
        }
        else {
            const noResult = {
                coords: [],
                displayName: t("geocoder-no-result"),
                id: -1
            };

            setGeocodeResult([noResult]);
        }
    };

    return (
        <div className={`${className}`}>
            <div className={classes.root}>
                { inputOpen && (
                    <Collapse className={classes.collapse} classes={{ wrapper: classes.wrapper }} in={inputOpen} >
                        <TextField
                            classes={{root: classes.textField}}
                            InputProps={{classes: {input: classes.input}}}
                            inputRef={input => input && input.focus()}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder={t("geocoder-search")}
                            value={value}
                            variant="outlined" />
                    </Collapse>
                )

                }
                { !open && (
                    <Fab className={classes.button} onClick={onClickFab}>
                        <SearchIcon />
                    </Fab>
                )}
            </div>            
            {
                geocodeResult && geocodeResult.length !== 0 && (
                    <List>
                        {
                            geocodeResult.map((item) => {
                                return (
                                    <ListItem
                                        button
                                        className={classes.listItem}
                                        divider={true}
                                        key={item.id }
                                        onClick={() => handleGeocodeResultClick(item)}
                                    > 
                                        <ListItemText className={classes.listItemText} primary={item.displayName} key={item.id} />
                                    </ListItem>
                                    
                                )
                            })
                        }
                    </List>
                )
            }
        </div>
    );
};

export default Geocoder;