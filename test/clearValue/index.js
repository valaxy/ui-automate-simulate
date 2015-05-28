define(function (require) {
	var c = require('../global').command

	QUnit.module('clearValue')

	QUnit.test('clear textarea', function (assert) {
		var async = assert.async()
		c.init('../clearValue/index.html').then(function () {
			c.clearValue('textarea')
			assert.equal(c.getValue('textarea'), '')
			async()
		})
	})

	QUnit.test('clear text input', function (assert) {
		var async = assert.async()
		c.init('../clearValue/index.html').then(function () {
			c.clearValue('input[type=text]')
			assert.equal(c.getValue('input[type=text]'), '')
			async()
		})
	})

	QUnit.test('clear password input', function (assert) {
		var async = assert.async()
		c.init('../clearValue/index.html').then(function () {
			c.clearValue('input[type=password')
			assert.equal(c.getValue('input[type=password'), '')
			async()
		})
	})
})
