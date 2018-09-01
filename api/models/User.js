/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'users',
    attributes: {
        username: 	 { type: 'string', required: false },
        email: 		 { type: 'string', required: false },
        password: 	 { type: 'string', required: true },
        salt: 	 	 { type: 'string', required: true },
        mobilelogin: { type: 'string', required: false },
        gender: 	 { type: 'string', required: false }
    }
};

