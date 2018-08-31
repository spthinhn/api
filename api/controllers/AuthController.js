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

	var users = await User.find({
      or: [
        {username: username},
        {email: email}
      ]
    });
	users.forEach( function(user, index){
      if (username == user.username) {
      	return res.alert(400, "username exist", null);
      }
      if (email == user.email) {
        return res.alert(400, "email exist", null);
      }
    });
 //  	await User.find({
	//   or : [
	//     { username: username},
	//     { email: email }
	//   ]
	// }).exec(function(err, users) {
 //  		console.log(users);
 //  	});

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

