import Image from "next/image";
import React from "react";

import Script from "next/script";

import CardMain from "../components/CardMain.jsx";

import useStakeNFT from "../hooks/useStakeNFT.js";


// --------------------------
export default function NFTCard({
	cardData,
	cryptoTowerAddress,
	loadingCubesAddress,
	depositNFT,
	withdrawNFT,
}) {

	//const [isLoading, setIsLoading] = useState(false);

	const { isLoading } = useStakeNFT(cardData.tokenId);

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


	const sayHello = (tokenId) => {
		//alert(`Hello, ${name}!`);

		console.log(`Hello, ${tokenId}!`);

		//setTokenId(tokenId);

		if (cardData.staking === "true") {
			withdrawNFT(tokenId);

		} else {
			depositNFT(tokenId);
		}
	};



	return (
		<div className="m-auto flex  max-w-[70%] flex-col rounded-lg border border-gray-300 p-3  sm:m-0 sm:max-w-lg ">

			{/*
			<Script src={scriptAddress} />
			*/}


			<div className="mb-2 rounded-md bg-teal-500 px-2">

			<ul role="list" class="p-6 divide-y divide-slate-200">
						{/*#each people as person
							<!-- Remove top/bottom padding when first/last child -->*/}

				<li class="flex py-4 first:pt-0 last:pb-0">
				<Image class="h-7 w-7 rounded-full" src="./opensea.png" alt="" />
				<div class="ml-3 overflow-hidden text-left">
					<p class="text-xs  text-slate-900">

					M.E. NFT

					</p>
					<p class="text-xs font-medium text-slate-900 truncate">#{cardData.tokenId}</p>
				</div>
				</li>


			{/*/each*/}
			</ul>

			</div>



			<Image
				src={
					cardData?.media[0]?.gateway ||
					"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
				}
				alt={cardData?.description}
				width={500}
				height={500}
			/>

								{/*
					<h1 className="text-center text-2xl font-extrabold text-amber-400 drop-shadow-xl ">
					{address}
				</h1>
				*/}


			{/* title
			<div className="mt-2 text-left text-xs rounded-md bg-teal-50 px-2">
				<p>Background: BG_02</p>
				<p>Body: hood_jacket_05</p>
    			<p>Head: viki_yellow_02</p>
			</div>
 			*/}

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



				<button
					className="w-auto rounded-l-md rounded-r-md bg-amber-400 px-2 py-1 hover:mix-blend-hard-light"

					//onClick={() =>
					//	navigator.clipboard.writeText(data.contract.address)
					//}

					onClick={() => sayHello(cardData.tokenId)}

					//onClick={depositNFT}

					
				>
					{
						cardData.staking === 'true'
						? <p className="font-medium">Stop Staking</p>
						: <p className="font-medium">Start Staking</p>
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

