module.exports = {
  name: 'ping',
  aliases: ['pong'],
  description: 'Responds with pong and bot latency',
  roleNeeded: null,
  permissionNeeded: 'SEND_MESSAGES',
  altFlag: 1,
  execute(message, args) {
    // Send a message indicating that the bot is pinging
    message.channel.send('Pinging...').then((pingMessage) => {
      // Calculate the bot's latency
      const latency = pingMessage.createdTimestamp - message.createdTimestamp;

      // Edit the original message to show the latency
      pingMessage.edit(`Pong! Latency: ${latency}ms`);
    });
  },
};
