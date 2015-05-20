define(function (require) {
	var Command = require('../../index')
	var async = require('async')
	var global = require('../global')

	var modules = [
		'clearValue',
		'click',
		'getTitle',
		'waitForElementPresent'
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
				global.command = new Command({
					document: iframe.contentDocument
				})
				global.iframe = iframe
				require(['../' + module + '/index'], function () {
					i++
					iframe.onload = null
					done()
				})
			}

			iframe.src = '../' + module + '/index.html'
		},
		function () {
		}
	)

})