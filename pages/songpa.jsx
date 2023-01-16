import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import GameHeader from "../components/GameHeader/index";

import StakingHeader from "../components/StakingHeader/index";

import StakingPage from "../components/StakingPage.jsx";
import MintingDashboard from "../components/MintingDashboard.jsx";
import MyPage from "../components/MyPage/index";
import Footer from "../components/Footer/index";
import useGameNFT from "../hooks/useGameNFT.js";


//import useFetchNFTs from "../hooks/use-fetch-NFTs.js";

//import walletAddress from "../constants/walletAddress.json";


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

const projectCodeName = "songpa";


//-----------------------------
export default function Songpa ({
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
	//const [contractAddress, setContractAddress] = useState("0x771b7d7c1bf142f68b8ae72575ae80a08714c714");
	//const [stakingWalletAddress, setStakingWalletAddress] = useState("0x4C85750d5577f71E77Ed137B74A5d5920e468050");


	// wayne@nuklabs.com
	const [contractAddress, setContractAddress] = useState("0xfbcfa5bf7b472921bb5a3628a2a9ec9b4c1cabbc");
	const [stakingWalletAddress, setStakingWalletAddress] = useState("0x65410526d780ecbf15be9b8c5446364b9a4c71af");



	//setContractAddress("0xd2e641b4dccc8d7c80a020324db1fcbf457f1363"); // 오류

	const [baseURI, setBaseURI] = useState("https://gogodino.saltmarble.io/metaexplorers/json");



	const [nftSymbol, setNftSymbol] = useState("GDX");
	const [nftName, setNftName] = useState("GOGO DINO META EXPLORERS");


	

	//console.log("Game contractAddress", contractAddress);
	//console.log("Game stakingWalletAddress", stakingWalletAddress);

	

	//const [selectedCard, setSelectedCard] = useState("");

	//const router = useRouter();

	// fetch data handler
	//const { fetchNFTs, data, isInHome, isLoading } = useFetchNFTs(address);


	
	//const chainId = "8217"; // cypress
	const chainId = "1001"; // baobab


	const { walletConnected, walletDisconnected, mintNFT, checkNFT, fetchNFTs, depositNFT, withdrawNFT, setTokenId, selectNFT,
		stakeDataGlobal,
		data, stakeData, isInHome, isLoading, isConnectWallet, isMinting, isDepositing, isWithdrawing, tokenId,
		holdingCount,
		stakingCount, setStakingCount,
		selectedCard, setSelectedCard,
		miningAmountTotal,
		mintingCountGlobal, stakingCountGlobal, miningAmountGlobal,
	} = useGameNFT(address, chainId, contractOwnerAddress, contractAddress, stakingWalletAddress, baseURI, nftSymbol);


	const ref = useRef();

	

	//console.log("baobab stakeDataGlobal", stakeDataGlobal);

	//setAddress(session?.user);


	useEffect(() => {

		// info@nuklabs.com
		/*
		if (contractAddress === "0x771b7d7c1bf142f68b8ae72575ae80a08714c714") {
			setNftName("GOGO DINO META EXPLORERS");
			setNftSymbol("GDX");
			setBaseURI("https://gogodino.saltmarble.io/metaexplorers/json");
		} else if (contractAddress === "0xd2e641b4dccc8d7c80a020324db1fcbf457f1363") {
			setNftName("Sunmiya Club");
			setNftSymbol("MIYA");
			setBaseURI("https://miya.sunmiya.club");
		} else if (contractAddress === "0x4c941de2f98336d3854acf4ebe8e86f5db2c1a18") {
			setNftName("Bellygom World");
			setNftSymbol("BELLYGOM");
			setBaseURI("https://belly.bellygom.world");
		}
		*/


		// wayne@nuklabs.com

		if (contractAddress === "0xfb5611f91ce965893d1d36195587233fa04691a6") {
			setNftName("GOGO DINO META EXPLORERS");
			setNftSymbol("GDX");
			setBaseURI("https://gogodino.saltmarble.io/metaexplorers/json");
		} else if (contractAddress === "0xfbcfa5bf7b472921bb5a3628a2a9ec9b4c1cabbc") {
			setNftName("Sunmiya Club");
			setNftSymbol("MIYA");
			setBaseURI("https://miya.sunmiya.club");
		} else if (contractAddress === "0xd3bfc0bf408c0fd73e44110349c6db2e60b35be1") {
			setNftName("Bellygom World");
			setNftSymbol("BELLYGOM");
			setBaseURI("https://belly.bellygom.world");
		} else if (contractAddress === "0xd8940245a37a301576eae6ea0348392ade2b8d5d") {
			setNftName("BIRDIESHOT");
			setNftSymbol("BIRDIE");
			setBaseURI("https://live.bdst.kakaogames.com:10443/assets/nft");
		}


	}, [contractAddress]);







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
				<title>GANGNAM</title>
				<meta
					name="GANGNAM EXPLORERS"
					content="GANGNAM EXPLORERS"
				/>
				<link rel="icon" href="/favicon.ico" />

				{/*
				<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
				*/}

				<meta property="og:type" content="website"></meta>

				<meta property="og:site_name" content="GANGNAM"></meta>
				<meta property="og:title" content="GANGNAM"></meta>
				<meta property="og:description"
					content="
					Sunmiya Club is a Klaytn based PFP NFT project with ‘MIYA’ as a main IP, the character motivated by global K-POP artist Sunmi.

Based on concrete technology and moves, broad networks with industries, and solid communities, we serve as a bridge to connect metaverse and offline,
Sunmiya Club is one representative IP of Web 3.0 era, expanding with our own universe and collaborating with various established industries and metaverse IPs.
					">
				</meta>
				<meta property="og:image" content="https://gdx.nuklabs.xyz/api/og?t=2342332423423"></meta>
				<meta property="og:image:width" content="1400"></meta>
				<meta property="og:image:height" content="1400"></meta>
				
				<meta proterty="og:url"
					content="https://gdx.nuklabs.xyz/gangnam">
				</meta>

				<meta name="description"
					content="
					Sunmiya Club is a Klaytn based PFP NFT project with ‘MIYA’ as a main IP, the character motivated by global K-POP artist Sunmi.

Based on concrete technology and moves, broad networks with industries, and solid communities, we serve as a bridge to connect metaverse and offline,
Sunmiya Club is one representative IP of Web 3.0 era, expanding with our own universe and collaborating with various established industries and metaverse IPs.
					"
				></meta>

				<meta name="twitter:card" content="summary_large_image"></meta> {/*telegram large image */}
				<meta name="twitter:image"
					content="https://gdx.nuklabs.xyz/api/og?t=123494582403423433850097808"
				></meta>


				

				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"></link>
			</Head>




	


			<GameHeader
				{...{
					baseURI,
					setBaseURI,
					contractAddress,
					setContractAddress,
					nftSymbol,
					setNftSymbol,
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

				<MyPage
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
						contractAddress,
						setContractAddress,
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


			<Footer
				{...{
					projectCodeName
				}}
			/>







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