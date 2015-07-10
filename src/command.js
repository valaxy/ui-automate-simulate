(function () {
	var $ = uiRun.jQuery

	// @问题记录日志
	// 曾经试过用requirejs来打包, 结果与seajs有冲突
	// 通过隐藏全局变量域的方式也解决不了, 所以之后不再使用requirejs打包, 采用build的时候将相关文件合并


	// @设计决策
	// 使用throw Error的方式传递异常情况, 而不是返回码
	// 因为比较好编码, 代码可读性也更高


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

	var STATUS = {
		SUCCESS           : 0,
		ELEMENT_NOT_FIND  : 1,
		ELEMENT_EXCEED_ONE: 2
	}


	var KEYS = {
		"NULL"       : "\uE000",
		"CANCEL"     : "\uE001",
		"HELP"       : "\uE002",
		"BACK_SPACE" : "\uE003",
		"TAB"        : "\uE004",
		"CLEAR"      : "\uE005",
		"RETURN"     : "\uE006",
		"ENTER"      : "\uE007",
		"SHIFT"      : "\uE008",
		"CONTROL"    : "\uE009",
		"ALT"        : "\uE00A",
		"PAUSE"      : "\uE00B",
		"ESCAPE"     : "\uE00C",
		"SPACE"      : "\uE00D",
		"PAGEUP"     : "\uE00E",
		"PAGEDOWN"   : "\uE00F",
		"END"        : "\uE010",
		"HOME"       : "\uE011",
		"LEFT_ARROW" : "\uE012",
		"UP_ARROW"   : "\uE013",
		"RIGHT_ARROW": "\uE014",
		"DOWN_ARROW" : "\uE015",
		"INSERT"     : "\uE016",
		"DELETE"     : "\uE017",
		"SEMICOLON"  : "\uE018",
		"EQUALS"     : "\uE019",
		"NUMPAD0"    : "\uE01A",
		"NUMPAD1"    : "\uE01B",
		"NUMPAD2"    : "\uE01C",
		"NUMPAD3"    : "\uE01D",
		"NUMPAD4"    : "\uE01E",
		"NUMPAD5"    : "\uE01F",
		"NUMPAD6"    : "\uE020",
		"NUMPAD7"    : "\uE021",
		"NUMPAD8"    : "\uE022",
		"NUMPAD9"    : "\uE023",
		"MULTIPLY"   : "\uE024",
		"ADD"        : "\uE025",
		"SEPARATOR"  : "\uE026",
		"SUBTRACT"   : "\uE027",
		"DECIMAL"    : "\uE028",
		"DIVIDE"     : "\uE029",
		"F1"         : "\uE031",
		"F2"         : "\uE032",
		"F3"         : "\uE033",
		"F4"         : "\uE034",
		"F5"         : "\uE035",
		"F6"         : "\uE036",
		"F7"         : "\uE037",
		"F8"         : "\uE038",
		"F9"         : "\uE039",
		"F10"        : "\uE03A",
		"F11"        : "\uE03B",
		"F12"        : "\uE03C",
		"COMMAND"    : "\uE03D",
		"META"       : "\uE03D"
	}

	var isJWPModifierKey = function (ch) {
		if ((KEYS.CONTROL + KEYS.SHIFT + KEYS.ALT + KEYS.COMMAND).indexOf(ch) >= 0) {
			return true
		}
		return false
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

		_throw: function (code, data) {
			switch (code) {
				case STATUS.ELEMENT_EXCEED_ONE:
					throw new Error('element selector:' + data.selector + ' have ' + data.count + ' count, is too much')
				case STATUS.ELEMENT_NOT_FIND:
					throw new Error('element selector:' + data + ' not found')
			}
		},

		create: function () {
			var obj = Object.create()
			obj.fail = false
			return obj
		},


		hasOnly: function (selector) {
			return this._doc.querySelectorAll(selector).length == 1
		},


		clearValue: function (selector) {
			this.queryOnlyElement(selector).value = ''
		},


		/** Simulate click */
		click: function (selector) {
			var $element = $(this.queryOnlyElement(selector))

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
		 ** values: the key code
		 */
		sendKey: function (selector, values) {
			var $input = $(this.queryOnlyElement(selector))

			values.forEach(function (value) {
				var ch = value.charCodeAt(0)

				$input.simulate('keydown', {
					key    : ch,
					code   : ch,
					keyCode: ch // integer
				})

				// before input

				$input.simulate('keypress', { // already deprecate
					key    : ch,
					code   : ch,
					keyCode: ch
				})

				// input

				// default action

				$input.simulate('keyup', {
					key    : ch,
					code   : ch,
					keyCode: ch
				})
			})
		},

		/** Simulate Keyboard */
		setValue: function (selector, text) {
			var input = this.queryOnlyElement(selector)
			input.value = text
		},


		getAttribute: function (selector, attribute) {
			$(this.queryOnlyElement(selector)).attr(attribute)
		},


		getTagName: function (selector) {
			return this.queryOnlyElement(selector).tagName
		},


		getTitle: function () {
			return this._doc.title
		},

		getValue: function (selector) {
			var control = this.queryOnlyElement(selector)
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
		},


		/** Query a element only has one
		 ** return: SUCCESS | ELEMENT_NOT_FIND | ELEMENT_EXCEED_ONE
		 */
		queryOnlyElement: function (selector) {
			var doms = this._doc.querySelectorAll(selector)
			if (doms.length > 1) {
				this._throw(STATUS.ELEMENT_EXCEED_ONE, {
					selector: selector,
					count   : doms.length
				})
			} else if (doms.length == 0) {
				this._throw(STATUS.ELEMENT_NOT_FIND, {
					selector: selector
				})
			} else {
				return doms[0]
			}
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