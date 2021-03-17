import React from "react";

import ContentContainer from "./ContentContainer";

import AppBar from "@material-ui/core/AppBar";
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
    import Tabs from "@material-ui/core/Tabs";
    import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";



const TabContainer = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue)
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="Sample layouts">
                    <Tab label="Option 1" {...a11yProps(0)} />
                    <Tab label="Option 2" {...a11yProps(1)} />
                    <Tab label="Option 3" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ContentContainer />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

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
          {...other}
        >
          {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
}

export default TabContainer;