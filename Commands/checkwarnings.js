const discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the permissions to do this!");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.channel.send("Couldn't find a user.");
    //added code
    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
       if (err) console.log(err);
    });
    //end
    let warnings = warns[wUser.id].warns;
    let reasons = warns[wUser.id].reason;

    let warningText = "";
    let reasonText = "";
    if (warnings < 1 ) {
    warningText = "User has **0** warnings." 
    if(warnings === 1) {
      warningText = `${wUser} has **1** warning.`
    
    } else {
    warningText = warnings
    reasonText = reasons
    }
   } 

    if(!warnings) return message.channel.send("User has no warnings.");



  


    message.channel.send(` ${wUser} has **${warnings}** warnings.`);

    message.delete();
    
    
}

module.exports.help = {
    name: "warnings"
}