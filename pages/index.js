import Head from "next/head";
import { useState, useEffect } from "react";
import Script from "next/script";
import GameHeader from "../components/GameHeader/index.jsx";
import Header from "../components/Header.jsx";
import Main from "../components/Main.jsx";
import Footer from "../components/Footer.jsx";
import useFetchNFTs from "../hooks/use-fetch-NFTs.js";
import Link from 'next/link';


//-----------------------------
export default function Home({
	scriptAddress,
	cryptoTowerAddress,
	loadingCubesAddress,
}) {
	
	const [address, setAddress] = useState("");

	// fetch data handler
	const {fetchNFTs, data, isInHome, isLoading} = useFetchNFTs(address);


	/*
	const loadAccountInfo = async () => {

		console.log("loadAccountInfo");

		const { klaytn } = window;
	
		if (klaytn) {
			try {
				await klaytn.enable();

				setAccountInfo();

				//klaytn.on('accountsChanged', () => this.setAccountInfo(klaytn));
			} catch (error) {
				console.log('User denied account access');
			}
		} else {
			console.log('Non-Kaikas browser detected. You should consider trying Kaikas!');
		}
	}
	*/

	/*
	componentDidMount() {
		this.loadAccountInfo();
		//this.setNetworkInfo()
	}
	*/

	/*
	useEffect(function () {
		//loadAccountInfo();
	}, []);
	*/
	
				/*
			className={`container m-auto flex  min-h-screen flex-col px-6 text-center sm:px-10 md:px-20
				${data !== [] ? "justify-evenly" : "justify-between"}
			`}


						className="container m-auto flex  min-h-screen flex-col px-6 text-center sm:px-10 md:px-20
			 justify-evenly
			"

			<Script src={scriptAddress} />
	*/



	//
	return (

		<div className="bg-cover bg-center bg-[url('/milkyway.jpeg')] ">

		<div className="bg-gradient-to-bl from-black">


		<wholepage
			className={`container m-auto flex  min-h-screen flex-col px-5 text-center sm:px-10 md:px-20 ${
				data !== [] ? "justify-evenly" : "justify-between"
				
			} 
			`}
		>
			<Script src={scriptAddress} />
			

			
			
			<Head>
				<title>GOGO DINO META EXPLORERS</title>
				<meta
					name="GOGO DINO META EXPLORERS"
					content="GOGO DINO META EXPLORERS"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>


			<Header
				{...{
					address,
					setAddress,
				}}
			/>



			
			<Main
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

		</div>
		</div>
	);
}




//  --------------------------------
export function getStaticProps() {
	// async/await testing!
	let scriptAddress =
		"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";

	let cryptoTowerAddress =
		"https://assets3.lottiefiles.com/packages/lf20_2omr5gpu.json";
		//"https://assets3.lottiefiles.com/packages/lf20_4HwMFcslUL.json";

	let loadingCubesAddress =
		"https://assets4.lottiefiles.com/private_files/lf30_c52paxfj.json";

	return {
		props: {
			scriptAddress,
			cryptoTowerAddress,
			loadingCubesAddress,
		},
	};
}
