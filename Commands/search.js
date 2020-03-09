const search = require('yt-search');

module.exports.run = async (bot, message, args, ops) => {



    search(args.join(' '), function(err, res) {

        if (err) return message.channel.send('Something wrong happend');

        var videos = res.videos.slice(0,10);

        var response = '';

        for (var i in videos){

            response += `**[${parseInt(i)+1}];** ${videos[i].title} \r\n`;


        }
        response += `Choose an song between 1-${videos.length}`;

        message.channel.send(response);

        const filter = music => !isNaN(music.content) && music.content < videos.length && music.content > 0;

        const collection = message.channel.createMessageCollector(filter);

        collection.videos = videos;

        collection.once('collect', function(music) {

            var commandFile = require('./play.js');

            commandFile.run(bot, message, [this.videos[parseInt(music.content) - 1].url], ops);

        });

    });
  

}

module.exports.help = {
    name: "search"
}