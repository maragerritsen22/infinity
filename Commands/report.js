const discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

      var prefix = config.prefix;

       if (!args[0]) return message.channel.send(`Use this command like: ${prefix}report username (tag) reason`);

       var user = message.guild.member(message.mentions.users.first());

       if (!user) return message.channel.send(`User not found or give user`);
  
      var warnChannelError = new discord.RichEmbed()
      .setTitle("**Error**")
      .setDescription(`**I don't have the permissions ❌**`)
      .setFooter(`Report could not be sent due an error`);
  
      if(!message.guild.me.hasPermission("MANAGE_CHANNELS" || "ADMINISTRATOR")) return message.channel.send(warnChannelError);



       var reason = args.join(" ").slice(22);

       if (!reason) return message.channel.send(`Give an reason`);

       var reportEmbed = new discord.RichEmbed()
       .setDescription("**Report**")
       .setColor("ff0000")
       .addField("Reported user", `${user}. ID =  ${user.id}`)
       .addField("Reported by", `${message.author}. ID =  ${message.author.id}`)
       .addField("Reason", reason)
       .setFooter(message.createdAt);

       var reportChannel = message.guild.channels.find("name", "logs");
       if (!reportChannel) return message.channel.send(reportEmbed);

       message.delete();

      return reportChannel.send(reportEmbed) || message.channel.send(reportEmbed);

}

module.exports.help = {
    name: "report"
}