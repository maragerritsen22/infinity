const discord = require("discord.js");
const superAgent = require("superagent");

module.exports.run = async (bot, message, args) => {
message.delete();
  
    var dog;

    dog = await superAgent
    .get("https://random.dog/woof.json");

    
    while(dog.body.url.endsWith(".mp4") || dog.body.url.endsWith(".webm")){
        dog = await superAgent
          .get("https://random.dog/woof.json");
    }


    var embed = new discord.RichEmbed()
    .setTitle("Dog :dog:")
    .setColor("#880000")
    .setImage(dog.body.url);

    message.channel.send(embed);

}

module.exports.help = {
    name: "dog"
}