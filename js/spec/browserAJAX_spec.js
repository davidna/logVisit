describe('browserAJAX', function() {
	var browserAJAXComponent;
	var requestAndCallBackRequiredError;
	var invalidRequestError;
	var callbackMustBeFunctionError;

	beforeEach(function() {
		browserAJAXComponent = new BrowserAJAX();
		requestAndCallBackRequiredError = new Error('[request, callback arguments required]');
		invalidRequestError = new Error('[invalid request]');
		callbackMustBeFunctionError = new Error('[callback must be a function]');
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

		it('should throw if request argument is not of type XMLHttpRequest', function() {
			var invalidRequest = 'not an XMLHttpRequest';

			expect(function() { browserAJAXComponent.makeRequest(invalidRequest, 'second argument') }).toThrow(invalidRequestError);
		});

		it('should throw if callback is not a function', function() {
			var stubRequest = new XMLHttpRequest();
			var notFunctionRequest = 'not null';

			expect(function() { browserAJAXComponent.makeRequest(stubRequest, notFunctionRequest) }).toThrow(callbackMustBeFunctionError)
		});

		it('should make the request', function() {
			var validRequest = new XMLHttpRequest();
			var callback = function() {

			};

			
		});
	})
});