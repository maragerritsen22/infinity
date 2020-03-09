const discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async(bot,message, args) => {
let user = message.mentions.users.first() || message.author;
  
  
  let userinfo = {};
//  userinfo.avatar = user.avatarURL()
  userinfo.name = user.username;
  userinfo.discrim = `#${user.discriminator}`;
  userinfo.id = user.id;
  userinfo.status = user.presence.status;
  userinfo.registered = moment.utc(message.guild.members.get(user.id).user.createdAt).format("dddd, MMMM Do, YYYY");
  userinfo.joined = moment.utc(message.guild.members.get(user.id).joinedAt).format("dddd, MMMM Do, YYYY");
  
  const embed = new discord.RichEmbed()
  .setAuthor(user.tag, userinfo.avatar)
  .setThumbnail(user.avatarURL)
  .addField(`Username`, userinfo.name, true)
  .addField(`Discriminator`, userinfo.discrim, true)
  .addField(`ID`, userinfo.id, true)
  .addField(`Status`, userinfo.status, true)
  .addField(`Registered`, userinfo.registered)
  .addField(`Joined Server`, userinfo.joined)
  
  return message.channel.send(embed);

}


module.exports.help = {
    name: "whois"
}