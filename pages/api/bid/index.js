const { MongoClient, ServerApiVersion } = require("mongodb");

async function handler(req, res) {
	if (req.method === "POST") {
		const bid = req.body.bid;
		const bider = req.body.bider;
		const requestID = req.body.requestID;
		const projectAddress = req.body.projectAddress;

		const bidRequest = {
			bid: bid,
			bider: bider,
			requestID: requestID,
			projectAddress: projectAddress,
		};

		// store that in a database or in a file

		try {
			client = await MongoClient.connect(
				"mongodb+srv://crowdcoin:b8ZzOuAKPHVobSwC@cluster0.r5yipsp.mongodb.net/?retryWrites=true&w=majority"
			);
		} catch (error) {
			res.status(500).json({ message: "Could not connect to database." });
			return;
		}

		const db = client.db();

		try {
			const result = await db.collection("bids").findOne({
				requestID: requestID,
				projectAddress: projectAddress,
			});
			if (result) {
				if (result.bid < bidRequest.bid) {
					const result = await db.collection("bids").updateOne(
						{
							requestID: requestID,
							projectAddress: projectAddress,
						},
						bidRequest
					);
				}
			} else {
				const result = await db
					.collection("bids")
					.insertOne(bidRequest);
			}
			bidRequest.id = result.insertedId;
		} catch (error) {
			client.close();
			res.status(500).json({ message: "Storing bid failed!" });
			return;
		}

		client.close();

		res.status(201).json({ message: "Success!", bidRequest: bidRequest });
	} else {
		try {
			client = await MongoClient.connect(
				"mongodb+srv://cluster1:umWNEtkbAqeqc6rN@cluster0.r5yipsp.mongodb.net/?retryWrites=true&w=majority"
			);
		} catch (error) {
			res.status(500).json({ message: "Could not connect to database." });
			return;
		}

		const db = client.db();

		try {
			const result = await db.collection("bids").findOne({
				requestID: requestID,
				projectAddress: projectAddress,
			});
			console.log("bid :" + result);
			if (result) {
				res.status(200).json({ bid: result.bid });
			} else {
				res.status(200).json({ bid: 0 });
			}
		} catch (error) {
			client.close();
			res.status(500).json({ message: "Storing bid failed!" });
			return;
		}

		client.close();

		res.status(200).json({ feedback: data });
	}
}

export default handler;
