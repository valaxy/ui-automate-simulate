define(function (require) {
	var Command = require('../../index')
	var async = require('async')

	var modules = [
		'../clearValue/index',
		'../click/index',
		'../getTitle/index'
	]

	var iframe = document.querySelector('iframe')

	var i = 0
	async.whilst(
		function () {
			return i < modules.length
		},
		function (done) {
			var module = modules[i]
			iframe.onload = function () {
				window.c = new Command({
					document: iframe.contentDocument
				})
				require([module], function () {
					i++
					iframe.onload = null
					done()
				})
			}

			iframe.src = module + '.html'
		},
		function () {
		}
	)

})