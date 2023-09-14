import {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  MessageManager,
} from "discord.js";
import "dotenv/config";

// Required packages
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Reaction],
});
// const YouTube = require('simple-youtube-api')
// const youtube = new YouTube(process.env.YOUTUBE_API_KEY)

////////////////////////////////////////////////////////////
// JS Functions

// Format seconds function
// function format(seconds) {
//   const hours = Math.floor(seconds / (60 * 60));
//   const minutes = Math.floor(seconds % (60 * 60) / 60);

//   return `${hours} hour(s) and ${minutes} minute(s)`;
// }

// Creates the get_gif_url function
async function get_gif_url(query) {
  const MAX_RESULTS = 50;

  // Fetches the gif url
  const gif_response = await fetch(
    `https://tenor.googleapis.com/v2/search?q=${query}&key=${process.env.TENOR_API_KEY}&limit=${MAX_RESULTS}&media_filter=minimal`
  );
  // Converts it to json
  const gif_data = await gif_response.json();
  // Returns the url
  // console.log(gif_data.results[Math.floor(Math.random() * (MAX_RESULTS - 1) + 1)].url)
  return gif_data.results[Math.floor(Math.random() * (MAX_RESULTS - 1) + 1)]
    .url;
}

// Function to schedule a reminder. 
function scheduleReminder() {
  // Set the time for the reminder (10 PM EST)
  const targetHour = 22; // 10 PM
  const timeZoneOffset = -5; // EST timezone offset

  const now = new Date();
  const targetDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    targetHour + timeZoneOffset,
    0, // Minutes
    0, // Seconds
    0 // Milliseconds
  );

  if (targetDate <= now) {
    // If the target time has already passed today, set it for tomorrow
    targetDate.setDate(targetDate.getDate() + 1);
  }

  // Calculate the delay until the reminder time in milliseconds
  const delay = targetDate - now;

  setTimeout(() => {
    const channel = client.channels.cache.get(process.env.GHG_Announcements_CID); // GHG-projects announcements channel ID
    if (channel) {
      // Send the reminder message!
      channel.send({
        embeds: [
          new EmbedBuilder()
            .setDescription('@everyone Wakey wakey eggs and bakey! Let\'s get this fucking money!')
            .setColor("Gold")
            .setImage("https://tenor.com/view/wake-up-wakey-wakey-wake-up-wake-up-wake-up-wake-up-wake-up-wake-up-wake-up-wake-up-wake-up-gif-19858788"),
        ],
      });
    }
    scheduleReminder(); // Schedule the next reminder
  }, delay);
}
////////////////////////////////////////////////////////////

