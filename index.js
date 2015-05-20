define(function (require) {
	var async = require('async')
	var $ = require('jquery')

	var Command = function (options) {
		options = options || {}
		this._doc = options.document || document
	}


	var assumeOne = function (ary) {
		if (ary.length != 1) {
			throw new Error('must be length 1')
		}
	}

	var assumeZero = function (ary) {
		if (ary.length == 0) {
			throw new Error('must not be length 0')
		}
	}

	Command.prototype = {
		getOnly: function (selector) {
			var doms = this._doc.querySelectorAll(selector)
			assumeOne(doms)
			return doms[0]
		},

		hasOnly: function (selector) {
			return this._doc.querySelectorAll(selector).length == 1
		},

		//-----------------------------------------------------------
		// ¡üAdd API¡ü
		// ¡ýNightwatch API¡ý
		//-----------------------------------------------------------

		clearValue: function (selector) {
			this.getOnly(selector).value = ''
		},

		click: function (selector) {
			$(this.getOnly(selector)).click()
		},

		closeWindow: function () {
			throw new Error('closeWindow can not implement')
		},

		getTitle: function () {
			return this._doc.title
		},

		getValue: function (selector) {
			var texts = this._doc.querySelectorAll(selector)
			assumeOne(texts)
			return texts[0].value
		},

		pause: function (ms, callback) {
			setTimeout(callback, ms)
		},

		waitForElementPresent: function (selector, timeout, callback) {
			var begin = +new Date
			var over = false // true: the query is over
			var me = this
			async.whilst(
				function () {
					return !(over || (+new Date - begin >= timeout))
				},
				function (done) {
					if (me.hasOnly(selector)) {
						over = true
						done()
					} else {
						setTimeout(done, 200) // every 200ms time to check
					}
				},
				function () {
					if (over) {
						callback()
					} else {
						throw new Error('Timeout and ' + selector + ' is not exist')
					}
				}
			)
		}
	}

	return Command

})