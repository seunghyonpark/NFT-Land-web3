import React, { useState } from "react";

import contractABI from "../constants/contractABI.json";
import stakingABI from "../constants/stakingABI.json";
import walletAddress from "../constants/walletAddress.json";

export default function useMintNFT(address) {
	const [data, setData] = useState([]);
	const [stakeData, setStakeData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isInHome, setIsInHome] = useState(true);
	const [isConnectWallet, setConnectWallet] = useState(false);
	const [isMinting, setIsMinting] = useState(false);
	const [isDepositing, setIsDepositing] = useState(false);
	const [isWithdrawing, setIsWithdrawing] = useState(false);
	const [tokenId, setTokenId] = useState("");


	const contractAddress = "";
	const stakingWalletAddress = "";

	

	const processMintNFT = async () => {

		try {


			const response = await fetch(`/api/mint-nft?wallet=${address}`);


			/// for vercel test

			console.log("mint-nft api result", response);



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
			setData(updateData);

			setIsMinting(false);

			return;

		} catch (err) {
			console.log("err="+err);

			setIsMinting(false);

			alert("There was an error minting NFT!----");

			return;
		}

	}



	const mintNFT = async (e) => {

		e.preventDefault();

		console.log("mintNFT address", address);

		if (address === "") {
			alert("Please provide address!");
			return;
		}

		const wallet = window.klaytn.selectedAddress;

		setIsMinting(true);



		
		//let isPayed = false;

		window.caver.klay
		.sendTransaction({
			type: 'VALUE_TRANSFER',
			from: wallet,
			to: stakingWalletAddress,
			value: window.caver.utils.toPeb('2', 'KLAY'), // 1 클레이 전송
			gas: 8000000
		})
		.once('transactionHash', transactionHash => {
			console.log('txHash', transactionHash);
		})
		.once('receipt', receipt => {
			console.log('receipt', receipt);

			//setData(receipt);

			//fetchNFTs();
			//setIsLoading(false);

			//isPayed = true;


			console.log("isWithdrawing", isWithdrawing);

			processMintNFT();
			
		})
		.once('error', error => {
			console.log('error', error);
			//alert("지불에 실패하셨습니다.");

			//setIsLoading(false);
			//setIsInHome(true);
		})

		/*
		console.log("isPayed", isPayed);

		if (isPayed) {




		}
		*/

	}; // end of mint




	const mintNFTOld = async (e) => {
	
		// this error
		e.preventDefault();

		if (address === "") {
			//alert("Please provide Wallet Address!");

			return;
		}



		//setData([]);


		setIsMinting(true);
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

			//console.log("response=", response);

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
			setData(updateData);




			setIsMinting(false);

			return;

		} catch (err) {
			console.log("err=",err);

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








	const depositNFT = async (tokenId) => {
		

	//const depositNFT = async (e) => {
		//e.preventDefault();
		//setTokenId("384");

		console.log("depositNFT tokenId", tokenId);

		if (tokenId === "") {
			alert("Please provide tokenId!");
			return;
		}




		console.log("depositNFT data.length", data.length);


		//setData([]);
		//setIsLoading(true);
		//setIsInHome(false);

		setIsDepositing(true);



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
			

			/*
			// staking contract
			// https://baobab.scope.klaytn.com/nft/0x7e24b4FCa9d152b6C88Da278DfcF69C129E524f5
			const contractAddress = "0x7e24b4FCa9d152b6C88Da278DfcF69C129E524f5";


			//const to = "0x0a3548D4621075B2E5B9c6B2e99B9B61d19570db"; // Staking Wallet Address
			//const amount = 1000000000000000000n; // 토큰 1개
			
			const contract = new window.caver.klay.Contract(stakingABI, contractAddress);
			
			console.log("contract", contract); // 컨트랙트 객체가 만들어졌다.
			
			*/

			// 토큰을 전송하는 매서드를 실행한다.
			/*
			const transfer = await contract.methods.transfer(to, amount).send({
				from : window.klaytn.selectedAddress, 
				gas: 8000000
			}); 
			*/


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



		try {	

			const contract = new window.caver.klay.Contract(contractABI, contractAddress);

			console.log("contract", contract);
			
			const from = window.klaytn.selectedAddress;
			const to = stakingWalletAddress;
			
			console.log("contractAddress", contractAddress);
			console.log("tokenId", tokenId);
			console.log("from", from);
			console.log("to", to);


			const transfer = await contract.methods.transferFrom(from, to, tokenId).send({
				from : from, 
				gas: 8000000,
			})
			/*
			.once('error', error => {
				console.log('error', error);
				//alert("지불에 실패하셨습니다.");

			})
			*/

			if (transfer) {
				console.log("transfer", transfer);


				let updateData = data;

				console.log("depositNFT data.length", data.length);
				console.log("depositNFT updateData.length", updateData.length);


				let idx;
				for(idx=0; idx < updateData.length; idx++){

					console.log("updateData idx tokenId", updateData[idx].tokenId);
					console.log("tokenId", tokenId);

					if (updateData[idx].tokenId.toString() === tokenId.toString()) {
						break;
					}
				}
				console.log("idx", idx);


				///////////////////////
				updateData[idx].staking = "true";

				//let updateStakeData = stakeData;

				let updateStakeData = new Array();

				updateStakeData.push(updateData[idx]);
				setStakeData(updateStakeData);
				//////////////////////



				updateData.splice(idx, 1);

				setData(updateData);

				console.log("depositNFT data.length", data.length);
				console.log("depositNFT updateData.length", updateData.length);

				
			}


			setIsDepositing(false);
			return;

		} catch (err) {
			console.log("err="+err);

			//setIsMinting(false);

			//alert("There was an error staking NFT!----");

			setIsDepositing(false);

			return;
		}

			//const from = window.klaytn.selectedAddress;

			//const tokenIds = new Array();
			//tokenIds.push(tokenId);

			/*
			    const value = 1 * 1e18 // 1ONE
    const amount = 1
    contract.methods.mint(amount).send({ from: state.connectedWallet, value })
			*/

			//const tttid = 225;

			//const tokenId = parseInt(caver.utils.toBN(totalSupply.result)) + 128;


			
			/*
			const stake = await contract.methods.stake(1).send({
				from : from, 
				gas: 8000000
			});

			console.log("stake", stake);
			*/

	};




	const processWithdrawNFT = async (tokenId) => {

		setIsWithdrawing(true);

		try {

			const wallet = window.klaytn.selectedAddress;

			const response = await fetch(`/api/withdraw-nft?wallet=${wallet}&tokenid=${tokenId}`);

			if (!response.ok) {
				setIsWithdrawing(false);
				
				alert("Something went wrong! Check your Input or Connection");

				return;
			}

			const result = await response.json();

			if (result) {

				console.log("result", result);

				let updateData = stakeData;

				console.log("withdrawNFT stakeData.length", stakeData.length);
				console.log("withdrawNFT updateData.length", updateData.length);


				let idx;
				for(idx=0; idx < updateData.length; idx++){

					console.log("updateData idx tokenId", updateData[idx].tokenId);
					console.log("tokenId", tokenId);

					if (updateData[idx].tokenId.toString() === tokenId.toString()) {
						break;
					}
				}
				console.log("idx", idx);

				updateData.splice(idx, 1);


				setStakeData(updateData);

				console.log("withdrawNFT stakeData.length", stakeData.length);
				console.log("withdrawNFT updateData.length", updateData.length);

				
				///////////////////////
				updateData = data;
				updateData.unshift(result.data);
				setData(updateData);
				//////////////////////

			}


			setIsWithdrawing(false);

			return;

		} catch (err) {
			console.log("err="+err);

			setIsWithdrawing(false);

			alert("There was an error minting NFT!----");

			return;
		}

	}





	const withdrawNFT = async (tokenId) => {

		//e.preventDefault();

		console.log("withdrawNFT tokenId", tokenId);

		if (tokenId === "") {
			alert("Please provide tokenId!");
			return;
		}

		const wallet = window.klaytn.selectedAddress;

		setIsWithdrawing(true);



		
		//let isPayed = false;

		window.caver.klay
		.sendTransaction({
			type: 'VALUE_TRANSFER',
			from: wallet,
			to: stakingWalletAddress,
			value: window.caver.utils.toPeb('3', 'KLAY'), // 1 클레이 전송
			gas: 8000000
		})
		.once('transactionHash', transactionHash => {
			console.log('txHash', transactionHash);
		})
		.once('receipt', receipt => {
			console.log('receipt', receipt);

			//setData(receipt);

			//fetchNFTs();
			//setIsLoading(false);

			//isPayed = true;

			setIsWithdrawing(true);

			console.log("isWithdrawing", isWithdrawing);

			processWithdrawNFT(tokenId);
			
		})
		.once('error', error => {
			console.log('error', error);
			//alert("지불에 실패하셨습니다.");

			//setIsLoading(false);
			//setIsInHome(true);
		})

		/*
		console.log("isPayed", isPayed);

		if (isPayed) {




		}
		*/

	}; // end of withdraw






	return { mintNFT,checkNFT, fetchNFTs, depositNFT, withdrawNFT, setTokenId, data, stakeData, isInHome, isLoading, isConnectWallet, isMinting, isDepositing, isWithdrawing, tokenId };
}
