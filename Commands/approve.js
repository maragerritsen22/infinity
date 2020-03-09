const discord = require("discord.js");

module.exports.run = async(bot,message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do this");

    var approveEmbed = new discord.RichEmbed()
    .setTitle("Approved!  ☑️")
    .setColor("#29f500")
    .addField("Approved by:", message.author);

    message.channel.send(approveEmbed);

    message.delete();


}


module.exports.help = {
    name: "approve"
}