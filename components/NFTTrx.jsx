import Image from "next/image";
import React from "react";

// --------------------------
export default function NFTTrx({
	trxData,
}) {

	return (

		<div className="m-auto flex  max-w-[70%] flex-col rounded-lg border border-gray-300 p-3  sm:m-0 sm:max-w-lg ">

			<Image
				src={
					trxData?.media[0]?.gateway ||
					"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
				}
				alt={trxData?.description}
				width={500}
				height={500}
			/>
			{/* title */}
			<div className="mt-2 rounded-md bg-teal-50 px-2">
				{trxData.title ? (
					<p className="font-semibold">{trxData.title}</p>
				) : (
					<i>&lt; no title &gt;</i>
				)}
			</div>

			{/* contract info */}
			<div className="mt-2 flex table-fixed flex-row justify-center">
				<div className=" truncate rounded-l-md bg-teal-200 px-2 py-1">
					Contract: {trxData.contract.address}
				</div>

				<button
					className="w-auto rounded-r-md bg-teal-500 px-2 py-1 hover:mix-blend-hard-light"

					onClick={() =>
						navigator.clipboard.writeText(cardData.contract.address)
					}
				>
					<p className="font-medium">Copy</p>
				</button>
			</div>

			{/* staking info */}
			<div className="mt-2 flex table-fixed flex-row justify-center">
				<div className=" truncate rounded-l-md bg-teal-200 px-2 py-1">
					{/*cardData.contract.address*/}

					{/*
					Holder: {cardData.owner}
					*/}
				
					{
						trxData.staking === 'true'
						? <p>Staking...</p>
						: <p>Unstaking...</p>
					}

				</div>
			</div>

		</div>

	);
}

