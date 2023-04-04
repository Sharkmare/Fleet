const fs = require('fs');
const Discord = require('discord.js');

const { Client, Intents } = require('discord.js');
const intents = new Intents();
intents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);
const client = new Client({ intents: intents });

const prefix = '!'; // Set your desired prefix here
client.commands = new Discord.Collection();

// Load the config file
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Read all the command files from the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  // Ignore messages sent by the bot itself
  if (message.author.bot) return;

  // Check if the message starts with the prefix
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Get the command from the collection
    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Check if the user has the required role and permission
    if (command.roleNeeded && !message.member.roles.cache.some(role => role.name === command.roleNeeded)) {
      return message.reply(`you need the ${command.roleNeeded} role to use this command`);
    }
    if (command.permissionNeeded && !message.member.hasPermission(command.permissionNeeded)) {
      return message.reply(`you need the ${command.permissionNeeded} permission to use this command`);
    }

    // Execute the command
    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command');
    }
  }
});

// Login with the bot token
client.login(config.Bot.token);
