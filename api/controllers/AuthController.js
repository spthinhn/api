/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	token: async function(req, res) {
	  	var username = req.param('username');
	  	var password = req.param('password');

	  	var user = await User.findOne({username: username});
	  	if (user) {
	  		// var greeting = await sails.helpers.validate.with({ name: user.username });
	  		// console.log(greeting);

			password = sails.config.globals.md5(password + user.salt);
			if (password == user.password) {
				var token =	sails.config.globals.md5(username);
				var expired = Date.now();

				var result = await Token.create({token: token, expired: expired, user_id: user.guid}).fetch();
				return res.json({
					status: 200,
					token: result.token,
					user: user
				});
			}
  		}
  		return res.json({
			status: 400,
			message: "user not exists"
		});
	  },
  signUp: async function(req, res) {
  	var username = req.param('username');
  	var password = req.param('password');
  	var birthdate = req.param('birthdate');
  	var gender = req.param('gender');
  	var mobilelogin = req.param('mobilelogin');
  	var email = req.param('email');
  	console.log(mobilelogin);

  	if (email) {
  		var users = await User.find({
	      or: [
	        {email: email}
	      ]
	    });
  	}
  	if (mobilelogin) {
		var users = await User.find({
	      or: [
	        {mobilelogin: mobilelogin}
	      ]
	    });
  	}
	await users.forEach( function(user, index){
      if (email) {
	      if (email == user.email) {
	        return res.alert(400, 2);
	      }
      }
      if (mobilelogin) {
	      if (mobilelogin == user.mobilelogin) {
	        return res.alert(400, 3);
	      }
      }
    });
    var salt = sails.config.globals.crypto.randomBytes(10).toString('hex');
    password = sails.config.globals.md5(password + salt);

	await User.create({email: email, password: password, salt: salt}).exec(function(err, user) {
		if (err) return res.alert(403);
	});

 //  	await User.findOrCreate({username: username}, {username: username, password: password})
	// .exec(function(err, user, wasCreated) {
	// 	if (err) return res.end('404', 'err');

	// 	if (wasCreated) {
	// 		return res.json({
	// 			status: 200,
	// 			message: user
	// 		});
	// 	}

	// 	if (user) {
 //  			return res.json({
 //  				status: 400,
 //  				message: "user exists"
 //  			});
 //  		}
	// });
  }

};

