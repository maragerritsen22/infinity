const discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
message.delete();

var errembed = new discord.RichEmbed()
.setDescription(`🇽 **Developer Mode:** ${message.author}, You cannot do this! You are not the bot owner!`)
.setColor("#eb4034");

   if(message.author.id != "490944121670729741") return message.channel.send(errembed)

   if(!args[0]) return message.channel.send("Please provide a command to reload!")

   let commandName = args[0].toLowerCase() 

   try {
    delete require.cache[require.resolve(`./${commandName}.js`)] // useage !reload <name>
    bot.commands.delete(commandName)
    const pull = require(`./${commandName}.js`)
    bot.commands.set(commandName, pull)
} catch(e){
    return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
   }
  
  var conembed = new discord.RichEmbed()
  .setDescription(`:white_check_mark: **Developer Mode:** ${message.author}, The command \`${args[0].toUpperCase()}\` has been succesfully reloaded!`)
  .setColor("#03e3fc");

   message.channel.send(conembed);

}



module.exports.help = {
    name: "reload"
}