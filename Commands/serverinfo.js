const discord = require("discord.js");

module.exports.run = async(bot,message, args) => {
  message.delete();

    var icon = message.guild.iconURL;

        var serverEmbed = new discord.RichEmbed()
            .setTitle("Server info")
            .setColor("#31d11f")
            .setThumbnail(icon)
            .addField("You Joined Server At", message.member.joinedAt)
            .addField("Server Name", message.member.guild.name)
            .addField("Username", message.author.tag)
            //.setFooter(message.author.username)
            .addField("Total Members:", message.guild.memberCount);

        return message.channel.send(serverEmbed);



}


module.exports.help = {
    name: "serverinfo"
}