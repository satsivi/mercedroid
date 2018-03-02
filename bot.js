var Discord = require('discord.io');
var logger = require('winston');
var responses = require('./responses')
var { queuer, dequeuer, compliment, flipCoin, eightBall } = require ('./functions')

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
  token: process.env.authToken || require("auth").token,
  autorun: true
});

bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `^`
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
      case 'poop':
      case 'thegrind':
      case 'help':
      case 'whycap':
        bot.sendMessage({
          to: channelID,
          message: format(responses[cmd])
        });
        break
      case 'qcvel':
        queuer('Chaos Vellum', 'qcvel', 'rmvcvel', '413219296525811713', userID, channelID, bot)
        break
      case 'rmvcvel':
        dequeuer('Chaos Vellum', 'rmvcvel', 'qcvel', '413219296525811713', userID, channelID, bot)
        break
      case 'qhmag':
        queuer('Hard Magnus', 'qhmag', 'rmvhmag', '413352362036428811', userID, channelID, bot)
        break
      case 'rmvhmag':
        dequeuer('Hard Magnus', 'rmvhmag', 'qhmag', '413352362036428811', userID, channelID, bot)
        break
      case 'compliment':
        compliment(channelID, user, bot)
        break
      case 'flipcoin':
        flipCoin(channelID, bot)
        break
      case 'ask':
        eightBall(channelID, bot)
        break
      case 'sethelp':
          bot.setPresence({
            game: {
              name: "^help"
            }
          });
    }
  }
});

function format(response){
  return typeof response === "string" ? response : response.join("\n")
}
// Invite Link: https://discordapp.com/oauth2/authorize?&client_id=411270990165704705&scope=bot&permissions=0

module.exports = bot
