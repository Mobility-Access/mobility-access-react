import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from '@material-ui/core/InputAdornment';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import { useTranslation } from "react-i18next";

import { Coordinate } from "ol/coordinate";
import { fromLonLat } from "ol/proj"

import debounce from "lodash.debounce";

import { AmenityFields } from "./Amenity/AmenityController";
import FormTitle from "./FormTitle";
import { HazardFields } from "./Hazard/HazardController";
import { IncidentFields } from "./Incident/IncidentController";
import Colors from "../../Colors";
import { GeocoderUrl }  from "../../Constants";

interface GeocodeResultItem {
    coords: Coordinate;
    displayName: string;
    id: number
}

interface LocationFormProps {
    formData: AmenityFields | HazardFields | IncidentFields;
    setFormData: Dispatch<SetStateAction<any>>;
    nextStep: () => void;
    cancel: () => void;
    handleGeocodeResult: (coords: Coordinate) => void;
    newReportCoords?: number[];
    prevStep: () => void;
    startMapClickListener?: () => void;
    stopMapClickListener?: () => void;
}

const minInputHeight = 56;

const useStyles = makeStyles((theme) => ({
    addressList: {
        marginTop: theme.spacing(3),
    },
    demographicForm: {
        marginTop: theme.spacing(3),
    },
    buttonBar: {
        marginTop: theme.spacing(4),
        textAlign: "right",
    },
    buttonBarButton: {
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
    cancelButton: {
        borderColor: Colors.contrastRed,
        color: Colors.contrastRed,
        minWidth: 90,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(3),
        '&:hover': {
            borderColor: Colors.contrastRed
        },
    },
    chooseLocation: {
        left: 0,
        right: 0,
    },
    input: {
        marginTop: theme.spacing(1),
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
    menuItem: {
        minHeight: minInputHeight,
        '&.Mui-selected': {
            borderLeft: `6px solid ${theme.palette.secondary.main}`
        }
    },
    messageText: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(6),
    },
    question: {
        marginTop: theme.spacing(4),
    },
    text: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    textField: {
        height: height,
    },
}));

const height = "32px";

const LocationForm = (props: LocationFormProps) => {
    const { cancel,
        formData,
        handleGeocodeResult,
        nextStep,
        newReportCoords,
        prevStep,
        setFormData,
        startMapClickListener,
        stopMapClickListener } = { ...props };
    const [geocodeResult, setGeocodeResult] = useState<GeocodeResultItem[]>([]);
    const [locationError, setLocationError] = useState(false);
    const [value, setValue] = useState("");
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();

    const handleAddressSearchClear = () => {
        setValue("");
        setGeocodeResult([]);
        handleGeocodeResult([]);
    };

    const handleChange = (event: any) => {
        setValue(event.target.value);

        if (event.target.value.length > 2) {
            handleChangeWithDebounce(event.target.value)
        }
    };

    const handleChangeWithDebounce = useCallback(
        debounce((val: string) => performGeocode(val), 300), []
    );

    const handleGeocodeResultClick = (item: GeocodeResultItem) => {
        if (item && item.coords && item.coords.length) {
            setGeocodeResult([]);
            handleGeocodeResult && handleGeocodeResult(item.coords);
        }
        if (item && item.displayName) {
            setValue(item.displayName);
        }
    };

    const handleNextClick = () => {
        if (!newReportCoords) {
            setLocationError(true);
            return;
        }

        if (newReportCoords && !newReportCoords.length) {
            setLocationError(true);
            return;
        }

        formData.point = newReportCoords;
        
        setFormData(formData);

        if (stopMapClickListener) {
            stopMapClickListener();
        }
        
        nextStep();
    };

    const handlePreviousClick = () => {
        setFormData(formData);
        prevStep();
    };

    const performGeocode = async (val: string) => {
        const url = `${GeocoderUrl}?q=${val}&limit=5&format=json`;
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

    useEffect(() => {
        if (startMapClickListener) {
            startMapClickListener();
        }
    });

    return (
        <>
            <FormTitle title="form_location-title" />
            <Typography className={classes.text}>
                    {t("form_location-description")}
            </Typography>
            <Typography className={classes.text}>
                    1. Click the map to mark your report location.
            </Typography>
            <Typography className={classes.text}>
                    2. Enter an address into the search box below and choose a result from the list.
            </Typography>
            <div>
                <TextField
                    aria-autocomplete="list"
                    aria-controls="address-list"
                    aria-haspopup="listbox"
                    classes={{root: classes.textField}}
                    fullWidth
                    InputProps={{
                        classes: {input: classes.input},
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="clear address search"
                                    onClick={handleAddressSearchClear}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                    }}
                    onChange={handleChange}
                    placeholder={t("geocoder-search")}
                    value={value}
                    variant="outlined"    
                />
                <div aria-live="polite" className={classes.addressList} role="region" id="address-list">
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
            </div>
            {/* {
                newReportCoords && newReportCoords.length === 2 && (
                    <Typography className={classes.messageText}>
                        {t("form_location-captured")}
                    </Typography>
                )
            } */}
            {
                locationError && (!newReportCoords || newReportCoords.length !== 2) && (
                    <Typography className={classes.messageText} color="error" role="alert">
                        {t("form_location-required")}
                    </Typography>
                )
            }
            <div className={classes.buttonBar}>
                <Button
                    className={classes.cancelButton}
                    onClick={cancel}
                    variant="outlined">
                    {t("form_cancel")}
                </Button>
                <Button
                    className={classes.buttonBarButton}
                    color="primary"
                    onClick={handlePreviousClick}
                    variant="outlined">
                    {t("form_previous")}
                </Button>
                <Button
                    className={classes.buttonBarButton}
                    color="primary"
                    onClick={handleNextClick}
                    variant="contained">
                    {t("form_next")}
                </Button>
            </div>
        </>
    )
};

export default LocationForm;