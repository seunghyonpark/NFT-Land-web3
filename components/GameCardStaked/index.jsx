import Image from "next/image";
import React from "react";
import { useState, useEffect, useRef } from "react";


import classes from "./index.module.css";

import { useRouter } from "next/router";
import Script from "next/script";

import CardMain from "../../components/CardMain.jsx";

import useStakeNFT from "../../hooks/useStakeNFT.js";



// --------------------------
export default function GameCardStaked({
	cardData,
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

	const [miningAmount, setMiningAmount] = useState("0.00000000");




	//const { isLoading } = useStakeNFT(cardData.tokenId);

	// 이렇게 하면 안된다.
	//const { depositNFT, withdrawNFT, setTokenId, isInHome, isLoading } = useMintNFT(cardData.owner);


	const refNFTImage = useRef(null);
	
	const router = useRouter();

	const [loading, setLoading] = useState(false);




	/*
						const today = new Date();
						console.log(today);
						console.log("today fullyear", today.getFullYear());

						console.log(json.items[idx].regDatetime);

						const startday = new Date(json.items[idx].regDatetime);
						console.log("startTime", startday);

						console.log("today fullyear", today.getFullYear());
						console.log("startday fullyear", startday.getFullYear());

						const inDays = Math.floor((today.getTime()-startday.getTime())/(24*3600*1000));
						

						console.log("inDays", inDays);

						const inSeconds = Math.floor((today.getTime()-startday.getTime())/1000);

						console.log("inSeconds", inSeconds);

	*/



/*
	useEffect(() => {
		
		//console.log("GameCardStaked useEffect");

		//console.log("GameCardStaked useEffect cardData", cardData);

		//if (cardData === "") return;



		
		let i = 0;
		function pollDOM() {
		  //console.log(i);
		  i++;

		  const today = new Date();
		  const startday = new Date(cardData.timeStart);
		  //console.log("startday", startday);

		  const inDays = Math.floor((today.getTime()-startday.getTime())/(24*3600*1000));
		  //console.log("inDays", inDays);

		  const inSeconds = Math.floor((today.getTime()-startday.getTime())/1000);
		  //console.log("inSeconds", inSeconds);

		  setMiningAmount(Number(inSeconds/100000000).toFixed(8));

		  ////////setMiningAmount(String(Number(miningAmount).toFixed(2)));
		}
		
		const interval = setInterval(pollDOM, 1000);

		return () => {
			
			clearInterval(interval);

		}

		


	//}, [cardData, setMiningAmount]);
	}, []);

	*/


	const genNumber = () => {
		console.log("genNumber");
		//document.querySelector("div").style.setProperty("--percent", Math.random());
	}

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


	/*
	
	const sayHello = async (e) => {
		//alert(`Hello, ${name}!`);

		console.log(`Hello, ${cardData.tokenId}!`);


		console.log("cardData", cardData);

		//setTokenId(tokenId);

		/////setIsWithdrawing(true);

		//withdrawNFT(tokenId);

		///ref.current.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
	};
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
*/}







	return (

		<div className="m-auto flex  max-w-[100%] flex-col 

		sm:p-10 md:p-10 lg:p-20 xl:p-28
		
		

		">

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
						cardData.staking === 'true'
						? <p className="font-medium">Stop Staking</p>
						: <p className="font-medium">Start Staking</p>
					}
			</button>
				*/}


			<button className="m-0 invisible"></button>

			
			{
				(cardData.length === 0) &&

			<Image
				src="/nft_01.png"
				alt=""
				width={300}
				height={300}
			/>
			
			}

			
			{
				(cardData.length !== 0) &&

			<Image
				src={
					cardData?.media[0]?.gateway ||
					"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
				}
				alt={cardData?.description}
				width={300}
				height={300}
			/>
			
			}



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


			{/*
			(cardData.length !== 0) &&
			*/}
			<div className="mt-2 flex table-fixed flex-row justify-center">

				<div 
					className=" w-auto rounded-l-md rounded-r-md bg-teal-500 px-3 py-1
					mix-blend-hard-light hover:mix-blend-normal">

						<ul role="list" className="p-3 divide-y divide-slate-200">
						{/*#each people as person
							<!-- Remove top/bottom padding when first/last child -->*/}


							<li className="flex py-4 first:pt-0 last:pb-0">
							<img className="h-5 w-5 rounded-full" src="./enhance.png" alt="" />
							<div className="ml-3 overflow-hidden text-left">
								<p className="text-sm font-medium text-slate-900">Token ID</p>
								<p className="text-sm text-slate-900 truncate">{cardData.tokenId}</p>
							</div>
							</li>

							<li className="flex py-4 first:pt-0 last:pb-0">
							<img className="h-5 w-5 rounded-full" src="./staking.png" alt="" />
							<div className="ml-3 overflow-hidden text-left">
								<p className="text-sm font-medium text-slate-900">Time Left</p>
								<p className="text-sm text-slate-900 truncate">{cardData.timeLeft}</p>
							</div>
							</li>

							<li className="flex py-4 first:pt-0 last:pb-0">
							<img className="h-5 w-5 rounded-full" src="battle.png" alt="" />
							<div className="ml-3 overflow-hidden text-left">
								<p className="text-xs  font-medium text-slate-900" >NFT Maturity</p>
								<p className="text-sm text-slate-900 truncate">{cardData.maturityLevel}</p>
							</div>
							</li>

							<li className="flex py-4 first:pt-0 last:pb-0">
							<img className="h-5 w-5 rounded-full" src="sml.png" alt="" />
							<div className="ml-3 overflow-hidden text-left">
								<p className="text-xs  font-medium text-slate-900" >Mining Amount ($SML)</p>
								<p className="text-sm text-slate-900 truncate">{miningAmount}</p>
							</div>
							</li>

						{/*/each*/}
						</ul>
				</div>

			</div>
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

				//onClick={() => selectNFT(cardData)}
				
			>
				{
					cardData.staking === 'true'
					? <p className="font-medium">Stop Staking</p>
					: <p className="font-medium">Start Staking</p>
				}
			</button>

			*/}

			
			{/* action 
			<div className="mt-2 flex table-fixed flex-row justify-center ">

				<button
					className="w-auto rounded-l-md rounded-r-md bg-amber-400 px-2 py-1 hover:mix-blend-hard-light"

					onClick={() => (sayHello(cardData.tokenId), console.log("click") )}
				>
					{
						cardData.staking === 'true'
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



		</div>

	);
}

