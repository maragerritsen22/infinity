const discord = require("discord.js");
const config = require('../config.json');
const data = require('../tickets.json');

module.exports.run = async (bot, message, args) => {

  var reason = args.join(" ").slice(0);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do this");

    

    if(!message.channel.name.startsWith('ticket-' || message.category.name.startsWith('tickets'))) { // // !message.channel.name.length() == 15 &&
        if(config.useEmbeds) {
          const notTicket = new discord.RichEmbed()
              .setColor("#E74C3C")
              .setDescription(`:x: **This command can only be used within a ticket channel**`)
          return message.channel.send(notTicket);
        } else {
          return message.channel.send(`:x: **This command can only be used within a ticket channel**`)
        }
      } else {
        try {

          if (!args[0]) {
            var embednoreason = new discord.RichEmbed()
            .setDescription(`**No reason**\n Hey <@${message.author.id}>, please specify a reason to close this ticket`);
        message.channel.send(embednoreason).then(m => m.delete(5000));
            return;
        }

          var closeEmbed = new discord.RichEmbed()
          .setDescription(`Dear ${message.author}, we are closing this ticket in 5 seconds!`)
          .setTitle("Closing Ticket")
          
          message.channel.send(closeEmbed)


          setTimeout(function() {

            message.channel.delete();
          
          }, 5000);
  
        } catch(error) {
          log.error(log.colour.red(error));
        }
      }

      
      
      
 let embed = new discord.RichEmbed()
.setTitle("Ticket Closed")
.addField("Moderator:", message.author)
.addField("Reason:", reason)
.addField("Ticket Number:", data.id)

let sChannel = message.guild.channels.find(c => c.name === "logs")
sChannel.send(embed)
    

}



module.exports.help = {
    name: "close"
}