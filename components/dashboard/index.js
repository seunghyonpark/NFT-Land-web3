import React from "react";
import router from "next/router";

import { useState, useEffect } from "react";

import classes from "./index.module.css";


export default function DashboardHeader({ address, setAddress, fetchNFTs }) {

	if (address) {
		console.log("DashboardHeader address==="+address);
	}

	const onChange = (event) => {

        console.log(event.target);

    }


	const loadAccountInfo = async (e) => {

		e.preventDefault();

		const {klaytn} = window;
		
		if (klaytn) {

			try {
				console.log("before klaytn.enable");

				

				const accounts = await klaytn.enable();

				console.log("after klaytn.enable");

				if (accounts) {

					//fetchNFTs();

					console.log("accounts="+accounts);
					setAddress(accounts);

					if (address) {
						console.log("loadAccountInfo address="+address);

						fetchNFTs();
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


	
	useEffect(() => {
		
		console.log("StakingHeader useEffect1 Start");


		/*
		if (klaytn.selectedAddress) {
			console.log("klaytn.selectedAddress="+klaytn.selectedAddress);

			//setAddress(klaytn.selectedAddress);
		}
		*/
		

		
		if (address === "") {

			
		} else {
			console.log("StakingHeader useEffect address="+address);
			//fetchNFTs();
		}
		

		

		return () => {
			
		}
		

	}, [address]);


	//fetchNFTs(address);  // 반복된다.


	return (

		<header className="mt-10">
			{/* logotype */}
			<h1 className="text-center text-6xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./staking">M.E. NFT Staking Service</a>
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
					onClick={fetchNFTs}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Fetch NFTs
				</button>
				*/}

				{/*
				<button
					onClick={() => router.push("/index")}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Home
				</button>
				*/}

				<h3 className="text-center text-6xl font-extrabold text-amber-400 drop-shadow-xl ">
					<a href="./">go Home</a>
				</h3>

			</form>


			<div className={classes.centerflipcards}>

				<div className={classes.squareflip}>
					<div className={classes.square} data-image="">
						<div className={classes.squarecontainer}>
							<div className={classes.aligncenter}><img className={classes.boxshadow} src="https://gogodino.saltmarble.io/metaexplorers/images/59.png" alt=""/></div>
							<h2 className={classes.textshadow}>GOGO DINO META EXPLORERS #59</h2>
							<h3 className={classes.textshadow}>The #1 Selling Most Enjoyable and Creative Multipurpose WordPress theme.</h3>
						</div>
						<div className={classes.flipoverlay}></div>
					</div>
					<div className={classes.square2} data-image="https://gogodino.saltmarble.io/metaexplorers/images/59.png">
						<div className={classes.squarecontainer2}>
							<div className={classes.aligncenter}>

                            </div>
							<h2>#1 Front-end Visual Website Builder in 2016</h2>
						</div>
						<div className={classes.flipoverlay}></div>
					</div>
				</div>

                <div className={classes.squareflip}>
					<div className={classes.square} data-image="">
						<div className={classes.squarecontainer}>
							<div className={classes.aligncenter}><img className={classes.boxshadow} src="https://gogodino.saltmarble.io/metaexplorers/images/60.png" alt=""/></div>
							<h2 className={classes.textshadow}>GOGO DINO META EXPLORERS #60</h2>
							<h3 className={classes.textshadow}>The #1 Selling Most Enjoyable and Creative Multipurpose WordPress theme.</h3>
						</div>
						<div className={classes.flipoverlay}></div>
					</div>
					<div className={classes.square2} data-image="">
						<div className={classes.squarecontainer2}>
							<div className={classes.aligncenter}></div>
							<h2>#1 Front-end Visual Website Builder in 2016</h2>
						</div>
						<div className={classes.flipoverlay}></div>
					</div>
				</div>

                <div className={classes.squareflip}>
					<div className={classes.square} data-image="">
						<div className={classes.squarecontainer}>
							<div className={classes.aligncenter}><img className={classes.boxshadow} src="https://gogodino.saltmarble.io/metaexplorers/images/61.png" alt=""/></div>
							<h2 className={classes.textshadow}>GOGO DINO META EXPLORERS #61</h2>
							<h3 className={classes.textshadow}>The #1 Selling Most Enjoyable and Creative Multipurpose WordPress theme.</h3>
						</div>
						<div className={classes.flipoverlay}></div>
					</div>
					<div className={classes.square2} data-image="">
						<div className={classes.squarecontainer2}>
							<div className={classes.aligncenter}></div>
							<h2>#1 Front-end Visual Website Builder in 2016</h2>
						</div>
						<div className={classes.flipoverlay}></div>
					</div>
				</div>

                <div className={classes.squareflip}>
					<div className={classes.square} data-image="">
						<div className={classes.squarecontainer}>
							<div className={classes.aligncenter}><img className={classes.boxshadow} src="https://gogodino.saltmarble.io/metaexplorers/images/62.png" alt=""/></div>
							<h2 className={classes.textshadow}>GOGO DINO META EXPLORERS #62</h2>
							<h3 className={classes.textshadow}>The #1 Selling Most Enjoyable and Creative Multipurpose WordPress theme.</h3>
						</div>
						<div className={classes.flipoverlay}></div>
					</div>
					<div className={classes.square2} data-image="">
						<div className={classes.squarecontainer2}>
							<div className={classes.aligncenter}></div>
							<h2>#1 Front-end Visual Website Builder in 2016</h2>
						</div>
						<div className={classes.flipoverlay}></div>
					</div>
				</div>

                <div className={classes.squareflip}>
					<div className={classes.square} data-image="">
						<div className={classes.squarecontainer}>
							<div className={classes.aligncenter}><img className={classes.boxshadow} src="https://gogodino.saltmarble.io/metaexplorers/images/63.png" alt=""/></div>
							<h2 className={classes.textshadow}>GOGO DINO META EXPLORERS #63</h2>
							<h3 className={classes.textshadow}>The #1 Selling Most Enjoyable and Creative Multipurpose WordPress theme.</h3>
						</div>
						<div className={classes.flipoverlay}></div>
					</div>
					<div className={classes.square2} data-image="">
						<div className={classes.squarecontainer2}>
							<div className={classes.aligncenter}></div>
							<h2>#1 Front-end Visual Website Builder in 2016</h2>
						</div>
						<div className={classes.flipoverlay}></div>
					</div>
				</div>


				<div className={classes.clearfix}></div>


			
			</div>

		</header>
	);
}


