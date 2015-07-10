define(function (require) {
	var c = require('../global').command

	QUnit.module('setValue')

	QUnit.test('input string', function (assert) {
		var async = assert.async()
		c._iframe.src = '../setValue/index.html'
		c._iframe.onload = function () {
			c.setValue('input', '123')
			assert.equal(c.getValue('input'), '123')
			async()
		}
	})



})