var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth');
var responses = require('./responses')

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.substring(0, 1) == '^') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch (cmd) {
      // !ping
      case 'ping':
      case 'waifu':
      case 'brandykins':
      case 'bossrange':
      case 'cap':
      case 'prequests':
      case 'directory':
      case 'carries':
        bot.sendMessage({
          to: channelID,
          message: format(responses[cmd])
        });
        break;
    }
  }
});

function format(response){
  return typeof response === "string" ? response : response.join("\n")
}
// Invite Link: https://discordapp.com/oauth2/authorize?&client_id=411270990165704705&scope=bot&permissions=0
