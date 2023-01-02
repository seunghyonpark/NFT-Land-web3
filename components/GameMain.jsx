import React from "react";
import GameCard from "./GameCard/GameCard";
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
	mintNFT,
}) {




	//return data.lenghth > 0 && (
	return (
		<main>
			<h1 className="text-left text-2xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">My NFT</a>
			</h1>



			{/*
			<div className="bg-auto bg-no-repeat bg-center bg-[url('/img_rex.png')]">
	*/}
			

			<div className="bg-gradient-to-bl from-blue-900">


			<div className="bg-gradient-to-l from-blue-500">


			<ul role="list" className="p-6 divide-y divide-slate-200">
				<li className="flex py-4 first:pt-0 last:pb-0">
					
					<div className="mt-3 h-12 w-12 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="gold-fish"
							src={goldFishAddress}
							speed="5"
							loop
							autoplay
						></lottie-player>
					</div>

					<div className="ml-3 overflow-hidden text-right">
						<p className="text-xs font-medium text-slate-200">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Staking Count (GDX)
						</p>
						<p className="text-3xl text-amber-400 truncate">5</p>
					</div>
				</li>

				<li className="flex py-4 first:pt-0 last:pb-0">
					
					<div className="mt-3 h-12 w-12 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="crypto-tower"
							src={depositingNFTAddress}
							speed="1"
							loop
							autoplay
						></lottie-player>
					</div>

					<div className="ml-3 overflow-hidden text-right">
						<p className="text-xs font-medium text-slate-200">
						Current Earned Total ($SML)
						</p>
						<p className="text-3xl text-amber-400 truncate">3243.13</p>
					</div>

					{/*
					<img class="h-5 w-5 rounded-full" src="./sml.png" alt="" />
					*/}

				</li>

			</ul>

			</div>


			

			{/* cards container */}
			<div className="mt-4 grid justify-center gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 p-5
				">
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
			</div>

			<button
				onClick={mintNFT}
				className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
			>
					Mint NFT
			</button>

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


			{/*
			</div>
		*/}
			
		</main>

	);
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