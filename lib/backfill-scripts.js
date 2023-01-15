
//////const result = await runBackfillForUser(event.data.user_id);


export default async function handler(req, res) {

	try {
		if (req.method !== "GET") {
			return res.status(400).json({
				message: "Invalid method",
			});
		}

		const { user_id } = req.query;

		console.log("user_id",user_id);


		const chainId = "1001";
		const contractOwnerAddress = "0x65410526d780ecbf15be9b8c5446364b9a4c71af";
		const contractAddress = "0xd3bfc0bf408c0fd73e44110349c6db2e60b35be1";
		const address = "0xf0E392D26e21BA67a692fbE763C103d88c371D5f";
		const baseURI = "https://belly.bellygom.world";



		const response = await fetch(`/api/mint-nft?chainid=${chainId}&owner=${contractOwnerAddress}&contract=${contractAddress}&wallet=${address}&baseuri=${baseURI}`);

		if (!response.ok) {
			res.status(500).json({ message: "Internal Server Error!" });
			return;
		}

		const nft = await response.json();


		res.json({ message: "Mint successful!"});


	} catch (err) {
		res.status(500).json({ message: "Internal Server Error!" });
	}

}