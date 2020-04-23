
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

  const memberserverembed = new Discord.MessageEmbed()
  .addField("Total Members", message.guild.memberCount)
  .setColor("#1FCEE3")

message.channel.send(memberserverembed);

}
//name this whatever the command name is.
module.exports.help = {
  name: "members"
}