(function () {
	window.uiRun = {
		whilst: function (test, fn, callback) {
			var exec = function () {
				fn(function (err) {
					if (!err) {
						if (test()) {
							exec()
						} else {
							callback() // finish
						}
					} else {
						callback(err) // error
					}
				})
			}

			if (test()) {
				exec()
			} else {
				callback() // do nothing and finish
			}
		}
	}
})()