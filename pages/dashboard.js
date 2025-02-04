import Head from "next/head";
import { useState, useEffect } from "react";
import Script from "next/script";
import DashboardHeader from "../components/dashboard/index.js";
import StakingMain from "../components/StakingMain.jsx";
import Footer from "../components/Footer.jsx";
import useFetchNFTs from "../hooks/use-fetch-NFTs.js";


import { readFileSync } from 'fs';
import path from 'path';





//-----------------------------
export default function Dashboard({
	scriptAddress,
	cryptoTowerAddress,
	loadingCubesAddress,
	testData,
}) {
	//const [address, setAddress] = useState("0xaD87a8a48E59B1448Dc2317FD7886f2d89132b71");

	const [address, setAddress] = useState("");

	// fetch data handler
	const { fetchNFTs, data, isInHome, isLoading } = useFetchNFTs(address);


	
	useEffect(function () {
		console.log("Staking useEffect address="+address);


	}, [address]);
	

	//
	return (

		<wholepage
			className={`container m-auto flex  min-h-screen flex-col px-6 text-center sm:px-10 md:px-20 ${
				data !== [] ? "justify-evenly" : "justify-between"
			} `}
		>
			<Script src={scriptAddress} />
			
			<Head>
				<title>M.E. NFT Staking Service</title>
				<meta
					name="M.E. NFT Staking Service"
					content="A simple dApp for Staking NFT"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<DashboardHeader {...{ address, setAddress, fetchNFTs }} />

			<StakingMain
				{...{
					data,
					isInHome,
					isLoading,
					scriptAddress,
					cryptoTowerAddress,
					loadingCubesAddress,
				}}
			/>

			<Footer />
		</wholepage>

	);
}

//  --------------------------------
export function getStaticProps() {
	// async/await testing!
	let scriptAddress =
		"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";

	let cryptoTowerAddress =
		//"https://assets3.lottiefiles.com/packages/lf20_2omr5gpu.json";
		"https://assets3.lottiefiles.com/packages/lf20_4HwMFcslUL.json";
		
	let loadingCubesAddress =
		"https://assets4.lottiefiles.com/private_files/lf30_c52paxfj.json";


	const file = path.join(process.cwd(), 'posts', 'test.json');
	const testData = readFileSync(file, 'utf8');

	return {
		props: {
			scriptAddress,
			cryptoTowerAddress,
			loadingCubesAddress,
			testData,
		},
	};
}
