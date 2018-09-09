//Used https://medium.com/@Keithweaver_/building-a-log-in-system-for-a-mern-stack-39411e9513bd

const User = require('../../models/User');
const UserSession = require('../../models/UserSession');


module.exports = (app) => {
  /*
   * Registration
   */
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;

    if (!email) {
      return res.send({
        success: false,
        message: 'Please provide an email address'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Please enter a password'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Account already exists.'
        });
      }

      // Save the new user
      const newUser = new User();

      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Server error'
          });
        }
        return res.send({
          success: true,
          message: 'You are already on the system, please sign in'
        });
      });
    });

  });

  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;


    if (!email) {
      return res.send({
        success: false,
        message: 'Please provide an email address'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Please provide a password'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Invalid'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Invalid'
        });
      }

      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Server error'
          });
        }

        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        });
      });
    });
  });

  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

   

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Server error'
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Invalid'
        });
      } else {
        return res.send({
          success: true,
          message: 'Good'
        });
      }
    });
  });

  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Server error'
        });
      }

      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });
};