async function doEverything(inputs, exits) {
    const doFirstThing = function () {
        // do something
        console.log(inputs.name);
    };

    const doSecondThing = function () {
        // do something
        console.log(2);
    };

    const doThirdThing = function () {
        // do something
        console.log(3);
    };

    doFirstThing();
    doSecondThing();
    doThirdThing();
}
module.exports = {

    friendlyName: 'Example helper that does three things',

    description: '',

    inputs: {
    	name: {
	      type: 'string',
	      required: true
	    }

    },

    exits: {},

    fn: doEverything
};