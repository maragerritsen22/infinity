module.exports.run = async(bot, message, args, ops) => {

    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("No music playing");

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Your not in the same channel as the bot");

    var amountUsers = message.member.voiceChannel.members.size;

    var amountSkip = Math.ceil(amountUsers / 2);

    if (!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

    if (guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`You already voted. ${guildIDData.queue[0].voteSkips.lentgh}/${amountSkip}`);

    guildIDData.queue[0].voteSkips.push(message.member.id);

    ops.active.set(message.guild.id, guildIDData);

    if (guildIDData.queue[0].voteSkips.length >= amountSkip) {

        message.channel.send("Skipped song");

        return guildIDData.dispatcher.emit("end");

    }

    message.channel.send(`Added to skips. ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);

}

module.exports.help = {
    name: "skip"
}