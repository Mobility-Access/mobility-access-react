import React, { Suspense } from "react";
import { unstable_createMuiStrictModeTheme as createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';

// import Header from "./shell/Header";
import ContentContainer from "./shell/ContentContainer";

// import logo from './logo.svg';
import "./App.css";
import Colors from "./Colors";

let appTheme = createMuiTheme({
    palette: {
        primary: {
            main: Colors.primary,
        },
        secondary: {
            main: Colors.secondary,
        },
        text: {
            primary: Colors.primary,
        },
    },
    typography: {
        button: {
            textTransform: "none",
        },
        fontFamily:'"Arial"',
    }
});

appTheme = responsiveFontSizes(appTheme);

function App() {
    return (
        <MuiThemeProvider theme={appTheme} >
            {/* <Suspense fallback={<p>loading...</p>}> */}
                <ContentContainer />
            {/* </Suspense> */}
        </MuiThemeProvider>
    );
}

export default App;
