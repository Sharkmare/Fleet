module.exports = {
  name: 'ping',
  aliases: ['pong'],
  description: 'Responds with pong',
  roleNeeded: 'admin',
  permissionNeeded: 'SEND_MESSAGES',
  altFlag: 1,
  execute(message, args) {
    message.channel.send('pong');
  },
};
