define(function (require) {
	var c = require('../global').command

	QUnit.module('setValue')

	QUnit.test('common', function (assert) {
		var async = assert.async()
		c.init('../setValue/index.html').then(function () {
			c.setValue('input', '123')
			assert.equal(c.getValue('input'), '123')
			async()
		})
	})
})