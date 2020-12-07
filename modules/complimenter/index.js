const compliments = require("./compliments.json");

module.exports = (ctx) => {
  const randomIndex = Math.floor(Math.random() * compliments.length);
  ctx.reply(compliments[randomIndex]);
};
