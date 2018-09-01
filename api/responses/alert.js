module.exports = function alert(statusCode, error = null, data = null) {
  	var res = this.res;
  	switch (statusCode) {
		case 200:
			return res.end(JSON.stringify({
				status: statusCode,
				result: data
			}));
			break;
		case 400:
			var message = errorCode(error);
			return res.end(JSON.stringify({
				status: statusCode,
				error: error,
				message: message
			}));
			break;
		case 403:
			var message = errorCode(statusCode);
			return res.end(JSON.stringify({
				status: statusCode,
				error: statusCode,
				message: message
			}));
			break;
	}

};

function errorCode(error) 
{
	switch (error) {
		case 1:
			return "username exist";
			break;
		case 2:
			return "email exist";
			break;
		case 3:
			return "mobile exist";
			break;
		case 403:
			return "The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort.";
			break;
		default:
			return "not found";
			break;
	}
}