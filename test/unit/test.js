define(function (require) {
	var Command = require('../../index')

	var modules = [
		'../clearValue/index'
	]
	modules.forEach(function (module) {
		var iframe = document.querySelector('iframe')
		iframe.onload = function () {
			window.c = new Command({
				document: iframe.contentDocument
			})
			require([module])
		}

		iframe.src = module + '.html'
	})

})