import React, { useMemo } from "react";

//import Layout from "../components/Layout";
//import classes from "../components/Layout/index.module.css";
import Chain from "../components/chain";

import { fetcher, populateChain } from "../utils";
import { useSearch, useTestnets } from "../stores";


/*
export async function getStaticProps({ locale }) {
	const chains = await fetcher("https://chainid.network/chains.json");
	const chainTvls = await fetcher("https://api.llama.fi/chains");
  
	const sortedChains = chains
	  .filter((c) => c.name !== "420coin") // same chainId as ronin
	  .map((chain) => populateChain(chain, chainTvls))
	  .sort((a, b) => {
		return (b.tvl ?? 0) - (a.tvl ?? 0);
	  });
  
	return {
	  props: {
		sortedChains,
		messages: (await import(`../translations/${locale}.json`)).default,
	  },
	  revalidate: 3600,
	};
}
*/


function Header({ address, setAddress, fetchNFTs }) {


	const setAccountInfo = async () => {
		console.log("setAccountInfo");

		const { klaytn } = window;

		console.log(klaytn);

		if (klaytn) {
			try {
				await klaytn.enable();


				const account = klaytn.selectedAddress;

				console.log("account="+account);
		
				const balance = await caver.klay.getBalance(account);
				console.log("balance="+balance);
				/*
				this.setState({
				  account,
				  balance: caver.utils.fromPeb(balance, 'KLAY'),
				})
				*/
		
				setAddress(account);

				//klaytn.on('accountsChanged', () => this.setAccountInfo(klaytn));
			} catch (error) {
				console.log('User denied account access');
			}
		} else {
			console.log('Non-Kaikas browser detected. You should consider trying Kaikas!');
		}

	}

	//const testnets = useTestnets((state) => state.testnets);
	//const search = useSearch((state) => state.search);

	/*
	const chains = useMemo(() => {
		if (!testnets) {

		  return sortedChains.filter((item) => {
			const testnet =
			  item.name?.toLowerCase().includes("test") ||
			  item.title?.toLowerCase().includes("test") ||
			  item.network?.toLowerCase().includes("test");
			const devnet =
				item.name?.toLowerCase().includes("devnet") ||
				item.title?.toLowerCase().includes("devnet") ||
				item.network?.toLowerCase().includes("devnet");
			return !testnet && !devnet;
		  });

		} else return sortedChains;

	  }, [testnets, sortedChains]
	);
	*/


	return (
		<header className="mt-10">
			{/* logotype */}
			<h1 className="text-center text-6xl font-extrabold text-amber-400/50 drop-shadow-xl ">
				<a href="./">M.E. NFT Staking Service</a>
			</h1>

			<button
					onClick={setAccountInfo}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>

					Connect Kaikas {address}
			</button><br></br>


			

				{
				/*
				(search === ""
					? chains
					: chains.filter((chain) => {
						//filter
						return (
							chain.chain.toLowerCase().includes(search.toLowerCase()) ||
							chain.chainId
								.toString()
								.toLowerCase()
								.includes(search.toLowerCase()) ||
							chain.name.toLowerCase().includes(search.toLowerCase()) ||
							(chain.nativeCurrency ? chain.nativeCurrency.symbol : "")
								.toLowerCase()
								.includes(search.toLowerCase())
						);
					})
				).map((chain, idx) => {
					return <Chain chain={chain} key={idx} />;
				})
				*/
				}

			



			<button
					onClick={fetchNFTs}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Find NFTs !
			</button>

			{/* find NFT's form */}
			{/*
			<form className="mt-5 flex flex-col">
				<input
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					type="text"
					placeholder="Paste Wallet Address Here"
					className="w-10/12 self-center rounded-sm pl-2 shadow-lg  sm:w-[25rem]"
				/>


				<p className="mt-2">for test: 0x73d4dbc43b95cf2290b6f90c4d7a4bac22658e24</p>

				<p className="mt-2">for test: 0xaD87a8a48E59B1448Dc2317FD7886f2d89132b71</p>

				
				<button
					onClick={fetchNFTs}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Find NFTs !
				</button>
			</form>
			*/}

		{/*
			<h1>hello</h1>
			<button
				onClick={(e) => handleClick(e, "/staking")}
				className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
			>
				Staking
			</button>
		*/}

		{/*
			<button
				onClick={() => router.push("/staking")}
				className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
			>
				Stake my NFT
			</button>
		*/}

			<h3 className="text-center text-6xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./staking">go Staking</a>
			</h3>

		</header>
	);
}

export default Header;
