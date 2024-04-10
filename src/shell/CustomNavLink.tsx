import React from "react";
import Typography from "@mui/material/Typography";

import { NavLink } from "react-router-dom";

interface CustomNavLinkProps {
    label: string
    to: string
}

const CustomNavLink = (props: CustomNavLinkProps) => {
    const { label, to } = { ...props };

    return (
        <NavLink to={to} exact>
            <Typography variant="h2">
                {label}
            </Typography>
        </NavLink>
    );
};

export default CustomNavLink;