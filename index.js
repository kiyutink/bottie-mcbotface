if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const redditModule = require("./modules/reddit-meme-getter");
const complimenterModule = require("./modules/complimenter");
const bModule = require("./modules/b");
const dModule = require("./modules/d");
const emojiTrackerModule = require("./modules/emoji-tracker");
const countsModule = require("./modules/emoji-tracker/counts");

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

bot.start((ctx) => ctx.reply("To see the list of all commands use /help"));
bot.help((ctx) =>
  ctx.reply(`
Supported commands:
/help - Print this text
/meme - Send a random meme from /r/me_irl
/compliment - Send a random compliment
/emoji - Display 10 most used emoji for current chat
/b [text] - 🅱️eautify text
/d [text] - Ededy doddodadd id d
`)
);

[
  redditModule,
  complimenterModule,
  bModule,
  dModule,
  emojiTrackerModule,
  countsModule,
].forEach((mw) => mw(bot));

bot.telegram.setWebhook(process.env.WEBHOOK_URL);
bot.startWebhook("/webhook", null, process.env.PORT);
