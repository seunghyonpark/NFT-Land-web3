import React from "react"
//import NFTCardStaked from "./NFTCardStaked"
import GameCardStaked from "./GameCardStaked/index.jsx"
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
	



	useEffect(() => {

		console.log("StakingPage useEffect selectedCard", selectedCard);




		return () => {
			//clearInterval(interval);
			/*
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
			*/			
		}

	}, [selectedCard]);





	//return data.lenghth > 0 && (
	return (

		<main>



		

			{/* logotype */}

			<h1 className="text-center text-1xl font-extrabold text-amber-400 drop-shadow-xl truncate">
				{address} 
			</h1>


			<h1 className="mt-3 text-center text-2xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">Ready to Staking</a>
			</h1>

			<cards className="mt-2 grid justify-center gap-10 md:grid-cols-1 lg:grid-cols-1 
			 bg-cover bg-no-repeat bg-center bg-[url('/img_tomo.png')]">	









			{/* cards container */}
			<cards className=" mt-1 grid justify-center gap-5 md:grid-cols-1 lg:grid-cols-1
			">


				{/*
				{stakeData?.map((nft) => (
					// uuid!
					<GameCardStaked
						key={uuidv4()}
						cardData={nft}
						cryptoTowerAddress={cryptoTowerAddress}
						loadingCubesAddress={loadingCubesAddress}
						depositingNFTAddress={depositingNFTAddress}
						dataProcessingAddress={dataProcessingAddress}
						setTokenId={setTokenId}
						withdrawNFT={withdrawNFT}
					>
					</GameCardStaked>
				))}
				*/}


				{
				(selectedCard !== "") &&
					
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
				}
				
			

			</cards>


			




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
