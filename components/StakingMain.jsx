import React from "react"
//import NFTCardStaked from "./NFTCardStaked"
import NFTCardStaked from "./NFTCardStaked/index.jsx"
import { v4 as uuidv4 } from "uuid"


export default function StakingMain({
	stakeData,
	isInHome,
	isLoading,
	isConnectWallet,
	cryptoTowerAddress,
	goldFishAddress,
	loadingCubesAddress,
	depositingNFTAddress,
	dataProcessingAddress,
	setTokenId,
	withdrawNFT,
}) {
	

	//return data.lenghth > 0 && (
	return (

		<main>

			{/* logotype */}
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
					<img class="h-12 w-12 rounded-full" src="./sml.png" alt="" />
					<div class="ml-3 overflow-hidden text-left">
						<p class="text-xs font-medium text-slate-900">
						Current Earned Total ($SML)
						</p>
						<p class="text-3xl text-amber-400 truncate">43.1342632545223444355</p>
					</div>
				</li>

			</ul>


			{/* cards container */}
			<cards className="mt-4 grid justify-center gap-5 md:grid-cols-1 lg:grid-cols-1 ">
				{stakeData?.map((nft) => (
					// uuid!
					<NFTCardStaked
						key={uuidv4()}
						cardData={nft}
						cryptoTowerAddress={cryptoTowerAddress}
						loadingCubesAddress={loadingCubesAddress}
						depositingNFTAddress={depositingNFTAddress}
						dataProcessingAddress={dataProcessingAddress}
						setTokenId={setTokenId}
						withdrawNFT={withdrawNFT}
					>
					</NFTCardStaked>
				))}
			</cards>





			{/*
			(stakeData?.length === 0) && (isInHome === false) && (isLoading === false) &&
				<div className="m-auto h-[18rem] w-[15rem] -translate-x-3 -translate-y-3 scale-110 drop-shadow-xl">
				<lottie-player
					id="crypto-tower"
					src={goldFishAddress}
					speed="1"
					loop
					autoplay
				></lottie-player>
			</div>			
				*/}
		

			{/* home page animation */}
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


			{/* data fetching animation */}
			{isLoading && (
				<div className="m-auto h-[18rem] w-[18rem] -translate-y-5 opacity-80 drop-shadow-xl">
					<lottie-player
						id="loading-cubes"
						src={loadingCubesAddress}
						speed="1"
						loop
						autoplay
					></lottie-player>
				</div>
			)}
			
		</main>

	);
}
