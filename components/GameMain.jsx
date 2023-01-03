import React from "react";
import GameCard from "./GameCard/GameCard";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect, useRef, forwardRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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
	stakingCount,
	setStakingCount,
}) {

	const itemEls = useRef(new Array());
	//const itemEls = forwardRef(new Array());
	
	const [cardStyles, setcardStyles] = useState([]);


	const refStake = useRef(null);
	const refUnstake = useRef(null);


	const [posts, setPosts] = useState(data);
	const [miningAmountTotal, setMiningAmountTotal] = useState("0");


	const [hasMore, setHasMore] = useState(true);

	const getMorePost = async () => {
		const res = await fetch(
		  `https://jsonplaceholder.typicode.com/todos?_start=${posts.length}&_limit=10`
		);
		const newPosts = await res.json();
		setPosts((post) => [...post, ...newPosts]);
	};


	useEffect(() => {


		console.log("selectedCard", selectedCard);

		let miningAmountTotal = "0";
		for(let idx=0; idx < data.length; idx++){
			if (data[idx].staking === "true") {
				miningAmountTotal = String(Number(miningAmountTotal) + Number(data[idx].miningAmount));

				console.log("miningAmount", data[idx].miningAmount);
			}
		}


		setMiningAmountTotal(String(Number(miningAmountTotal).toFixed(2)));

		console.log("miningAmountTotal", miningAmountTotal);

		

		/*
		if (data.length > 0) {
			if (selectedCard === "") {
				itemEls.current[0].style.cssText = "border-color: yellow; border-width: 7px;";
			}
		}
		*/
		/*
		if (data.length > 0) {
			//setSelectedCard(data[0]);
			handleClick(data[0]);
		}
		*/
 
	}, [data, selectedCard, setSelectedCard, setMiningAmountTotal]);
	


	const handleClick = (nft) =>  {

		//cardData.selected = true;

		//console.log('cardData.selected', cardData.selected);

		//console.log("itemEls", itemEls.current[0]);

		setSelectedCard(nft);



		let idx;
		for(idx=0; idx < data.length; idx++) {
			if (data[idx].tokenId === nft.tokenId) {
				itemEls.current[idx].style.cssText = "border-color: rgb(234,51,133); border-width: 7px;";

				data[idx].cssText = "border-color: yellow; border-width: 7px;";
			} else {
				itemEls.current[idx].style.cssText = "border-color: transparent; border-width: 0px;";

				data[idx].cssText = "border-color: transparent; border-width: 0px;";
			}
		}

		if (nft.staking === "true") {
			refStake.current.style.display = "none";
			refUnstake.current.style.display = "";
		} else {
			refStake.current.style.display = "";
			refUnstake.current.style.display = "none";
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


			<ul role="list" className="p-3 divide-y divide-slate-200">
				<li className="flex py-1 first:pt-0 last:pb-0">
					
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
						<p className="text-3xl text-amber-400 truncate">{stakingCount}</p>
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
						<p className="text-3xl text-amber-400 truncate">{miningAmountTotal}</p>
					</div>

					{/*
					<img class="h-5 w-5 rounded-full" src="./sml.png" alt="" />
					*/}

				</li>

			</ul>

			</div>


			
					{/*
			<InfiniteScroll
				dataLength={data.length}
				next={() => console.log("fetching more data")}
				hasMore={true}
				loader={
					<h3 className="text-3xl text-amber-400">Loading...</h3>
				}
				endMessage={
					<h4 className="text-3xl text-amber-400">Nothing more to show</h4>
				}
			>
			*/}

			<div className="mt-1"></div>



			<div className="bg-gradient-to-l from-blue-500 ">


			<div className=" overflow-y-scroll box-content h-96 ">

				<div className="mt-2 text-normal text-amber-400">Select your M.E. NFTs</div>

				{/* cards container */}
				<div className="mt-1 grid justify-center gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 p-5
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

					{data.length === 0 &&
						
						<div>
							<h3 className="text-xl text-amber-400">No exist...</h3>
						</div>
						
						
					}

				</div>


				{/*
				</InfiniteScroll>
					*/}
			
			</div>


			<div className="">
				<button
					ref={refStake}
					className=" my-5 w-auto self-center rounded-lg bg-regal-red px-5 py-1 font-normal text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300
						disabled:opacity-25"
					onClick={(e) => {
						e.preventDefault(); 
						depositNFT(selectedCard.tokenId);
					}}
					
				>
						Stake
				</button>&nbsp;&nbsp;
				<button
					ref={refUnstake}
					className=" my-5 w-auto self-center rounded-lg bg-regal-red px-5 py-1 font-normal text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300
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


			</div>




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