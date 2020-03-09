const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
      message.delete();
  

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't use this command");

    var color = args[0]
    if(!color) return message.channel.send("Please give a color code! *You can use this website or search color picker* https://www.w3schools.com/colors/colors_picker.asp?color=%23ee9600")

    var title = args[1]
    if(!title) return message.channel.send("Please give a title!")

    var  description = args.slice(2).join(" ");
    if(!description) return message.channel.send("Please give a description")

    var embedcreated = new discord.RichEmbed()
    .setColor(color)
    .setTitle(`Topic: ${title}`)
    .setDescription(`Message: ${description}`)
    .setTimestamp()
    .addField("Sent by:", message.author);

    message.channel.send(embedcreated)


}

module.exports.help = {
    name: "embed"
}