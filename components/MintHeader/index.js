import React from "react"
import { useState, useEffect, useRef } from "react"
import classes from "./index.module.css"
import { consoleLog } from "mocha/lib/reporters/base"

import { useRouter } from 'next/router'

export default function MintHeaderHeader({
	address,
	setAddress,
	data,
	mintNFT,
	fetchNFTs,
	fetchStakeNFTs,
	isMinting,
	depositingNFTAddress,
}) {

	if (address) {
		//console.log("MintHeaderHeader address",address);
		/////fetchNFTs();
		
	}

	const refNFT = useRef(null);
	const refStakeNFT = useRef(null);

	const onChange = (event) => {

        console.log(event.target);

    }

	const connectWallet = async() => {

		if (address) {

			return;
		}

		console.log("connectWallet");


		//const {klaytn} = window;
		if (klaytn) {
			try {
				const accounts = await klaytn.enable();
				if (accounts) {
					//fetchNFTs();
					setAddress(accounts);

					//fetchNFTs();
				}
				/*
				const balance = await caver.klay.getBalance(address);
				this.setState({
					address,
				balance: caver.utils.fromPeb(balance, 'KLAY'),
				})
				*/
				//klaytn.on('accountsChanged', () => this.setAccountInfo(klaytn));
			} catch (error) {
				console.log('User denied account access');
				alert("User denied account access");
				return;
			}

		} else {
			console.log('Non-Kaikas browser detected. You should consider trying Kaikas!');
			alert("Non-Kaikas browser detected. You should consider trying Kaikas!");
			return;
		}

	}

	
	//connectWallet();


	const loadAccountInfo = async (e) => {

		e.preventDefault();

		const {klaytn} = window;
		
		if (klaytn) {

			try {
				const accounts = await klaytn.enable();

				if (accounts) {

					//fetchNFTs();

					setAddress(accounts);

					if (address) {
						console.log("loadAccountInfo address="+address);

						//fetchNFTs();
					}
				}


				/*
				if (klaytn.selectedAddress) {
					setAddress(klaytn.selectedAddress);

					console.log("setAddress="+klaytn.selectedAddress);
				}
				*/


				//fetchNFTs();

				//console.log("address="+address);

				/*
				if (selectedAddress === "") {

				} else {
					fetchNFTs();
				}
				*/
				


				/*
				const balance = await caver.klay.getBalance(address);
				this.setState({
					address,
				balance: caver.utils.fromPeb(balance, 'KLAY'),
				})
				*/




				//klaytn.on('accountsChanged', () => this.setAccountInfo(klaytn));
			} catch (error) {
				console.log('User denied account access');
				alert("User denied account access");
				return;
			}

		} else {
			console.log('Non-Kaikas browser detected. You should consider trying Kaikas!');
			alert("Non-Kaikas browser detected. You should consider trying Kaikas!");
			return;
		}

	}


	/*
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	

	useEffect(() => {

		const handleStart = (url) => (url !== router.asPath) && setLoading(true);
		const handleComplete = (url) => (url === router.asPath) && setTimeout(() => {setLoading(false)},2000);
  
		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError',  handleComplete)	
		
		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)			
		}

	});
	*/




	useEffect(() => {

		connectWallet();


		

		setTimeout(() => {
			refStakeNFT.current.click();
		  }, 5000); //miliseconds


		setTimeout(() => {
			refNFT.current.click();
		  }, 7000); //miliseconds

		/*
		console.log("MintingHeader useEffect isMinting", isMinting);
		if (isMinting === false) {
			//ref.current.click();

			setTimeout(() => {
				ref.current.click();
			}, 5000); //miliseconds
		}
		*/

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
		  refNFT.current.click();
		  refStakeNFT.current.click();
		}
		
		const interval = setInterval(pollDOM, 100000);


		return () => clearInterval(interval);
		*/

	}, [address]);




	//const container = document.querySelector('..fireworks-example');


	return (

		<header className="mt-10">
			{/* logotype */}
			{/*
			<h1 className="text-center text-5xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">GOGO DINO Meta Explorers<br></br>NFT Staking </a>
			</h1>
	*/}

			{/* find NFT's form */}
			<form className="mt-5 flex flex-col">

				<input
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					type="text"
					placeholder="Your Wallet Address"
					className=" invisible w-10/12 self-center rounded-sm pl-2 shadow-lg  sm:w-[25rem] "
				/>

				<button
					onClick={loadAccountInfo}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Connect Kaikas
				</button>

				<h1 className="text-center text-2xl font-extrabold text-amber-400 drop-shadow-xl ">
					{address}
				</h1>


				{/*
				<button
					onClick={mintNFT}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Mint NFT
				</button>
				*/}

				<button
					ref={refNFT}
					onClick={fetchNFTs}
					className=" invisible my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Fetch NFTs
				</button>

				
				<button
					ref={refStakeNFT}
					onClick={fetchStakeNFTs}
					className=" invisible my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Fetch Stake NFTs
				</button>
				

				{/*
				<button
					onClick={() => router.push("/index")}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Home
				</button>
				*/}

			</form>




			<h1 className="text-left text-3xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">My Staked M.E. NFT</a>
			</h1>


			<ul role="list" class="p-6 divide-y divide-slate-200">
				<li class="flex py-4 first:pt-0 last:pb-0">
					<img class="h-12 w-12 rounded-full" src="./img_card1.png" alt="" />
					<div class="ml-3 overflow-hidden text-left">
						<p class="text-xs font-medium text-slate-900">
							Staking Count
						</p>
						<p class="text-3xl text-amber-400 truncate">2</p>
					</div>
				</li>
				<li class="flex py-4 first:pt-0 last:pb-0">
					
					
					


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
						<p class="text-xs font-medium text-slate-900">
						Current earned Total ($SML)
						</p>
						<p class="text-3xl text-amber-400 truncate">43.1342632545223444355</p>
					</div>


					<img class="h-12 w-12 rounded-full" src="./sml.png" alt="" />

				</li>

			</ul>



		</header>

	)

}