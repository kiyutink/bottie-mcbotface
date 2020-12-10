const isUppercaseLetter = (char) => {
  const charCode = char.charCodeAt(0);
  return charCode >= 65 && charCode < 65 + 26;
};

const isLowercaseLetter = (char) => {
  const charCode = char.charCodeAt(0);
  return charCode >= 97 && charCode < 97 + 26;
};

module.exports = (ctx) => {
  const arg = ctx.message.text.substr(3);
  // Consider Y to be always a vowel, for simplicity
  const vowelRegex = /[aeiouy]/gi;

  const response = arg.split("").reduce((res, char) => {
    if (vowelRegex.test(char)) {
      return res + char;
    } else {
      if (isUppercaseLetter(char)) {
        return res + "D";
      }
      if (isLowercaseLetter(char)) {
        return res + "d";
      }
      return res + char;
    }
  }, "");

  if (response.length <= 0) {
    ctx.reply("You have to provide a message that i can D");
  } else {
    ctx.reply(response);
  }
};
