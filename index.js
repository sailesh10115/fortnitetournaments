const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();
if (config.token === "setmeplease") return console.log("Set your token up! Go to https://www.discordapp.com/developers and generate a token from a bot user.");

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});


bot.on("ready", () => {
    console.log(bot.user.username + " is online.")

    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started`);
    // Example of changing the bot's playing game to something useful. `bot.user` is what the
    // docs refer to as the "BotUser".
    bot.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });

    bot.on("guildCreate", guild => {
        // This event triggers when the bot joins a guild.
        console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
        bot.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
    });

    bot.on("guildDelete", guild => {
        // this event triggers when the bot is removed from a guild.
        console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
        bot.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
    });

    bot.on('guildMemberAdd', member => {
        // This Command Send Message When Someone Joins The Server
        bot.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
        let joineserverembed = new Discord.MessageEmbed()
            .setTitle('\*\*\_\_Welcome To Pro League Tournaments\_\_\*\*')
            .setDescription(`\*\*Before you do anything go to <#697083905580204032> and react with what games you play!\*\*\n \nWelcome Page And Rules: <#692842435671359498>\nNitro Boost Us For Rewards! <#675394454898737173>\n \n**__How To Play In Tournaments__**\nCheck <#675380924661235712> For A Step By Step Guide + Video!\nHave Questions? Dm <@675398193755848715>\n \n**__Acquirable Roles__**\n• Community Figure - Be a notable figure in the community\n• Pro - Place top 500 in any hosted event\n• Content Creator - Over 100k on any platform\n• Developer - Make or develop programs or bots\n• Nitro Booster - Gets when boosting perks: <#675394454898737173>\n• Supporter - When you use our SAC: <#675394454898737173>\n• Tournament Winner - Win one of our tournaments\n* IF YOU QUALIFY FOR ANYTHING DM <@675398193755848715> *`)
            .setColor("#1FCEE3")
            .setThumbnail(`https://cdn.discordapp.com/icons/591361107231506452/81324d88ab6104b42da8e03bde295441.png?size=1024`)
        member.send(joineserverembed);
    });
    bot.on('guildMemberRemove', member => {
        // This Command Send Message When Someone Leaves The Server
        bot.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
    });

    setInterval(() => {
        let lfg = bot.channels.cache.get('675381249312948244');
        const lfgembed = new Discord.MessageEmbed()
            .setTitle('\*\*\_\_Fortnite Boxfights\_\_\*\*')
            .setThumbnail(lfg.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .setDescription('Remember to use our own ranked boxfights system for \*\*VBucks!\*\* \nQueue up for a match right now in <#692853691308310589>. \nMore information on how to use it on <#692888715512643654>.')
            .setColor(`#1FCEE3`)
        lfg.send(lfgembed)
    }, 1800000);

    setInterval(() => {
        bot.user.setActivity(`Pro League Tournaments | Prefix: ?`, { url: "https://www.twitch.tv/tournaments_fn", type: "STREAMING" });
    }, 60000);
});


bot.on("message", async message => {
    //a little bit of data parsing/general checks
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;


    //checks if message contains a command and runs it
    let commandfile = bot.commands.get(command.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
})


bot.login(config.token)