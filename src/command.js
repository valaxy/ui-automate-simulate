define(function (require) {
	var async = require('async')
	var $ = require('jquery')
	var Promise = require('es6-promise').Promise
	var EventEmitter = require('eventemitter2')


	// as a global var to use
	var Command = window.Command = function (options) {
		options = options || {}
		if (options.iframe) {
			this._iframe = options.iframe

			var me = this
			this._iframe.addEventListener('load', function () {
				me._doc = me._iframe.contentDocument
				me._win = me._iframe.contentWindow
			})
		} else {
			this._win = window
			this._doc = document
		}

		this.emitter = new EventEmitter
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


	/* There are 3 commands
	 * - sync command
	 * - async command
	 */

	// todo, no XPATH
	/** Events:
	 **     assertFail:
	 **     error(msg):
	 */
	Command.prototype = {

		create: function () {
			var obj = Object.create()
			obj.navigating = false
			obj.fail = false
			return obj
		},

		assertNavigating: function () {
			this.navigating = true
		},

		hasOnly: function (selector) {
			return this._doc.querySelectorAll(selector).length == 1
		},

		getOnly: function (selector) {
			var doms = this._doc.querySelectorAll(selector)
			if (doms.length != 1) {
				throw new Error('query selector "' + selector + '" find count of ' + doms.length)
			}
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
		// UP:   Not Nightwatch API
		// DOWN: Nightwatch API
		//-----------------------------------------------------------

		clearValue: function (selector) {
			this.getOnly(selector).value = ''
		},

		click: function (selector) {
			this.getOnly(selector).click()
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


		setValue: function (selector, value) {
			var input = this.getOnly(selector)
			input.value = value
		},


		// todo, url�����ǿ�ѡ��, ��Ӧ����callback, û��timeout
		/** Navigate to a url */
		init: function (url, timeout) {
			if (this._iframe) {
				this._iframe.src = url
				return this.waitForLoaded(timeout)
			} else {
				this._win.location.href = url
			}
		},

		// todo, id����, no callback
		injectScript: function (scriptUrl) {
			var script = this._doc.createElement('script')
			script.src = scriptUrl
			this._doc.body.appendChild(script)
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
		},


		/** If current page is ab∂out to navigate to another page, make sure to call it
		 ** timeout: default is 5000, fail when reach the timeout
		 */
		waitNavigating: function (timeout) {
			timeout = timeout === undefined ? 5000 : timeout

			var me = this
			var resolve

			setTimeout(function () {
				me.emitter.emit('error', timeout + 'ms timeout of navigating')
				resolve()
			}, timeout)

			return new Promise(function (success) {
				resolve = success
			})
		}
	}

	return Command

})

//var resolve
//var reject
//var promise = new Promise(function (success, fail) {
//	resolve = success
//	reject = fail
//})