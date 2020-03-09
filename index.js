const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const levelFile = require("./levels.json");
const superAgent = require("superagent");
const sql = require('sqlite');






const fs = require("fs");         
const bot = new discord.Client();
bot.commands = new discord.Collection(); 

const active = new Map();

//const afk = require("./afk.json");








fs.readdir("./commands/" , (err, files) => { 

    if(err) console.log(err);  

    var jsFiles = files.filter(f => f.split(".").pop() === "js"); 

    if(jsFiles.length <=0) {
        console.log("Could not find any files"); 
        return;
    }

    jsFiles.forEach((f, i) => {   

        var fileGet = require(`./commands/${f}`);  
        console.log(`The file ${f} is loaded`); 

       bot.commands.set(fileGet.help.name, fileGet);
    })

  
  
  
});

//start of message logging (message edit)

    

    bot.on("messageUpdate", async(oldMessage, newMessage, message ) => {
       if(oldMessage.content === newMessage.content){
           return;
       }

      

        var logEmbed = new discord.RichEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setThumbnail(oldMessage.author.avatarURL)
        .setColor("#2189eb")
        .setDescription("**Message Edited** ") 
        .addField("Before", oldMessage.content, true)
        .addField("After", newMessage.content, true)
        .setTimestamp();
 
        

        var logChannel = newMessage.guild.channels.find(ch => ch.name === "logs")
        if(!logChannel) return;

        logChannel.send(logEmbed);


    })


//end of message logging (message edit)

//start of message logging (message delete)

bot.on("messageDelete", async message => {

    var loggingEmbed = new discord.RichEmbed()
    .setTitle("**Message Deleted**")
    .setColor("#ff1100")
    .setThumbnail(message.author.avatarURL)
    .addField("Message From:", message.author.tag)
    .addField("Message Deleted:", message.content || "Message Deleted: `Content deleted by the bot and could not be loaded!`")
    .addField("Deleted In:", message.channel)
    .addField("Deleted At:", message.createdAt);
  
 
  
   // .setFooter("User ID:", message.author.id);

    var logChannel = message.guild.channels.find(ch => ch.name === "logs")
    if(!logChannel) return;

    logChannel.send(loggingEmbed);



})


//end of message logging (message delete)




bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)
    // bot.user.setActivity("?help", { type: "PLAYING" });

    let statuses = [
        ">setup to get started! v1.4.1",
        ">help",
        ` ${bot.users.size} users`,
        ">invite",
        "Bugs"
        
]

    setInterval(function() {
       let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 12000) 

    

});



// bot.on("guildMemberAdd", member => {

//     var role = member.guild.roles.find("name", "Non-Member");

//     if(!role) return;

//     member.addRole(role);

//     const channel = member.guild.channels.find("name", "new-people");

//     if (!channel) return;

//     channel.send(`Welcome in the server ${member}`);
// });



bot.on("guildCreate",async (guild, message, args) => {
    let channelID;
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = bot.channels.get(guild.systemChannelID || channelID);
    let welcome = new discord.RichEmbed()
    .setDescription("Thanks for inviting me into this server! \n\r To get started say >setup to setup your server for the bot. For more commands say >help.")
    .setColor("#e64b0e");
    channel.send(welcome);
});

bot.on("guildMemberAdd", member => {

    const channel = member.guild.channels.find(`name`, "new-people");
    if (!channel) console.log("Can't find channel");

    var joinMessage = new discord.RichEmbed()
    .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
    .setDescription(`Hi ${member.user.username}, **welcome!**`)
    .setThumbnail(member.avatarURL)
    .setColor("#00FF00")
    .setTimestamp()
    .setFooter("User joined");

    channel.send(joinMessage);

});

bot.on("guildMemberAdd", member => {

    const channel = member.guild.channels.find(`name`, "logs");
    if (!channel) console.log("Can't find channel");

    var joinMessageLog = new discord.RichEmbed()
    .setTitle("Member Joined")
    .setDescription(`${member} joined the server`)
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .setFooter(`ID: ${member.id}`);

    channel.send(joinMessageLog);
});




bot.on("guildMemberRemove", member => {

    const channel = member.guild.channels.find("name", "new-people");
    if (!channel) console.log("Can't find channel");

    var leaveMessage = new discord.RichEmbed()
    .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
    .setThumbnail(member.avatarURL)
    .setDescription(`Bye, ${member} 😔 . Hope you enjoyed your stay!`)
    .setColor("#FF0000")
    .setTimestamp()
    .setFooter("User left");

    channel.send(leaveMessage);

});

