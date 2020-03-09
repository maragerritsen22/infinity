const discord = require("discord.js");

module.exports.run = async(bot,message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do this");

    var rejectEmbed = new discord.RichEmbed()
    .setTitle("Rejected!  ❌")
    .setColor("#ff2200")
    .addField("Rejected by:", message.author);

    message.channel.send(rejectEmbed);

    message.delete();


}


module.exports.help = {
    name: "reject"
}