import React, { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRight from "@material-ui/icons/ArrowRight";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

import Colors from "../../Colors";

interface LanguageSelectorProps {
    handleLanguageChange: () => void;
    languages: { key: string, value: string}[];
    position?: "below" | "left";
}

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    menuButton: {
        color: theme.palette.primary.main,
    },
    menuItem: {
        '&.Mui-selected': {
            borderLeft: `6px solid ${Colors.contrast}`
        }
    },
}));

const LanguageSelector = (props: LanguageSelectorProps) => {
    const { handleLanguageChange, languages, position } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
    const classes = useStyles();
    const { t, i18n } = useTranslation();

    const handleSelectLanguage = (item: {key: string, value: string}) => {
        if (item.key !== currentLanguage.key) {
            setCurrentLanguage(item);
            i18n.changeLanguage(item.key)
            handleLanguageChange();
            document.documentElement.lang = item.key;
        }

        handleMenuClose();
    };

    const handleLanguageButttonClick = (event: any) => {
        setAnchorEl(event.target);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                aria-controls="app-bar-language-selector"
                aria-haspopup="true"
                className={classes.button}
                color="primary"
                endIcon={position && position === "left" ? <ArrowRight /> : <ArrowDropDownIcon />}
                onClick={handleLanguageButttonClick}
            >
                {t("language-button")}
            </Button>
            <Menu
                id="app-bar-language-selector"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
            >
                {languages.map(
                    (item) => {
                        if (item.key === "fr") {
                            return (
                                <MenuItem
                                    className={classes.menuItem}
                                    component={"a"}
                                    href={"https://onmarcheonroule.org"}
                                    key={item.key}
                                >
                                    {t(item.value)}    
                                </MenuItem>    
                            );
                        } else {
                            return (
                                <MenuItem
                                    className={classes.menuItem}
                                    key={item.key}
                                    onClick={() => handleSelectLanguage(item)}
                                >
                                    {t(item.value)}    
                                </MenuItem>  
                            )
                        }
                    }
                )}
            </Menu>
        </>
    );
};

export default LanguageSelector;