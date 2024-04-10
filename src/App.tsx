import React, { Suspense } from "react";
import {
    unstable_createMuiStrictModeTheme as createMuiTheme,
    ThemeProvider,
    Theme,
    StyledEngineProvider,
    responsiveFontSizes,
    adaptV4Theme,
} from '@mui/material/styles';
import ReactGA from "react-ga4";
import "./App.css";
import Colors from "./Colors";
import LogoFallback from "./LogoFallback";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const LazyContentContainer = React.lazy(() => import("./shell/ContentContainer"));

let appTheme = createMuiTheme(adaptV4Theme({
    palette: {
        error: {
            main: Colors.contrastRed,
        },
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
}));

appTheme = responsiveFontSizes(appTheme);

function App() {
    const ga4MeasurementId = import.meta.env.VITE_GAMEASUREMENTID;
    if (ga4MeasurementId) {
        ReactGA.initialize(ga4MeasurementId);
    }
   
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={appTheme} >
                <Suspense fallback={<LogoFallback />}>
                    <LazyContentContainer />
                </Suspense>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
