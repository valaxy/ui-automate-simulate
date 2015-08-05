define(function (require) {
	var c = require('../global').command

	QUnit.module('queryOnlyElement')

	QUnit.test('example', function (assert) {
		var async = assert.async()
		c._iframe.contentWindow.location.href = '../queryOnlyElement/index.html'
		c._iframe.onload = function () {
			var dom = c.queryOnlyElement('.everything')
			assert.equal(dom.tagName, 'DIV')

			var p = c.queryOnlyElement('.everything p', 2)
			assert.equal(p.innerText, '2')

			assert.throws(function () {
				c.queryOnlyElement('.everything p', 3)
			})
			async()
		}
	})
})