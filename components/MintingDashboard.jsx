import React from "react";
import NFTCard from "./NFTCard";
import { v4 as uuidv4 } from "uuid";

import { useEffect, useRef } from "react"

export default function MintingDashboard({
	isMinting,
	isDepositing,
	isWithdrawing,
	dataProcessingAddress,
	depositingNFTAddress,
	withdrawingNFTAddress,
	mintNFT,
	checkNFT,
}) {

	const ref = useRef(null);


	useEffect(() => {

		console.log("MintingDashboard useEffect isMinting", isMinting);



		/*
		setTimeout(() => {
		  ref.current.click();
		}, 200); //miliseconds
		*/

		/*
		let i = 0;

		function pollDOM() {
		  //console.log(i);
		  i++;
		  ref?.current?.click();
		}
		
		const interval = setInterval(pollDOM, 1000);
		
		return () => clearInterval(interval);
		*/
		

	}, [isMinting]);



	//return data.lenghth > 0 && (
	return (

		<main>

<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
			{/* logotype */}
			<h1 className=" text-left text-3xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">Select your M.E. NFT and start staking</a>
			</h1>

			{/* cards container */}

			{/*
			<cards className="mt-4 grid justify-center gap-5 md:grid-cols-2 lg:grid-cols-3 ">
				{data.map((nft) => (
					// uuid!
					<NFTCard
						key={uuidv4()}
						cardData={nft}
					>

					</NFTCard>
				))}
			</cards>
				*/}

			{isMinting === false && (

				<button
					onClick={mintNFT}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Mint
				</button>	

			)}



			{isMinting && (
				<div className="m-auto h-[18rem] w-[15rem] -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
					<lottie-player
						id="data-processing"
						src={dataProcessingAddress}
						speed="1"
						loop
						autoplay
					></lottie-player>
				</div>	
			)}

			<div className="m-auto h-[8rem] w-[8rem] -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
				<lottie-player
					id="data-processing"
					src={dataProcessingAddress}
					speed="1"
					loop
					autoplay
					stop
				></lottie-player>
			</div>	



			{/* check minted NFT's form */}
			
			<button
				ref={ref}
				onClick={checkNFT}
				className=" invisible my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
			>
				Check NFT
			</button>
			



			{/*
			isDepositing && (
				<div className="m-auto h-[18rem] w-[15rem] -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
				<lottie-player
					id="crypto-tower"
					src={depositingNFTAddress}
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
