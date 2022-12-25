import React, { useState } from "react";

export default function useMintNFT(address) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isInHome, setIsInHome] = useState(true);

	const mintNFT = async (e) => {
	
		// this error
		e.preventDefault();

		console.log("mintNFT address",address);



		if (address === "") {
			alert("Please provide Wallet Address!");
			return;
		}


		setData([]);
		setIsLoading(true);
		setIsInHome(false);


		try {

			/*
			const stakingAddress = "0x0a3548D4621075B2E5B9c6B2e99B9B61d19570db";
			const stakingResponse = await fetch(`/api/get-nfts?wallet=${stakingAddress}`);
			if (!stakingResponse.ok) {
				alert("Something went wrong! Check your Input or Connection");
				setIsLoading(false);
				setIsInHome(true);
				return;
			}


			const stakingData = await stakingResponse.json();

			//console.log("stakingData="+stakingData);

			if (stakingData.data.totalCount == 0) {
				
				//setIsInHome(true);
				//setIsLoading(false);
				//alert("This Wallet has no NFTs");
				
			}

			// alchemy
			setData(stakingData.data.ownedNfts);

			setIsLoading(false);
			return;
			*/



			const response = await fetch(`/api/mint-nft?wallet=${address}`);

			console.log("response=", response);

			if (!response.ok) {
				alert("Something went wrong! Check your Input or Connection");
				setIsLoading(false);
				setIsInHome(true);
				return;
			}



			const data = await response.json();

			//console.log("data="+data);

			if (data.data.totalCount == 0) {
				setIsInHome(true);
				setIsLoading(false);
				alert("This Wallet has no NFTs");
			}

			// alchemy
			setData(data.data.ownedNfts);

			//console.log(data.data.ownedNfts);

			//console.log(data.data.items);


			// caver
			///setData(data.data.items);


			setIsLoading(false);
			return;

		} catch (err) {
			console.log("err="+err);
			alert("There was an error fetching NFTs!----");
			return;
		}
	};

	return { mintNFT, data, isInHome, isLoading };
}
