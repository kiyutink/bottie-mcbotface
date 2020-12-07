require("dotenv").config();
const redditModule = require("./modules/reddit-meme-getter");
const complimenterModule = require("./modules/complimenter");
const bModule = require("./modules/b");
const dModule = require("./modules/d");

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

bot.start((ctx) => ctx.reply("Welcome"));
// bot.help((ctx) => ctx.reply("Send me a sticker"));
// bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.command("meme", redditModule);
bot.command("compliment", complimenterModule);
bot.command("b", bModule);
bot.command("d", dModule);

bot.launch();
