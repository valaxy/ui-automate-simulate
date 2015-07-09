define(function (require) {
	var c = require('../global').command

	QUnit.module('click')

	QUnit.test('click button', function (assert) {
		var async = assert.async()
		c._iframe.contentWindow.location.href = '../click/index.html'
		c._iframe.addEventListener('load', function () {
			c.click('input')
			assert.equal(c._iframe.contentWindow.counter, '26483715')
			async()
		})
	})
})