import React, { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRight from "@material-ui/icons/ArrowRight";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

interface LanguageSelectorProps {
    languages: { key: string, value: string}[];
    position?: "below" | "left";
}

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    link: {
        color: "#FFF",
        textDecoration: "none",
    },
    menuButton: {
        color: theme.palette.common.white,
    },
}));

const LanguageSelector = (props: LanguageSelectorProps) => {
    const { languages, position } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
    const classes = useStyles();
    const { t, i18n } = useTranslation();

    const handleSelectLanguage = (item: {key: string, value: string}) => {
        if (item.key !== currentLanguage.key) {
            setCurrentLanguage(item);
            i18n.changeLanguage(item.key)
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
                color="inherit"
                endIcon={position && position === "left" ? <ArrowRight /> : <ArrowDropDownIcon />}
                onClick={handleLanguageButttonClick}
            >
                {t(currentLanguage.value)}
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
                    (item) => (
                        <MenuItem
                            key={item.key}
                                onClick={() => handleSelectLanguage(item)}
                        >
                            {t(item.value)}    
                        </MenuItem>
                    )
                )}
            </Menu>
        </>
    );
};

export default LanguageSelector;