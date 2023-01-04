const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectdb = require("./config/db");
const colors = require("colors");
const userroutes = require("./routes/userroutes");
const chatRoutes = require("./routes/chatRoutes");
const { notfound, errorhandle } = require("./middlewares/error");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectdb();

app.use(express.json()); //To accept json

app.get("/", (req, res) => {
  res.send(`API running on port ${PORT}`);
});

app.use("/api/user", userroutes);
app.use("/api/chat", chatRoutes);

app.use(notfound);
app.use(errorhandle);

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
