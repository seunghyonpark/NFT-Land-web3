import React from "react";
import router from "next/router";

function StakingHeader({ address, setAddress, fetchNFTs }) {



	//fetchNFTs(address);



	return (
		<header className="mt-10">
			{/* logotype */}
			<h1 className="text-center text-6xl font-extrabold text-amber-400 drop-shadow-xl ">
				<a href="./staking">GDX Staking Service</a>
			</h1>
			{/* find NFT's form */}
			<form className="mt-5 flex flex-col">
				<input
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					type="text"
					placeholder="Paste Wallet Address Here"
					className="w-10/12 self-center rounded-sm pl-2 shadow-lg  sm:w-[25rem] "
				/>
				{/* for test */}
				<p className="mt-2">for test: 0x6ee920d88e04ce17565e4dbcdd60befa8a29337c</p>
				<button
					onClick={fetchNFTs}
					className=" my-5 w-auto self-center rounded-lg bg-amber-400 px-5 py-1 font-semibold text-gray-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] duration-200  ease-in-out hover:bg-teal-300"
				>
					Find NFTs !
				</button>

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
		</header>
	);
}

export default StakingHeader;
