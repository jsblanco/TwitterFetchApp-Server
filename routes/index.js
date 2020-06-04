const express = require("express");
const router = express.Router();
const Twitter = require("twitter-lite");

router.post("/get-user-tweets", async (req, res, next) => {
  try {
    let { screen_name } = req.body;
    if (screen_name == undefined) {
      screen_name = "jack";
    }

    const user = new Twitter({
      consumer_key: "FTY5JrHbwRrKzcJ4vJveLHtXZ",
      consumer_secret: "ARrYPjueBIHCIGEW1GI2MkEs7O34P1kfxQ7hSKg0OZSuoqziK5",
    });
    const response = await user.getBearerToken();
    const app = new Twitter({
      bearer_token: response.access_token,
    });

    const tweets = await app.get("statuses/user_timeline", {
      screen_name,
      count: 15,
    });
    delete tweets["_headers"];

    res.set("Access-Control-Allow-Origin", "*");
    res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
});

router.post("/get-tweets-by-keyword", async (req, res, next) => {
  try {
    let { q, lang } = req.body.data;
    if (q == undefined) {
      q = "Angular";
    }

    const user = new Twitter({
      consumer_key: "FTY5JrHbwRrKzcJ4vJveLHtXZ",
      consumer_secret: "ARrYPjueBIHCIGEW1GI2MkEs7O34P1kfxQ7hSKg0OZSuoqziK5",
    });
    const response = await user.getBearerToken();
    const app = new Twitter({
      bearer_token: response.access_token,
    });

    const tweets = await app.get("search/tweets", {
      q,
      lang,
      count: 15,
    });
    delete tweets["_headers"];

    res.set("Access-Control-Allow-Origin", "*");
    res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
