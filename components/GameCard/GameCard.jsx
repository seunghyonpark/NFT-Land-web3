import Image from "next/image";
import React from "react";
import classes from "./index.module.css";

import Script from "next/script";

import CardMain from "../CardMain.jsx";

import useStakeNFT from "../../hooks/useStakeNFT.js";

import { useState, useEffect, useRef } from "react";


// --------------------------
export default function GameCard({
	cardData,
	cryptoTowerAddress,
	loadingCubesAddress,
	depositNFT,
	withdrawNFT,
	selectNFT,
}) {

	let cssText = "";


	if (cardData.staking === "true") {
		//cssText = "mix-blend-color-burn";
		cssText = "mix-blend-saturation";
	}



	//const [isSelect, setIsSelect] = useState(false);

	const ref = useRef(null);

	cardData.selected = false;

	//const [isLoading, setIsLoading] = useState(false);

	//const { isLoading } = useStakeNFT(cardData.tokenId);

	// 이렇게 하면 안된다.
	//const { depositNFT, withdrawNFT, setTokenId, isInHome, isLoading } = useMintNFT(cardData.owner);




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


	const sayHello = async (e) => {
		e.preventDefault();

		//alert(`Hello, ${name}!`);

		console.log(`Hello, ${cardData.tokenId}!`);


		//setTokenId(tokenId);

		if (cardData.staking === "true") {
			withdrawNFT(cardData.tokenId);

		} else {
			depositNFT(cardData.tokenId);
		}
	};


	const selectCard = async (e) => {

		console.log(`selectCard, ${cardData.tokenId}!`);


	};

	const handleClick = (e) =>  {
		e.preventDefault();
		
		console.log(e);

		cardData.selected = true;

		console.log('cardData.selected', cardData.selected);

		ref.current.style.backgroundColor = "yellow";

		//ref.current.style.border-width = 6;

		//border-width: 8px;

		//ref.current.style.display = "none";

		//ref.current.style.className = "m-auto flex  max-w-[70%] flex-col rounded-lg  border-8 border-gray-300 p-3 sm:m-0 sm:max-w-lg hover:mix-blend-hard-light";

	}

	/*
	className={`container m-auto flex  min-h-screen flex-col px-5 text-center sm:px-10 md:px-20 ${
				data !== [] ? "justify-evenly" : "justify-between"} 
			`}
	*/

	useEffect(() => {

		//console.log("cardData", cardData);

		//ref.current.style = cardData.cssText;

	}, [cardData]);


	//${cardData.selected !== true ? "border" : "border-8"}

	return (




		<div ref={ref}
			className={`
			m-auto flex  max-w-[70%] flex-col rounded-lg  border-gray-300 p-3 sm:m-0 sm:max-w-lg 
			hover:mix-blend-hard-light
			border ${cardData.cssText}
			`}
			>


			{/*
			<Script src={scriptAddress} />
			*/}

			


			{cardData.staking === 'false' && (
				<Image className={`
					drop-shadow-2xl
					h-500 w-500
					bg-cover bg-center bg-[url('/iphone-spinner.gif')]
					
					`}


					src={
						cardData?.media[0]?.gateway ||
						"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
					}
					alt={cardData?.description}
					width={500}
					height={500}
				/>
			)}

			{cardData.staking === 'true' && (

				//<div className={classes.load}

				<div className="relative">
				
					<Image className="
						drop-shadow-2xl
						h-500 w-500
						bg-cover bg-center bg-[url('/iphone-spinner.gif')]
						grayscale "

						src={
							cardData?.media[0]?.gateway ||
							"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
						}
						alt={cardData?.description}
						width={500}
						height={500}
					/>

					<div className="absolute bottom-0 left-0 right-0 top-0 bg-regal-red bg-opacity-30 " >
						
					</div>

					<h1 className="absolute text-normal text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						Staking...
					</h1>
					
				</div>

			)}


			

			

								{/*
					<h1 className="text-center text-2xl font-extrabold text-amber-400 drop-shadow-xl ">
					{address}
				</h1>
				*/}


			{/* title */}
			{/*
			<div className="mt-2 text-left text-xs rounded-md bg-teal-50 px-2">
				<p>Background: BG_02</p>
				<p>Body: hood_jacket_05</p>
    			<p>Head: viki_yellow_02</p>
			</div>
			*/}

			<div className=" mt-2 text-left text-xs rounded-md bg-teal-50 px-2">
				# {cardData.tokenId}
			</div>

			<div className="flex mt-2  text-xs rounded-md bg-teal-50 px-2">
				<div className="text-left">$SML</div>
				<div className="flex-auto">
					<div className={classes.number}>{Number(cardData.miningAmount).toFixed(4)}</div>
				</div>
			</div>
			
			


			{/* token info */}
	{/*		
			<div className="mt-2 flex table-fixed flex-row justify-center">
				<div className=" truncate rounded-l-md bg-teal-200 px-2 py-1">
					# {cardData.tokenId}
				</div>
				<div className=" truncate rounded-r-md bg-teal-200 px-2 py-1">
					
				</div>
			</div>

*/}

		

			{/* staking info */}

			{/*	
			<div className="mt-2 flex table-fixed flex-row justify-center">


				<button
					className="w-auto rounded-l-md rounded-r-md text-sm bg-amber-400 px-2 py-1 hover:mix-blend-hard-light"

					//onClick={() =>
					//	navigator.clipboard.writeText(data.contract.address)
					//}

					onClick={(e) => sayHello(e)}

					//onClick={() => selectNFT(cardData)}
					
				>
					{
						cardData.staking === 'true'
						? <p className="font-medium">Stop Staking</p>
						: <p className="font-medium">Start Staking</p>
					}
				</button>
				*/}


				{/*
				<button
					className="w-auto rounded-l-md rounded-r-md text-sm bg-amber-400 px-2 py-1 hover:mix-blend-hard-light"

					//onClick={() =>
					//	navigator.clipboard.writeText(data.contract.address)
					//}

					onClick={ (e) => selectCard(e) }
				>
					{
						<p className="font-medium">Select</p>
					}
				</button>
				

			</div>

			*/}

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

			{/* data fetching animation */}
			{/*
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
			*/}

		</div>




	);
}


