
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
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
//name this whatever the command name is.
module.exports.help = {
  name: "av"
}