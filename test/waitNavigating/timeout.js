define(function () {

	return function (driver) {
		return [
			function () {
				setTimeout(function () {
					window.location.href = 'timeout2.html'
				}, 2000)
				return driver.waitNavigating(3000)
			},
			function () {
				return driver.waitNavigating(2000) // should be timeout
			}
		]

	}

})