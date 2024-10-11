require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const { default: mongoose } = require("mongoose");

console.log(process.env.DB_STRING);


app.use(cors({origin: true}));

app.get("./", (req, res) => {
	res.send("Hello World");
});

// user authentication route 
const userRoute = require("./routes/auth");
app.use("/api/users", userRoute);

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
