const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You don't have permissions to do this");

    if(!args[0]) return message.reply("Use: >prefix <prefix here>");

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFileSync("./prefixes.json", JSON.stringify(prefixes), (err) =>{
        if(err) console.log(err);
    });

    var stringEmbed = new discord.RichEmbed()
    .setColor("#21db1a")
    .setTitle("Prefix")
    .setDescription(`Prefix set to ${args[0]}`);

    message.channel.send(stringEmbed);

}

module.exports.help = {
    name: "prefix"
}

