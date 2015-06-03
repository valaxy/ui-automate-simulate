define(function () {

	var KEY = '__mptest'

	// save to localStorage
	var save = function () {
		localStorage[KEY] = this.toString()
	}


	var TestReport = {
		create: function (options) {
			var obj = Object.create(TestReport)
			obj.sessionId = +new Date      // a random session id
			obj.step = -1                  // next exec step is (step+1)
			obj.endPage = options.endPage  // collect data page
			obj.usercase = []              // each step

			for (var i = 0; i < options.usercase.length; i++) {
				obj.usercase.push({
					status: 'pending' // success || fail || pending
				})
			}

			return obj
		},

		reportError: function (msg) {
			this.usercase[this.step - 1].status = 'fail'
			this.usercase[this.step - 1].msg = msg
			save.call(this)
		},

		toString: function () {
			return JSON.stringify(this)
		},

		parse: function (str) {
			return TestReport.create(JSON.parse(str))
		}
	}

	return TestReport
})