import '../styles/globals.css'

//import '../styles/dashboard.css'

//import lightTheme from "../theme/light";
//import darkTheme from "../theme/dark";

//import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";
//import { ThemeProvider } from "@material-ui/core/styles";

//import { NextIntlProvider } from "next-intl";

//import { Inter } from '@next/font/google';

//import { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';



import "@rainbow-me/rainbowkit/styles.css";
import { LivepeerConfig } from "@livepeer/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { ThemeProvider } from "../utils";
import { Toaster } from "react-hot-toast";
import { ApolloProvider } from "@apollo/client";

import { ApolloClient, LivePeerClient } from "../clients";

import { polygonMumbai, avalanche, bsc, mainnet } from '@wagmi/core/chains';


/*
import { configureChains } from '@wagmi/core'
import { avalanche, bsc, mainnet } from '@wagmi/core/chains'
 
const { chains, provider } = configureChains(
  [mainnet, avalanche, bsc],
  ...
)
*/


const { chains, provider } = configureChains(
  //[Chain.polygonMumbai],
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Ourtube",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});




// 
function MyApp({
  Component,
  pageProps: { session, ...pageProps }
  ////pageProps: { ...pageProps }
}) {

  //console.log("MyApp"); 

  
  //const [themeConfig, setThemeConfig] = useState(lightTheme);

  /*
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
  */


  return (

    //<SessionProvider session={session}>
    //  <Component {...pageProps} />
    //</SessionProvider>

    <SessionProvider session={session}>

    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ThemeProvider>
          <ApolloProvider client={ApolloClient}>
            <LivepeerConfig client={LivePeerClient}>

              <Component {...pageProps} />

              <Toaster />

            </LivepeerConfig>
          </ApolloProvider>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>


    </SessionProvider>
  )




}


export default MyApp
