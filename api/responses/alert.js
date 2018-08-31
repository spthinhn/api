module.exports = function alert(statusCode, error, data) {
  	var res = this.res;
  	switch (statusCode) {
		case 200:
			return res.end(JSON.stringify({
				status: 200,
				result: data
			}));
			break;
		case 400:
			return res.end(JSON.stringify({
				status: 400,
				error: error
			}));
			break;
	}

};