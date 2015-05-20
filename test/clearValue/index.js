define(function (require) {
	var c = require('../global').command
	
	QUnit.module('clearValue')

	QUnit.test('clear textarea', function (assert) {
		c.clearValue('textarea')
		assert.equal(c.getValue('textarea'), '')
	})

	QUnit.test('clear text input', function (assert) {
		c.clearValue('input[type=text]')
		assert.equal(c.getValue('input[type=text]'), '')
	})

	QUnit.test('clear password input', function (assert) {
		c.clearValue('input[type=password')
		assert.equal(c.getValue('input[type=password'), '')
	})
})
