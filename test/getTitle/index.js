define(function () {
	QUnit.module('getTitle')

	QUnit.test('simple case', function (assert) {
		assert.equal(c.getTitle(), 'test title')
	})
})