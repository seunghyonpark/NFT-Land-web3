import React from "react"
//import NFTCardStaked from "./NFTCardStaked"

import GameCardStaked from "./GameCardStaked/index.jsx"

import SelectedCard from "./SelectedCard/index.jsx"


import { v4 as uuidv4 } from "uuid"

import { useState, useEffect, useRef } from "react";


export default function StakingPage({
	selectedCard,
	address,
	stakeData,
	isInHome,
	isLoading,
	isConnectWallet,
	cryptoTowerAddress,
	goldFishAddress,
	loadingCubesAddress,
	depositingNFTAddress,
	dataProcessingAddress,
	setTokenId,
	withdrawNFT,
}) {
	

	/*
	let displayAddress = "";
	
	if (address !== undefined && address !== "") {
		displayAddress = String(address).substring(0,4) + "...." + String(address).slice(-4);

		console.log("displayAddress", displayAddress);
	}
	*/

	const [displayAddress, setDisplayAddress] = useState("");

	
	useEffect(() => {

		//console.log("StakingPage useEffect selectedCard", selectedCard);



		if (address === "") {

			setDisplayAddress("");

		} else {

			setDisplayAddress(String(address).substring(0,4) + "...." + String(address).slice(-4));

		}

		return () => {
		
		}

	}, [address, setDisplayAddress]);
	




	//return data.lenghth > 0 && (
	return (

		<main>



		

			{/* logotype */}

			<h1 className=" text-right text-1xl font-extrabold text-amber-400 drop-shadow-xl truncate">
				{displayAddress} 
			</h1>

			<h1 className="mt-1 text-center text-2xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">Ready to Staking</a>
			</h1>

			<cards className="
				mt-5 grid justify-center gap-10 md:grid-cols-1 lg:grid-cols-1 
			 	bg-cover bg-no-repeat 
				bg-[url('/img_tomo.png')]
				

				bg-center

			  "
			  >	









			{/* cards container */}
			{/*
			<cards className=" mt-1 grid justify-center gap-5 md:grid-cols-1 lg:grid-cols-1
			">
	*/}

			
					
					<GameCardStaked
						key={uuidv4()}
						cardData={selectedCard}
						cryptoTowerAddress={cryptoTowerAddress}
						loadingCubesAddress={loadingCubesAddress}
						depositingNFTAddress={depositingNFTAddress}
						dataProcessingAddress={dataProcessingAddress}
						setTokenId={setTokenId}
						withdrawNFT={withdrawNFT}
					>
					</GameCardStaked>
			
		
		{/*
			</cards>
*/}

			




			{/*
			(stakeData?.length === 0) && (isInHome === false) && (isLoading === false) &&
				<div className="m-auto h-[18rem] w-[15rem] -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
				<lottie-player
					id="crypto-tower"
					src={goldFishAddress}
					speed="1"
					loop
					autoplay
				></lottie-player>
				</div>			
				*/}

			

			</cards>
			
		

		</main>

	);
}
