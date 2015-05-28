define(function (require) {
	var c = require('../global').command

	QUnit.module('waitForElementPresent')

	QUnit.test('success', function (assert) {
		var async = assert.async()
		c.init('../waitForElementPresent/index.html').then(function () {
			assert.ok(!c.hasOnly('#new'))

			setTimeout(function () {
				var document = c._iframe.contentDocument
				var div = document.createElement('div')
				div.setAttribute('id', 'new')
				document.body.appendChild(div)
			}, 1)

			c.waitForElementPresent('#new', 1000).then(function () {
				assert.ok(true)
				async()
			})
		})
	})


	QUnit.test('timeout', function (assert) {
		var async = assert.async()
		c.init('../waitForElementPresent/index.html').then(function () {
			c.waitForElementPresent('#new2', 500).then(null, function () {
				assert.ok(true)
				async()
			})
		})
	})
})