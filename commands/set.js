const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require('better-sqlite3');

const db = new Database('db.sqlite3', { verbose: console.log });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription('Set guild options')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('member_role')
				.setDescription('Set the role that signifies membership')
				.addRoleOption((option) =>
					option.setName('role').setDescription('Select a role'),
				),
		),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'member_role') {
			const member_role_id = interaction.options.getRole('role');

			const stmt = db.prepare(`
                REPLACE INTO guild_settings (guild_id, member_role_id)
                VALUES(@guild_id, @member_role_id)
            `);
			stmt.run({
				guild_id: String(interaction.guild.id),
				member_role_id: String(member_role_id),
			});

			return interaction.reply(`Member role set to ${member_role_id}!`);
		}
	},
};
