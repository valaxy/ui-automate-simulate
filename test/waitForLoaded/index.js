define(function (require) {
	var c = require('../global').command

	QUnit.module('waitForLoaded')

	QUnit.test('success', function (assert) {
		var async = assert.async()
		c.waitForLoaded().then(function () {
			assert.ok(true)
			async()
		})
		c.init('../waitForLoaded/index.html')
	})

	QUnit.test('timeout', function (assert) {
		var async = assert.async()
		c.waitForLoaded(100).then(function () {
			throw new Error('the case can not success')
		}, function () {
			assert.ok(true)
			async()
		})
	})
})