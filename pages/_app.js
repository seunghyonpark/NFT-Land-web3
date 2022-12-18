import '../styles/globals.css'

import lightTheme from "../theme/light";
import darkTheme from "../theme/dark";

import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";

// 
function MyApp({ Component, pageProps }) {

  console.log("MyApp");

  const [themeConfig, setThemeConfig] = useState(lightTheme);
  const router = useRouter();

  const changeTheme = (dark) => {
    setThemeConfig(dark ? darkTheme : lightTheme);
    localStorage.setItem("yearn.finance-dark-mode", dark ? "dark" : "light");
  };

  useEffect(function () {
    const localStorageDarkMode = window.localStorage.getItem(
      "yearn.finance-dark-mode"
    );
    changeTheme(localStorageDarkMode ? localStorageDarkMode === "dark" : false);
  }, []);



  return (
    <ThemeProvider theme={themeConfig}>
      <Component {...pageProps} changeTheme={changeTheme} />
    </ThemeProvider>
  )

}

export default MyApp
