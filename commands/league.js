const { SlashCommandBuilder } = require('@discordjs/builders');
const lapi = require('../league_api');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('league')
		.setDescription('league profile')
		.addStringOption(option =>
            option.setName('summoner')
            .setDescription('Summoner Name')
            .setRequired(true)),
	async execute(interaction) {
        let result = lapi.getSummoner(interaction.options.getString('summoner'));
        result.then((value) => {
            if (value) {
                //console.log(value);
                retstr = `Summoner Name: ${value.name}, Summoner Level: ${value.summonerLevel}`;
                interaction.reply ({
                    content: retstr,
                    ephemeral: false
                });
            }
            else {
                interaction.reply("Summoner does not exist");
            }
        });
	},
};
