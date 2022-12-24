import React, { useState } from "react";

export default function useStakeNFT(tokenId) {
	const [data, setData] = useState([]);
	const [isInHome, setIsInHome] = useState(true);
	const [isLoading, setIsLoading] = useState(false);


	const address = "0x3db3Fb2E3d2A51C71BcAd2A4fC022828B835d005";

	const fetchNFTs = async () => {

		try {

			const response = await fetch(`/api/get-nfts?wallet=${address}`);

			console.log("response",response);
		
			if (!response.ok) {
				alert("Something went wrong! Check your Input or Connection");
				//setIsLoading(false);
				//setIsInHome(true);
				return;
			}

			const data = await response.json();

			//console.log("data",data);

			if (data.data.totalCount == 0) {
				setIsInHome(true);
				setIsLoading(false);
				alert("This Wallet has no NFTs");
			}

			// alchemy
			setData(data.data.ownedNfts);

		} catch (err) {
			console.log("err",err);
			alert("There was an error fetching NFTs!----");
			return;
		}

	}



	const depositNFT = async (e) => {

		e.preventDefault();


		setData([]);
		setIsLoading(true);
		setIsInHome(false);

		window.caver.klay
			.sendTransaction({
				type: 'VALUE_TRANSFER',
				from: window.klaytn.selectedAddress,
				to: '0x0a3548D4621075B2E5B9c6B2e99B9B61d19570db',
				value: window.caver.utils.toPeb('1', 'KLAY'), // 1 클레이 전송
				gas: 8000000
			})
			.once('transactionHash', transactionHash => {
				console.log('txHash', transactionHash);
			})
			.once('receipt', receipt => {
				console.log('receipt', receipt);

				//setData(receipt);

				fetchNFTs();


				setIsLoading(false);
			})
			.once('error', error => {
				console.log('error', error);
				//alert("지불에 실패하셨습니다.");

				setIsLoading(false);
				setIsInHome(true);
			})



		console.log("stakeNFT tokenId", tokenId);

		if (tokenId === "") {
			alert("Please provide tokenId!");
			return;
		}



		/*
		try {

			const response = await fetch(`/api/get-nfts?wallet=${address}`);

			console.log("response="+response);

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

		*/
		

	};


	const withdrawNFT = async (e) => {

		e.preventDefault();


		setData([]);
		setIsLoading(true);
		setIsInHome(false);


		window.caver.klay
			.sendTransaction({
				type: 'VALUE_TRANSFER',
				from: window.klaytn.selectedAddress,
				to: '0x0a3548D4621075B2E5B9c6B2e99B9B61d19570db',
				value: window.caver.utils.toPeb('1', 'KLAY'), // 1 클레이 전송
				gas: 8000000
			})
			.once('transactionHash', transactionHash => {
				console.log('txHash', transactionHash);
			})
			.once('receipt', receipt => {
				console.log('receipt', receipt);
			})
			.once('error', error => {
				console.log('error', error);
				alert("지불에 실패하셨습니다.");
			})

		console.log("stakeNFT tokenId", tokenId);

		if (tokenId === "") {
			alert("Please provide tokenId!");
			return;
		}



		/*
		try {

			const response = await fetch(`/api/get-nfts?wallet=${address}`);

			console.log("response="+response);

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
		*/

	};

	return { depositNFT, withdrawNFT, data, isInHome, isLoading };
}


