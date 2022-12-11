import { Client, GatewayIntentBits, Partials } from 'discord.js'
import 'dotenv/config'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [
    Partials.Message,
    Partials.Reaction,
  ],
})

client.on('ready', () => {
  console.log('The bot is ready')

  client.user.setActivity('ಥ_ಥ')

  let commands = client.application?.commands
  const prefix = '-'

  commands?.create({
    name: 'ping',
    description: 'Replies with pong.',
  })

  commands?.create({
    name: 'add',
    description: 'Adds two numbers',
    options: [
      {
        name: 'num1',
        description: 'The first number.',
        required: true,
        type: 10    // type 3 is a 'NUMBER'
      },
      {
        name: 'num2',
        description: 'The second number.',
        required: true,
        type: 10
      }
    ]
  })
})

  // // guild
  // // const guildID = '1050610606996201481'
  // const guildID = '681046117454053446' // Streamer CircleJerk
  // const guild = client.guilds.cache.get(guildID)
  // let commands

  // if(guild){
  //   commands = guild.commands
  // } else {
  //   commands = client.application?.commands
  // }
  

client.on('interactionCreate', async (interaction) =>{
  if(!interaction.isCommand){
    return
  }

  const {commandName, options} = interaction

  if(commandName === 'ping'){
    interaction.reply({
      content: 'pong',
      // ephemeral: true,   // this means that only the user who uses the command can see the output
    })
  } else if (commandName === 'add') {
    const num1 = options.getNumber('num1')
    const num2 = options.getNumber('num2')

    interaction.reply({
      content: `The sum of ${num1} and ${num2} is ${num1 + num2}!`,
      // ephemeral: true 
    })
  }
}) 

client.on('messageCreate', async (message) => {
  // Check for prefix and a bot didnt send the message
  // if(!message.content.startsWith(prefix)) {
  //   return
  // }

  if(message.content === 'ping') {
    const reply = await message.reply('pong')
    reply.react('❤')
  }
  else if(message.content === 'Ping') {
    message.reply('PPPOOOOONNNNGGGG!!!!!!')
  }
  else if(message.content === 'PING') {
    message.reply('Stop yelling at me. >:(')
  }
})

// client.on('messageReactionAdd', reaction => {
//   // console.log(reaction)
// })

client.login(process.env.TOKEN)