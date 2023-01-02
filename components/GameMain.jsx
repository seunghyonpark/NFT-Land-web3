import React from "react";
import GameCard from "./GameCard/GameCard";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect, useRef, forwardRef } from "react";

export default function GameMain({
	selectedCard,
	setSelectedCard,
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

	const itemEls = useRef(new Array());
	//const itemEls = forwardRef(new Array());
	
	const [cardStyles, setcardStyles] = useState([]);


	useEffect(() => {


		console.log("selectedCard", selectedCard);

		/*
		if (data.length > 0) {
			if (selectedCard === "") {
				itemEls.current[0].style.cssText = "border-color: yellow; border-width: 7px;";
			}
		}
		*/


	}, [selectedCard]);
	


	const handleClick = (nft) =>  {

		//cardData.selected = true;

		//console.log('cardData.selected', cardData.selected);

		//console.log("itemEls", itemEls.current[0]);

		setSelectedCard(nft);

		let idx;
		for(idx=0; idx < data.length; idx++) {
			if (data[idx].tokenId === nft.tokenId) {
				itemEls.current[idx].style.cssText = "border-color: #EA3385; border-width: 7px;";

				data[idx].cssText = "border-color: yellow; border-width: 7px;";
			} else {
				itemEls.current[idx].style.cssText = "border-color: transparent; border-width: 0px;";

				data[idx].cssText = "border-color: transparent; border-width: 0px;";
			}
		}



		//itemEls.current[0].GameCard.cardData.selected = true;
		//itemEls.current[0].style.backgroundColor = "yellow";

		


		//console.log("aaaaaa",itemEls[0].current);


		//ref.current.style.backgroundColor = "yellow";

		//ref.current.style.border-width = 6;

		//border-width: 8px;

		//ref.current.style.display = "none";

		//ref.current.style.className = "m-auto flex  max-w-[70%] flex-col rounded-lg  border-8 border-gray-300 p-3 sm:m-0 sm:max-w-lg hover:mix-blend-hard-light";

	}




	//return data.lenghth > 0 && (
	return (




		<main>

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


				<div className="rounded-lg p-1"
					key={nft.tokenId}
					//onClick={(e) => handleClick(e)}
					onClick={(e) => {
						e.preventDefault(); 
						handleClick(nft);
					}}
					ref={(element) => itemEls.current.push(element)}
				>

					
					<GameCard
						//key={uuidv4()}

						//key={nft.tokenId}
						
						//ref={(element) => itemEls.current.push(element)}
						
						cardData={nft}
						cryptoTowerAddress={cryptoTowerAddress}
						loadingCubesAddress={loadingCubesAddress}
						data={data}
						depositNFT={depositNFT}
						withdrawNFT={withdrawNFT}
						selectNFT={selectNFT}

						
					>
						
					</GameCard>

				</div>


				))}
			</div>




			<div className="">
				<button
					
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300
						disabled:opacity-25"
					onClick={(e) => {
						e.preventDefault(); 
						depositNFT(selectedCard.tokenId);
					}}
					
				>
						Stake
				</button>&nbsp;&nbsp;
				<button
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300
					"
					onClick={(e) => {
						e.preventDefault();
						withdrawNFT(selectedCard.tokenId);
					}}
					
				>
						Unstake
				</button>
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