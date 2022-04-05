const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('echos input')
        //.addUserOption(option => option.setName('user').setDescription('The user')),
        .addStringOption(option =>
            option.setName('firstarg')
            .setDescription('Input to echo back')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('secondarg')
            .setDescription('Optional input to echo back 2')
            .setRequired(false)),
	async execute(interaction) {
        let input = interaction.options.getString("firstarg");
        input = input.concat(` ${interaction.options.getString("secondarg")}`);
		await interaction.reply({
            content: input,//interaction.options.getString("firstarg"),
            ephemeral: true,
        });
	},
};
