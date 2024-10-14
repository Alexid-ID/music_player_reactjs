const router = require("express").Router();

const user = require("../models/user");

const admin = require("../config/firebase.config");

router.get("/login", async (req, res) => {
	// return res.send(req.headers.authorization);
	if (!req.headers.authorization) {
		return res.status(500).send({ message: "Invalid token" });
	}

	const token = req.headers.authorization.split(" ")[1];

	try {
		const decodeValue = await admin.auth().verifyIdToken(token);
		if (!decodeValue) {
			return res.status(500).json({ message: "Un Authorized" });
		} else {
			// Checking user exist or not
			const userExists = await user.findOne({ user_id: decodeValue.user_id });
			if (!userExists) {
				// create a new user
				newUserData(decodeValue, req, res);
				// return res.send("Need to create");
			} else {
				// return res.send("Need to update");
				updateUserData(decodeValue, req, res);
			}
		}
	} catch (error) {
		return res.status(500).json({ message: error });
	}
});

const newUserData = async (decodeValue, req, res) => {
	const newUser = new user({
		name: decodeValue.name,
		email: decodeValue.email,
		imageUrl: decodeValue.picture,
		user_id: decodeValue.user_id,
		email_verified: decodeValue.email_verified,
		role: "member",
		auth_time: decodeValue.auth_time,
	});

	try {
		const savedUser = await newUser.save();
		res.status(200).send({ user: savedUser });
	} catch (error) {
		res.status(400).send({ sucess: false, msg: error });
	}
};

const updateUserData = async (decodeValue, req, res) => {
	// update user data
	const filter = { user_id: decodeValue.user_id };
	const options = {
		upsert: true,
		new: true,
	};

	try {
		const result = await user.findOneAndUpdate(filter, { auth_time: decodeValue.auth_time }, options);
		res.status(200).send({ user: result });
	} catch (error) {
		res.status(400).send({ success: false, msg: error });
	}
};

router.get("/getAll", async (req, res) => {
	const options = {
		sort: {
			createdAt: 1,
		},
	};

	const cursor = await user.find({}, {}, options);
	if (cursor) {
		res.status(200).send({ success: true, data: cursor });
	} else {
		res.status(200).send({ success: true, msg: "No Data Found" });
	}
});

router.put("/updateRole/:userId", async (req, res) => {
	// console.log(req.body.data.role, req.params.userId);
	const filter = { _id: req.params.userId };
	const role = req.body.data.role;

	const options = {
		upsert: true,
		new: true,
	};

	try {
		const result = await user.findOneAndUpdate(filter, { role: role }, options);
		res.status(200).send({ user: result });
	} catch (err) {
		res.status(400).send({ success: false, msg: err });
	}
});

router.delete("/delete/:userId", async (req, res) => {
    const filter = { _id: req.params.userId };

    const result = await user.deleteOne(filter);

    if(result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "User deleted successfully" });
    } else {
        res.status(400).send({ success: false, msg: "User Not Found" });
    }
});

module.exports = router;
