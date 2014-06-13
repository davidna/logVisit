describe('browserCookie', function() {
	
	var browserCookieComponent;
	var argumentKeyUndefinedError = new Error('[argument:key is required]');

	beforeEach(function() {
		browserCookieComponent = new BrowserCookie();
		document.cookie = null;
	});

	it('should have a constructor', function() {
		expect(browserCookieComponent).toBeDefined();
	});

	it('should have a getCookieTextExpiresOneYear() method', function() {
		expect(browserCookieComponent.getCookieTextExpiresOneYear).toBeDefined();
	});

	describe('getCookieTextExpiresOneYear() method', function() {
		it('should return expected text to be written into the cookie, given valid arguments', function() {
			if (!browserCookieComponent) 
				browserCookieComponent = new BrowserCookie();

			var currentDate = new Date();
			var MM = currentDate.getMonth() + 1;
			var DD = currentDate.getDate();
			var YY = currentDate.getFullYear();

			if (MM < 10) MM = '0' + MM;
			if (DD < 10) DD = '0' + DD;
			YY = YY + 1;

			var key = 'visited';
			var value = 'target.com';
			var oneYearAfterToday = new Date(MM + '/' + DD + '/' + YY);
			var expectedText = key + "=" + value + ";expires=" + oneYearAfterToday.toGMTString() + ';';

			var actualText = browserCookieComponent.getCookieTextExpiresOneYear(key, value);

			expect(actualText).toEqual(expectedText);
		});

		it('should throw error, given no argument [key]', function() {
			var argumentRequiredKeyError = new Error('required: key');

			expect(function() {
				browserCookieComponent.getCookieTextExpiresOneYear();
			}).toThrow(argumentRequiredKeyError);
		});

		it('should throw error, given no argument [value]', function() {
			var argumentRequiredValueError = new Error('required: value');
			var keyDefined = 'key';

			expect(function() {
				browserCookieComponent.getCookieTextExpiresOneYear(keyDefined);
			}).toThrow(argumentRequiredValueError);
		});
	});

	it('should have a stripCookieExpiresItemFromCookieText() method', function() {
		expect(browserCookieComponent.stripCookieExpiresItemFromCookieText).toBeDefined();
	});

	describe('stripCookieExpiresItemFromCookieText() method', function() {
		it('should throw error, if no argument [cookieText]', function() {
			var missingCookieTextArgumentError = new Error('required: cookieText');

			expect(function() {
				browserCookieComponent.stripCookieExpiresItemFromCookieText();
			}).toThrow(missingCookieTextArgumentError);
		});

		it('should strip expires-item (key-value-pair) from given cookieText', function() {
			var cookieText = browserCookieComponent.getCookieTextExpiresOneYear('key', 'value');

			var expiresStrippedCookieText = browserCookieComponent.stripCookieExpiresItemFromCookieText(cookieText);

			expect(expiresStrippedCookieText.indexOf('expires')).toBe(-1);
		});
	});

	it('should have a appendCookieTextExpiresOneYear() method', function() {
		expect(browserCookieComponent.appendCookieTextExpiresOneYear).toBeDefined();
	});

	describe('appendCookieTextExpiresOneYear() method', function() {
		it('should throw error, given no argument [key]', function() {
			var argumentRequiredKeyError = new Error('required: key');

			expect(function() {
				browserCookieComponent.appendCookieTextExpiresOneYear();
			}).toThrow(argumentRequiredKeyError);
		});

		it('should throw error, given no argument [value]', function() {
			var argumentRequiredValueError = new Error('required: value');
			var keyDefined = 'key';

			expect(function() {
				browserCookieComponent.appendCookieTextExpiresOneYear(keyDefined);
			}).toThrow(argumentRequiredValueError);
		});

		it('should throw error, given no argument [originalCookieText]', function() {
			var argumentRequiredOriginalCookieError = new Error('required: originalCookieText');
			var keyDefined = 'key';
			var valueDefined = 'value';

			expect(function() {
				browserCookieComponent.appendCookieTextExpiresOneYear(keyDefined, valueDefined);
			}).toThrow(argumentRequiredOriginalCookieError);
		});

		it('should return cookie-text with all original-cookie key-value-pairs', function() {
			var oldKey = 'oldKey';
			var oldValue = 'oldValue';

			var oldCookieText = browserCookieComponent.getCookieTextExpiresOneYear(oldKey, oldValue);

			var newKey = 'newKey';
			var newValue = 'newValue';

			var newCookieText = browserCookieComponent.appendCookieTextExpiresOneYear(newKey, newValue, oldCookieText);

			expect(newCookieText.indexOf(oldKey)).not.toBe(-1);
			expect(newCookieText.indexOf(oldValue)).not.toBe(-1);
			expect(newCookieText.indexOf(newKey)).not.toBe(-1);
			expect(newCookieText.indexOf(newValue)).not.toBe(-1);
		});
	});

	it('should have a currentBrowserVisitedSite() method', function () {
		expect(browserCookieComponent.currentBrowserVisitedSite).toBeDefined();
	});

	describe('currentBrowserVisitedSite() method', function() {
		it('should return [true] if cookie exists', function() {
			var key = 'visited';
			var value = 'target.com';

			var cookieText = browserCookieComponent.getCookieTextExpiresOneYear(key, value);
			document.cookie = cookieText;

			expect(browserCookieComponent.currentBrowserVisitedSite(key, value)).toBeTruthy();
		});

		it('should return [false] if cookie does not exist', function() {
			var key = 'visited';
			var value = 'target.com';

			var currentDate = new Date();
			var MM = currentDate.getMonth() + 1;
			var DD = currentDate.getDate() - 1;
			var YY = currentDate.getFullYear();

			if (MM < 10) MM = '0' + MM;
			if (DD < 10) DD = '0' + DD;

			var oneDayBeforeToday = new Date(MM + '/' + DD + '/' + YY);

			document.cookie = key + '=' + value + ';expires=' + oneDayBeforeToday.toGMTString();

			expect(browserCookieComponent.currentBrowserVisitedSite(key, value)).toBeFalsy();
		});
	});

	it('should have a deleteCookieByKey() method', function() {
		expect(browserCookieComponent.deleteCookieByKey).toBeDefined();
	});

	describe('deleteCookieByKey() method', function() {
		it('should throw error if argument key is undefined', function() {
			expect(function() { browserCookieComponent.deleteCookieByKey() }).toThrow(argumentKeyUndefinedError);
		});

		// it('should delete cookie by key, if key value is valid', function() {
		// 	var key = 'visited';
		// 	var value = 'target.com';

		// 	var cookieText = browserCookieComponent.getCookieTextExpiresOneYear(key, value);
		// 	document.cookie = cookieText;

		// 	var deleteCookieByKeyResult = browserCookieComponent.deleteCookieByKey(key);

		// 	expect(deleteCookieByKeyResult).toBeTruthy();
		// 	expect(document.cookie.indexOf(key)).toBe(-1);
		// });

		it('should delete cookie only with the specified key, not any other', function() {
			var deleteKey = 'keyShouldBeDeleted';
			var deleteValue = 'valueShouldBeDeleted';
			var doNotDeleteKey = 'keyShouldBeKept';
			var doNotDeleteValue = 'valueShouldBeKept';

			var deleteCookieText = browserCookieComponent.getCookieTextExpiresOneYear(deleteKey, deleteValue);
			var shouldGoIntoDocumentCookie = browserCookieComponent.appendCookieTextExpiresOneYear(doNotDeleteKey, doNotDeleteValue, deleteCookieText);

			document.cookie = shouldGoIntoDocumentCookie;

			console.log('pre-delete cookie: ' + document.cookie);

			var deleteCookieByKeyResult = browserCookieComponent.deleteCookieByKey(deleteKey);

			console.log('post-delete cookie: ' + document.cookie);

			expect(deleteCookieByKeyResult).toBeTruthy();
			expect(document.cookie.indexOf(deleteKey)).toBe(-1);
			expect(document.cookie.indexOf(deleteValue)).toBe(-1);
			expect(document.cookie.indexOf(doNotDeleteKey)).not.toBe(-1);
			expect(document.cookie.indexOf(doNotDeleteValue)).not.toBe(-1);
		});
	});

	// it('try', function() {
	// 	console.log(typeof undefined);

	// 	console.log(typeof null);

	// 	console.log(typeof true);

	// 	console.log(typeof 1);

	// 	console.log(typeof 'a');

	// 	console.log(typeof object);

	// 	console.log(typeof function() { return; });
	// });
});