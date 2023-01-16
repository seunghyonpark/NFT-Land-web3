import React from "react"
//import NFTCardStaked from "./NFTCardStaked"

//import GameCardStaked from "./GameCardStaked/index.jsx"

import SelectedCard from "../SelectedCard/index.jsx"


import { v4 as uuidv4 } from "uuid"

import { useState, useEffect, useRef } from "react";


export default function MintingPage ({
    mintNFT,
    chainId,
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

		if (address === "") {

			setDisplayAddress("");

		} else {

			setDisplayAddress(String(address).substring(0,4) + "...." + String(address).slice(-4));

		}

		return () => {
		
		}

	}, [address]);
	


		
		//////<main className="hover:bg-gradient-to-r">
	

		

	//return data.lenghth > 0 && (
	return (

		<main className="">

			<h1 className=" text-right text-2xl font-extrabold text-amber-400 drop-shadow-xl truncate ">
				{displayAddress} 
			</h1>

			<h1 className="mt-5 text-center text-2xl font-extrabold text-amber-400 drop-shadow-xl ">
				Mint my NFT
			</h1>


{/*bg-[url('/img_tomo.png')]*/}

			<div className="
				mt-5 
			 	bg-contain
				bg-no-repeat 

				bg-top
				
				min-h-screen

				bg-[url('/img_tomo.png')]

			  "
			  >	


		






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


            <button
				//ref={refMint}
				onClick={mintNFT}
				className={` ${chainId === "8217" && "" }
				my-5  self-center rounded-lg bg-amber-400 px-5 py-1
				font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300 
				`}
			>
					Mint NFT
			</button>
			

			</div>
			
		


		</main>

	);
}
