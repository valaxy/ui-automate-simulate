define(function (require) {
	var c = require('../global').command

	QUnit.module('click')

	QUnit.test('click button', function (assert) {
		c.click('button')
		assert.equal(c.getValue('input'), 'has click')
	})
})