import React from "react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import classes from "./index.module.css"
import { consoleLog } from "mocha/lib/reporters/base"

import { useRouter } from 'next/router'
import { min } from "mocha/lib/reporters"


export default function GameHeader ({
	baseURI,
	setBaseURI,
	contractAddress,
	setContractAddress,
	nftSymbol,
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
	mintingCountGlobal,
	stakingCountGlobal,
	miningAmountGlobal,
}) {

	if (address) {
		//console.log("MintHeaderHeader address",address);
		/////fetchNFTs();
		
	}

	//console.log("GameHeader");


	const [buttonText, setButtonText] = useState("Connect Kaikas");


	const [thisMintCountGlobal, setThisMintingCountGlobal] = useState(Number(mintingCountGlobal));
	const [thisMiningAmountGlobal, setThisMiningAmountGlobal] = useState(Number(miningAmountGlobal));
	const [thisStakingCountGlobal, setThisStakingCountGlobal] = useState(Number(stakingCountGlobal));



	//const router = useRouter();

	const refConnect = useRef(null);
	const refNFT = useRef(null);



	const onChangeThisMiningAmountGlobal = () => {

        //console.log("onChangeThisMiningAmountGlobal");

		const minimum = thisMiningAmountGlobal;
		const maximum = Number(miningAmountGlobal);

		
		for (let count = minimum; count <= maximum; count++) {
            setTimeout(() => {
                setThisMiningAmountGlobal(count);
            }, 1000);
        }

    }

	const fetchNFTsGlobal = async () => {

	}


	useEffect(() => {

		//console.log("GameHeader useEffect miningAmountGlobal", miningAmountGlobal);

		if (miningAmountGlobal === "0") return;


		
		let number = Number(miningAmountGlobal) * 100;
		let start = 0;
		const end = 100;
		let incrementTime = 10;
		let timer = setInterval(() => {
			
			const amount = Number(((number-100) + start) / 100).toFixed(2);

			if (start <= end) {
				setThisMiningAmountGlobal(amount);
				start += 1;
			}

		}, incrementTime);
		
		return () => {
			
			clearInterval(timer);
	
		}		

	}, [miningAmountGlobal]);


	
	useEffect(() => {

		//console.log("GameHeader useEffect mintingCountGlobal", mintingCountGlobal);



		if (mintingCountGlobal === "0") return;

		let number = String(mintingCountGlobal);



		let start = parseInt(mintingCountGlobal) - 100;
		const end = mintingCountGlobal;


		//console.log("start", start);
		//console.log("end", end);

		let incrementTime = 1;

		let timer = setInterval(() => {
			

			const amount = Number(start).toFixed(0);

			if (start <= end) {

				setThisMintingCountGlobal(amount);

				start += 1;
			}
			
		}, incrementTime);

		return () => {
			
			clearInterval(timer);
		}		

	}, [mintingCountGlobal]);

	



	useEffect(() => {

		if (stakingCountGlobal === "0") {

			return;
		}

		let number = String(stakingCountGlobal);

		let start = 0;
		const end = stakingCountGlobal;


		//console.log("start", start);
		//console.log("end", end);

		let incrementTime = 1;

		let timer = setInterval(() => {
			

			const amount = Number(start).toFixed(0);

			if (start <= end) {

				setThisStakingCountGlobal(amount);
				start += 1;
			}
			
		}, incrementTime);


		return () => {
			
			clearInterval(timer);

	
		}		

	}, [stakingCountGlobal]);







	
	useEffect(() => {

		//setAddress(window.klaytn.selectedAddress);

		//console.log("GameHeader useEffect address", address);
		//console.log("GameHeader useEffect miningAmountGlobal", miningAmountGlobal);
		
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
		


	}, [address, refNFT, ]);




	const onChange = (event) => {

        console.log(event.target);

    }

	const connectWallet = async() => {

		if (address) {

			return;
		}

		//console.log("connectWallet");


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


	const selectContract = async (contractName) => {

		if (contractName === "GDX") {
			setContractAddress("0x771b7d7c1bf142f68b8ae72575ae80a08714c714");
			setBaseURI("https://gogodino.saltmarble.io/metaexplorers/json");
		} else {
			setContractAddress("0xd2e641b4dccc8d7c80a020324db1fcbf457f1363");
			setBaseURI("https://miya.sunmiya.club");

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



	



	//const container = document.querySelector('..fireworks-example');


	return (

		<header className="mt-0 flex flex-col">
			{/* logotype */}
			{/*
			<h1 className="text-center text-5xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">GOGO DINO Meta Explorers<br></br>NFT Staking </a>
			</h1>
	*/}



			{/* find NFT's form */}
			<form className="mt-1 flex flex-row justify-between">

			{/*
			<wholepage
			className={`container m-auto flex  min-h-screen flex-col px-5 text-center sm:px-10 md:px-20 ${
				data !== [] ? "justify-evenly" : "justify-between"
				
			} 
			`}
		*/}

				<Image
					className="float-left my-5 w-auto self-center" 
					src={`/logo_${nftSymbol}.png`}
					alt={`${nftSymbol}`}
					width={100}
					height={100} 
					
				/>
			

				<button ref={refNFT} onClick={(e) => {e.preventDefault(); fetchNFTs(e);}}>

				</button>

				<button
					className="  float-right my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1
					font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]
					duration-200  ease-in-out hover:bg-teal-300"
					onClick={(e) => {e.preventDefault(); selectContract("GDX")} }> GDX </button>
				<button
					className="  float-right my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1
					font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]
					duration-200  ease-in-out hover:bg-teal-300"
					onClick={(e) => {e.preventDefault(); selectContract("MIYA")} }> MIYA </button>

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
			{/*
			<ul  className="p-3 flex flex-row justify-between divide-x divide-slate-200">
		*/}

			<cards className="mt-0 grid justify-center gap-10
							sm:grid-cols-2
							md:grid-cols-2
							lg:grid-cols-2
							xl:grid-cols-2

							grid-cols-1 ">	

				<div className="float-right flex py-0 first:pt-0 last:pb-0 ">
					
					<div className="mt-3 ml-6 h-12 w-12 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="gold-fish"
							src={goldFishAddress}
							speed="5"
							loop
							autoplay
						></lottie-player>
					</div>

					<div className="flex-auto mr-8 overflow-hidden text-right ">
						<p className="text-normal font-medium text-slate-200">
							Staking Count Total ({nftSymbol})
						</p>
						{/*
						<p className=" text-2xl text-amber-400 truncate">
						*/}
							
							<div className={classes.number}>{thisStakingCountGlobal} / {thisMintCountGlobal}</div>
						{/*
						</p>
						*/}
					</div>

				</div>

				<div className="float-left flex py-0 first:pt-0 last:pb-0 ">
					
					<div className="mt-3 ml-6 h-10 w-10 -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
						<lottie-player
							id="crypto-tower"
							src={depositingNFTAddress}
							speed="1"
							loop
							autoplay
						></lottie-player>
					</div>

					<div className="flex-auto mr-9 overflow-hidden text-right ">
						<p className="text-normal font-medium text-slate-200">
						Current Earned Total ($SML)
						</p>
						{/*
						<p className="font-mono text-2xl text-amber-400 truncate">
						*/}
							
							<div className={classes.number}>{thisMiningAmountGlobal} / 20000000</div>
						{/*
						</p>
					*/}
					</div>


				</div>

			</cards>

			{/*!address &&

				<Image
					className="float-center w-full mb-5 " 
					src={`/banner_${nftSymbol}.png`}
					alt={`${nftSymbol}`}
					width={500}
					height={500} 
				/>

				*/}
				

		</header>

	)

}