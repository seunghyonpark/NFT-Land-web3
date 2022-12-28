import Image from "next/image";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'

import Script from "next/script";

import CardMain from "../components/CardMain.jsx";

import useStakeNFT from "../hooks/useStakeNFT.js";


// --------------------------
export default function NFTCardStaked({
	cardData,
	cryptoTowerAddress,
	loadingCubesAddress,
	depositNFT,
	setTokenId,
	withdrawNFT,
}) {

	const [isWithdrawing, setIsWithdrawing] = useState(false);

	//const { isLoading } = useStakeNFT(cardData.tokenId);

	// 이렇게 하면 안된다.
	//const { depositNFT, withdrawNFT, setTokenId, isInHome, isLoading } = useMintNFT(cardData.owner);


	const ref = useRef(null);
	
	const router = useRouter();

	//const [loading, setLoading] = useState(false);
	

	useEffect(() => {

		/*
		const handleStart = (url) => (url !== router.asPath) && setLoading(true);
		const handleComplete = (url) => (url === router.asPath) && setTimeout(() => {setLoading(false)},2000);
  
		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError',  handleComplete)	
		*/

		let i = 0;

		function pollDOM() {
		  console.log(i);
		  i++;
		  //ref.current.click();
		}
		const interval = setInterval(pollDOM, 10000);

		return () => {
			clearInterval(interval);
			/*
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
			*/			
		}

	}, []);


	//console.log("depositNFT", depositNFT);



	//console.log("cardData.tokenId", cardData.tokenId);
	//console.log("isInHome", isInHome);


	//setTokenId(cardData.tokenId);
	/* error 발생한다.
	Unhandled Runtime Error
Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
	*/


	/*
	https://testnets.opensea.io/assets/baobab/0x3f7a4d253c954ba0deb1c0ac2c031595c02f231b/340
	*/


	
	const sayHello = (tokenId) => {
		//alert(`Hello, ${name}!`);

		console.log(`Hello, ${tokenId}!`);

		//setTokenId(tokenId);

		/////setIsWithdrawing(true);

		withdrawNFT(tokenId);

		///ref.current.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
	};
	

	


	return (
		<div className="m-auto flex  max-w-[70%] flex-col rounded-lg border border-gray-300 p-3  sm:m-0 sm:max-w-lg ">

			{/*
			<Script src={scriptAddress} />
			*/}


			
			<Image
				//ref={ref}
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
			<div className="mt-2 flex table-fixed flex-row justify-center ">
				<div 
					className=" truncate rounded-l-md bg-teal-200 px-2 py-1">
					{/*cardData.contract.address*/}

					{/*
					Holder: {cardData.owner}
					*/}
				
					<p>Unstaking...</p>


				</div>
				<button
					className="w-auto rounded-r-md bg-teal-500 px-2 py-1 hover:mix-blend-hard-light"

					//onClick={() =>
					//	navigator.clipboard.writeText(data.contract.address)
					//}

					onClick={() => (sayHello(cardData.tokenId), console.log("click") )}

					/*
					onClick={() => (
						console.log("click"),

						console.log("aaaaaaaaaaa"),
						setTokenId(cardData.tokenId),

						withdrawNFT
					)}
					*/

					//onClick={depositNFT}
				>
					{
						cardData.staking === 'true'
						? <p className="font-medium">Go UnStake</p>
						: <p className="font-medium">Go Stake</p>
					}
				</button>
			</div>

			{/*
			<CardMain
				{...{
					data,
				}}
			/>
			*/}

			{/* home page animation */}
			{/*
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
			*/}

			{/* data fetching animation 
			crypto-tower
			cryptoTowerAddress
			*/}
			
			{isWithdrawing && (
				<div className="m-auto h-[18rem] w-[18rem] -translate-y-5 opacity-80 drop-shadow-xl">
					<lottie-player
						id="crypto-tower"
						src={cryptoTowerAddress}
						speed="1"
						loop
						autoplay
					></lottie-player>
				</div>
			)}
		

		</div>

	);
}
