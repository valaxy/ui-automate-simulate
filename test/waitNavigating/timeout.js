(function () {

	require([
		'src/controler',
		'src/command'], function (Controler, Command) {

		var driver = new Command

		var userCase = [
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

		new Controler(driver).exec({
			endPage : '../manual/end.html',
			userCase: userCase
		})
	})

})()