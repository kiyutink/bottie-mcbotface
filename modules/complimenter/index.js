const compliments = require("./compliments.json");

module.exports = (bot) => {
  bot.command("compliment", (ctx, next) => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    ctx.reply(compliments[randomIndex]);
    next();
  });
};
