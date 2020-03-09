module.exports.run = async(bot, message, args, ops) => {

    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("No music playing");

    var queue = guildIDData.queue;
    var nowPlaying = queue[0];

    var response = `**Now playing ${nowPlaying.songTitle} - Requested by ${nowPlaying.requester} \n\n __Queue__** \n`;

    for (var i = 0; i < queue.length; i++) {

       response +=  `${i} - ${queue[i].songTitle} - Requested by ${queue[i].requester}\n`;

    }

    message.channel.send(response);

}

module.exports.help = {
    name: "queue"
}