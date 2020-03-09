const discord = require("discord.js");


module.exports.run = async(bot,message, args) => {

    {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the permissions to do this!");




      
        var channel = message.guild.channels.get(c => c.id == message.channel.id);
        message.channel.setName(args[0])
      
      
      
      
         .then(newChannel => message.channel.send(`Succesfully renamed to **${newChannel.name}**`))
         .catch(console.error);
      
      


        message.delete(500);

    return;
}
        
 }



module.exports.help = {
    name: "rename"
}