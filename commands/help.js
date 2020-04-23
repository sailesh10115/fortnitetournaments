
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

    const serverembed = new Discord.MessageEmbed()
    .setColor("#1FCEE3")
    .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
    .setTitle("\*\*\_\_Pro League Tournaments Bot\_\_\*\*") 
    .setDescription("\`?av\` - Shows your or the @ person pfp\n\`?embed\` - Create a custom embed message\n\`?editembed\` - Edit a previously made embed\n\`?members\` - Displays memebr count\n\`?say\` - Create a custom message\n\`?serverinfo\` - Displays information about the server")
  
  message.channel.send(serverembed);
}
//name this whatever the command name is.
module.exports.help = {
  name: "help"
}