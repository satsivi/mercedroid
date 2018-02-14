var bot = require('./bot')
var Discord = require('discord.io');

// cVel ID: 413219296525811713
// hMag ID: 413352362036428811
const queuer = function(boss, cmd, rmCmd, roleID, userID, channelID, bot){
  bot.addToRole({
    "serverID": '404103946328866818',
    "userID": userID,
    "roleID": roleID
  }, function (err) {
    if (err) {
      bot.sendMessage({
        to: channelID,
        message: "Something went wrong: " + err
      })
    } else {
      bot.sendMessage({
        to: channelID,
        message: "I've added you to the queue for " + boss + ". `^" + rmCmd + "` to unqueue when you no longer need to run " + boss + "."
      })
    }
  })
}

const dequeuer = function (boss, cmd, qCmd, roleID, userID, channelID, bot){
  bot.removeFromRole({
    "serverID": '404103946328866818',
    "userID": userID,
    "roleID": roleID
  }, function (err) {
    if (err) {
      bot.sendMessage({
        to: channelID,
        message: "Something went wrong: " + err
      })
    } else {
      bot.sendMessage({
        to: channelID,
        message: "I've removed you from the " + boss + " queue. `^" + qCmd + "` to queue."
      })
    }
  })
}

module.exports = {
  queuer: queuer,
  dequeuer: dequeuer
}
