var BrowserCookie = function () {

	this.getCookieTextExpiresOneYear = function(key, value) {
		return this.getCookieTextExpiresByYear(key, value, 1);
	};

	this.getCookieTextExpiresByYear = function(key, value, year) {
		var currentDate = new Date();
		var MM = currentDate.getMonth() + 1;
		var DD = currentDate.getDate();
		var YY = currentDate.getFullYear();

		if (MM < 10) MM = '0' + MM;
		if (DD < 10) DD = '0' + DD;
		YY = YY + year;

		var oneYearAfterToday = new Date(MM + '/' + DD + '/' + YY);

		return key + "=" + value + ";expires=" + oneYearAfterToday.toGMTString();
	};

	this.currentBrowserVisitedSite = function() {
		return this.currentBrowserHasCookieKeyValue('visited', 'aidssurvey.com');
	};

	this.currentBrowserHasCookieKeyValue = function(key, value) {
		var cookieSet = document.cookie;
		if (cookieSet && cookieSet.length > 0) {
			var firstIndex = cookieSet.indexOf(key);
			var lastIndex;

			if (firstIndex != -1) {
				firstIndex = firstIndex + 8;
				lastIndex = cookieSet.indexOf(';', firstIndex);

				if (lastIndex == -1) {
					lastIndex = cookieSet.length;
				}

				var actualVisitedCookie = unescape(cookieSet.substring(firstIndex, lastIndex));

				return actualVisitedCookie == value;
			}
		}

		return false;
	};
};