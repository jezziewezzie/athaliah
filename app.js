const fs = require('node:fs');
const { Collection, Client, Formatters, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
const command_files = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

for (const file of command_files) {
	const command = require(`./commands/${file}`);
	//Set a new item in the Collection
	//With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'error!', ephemeral: true });
	}
});

client.login(token);
