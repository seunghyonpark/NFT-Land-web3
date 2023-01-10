import React from "react";
import Image from "next/image";
import classes from "./index.module.css";

import GameCard from "../GameCard/GameCard";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect, useRef, forwardRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function GameMain({
	chainId,
	nftSymbol,
	address,
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
	holdingCount,
	stakingCount,
	setStakingCount,
	miningAmountTotal
}) {


	//console.log("GameMain chainId", chainId);

    const [thisMiningAmountTotal, setThisMiningAmountTotal] = useState(Number(miningAmountTotal));



	const itemEls = useRef(new Array());
	//const itemEls = forwardRef(new Array());
	
	const [cardStyles, setcardStyles] = useState([]);


	const refStake = useRef(null);
	const refUnstake = useRef(null);
	const refMint = useRef(null);
	const refScroller = useRef(null);


	const [posts, setPosts] = useState(data);
	


	const [hasMore, setHasMore] = useState(true);

	const getMorePost = async () => {
		const res = await fetch(
		  `https://jsonplaceholder.typicode.com/todos?_start=${posts.length}&_limit=10`
		);
		const newPosts = await res.json();
		setPosts((post) => [...post, ...newPosts]);
	};


	


	useEffect(() => {

        console.log("GameMain miningAmountTotal", miningAmountTotal);

		const numFix = 4;

        if (address === "") {
            const amount = Number(0).toFixed(numFix);
            setThisMiningAmountTotal(amount + " / " + (stakingCount*2000));
            return;
        }

		if (miningAmountTotal === "0") {

			console.log("==========");
			
			const amount = Number(0).toFixed(numFix);
            setThisMiningAmountTotal(amount + " / " + (stakingCount*2000));
            return;
		}
        
        

		let number = Number(miningAmountTotal) * 10000;


		let start = 0;
		const end = 100;

		let incrementTime = 10;
		let timer = setInterval(() => {
			
			if (start <= end) {
                const amount = Number(((number-end) + start) / 10000.0).toFixed(numFix);
				setThisMiningAmountTotal(amount + " / " + (stakingCount*2000));
			} else {
                clearInterval(timer);
                return;
            }
            start += 1;

		}, incrementTime);

		return () => {
			
			clearInterval(timer);
	
		}		

	}, [address, miningAmountTotal, stakingCount]);



	useEffect(() => {

		console.log("GameMain useEffect=========");


		if (address === "") {

			////refScroller.current.style.cssText = "";


			refStake.current.style.display = "none";
			refUnstake.current.style.display = "none";
			refMint.current.style.display = "none";

		} else {
			/////refScroller.current.style.cssText = "overflow-y-scroll box-content h-screen";

			if (data.length === 0) {
				refStake.current.style.display = "none";
				refUnstake.current.style.display = "none";
			} else {
				refStake.current.style.display = "";
				refUnstake.current.style.display = "";
			}


			refMint.current.style.display = "";
			

			/* bug bugbug bug
			let idx;
			for(idx=0; idx < data.length; idx++) {

				if (data[idx].tokenId === selectedCard.tokenId) {
					itemEls.current[idx].style.cssText = "border-color: rgb(234,51,133); border-width: 7px;";
	
					data[idx].cssText = "border-color: yellow; border-width: 7px;";
	
	
				} else {
					itemEls.current[idx].style?.cssText = "border-color: transparent; border-width: 0px;";
	
					data[idx].cssText = "border-color: transparent; border-width: 0px;";
				}
			}
			*/


			if (address) {

				if (data.length === 0) {
					refStake.current.style.display = "none";
					refUnstake.current.style.display = "none";

				} else {
	
					if (selectedCard.staking === "true") {
						refStake.current.style.display = "none";
						refUnstake.current.style.display = "";
					} else {
						refStake.current.style.display = "";
						refUnstake.current.style.display = "none";
					}
				}
			} else {
				refStake.current.style.display = "none";
				refUnstake.current.style.display = "none";
			}


			if (selectedCard) {

			} else {
				refStake.current.style.display = "none";
				refUnstake.current.style.display = "none";
			}

		}


	}, [address, data, selectedCard]);
	


	const handleClick = (nft) =>  {

		console.log("GameMain handleClick tokenId", nft.tokenId);
		console.log("GameMain handleClick miningAmount", nft.miningAmount);

		//cardData.selected = true;

		//console.log('cardData.selected', cardData.selected);

		//console.log("itemEls", itemEls.current[0]);

		setSelectedCard(nft);


		/*
		let idx;
		for(idx=0; idx < data.length; idx++) {
			if (data[idx].tokenId === selectedCard.tokenId) {
				itemEls.current[idx].style.cssText = "border-color: rgb(234,51,133); border-width: 7px;";

				data[idx].cssText = "border-color: yellow; border-width: 7px;";
			} else {
				itemEls.current[idx].style.cssText = "border-color: transparent; border-width: 0px;";

				data[idx].cssText = "border-color: transparent; border-width: 0px;";
			}
		}

		if (selectedCard.staking === "true") {
			refStake.current.style.display = "none";
			refUnstake.current.style.display = "";
		} else {
			refStake.current.style.display = "";
			refUnstake.current.style.display = "none";
		}
		*/

	
	}



	{/*
bg-[url('/circuit.png')]

drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]
*/}


	//return data.lenghth > 0 && (
	return (

		<main
			className="

			"
		>
			
			

			<div className="bg-gradient-to-bl from-blue-900">


			<div className="bg-gradient-to-l from-blue-500">


			<ul role="list" className="p-3 divide-y divide-slate-200">
				<li className="flex py-1 first:pt-0 last:pb-0">
					
					<div className="mt-3 ml-6 h-12 w-12 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="gold-fish"
							src={goldFishAddress}
							speed="5"
							loop
							autoplay
						></lottie-player>
					</div>

					<div className="flex-auto mr-5 overflow-hidden text-right">
						<p className="text-normal font-medium text-slate-200">
							Staking Count ({nftSymbol})
						</p>

                        <div className={classes.number}>{stakingCount} / {holdingCount}</div>


					</div>
				</li>

				<li className="flex py-3 first:pt-0 last:pb-0">
					
					<div className="mt-3 ml-7 h-10 w-10 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="crypto-tower"
							src={depositingNFTAddress}
							speed="1"
							loop
							autoplay
						></lottie-player>
					</div>

					<div className="flex-auto mr-5 overflow-hidden text-right">
						<p className="text-normal font-medium text-slate-200">
						Current Earned ($SML)
						</p>

						<div className={classes.number}>{thisMiningAmountTotal}</div>
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


			<div
				//ref={refScroller}
				className="
					overflow-y-scroll  h-screen
					
				">

				{
                data.length !== 0 &&
					<div className="mt-2 pt-5 text-normal text-amber-400">Select your M.E. NFTs</div>
				}




				{data.length === 0 && 
				
                    <div className="flex flex-col">
                        <Image className="float-center w-full mt-5 p-5 " 
							src={`/gamemain_${nftSymbol}.png`}
                            alt={`${nftSymbol}`}
                            width={500}
                            height={500}
                        />

                        <div className=" mt-5 text-xl text-amber-400">No NFTs</div>
                    </div>
                    
			    }


				{/*data.length === 0 &&	
					<div className=" text-xl text-amber-400">No exist...</div>
                */}

				{isLoading &&
				
					<div className=" text-xl text-amber-400">Loading...</div>
				}



				{/* cards container */}
				<div className="mt-1 grid justify-center gap-5
						grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-5
					">


					{data?.map((nft) => (

					<div className="rounded-lg p-1"
						//key={nft.tokenId}
						key={uuidv4()}
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


				{/*
				</InfiniteScroll>
					*/}
			
			</div>


			<div className="">
				<button
					ref={refStake}
					className={`
						my-5 w-auto self-center rounded-lg bg-regal-red px-5 py-1 font-normal text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300
						disabled:opacity-25
					`}
					onClick={(e) => {
						e.preventDefault(); 
						depositNFT(selectedCard.tokenId);
					}}
					
				>
						Stake
				</button>&nbsp;&nbsp;

				<button
					ref={refUnstake}
					className={`
						my-5 w-auto self-center rounded-lg bg-regal-red px-5 py-1 font-normal text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300
					`}
					onClick={(e) => {
						e.preventDefault();
						withdrawNFT(selectedCard.tokenId);
					}}
					
				>
						Unstake
				</button>
			</div>



			<button
				ref={refMint}
				onClick={mintNFT}
				className={` ${chainId === "8217" && "" }
				my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1
				font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300 
				`}
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