const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
message.delete();
    var user = message.author.username;

    // ?removerole @mara DJ
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have the permissions to do this!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send("Couldn't find that user!");
  let role = args.slice(1).join(" "); 
  if(!role) return message.channel.send("Specify a role!");
  let gRole = message.guild.roles.find(r=>r.name === role)

  console.log(role)

  let removeRoleEmbed = new discord.RichEmbed()
        .setDescription(`Succesfully removed the role from ${rMember}! ☑️`)
        .setTitle("Removed Role")

    message.channel.send(removeRoleEmbed);

  if(!gRole) return message.channel.send("Couldn't find that role!");

  if(!rMember.roles.has(gRole.id)) return message.channel.send("They don't  have that role.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`You have been removed from the role ${gRole.name} in ${message.guild.name}`)
    }catch(e){
        message.channel.send(`RIP to <@${rMember.id}>, they have been removed from the role ${gRole.name}. We tried to DM them, but their DMs are locked`)
    }
  
  var logRemoveRole = new discord.RichEmbed()
    .setTitle("**Role Removed**")
    .setDescription(`${rMember} was been removed from the ${gRole} role!`);
  
  var logChannel = message.guild.channels.find(c => c.name == "logs"); 
  
  logChannel.send(logRemoveRole);


}

module.exports.help = {
    name: "removerole"
}