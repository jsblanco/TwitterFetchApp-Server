const express = require('express');
const router = express.Router();
const Twitter = require("twitter-lite");

router.post('/get-user-tweets', async (req, res, next) => {
    const { screen_name, count }=req.body;
    
    try {
    
    const user = new Twitter({
      consumer_key: "FTY5JrHbwRrKzcJ4vJveLHtXZ",
      consumer_secret: "ARrYPjueBIHCIGEW1GI2MkEs7O34P1kfxQ7hSKg0OZSuoqziK5"
    });
    const response = await user.getBearerToken();
    const app = new Twitter({
      bearer_token: response.access_token
    });
        
    let tweets= await app.get('statuses/user_timeline', {
        screen_name,
        count
      })
        delete tweets["_headers"];
        res.status(200).json(tweets);    
    }
    
    catch (error) {
      next(error);
    }

});

module.exports = router;

