const User = require('../models/User');

async function isAdmin(req, res) {
  const userId = req.headers.userid;

  try {
    const user = await User.findById(userId);
    if(user) {
        if(user.roles.includes('Admin')) {            
            return true;
        }
    }
  }
  catch{
    return false;
  }

  return false;
}

module.exports = isAdmin;