(function () {
	var $ = uiRun.jQuery

	// @问题记录日志
	// 曾经试过用requirejs来打包, 结果有冲突
	//

	// as a global var to use
	var Command = window.uiRun.Command = function (options) {
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

	}


	var isCanSeeChar = function (code) {

	}

	/* There are 3 commands
	 * - sync command
	 * - async command
	 */


	/** Events:
	 **     assertFail:
	 **     error(msg):
	 */
	Command.prototype = {

		KEYS: $.simulate.keyCode,

		create: function () {
			var obj = Object.create()
			obj.fail = false
			return obj
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


		//-----------------------------------------------------------
		// UP:   Not Nightwatch API
		// DOWN: Nightwatch API
		//-----------------------------------------------------------

		clearValue: function (selector) {
			this.getOnly(selector).value = ''
		},


		/** Simulate click */
		click: function (selector) {
			var element = this.getOnly(selector)
			var $element = $(element)

			// trigger mousedown
			$element.simulate('mousedown')

			// trigger focus
			$element.focus()

			// trigger mouseup
			$element.simulate('mouseup')

			// trigger click
			$element.click()
		},


		/** Simulate Keyboard
		 ** value: the key code
		 */
		sendKey: function (selector, value) {
			var $input = $(this.getOnly(selector))

			$input.simulate('keydown', {
				key    : value,
				code   : value,
				keyCode: value // integer
			})

			$input.simulate('keypress', {
				key    : value,
				code   : value,
				keyCode: value
			})

			$input.simulate('keyup', {
				key    : value,
				code   : value,
				keyCode: value
			})
		},

		/** Simuate Keyboard */
		inputText: function (selector, text) {
			var input = this.getOnly(selector)
			input.value += text
		},


		getAttribute: function (selector, attribute) {
			$(this.getOnly(selector)).attr(attribute)
		},


		getTagName: function (selector) {
			return this.getOnly(selector).tagName
		},


		getTitle: function () {
			return this._doc.title
		},

		getValue: function (selector) {
			var control = this.getOnly(selector)
			return control.value
		},


		///** Wait for iframe loaded
		// ** timeout: in ms, default is 5000
		// */
		//waitForLoaded: function (timeout) {
		//	timeout = timeout || 5000
		//	var resolve
		//	var reject
		//	var promise = new Promise(function (_resolve, _reject) {
		//		resolve = _resolve
		//		reject = _reject
		//	})
		//	var iframe = this._iframe
		//	var onload = function () {
		//		iframe.removeEventListener('load', onload)
		//		clearTimeout(t)
		//		resolve()
		//	}
		//	iframe.addEventListener('load', onload)
		//
		//	var t = setTimeout(function () {
		//		reject()
		//	}, timeout)
		//	return promise
		//},

		injectScript: function (scriptUrl) {
			var script = this._doc.createElement('script')
			script.src = scriptUrl
			this._doc.body.appendChild(script)
		}

	}

	return Command

})();


//assertNavigating: function () {
//	this.navigating = true
//},


//pause: function (ms, callback) {
//	setTimeout(callback, ms)
//}

//waitForElementPresent: function (selector, timeout) {
//	var begin = +new Date
//	var over = false // true: the query is over
//	var me = this
//	var resolve
//	var reject
//	var promise = new Promise(function (_resolve, _reject) {
//		resolve = _resolve
//		reject = _reject
//	})
//	async.whilst(
//		function () {
//			return !(over || (+new Date - begin >= timeout))
//		},
//		function (done) {
//			if (me.hasOnly(selector)) {
//				over = true
//				done()
//			} else {
//				setTimeout(done, 200) // every 200ms time to check
//			}
//		},
//		function () {
//			if (over) {
//				resolve()
//			} else {
//				reject('Timeout and ' + selector + ' is not exist')
//			}
//		}
//	)
//	return promise
//}

///** If current page is about to navigate to another page, make sure to call it
// ** timeout: default is 5000, fail when reach the timeout
// */
//waitNavigating: function (timeout) {
//	timeout = timeout === undefined ? 5000 : timeout
//
//	var me = this
//	var resolve
//
//	setTimeout(function () {
//		me.emitter.emit('error', timeout + 'ms timeout of navigating')
//		resolve()
//	}, timeout)
//
//	return new Promise(function (success) {
//		resolve = success
//	})
//}


//var resolve
//var reject
//var promise = new Promise(function (success, fail) {
//	resolve = success
//	reject = fail
//})