const discord = require("discord.js");

module.exports.run = async(bot,message, args) => {
message.delete();
  
    {

        if(args[0] == null){

            var useMessage = new discord.RichEmbed()
            .setTitle("User")
            .setDescription("Add a user you want to ban!");
            return message.channel.send(useMessage);
        
        }

        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(args[0]));

        if (!banUser) return message.channel.send("User not found");
      
        let bannedMember = await bot.fetchUser(args[0])

        var reason = args.join(" ").slice(22);

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**`❌ You don't have the permissions to do this`**");

       if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**`❌ This user is a moderator. I can't ban a moderator.`**");

        if (!reason) message.channel.send("Please provide a reason!");

        var ban = new discord.RichEmbed()
            .setTitle("**Ban**")
            .setColor("#b81b16")
            .addField("Banned user", banUser)
            .addField("Banned by", message.author)
            .addField("Reason", reason);

        var banChannel = message.guild.channels.find(`name`, "logs");
        if (!banChannel) return message.guild.send("Can not find channel");

        message.guild.member(banUser).ban(reason);

        var banChannelEmbed = new discord.RichEmbed()
        .setDescription(`***${banUser} has been banned!*** ☑️`)

        message.channel.send(banChannelEmbed);

        banChannel.send(ban);

        return;

    }


}



module.exports.help = {
    name: "ban"
}