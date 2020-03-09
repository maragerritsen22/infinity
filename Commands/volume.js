
module.exports.run = async (bot, message, args, ops) => {

    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("No music playing");

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Your not in the same channel as the bot");

    if (isNaN(args[0]) || args[0] < 0 || args[0] > 200) return message.channel.send(`Choose an number between 0 and 200`);

    guildIDData.dispatcher.setVolume(args[0]/100);

    return message.channel.send(`The volume is set to ${args[0]}`); 

}

module.exports.help = {
    name: "volume"
}