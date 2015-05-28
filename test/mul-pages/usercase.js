define(function (require) {
	var Command = require('../../index')

	var command = new Command

	var usercase = {
		steps: [
			function () { // first
				alert(command.getTitle())
				command.init('second.html')
				command.assertNavigating()
			},
			function () { // second
				alert(command.getTitle())
				command.init('third.html')
				command.assertNavigating()
			},
			function () {
				alert(command.getTitle())
				alert('over')
			}
		]
	}


	return usercase
})