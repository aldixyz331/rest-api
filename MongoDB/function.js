require('../settings');
const {
   User
} = require('./schema');

async function addUser(username, email, password, apikey) {
   let obj = {
      username,
      email,
      password,
      apikey,
      defaultKey: apikey,
      limit: limitCount
   };
   User.create(obj);
}
module.exports.addUser = addUser

async function limitAdd(apikey) {
   try {
      let key = await User.findOne({
         apikey: apikey
      });
      let min = key.limit - 1;
      await User.updateOne({
         apikey: apikey
      }, {
         limit: min
      });
   } catch (err) {
      console.error('Error in limitAdd:', err);
      throw err;
   }
}

module.exports.limitAdd = limitAdd

async function checkEmail(email){
   let x = await User.findOne({
      email: email
   });
   if (x !== null) {
      return x.email;
   } else {
      return false;
   }
}

module.exports.checkEmail = checkEmail;

async function checkUsername(username) {
   let users = await User.findOne({
      username: username
   });
   if (users !== null) {
      return users.username;
   } else {
      return false;
   }
}
module.exports.checkUsername = checkUsername;

async function cekKey(apikey) {
   let db = await User.findOne({
      apikey: apikey
   });
   if (db === null) {
      return false;
   } else {
      return db.apikey;
   }
}
module.exports.cekKey = cekKey;

async function resetAllLimit() {
        try {
            let users = await User.find({});
            const updatePromises = users.map(async (data) => {
                let { username } = data;
                if (username !== null) {
                    return await User.updateOne({username: username}, {limit: limitCount});
                }
            });
            await Promise.all(updatePromises);
        } catch (err) {
            console.error('Error in resetAllLimit:', err);
            throw err;
        }
    }
module.exports.resetAllLimit = resetAllLimit;

async function isLimit(apikey) {
        let key = await User.findOne({apikey: apikey});
        if (key.limit <= 0){
            return true;
        } else {
            return false;
        }
    }
module.exports.isLimit = isLimit;

async function checkLimit(apikey) {
        let key = await User.findOne({apikey: apikey});
        return key.limit;
    }
module.exports.checkLimit = checkLimit;

async function getApikey(id) {
        let users = await User.findOne({_id: id});
        return {apikey: users.apikey, username: users.username, limit:users.limit};
    }
module.exports.getApikey = getApikey;