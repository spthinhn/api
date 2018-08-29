/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

	tableName: 'ossn_usertokens',
    attributes: {
        token: { type: 'string', required: true },
        expired: { type: 'number', required: false },
        user_id: { type: 'number', required: true },
	    session_id: { type: 'string', required: false }
    }
};

