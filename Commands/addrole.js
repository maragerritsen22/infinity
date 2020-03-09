const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var user = message.author.username;

    // ?addrole @mara DJ
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have the permissions to do this!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send("Couldn't find that user!");

  let role = args.slice(1).join(" "); 
  if(!role) return message.channel.send("Specify a role!");
  let gRole = message.guild.roles.find(r=>r.name === role)
  
  console.log(role)


  
  
  let addRoleEmbed = new discord.RichEmbed()
        .setDescription(`Succesfully added the role to ${rMember}! ☑️`)
        .setTitle("Added Role")

    message.channel.send(addRoleEmbed);

  if(!gRole) return message.channel.send("Couldn't find that role!");

  if(rMember.roles.has(gRole.id)) return message.channel.send("They already have that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`You have been given the role ${gRole.name} in ${message.guild.name}`)
    }catch(e){
        message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked`)
    }
  
  var logAddRole = new discord.RichEmbed()
    .setTitle("**Role Added**")
    .setDescription(`${rMember} has been given the ${gRole} role!`);
  
  var logChannel = message.guild.channels.find(c => c.name == "logs"); 
  
  logChannel.send(logAddRole);
  
  message.delete();

}

module.exports.help = {
    name: "role"
}