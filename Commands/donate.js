const discord = require("discord.js");

module.exports.run = async(bot,message, args) => {

    var donateEmbed = new discord.RichEmbed()
        .setTitle("Donate")
        .setDescription("Donate only, if you can, may and want! https://paypal.me/pools/c/8mafOre4i8")
        .setFooter("Refunds only possible when you have a good reason! (this message will be deleted in 1 min)")
        .setColor("#fcba03");

        

       message.channel.send(donateEmbed).then(m => m.delete(60000));

     message.delete();


}


module.exports.help = {
    name: "donate"
}