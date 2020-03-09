const discord = require("discord.js");

module.exports.run = async(bot,message, args) => {
  
  // message.delete(1000);


  
  const filter = (reaction, user) => ['❓', '⚒️', '📖', '🎮', '📄', '❌' ].includes(reaction.emoji.name) && user.id === message.author.id;

  const embed = new discord.RichEmbed()
  .setTitle("Help Menu")
  .setDescription("The bot prefix is: >. The bot and all stuff in it is in copyright from CatInYellow#8163! Click [here](http://tiny.cc/InfinityWebsite) to go to the website  \n\r ❓ = **Support** \r\n Any questions or problems? See what you can do! \n\r ⚒️ = **Administrator** \r\n All administrator commands will be show here! \n\r 📖 = **General** \r\n All general commands will be here such as verify, report etc! \n\r 🎮 = **Fun** \r\n All fun/play commands will be here! \n\r 📄 = **Information** \r\n All information commands such as serverinfo etc will be in here!")
  .setFooter("©️Infinity || 30 seconds to choose || v1.4.1")
  .setColor("#89ecf5");
  
  const supportembed = new discord.RichEmbed()
  .setTitle("Support")
  .setDescription("**ticket - creates a ticket** \n >ticket \n\n **owner - pings the owner** \n >owner \n\r More may come...")
  .setColor("#afff19")
  .setFooter("©️Infinity || Support Commands || v1.4.1");
  
  
  const adminembed = new discord.RichEmbed()
  .setTitle("Administrator")
  .setDescription("**warn - warn a user** \n >warn \n\n **mute - mute someone** \n >mute \n\n **kick - kick someone from the server** \n >kick \n\n **ban - ban someone from the server** \n >ban \n\n **lockdown - lockdown a channel for a period of time** \n >lockdown (seconds/minutes/hours) \n\n **clear - clears an amount of messages** \n >clear (amount) \n\n **close - closes a ticket!** \n >close \n\n **unmute - unmutes a user** \n >unmute (@user) \n\n **unban - unbans a member** \n >unban (id) \n\n **announcement - make an announcement with the bot** \n >announcement \n\n **rename - rename a ticket (name must include ticket-)** \n >rename \n\n **giveaway - start a giveaway** \n >giveaway \n\n **approve - approve something** \n >approve \n\n **reject - reject something** \n >reject \n\n **role - give someone an role with this command** \n >role \n\n **removerole - remove a role from a user** \n >removerole \n\n **warnings - check the amount of warnings from a user** \n >warnings \n\n **say - say something with the bot** \n >say \n\n **setup - setup your server for the bot** \n >setup \n\n **chandelete - deletes a channel** \n >chandelete")
  .setColor("#525955")
  .setFooter("©️Infinity || Administrator Commands || v1.4.1");
 
  
  const generalembed = new discord.RichEmbed()
  .setTitle("General")
  .setDescription("**afk - set yourself afk** \n >afk \n\n**avatar - show someone or your own avatar / profile photo** \n >avatar \n\n **verify - verify yourself** \n >verify \n\n **ping - pong, shows your ms** \n >ping \n\n **hi - a simple hello command** \n >Hi \n\n **donate - donate the owner for his work (will buy upgrades for bot)** \n >donate \n\n **report - report someone ** \n >report \n\n **suggest - place an suggestion (what can the server improve/add?)** \n >suggest (your suggestion) \n\n **level - check your level** \n >level \n\n **invite - gives an invite link to the Support Server** \n >invite")
  .setColor("#eb96e5")
  .setFooter("©️Infinity || General Commands || v1.4.1");

  
const funembed = new discord.RichEmbed()
.setTitle("Fun")
.setDescription("**8ball - ask a question and the bot will response** \n >8ball \n\n **rps - rock, paper, scissors** \n >rps (choice) \n\n **dog - shows a dog photo** \n >dog \n\n **cat - shows a cat photo** \n >cat")
.setColor("#42f5b0")
.setFooter("©️Infinity || Fun Commands || v1.4.1");

  
const infoembed = new discord.RichEmbed()
.setTitle("Information")
.setDescription("**serverinfo - get info about the server your in** \n >serverinfo \n\n **botowner - get info about the botowner** \n >botowner \n\n **botinfo - get info about the bot** \n >botinfo \n\n **contact - will send you the contact information about the owner!**\n >contact \n\n **help - help incoming! Choose what you want to know! **\n >help \n\n **whois - Get user info from yourself or someone else** \n >whois (user)")
.setColor("#cdf07d")
.setFooter("©️Infinity || Information Commands || v1.4.1");

  
  message.channel.send(embed).then(async msg => {   
    
      await   msg.react('❓');
      await   msg.react("⚒️");
      await msg.react("📖");
      await msg.react("📄");
      await msg.react("🎮");
      await msg.react("❌");
   
    
    msg.awaitReactions(filter, {
      max: 1, 
      time: 30000,
      errors: ['time']
      
    
      
    }).then(collected => {
      
      const reaction = collected.first();
      
      switch(reaction.emoji.name) {
        case '❓':
         message.channel.send(supportembed).then(async message => {
            msg.delete();
           message.delete(200000);
         })
          break;
          // case '⏪':
          // message.channel.send(embed);
          break;
        case '⚒️':
          message.channel.send(adminembed).then(async message1 =>{
             msg.delete(1000);
            message1.delete(200000);
          }) 
          break;
        case '📖':
          message.channel.send(generalembed).then(async message2 => {
             msg.delete(1000);
            message2.delete(200000);
          })
          break;
        case '🎮':
          message.channel.send(funembed).then(async message3 => {
            msg.delete(1000);
            message3.delete(200000);
          })
          break;
          
        case '📄':
          message.channel.send(infoembed)
          msg.delete(1000);
          break;
        case '❌':
          msg.delete(150);
          break;
      }
      
    
      
    }).catch(e => {
      console.log(e);
    });
});
  


  
}


module.exports.help = {
    name: "help"
}