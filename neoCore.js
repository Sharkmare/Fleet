//Config
try
{
	Config = require('./config.json')
}
catch (e)
{
	console.log('\Error while trying to load the config file.\n\n' + e.message)
	process.exit()
}
//Load Libs
const { Client , Intents } = require('discord.js');
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_BANS);
const client = new Client({ intents: myIntents });

//Verify initialization
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Message handler
client.on('message', msg => {
  console.log(msg.content);
});
