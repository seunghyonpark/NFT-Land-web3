import React, { useState } from "react";

import contractABI from "../constants/contractABI.json";

export default function useStakeNFT(tokenId) {
	const [data, setData] = useState([]);
	const [isInHome, setIsInHome] = useState(true);
	const [isLoading, setIsLoading] = useState(false);


	const address = "0x3db3Fb2E3d2A51C71BcAd2A4fC022828B835d005"; // staking wallet

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

		console.log("stakeNFT tokenId", tokenId);

		if (tokenId === "") {
			alert("Please provide tokenId!");
			return;
		}


		setData([]);
		setIsLoading(true);
		setIsInHome(false);

		/*
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

			*/
			


			// https://baobab.scope.klaytn.com/nft/0x3f7a4d253c954ba0deb1c0ac2c031595c02f231b
			const contractAddress = "0x3f7a4d253c954ba0deb1c0ac2c031595c02f231b";


			const to = "0x0a3548D4621075B2E5B9c6B2e99B9B61d19570db"; // Staking Wallet Address
			const amount = 1000000000000000000n; // 토큰 1개
			
			const contract = new window.caver.klay.Contract(contractABI, contractAddress);
			
			console.log("contract", contract); // 컨트랙트 객체가 만들어졌다.
			
			// 토큰을 전송하는 매서드를 실행한다.
			/*
			const transfer = await contract.methods.transfer(to, amount).send({
				from : window.klaytn.selectedAddress, 
				gas: 8000000
			}); 
			*/

			const from = window.klaytn.selectedAddress;


			const transfer = await contract.methods.transferFrom(from, to, tokenId).send({
				from : from, 
				gas: 8000000
			}); 

			console.log("transfer", transfer);
			





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


