
module.exports.run = async (bot, message, args, ops) => {

    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("No music playing");

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Your not in the same channel as the bot");

    if (guildIDData.dispatcher.paused) return message.channel.send("The music is already paused.");
    
    guildIDData.dispatcher.pause();

    return message.channel.send(`Correct paused from ${guildIDData.queue[0].songTitle}`);
    
}

module.exports.help = {
    name: "pause"
}