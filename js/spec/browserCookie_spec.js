describe('browserCookie', function() {
	
	var browserCookieComponent;

	beforeEach(function() {
		browserCookieComponent = new BrowserCookie();
	});

	it('should have a constructor', function() {
		expect(browserCookieComponent).toBeDefined();
	});

	it('should have a getCookieTextExpiresOneYear() method', function() {
		expect(browserCookieComponent.getCookieTextExpiresOneYear).toBeDefined();
	});

	describe('getCookieTextExpiresOneYear() method', function() {
		it('should return expected text to be written into the cookie.', function() {
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
			var value = 'aidssurvey.com';
			var oneYearAfterToday = new Date(MM + '/' + DD + '/' + YY);
			var expectedText = key + "=" + value + ";expires=" + oneYearAfterToday.toGMTString();

			var actualText = browserCookieComponent.getCookieTextExpiresOneYear(key, value);

			expect(actualText).toEqual(expectedText);
		});
	});

	it('should have a currentBrowserVisitedSite() method', function () {
		expect(browserCookieComponent.currentBrowserVisitedSite).toBeDefined();
	});

	describe('currentBrowserVisitedSite() method', function() {
		it('should return [true] if cookie exists', function() {
			if (!browserCookieComponent) 
				browserCookieComponent = new BrowserCookie();

			var key = 'visited';
			var value = 'aidssurvey.com';

			var cookieText = browserCookieComponent.getCookieTextExpiresOneYear(key, value);
			document.cookie = cookieText;

			expect(browserCookieComponent.currentBrowserVisitedSite()).toBeTruthy();
		});

		it('should return [false] if cookie does not exist', function() {
			if (!browserCookieComponent) 
				browserCookieComponent = new BrowserCookie();

			var currentDate = new Date();
			var MM = currentDate.getMonth() + 1;
			var DD = currentDate.getDate() - 1;
			var YY = currentDate.getFullYear();

			if (MM < 10) MM = '0' + MM;
			if (DD < 10) DD = '0' + DD;

			var oneDayBeforeToday = new Date(MM + '/' + DD + '/' + YY);

			document.cookie = 'visited=aidssurvey.com;expires=' + oneDayBeforeToday.toGMTString();

			expect(browserCookieComponent.currentBrowserVisitedSite()).toBeFalsy();
		});
	});
});