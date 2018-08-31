var BreakException = {};
module.exports = {

  friendlyName: 'Check exists user',


  description: 'Return users',


  inputs: {

    username: {
      type: 'string',
      description: 'username input',
      required: true
    },
    email: {
      type: 'string',
      description: 'email input',
      required: true
    },

  },

  exits: {
      success: {
          outputFriendlyName: 'Current date',
          outputType: 'string'
      },
      noUsersFound: {
        description: 'Could not find any users who logged in during the specified time frame.'
      }
  },


  fn: async function (inputs, exits) {
    var users = await User.find({
      or: [
        {username: inputs.username},
        {email: inputs.email}
      ]
    });

    await users.forEach(function(user, index){
      if (inputs.username == user.username) {
        return exits.success(index);
        // return exits.error();
        // return exits.success("abc");
      }
      if (inputs.email == user.email) {
        return exits.success(index);
      }
    })
    // return exits.success();
  }

};


function error(type) {
  switch (type) {
    case "username":
      return "username exist";
      break;
    case "email":
      return "email exist";
      break;
  }
}