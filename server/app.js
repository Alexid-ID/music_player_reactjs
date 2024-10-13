require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const { default: mongoose } = require("mongoose");

console.log(process.env.DB_STRING);

// allow front end to make requests to the server
// when running in different ports
app.use(cors({ origin: true }));
// sending json data to the server
app.use(express.json());


app.get("./", (req, res) => {
	res.send("Hello World");
});

// user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users", userRoute);

// Artist routes
const artistRoute = require("./routes/artist");
app.use("/api/artists", artistRoute);

// Song routes
const songRoute = require("./routes/song");
app.use("/api/songs", songRoute);

// Album routes
const albumRoute = require("./routes/album");
app.use("/api/albums", albumRoute);

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
	.once("open", () => {
		console.log("*Connected to the database");
	})
	.on("error", (error) => {
		console.log("*ERROR: ", error);
	});

app.listen(4000, () => {
	console.log("Server is running on port 4000");
});
