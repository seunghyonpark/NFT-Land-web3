import React from "react";
import Image from "next/image";
import classes from "./index.module.css";

import GameCardStaked from "../GameCardStaked/index";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect, useRef } from "react";
//import InfiniteScroll from "react-infinite-scroll-component";

import Link from 'next/link';


export default function StakingHeader({
	chainId,
	nftSymbol,
	address,
	selectedCard,
	setSelectedCard,
	stakeDataGlobal,
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


	//console.log("StakingHeader stakeDataGlobal", stakeDataGlobal);


	const [showModal, setShowModal] = React.useState(false);


    const [thisMiningAmountTotal, setThisMiningAmountTotal] = useState(Number(miningAmountTotal));


	const itemEls = useRef(new Array());
	//const itemEls = forwardRef(new Array());
	
	const [cardStyles, setcardStyles] = useState([]);


	const refStake = useRef(null);
	const refUnstake = useRef(null);
	const refMint = useRef(null);
	const refScroller = useRef(null);


	const [posts, setPosts] = useState(stakeDataGlobal);
	


	const [hasMore, setHasMore] = useState(true);

	const getMorePost = async () => {
		const res = await fetch(
		  `https://jsonplaceholder.typicode.com/todos?_start=${posts.length}&_limit=10`
		);
		const newPosts = await res.json();
		setPosts((post) => [...post, ...newPosts]);
	};


	


	useEffect(() => {

        ////console.log("StakingHeader miningAmountTotal", miningAmountTotal);

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

		////console.log("StakingHeader useEffect=========");


		if (address === "") {

			////refScroller.current.style.cssText = "";



		} else {
			/////refScroller.current.style.cssText = "overflow-y-scroll box-content h-screen";

			

			/* bug bugbug bug
			let idx;
			for(idx=0; idx < stakeDataGlobal.length; idx++) {

				if (stakeDataGlobal[idx].tokenId === selectedCard.tokenId) {
					itemEls.current[idx].style.cssText = "border-color: rgb(234,51,133); border-width: 7px;";
	
					stakeDataGlobal[idx].cssText = "border-color: yellow; border-width: 7px;";
	
	
				} else {
					itemEls.current[idx].style?.cssText = "border-color: transparent; border-width: 0px;";
	
					stakeDataGlobal[idx].cssText = "border-color: transparent; border-width: 0px;";
				}
			}
			*/


		}


	}, [address, stakeDataGlobal, selectedCard]);
	

	/*
	const handleClick = (nft) =>  {

		////console.log("StakingHeader handleClick tokenId", nft.tokenId);


		//console.log('cardData.selected', cardData.selected);

		//console.log("itemEls", itemEls.current[0]);

		setSelectedCard(nft);


		let idx;
		for(idx=0; idx < stakeDataGlobal.length; idx++) {
			stakeDataGlobal[idx].selected = false;
		}
		
		nft.selected = true;

	
	}
	*/


	{/*
bg-[url('/circuit.png')]

drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]
*/}


	//return stakeDataGlobal.lenghth > 0 && (
	return (

		<div
			className="
			
			"
		>
			
			

			<div className=" bg-gradient-to-bl from-blue-900">


			<div className=" mt-3"></div>




			<div className=" rounded-lg bg-gradient-to-l from-blue-500 ">			


			<div className="flex flex-row
			">
				<div className=" text-left ml-5 mt-0 pt-3 pb-3 text-normal text-amber-400">Staked NFTs</div>
			
				<div className="  ">
					{/*
				<button
					className=" m-5 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
					onClick={() => setShowModal(true)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
					</svg>
				</button>
	*/}
				</div>

{/*
				<Link href="https://testnets.opensea.io/assets/baobab/0x771b7d7c1bf142f68b8ae72575ae80a08714c714/269" passHref={true}>
    <button>StackOverflow</button>
  </Link>

	*/}
			</div>		

			<div
				//ref={refScroller} h-screen
				className="
					overflow-y-scroll
					
				">






				{stakeDataGlobal?.length === 0 && 
				
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


				{/*stakeDataGlobal.length === 0 &&	
					<div className=" text-xl text-amber-400">No exist...</div>
                */}

				{isLoading &&
				
					<div className=" text-xl text-amber-400">Loading...</div>
				}





				{/* cards container */}
				<div className="mt-0 grid justify-center gap-5
						grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3
					">


					{stakeDataGlobal?.map((nft) => (

					<div className="rounded-lg p-1"
						//key={nft.tokenId}
						key={uuidv4()}
						//onClick={(e) => handleClick(e)}
						/*
						onClick={(e) => {
							e.preventDefault(); 
							handleClick(nft);
						}}
						ref={(element) => itemEls.current.push(element)}
						*/
					>
						<GameCardStaked
							key={uuidv4()}

							//key={nft.tokenId}
							
							//ref={(element) => itemEls.current.push(element)}
							
							cardData={nft}
							cryptoTowerAddress={cryptoTowerAddress}
							loadingCubesAddress={loadingCubesAddress}
							data={stakeDataGlobal}
							depositNFT={depositNFT}
							withdrawNFT={withdrawNFT}
							selectNFT={selectNFT}
						>
						</GameCardStaked>
					</div>

					))}




				</div>


				{/*
				</InfiniteScroll>
					*/}
			
			</div>


			<div className=" pt-5 text-normal text-amber-400">



			</div>

			</div>

		



			{/* stakeDataGlobal fetching animation */}
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







			{showModal ? (
				<>
				<div
					className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
				>
					<div className="relative w-auto my-6 mx-auto max-w-3xl">
					{/*content*/}
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						{/*header*/}
						<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
						<h3 className="text-3xl font-semibold">
							Information
						</h3>
						<button
							className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
							onClick={() => setShowModal(false)}
						>
							<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
							×
							</span>
						</button>
						</div>
						{/*body*/}
						<div className="relative p-6 flex-auto">
						<p className="my-4 text-slate-500 text-lg leading-relaxed text-left">

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
							className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() => setShowModal(false)}
						>
							Close
						</button>
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


		
			
		</div>

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




