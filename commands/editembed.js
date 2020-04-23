
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');


module.exports.run = async (bot, message, args) => {

    await message.channel.send(`What is the channel ID`)
    let answer = await message.channel.awaitMessages(answer => answer.author.id != bot.user.id, { max: 1 });
    const channel = (answer.map(answers => answers.content).join());

    await message.channel.send(`What is the message ID`)
    answer = await message.channel.awaitMessages(answer => answer.author.id != bot.user.id, { max: 1 });
    const messageid = (answer.map(answers => answers.content).join());
    
    bot.channels.cache.get(`${channel}`).messages.fetch(`${messageid}`).then (async message => {

        await message.channel.send(`What do you want the title to be?`)
        answer = await message.channel.awaitMessages(answer => answer.author.id != bot.user.id, { max: 1 });
        const title = (answer.map(answers => answers.content).join());

        await message.channel.send(`What do you want the description to be?`)
        answer = await message.channel.awaitMessages(answer => answer.author.id != bot.user.id, { max: 1 });
        const description = (answer.map(answers => answers.content).join());

        message.channel.send(`What do you want the Color to be? (Please send generic names or codes | Also respond in ALL CAPS)`)
        answer = await message.channel.awaitMessages(answer => answer.author.id != bot.user.id, { max: 1 });
        const color = (answer.map(answers => answers.content).join());

        message.channel.send(`Thumbnail LINK (Type "none" if you don't want to use a thumbnail)`)
        answer = await message.channel.awaitMessages(answer => answer.author.id != bot.user.id, { max: 1 });
        const Thumbnail = (answer.map(answers => answers.content).join())

        if (Thumbnail === 'none') {
            message.channel.send(`What do you want the footer to be?`)
            answer = await message.channel.awaitMessages(answer => answer.author.id != bot.user.id, { max: 1 });
            const footer = (answer.map(answers => answers.content).join());

            message.channel.bulkDelete('15')

            const embed = new MessageEmbed()
                .setTitle(`${title}`)
                .setDescription(`${description}`)
                .setFooter(`${footer}`, message.guild.iconURL())
                .setColor(`${color}`)
            message.channel.edit(embed).catch(error => message.reply(`An error occured. Please make sure everything is correct & re-submit.`))
        } else {
            message.channel.send(`What do you want the footer to be?`)
            answer = await message.channel.awaitMessages(answer => answer.author.id != bot.user.id, { max: 1 });
            const footer = (answer.map(answers => answers.content).join());

            message.channel.bulkDelete('15')

            const embed = new MessageEmbed()
                .setTitle(`${title}`)
                .setDescription(`${description}`)
                .setThumbnail(`${Thumbnail}`)
                .setFooter(`${footer}`, message.guild.iconURL())
                .setColor(`${color}`)
            message.channel.edit(embed).catch(error => message.reply(`An error occured. Please make sure everything is correct & re-submit.`))
        }

        })

}
//name this whatever the command name is.
module.exports.help = {
    name: "editembed"
}