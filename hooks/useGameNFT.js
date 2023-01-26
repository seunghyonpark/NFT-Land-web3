import React, { useState, useEffect, useRef } from "react";

import contractABI from "../constants/contractABI.json";
import stakingABI from "../constants/stakingABI.json";
import { min } from "rxjs";


export default function useGameNFT(address, chainId, contractOwnerAddress, contractAddress, stakingWalletAddress, nftSymbol) {

	const [stakeDataGlobal, setStakeDataGlobal] = useState([]);
	const [data, setData] = useState([]);
	const [stakeData, setStakeData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isInHome, setIsInHome] = useState(true);
	const [isConnectWallet, setConnectWallet] = useState(false);
	const [isMinting, setIsMinting] = useState(false);
	const [isDepositing, setIsDepositing] = useState(false);
	const [isWithdrawing, setIsWithdrawing] = useState(false);
	const [tokenId, setTokenId] = useState("");
	const [holdingCount, setHoldingCount] = useState("0");
	const [stakingCount, setStakingCount] = useState("0");
	const [selectedCard, setSelectedCard] = useState("");

	const [miningAmountTotal, setMiningAmountTotal] = useState("0.00000000");

	const [mintingCountGlobal, setMintingCountGlobal] = useState("0");
	const [stakingCountGlobal, setStakingCountGlobal] = useState("0");
	const [miningAmountGlobal, setMiningAmountGlobal] = useState("0");

	const [stakingNFT, setStakingNFT] = useState(nftSymbol);


	////console.log("useGameNFT stakingWalletAddress", stakingWalletAddress);
	
	/*
	useEffect(() => {

		//setAddress(window.klaytn.selectedAddress);

		//console.log("useGameNFT useEffect address", address);


		if (address === "") {
			setData([]);
			setStakeData([]);
			setStakingCount("0");
			setSelectedCard("");
			setIsInHome(true);
			setMiningAmountTotal("0");

			return;
		} else {

		}

		/*
		let i = 0;
		function pollDOM() {
			//console.log(i);
			i++;

			if (address !== "") {

			console.log("data.length", data.length);

			let inSecondsTotal = 0;
		  	for(let idx=0; idx < data.length; idx++){

				if (data[idx].staking === "true") {
					const today = new Date();
					const startday = new Date(data[idx].timeStart);

					const inSeconds = Math.floor((today.getTime()-startday.getTime())/1000);

					inSecondsTotal = inSecondsTotal + inSeconds;
				}

			}

			setMiningAmountTotal(Number(inSecondsTotal/100000000).toFixed(8));

			}

		}

		const interval = setInterval(pollDOM, 1000);
		


		return () => {
			
			//clearInterval(interval);

		}

	}, [address, data, setMiningAmountTotal]);
	*/



	



	useEffect(() => {

		console.log("useGameNFT useEffect contractAddress==========", contractAddress);
		console.log("useGameNFT useEffect chainId==========", chainId);
		console.log("useGameNFT useEffect stakingWalletAddress==========", stakingWalletAddress);



		const fetchNFTsGlobal = async () => {

			///console.log("fetchNFTsGlobal");
	
			try {
				const response = await fetch(`/api/game-fetch-nfts?chainid=${chainId}&contract=${contractAddress}`);
	
				if (!response.ok) {
					//alert("Something went wrong! Check your Input or Connection");
	
					return;
				}
	
				const fetchData = await response.json();


				/*
	
				const range = 3;
				const randomNumber = Math.random() * range;
	
				const stakingCountGlobal = Number(fetchData.data.stakingCountGlobal) + Math.floor(randomNumber);
	
				const miningAmountGlobal = Number(fetchData.data.miningAmountGlobal) + randomNumber/100000000;
	
				setStakingCountGlobal(stakingCountGlobal);
	
				setMiningAmountGlobal(miningAmountGlobal);
				*/
	
				const stakingCountGlobal = fetchData.data.stakingCountGlobal;
				setStakingCountGlobal(stakingCountGlobal);
	
				const miningAmountGlobal = fetchData.data.miningAmountGlobal;
				setMiningAmountGlobal(miningAmountGlobal);
	
	
				const mintingCountGlobal = fetchData.data.mintingCountGlobal;
				setMintingCountGlobal(mintingCountGlobal);
				
				//return;
	
			} catch (err) {
	
				console.log("err="+err);
				//alert("There was an error fetching NFTs!----");
				//return;
			}




			try {
				
				const response = await fetch(`/api/game-fetch-nfts-more?chainid=${chainId}&contract=${contractAddress}&wallet=${address}&stakingwallet=${stakingWalletAddress}`);
	
				if (!response.ok) {
					return;
				}
	
				const fetchData = await response.json();
	

	
				if (fetchData.data.ownedNfts.length === 0) {

					setStakeDataGlobal(fetchData.data.ownedNfts);
				} else {

					
	
					// alchemy
					setStakeDataGlobal(fetchData.data.ownedNfts);
	
					//setHoldingCount(fetchData.data.ownedNfts.length);
	
					//setMiningAmountTotal(fetchData.miningAmountTotal);
	
				}
	
				/*
				// update staking count
				let sCount = 0;
				for(let idx=0; idx < fetchData.data.ownedNfts.length; idx++){
	
					if (fetchData.data.ownedNfts[idx].staking === "true") {
						sCount = sCount + 1;
					}
	
				}
				setStakingCount(String(sCount));
				*/

	
			} catch (err) {
				///setIsLoading(false);
	
				console.log("err="+err);
				///alert("There was an error fetching NFTs!----");

			}





	
		};



		fetchNFTsGlobal();

		/*
		let i = 0;
		function pollDOM() {
			////console.log("useGameNFT useEffect i", i);
			i++;

			fetchNFTsGlobal();

		}
		*/

		let intervalMiliSecond;
		if (address) {
			intervalMiliSecond = 30000;
		} else {
			intervalMiliSecond = 50000;
		}

		const interval = setInterval(fetchNFTsGlobal, intervalMiliSecond);

		return () => {
			
			clearInterval(interval);

		}
		

	//}, [address, data, miningAmountTotal]);
	}, [address, contractAddress, chainId, stakingWalletAddress]);





	useEffect(() => {

		//console.log("useGameNFT useEffect contractAddress-------------", contractAddress);

		if (address) {

			console.log("useGameNFT address", address);

			//const wallet = window.klaytn.selectedAddress;
			const chainId = window.klaytn.chainId;

			console.log('Connected to chain:' + chainId);
			
		}
		else return;

		const fetchNFTs = async () => {

			setData([]);
			setIsLoading(true);
	
			try {

				const response = await fetch(`/api/game-fetch-nfts?chainid=${chainId}&contract=${contractAddress}&wallet=${address}&stakingwallet=${stakingWalletAddress}`);
	
				if (!response.ok) {
					setIsLoading(false);
					return;
				}
	
				const fetchData = await response.json();
	
				//console.log("fetchData.miningAmountTotal=", fetchData.miningAmountTotal);
				//console.log("fetchData.data.ownedNfts.length=", fetchData.data.ownedNfts.length);
	
				//if (fetchData.data.ownedNfts.length === 0) {

				//} else {
	
					// alchemy
					setData(fetchData.data.ownedNfts);
	
					setHoldingCount(fetchData.data.ownedNfts.length);
	
					setMiningAmountTotal(fetchData.miningAmountTotal);
	
				//}
	
				// update staking count
				let sCount = 0;
				for(let idx=0; idx < fetchData.data.ownedNfts.length; idx++){
	
					if (fetchData.data.ownedNfts[idx].staking === "true") {
						sCount = sCount + 1;
					}
	
				}
				setStakingCount(String(sCount));


				setIsLoading(false);
	
			} catch (err) {
				setIsLoading(false);
	
				console.log("err="+err);
				//alert("There was an error fetching NFTs!----");

			}
	
		};

		fetchNFTs();

		/*
		let intervalMiliSecond = 20000;
		const interval = setInterval(fetchNFTs, intervalMiliSecond);
		*/

		return () => {
			
			//clearInterval(interval);

		}
		
	}, [address, contractAddress, chainId]);









	const walletConnected = async () => {




	}


	const walletDisconnected = async () => {

			setData([]);
			setStakeData([]);
			setStakingCount("0");
			setSelectedCard("");
			setIsInHome(true);
			setMiningAmountTotal("0");

			setHoldingCount("0");
			
		
	}


	



	const selectNFT = async (nft) => {
		
		try {

			console.log("selectNFT before stakeData[0]", stakeData[0]);

			// 오류일듯
			//let updateData = stakeData;
			////updateData.splice(0, 1);

			/*
			let updateData = new Array();
			updateData = stakeData;
			updateData.unshift(nft);
			*/

			let updateData = stakeData;

			updateData.splice(0, 1);
			updateData.unshift(nft);

			setStakeData(updateData);

			console.log("selectNFT after stakeData[0]", stakeData[0]);


		} catch (err) {

			console.log("err", err);
		}
	};




	const processMintNFT = async () => {

		try {
			const response = await fetch(`/api/mint-nft?chainid=${chainId}&owner=${contractOwnerAddress}&contract=${contractAddress}&wallet=${address}`);


			/// for vercel test

			//console.log("mint-nft api result", response);

			if (!response.ok) {
				setIsMinting(false);
				
				alert("Something went wrong! Check your Input or Connection");
				//setIsLoading(false);
				//setIsInHome(true);

				return;
			}

			const nft = await response.json();

			//console.log("nft.data",nft.data);

			//setTokenId(nft.data.tokenId);


			//data.push(nft);


			/*
			// 오류일듯
			//let updateData = data;
			let updateData = new Array();
			updateData = data;
			updateData.unshift(nft.data);
			setData(updateData);
			*/


			/*
			useInterval(async () => {
				console.log('Checking if reports are ready to download');

				const response = await fetch(`/api/check-nft?tokenid=${nft.data.tokenId}`);
				if (!response.ok) {
					//alert("Something went wrong! Check your Input or Connection");
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
	

			}, 1000);
			*/


			/*
			if (data.length == 9) {
				data.splice(data.length-1, 1);
			}
			*/

			data.push(nft.data);


			setHoldingCount(holdingCount+1);
			setMintingCountGlobal(mintingCountGlobal+1);


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
			value: window.caver.utils.toPeb('0.1', 'KLAY'), // 1 클레이 전송
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

			setIsMinting(false);
		})

		/*
		console.log("isPayed", isPayed);

		if (isPayed) {




		}
		*/

	}; // end of mint




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

		console.log("useGameFNT fetchNFTs address",address);

		if (address === "") {
			//alert("Please provide Wallet Address!");

			setIsLoading(false);

			return;
		}

		const wallet = address[0];

		//setData([]);


		//setIsLoading(true);
		setIsInHome(false);


		try {

			const response = await fetch(`/api/game-fetch-nfts?chainid=${chainId}&contract=${contractAddress}&wallet=${wallet}&stakingwallet=${stakingWalletAddress}`);

			if (!response.ok) {
				alert("Something went wrong! Check your Input or Connection====");


				


				setIsLoading(false);
				//setIsInHome(true);
				return;
			}

			const fetchData = await response.json();



			console.log("fetchData.miningAmountTotal=", fetchData.miningAmountTotal);
			console.log("fetchData.data.ownedNfts.length=", fetchData.data.ownedNfts.length);

			if (fetchData.data.ownedNfts.length === 0) {
				//setIsInHome(true);
				//setIsLoading(false);
				//alert("This Wallet has no NFTs");
			} else {

				
				//////console.log("fetchNFTs fetchData.data.ownedNfts[0].miningAmount", fetchData.data.ownedNfts[0].miningAmount);

				////setSelectedCard(fetchData.data.ownedNfts[0]);


							// alchemy
				setData(fetchData.data.ownedNfts);


				setHoldingCount(fetchData.data.ownedNfts.length);

				setMiningAmountTotal(fetchData.miningAmountTotal);

			}


			
			// update staking count
			let sCount = 0;
			let miningAmountTotal = "0";
			for(let idx=0; idx < fetchData.data.ownedNfts.length; idx++){

				if (fetchData.data.ownedNfts[idx].staking === "true") {
					sCount = sCount + 1;

					console.log("miningAmount", fetchData.data.ownedNfts[idx].miningAmount);


					///////miningAmountTotal = String(Number(miningAmountTotal) + Number(fetchData.data.ownedNfts[idx].miningAmount));
				}

			}
			setStakingCount(String(sCount));
			


			setIsLoading(false);
			return;

		} catch (err) {
			setIsLoading(false);

			console.log("err="+err);
			alert("There was an error fetching NFTs!----");
			return;
		}

	};





	const fetchNFTsGlobal = async () => {

		console.log("fetchNFTsGlobal");

		try {
			const response = await fetch(`/api/game-fetch-nfts?chainid=${chainId}&contract=${contractAddress}&stakingwallet=${stakingWalletAddress}`);

			if (!response.ok) {
				//alert("Something went wrong! Check your Input or Connection");

				return;
			}

			const fetchData = await response.json();

			const range = 3;
			const randomNumber = Math.random() * range;

			const stakingCountGlobal = Number(fetchData.data.stakingCountGlobal) + Math.floor(randomNumber) - (range / 2);

			const miningAmountGlobal = Number(fetchData.data.miningAmountGlobal) + randomNumber/100000000 - (range/10000000 / 2);

			setStakingCountGlobal(stakingCountGlobal);

			setMiningAmountGlobal(miningAmountGlobal);



			const mintingCountGlobal = fetchData.data.mintingCountGlobal;
			setMintingCountGlobal(mintingCountGlobal);

			
			return;

		} catch (err) {

			console.log("err="+err);
			//alert("There was an error fetching NFTs!----");
			return;
		}

	};



	const depositNFT = async (tokenId) => {

		console.log("useGameNFT depositNFT address", address);
		

	//const depositNFT = async (e) => {
		//e.preventDefault();
		//setTokenId("384");

		console.log("useGameNFT depositNFT tokenId", tokenId);

		if (tokenId === "") {
			alert("Please provide tokenId!");
			return;
		}

		console.log("useGameNFT depositNFT data.length", data.length);


		//setData([]);
		//setIsLoading(true);
		//setIsInHome(false);

		setIsDepositing(true);


		try {	

			const contract = new window.caver.klay.Contract(contractABI, contractAddress);

			//console.log("contract", contract);
			
			//const from = window.klaytn.selectedAddress;
			const from = address[0];


			
			// cypress 일경우
			// baobab 일경우
			/*
			const chainId = "8217"; // cypress
	//const chainId = "1001"; // baobab
			*/

			const to = stakingWalletAddress;

			/*
			let to = "";

			if (chainId === "8217") {
				to = stakingWalletAddress;
			} else {
				
				to = stakingWalletAddress;
				
				///// wayne@nuklabs.com
				//to = "0x65410526d780ecbf15be9b8c5446364b9a4c71af";

				///  info@nuklabs.com
				//to = "0x6a80D8Afba916f0AAE4B0Dd7B528b2B28eabD567";
			}
			*/


			//const to = "0x7e24b4FCa9d152b6C88Da278DfcF69C129E524f5";

			
			//console.log("contractAddress", contractAddress);
			//console.log("tokenId", tokenId);
			//console.log("from", from);
			//console.log("to", to);


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

			//console.log("transfer", transfer);


			if (transfer) {

				let tokenUri;
				for(let idx=0; idx < data.length; idx++){
					console.log("data[idx].tokenUri", data[idx].tokenUri);

					if (data[idx].tokenId.toString() === tokenId.toString()) {

						tokenUri = data[idx].tokenUri;

						///console.log("tokenUri", tokenUri);

					}
	
				}



				const wallet = from;
				const response = await fetch(`/api/deposit-nft?stakingwallet=${stakingWalletAddress}&chainid=${chainId}&contract=${contractAddress}&wallet=${wallet}&tokenid=${tokenId}&uri=${tokenUri}`);

				if (!response.ok) {
					//////setIsWithdrawing(false);
					
					alert("Something went wrong! Check your Input or Connection");
	
					return;
				}




				// 오류일듯
				//let updateData = data;
				let updateData = new Array();
				updateData = data;


				let idx;
				for(idx=0; idx < updateData.length; idx++){

					//console.log("updateData idx tokenId", updateData[idx].tokenId);
					//console.log("tokenId", tokenId);

					if (updateData[idx].tokenId.toString() === tokenId.toString()) {
						break;
					}
				}
				console.log("idx", idx);


				///////////////////////
				updateData[idx].staking = "true";
				updateData[idx].timeLeft = "4 years 11 month 30 days";
				updateData[idx].maturityLevel = "Level 1";
				updateData[idx].miningAmount = "0";


				setSelectedCard(updateData[idx]);


				//setData(updateData);



				//let updateStakeData = stakeData;

				/*
				let updateStakeData = new Array();

				updateStakeData.push(updateData[idx]);
				setStakeData(updateStakeData);
				//////////////////////
				*/


				// 삭제하지않고 상태만변경
				//////////updateData.splice(idx, 1);

				/*
				// 0번째로 옮긴다.
				const nft = updateData[idx];
				updateData.splice(idx, 1);
				updateData.unshift(nft);
				setData(updateData);
				*/



				// update staking count
				setStakingCount(Number(stakingCount)+1);

				console.log("depositNFT data.length", data.length);
				console.log("depositNFT updateData.length", updateData.length);



				fetchNFTsGlobal();


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

	};
	




	const processWithdrawNFT = async (wallet, tokenId) => {

		try {

			//const wallet = window.klaytn.selectedAddress;
			

			const response = await fetch(`/api/withdraw-nft?stakingwallet=${stakingWalletAddress}&chainid=${chainId}&contract=${contractAddress}&wallet=${wallet}&tokenid=${tokenId}`);

			if (!response.ok) {
				setIsWithdrawing(false);
				
				alert("Something went wrong! Check your Input or Connection");

				return;
			}

			const result = await response.json();

			if (result) {

				console.log("result", result);

				// 오류일듯
				///////let updateData = stakeData;
				let updateData = new Array();
				updateData = data;

				let idx;
				for(idx=0; idx < updateData.length; idx++){

					console.log("updateData idx tokenId", updateData[idx].tokenId);
					console.log("tokenId", tokenId);

					if (updateData[idx].tokenId.toString() === tokenId.toString()) {
						break;
					}
				}
				console.log("idx", idx);


				
				updateData[idx].staking = "false";
				updateData[idx].timeLeft = "0 years 0 month 0 days";
				updateData[idx].maturityLevel = "Level 0";
				updateData[idx].miningAmount = "0";

				//setData(updateData);
				
				

				



				/*
				// 0번째로 옮긴다.
				const nft = updateData[idx];
				updateData.splice(idx, 1);
				updateData.unshift(nft);
				setData(updateData);
				*/


				// update staking count
				setStakingCount(Number(stakingCount)-1);


				fetchNFTsGlobal();



				/*
				updateData.splice(idx, 1);
				setStakeData(updateData);

				console.log("withdrawNFT stakeData.length", stakeData.length);
				console.log("withdrawNFT updateData.length", updateData.length);

				
				///////////////////////
				updateData = data;
				updateData.unshift(result.data);
				setData(updateData);
				//////////////////////
				*/


			}


			setIsWithdrawing(false);

			return;

		} catch (err) {
			console.log("err="+err);

			setIsWithdrawing(false);

			alert("There was an error processWithdrawNFT!----");

			return;
		}

	}





	const withdrawNFT = async (tokenId) => {

		//e.preventDefault();

		console.log("useGameNFT withdrawNFT address[0]", address[0]);
		console.log("useGameNFT withdrawNFT tokenId", tokenId);

		if (tokenId === "") {
			alert("Please provide tokenId!");
			return;
		}

		//const wallet = window.klaytn.selectedAddress;

		const wallet = address[0];

		setIsWithdrawing(true);



		
		//let isPayed = false;

		window.caver.klay
		.sendTransaction({
			type: 'VALUE_TRANSFER',
			from: wallet,
			to: stakingWalletAddress,
			value: window.caver.utils.toPeb('0.1', 'KLAY'), // 1 클레이 전송
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

			processWithdrawNFT(wallet, tokenId);
			
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






	return { walletConnected, walletDisconnected, mintNFT,checkNFT, fetchNFTs, depositNFT, withdrawNFT, setTokenId, selectNFT,
		stakeDataGlobal, data, stakeData, isInHome, isLoading, isConnectWallet, isMinting, isDepositing, isWithdrawing, tokenId,
		stakingCount, setStakingCount,
		selectedCard, setSelectedCard,
		miningAmountTotal,
		mintingCountGlobal,
		stakingCountGlobal,
		miningAmountGlobal,
		holdingCount,
	};

}



export function useInterval(callback, delay) {
	const savedCallback = useRef();
	// Remember the latest callback;
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => {
				clearInterval(id);
			};
		}
	}, [callback, delay]);
}