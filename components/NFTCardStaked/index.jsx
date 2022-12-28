import Image from "next/image";
import React from "react";
import { useState, useEffect, useRef } from "react";


import classes from "./index.module.css";

import { useRouter } from "next/router";
import Script from "next/script";

import CardMain from "../../components/CardMain.jsx";

import useStakeNFT from "../../hooks/useStakeNFT.js";



// --------------------------
export default function NFTCardStaked({
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

	//const { isLoading } = useStakeNFT(cardData.tokenId);

	// 이렇게 하면 안된다.
	//const { depositNFT, withdrawNFT, setTokenId, isInHome, isLoading } = useMintNFT(cardData.owner);


	const ref = useRef(null);
	
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	

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
		}
		//const interval = setInterval(pollDOM, 5000);

		const interval = setInterval(genNumber, 5000);




		return () => {
			clearInterval(interval);
			/*
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
			*/			
		}

	}, []);


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


	
	const sayHello = (tokenId) => {
		//alert(`Hello, ${name}!`);

		console.log(`Hello, ${tokenId}!`);

		//setTokenId(tokenId);

		/////setIsWithdrawing(true);

		withdrawNFT(tokenId);

		///ref.current.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
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
*/}


	return (




		<div className="m-auto flex  max-w-[70%] flex-col sm:m-0 sm:max-w-lg 
		bg-cover bg-center bg-[url('/img_tomo.png')]
		p-3
		">

			{/*
			<Script src={scriptAddress} />
			*/}


			{/* title */}
			<div className="bg-inherit mb-2 rounded-md bg-teal-500 px-2">

				<ul role="list" class="p-6 divide-y divide-slate-200">
							{/*#each people as person
								<!-- Remove top/bottom padding when first/last child -->*/}

					<li class="flex py-4 first:pt-0 last:pb-0">
						
						{/*
						<img class="h-10 w-10 rounded-full" src="./incubation.png" alt="" />
							*/}

						<div className="mt-3 h-10 w-10  -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
							<lottie-player
								id="crypto-tower"
								src={depositingNFTAddress}
								speed="1"
								loop
								autoplay
							></lottie-player>
						</div>





						<div class="ml-3 overflow-hidden text-left">
							<p class="text-xs font-medium font-semibold text-slate-900">
							{cardData.title ? (
							<p className="font-semibold">M.E. NFT</p>
							) : (
							<i>&lt; no title &gt;</i>
							)}
							</p>
							<p class="text-xm text-slate-900 truncate">#{cardData.tokenId}</p>
						</div>
					</li>


				{/*/each*/}
				</ul>

			</div>

			{/* action */}
			

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



			<div className="mt-2 flex table-fixed flex-row justify-center ">


				<div 
					className=" w-auto rounded-l-md rounded-r-md bg-teal-500 px-3 py-1 mix-blend-hard-light">

						<ul role="list" class="p-3 divide-y divide-slate-200">
						{/*#each people as person
							<!-- Remove top/bottom padding when first/last child -->*/}


							<li class="flex py-4 first:pt-0 last:pb-0">
							<img class="h-5 w-5 rounded-full" src="./staking.png" alt="" />
							<div class="ml-3 overflow-hidden text-left">
								<p class="text-sm font-medium text-slate-900">Start</p>
								<p class="text-sm text-slate-900 truncate">2023.01.03&nbsp;&nbsp;14:03:13</p>
							</div>
							</li>

							<li class="flex py-4 first:pt-0 last:pb-0">
							<img class="h-5 w-5 rounded-full" src="./enhance.png" alt="" />
							<div class="ml-3 overflow-hidden text-left">
								<p class="text-sm font-medium text-slate-900">Time Left</p>
								<p class="text-sm text-slate-900 truncate">4 years 11 month 354 days</p>
							</div>
							</li>

							<li class="flex py-4 first:pt-0 last:pb-0">
							<img class="h-5 w-5 rounded-full" src="sml.png" alt="" />
							<div class="ml-3 overflow-hidden text-left">
								<p class="text-xs  font-medium text-slate-900" >Current earned ($SML)</p>
								<p class="text-sm text-slate-900 truncate">0.00230424432</p>
							</div>
							</li>


						{/*/each*/}
						</ul>
				</div>

			</div>




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


		

			{/*
			<button
				ref={ref}
				onClick={checkNFT}
				className=" invisible my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
			>
				Check NFT
			</button>
			*/}



		</div>

	);
}


//  --------------------------------
/*
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
*/
