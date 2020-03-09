const discord = require("discord.js");

module.exports.run = async(bot,message, args) => {
  
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You don't have the permissions to do this!");
  
  message.channel.send(`We are deleting this channel in 10 seconds!`);

 

  setTimeout(function(){
   message.channel.delete();  
  }, 10000)
 

}


module.exports.help = {
    name: "chandelete"
}