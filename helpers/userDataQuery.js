async function userDataQuery (tweetUsers, app) {
  try {
    let users = await app.get("users/lookup", {
      user_id: tweetUsers,
    });
    delete users["_headers"];
    console.log(users)
//    return users;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userDataQuery
};