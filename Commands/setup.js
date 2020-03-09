const discord = require("discord.js");

module.exports.run = async(bot,message, args, channel) => {
  message.delete();
  
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You can't use this command");

  
if (message.guild.channels.exists('name', 'logs' || 'new-people')) { 
    //message.channel.send(`The channel already exists in this guild.`).catch(console.error);
      var noti = new discord.RichEmbed()
        .setDescription("The server is already setupped!")
        .setColor("#ee0000");

    message.channel.send(noti);
    return;
}

          message.guild.createChannel('logs', {
              type: 'channel'
            });
  
           message.guild.createChannel('new-people', {
              type: 'channel'
                  });
  
          message.guild.createChannel('suggestions', {
            type: 'channel'
          });
  
message.channel.send("***Setup succesfully ☑️! Created channels: `new-people`,`logs` and `suggestions`. Place them where you want!***");

  
}


module.exports.help = {
    name: "setup"
}

