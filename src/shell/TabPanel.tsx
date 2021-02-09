import React from "react";

import "./TabPanel.css";

interface TabPanelProps {
    children?: any;
    value?: number;
    index?: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className="tab-panel"
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    
    );
}

export default TabPanel;