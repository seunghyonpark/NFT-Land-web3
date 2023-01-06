import React from "react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import classes from "./index.module.css"
import { consoleLog } from "mocha/lib/reporters/base"

import { useRouter } from 'next/router'


export default function GameHeader({
	walletDisconnected,
	address,
	setAddress,
	data,
	mintNFT,
	fetchNFTs,
	fetchStakeNFTs,
	isLoading,
	isMinting,
	depositingNFTAddress,
	nftWalletAddress,
	scriptAddress,
	cryptoTowerAddress,
	goldFishAddress,
	loadingCubesAddress,
	stakingCount,
	miningAmountTotal,
	stakingCountGlobal,
	miningAmountGlobal,

}) {

	if (address) {
		//console.log("MintHeaderHeader address",address);
		/////fetchNFTs();
		
	}



	const [buttonText, setButtonText] = useState("Connect Kaikas");


	//const router = useRouter();

	const refConnect = useRef(null);
	const refNFT = useRef(null);


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

		//window.klaytn.selectedAddress
		//const selectedId = await window.klaytn.selectedAddress;
		/*
		klaytn.on('accountsChanged', function(accounts) {
			// Your code
		  })
		*/

		if (address === "") {

		} else {
			//refConnect.current.style.display = "none";

			setAddress("");

			walletDisconnected();
			return;
		}

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

	/*
	setAddress(window.klaytn.selectedAddress);

	window.klaytn.on('accountsChanged', function(accounts) {
		// Your code
		console.log("accountsChanged accounts", accounts);
	});
	*/



	
	useEffect(() => {

		//setAddress(window.klaytn.selectedAddress);

		console.log("GameHeader useEffect address", address);
		

		
		if (address === undefined) {

			//router.push('/');

		} else {

			if (address === "") {
				//Router.push('/');

				//router.push('/');

				setButtonText("Connect Kaikas");


			} else {


				refNFT.current.click();
				////fetchNFTs(); ========> 반복적으로 실행이 된다.

				//refStakeNFT.current.click();


				//refConnect.current.style.display = "none";
				setButtonText("Disconnect");

			}

		}
		


	}, [address, refNFT]);
	



	//const container = document.querySelector('..fireworks-example');


	return (

		<header className="mt-1">
			{/* logotype */}
			{/*
			<h1 className="text-center text-5xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">GOGO DINO Meta Explorers<br></br>NFT Staking </a>
			</h1>
	*/}



			{/* find NFT's form */}
			<form className="mt-1 flex flex-row justify-between">


				<Image
					className=" float-left my-5 w-auto self-center" 
					src="/logo.png"
					alt="GOGODINO EXPLORERS"
					width={100}
					height={100}
				/>
			

				<button ref={refNFT} onClick={(e) => {e.preventDefault(); fetchNFTs(e);}}>

				</button>

				<button
					ref={refConnect}
					onClick={loadAccountInfo}
					className=" float-right my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1
						font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]
						duration-200  ease-in-out hover:bg-teal-300"
				>
					{buttonText}
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



{/*
			<ul role="list" className="p-3 divide-y divide-slate-200">
			*/}
			<ul role="list" className="p-3 flex justify-center divide-x divide-slate-200">
				
				<li className="flex py-0 first:pt-0 last:pb-0 ">
					
					<div className="mt-3 ml-6 h-12 w-12 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="gold-fish"
							src={goldFishAddress}
							speed="5"
							loop
							autoplay
						></lottie-player>
					</div>

					<div className="flex-auto mr-10 overflow-hidden text-right ">
						<p className="text-normal font-medium text-slate-200">
							Staking Count Total (GDX)
						</p>
						<p className="  font-mono text-3xl text-amber-400 truncate">{stakingCountGlobal} / 10000</p>
					</div>



				</li>

				<li className="flex py-0 first:pt-0 last:pb-0 ">
					
					<div className="mt-3 ml-10 h-10 w-10 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="crypto-tower"
							src={depositingNFTAddress}
							speed="1"
							loop
							autoplay
						></lottie-player>
					</div>

					<div className="flex-auto mr-5 overflow-hidden text-right ">
						<p className="text-normal font-medium text-slate-200">
						Current Earned Total ($SML)
						</p>
						<p className="font-mono text-3xl text-amber-400 truncate">{miningAmountGlobal}</p>
					</div>


				</li>

			</ul>
				


		</header>

	)

}