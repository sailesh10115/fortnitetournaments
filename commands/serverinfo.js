
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

  const serverembed = new Discord.MessageEmbed()
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
//name this whatever the command name is.
module.exports.help = {
  name: "severinfo"
}