define(function (require) {
	var c = require('../global').command

	QUnit.module('click')

	QUnit.test('click button', function (assert) {
		var async = assert.async()
		c.init('../click/index.html').then(function () {
			c.click('button')
			assert.equal(c.getValue('input'), 'has click')
			async()
		})
	})
})