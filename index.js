// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token 
// config.prefix contains the message prefix.
const beautify = require("beautify")


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
});

client.on('guildMemberAdd', member => {
  // This Command Send Message When Someone Joins The Server
  client.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
  let joineserverembed = new Discord.MessageEmbed()
    .setTitle('\*\*\_\_Welcome To Pro League Tournaments\_\_\*\*')
    .setDescription(`\*\*\_\_Before you do anything go to <#697083905580204032> and react with what games you play!\_\_\*\*\n \nWelcome Page And Rules: <#692842435671359498>\nNitro Boost Us For Rewards! <#675394454898737173>\n \n**__How To Play In Tournaments__**\nCheck <#675380924661235712> For A Step By Step Guide + Video!\nHave Questions? Dm <@675398193755848715>\n \n**__Acquirable Roles__**\n• Community Figure - Be a notable figure in the community\n• Pro - Place top 500 in any hosted event\n• Content Creator - Over 100k on any platform\n• Developer - Make or develop programs or bots\n• Nitro Booster - Gets when boosting perks: <#675394454898737173>\n• Supporter - When you use our SAC: <#675394454898737173>\n• Tournament Winner - Win one of our tournaments\n* IF YOU QUALIFY FOR ANYTHING DM <@675398193755848715> *`)
    .setColor("#1FCEE3")
    .setThumbnail(`https://cdn.discordapp.com/icons/591361107231506452/81324d88ab6104b42da8e03bde295441.png?size=1024`)
  member.send(joineserverembed);
});

client.on('guildMemberRemove', member => {
  // This Command Send Message When Someone Leaves The Server
  client.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
});

setInterval(() => {
  let lfg = client.channels.cache.get('675381249312948244');
  const lfgembed = new Discord.MessageEmbed()
    .setTitle('\*\*\_\_Fortnite Boxfights\_\_\*\*')
    .setThumbnail(lfg.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
    .setDescription('Remember to use our own ranked boxfights system for \*\*VBucks!\*\* \nQueue up for a match right now in <#692853691308310589>. \nMore information on how to use it on <#692888715512643654>.')
    .setColor(`#1FCEE3`)
  lfg.send(lfgembed)
}, 1800000);

setInterval(() => {
  client.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
}, 60000);


client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.reply('Hello, Please Check <#675380924661235712> To Play In Our Tourneys')
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if (message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.

  if (command === "eval") {
    if (message.author.id !== "644989163543724033") {
      return message.reply("you're not the bot owner haha")

    }

    if (!args[0]) {
      message.reply("you need to eval something please :)")
        .then(m => m.delete(5000));
    }

    try {
      if (args.join(" ").includes("token")) {
        return;
      }

      const toEval = args.join(" ");
      const evaluated = eval(toEval);

      let embed = new MessageEmbed()
        .setColor("#7289DA")
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("Eval")
        .addField("to evaluate:", `\`\`\`js\n${beautify(srg.join(" "), { format: "js" })}\n\`\`\`\``)
        .addField("Evaluated:", evaluated)
        .addField("Type of:", typeof (evaluated));

      message.author.send(embed);
    } catch (e) {
      let embed = new MessageEmbed()
        .setColor("#99AAB5")
        .setTitle("\:x: Error!")
        .setDescription(e)
        .setFooter(bot.user.username, bot.user.displayAvatarURL);

      message.author.send(embed);

    }
  }

  if (command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o => { });
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  if (command === "pembed") {
    message.delete()
    let prefix = '?'
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const word = args.slice(1).join(' ')
    if (!word) return;
    const embed = new Discord.MessageEmbed()
      .setDescription(`${word}`)
      .setColor(`#1FCEE3`)
      .setThumbnail(`https://cdn.discordapp.com/icons/591361107231506452/a_c08f7d0195f0e0a3a3aa36053f48131d.gif?size=1024`)
    message.channel.send(embed)
  }

  if (command === "editembed") {
    client.channels.cache.get('697083905580204032').messages.fetch("699051219699892358").then(message => {
    const embed = new Discord.MessageEmbed()
      .setColor("#1FCEE3") 
      .setDescription('If some emojis are missing restart discord by doing \`CTRL + R\` \nPlease only react once as the bot may be slow\nIf the reactions are currently not working or experiencing issues, please come back and try again later.');

    message.edit(embed);
  })
}


  if (command === "embed") {
    message.delete()
    let prefix = '?'
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const word = args.slice(1).join(' ')
    if (!word) return;
    const embed = new Discord.MessageEmbed()
      .setDescription(`${word}`)
      .setColor(`#1FCEE3`)
    message.channel.send(embed)
  }

  if (command === "serverinfo") {
    let serverembed = new Discord.MessageEmbed()
      .setDescription("Server Information")
      .setColor("#15f153")
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
      .addField("Server Name", message.guild.name)
      .addField('What We Do', 'We Run Huge Cash Prize Tournaments')
      .addField("Created On", message.guild.createdAt)
      .addField("You Joined", message.member.joinedAt)
      .addField("Total Members", message.guild.memberCount)

    message.channel.send(serverembed);
  }

  if (command === "av") {
    let member = message.mentions.members.first() || message.member,
      user = member.user;
    const av = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL)
      .setColor(`#1FCEE3`)
      .setImage(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
      .setFooter('Searched User')
      .setTimestamp()
    message.channel.send({ embed: av });
  }

  if (command === "members") {
    let sicon = message.guild.iconURL
    let memberserverembed = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 }))
      .addField("Total Members", message.guild.memberCount)
      .addField("You Joined", message.member.joinedAt)
      .setColor("#1FCEE3")
      .setThumbnail(sicon)

    message.channel.send(memberserverembed);
  }
});

client.login(config.token);