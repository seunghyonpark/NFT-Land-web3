import React from "react";
import NFTCard from "./NFTCard";
import { v4 as uuidv4 } from "uuid";

function StakingMain({
	data,
	isInHome,
	isLoading,
	cryptoTowerAddress,
	loadingCubesAddress,
}) {
	
	return (
		<main>

			{/* cards container */}
			<cards className="mt-4 grid justify-center gap-5 md:grid-cols-2 lg:grid-cols-3 ">
				{data.map((nft) => (
					// uuid!
					<NFTCard
						key={uuidv4()}
						cardData={nft}
						cryptoTowerAddress={cryptoTowerAddress}
						loadingCubesAddress={loadingCubesAddress}
						data={data}
					>

					</NFTCard>
				))}
			</cards>
			

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

export default StakingMain;
