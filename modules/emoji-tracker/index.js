const emojiRegex = require("emoji-regex/RGI_Emoji.js");
const GraphemeSplitter = require("grapheme-splitter");
const { mergeWith, add } = require("ramda");
const firestore = require("../../lib/firestore");

module.exports = async (ctx) => {
  const message = ctx?.update?.message?.text;
  if (!message) {
    return;
  }
  const regex = emojiRegex();
  const splitter = new GraphemeSplitter();
  const chatId = ctx.update.message.chat.id;

  const emojiUsagesDocRef = firestore
    .collection("emojiUsages")
    .doc(String(chatId));

  const emojiUsagesInThisMessage = {};

  for (const char of splitter.splitGraphemes(message)) {
    if (char.match(regex)) {
      if (emojiUsagesInThisMessage[char]) {
        emojiUsagesInThisMessage[char] += 1;
      } else {
        emojiUsagesInThisMessage[char] = 1;
      }
    }
  }

  const document = await emojiUsagesDocRef.get();
  if (document.exists) {
    const currentUsages = document.data();
    await emojiUsagesDocRef.set(
      mergeWith(add, currentUsages, emojiUsagesInThisMessage)
    );
  } else {
    await emojiUsagesDocRef.set(emojiUsagesInThisMessage);
  }
};
