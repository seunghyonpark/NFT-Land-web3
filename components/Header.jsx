import React, { useMemo } from "react";

import { useState, useEffect, useRef } from "react";

import Router from 'next/router';


//import Layout from "../components/Layout";
//import classes from "../components/Layout/index.module.css";
//import Chain from "../components/chain";

//import { fetcher, populateChain } from "../utils";
//import { useSearch, useTestnets } from "../stores";


/*
export async function getStaticProps({ locale }) {
	const chains = await fetcher("https://chainid.network/chains.json");
	const chainTvls = await fetcher("https://api.llama.fi/chains");
  
	const sortedChains = chains
	  .filter((c) => c.name !== "420coin") // same chainId as ronin
	  .map((chain) => populateChain(chain, chainTvls))
	  .sort((a, b) => {
		return (b.tvl ?? 0) - (a.tvl ?? 0);
	  });
  
	return {
	  props: {
		sortedChains,
		messages: (await import(`../translations/${locale}.json`)).default,
	  },
	  revalidate: 3600,
	};
}
*/




export default function Header({ address, setAddress }) {



	useEffect(() => {

		/*
		if (window.klaytn.selectedAddress === undefined) {

		} else {
			setAddress(window.klaytn.selectedAddress);
		*/
			console.log("useEffect address", address);

			if (address === "") {

			} else {
				Router.push('/game');
			}
		/*
		}
		*/

		/*
		const handleStart = (url) => (url !== router.asPath) && setLoading(true);
		const handleComplete = (url) => (url === router.asPath) && setTimeout(() => {setLoading(false)},2000);
	
		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError',  handleComplete)	
		*/
	
		/*
		let i = 0;
	
		function pollDOM() {
		  console.log(i);
		  i++;
		}
		//const interval = setInterval(pollDOM, 5000);
	
		const interval = setInterval(genNumber, 5000);
		*/
	
	
		return () => {
	
			//clearInterval(interval);
			/*
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
			*/			
		}
	
	}, [address, setAddress]);




	const setAccountInfo = async () => {
		console.log("setAccountInfo");

		const { klaytn } = window;

		console.log(klaytn);

		if (klaytn) {
			try {
				await klaytn.enable();


				const account = klaytn.selectedAddress;

				console.log("account="+account);
		
				const balance = await caver.klay.getBalance(account);
				console.log("balance="+balance);
				/*
				this.setState({
				  account,
				  balance: caver.utils.fromPeb(balance, 'KLAY'),
				})
				*/
		
				setAddress(account);

				Router.push('/game');

				//klaytn.on('accountsChanged', () => this.setAccountInfo(klaytn));

			} catch (error) {
				console.log('User denied account access');
			}
		} else {
			console.log('Non-Kaikas browser detected. You should consider trying Kaikas!');
		}

	}

	//const testnets = useTestnets((state) => state.testnets);
	//const search = useSearch((state) => state.search);

	/*
	const chains = useMemo(() => {
		if (!testnets) {

		  return sortedChains.filter((item) => {
			const testnet =
			  item.name?.toLowerCase().includes("test") ||
			  item.title?.toLowerCase().includes("test") ||
			  item.network?.toLowerCase().includes("test");
			const devnet =
				item.name?.toLowerCase().includes("devnet") ||
				item.title?.toLowerCase().includes("devnet") ||
				item.network?.toLowerCase().includes("devnet");
			return !testnet && !devnet;
		  });

		} else return sortedChains;

	  }, [testnets, sortedChains]
	);

	*/


	return (

		<header className="mt-10">
			{/* logotype */}
			<h1 className="text-center text-6xl font-extrabold text-amber-400/50 drop-shadow-xl ">
				<a href="./">GOGO DINO META EXPLORERS</a>
			</h1>

			<button
					onClick={setAccountInfo}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>

					Connect Kaikas
			</button>
		

		</header>

	);
}


