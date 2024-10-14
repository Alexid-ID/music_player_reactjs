const router = require("express").Router();
const { isValidObjectId } = require("mongoose");

// our artists model
const artist = require("../models/artist");

router.post("/save", async (req, res) => {
	const newArtist = artist({
		name: req.body.name,
		imageUrl: req.body.imageUrl,
		twitter: req.body.twitter,
		instagram: req.body.instagram,
	});

	try {
		const savedArtist = await newArtist.save();
		return res.status(200).json({ success: true, data: savedArtist });
	} catch (error) {
		return res.status(400).json({ success: false, error: error });
	}
});

router.get("/getOne/:id", async (req, res) => {
	if (!isValidObjectId(req.params.id)) {
		return res.status(400).json({ success: false, message: "Invalid ID" });
	}

	const filter = { _id: req.params.id };

	const data = await artist.findOne(filter);

	if (data) {
		return res.status(200).send({ success: true, data: data });
	} else {
		return res.status(400).send({ success: false, message: "Artist not found" });
	}
});

router.get("/getAll", async (req, res) => {
	const options = {
		sort: {
			createdAt: 1,
		},
	};

	const data = await artist.find({}, {}, options);

	if (data) {
		return res.status(200).send({ success: true, data: data });
	} else {
		return res.status(400).send({ success: false, message: "No artists found" });
	}
});

router.put("/update/:id", async (req, res) => {
	if (!isValidObjectId(req.params.id)) {
		return res.status(400).json({ success: false, message: "Invalid ID" });
	}

	const filter = { _id: req.params.id };
	const options = {
		upset: true,
		new: true,
	};

	try {
		const result = await artist.findOneAndUpdate(
			filter,
			{
				name: req.body.name,
				imageUrl: req.body.imageUrl,
				twitter: req.body.twitter,
				instagram: req.body.instagram,
			},
			options
		);

        return res.status(200).send({ success: true, data: result });
	} catch (error) {
        return res.status(400).send({ success: false, msg: error });
    }
});

router.delete("/delete/:id", async (req, res) => {
	if (!isValidObjectId(req.params.id)) {
		return res.status(400).json({ success: false, message: "Invalid ID" });
	}

	const filter = { _id: req.params.id };

	const data = await artist.deleteOne(filter);

	if (data) {
		return res.status(200).send({ success: true, msg: "Artist deleted successfully" });
	} else {
		return res.status(400).send({ success: false, msg: "Artist not found" });
	}
});

module.exports = router;
