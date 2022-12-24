import React from "react";
import NFTTrx from "./NFTTrx";
import { v4 as uuidv4 } from "uuid";

export default function CardMain({
	data,
}) {
	
	return (
		<main>

			{/* cards container */}
			<transactions className="mt-4 grid justify-center gap-5 md:grid-cols-1 lg:grid-cols-1 ">
				{data.map((trx) => (
					// uuid!
					<NFTTrx
						key={uuidv4()}
						trxData={trx}
					>
					</NFTTrx>
				))}
			</transactions>
			
		</main>
	);
}

