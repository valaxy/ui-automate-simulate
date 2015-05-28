define(function (require) {
	var c = require('../global').command

	QUnit.module('getTitle')

	QUnit.test('simple case', function (assert) {
		var async = assert.async()
		c.init('../getTitle/index.html').then(function () {
			assert.equal(c.getTitle(), 'test title')
			async()
		})

	})
})