const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {




//check if the command has perms
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You don't have the permissions to do this!")

if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I don't have the permissions to do this!")

//define reason
let mutee = message.mentions.members.first() || message.guild.members.get(args[0])
if(!mutee) return message.channel.send("Please add a user to be unmuted!!")

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given!"

//define role
let muteRole = message.guild.roles.find(r => r.name == "Muted")
if(!muteRole) return message.channel.send("There is no mute role to remove!")

//remove role
mutee.removeRole(muteRole.id).then(() => {
    message.delete()
   // mutee.send(`You have been unmuted in **${message.guild.name}** for: **${reason}**`).catch(err => console.log(err))
})
  
  
  
  
  

var unmuteEmbed = new discord.RichEmbed()
    .setDescription(`***${mutee} has been unmuted! ☑️***`)
    
    message.channel.send(unmuteEmbed);
  
  
   var dm = new discord.RichEmbed()
   .setTitle("**Moderation**")
   .setColor('#1fe30e')
   .setDescription(`***Unmuted*** \n\n You have been unmuted in ${message.guild.name}. \n\n Reason: **${reason}** \n\n Moderator: ${message.author}`)
   .setFooter("If you like to not be muted again make sure you read the rules.");
 
  mutee.send(dm);


//send embed
let embed = new discord.RichEmbed()
.setColor("#00cc00")
.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
.addField("Moderation:", "Unmute")
.addField("Unmuted person:", mutee.user)
.addField("Moderator:", message.author)
.addField("Reason:", reason)
.addField("Date:", message.createdAt)

let sChannel = message.guild.channels.find(c => c.name === "logs")
sChannel.send(embed)

}


module.exports.help = {
    name: "unmute"
}