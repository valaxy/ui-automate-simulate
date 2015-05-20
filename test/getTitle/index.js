define(function (require) {
	var c = require('../global').command

	QUnit.module('getTitle')

	QUnit.test('simple case', function (assert) {
		assert.equal(c.getTitle(), 'test title')
	})
})