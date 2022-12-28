import React from "react";
import NFTCard from "./NFTCard";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect, useRef } from "react";

export default function MintMain({
	data,
	isInHome,
	isLoading,
	isConnectWallet,
	cryptoTowerAddress,
	loadingCubesAddress,
	goldFishAddress,
	depositNFT,
	withdrawNFT,
}) {


	//return data.lenghth > 0 && (
	return (

		<main>



			{/* cards container */}


			<cards className="mt-4 grid justify-center gap-5 md:grid-cols-3 lg:grid-cols-4 ">
				{data?.map((nft) => (
					// uuid!
					<NFTCard
						key={uuidv4()}
						cardData={nft}
						cryptoTowerAddress={cryptoTowerAddress}
						loadingCubesAddress={loadingCubesAddress}
						data={data}
						depositNFT={depositNFT}
						withdrawNFT={withdrawNFT}
					>
					</NFTCard>
				))}
			</cards>





			{
			(data.length === 0) && (isInHome === false) && (isLoading === false) &&
				<div className="m-auto h-[18rem] w-[15rem] -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
				<lottie-player
					id="crypto-tower"
					src={cryptoTowerAddress}
					speed="1"
					loop
					autoplay
				></lottie-player>
			</div>			
			}
		

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
			{/*
			isLoading && (
				<div className="m-auto h-[18rem] w-[18rem] -translate-y-5 opacity-80 drop-shadow-xl">
					<lottie-player
						id="loading-cubes"
						src={loadingCubesAddress}
						speed="1"
						loop
						autoplay
					></lottie-player>
				</div>
			)
			*/}
			
		</main>

	);
}
