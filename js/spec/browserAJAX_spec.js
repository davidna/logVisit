describe('browserAJAX', function() {
	var browserAJAXComponent;
	var requestAndCallBackRequiredError;
	var invalidRequestError;

	beforeEach(function() {
		browserAJAXComponent = new BrowserAJAX();
		requestAndCallBackRequiredError = new Error('[request, callback arguments required]');
		invalidRequestError = new Error('[invalid request]');
	});

	it('should have a constructor', function() {
		expect(browserAJAXComponent).toBeDefined();
	});

	describe('makeRequest(request, callback) method', function() {
		it('should throw error if it has no arguments', function() {
			expect(function() { browserAJAXComponent.makeRequest() }).toThrow(requestAndCallBackRequiredError );
		});

		it('should throw error if it has 1 argument', function() {
			expect(function() { browserAJAXComponent.makeRequest('one argument') }).toThrow(requestAndCallBackRequiredError);
		});

		it('should check if request argument has httpRequest type', function() {
			var invalidRequest = new XMLHttpRequest();

			expect(function() { browserAJAXComponent.makeRequest(invalidRequest, 'second argument') }).toThrow(invalidRequestError);
		});
	})
});