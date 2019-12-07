const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../util/encryption');

const signUp = (req, res) => {
  const { email, username, password } = req.body;  
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const usernameRegex = /[A-Za-z0-9]+/;

  if(!emailRegex.test(email) || !usernameRegex.test(username) || email.length < 5 || username.length < 5 || password.length < 5) {
    res.status(422)
      .json({ message: 'Invalid Data!' });
      return;
  }

  const salt = encryption.generateSalt();
  const hashedPassword = encryption.generateHashedPassword(salt, password);

  User.findOne({ email }).then(user => {    
    if (user) {
      res.status(409)
        .json({ message: 'E-Mail address already exists!' });
    } else {
      User.create({
        email,
        username,
        hashedPassword,
        salt
      }).then((user) => {
        res.status(201)
          .json({ message: 'User created!', userId: user._id });
      })
    }
  }) .catch(() => {
    res.status(500)
      .json({ message: "Invalid SignUp!" });
  });
}

const signIn = (req, res) => {   
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {        
        res.status(401).json(
        {
          message: 'A user with this email could not be found!',
        });
        return;
      }
      
      if(!user.authenticate(password)) {        
        res.status(401).json(
        {
          message: 'Invalid password!',
        });
        return;
      }

      const token = jwt.sign({
        email: user.email,
        userId: user._id.toString()
      }
        , 'somesupersecret'
        , { expiresIn: '1h' });
            
      req.auth = 'Authorization ' + token;
      res.status(200).json(
        {
          message: 'User successfully logged in!',
          token,
          username: user.username,
          myLaptops: user.myLaptops,          
          userId: user._id.toString()
        }
      );
    })  
    .catch (error => {
      res.status(500)
      .json({ message: "Invalid SignIn!" });
    });
}

module.exports = {
  signUp,
  signIn 
}