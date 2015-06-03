define(function () {

	return function (driver) {

		return [
			function () {
				driver.waitNavigating(1000) // should be timeout
			}
		]

	}

})