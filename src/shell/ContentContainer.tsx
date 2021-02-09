import React from 'react';
import Header from "./Header";
import Map from "../Components/Map/Map";
import AboutPanel from "../Components/About/AboutPanel";
import ContactPanel from "../Components/Contact/ContactPanel";
import ExplorationPanel from "../Components/Exploration/ExplorationPanel";
import TabPanel from "./TabPanel";

import "./ContentContainer.css";

const ContentContainer = () => {
    const [tabIndex, setTabIndex] = React.useState(0);


    const handleTabChange = (newTabIndex: number) => {
        if (tabIndex !== newTabIndex) {
            setTabIndex(newTabIndex)
        }
    };

    return (
        <>
            <Header tabChangedHandler={handleTabChange} />
            <TabPanel value={tabIndex} index={0}>
                <Map />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <AboutPanel />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <ExplorationPanel />
            </TabPanel>
            <TabPanel value={tabIndex} index={3}>
                <ContactPanel />
            </TabPanel>

        </>
    );
}

export default ContentContainer;