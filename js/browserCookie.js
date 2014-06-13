var BrowserCookie = function () {

	this.getCookieTextExpiresOneYear = function(key, value) {
		return this.getCookieTextExpiresByYear(key, value, 1);
	};

	this.getCookieTextExpiresByYear = function(key, value, year) {

		if (!key) throw new Error('required: key');

		if (!value) throw new Error('required: value');

		var currentDate = new Date();
		var MM = currentDate.getMonth() + 1;
		var DD = currentDate.getDate();
		var YY = currentDate.getFullYear();

		if (MM < 10) MM = '0' + MM;
		if (DD < 10) DD = '0' + DD;
		YY = YY + year;

		var oneYearAfterToday = new Date(MM + '/' + DD + '/' + YY);

		return key + "=" + value + ";expires=" + oneYearAfterToday.toGMTString() + ';';
	};

	this.stripCookieExpiresItemFromCookieText = function(cookieText) {
		if (!cookieText) throw new Error('required: cookieText');

		var indexExpiresKey = cookieText.indexOf('expires');

		if (indexExpiresKey > -1) {
			var cookieTextAfterExpiresIndex = cookieText.substring(indexExpiresKey, cookieText.length);
			var indexNextSemiColon = cookieTextAfterExpiresIndex.indexOf(';');

			if (indexNextSemiColon == cookieTextAfterExpiresIndex.length - 1) {
				cookieText = cookieText.replace(cookieTextAfterExpiresIndex, '');
			}
		}

		return cookieText;
	}

	this.appendCookieTextExpiresOneYear = function(key, value, originalCookieText) {
		if (!key) throw new Error('required: key');

		if (!value) throw new Error('required: value');

		if (!originalCookieText) throw new Error('required: originalCookieText');

		originalCookieText = this.stripCookieExpiresItemFromCookieText(originalCookieText);

		var result = originalCookieText.substring(0, originalCookieText.length - 1) + ',' + this.getCookieTextExpiresByYear(key, value, 1);

		return result;
	}

	this.currentBrowserVisitedSite = function(key, value) {
		return this.currentBrowserHasCookieKeyValue(key, value);
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

	this.deleteCookieByKey = function(key) {

		if (arguments.length < 1) {
			throw new Error('[argument:key is required]');
		}

		var currentDate = new Date();
		var MM = currentDate.getMonth() + 1;
		var DD = currentDate.getDate() - 1;
		var YY = currentDate.getFullYear();

		if (MM < 10) MM = '0' + MM;
		if (DD < 10) DD = '0' + DD;

		var oneDayBeforeToday = new Date(MM + '/' + DD + '/' + YY);

		var originalCookie = document.cookie;

		var cookiesArray = originalCookie.split(',');

		//console.log(cookiesArray);

		var resultCookieText;
		for(var i = 0; i < cookiesArray.length; i++) {
			if (cookiesArray[i].indexOf(key + '=') == -1) {
				resultCookieText += cookiesArray[i];
			}

			if (i < cookiesArray.length) {
				resultCookieText += ',';
			}
		}

		//document.cookie = key + '=value_does_not_matter' + ';expires=' + oneDayBeforeToday.toGMTString();
		document.cookie = resultCookieText;

		return true;	
	};
};