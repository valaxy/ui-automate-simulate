define(function (require) {
	var c = require('../global').command

	QUnit.module('init')

	QUnit.test('has url', function (assert) {
		var async = assert.async()
		c.init('../init/index.html').then(function () {
			assert.equal(c.getTitle(), 'test init')
			async()
		})
	})
})