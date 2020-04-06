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


client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`Fortnite Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Fortnite Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Fortnite Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
});

client.on('guildMemberAdd', member => {
    // This Command Send Message When Someone Joins The Server
    client.user.setActivity(`Fortnite Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
    let joineserverembed = new Discord.MessageEmbed()
        .setTitle('\*\*\_\_Welcome To Fortnite Tournaments\_\_\*\*')
        .setDescription(`Welcome Page And Rules: <#692842435671359498>\nNitro Boost Us For Rewards! <#675394454898737173>\n \n**__How To Play In Tournaments__**\nCheck <#675380924661235712> For A Step By Step Guide + Video!\nHave Questions? Check <#675383542938599437> If This Did Not Help Dm <@675398193755848715>\n<#675383583216631813> Will Have The Latest Tournament\n \n**__Acquirable Roles__**\n• Community Figure - Be a notable figure in the community\n• Pro - Place top 500 in any Fortnite hosted event\n• Content Creator - Over 100k on any platform\n• Developer - Make or develop programs or bots\n• Nitro Booster - Gets when boosting perks: <#675394454898737173>\n• Supporter - When you use our SAC: <#675445416803958784>\n• Tournament Winner - Win one of our tournaments\n* IF YOU QUALIFY FOR ANYTHING DM <@675398193755848715> *`)
        .setColor("#1FCEE3")
        .setThumbnail(`https://cdn.discordapp.com/icons/591361107231506452/a_93cf7000959037455d92773dc85fbbf7.gif?size=1024`)
    member.send(joineserverembed);
});

client.on('guildMemberAdd', member => {
    // This Command Send Message When Someone Joins The Server
    client.user.setActivity(`Fortnite Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
    const channel = member.guild.channels.cache.find(channel => channel.name === 'join-leave')
    if (!channel) return;
    let membername = member.displayName
    let joineserverembed = new Discord.MessageEmbed()
        .setTitle('\*\*\_\_Welcome To Fortnite Tournaments\_\_\*\*')
        .addField('New Person Joined',`${membername}`)
        .addField('Total Members', channel.guild.memberCount)
        .setColor("#15f153")
    channel.send(joineserverembed);
});

client.on('guildMemberRemove', member => {
    // This Command Send Message When Someone Leaves The Server
    client.user.setActivity(`Fortnite Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
    const channel = member.guild.channels.cache.find(channel => channel.name === 'join-leave')
    if (!channel) return;
    let membername = member.displayName
    let leaveserverembed = new Discord.MessageEmbed()
        .setTitle('\*\*\_\_Fortnite Tournaments Bot\_\_\*\*')
        .addField('New Person Left',`${membername};`)
        .addField('Total Members', channel.guild.memberCount)
        .setColor(0xEA3007)
    channel.send(leaveserverembed);
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
    client.user.setActivity(`Fortnite Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
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

    if (command === "embed") {
        message.delete()
        let prefix = '?'
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const word = args.slice(1).join(' ')
        if (!word) return;
        const embed = new Discord.MessageEmbed()
            .setDescription(`${word}`)
            .setColor(`#1FCEE3`)
            .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
        message.channel.send(embed)
    }

    if (command === "serverinfo") {
        let serverembed = new Discord.MessageEmbed()
            .setDescription("Server Information")
            .setColor("#15f153")
            .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .addField("Server Name", message.guild.name)
            .addField('What We Do', 'We Run Huge Cash Prize Tournaments For Mainly Fortnite and Apex Legneds, But are Looking To Expand')
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