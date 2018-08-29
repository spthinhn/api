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
	  		var greeting = await sails.helpers.validate.with({ name: user.username });
	  		console.log(greeting);

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
		// .exec(function(err, user) {
		// 	if (err) return res.end('404', 'err');

		// 	if (user) {
		// 		password = sails.config.globals.md5(password + user.salt);
		// 		if (password == user.password) {
		// 			var token =	sails.config.globals.md5(username);
		// 			console.log(token);
		// 			var expired = Date.now();
		// 			console.log(expired);

		// 			// await Token.create({token: token, expired: expired, user_id: user.guid})
		// 			// .exec(function(err, token) {
		// 			// 	console.log(err);
		// 			// 	console.log(token);
		// 			// 	return res.json({
		// 	  // 				status: 200,
		// 	  // 				token: token,
		// 	  // 				user: user
		// 	  // 			});	
		// 			// });
		// 			// console.log(1);
		// 		}
	 //  			return res.json({
	 //  				status: 400,
	 //  				message: "user exists"
	 //  			});
	 //  		}
		// });
	  },
  signUp: async function(req, res) {
  	var username = req.param('username');
  	var password = req.param('password');

  	await User.findOrCreate({username: username}, {username: username, password: password})
	.exec(function(err, user, wasCreated) {
		if (err) return res.end('404', 'err');

		if (wasCreated) {
			return res.json({
				status: 200,
				message: user
			});
		}

		if (user) {
  			return res.json({
  				status: 400,
  				message: "user exists"
  			});
  		}
	});
  }

};

