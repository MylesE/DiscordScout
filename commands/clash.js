const { SlashCommandBuilder } = require('@discordjs/builders');
const lapi = require('../league_api');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clash')
		.setDescription('Gets members of Clash team, comma separated')
		.addStringOption(option =>
            option.setName('summoner')
            .setDescription('Summoner Name')
            .setRequired(true)),
	async execute(interaction) {
        let result = lapi.getClashTeam(interaction.options.getString('summoner'));
        
        result.then((value) => {
            //console.log(value);
            interaction.reply({
                content: value,
                ephemeral: false
            });
        });
	},
};
