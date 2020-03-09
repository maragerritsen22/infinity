const discord = require("discord.js");

module.exports.run = async(bot,message, args) => {

// ?kick @maragerritsen22 Redenen hier.
if(args[0] == null){

    var useMessage = new discord.RichEmbed()
    .setTitle("User")
    .setDescription("Add a user you want to kick!");
    return message.channel.send(useMessage);

}

var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(args[0]));


if (!kickUser) return message.channel.send("User not found");


var reason = args.join(" ").slice(22);

if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the permissions to do this");

if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user is a moderator. I can't kick a moderator.");

   var channelSend = new discord.RichEmbed()
        .setDescription(`***${kickUser} has been kicked!*** ☑️`)

        message.channel.send(channelSend);
  
  
var kick = new discord.RichEmbed()
    .setTitle("**Kick**")
    .setColor("#b81b16")
    .addField("Kicked user", kickUser)
    .addField("Kicked by", message.author)
    .addField("Reason", reason);

var kickChannel = message.guild.channels.find(`name`, "logs");
if (!kickChannel) return message.guild.send("Can not find channel");

message.guild.member(kickUser).kick(reason);



kickChannel.send(kick);

return;

}


module.exports.help = {
    name: "kick"
}