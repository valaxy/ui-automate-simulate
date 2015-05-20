define(function (require) {
	var c = require('../global').command
	var iframe = require('../global').iframe

	QUnit.module('waitForElementPresent')

	QUnit.test('success', function (assert) {
		var async = assert.async()
		assert.ok(!c.hasOnly('#new'))

		setTimeout(function () {
			var document = iframe.contentDocument
			var div = document.createElement('div')
			div.setAttribute('id', 'new')
			document.body.appendChild(div)
		}, 1)

		c.waitForElementPresent('#new', 1000, function () {
			assert.ok(true)
			async()
		})
	})


	QUnit.test('timeout', function (assert) {
		var async = assert.async()

		c.waitForElementPresent('#new2', 500)

		window.onerror = function () {
			assert.ok(true)
			window.onerror = null
			async()
			return true
		}
	})
})