import React from "react"
//import NFTCardStaked from "./NFTCardStaked"
import GameCardStaked from "./GameCardStaked/index.jsx"
import { v4 as uuidv4 } from "uuid"

import { useState, useEffect, useRef } from "react";


export default function StakingPage({
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

		console.log("StakingPage useEffect stakeData", stakeData);


		return () => {
			//clearInterval(interval);
			/*
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
			*/			
		}

	}, [stakeData]);





	//return data.lenghth > 0 && (
	return (

		<main >


			{/* logotype */}
			<h1 className="text-left text-2xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">Ready to Staking</a>
			</h1>


			<cards className="mt-4 grid justify-center gap-10 md:grid-cols-1 lg:grid-cols-1 ">	


			<h1 className="invisible text-left text-2xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">Ready to Staking</a>
			</h1>


			{/* cards container */}
			<cards className="mt-4 grid justify-center gap-5 md:grid-cols-1 lg:grid-cols-1">
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
		

			{/* home page animation */}
			{isInHome && (	
				<div className="m-auto h-[18rem] w-[15rem] -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
					<lottie-player
						id="crypto-tower"
						src={cryptoTowerAddress}
						speed="1"
						loop
						autoplay
					></lottie-player>
				</div>
			)}


			{/* data fetching animation */}
			{isLoading && (
				<div className="m-auto h-[18rem] w-[18rem] -translate-y-5 opacity-80 drop-shadow-xl">
					<lottie-player
						id="loading-cubes"
						src={loadingCubesAddress}
						speed="1"
						loop
						autoplay
					></lottie-player>
				</div>
			)}
			

			</cards>
			

		</main>

	);
}