client.on("ready", () => {
  console.log("The bot is ready");

  client.user.setActivity("ಥ_ಥ");

  // This will schedule daily reminders for the GHG-Projects server
  scheduleReminder();

  let commands = client.application?.commands;

  commands?.create({
    name: "ping",
    description: "Replies with pong.",
  });

  commands?.create({
    name: "add",
    description: "Adds two numbers",
    options: [
      {
        name: "num1",
        description: "The first number.",
        required: true,
        type: 10, // type 3 is a 'NUMBER'
      },
      {
        name: "num2",
        description: "The second number.",
        required: true,
        type: 10,
      },
    ],
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand) {
    return;
  }

  const { commandName, options } = interaction;

  if (commandName === "ping") {
    interaction.reply({
      content: "pong",
      // ephemeral: true,   // this means that only the user who uses the command can see the output
    });
  } else if (commandName === "add") {
    const num1 = options.getNumber("num1");
    const num2 = options.getNumber("num2");

    interaction.reply({
      content: `The sum of ${num1} and ${num2} is ${num1 + num2}!`,
      // ephemeral: true
    });
  }
});

client.on("messageCreate", async (message) => {
  // Check for prefix and a bot author
  if (message.author.bot || !message.content.startsWith("-")) return;

  if(message.content.startsWith("-role")) {

    const roles = ["Top", "Mid", "Adc", "Jungle", "Sup", "Fill"];

    const role = roles[Math.floor(Math.random() * (roles.length - 1) + 1) - 1];
    
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("LOL Roles")
          .setColor("Gold")
          .setDescription(`${message.author} is playing ${role} 😔😔😔`)
      ],
    });

  } else if (message.content.startsWith("-agent")) {
    const agents = [
      "Jett",
      "Viper",
      "Sova",
      "Astra",
      "Neon",
      "Sage",
      "Skye",
      "Chamber",
      "Cypher",
      "Raze",
      "Killjoy",
      "Reyna",
      "Breach",
      "Omen",
      "KAY/0",
      "Brimstone",
      "Phoenix",
      "Yoru",
      "Harbor",
    ];
    const agentGIFS = [
      'https://media.tenor.com/TsbMVK412mgAAAAd/jett.gif',
      'https://media.tenor.com/g9A24_pALocAAAAC/viper-valorant.gif',
      'https://media.tenor.com/Hr5kj-7Ou2wAAAAd/skyyart-sova.gif',
      'https://media.tenor.com/syoxj40mMUAAAAAC/astra-valorant.gif',
      'https://media.tenor.com/PMD_bHs1a_0AAAAC/neon-bastos.gif',
      'https://media.tenor.com/RUPO2gANpNkAAAAC/sage-sage-valorant.gif',
      'https://media.tenor.com/hONwxlUrZWQAAAAi/pettheskye-skye.gif',
      'https://media.tenor.com/K7WqPQnzSQUAAAAd/teleport-chamber.gif',
      'https://media.tenor.com/lYQDXnj56IAAAAAd/cypher-moonwalk.gif',
      'https://media.tenor.com/cw_OWBERHz4AAAAC/raze-mohid.gif',
      'https://media.tenor.com/FsY3tbEvAwYAAAAC/killjoy-valorant-valorant.gif',
      'https://media.tenor.com/pypLAHr1-8MAAAAC/reyna-reyna-valorant.gif',
      'https://media.tenor.com/4pqiXrat9t8AAAAC/shaking-the-cell-door-breach.gif',
      'https://media.tenor.com/GeQTgV7pYOYAAAAC/omen-valorant.gif',
      'https://media.tenor.com/TMEpyWcdm_YAAAAd/kayo-valorant.gif',
      'https://media.tenor.com/nIjkdlQgWXQAAAAC/shocked-brimstone.gif',
      'https://media.tenor.com/n3NPvU-gSRwAAAAC/phoenix-phoenix-valorant.gif',
      'https://media.tenor.com/jDi3Vfv1HlYAAAAC/valorant-yoru.gif',
      'https://media.tenor.com/cBF4NoI3xfAAAAAd/glaring-harbor.gif'
    ]
    const i = Math.floor(Math.random() * (agents.length - 1) + 1) - 1
    const agent = agents[i];
    const agentGIF = agentGIFS[i]
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("Val Agent Randomizer")
          .setColor("Gold")
          .setDescription(`${agent} is your Valorant Agent!!`)
          .setImage(agentGIF)
      ],
    });
  } else if (message.content.startsWith("-who")) {
    const people = ["Gavin", "Rebecca", "Alex", "Kenzie"];

    const person =
      people[Math.floor(Math.random() * (people.length - 1) + 1) - 1];
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("Who's Picking??!!")
          .setColor("Gold")
          .setDescription(`${person} is our lucky winner! ☜(ﾟヮﾟ☜)`)
          .setImage(
            "https://media.tenor.com/DXL84KB6lscAAAAi/confetti-cute.gif"
          ),
      ],
    });
  } else if (message.content.startsWith("-gif")) {
    // Checks for empty command
    const gif_command = message.content.replace("-gif ", "");
    if (gif_command.trim().length === 4) {
      return;
    }

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("GIFs")
          .setColor("Gold")
          .setDescription(`Generating   ✨${gif_command}✨   GIF...`),
        // .setImage(await get_gif_url(message.content.replace('-gif ', '')))
      ],
    });
    message.channel.send(await get_gif_url(gif_command));
  } else if (message.content.startsWith("-slap")) {
    let user = message.mentions.users.first();
    if (user === undefined) return;

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author} Slapped ${user}`)
          .setTitle("SLAPPED")
          // .setAuthor({
          //   name: client.user.tag,
          //   iconURL: client.user.defaultAvatarURL,
          // })
          .setColor("Gold")
          .setImage("https://media.tenor.com/NcaMPLZxSysAAAAC/nami-sanji.gif"),
      ],
    });
  } else if (message.content === "-bawk") {
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription("Here is the best Stardew chicken i could find.")
          .setTitle("Chicken :)")
          .setColor("Gold")
          .setImage(
            "https://media.tenor.com/QrTv5JhdH1cAAAAi/chicken-stardew-valley.gif"
          ),
      ],
    });
  } else if (message.content === "-ping") {
    const reply = await message.reply("pong");
    reply.react("❤");
  } else if (message.content === "-Ping") {
    message.reply("PPPOOOOONNNNGGGG!!!!!!");
  } else if (message.content === "-PING") {
    message.reply("Stop yelling at me. >:(");
  }
});

// client.on('messageReactionAdd', reaction => {
//   // console.log(reaction)
// })

client.login(process.env.TOKEN);
