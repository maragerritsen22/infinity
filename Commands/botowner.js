const discord = require("discord.js");

module.exports.run = async(bot,message, args) => {
message.delete();
  
    var botIcon = bot.user.displayAvatarURL;

        var botEmbed = new discord.RichEmbed()
            .setTitle("Disord bot owner info")
            .setColor("#31d11f")
            .setThumbnail(botIcon)
            .addField("Bot owner name", "Jesse aka CatInYellow#8163")
            .setDescription("*Jesse made me and is now the founder and owner of me! I do everything that he wants! Do you see any problems/bugs or just some suggestions DM my owner!* :smile:")
            .addField("Bot Made on", bot.user.createdAt)
            .setFooter("Requested by", message.author);

        return message.channel.send(botEmbed);

}


module.exports.help = {
    name: "botowner"
}