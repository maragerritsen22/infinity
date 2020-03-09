const fs = require('fs');
const Discord = require('discord.js');
const prefix = require('../config.json')
//const { COLOR } = require('../config.js')


module.exports.run = async (client, message, args) => {
    const time = message.createdAt.toLocaleString();
    const isAFK = new Set();
     message.delete();
    
    if (isAFK.has(message.author.id + message.guild.id))
      return message.reply("❌ You are already AFK!");

    let reason = args.join(" ") || "AFK";

    isAFK.add(message.author.id + message.guild.id);
    message.channel.send(`**${message.author}**, I set you afk for: \`${reason}\``);

const filter = m =>
      (m.mentions.users.has(message.author.id) ||
        m.author.id === message.author.id) &&
      !m.author.bot;
    const collector = message.channel.createMessageCollector(filter);

    collector.on("collect", msg => {
      if (msg.author.id === message.author.id) {
        collector.stop();
        isAFK.delete(message.author.id + message.guild.id);
        return message.channel.send(
          `**Welcome back ${message.author}!**`
        );
      } else {
         message.channel.send(`This user is currently AFK for: \`${reason}\``);
      }
    });
  



}

module.exports.help = {
    name: "afk"
}