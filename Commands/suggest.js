const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
message.delete();
  
    var idea = args.join(' ');
    if (!idea) return message.channel.send("No idea given. Give an idea");

    var ideaEmbed = new discord.RichEmbed()
    .setTitle("New Suggestion")
    .setColor("#00FF00")
    .addField("Suggestion", idea)
    .addField("Send by", message.author);

    var embed = new discord.RichEmbed()
        .setDescription(`***Suggestion succesfully sent*** ☑️`)
        .setFooter(message.author.tag);

        message.channel.send(embed);


    var ideaChannel = message.guild.channels.find(`name`, "suggestions");
    if (!ideaChannel) return message.channel.send("Channel not found");

    ideaChannel.send(ideaEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');
    });

}


module.exports.help = {
    name: "suggest"
}