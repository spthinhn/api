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
	  	await User.findOne({username: username})
		.exec(function(err, user) {
			if (err) return res.end('404', 'err');

			if (user) {
				console.log(user.salt);
				password = sails.config.globals.md5(password + user.salt);
				console.log(password);
				console.log(user.password);
				if (password == user.password) {
					return res.json({
		  				status: 200
		  			});	
				}
	  			return res.json({
	  				status: 400,
	  				message: "user exists"
	  			});
	  		}
		});
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

