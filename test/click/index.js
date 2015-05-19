define(function () {
	QUnit.module('click')

	QUnit.test('click button', function (assert) {
		c.click('button')
		assert.equal(c.getValue('input'), 'has click')
	})
})