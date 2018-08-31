module.exports = {

  friendlyName: 'Check password connect',


  description: 'Return a personalized greeting based on the provided name.',


  inputs: {

    password: {
      type: 'string',
      description: 'password user input',
      required: true
    },
    user: {
        type: 'string',
    }

  },


  fn: async function (inputs, exits) {
    var result = `Hello, ${inputs.name}!`;
    return exits.success(result);
  }

};