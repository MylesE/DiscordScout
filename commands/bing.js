const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bing')
		.setDescription('links bing!')
		.addStringOption(option =>
            option.setName('query')
            .setDescription('Search Query')
            .setRequired(false)),
	async execute(interaction) {
		await interaction.reply(`bing! https://www.bing.com/search?q=${interaction.options.getString("query") ? interaction.options.getString("query").replace(/\s/g,'+') : ''}\nhttps://tenor.com/view/john-cena-gif-22279051`);
		//https://www.bing.com/search?q=
	},
};
