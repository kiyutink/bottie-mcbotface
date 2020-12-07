module.exports = (ctx) => {
  const arg = ctx.message.text.substr(3);
  const response = arg.replace(/b/gi, "🅱️");
  if (response.length <= 0) {
    ctx.reply("You have to provide a message that i can 🅱️");
  } else {
    ctx.reply(response)
  }
};
