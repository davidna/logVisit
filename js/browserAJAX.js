var BrowserAJAX = function() {
	this.makeRequest = function(request, callback) {
		if (arguments.length < 2)
			throw new Error('[request, callback arguments required]');

		if (request != null && 
			request.toString() != '[object XMLHttpRequest]') {
			throw new Error('[invalid request]');
		}

		if (typeof callback != 'function') {
			throw new Error('[callback must be a function]');
		}

		throw new Error('[not implemented]');
	};
};