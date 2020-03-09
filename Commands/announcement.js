const discord = require("discord.js");



module.exports.run = async (bot, message, args) => {
  
  
  // ?announcement Title // Bericht // Kleur // kanaal 
  {

     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("***You don't have the permissions to do this ❌ ***");
    

    var splitser = "//";
    //Color  ${splitser}

    if(args[0] == null){

        var useMessage = new discord.RichEmbed()
        .setTitle("Use")
        .setColor("#00ee00")
        .setDescription(`Make an announcement by using: \n >announcement Title ${splitser} Message  ${splitser}  Channel `);

        return message.channel.send(useMessage);
    
    }

    args = args.join(" ").split(splitser);

    if (args[2] == undefined) args[2] = "#eeeeee";
    if (args[3] == undefined) args[3] = "announcements";

    var options = {

        titel: args[0] || "Melding",
        bericht: args[1] || "No content specified",
        kleur: args[2],
        kanaal: args[3]

    }

    var announcer = message.author;

    var announcementEmed = new discord.RichEmbed()
    .setTitle("Announcement")
    .setColor('RANDOM' || options.kleur)
    .setDescription(`Topic: **${options.titel}** \n\n Message: ${options.bericht} \n`)
    .setFooter("Announced By", announcer)
    .setTimestamp();

    var announcementChannel = message.guild.channels.find(c => c.name == `${options.kanaal}`);
    if(!announcementChannel) return message.channel.send("Can't find the channel.");
    
    

    announcementChannel.send(announcementEmed);
  
  var confirmEmbed = new discord.RichEmbed()
    .setDescription(`***Succesfully announced in #${options.kanaal} ☑️***`);
  
  message.channel.send(confirmEmbed);
  
  message.delete();
  
  
  }

}

module.exports.help = {
    name: "announcement"
}