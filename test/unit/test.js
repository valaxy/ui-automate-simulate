define(function (require) {
	var async = require('async')
	var global = require('../global')
	var Command = window.uiRun.Command

	var modules = [
		//'waitForLoaded',

		//'clearValue',
		'click'
		//'getTitle',
		//'init',
		//'setValue'
		//'waitForElementPresent'
	]

	var iframe = document.querySelector('iframe')
	global.command = new Command({
		iframe: iframe
	})

	var i = 0
	async.whilst(
		function () {
			return i < modules.length
		},
		function (done) {
			var module = modules[i]

			require(['../' + module + '/index'], function () {
				i++
				done()
			})
		},
		function () {
		}
	)

	//iframe.onloadstart = function () {
	//	console.log(222)
	//}
	//
	//iframe.onload = function () {
	//	console.log(111)
	//}
	//
	//iframe.src = '../click/index.html'

	//setTimeout(function () {
	//	iframe.contentDocument.head.appendChild(iframe.contentDocument.createElement('script'))
	//	console.log(iframe.contentDocument)
	//}, 12)

	//window.iframe = iframe
})