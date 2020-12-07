const { getRedditAccessToken } = require("./auth");
const snoowrap = require("snoowrap");

module.exports = async (ctx) => {
  const accessToken = await getRedditAccessToken();

  const reddit = new snoowrap({
    userAgent: "Getting posts",
    accessToken,
  });

  const randomSubmission = await reddit.getRandomSubmission("me_irl");
  ctx.replyWithPhoto(randomSubmission.url_overridden_by_dest);
};
