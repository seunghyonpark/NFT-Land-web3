import Head from "next/head";
import { useState, useEffect } from "react";
import Script from "next/script";
import MintHeader from "../components/MintHeader/index.js";
import MintingDashboard from "../components/MintingDashboard.jsx";
import MintMain from "../components/MintMain.jsx";
import Footer from "../components/Footer.jsx";
import useMintNFT from "../hooks/useMintNFT.js";
//import useFetchNFTs from "../hooks/use-fetch-NFTs.js";


import { readFileSync } from 'fs';
import path from 'path';





//-----------------------------
export default function Mint({
	scriptAddress,
	cryptoTowerAddress,
	loadingCubesAddress,
	goldFishAddress,
	dataProcessingAddress,
	testData,
}) {
	//const [address, setAddress] = useState("0xaD87a8a48E59B1448Dc2317FD7886f2d89132b71");

	const [address, setAddress] = useState("");


	// fetch data handler
	//const { fetchNFTs, data, isInHome, isLoading } = useFetchNFTs(address);

	const { mintNFT, checkNFT, fetchNFTs, data, isInHome, isLoading, isConnectWallet, isMinting, tokenId } = useMintNFT(address);


	
	useEffect(function () {
		console.log("Minting useEffect address="+address);


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
				<title>GDX Minting Service</title>
				<meta
					name="GDX Minting Service"
					content="A simple dApp for Minting NFT"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MintHeader
				{...{
					address,
					setAddress,
					data,
					mintNFT,
					fetchNFTs,
					isMinting,
				}}
			/>



			<MintingDashboard
				{...{
					isMinting,
					dataProcessingAddress,
					checkNFT,
				}}
			/>

			<MintMain
				{...{
					data,
					isInHome,
					isLoading,
					isConnectWallet,
					scriptAddress,
					cryptoTowerAddress,
					goldFishAddress,
					loadingCubesAddress,
				}}
			/>

			<Footer />
		</wholepage>

	);
}

//  --------------------------------
export async function getStaticProps() {

	console.log("mint getStaticProps");


	// async/await testing!
	let scriptAddress =
		"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";

	let cryptoTowerAddress =
		"https://assets3.lottiefiles.com/packages/lf20_2omr5gpu.json";
		
	let loadingCubesAddress =
		"https://assets4.lottiefiles.com/private_files/lf30_c52paxfj.json";

	let goldFishAddress =
		"https://assets3.lottiefiles.com/packages/lf20_4HwMFcslUL.json";

	let dataProcessingAddress =
		"https://assets10.lottiefiles.com/private_files/lf30_x4ubhxsy.json";


	const file = path.join(process.cwd(), 'posts', 'test.json');
	const testData = readFileSync(file, 'utf8');


		/*
	const res = await fetch("https://.../posts");
	const posts = await res.json();
  
	// By returning { props: posts }, the Blog component
	// will receive `posts` as a prop at build time
	return {
	  props: {
		posts
	  }
	};
	*/




	return {
		props: {
			scriptAddress,
			cryptoTowerAddress,
			loadingCubesAddress,
			goldFishAddress,
			dataProcessingAddress,
			testData,
		},
	};
}
