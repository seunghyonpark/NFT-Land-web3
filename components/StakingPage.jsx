import React from "react"
//import NFTCardStaked from "./NFTCardStaked"

//import GameCardStaked from "./GameCardStaked/index.jsx"

import SelectedCard from "./SelectedCard/index.jsx"


import { v4 as uuidv4 } from "uuid"

import { useState, useEffect, useRef } from "react";


export default function StakingPage ({
	nftName,
	nftSymbol,
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
	
	////console.log("StakingPage nftName", nftName);

	/*
	let displayAddress = "";
	
	if (address !== undefined && address !== "") {
		displayAddress = String(address).substring(0,4) + "...." + String(address).slice(-4);

		console.log("displayAddress", displayAddress);
	}
	*/

	const [displayAddress, setDisplayAddress] = useState("");



	useEffect(() => {

		console.log("StakingPage useEffect address", address);

		if (address === "") {

			setDisplayAddress("");

		} else {

			const wallet = address[0];

			setDisplayAddress(String(wallet).substring(0,4) + "...." + String(wallet).slice(-4));

		}

		return () => {
		
		}

	}, [address]);
	


		
		//////<main className="hover:bg-gradient-to-r">
	

		

	//return data.lenghth > 0 && (
	return (


		<div className=" border
			flex flex-col">


			<div className=" 
				
				m-3
				
			">
	
				<h1 className=" 
					text-right text-2xl font-extrabold text-amber-400 drop-shadow-xl truncate
					">
					{displayAddress}
				</h1>

				<h1 className=" 
					mt-5 text-center text-2xl font-extrabold text-amber-400 drop-shadow-xl
					">
					{selectedCard.staking !== "true" && <p>Ready to Stake</p>}
					{selectedCard.staking === "true" && <p>Now Staking...</p>}


					
				</h1>


{/*bg-[url('/img_tomo.png')]*/}



			{/* cards container */}
			{/*
			<cards className=" mt-1 grid justify-center gap-5 md:grid-cols-1 lg:grid-cols-1
			">
	*/}

					
				<SelectedCard
					key={uuidv4()}
					nftName={nftName}
					nftSymbol={nftSymbol}
					selectedCard={selectedCard}
					cryptoTowerAddress={cryptoTowerAddress}
					loadingCubesAddress={loadingCubesAddress}
					depositingNFTAddress={depositingNFTAddress}
					dataProcessingAddress={dataProcessingAddress}
					setTokenId={setTokenId}
					withdrawNFT={withdrawNFT}
				>
				</SelectedCard>
			
		
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


			</div>
			

		</div>

	);
}
