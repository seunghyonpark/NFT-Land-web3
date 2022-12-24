import Image from "next/image";
import React from "react";

/////import CaverExtKAS from "caver-js-ext-kas";

// --------------------------
function NFTCard({ data }) {


	/*
	//const chainId = "8217"; // cypress
	const chainId = "1001"; // baobab
	const accessKeyId = "KASK7LN9R0ADR0L3SP4GVN79";
	const secretAccessKey = "pam2QVYUTV1iqL77sxBbTSKsBHc2ZPw6mFUHScFm";
	
	// Set an authorization through 'caver.initKASAPI' function
	//const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);
	*/

	const stakeNFT = async (e) => {

		e.preventDefault();

		const {klaytn} = window;
		
		if (klaytn) {

			try {
				console.log("before klaytn.enable");

				const accounts = await klaytn.enable();

				console.log("after klaytn.enable");

				if (accounts) {

					console.log("accounts="+accounts);

					/*
					setAddress(accounts);

					if (address) {
						console.log("loadAccountInfo address="+address);

						fetchNFTs();
					}
					*/



					const sender = data.owner;
					const owner = data.owner;
					const to = "0x0a3548D4621075B2E5B9c6B2e99B9B61d19570db";
					const contract = data.contract.address;

					// with contract address and token id in hex
					//const ret = await caver.kas.kip17.transfer(contract, sender, owner, to, '0x1');



				}

			} catch (error) {
				console.log('User denied account access');
				alert("User denied account access");
				return;
			}

		} else {
			console.log('Non-Kaikas browser detected. You should consider trying Kaikas!');
			alert("Non-Kaikas browser detected. You should consider trying Kaikas!");
			return;
		}

	}




	const transferKlay = async (e) => {

		e.preventDefault();

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
	
	}




	return (
		<div className="m-auto flex  max-w-[70%] flex-col rounded-lg border border-gray-300 p-3  sm:m-0 sm:max-w-lg ">
			<Image
				src={
					data?.media[0]?.gateway ||
					"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
				}
				alt={data?.description}
				width={500}
				height={500}
			/>
			{/* title */}
			<div className="mt-2 rounded-md bg-teal-50 px-2">
				{data.title ? (
					<p className="font-semibold">{data.title}</p>
				) : (
					<i>&lt; no title &gt;</i>
				)}
			</div>

			{/* contract info */}
			<div className="mt-2 flex table-fixed flex-row justify-center">
				<div className=" truncate rounded-l-md bg-teal-200 px-2 py-1">
					Contract: {data.contract.address}
				</div>

				<button
					className="w-auto rounded-r-md bg-teal-500 px-2 py-1 hover:mix-blend-hard-light"

					onClick={() =>
						navigator.clipboard.writeText(data.contract.address)
					}
				>
					<p className="font-medium">Copy</p>
				</button>
			</div>

			{/* staking info */}
			<div className="mt-2 flex table-fixed flex-row justify-center">
				<div className=" truncate rounded-l-md bg-teal-200 px-2 py-1">
					{/*data.contract.address*/}

					{/*
					Holder: {data.owner}
					*/}
				
					{
						data.staking === 'true'
						? <p>Staking...</p>
						: <p>Unstaking...</p>
					}

				</div>

				<button
					className="w-auto rounded-r-md bg-teal-500 px-2 py-1 hover:mix-blend-hard-light"

					//onClick={() =>
					//	navigator.clipboard.writeText(data.contract.address)
					//}

					onClick={transferKlay}
				>
					<p className="font-medium">

					{
						data.staking === 'true'
						? <p>Go UnStake</p>
						: <p>Go Stake</p>
					}

					</p>
				</button>
			</div>

		</div>

	);
}

export default NFTCard;
