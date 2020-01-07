const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req, res) {  
  const token = req.headers.token;  
  const userId = req.headers.userid;

  try {
    const user = await User.findById(userId);
  } catch(error) {
    res.status(401)
      .json({ message: 'Invalid userId!' });      
    return false;
  }

  if (!token) {    
    res.status(401)
      .json({ message: 'Not authenticated!' });
    return false;
  }
  
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecret');
  } catch(error) {    
    res.status(401)
      .json({ message: 'Token is invalid!' });
    return false;
  }
  
  if (!decodedToken) {
    res.status(401)
      .json({ message: 'Token is outdated!' });      
      return false;
  }

  return true;
}

module.exports = auth;