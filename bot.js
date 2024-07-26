// index.js

require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
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
    { name: 'with code', type: ActivityType.Playing, status: 'online' },
    { name: 'the server', type: ActivityType.Watching, status: 'idle' },
    { name: 'the community', type: ActivityType.Listening, status: 'dnd' },
    { name: 'Coding in JavaScript', type: ActivityType.Playing, status: 'idle' }
];

// Function to update status
async function updateStatus() {
    try {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        await client.user.setPresence({
            activities: [{ name: status.name, type: status.type, status: status.status }],
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
