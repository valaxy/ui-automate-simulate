define(function () {
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
		clearValue: function (selector) {
			var texts = this._doc.querySelectorAll(selector)
			assumeZero(texts)
			for (var i = 0; i < texts.length; i++) {
				var text = texts[i]
				text.value = ''
			}
		},

		getValue: function (selector) {
			var texts = this._doc.querySelectorAll(selector)
			assumeOne(texts)
			return texts[0].value
		}

	}

	return Command

})