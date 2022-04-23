const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('naturalize')
		.setDescription(
			'Welcome a new user into our community! Gives @wanderer and triggers the welcome message',
		)
		.addUserOption((option) =>
			option.setName('target').setDescription('The user to naturalize'),
		),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
	},
};
