
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


		res.json({ message: "Fetch successful!"});

		console.log("Fetch successful!");


	} catch (err) {
		res.status(500).json({ message: "Internal Server Error!" });
	}
}