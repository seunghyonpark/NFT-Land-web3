import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import GameHeader2 from "../components/GameHeader2/index.jsx";

import StakingHeader from "../components/StakingHeader/index.jsx";

import StakingPage from "../components/StakingPage.jsx";
import MintingDashboard from "../components/MintingDashboard.jsx";
import GameMain from "../components/GameMain/index.jsx";
import Footer from "../components/Footer.jsx";
import useGameNFT from "../hooks/useGameNFT.js";


//import useFetchNFTs from "../hooks/use-fetch-NFTs.js";

import contractAddressNFT from "../constants/contractAddressNFT.json";

import stakingAddress from "../constants/stakingAddress.json";


import { useRouter } from 'next/router';

//import { readFileSync } from 'fs';
//import path from 'path';


import { Fireworks } from 'fireworks-js';

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


import RouteGuard from "../components/RouteGuard.jsx";

import { useSession, signIn, signOut } from 'next-auth/react';

import { GetServerSideProps } from 'next';

const options = {
    //options
};


//-----------------------------
export default function Home({
	contractOwnerAddress,
	scriptAddress,
	cryptoTowerAddress,
	loadingCubesAddress,
	goldFishAddress,
	dataProcessingAddress,
	depositingNFTAddress,
	withdrawingNFTAddress,
	nftWalletAddress,
	testData,
}) {


	//const { data: session, status } = useSession();

	//const [address, setAddress] = useState("0xaD87a8a48E59B1448Dc2317FD7886f2d89132b71");

	//const [address, setAddress] = useState(walletAddress.defaultWalletAddress);
	//const [address, setAddress] = useState(session?.user);
	const [address, setAddress] = useState("");


	// info@nuklabs.com
	const [contractAddress, setContractAddress] = useState("0xf57255329ad3f60b19cb452b68546e11f1fe20df"); // cypress
	//const [stakingWalletAddress, setStakingWalletAddress] = useState("0x4C85750d5577f71E77Ed137B74A5d5920e468050");

	const [stakingWalletAddress, setStakingWalletAddress] = useState("0x4A69370FC9348C2fa887C4DB7328ce3595689c28"); // cypress staking wallet address
	

	//0x6a80D8Afba916f0AAE4B0Dd7B528b2B28eabD567


	// wayne@nuklabs.com
	//const [contractAddress, setContractAddress] = useState("0xfb5611f91ce965893d1d36195587233fa04691a6");
	//const [stakingWalletAddress, setStakingWalletAddress] = useState(stakingAddress.GDX);


	const nftSymbol = "GDX";
	const nftName = "GOGO DINO META EXPLORERS";
	

	//console.log("Game contractAddress", contractAddress);
	//console.log("Game stakingWalletAddress", stakingWalletAddress);

	

	//const [selectedCard, setSelectedCard] = useState("");

	//const router = useRouter();

	// fetch data handler
	//const { fetchNFTs, data, isInHome, isLoading } = useFetchNFTs(address);


	
	const chainId = "8217"; // cypress
	//const chainId = "1001"; // baobab


	const { walletConnected, walletDisconnected, mintNFT, checkNFT, fetchNFTs, depositNFT, withdrawNFT, setTokenId, selectNFT,
		stakeDataGlobal,
		data, stakeData, isInHome, isLoading, isConnectWallet, isMinting, isDepositing, isWithdrawing, tokenId,
		holdingCount,
		stakingCount, setStakingCount,
		selectedCard, setSelectedCard,
		miningAmountTotal,
		mintingCountGlobal, stakingCountGlobal, miningAmountGlobal,
	} = useGameNFT(address, chainId, contractOwnerAddress, contractAddress, stakingWalletAddress, nftSymbol);



	//console.log("baobab stakeDataGlobal", stakeDataGlobal);

	//setAddress(session?.user);


	useEffect(() => {

		/*
		console.log("session?.user", session?.user);

		if (session?.user === undefined) {
			router.push('/');
			
		}
		*/

		/*
		if (address === undefined) {
			//Router.push('/');
	
			router.push('/');
	
			//return;
		}
		*/
		
		//console.log("Minting useEffect address="+address);

		//console.log(ref.current);

		//console.log(document.getElementById('container'));

		//const container = ref.current;

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




	/*

				${
					data !== [] ? "justify-evenly" : "justify-between"
				} 
	*/


	return (






<div className="bg-cover bg-center bg-[url('/milkyway.jpeg')] ">
	
<div className="bg-gradient-to-bl from-black">


	

		<div
			className={`container m-auto  min-h-screen text-center px-5  sm:px-10 md:px-20
			
			
			justify-between

				
			`}
		>






			<Script src={scriptAddress} />
			


			
			

			{/*
			<div ref={ref} id="container" class="fireworks-example"></div>
			*/}


			<Head>
				<title>GOGO DINO META EXPLORERS</title>
				<meta
					name="GOGO DINO META EXPLORERS"
					content="GOGO DINO META EXPLORERS"
				/>
				<link rel="icon" href="/favicon.ico" />

				{/*
				<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
				*/}

				<meta property="og:title" content="GOGO DINO META EXPLORERS"></meta>
				<meta property="og:description" content="SML Project, GOGO DINO, Meta Explorers, NFT Staking"></meta>
				<meta property="og:image" content="/gdx.jpeg"></meta>
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"></link>
			</Head>




	


			<GameHeader2
				{...{
					nftSymbol,
					walletDisconnected,
					address,
					setAddress,
					data,
					mintNFT,
					fetchNFTs,
					isMinting,
					depositingNFTAddress,
					withdrawingNFTAddress,
					nftWalletAddress,
					scriptAddress,
					cryptoTowerAddress,
					goldFishAddress,
					loadingCubesAddress,
					stakingCount,
					miningAmountTotal,
					mintingCountGlobal,
					stakingCountGlobal,
					miningAmountGlobal,
				}}
			/>

{/*
				<StakingHeader
					{...{
						chainId,
						nftSymbol,
						address,
						selectedCard,
						setSelectedCard,
						stakeDataGlobal,
						isInHome,
						isLoading,
						isConnectWallet,
						scriptAddress,
						cryptoTowerAddress,
						goldFishAddress,
						loadingCubesAddress,
						depositingNFTAddress,
						depositNFT,
						withdrawNFT,
						selectNFT,
						mintNFT,
						holdingCount,
						stakingCount,
						setStakingCount,
						miningAmountTotal,
					}}
				/>
				*/}

			{/*isWithdrawing && (
				<div className="m-auto h-[18rem] w-[15rem] -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
				<lottie-player
					id="crypto-tower"
					src={withdrawingNFTAddress}
					speed="1"
					loop
					autoplay
				></lottie-player>
				</div>	
			)*/}

			{/*isDepositing && (
				<div className="m-auto h-[18rem] w-[15rem] -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
				<lottie-player
					id="crypto-tower"
					src={depositingNFTAddress}
					speed="1"
					loop
					autoplay
				></lottie-player>
			</div>	
			)*/}

{/*
			<MintingDashboard
				{...{
					isMinting,
					isDepositing,
					isWithdrawing,
					dataProcessingAddress,
					depositingNFTAddress,
					withdrawingNFTAddress,
					mintNFT,
					checkNFT,
				}}
			/>
			*/}

			<cards className="mt-4 grid justify-center gap-10
				sm:grid-cols-2
				md:grid-cols-2
				lg:grid-cols-2
				xl:grid-cols-2

				grid-cols-1 ">	

				<GameMain
					{...{
						chainId,
						nftSymbol,
						address,
						selectedCard,
						setSelectedCard,
						data,
						isInHome,
						isLoading,
						isConnectWallet,
						scriptAddress,
						cryptoTowerAddress,
						goldFishAddress,
						loadingCubesAddress,
						depositingNFTAddress,
						depositNFT,
						withdrawNFT,
						selectNFT,
						mintNFT,
						holdingCount,
						stakingCount,
						setStakingCount,
						miningAmountTotal,
					}}
				/>

				<StakingPage
					{...{
						nftName,
						nftSymbol,
						selectedCard,
						address,
						stakeData,
						isInHome,
						isLoading,
						isConnectWallet,
						scriptAddress,
						cryptoTowerAddress,
						goldFishAddress,
						loadingCubesAddress,
						depositingNFTAddress,
						dataProcessingAddress,
						setTokenId,
						withdrawNFT,
					}}
				/>

			</cards>


			<Footer />







		</div>



		</div>
		</div>


	);
}



//  --------------------------------
export async function getStaticProps() {

	console.log("getStaticProps===============");


	// async/await testing!
	let scriptAddress =
		"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";

	let cryptoTowerAddress =
		//"https://assets3.lottiefiles.com/packages/lf20_2omr5gpu.json";

		"https://assets2.lottiefiles.com/packages/lf20_dufevbi4.json";
		
	let loadingCubesAddress =
		"https://assets4.lottiefiles.com/private_files/lf30_c52paxfj.json";

	let goldFishAddress =
		"https://assets8.lottiefiles.com/packages/lf20_bmbkcawq.json";

	let dataProcessingAddress =
		"https://assets10.lottiefiles.com/private_files/lf30_x4ubhxsy.json";

	let depositingNFTAddress =
		//"https://assets4.lottiefiles.com/packages/lf20_HnQwluAHJd.json";
		"https://assets4.lottiefiles.com/packages/lf20_moQNlY.json";
	
	let withdrawingNFTAddress =
		"https://assets3.lottiefiles.com/packages/lf20_4HwMFcslUL.json";

	let nftWalletAddress =
		"https://assets2.lottiefiles.com/packages/lf20_4vq5kmpx.json";


	

	const contractOwnerAddress = process.env.OWNER_PUBLIC_KEY_WAYNE;



	//const file = path.join(process.cwd(), 'posts', 'test.json');
	//const testData = readFileSync(file, 'utf8');


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

/*
	//const defaultWalletAddress = "0xfD18f01C8c87DA4aa6F543a46d6AaFf912098868";

	const response = await fetch(`/api/game-fetch-nfts?wallet=0xfD18f01C8c87DA4aa6F543a46d6AaFf912098868`);

	const posts = await response.json();

	console.log("posts", posts);
*/

	return {
		props: {
			contractOwnerAddress,
			scriptAddress,
			cryptoTowerAddress,
			loadingCubesAddress,
			goldFishAddress,
			dataProcessingAddress,
			depositingNFTAddress,
			withdrawingNFTAddress,
			//testData,
			//posts,
		},
		revalidate: 10,
	};
}



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


/*
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });
	if (!session) {
	  return {
		redirect: {
		  permanent: false,
		  destination: '/'
		}
	  };
	}
  
	const results = await getAllUsers();
	const totalUsers = await getUserCount();
  
	const user = await getUser(session.username as string);
  
	const meta = {
	  ...defaultMetaProps,
	  title: `Settings | MongoDB Starter Kit`
	};
  
	return {
	  props: {
		meta,
		results,
		totalUsers,
		user
	  }
	};
  };
  */