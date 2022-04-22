const { Op } = require('sequelize');
const { Collection, Client, Formatters, Intents } = require('discord.js');
const { Users, UserInventories } = require('./db-objects.js');
const { token } = require('./config.json');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const currency = new Collection();

client.once('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
	if (message.author.bot) return;
	currency.add(message.author.id, 1);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
});

client.login(token);
