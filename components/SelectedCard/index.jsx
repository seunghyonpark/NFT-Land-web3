import Image from "next/image";
import React from "react";
import { useState, useEffect, useRef } from "react";


import classes from "./index.module.css";

import { useRouter } from "next/router";
import Script from "next/script";

import CardMain from "../../components/CardMain.jsx";

import useStakeNFT from "../../hooks/useStakeNFT.js";



// --------------------------
export default function SelectedCard({
	selectedCard,
	cryptoTowerAddress,
	loadingCubesAddress,
	depositingNFTAddress,
	dataProcessingAddress,
	depositNFT,
	setTokenId,
	withdrawNFT,
}) {





	/*
	import { CountUp } from 'https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.7/countUp.js'

	function countStart(){
	  const $counters = document.querySelectorAll(".js-count-up"),
			options = {
			  useEasing: true,
			  useGrouping: true,
			  separator: ",",
			  decimal: "."
			};
	
	  $counters.forEach( (item) => {
		const value = item.dataset.value;
		const counter = new CountUp(item, value, options);
		counter.start();
	  });
	}
	
	new Waypoint({
	  element: document.querySelector('.level'),
	  handler: function() {
		countStart()
		//this.destroy() //for once
	  },
	  offset: '50%'
	});
	*/





	const [isWithdrawing, setIsWithdrawing] = useState(false);

	//const [miningAmount, setMiningAmount] = useState("0.00000000");




	//const { isLoading } = useStakeNFT(selectedCard.tokenId);

	// 이렇게 하면 안된다.
	//const { depositNFT, withdrawNFT, setTokenId, isInHome, isLoading } = useMintNFT(selectedCard.owner);


	const refNFTImage = useRef(null);
	
	const router = useRouter();

	const [loading, setLoading] = useState(false);




	useEffect(() => {

		////console.log("SelectedCard useEffect tokenId", selectedCard.tokenId);

		return () => {
		
		}

	}, [ selectedCard.tokenId]);



	useEffect(() => {

		//console.log("SelectedCard useEffect staking", selectedCard.staking);

		return () => {
		
		}

	}, [ selectedCard.staking]);


	useEffect(() => {

		//console.log("SelectedCard useEffect selectedCard.miningAmount", selectedCard.miningAmount);

		return () => {
		
		}

	}, [ selectedCard.miningAmount]);


	useEffect(() => {

		//console.log("SelectedCard useEffect staking.timeLeft", selectedCard.timeLeft);

		return () => {
		
		}

	}, [ selectedCard.timeLeft]);


	useEffect(() => {

		//console.log("SelectedCard useEffect staking.maturityLevel", selectedCard.maturityLevel);

		return () => {
		
		}

	}, [ selectedCard.maturityLevel]);

	


	const genNumber = () => {
		console.log("genNumber");
		//document.querySelector("div").style.setProperty("--percent", Math.random());
	}

	//console.log("depositNFT", depositNFT);



	//console.log("selectedCard.tokenId", selectedCard.tokenId);
	//console.log("isInHome", isInHome);


	//setTokenId(selectedCard.tokenId);
	/* error 발생한다.
	Unhandled Runtime Error
Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
	*/


	/*
	https://testnets.opensea.io/assets/baobab/0x3f7a4d253c954ba0deb1c0ac2c031595c02f231b/340
	*/


	/*
	
	const sayHello = async (e) => {
		//alert(`Hello, ${name}!`);

		console.log(`Hello, ${selectedCard.tokenId}!`);


		console.log("selectedCard", selectedCard);

		//setTokenId(tokenId);

		/////setIsWithdrawing(true);

		//withdrawNFT(tokenId);

		///ref.current.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
	};
	*/
	
	const sayHello = async (e) => {
		e.preventDefault();

		//alert(`Hello, ${name}!`);

		console.log(`Hello, ${selectedCard.tokenId}!`);


		//setTokenId(tokenId);

		if (selectedCard.staking === "true") {
			withdrawNFT(selectedCard.tokenId);

		} else {
			depositNFT(selectedCard.tokenId);
		}
	};

	  


	//const person.imageUrl = "";
	const person = new Object();
	person.imageUrl = "";
	person.name = "Wayne";
	person.email = "wayne@nuklabs.com";
		
			


	/*
	jsonTokenUri {
  name: 'GOGO DINO META EXPLORERS #447',
  description: 'We build a business partnership such as the distribution of profits from newly produced animations and webtoons with holders.',
  image: 'https://gogodino.saltmarble.io/metaexplorers/images/447.png',
  edition: 447,
  attributes: [
    { trait_type: 'Background', value: 'BG_02' },
    { trait_type: 'Body', value: 'hood_jacket_05' },
    { trait_type: 'Head', value: 'viki_yellow_02' }
  ]
}
*/


{/*
<div className="m-auto flex  max-w-[70%] flex-col rounded-lg border border-gray-300 p-3  sm:m-0 sm:max-w-lg ">

sm:px-10 md:px-200 lg:px-200 xl:px-300

rounded-lg border border-gray-300


bg-cover bg-center bg-[url('/img_tomo.png')]




		sm:p-5 md:p-5 lg:p-16 xl:p-20

		sm:m-0 sm:max-w-lg 



		m-auto 
*/}


{/*
			flex  max-w-[100%] flex-col
			rounded-lg  border-gray-300 p-3 sm:m-0 sm:max-w-lg

			sm:p-10 md:p-10 lg:p-20 xl:p-28
*/}


/*
	className={`container m-auto flex  min-h-screen flex-col px-5 text-center sm:px-10 md:px-20 ${
				data !== [] ? "justify-evenly" : "justify-between"} 
			`}
	

			sm:p-10 md:p-10 
	lg:p-20

	xl:p-24


	sm:pl-[146px] sm:pr-[90px]

	pl-[250px] pr-[250px] pt-[100px]
			*/



	return (





		<div className="

		flex  max-w-[100%] flex-col
		rounded-lg  border-gray-300 sm:m-0 sm:max-w-lg

		pl-[50px] pr-[40px] pt-[20px]
		
		sm:pl-[60px] sm:pr-[50px] sm:pt-[70px]

		md:pl-[70px] md:pr-[65px] md:pt-[30px]
		
		lg:pl-[108px] lg:pr-[100px] lg:pt-[50px]

		xl:pl-[120px] xl:pr-[85px] xl:pt-[70px]

		
		
		
		">

<div className="
	flex

	
">

	<div className={
		classes.squareflip
	}>

		<div className={classes.square} data-image="">

			<div className={classes.squarecontainer}>

				<div className={classes.aligncenter}>

					

				{/*isLoading &&
				
				<div className=" text-xl text-amber-400">Loading...</div>
*/}


					{selectedCard &&



						<Image className={`

							drop-shadow-2xl
							h-500 w-500
							bg-cover bg-center
							bg-[url('/iphone-spinner.gif')]
							${selectedCard.staking === "true" ? "grayscale" : ""}
							
							`}

							src={
								selectedCard?.media[0]?.gateway ||
								"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
							}
							alt={selectedCard?.description}
							width={500}
							height={500}
						/>
						
						
					}







					{!selectedCard &&




						<Image
							src="/nft_01.png"
							alt=""
							width={300}
							height={300}
						/>



					}


				</div>


				<div className="mt-2"></div>
				<h2 className={classes.textshadow}>GOGO DINO META EXPLORERS #{selectedCard.tokenId}</h2>
				<div className="mt-20"></div>


			</div>
			<div className={classes.flipoverlay}></div>
		</div>




		<div className={classes.square2} data-image="">
			<div className={classes.squarecontainer2}>
				<div className={classes.aligncenter}>


				<div className="mt-0 flex table-fixed flex-row justify-center  p-5">


<div 
	className=" w-full rounded
		 bg-blue-900
		 text-slate-100
		 px-0 py-0 mt-0 border
		">

		<ul role="list" className="p-3 divide-y divide-slate-200">
		{/*#each people as person
			<!-- Remove top/bottom padding when first/last child -->*/}


			<li className="flex py-4 first:pt-0 last:pb-0">
			<img className="h-5 w-5 mr-5 rounded-full" src="./enhance.png" alt="" />
			<div className="ml-3 overflow-hidden text-left">
				<p className="text-sm font-medium ">Token ID</p>
				<p className="text-sm truncate">#{selectedCard.tokenId}</p>
			</div>
			</li>

			<li className="flex py-4 first:pt-0 last:pb-0">
			<img className="h-5 w-5 mr-5 rounded-full" src="./staking.png" alt="" />
			<div className="ml-3 overflow-hidden text-left">
				<p className="text-sm font-medium ">Time Left</p>
				<p className="text-sm truncate">{selectedCard.timeLeft}</p>
			</div>
			</li>

			<li className="flex py-4 first:pt-0 last:pb-0">
				<img className="h-5 w-5 mr-5 rounded-full" src="battle.png" alt="" />
				<div className="ml-3 overflow-hidden text-left">
					<p className="text-xs  font-medium " >NFT Maturity</p>
					<p className="text-sm truncate">{selectedCard.maturityLevel}</p>
				</div>
			</li>

			<li className="flex py-4 first:pt-0 last:pb-0">
				<div className="mt-3 ml-3 h-7 w-7 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
					<lottie-player
						id="crypto-tower"
						src={depositingNFTAddress}
						speed="1"
						loop
						autoplay
					></lottie-player>
				</div>
				<div className="ml-3 overflow-hidden text-left">
					<p className="text-xs  font-medium " >Mining Amount ($SML)</p>
					<p className="text-sm truncate">{selectedCard.miningAmount}</p>
				</div>
			</li>

		{/*/each*/}
		</ul>


{/*
		<div className="">
			<button
				className=" my-5 w-auto self-center rounded-lg bg-regal-red px-5 py-1 font-normal text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300
					disabled:opacity-25"
				onClick={(e) => {
					e.preventDefault(); 
					//depositNFT(selectedCard.tokenId);
				}}
				
			>
					Stake
			</button>&nbsp;&nbsp;
			<button
				className=" my-5 w-auto self-center rounded-lg bg-regal-red px-5 py-1 font-normal text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300
				"
				onClick={(e) => {
					e.preventDefault();
					//withdrawNFT(selectedCard.tokenId);
				}}
				
			>
					Unstake
			</button>
		</div>
			*/}

		<div className="mt-5"></div>
		
</div>



</div>



				</div>

			
			</div>


			<div className={classes.flipoverlay}></div>
		</div>



	</div>


	<div className={classes.clearfix}></div>

			

</div>



















			{/*
			<Script src={scriptAddress} />
			*/}


			{/* title */}

			{/*
			<button
					className="invisible w-auto rounded-l-md rounded-r-md bg-amber-400 px-2 py-1 hover:mix-blend-hard-light"

					onClick={() => (sayHello(), console.log("click") )}
				>
					{
						selectedCard.staking === 'true'
						? <p className="font-medium">Stop Staking</p>
						: <p className="font-medium">Start Staking</p>
					}
			</button>
				*/}



			
			{/*
				(selectedCard.length === 0) &&

					<Image
						src="/nft_01.png"
						alt=""
						width={300}
						height={300}
					/>
			
			*/}

{/*
			className={`container m-auto flex  min-h-screen flex-col px-6 text-center sm:px-10 md:px-20 ${
				data !== [] ? "justify-evenly" : "justify-between"
			} `}
*/}

			







{
				(selectedCard.length !== 0) &&


				<div></div>









}


			
			{/*
				(selectedCard.length !== 0) &&



			<Image className={`

				drop-shadow-2xl
				h-500 w-500
				bg-cover bg-center
				bg-[url('/iphone-spinner.gif')]
				${selectedCard.staking === "true" ? "grayscale" : ""}

				
				
				`}

				src={
					selectedCard?.media[0]?.gateway ||
					"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
				}
				alt={selectedCard?.description}
				width={300}
				height={300}
			/>
			
			*/}



			{/* contract info */}
			{/*
			<div className="mt-2 flex table-fixed flex-row justify-center">
				<div className=" truncate rounded-l-md bg-teal-200 px-2 py-1">
					Contract: {selectedCard.contract.address}
				</div>

				<button
					className="w-auto rounded-r-md bg-teal-500 px-2 py-1 hover:mix-blend-hard-light"

					onClick={() =>
						navigator.clipboard.writeText(selectedCard.contract.address)
					}
				>
					<p className="font-medium">Copy</p>
				</button>
			</div>
				*/}


			{/*

			mix-blend-hard-light hover:mix-blend-normal">


			(selectedCard.length !== 0) &&
			*/}

			{/*
			}
		*/}
			

{/*
			<button
				className="mt-2 w-auto rounded-l-md rounded-r-md text-sm bg-amber-400 px-2 py-1 hover:mix-blend-hard-light"

				//onClick={() =>
				//	navigator.clipboard.writeText(data.contract.address)
				//}

				onClick={(e) => sayHello(e)}

				//onClick={() => selectNFT(selectedCard)}
				
			>
				{
					selectedCard.staking === 'true'
					? <p className="font-medium">Stop Staking</p>
					: <p className="font-medium">Start Staking</p>
				}
			</button>

			*/}

			
			{/* action 
			<div className="mt-2 flex table-fixed flex-row justify-center ">

				<button
					className="w-auto rounded-l-md rounded-r-md bg-amber-400 px-2 py-1 hover:mix-blend-hard-light"

					onClick={() => (sayHello(selectedCard.tokenId), console.log("click") )}
				>
					{
						selectedCard.staking === 'true'
						? <p className="font-medium">Stop Staking</p>
						: <p className="font-medium">Start Staking</p>
					}
				</button>

			</div>
*/}






			{/* data staking animation */}
			
			{/*className="mt-2 rounded-md bg-teal-50 px-2"
						crypto-tower
			cryptoTowerAddress
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



<button
					className="invisible w-auto rounded-l-md rounded-r-md bg-amber-400 px-2 py-16 hover:mix-blend-hard-light"

				>

			</button>




		</div>











	);
}

