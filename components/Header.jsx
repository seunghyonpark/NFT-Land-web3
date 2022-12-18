import React from "react";
import router from "next/router";

function Header({ address, setAddress, fetchNFTs }) {
	return (
		<header className="mt-10">
			{/* logotype */}
			<h1 className="text-center text-6xl font-extrabold text-amber-400/50 drop-shadow-xl ">
				<a href="./">GDX Staking Service</a>
			</h1>
			{/* find NFT's form */}
			<form className="mt-5 flex flex-col">
				<input
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					type="text"
					placeholder="Paste Wallet Address Here"
					className="w-10/12 self-center rounded-sm pl-2 shadow-lg  sm:w-[25rem]"
				/>
				{/* for test */}
				{/* cypress
				<p className="mt-2">for test: 0x73d4dbc43b95cf2290b6f90c4d7a4bac22658e24</p>
				*/}

				{ /* baobab */}
				<p className="mt-2">for test: 0xaD87a8a48E59B1448Dc2317FD7886f2d89132b71</p>

				
				<button
					onClick={fetchNFTs}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Find NFTs !
				</button>
			</form>

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
