var BrowserAJAX = function() {
	var handler = function handler(callback) {
		if(this.readyState == this.DONE) {
			if (this.status == 200 &&
				this.responseXML != null &&
				this.responseXML.getElementById('test').textContent) {
				// success!
				//processData(this.responseXML.getElementById('test').textContent);
				callback.success(callback);

				return;
			}
			// something went wrong
			//processData(null);
			callback.failure(callback);
			return;
		}
	}

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

		request.onreadystatechange = handler(callback);

		return;
	};
};