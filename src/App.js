import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Auth from "./components/Auth";
import BBApp from "./components/BBApp";
import GetAuth from "./components/GetAuth";
import Login from "./components/Login";
import Confirm from "./components/Confirm";
import Done from "./components/Done";
import { Outlet } from "react-router-dom";

import themeDark from "assets/theme-dark";
import brandDark from "assets/images/logo-ct-dark.png";
import MDBox from "components/MDBox";
import Configurator from "examples/Configurator";
import routes from "routes";
import Sidenav from "examples/Sidenav";
import {
    useMaterialUIController,
    setMiniSidenav,
    setOpenConfigurator,
} from "context";
import { CssBaseline, ThemeProvider, Icon } from "@mui/material";

function App() {
    const [controller, dispatch] = useMaterialUIController();
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const {
        miniSidenav,
        direction,
        layout,
        openConfigurator,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
    } = controller;

    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

    const handleConfiguratorOpen = () =>
        setOpenConfigurator(dispatch, !openConfigurator);

    const configsButton = (
        <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="3.25rem"
            height="3.25rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            position="fixed"
            right="2rem"
            bottom="2rem"
            zIndex={99}
            color="dark"
            sx={{ cursor: "pointer" }}
            onClick={handleConfiguratorOpen}
        >
            <Icon fontSize="small" color="inherit">
                settings
            </Icon>
        </MDBox>
    );

    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    return (
        <div className="App">
            <ThemeProvider theme={themeDark}>
                <CssBaseline />
                <BrowserRouter>
                  <Auth>
                      {layout === "dashboard" && (
                          <>
                              <Sidenav
                                  color={sidenavColor}
                                  brand={brandDark}
                                  brandName="RocketBomb"
                                  routes={routes}
                                  onMouseEnter={handleOnMouseEnter}
                                  onMouseLeave={handleOnMouseLeave}
                              />
                              <Configurator />
                              {configsButton}
                          </>
                      )}
                        <Routes>
                            <Route path="/app" element={<BBApp />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/getAuth" element={<GetAuth />} />

                                <Route path="/confirm" element={<Confirm />} />
                                <Route path="/done" element={<Done />} />
                            </Route>
                        </Routes>
                  </Auth>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
