const got = require("got");
const { base64 } = require("../../lib/helpers");

const getRedditAccessToken = (() => {
  let lastIssuedToken = null;
  let lastTokenIssuedAt = null;
  const FIFTY_MINUTES_IN_MS = 50 * 60 * 1000;

  return async () => {
    if (
      Date.now() - lastTokenIssuedAt < FIFTY_MINUTES_IN_MS &&
      lastIssuedToken
    ) {
      return lastIssuedToken;
    }

    const { body } = await got.post(
      "https://www.reddit.com/api/v1/access_token",
      {
        headers: {
          Authorization: `Basic ${base64(
            process.env.REDDIT_CLIENT_ID + ":" + process.env.REDDIT_SECRET
          )}`,
        },
        form: {
          grant_type: "client_credentials",
        },
        responseType: "json",
      }
    );
    lastIssuedToken = body.access_token;
    lastTokenIssuedAt = Date.now();

    return body.access_token;
  };
})();

module.exports = {
  getRedditAccessToken,
};
