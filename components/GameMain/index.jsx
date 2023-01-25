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


	const [showModal, setShowModal] = React.useState(false);
	const [showModalUnstake, setShowModalUnstake] = React.useState(false);


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






	/*

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

	*/


	const handleClick = (nft) =>  {

		console.log("GameMain handleClick tokenId", nft.tokenId);


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

		let idx;
		for(idx=0; idx < data.length; idx++) {
			data[idx].selected = false;
		}
		
		nft.selected = true;

	
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
					
					{/*
					<div className="mt-3 ml-6 h-12 w-12 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="gold-fish"
							src={goldFishAddress}
							speed="5"
							loop
							autoplay
						></lottie-player>
					</div>
	*/}

					<Image
						className=" ml-6 h-12 w-12 " 
						src={`/staking_count.gif`}
						alt={`${nftSymbol}`}
						width={500}
						height={500} 
					/>

					<div className="flex-auto mr-5 overflow-hidden text-right">
						<p className="text-normal font-medium text-slate-200">
							Staking Count ({nftSymbol})
						</p>

                        <div className={classes.number}>{stakingCount} / {holdingCount}</div>


					</div>
				</li>

				<li className="flex py-3 first:pt-0 last:pb-0">
					
					{/*
					<div className="mt-3 ml-7 h-10 w-10 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="crypto-tower"
							src={depositingNFTAddress}
							speed="1"
							loop
							autoplay
						></lottie-player>
					</div>
*/}

					<Image
						className=" ml-6 h-12 w-12 " 
						src={`/current_earned_${nftSymbol}.gif`}
						alt={`${nftSymbol}`}
						width={500}
						height={500} 
					/>


					<div className="flex-auto mr-5 overflow-hidden text-right">
						<p className="text-normal font-medium text-slate-200">
						Current Earned ($SML)
						</p>

						<div className={classes.number}>{thisMiningAmountTotal}</div>
					</div>

					{/*
					<Image class="h-5 w-5 rounded-full" src="./sml.png" alt="" />
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
				//ref={refScroller} h-screen
				className="
					overflow-y-scroll  
					
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
							key={uuidv4()}

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
					//onClick={(e) => {
					//	e.preventDefault();
					//	withdrawNFT(selectedCard.tokenId);
					//}}

					onClick={() => setShowModalUnstake(true)}
					
				>
						Unstake
				</button>
			</div>


			{/*
			<button
				ref={refMint}
				onClick={mintNFT}
				className={` ${chainId === "8217" && "" }
				my-5  self-center rounded-lg bg-amber-400 px-5 py-1
				font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300 
				`}
			>
					Mint NFT
			</button>
			*/}
				

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
			<button
				className="float-right mt-3 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
				type="button"
				onClick={() => setShowModal(true)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
				</svg>
      		</button>	

		*/}


			<div className="flex flex-row">
				<div className="flex-1"></div>
				<Image
					onClick={() => setShowModal(true)}
					className=" ml-6 h-12 w-12 flex-none" 
					src={`/notice.gif`}
					alt={`notice`}
					width={500}
					height={500} 
				/>
			</div>

			{showModal ? (
				<>
				<div
					className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none
					 "
				>
					<div className="relative w-auto my-6 mx-auto max-w-3xl">
					{/*content*/}
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-blue-700 outline-none focus:outline-none ">
						{/*header*/}
						<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
						<h3 className="text-3xl font-semibold text-white ">
							Information
						</h3>

						</div>
						{/*body*/}
						<div className="relative p-6 flex-auto ">
						<p className="my-4 text-white text-lg leading-relaxed text-left  ">

	1. 스테이킹 기간은 단일 싸이클 5년 고정이며, 싸이클 만기 후 각 NFT의 스테이킹 기간인 5년을 모두 채워야 Claim 신청이 가능하다.<br></br>
	<br></br>
	2. Claim이 신청되면 관리자는 해당 내용을 바탕으로 익월초 홀더가 제출한 지갑 주소로 SML토큰을 에어드랍 한다. / ex. 당월 클레임 신청자는 익월 초 NFT소각 및 SML토큰 에어드랍 순차적으로 진행<br></br>
	<br></br>
	3. 홀더가 Claim을 신청하면 해당 M.E.(메타익스플로러즈) NFT는 소각되며, 스테이킹 보상으로 2,000개의 SML토큰을 수령할 수 있게 된다.<br></br>
	<br></br>
	3. 싸이클 만기(5년) 이전에 Unstake 실행 시, 스테이킹은 해제되며 홀더는 M.E. NFT를 돌려받을 수 있다. 다만 그동안 마이닝 된 토큰은 모두 소멸된다.<br></br>
	<br></br>
	4. 스테이킹 해제로 인해 소멸된 토큰은 이후 동일한 M.E로 다시 스테이킹을 시작하여도 절대 복구되지 않으며 새로운 스테이킹 싸이클 시작 시 마이닝 수량은 0부터 시작된다.
	<br></br>			
						</p>
						</div>
						{/*footer*/}
						<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">



						<button
							className={`
								my-5 w-auto self-center rounded-lg bg-regal-red px-5 py-1 font-normal text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300
							`}
							onClick={() => setShowModal(false)}
							
						>
								CLOSE
						</button>



						{/*	
						<button
							className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() => setShowModal(false)}
						>
							Close
						</button>
						*/}
						{/*
						<button
							className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() => setShowModal(false)}
						>
							Save Changes
						</button>
						*/}
						</div>
					</div>
					</div>
				</div>
				<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}






			{showModalUnstake ? (
				<>
				<div
					className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none
					 "
				>
					<div className="relative w-auto my-6 mx-auto max-w-3xl">
					{/*content*/}
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-blue-700 outline-none focus:outline-none ">
						{/*header*/}
						<div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
							<h3 className="text-3xl font-semibold text-slate-200 ">
								Unstake Alert
							</h3>
						</div>
						{/*body*/}
						<div className="relative p-6 flex-auto ">
						<p className="my-4 text-slate-200 text-lg leading-relaxed text-center  ">

						현재 Staking 중인 M.E NFT를 Unstake<br></br>하시면 지금까지 마이닝 된 SML 토큰이<br></br>모두 소멸됩니다. <br></br>
						정말 Unstake 하시겠습니까?<br></br>	

						</p>
						</div>
						{/*footer*/}
						<div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">



						<button
							className={`
								
								mr-3 my-5 w-auto self-center rounded-lg bg-slate-500 px-5 py-1 font-normal text-slate-200 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300
							`}
							onClick={() => setShowModalUnstake(false)}
							
							
						>
								Cancel
						</button>

						<button
							className={`
								
								ml-3 my-5 w-auto self-center rounded-lg bg-regal-red px-5 py-1 font-normal text-slate-200 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300
							`}
							onClick={(e) => {
								e.preventDefault();
								setShowModalUnstake(false);
								withdrawNFT(selectedCard.tokenId);
							}}
							
						>
								Unstake
						</button>



						{/*	
						<button
							className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() => setShowModal(false)}
						>
							Close
						</button>
						*/}
						{/*
						<button
							className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() => setShowModal(false)}
						>
							Save Changes
						</button>
						*/}
						</div>
					</div>
					</div>
				</div>
				<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}


		
			
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




