define(function (require) {
	var async = require('async')
	var $ = require('jquery')
	var Promise = require('es6-promise').Promise

	var Command = function (options) {
		this._iframe = options.iframe

		var me = this
		this._iframe.addEventListener('load', function () {
			me._doc = me._iframe.contentDocument
			me._win = me._iframe.contentWindow
		})
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

	// todo, 不支持XPATH
	Command.prototype = {
		hasOnly: function (selector) {
			return this._doc.querySelectorAll(selector).length == 1
		},

		getOnly: function (selector) {
			var doms = this._doc.querySelectorAll(selector)
			assumeOne(doms)
			return doms[0]
		},

		/** Wait for iframe loaded
		 ** timeout: in ms, default is 5000
		 */
		waitForLoaded: function (timeout) {
			timeout = timeout || 5000
			var resolve
			var reject
			var promise = new Promise(function (_resolve, _reject) {
				resolve = _resolve
				reject = _reject
			})
			var iframe = this._iframe
			var onload = function () {
				iframe.removeEventListener('load', onload)
				clearTimeout(t)
				resolve()
			}
			iframe.addEventListener('load', onload)

			var t = setTimeout(function () {
				reject()
			}, timeout)
			return promise
		},

		//-----------------------------------------------------------
		// ↑Not NightWatch API↑
		// ↓Nightwatch API↓
		//-----------------------------------------------------------

		clearValue: function (selector) {
			this.getOnly(selector).value = ''
		},

		click: function (selector) {
			$(this.getOnly(selector)).click()
		},

		closeWindow: function () {
			throw new Error('closeWindow can not be implemented')
		},

		deleteCookie: function () {
			throw new Error('no plan to implement deleteCookie')
		},

		deleteCookies: function () {
			throw new Error('no plan to implement deleteCookies')
		},

		end: function () {
			throw new Error('no plan to implement end')
		},

		getAttribute: function (selector, attribute) {
			$(this.getOnly(selector)).attr(attribute)
		},


		getTagName: function () {

		},


		getTitle: function () {
			return this._doc.title
		},

		getValue: function (selector) {
			var texts = this._doc.querySelectorAll(selector)
			assumeOne(texts)
			return texts[0].value
		},


		// todo, url参数是可选的, 不应该有callback, 没有timeout
		/** Navigate to a url */
		init: function (url, timeout) {
			this._iframe.src = url
			return this.waitForLoaded(timeout)
		},

		pause: function (ms, callback) {
			setTimeout(callback, ms)
		},


		waitForElementPresent: function (selector, timeout) {
			var begin = +new Date
			var over = false // true: the query is over
			var me = this
			var resolve
			var reject
			var promise = new Promise(function (_resolve, _reject) {
				resolve = _resolve
				reject = _reject
			})
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
						resolve()
					} else {
						reject('Timeout and ' + selector + ' is not exist')
					}
				}
			)
			return promise
		}
	}

	return Command

})