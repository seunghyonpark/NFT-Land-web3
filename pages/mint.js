import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import MintHeader from "../components/MintHeader/index.js";
import MintingDashboard from "../components/MintingDashboard.jsx";
import MintMain from "../components/MintMain.jsx";
import Footer from "../components/Footer.jsx";
import useMintNFT from "../hooks/useMintNFT.js";
//import useFetchNFTs from "../hooks/use-fetch-NFTs.js";


import { readFileSync } from 'fs';
import path from 'path';


import { Fireworks } from 'fireworks-js';

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";



const options = {
    //options
};


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


	const ref = useRef();

	
	useEffect(() => {

		
		console.log("Minting useEffect address="+address);

		console.log(ref.current);

		console.log(document.getElementById('container'));

		const container = ref.current;

		/*
		const fireworks = new Fireworks(container, {
			rocketsPoint: {
			  min: 50,
			  max: 50
			},
			hue: {
			  min: 0,
			  max: 360
			},
			delay: {
			  min: 0.015,
			  max: 0.03
			},
			lineWidth: {
			  explosion: {
				min: 1,
				max: 3
			  },
			  trace: {
				min: 1,
				max: 2
			  }
			},
			lineStyle: 'round',
			speed: 2,
			acceleration: 1.05,
			friction: 0.95,
			gravity: 1.5,
			particles: 50,
			traceLength: 3,
			flickering: 50,
			opacity: 0.5,
			explosion: 5,
			intensity: 30,
			traceSpeed: 10,
			autoresize: true,
			brightness: { 
			  min: 50, 
			  max: 80
			},
			decay: {
			  min: 0.015,
			  max: 0.03
			},
			mouse: { 
			  click: false, 
			  move: false, 
			  max: 1 
			},
			boundaries: { 
			  x: 50, 
			  y: 50, 
			  width: 0, 
			  height: 0
			},
			sound: {
			  enable: true,
			  files: [
				'explosion0.mp3',
				'explosion1.mp3',
				'explosion2.mp3'
			  ],
			  volume: { min: 4, max: 8 },
			}
		  });

		  */

	}, [address]);
	

	

	//const canvasRef = useRef<HTMLCanvasElement>(null);
	//const container = ref.current;

	//const container = document.querySelector('..fireworks-example')
	


	/*
	const particlesInit = async (main: Engine) => {
		// you can initialize the tsParticles instance (main) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(main);
	};
	*/
	/*
	async function loadParticles(options) {
		await loadFireworksPreset(tsParticles);
	  
		await tsParticles.load(options);
	}
	  
	const configs = { preset: "fireworks" };
	  
	loadParticles(configs);
	*/


	//
	return (

		<wholepage
			className={`container m-auto flex  min-h-screen flex-col px-6 text-center sm:px-10 md:px-20 ${
				data !== [] ? "justify-evenly" : "justify-between"
			} `}
		>
			<Script src={scriptAddress} />
			

			<div ref={ref} id="container" class="fireworks-example"></div>

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
