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
	isMinting,
}) {

	if (address) {
		//console.log("MintHeaderHeader address",address);
		/////fetchNFTs();
		
	}

	const ref = useRef(null);

	const onChange = (event) => {

        console.log(event.target);

    }

	const connectWallet = async() => {

		if (address) {

			return;
		}

		console.log("connectWallet");


		const {klaytn} = window;
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

	
	connectWallet();


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


		ref.current.click();

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

		let i = 0;

		function pollDOM() {
		  //console.log(i);
		  i++;
		  ref.current.click();
		}
		
		const interval = setInterval(pollDOM, 100000);
		return () => clearInterval(interval);


	}, [address]);




	//const container = document.querySelector('..fireworks-example');


	return (

		<header className="mt-10">
			{/* logotype */}
			<h1 className="text-center text-6xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./mint">GDX Mint Service</a>
			</h1>


			{/* find NFT's form */}
			<form className="mt-5 flex flex-col">

				<input
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					type="text"
					placeholder="Your Wallet Address"
					className=" w-10/12 self-center rounded-sm pl-2 shadow-lg  sm:w-[25rem] "
				/>

				<button
					onClick={loadAccountInfo}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Connect Kaikas
				</button>

				{/*
				<button
					onClick={mintNFT}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Mint NFT
				</button>
				*/}

				<button
					ref={ref}
					onClick={fetchNFTs}
					className=" invisible my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Fetch NFTs
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

		</header>

	)

}