bot.on("guildMemberRemove", member => {

    const channel = member.guild.channels.find(`name`, "logs");
    if (!channel) console.log("Can't find channel");

    var leaveMessageLog = new discord.RichEmbed()
    .setTitle("Member Left")
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription(`${member} left the server `)
    .setColor("#ff1100")
    .setTimestamp()
    .setFooter(`ID: ${member.id}`);

    channel.send(leaveMessageLog);

});

// bot.on("message", async message => {
//      if (message.content = bot) return message.channel.send(`${message.author}, My prefix is '${botConfig.prefix}'`);
// });



// var swearWords = ["cancer", "fuck", "shit", "fucking", "bitch", "noob", "nub", "dumb", "stupid", "asshole", "asslicker", "assfucker", "assnigger", "nigger"];

bot.on("message", async message =>  {

    //Als bot bericht stuurt stuur dan return
    if (message.author.bot) return;
  
 

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;
  
  
    var messageArray = message.content.split(" ");
  
    

    var args = messageArray.slice(1);
    (!message.content.startsWith(prefix)); 
    
  
    var command = messageArray[0];
  
     if (!message.content.startsWith(prefix)) return;
   var commands = bot.commands.get(command.slice(prefix.length));
    
   



     var options = {

         active: active

     }


    if (commands) commands.run(bot, message, args, options);
   
    

   


    var randomXp = Math.floor(Math.random(1) * 15) + 1;

    var idUser = message.author.id;

    if (!levelFile[idUser]) {

        levelFile[idUser] = {

            xp: 0,
            level: 0

        }

    }

    levelFile[idUser].xp += randomXp;

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;
    var nextLevelXp = levelUser * 300;

    if (nextLevelXp === 0) nextLevelXp = 100;

    if (xpUser >= nextLevelXp) {

        levelFile[idUser].level += 1;

        fs.writeFile("./data/levels.json", JSON.stringify(levelFile), err => {

            if (err) console.log(err);

        });

        // const logchannel = message.guild.channels.find(`name`, "levels");
        // if(!logchannel) return;

       message.channel.send(`<@${message.author.id}> is now **Level ${levelFile[idUser].level}**   🎉🎉`);


    }


    // var msg = message.content.toLowerCase();

    // for (var i = 0; i < swearWords.length; i++){

    //     if (msg.includes(swearWords[i])){

    //         message.delete();

    //         return message.channel.send("Don't swear or face a conversation with the Vice President+!").then(msg => delete(3000));
            
    //     }

    // }

    // var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    // var msg = message.content.toLowerCase();

    // for (var i = 0; i < swearWords["swearWords"].length; i++){

    //     if (msg.includes(swearWords["swearWords"][i])){

    //         message.delete();

    //         return message.channel.send("Don't swear or face a mute!").then(msg => msg.delete(3000));
            
    //     }

    // }
  
 if (!commands) {

        var swearWords = JSON.parse(fs.readFileSync("./swearWords.json"));

        var sentenceUser = "";

        var amountSwearWords = 0;

        for(var y = 0; y < messageArray.length; y++) {

            var changeWord = "";

            for(var i = 0; i < swearWords["swearWords"].length; i++) {

                var word = messageArray[y].toLowerCase();

                if(word == swearWords["swearWords"][i]) {

                    changeWord = word.replace(swearWords["swearWords"][i], "****");

                    sentenceUser = sentenceUser + " " + changeWord;

                    amountSwearWords++;

                }

            }

            if(!changeWord){

                sentenceUser = sentenceUser + " " + messageArray[y];              


            }

        }

        if(amountSwearWords != 0){

            message.delete();
            message.channel.send(sentenceUser);
            message.channel.send(message.author + " Don't swear! It may lead to an mute! Thank you!");

        }

    }

//    if(message.content.includes(`<!${client.user.id}>`)  message.channel.send(`${message.author}, My prefix is ${botConfig.prefix}`);

   if (!message.content.startsWith(prefix)) return;

    
//   if(message.content.startsWith(bot.tag.username || bot )) return message.channel.send(`${message.author}, My prefix is '${botConfig.prefix}'`);
  
 

  
  

});



bot.login(process.env.token);