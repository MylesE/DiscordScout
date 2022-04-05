const axios = require('axios');
const { leaguetoken } = require('./config.json');

module.exports = {
  getSummoner: async function(sumName) {
    try {
      const response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumName}`, {
        headers: {
          "X-Riot-Token": leaguetoken
        }
      });
      return response.data;
    }
    catch (ex) {
      console.log(ex);
    }
  },
  getClashTeam: async function(sumName) {
    try {
      const summoner = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumName}`, {
        headers: {
          "X-Riot-Token": leaguetoken
        }
      });
      if (!summoner) return "ERROR FETCHING SUMMONER"; //doesnt do anything, gets caught if api call fails
      //return summoner.data;
      const summonerClash = await axios.get(`https://na1.api.riotgames.com/lol/clash/v1/players/by-summoner/${summoner.data.id}`, {
        headers: {
          "X-Riot-Token": leaguetoken
        }
      });
      
      //console.log(summonerClash.data[0].teamId);
      //return team.data[0].teamId;
      const clashTeam = await axios.get(`https://na1.api.riotgames.com/lol/clash/v1/teams/${summonerClash.data[0].teamId}`, {
        headers: {
          "X-Riot-Token": leaguetoken
        }
      });
      //console.log(clashTeam.data);
      //console.log(clashTeam.data.players);

      const teamName = `TAG: ${clashTeam.data.abbreviation}\nTEAMNAME: ${clashTeam.data.name}`
      //console.log(teamName);
      const memberNames = [];
      for (var player of clashTeam.data.players) {
        //console.log(player.summonerId);
        const sum = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/${player.summonerId}`, {
          headers: {
            "X-Riot-Token": leaguetoken
          }
        });
        //console.log(sum.data);
        memberNames.push(sum.data);
      }
      // formatted return string:
      var retstr = `${teamName}\n\nTEAM MEMBERS (multisearch)\n`;
      for (let usr of memberNames) {
        //console.log(usr.name);
        if (usr.name == memberNames[0].name) retstr = retstr.concat(usr.name);
        else retstr = retstr.concat(",", usr.name);
      }

      //console.log(retstr);
      return retstr;
    }
    catch (ex) {
      return "ERROR FETCHING CLASH TEAM";
    }
  }
}
