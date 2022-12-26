import Image from "next/image";
import React from "react";

import Script from "next/script";

import CardMain from "../components/CardMain.jsx";

import useStakeNFT from "../hooks/useStakeNFT.js";


// --------------------------
export default function NFTCard({
	cardData,
	//scriptAddress,
	cryptoTowerAddress,
	loadingCubesAddress,
}) {

	const { depositNFT, withdrawNFT, data, isInHome, isLoading } = useStakeNFT(cardData.tokenId);

	//console.log("cardData.tokenId", cardData.tokenId);
	//console.log("isInHome", isInHome);

	return (

		<div className="m-auto flex  max-w-[70%] flex-col rounded-lg border border-gray-300 p-3  sm:m-0 sm:max-w-lg ">

			{/*
			<Script src={scriptAddress} />
			*/}

			<Image
				src={
					cardData?.media[0]?.gateway ||
					"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
				}
				alt={cardData?.description}
				width={500}
				height={500}
			/>
			{/* title */}
			<div className="mt-2 rounded-md bg-teal-50 px-2">
				{cardData.title ? (
					<p className="font-semibold">{cardData.title}</p>
				) : (
					<i>&lt; no title &gt;</i>
				)}
			</div>

			{/* contract info */}
			{/*
			<div className="mt-2 flex table-fixed flex-row justify-center">
				<div className=" truncate rounded-l-md bg-teal-200 px-2 py-1">
					Contract: {cardData.contract.address}
				</div>

				<button
					className="w-auto rounded-r-md bg-teal-500 px-2 py-1 hover:mix-blend-hard-light"

					onClick={() =>
						navigator.clipboard.writeText(cardData.contract.address)
					}
				>
					<p className="font-medium">Copy</p>
				</button>
			</div>
				*/}

			{/* staking info */}
			<div className="mt-2 flex table-fixed flex-row justify-center">
				<div className=" truncate rounded-l-md bg-teal-200 px-2 py-1">
					{/*cardData.contract.address*/}

					{/*
					Holder: {cardData.owner}
					*/}
				
					{
						cardData.staking === 'true'
						? <p>Staking...</p>
						: <p>Unstaking...</p>
					}

				</div>

				<button
					className="w-auto rounded-r-md bg-teal-500 px-2 py-1 hover:mix-blend-hard-light"

					//onClick={() =>
					//	navigator.clipboard.writeText(data.contract.address)
					//}

					onClick={depositNFT}
				>
					<p className="font-medium">

					{
						cardData.staking === 'true'
						? <p>Go UnStake</p>
						: <p>Go Stake</p>
					}

					</p>
				</button>
			</div>

			<CardMain
				{...{
					data,
				}}
			/>

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


		</div>

	);
}


//  --------------------------------
export function getStaticProps() {
	// async/await testing!
	//let scriptAddress =
	//	"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";

	let cryptoTowerAddress =
		"https://assets3.lottiefiles.com/packages/lf20_2omr5gpu.json";
		//"https://assets3.lottiefiles.com/packages/lf20_4HwMFcslUL.json";
		
	let loadingCubesAddress =
		"https://assets4.lottiefiles.com/private_files/lf30_c52paxfj.json";

	return {
		props: {
			//scriptAddress,
			cryptoTowerAddress,
			loadingCubesAddress,
		},
	};
}
