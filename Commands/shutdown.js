const discord = require("discord.js");
const config = require('../botconfig.json');
module.exports.run = async (bot, message, args) => {
  message.delete();
  
  var errembed = new discord.RichEmbed()
  .setDescription(`🇽 **Developer Mode:** ${message.author}, You cannot do this! You are not the bot owner!`)
  .setColor("#eb4034");


     if(message.author.id != "490944121670729741") return message.channel.send(errembed);
 

    
    try {
      let help = new discord.RichEmbed()
            .setDescription(`:white_check_mark: **Developer Mode:** <@${message.author.id}> has successfully shutdown this bot <@${config.botname}>`)
            .setColor('RANDOM');
       await message.channel.send(help);
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
   


}

module.exports.help = {
    name: "shutdown"
}