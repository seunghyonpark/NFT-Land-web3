import React, { useState } from "react";

export default function useMintNFT(address) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isInHome, setIsInHome] = useState(true);
	const [isConnectWallet, setConnectWallet] = useState(false);
	const [isMinting, setIsMinting] = useState(false);
	const [tokenId, setTokenId] = useState("");



	const mintNFT = async (e) => {
	
		// this error
		e.preventDefault();

		if (address === "") {
			//alert("Please provide Wallet Address!");

			return;
		}



		//setData([]);


		setIsMinting(true);

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

			////console.log("response=", response);

			if (!response.ok) {
				setIsMinting(false);
				
				alert("Something went wrong! Check your Input or Connection");
				//setIsLoading(false);
				//setIsInHome(true);

				
				return;
			}



			const nft = await response.json();

			console.log("nft.data",nft.data);

			//setTokenId(nft.data.tokenId);


			//data.push(nft);

			let updateData = data;
			updateData.unshift(nft.data);


			//console.log("updateData", updateData);

			setData(updateData);

			setIsMinting(false);

			return;

		} catch (err) {
			console.log("err="+err);

			setIsMinting(false);

			alert("There was an error minting NFT!----");

			return;
		}

		

	};



	const checkNFT = async (e) => {
	
		// this error
		e.preventDefault();

		console.log("checkNFT tokenId", tokenId);

		if (tokenId === "") {
			//alert("Please provide Wallet Address!");

			return;
		}


		try {


			const response = await fetch(`/api/check-nft?tokenid=${tokenId}`);

			/////console.log("checkNFT response=", response);

			if (!response.ok) {
				alert("Something went wrong! Check your Input or Connection");
				//setIsLoading(false);
				//setIsInHome(true);
				return;
			}

			const nft = await response.json();

			console.log("useMintNFT checkNFT nft", nft.data.tokenId);

			//setTokenId(data.data.tokenId);

			if (nft.data.tokenId) {
				setIsMinting(false);
			}

			return;

		} catch (err) {
			console.log("err="+err);
			/////alert("There was an error fetching NFTs!----");

			setIsMinting(false);

			return;
		}


	};




	const fetchNFTs = async (e) => {

		e.preventDefault();

		//console.log("fetchNFT address",address);

		

		if (address === "") {
			//alert("Please provide Wallet Address!");
			return;
		}


		//setData([]);


		//setIsLoading(true);
		setIsInHome(false);


		try {

			const response = await fetch(`/api/fetch-nfts?wallet=${address}`);

			//console.log("response=", response);

			if (!response.ok) {
				alert("Something went wrong! Check your Input or Connection");

				//setIsLoading(false);
				//setIsInHome(true);
				return;
			}



			const fetchData = await response.json();

			//console.log("data="+data);

			if (fetchData.data.totalCount == 0) {
				//setIsInHome(true);
				//setIsLoading(false);
				alert("This Wallet has no NFTs");
			}

			// alchemy
			setData(fetchData.data.ownedNfts);

			//console.log(data.data.ownedNfts);

			//console.log(data.data.items);


			// caver
			///setData(data.data.items);


			//setIsLoading(false);
			return;

		} catch (err) {
			console.log("err="+err);
			alert("There was an error fetching NFTs!----");
			return;
		}
	};



	return { mintNFT, checkNFT, fetchNFTs, data, isInHome, isLoading, isConnectWallet, isMinting, tokenId };
}
