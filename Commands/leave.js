
module.exports.run = async(bot,message, args) => {

    if (!message.member.voiceChannel) return message.channel.send("Join a voicechannel first");

    if (!message.guild.me.voiceChannel) return message.channel.send("The bot is not connected to a voicechannel");

    if (message.guild.me.voiceChannelID != message.member.voiceChannelID) return message.channel.send("Your not connected to the same voicechannel");

    message.guild.me.voiceChannel.leave();

    message.channel.send("Left voicechannel");

}

module.exports.help = {
    name: "leave"
}