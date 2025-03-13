require('dotenv').config()
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const cors = require("cors"); // Import CORS

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for frontend access

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages]
}); 

const TOKEN = process.env.TOKEN; 

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

app.post("/send-dm", async (req, res) => {
  console.log("Received Data:", req.body); // Debugging

  const { userId, message } = req.body;

  if (!userId) {
    return res.status(400).send("Error: userId is missing!");
  }

  try {
    const user = await client.users.fetch(userId);
    await user.send(message);
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(500).send("Failed to send message.");
  }
});

app.listen(5000, () => console.log("Server is running on port 5000"));

client.login(TOKEN);
