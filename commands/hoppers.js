const { SlashCommandBuilder } = require('@discordjs/builders');
/*
module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Hug Someone')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user you want to hug')
                .setRequired(true)
        ),
    async execute(interaction) {
        return interaction.reply(`${interaction.user} hugs ${interaction.options.getUser('user')}`)
    },
}; */

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hop')
		.setDescription('Hop on')
		.addUserOption(option =>
            option
			.setName('user')
            .setDescription('The user you want to hop')
            .setRequired(true)),
	async execute(interaction) {
		await interaction.reply(`Hop on ${interaction.options.getUser('user')}`);
	},
};
