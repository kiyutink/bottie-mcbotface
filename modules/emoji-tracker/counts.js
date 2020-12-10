const { prop, sortBy } = require("ramda");
const firestore = require("../../lib/firestore");

module.exports = async (ctx) => {
  const chatId = ctx.update.message.chat.id;
  const emojiUsagesDocRef = firestore
    .collection("emojiUsages")
    .doc(String(chatId));

  const document = await emojiUsagesDocRef.get();
  if (document.exists) {
    const data = document.data();
    const sortedEntries = sortBy(prop("1"), Object.entries(data));
    const top10 = sortedEntries.reverse().slice(0, 10);
    ctx.reply("The most used emoji in this chat are:");
    ctx.reply(
      top10
        .map(([emoji, count]) => `${emoji} - used ${count} time(s)\n`)
        .join("")
    );
  } else {
    ctx.reply("You haven't used any emoji in this chat yet!");
  }
};
