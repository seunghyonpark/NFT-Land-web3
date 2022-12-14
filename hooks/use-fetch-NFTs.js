import React, { useState } from "react";

function useFetchNFTs(address) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isInHome, setIsInHome] = useState(true);

	const fetchNFTs = async (e) => {
		
		// this error
		//e.preventDefault();

		if (address === "") {
			alert("Please provide Wallet Address!");
			return;
		}
		setData([]);
		setIsLoading(true);
		setIsInHome(false);

		try {

			console.log("cccccc");

			const response = await fetch(`/api/get-nfts?wallet=${address}`);


			console.log("aaa");

			if (!response.ok) {
				alert("Something went wrong! Check your Input or Connection");
				setIsLoading(false);
				setIsInHome(true);
				return;
			}

			console.log("bbb");

			const data = await response.json();

			console.log(data);

			if (data.data.totalCount == 0) {
				setIsInHome(true);
				setIsLoading(false);
				alert("This Wallet has no NFTs");
			}

			// alchemy
			setData(data.data.ownedNfts);

			//console.log(data.data.items);


			// caver
			///setData(data.data.items);


			setIsLoading(false);
			return;

		} catch (err) {
			console.log(err);
			alert("There was an error fetching NFTs!----");
			return;
		}
	};

	return { fetchNFTs, data, isInHome, isLoading };
}

export default useFetchNFTs;
