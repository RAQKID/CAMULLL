// index.js

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Initialize Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Array of statuses
const statuses = [
    'Playing with code',
    'Watching the server',
    'Listening to the community',
    'Coding in JavaScript'
];

// Function to update status
async function updateStatus() {
    try {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        await client.user.setPresence({
            activities: [{ name: status }],
            status: 'online',
        });
    } catch (error) {
        console.error('Error setting presence:', error);
    }
}

// Discord bot event: ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // Update status every 10 minutes
    setInterval(updateStatus, 600000);
    updateStatus(); // Set initial status
});

// Discord bot login
client.login(process.env.BOT_TOKEN);

// Express route: Health Check
app.get('/health', (req, res) => {
    res.send('Bot and server are running!');
});

// Start Express server
app.listen(port, () => {
    console.log(`Express server running on http://localhost:${port}`);
});
