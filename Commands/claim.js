const discord = require("discord.js");
const data = require('../tickets.json');
const config = require('../config.json');

module.exports.run = async(bot,message, args) => {
  message.delete();
  

message.channel.send(`Ticket-${data.id} has been claimed by ${message.author}`);
   

   if(!message.channel.name.startsWith('ticket-')) { // // !message.channel.name.length() == 15 &&
        if(config.useEmbeds) {
          const notTicket = new discord.RichEmbed()
              .setColor("#E74C3C")
              .setDescription(`:x: **This command can only be used within a ticket channel**`)
          return message.channel.send(notTicket);
        } else {
          return message.channel.send(`:x: **This command can only be used within a ticket channel**`)
        };
     

   };



}


module.exports.help = {
    name: "claim"
}