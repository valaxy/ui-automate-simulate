define(function () {

	return function (driver) {

		return [
			function () {
				return driver.waitNavigating(1000) // should be timeout
			}
		]

	}

})