const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongoUrl } = require("./keys");
require("./models/Subscriptions");
const Subscriptions = mongoose.model("Subscriptions");

const app = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
	console.log("connected to mongo");
});
mongoose.connection.on("error", (err) => {
	console.log("error occurs", err);
});

const publicVapidKey =
	"BKlWBKsQm6aQ9cU9BD5D1UH4PcOE60mOAP1k_XYaOv5OwuTbsv-ioRV0CgVFEH9EqR0jnxyZwXOP1_KVELzRtos";
const privateVapidKey = "Pv9VhPF18wsWkg41NWCr8rxqQRkcw3Y7Hbud1r4AYoU";

webPush.setVapidDetails(
	"mailto:rajkhowaabhijit71@gmail.com",
	publicVapidKey,
	privateVapidKey
);

app.post("/subscribe", async (req, res) => {
	const subscription = req.body;
	try {
		const subscribed = await Subscriptions.findOne({
			endpoint: subscription.endpoint,
		});
		if (!subscribed) {
			const subscriptions = new Subscriptions({
				subscription,
			});
			await subscriptions.save();
			console.log("saved in DB");
		} else console.log("Already subscribed");
		res.status(201).json();
	} catch (err) {
		console.log(err);
		res.status(441).send({ error: "subscription not saved in DB" });
	}
});
app.post("/sendNotification", async (req, res) => {
	const { title, body } = req.body;
	const payload = JSON.stringify({
		title: title,
		body: body,
	});
	const subscriptions = await Subscriptions.find();
	subscriptions.map((obj, i) => {
		webPush
			.sendNotification(obj.subscription, payload)
			.catch((err) => console.log(err));
	});
	res.status(200).json();
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port no. ${port}`));
