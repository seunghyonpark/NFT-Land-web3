import React from "react";
import GameCard from "./GameCard";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect, useRef } from "react";

export default function GameMain({
	data,
	isInHome,
	isLoading,
	isConnectWallet,
	cryptoTowerAddress,
	loadingCubesAddress,
	goldFishAddress,
	depositingNFTAddress,
	depositNFT,
	withdrawNFT,
	selectNFT,
}) {


	//return data.lenghth > 0 && (
	return (
		<main>
			<h1 className="text-left text-2xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">My NFT</a>
			</h1>

			<div class="bg-gradient-to-bl from-blue-900">


			<div class="bg-gradient-to-l from-blue-500">


			<ul role="list" class="p-6 divide-y divide-slate-200">
				<li class="flex py-4 first:pt-0 last:pb-0">
					
					<div className="mt-3 h-12 w-12 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="gold-fish"
							src={goldFishAddress}
							speed="5"
							loop
							autoplay
						></lottie-player>
					</div>

					<div class="ml-3 overflow-hidden text-right">
						<p class="text-xs font-medium text-slate-200">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Staking Count (GDX)
						</p>
						<p class="text-3xl text-amber-400 truncate">5</p>
					</div>
				</li>

				<li class="flex py-4 first:pt-0 last:pb-0">
					
					<div className="mt-3 h-12 w-12 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="crypto-tower"
							src={depositingNFTAddress}
							speed="1"
							loop
							autoplay
						></lottie-player>
					</div>

					<div class="ml-3 overflow-hidden text-right">
						<p class="text-xs font-medium text-slate-200">
						Current Earned Total ($SML)
						</p>
						<p class="text-3xl text-amber-400 truncate">3243.13</p>
					</div>

					{/*
					<img class="h-5 w-5 rounded-full" src="./sml.png" alt="" />
					*/}

				</li>

			</ul>

			</div>


			

			{/* cards container */}
			<cards className="mt-4 grid justify-center gap-5 md:grid-cols-2 lg:grid-cols-3 p-5">
				{data?.map((nft) => (
					// uuid!
					<GameCard
						key={uuidv4()}
						cardData={nft}
						cryptoTowerAddress={cryptoTowerAddress}
						loadingCubesAddress={loadingCubesAddress}
						data={data}
						depositNFT={depositNFT}
						withdrawNFT={withdrawNFT}
						selectNFT={selectNFT}
					>
					</GameCard>
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



			</div>
			
		</main>

	);
}
