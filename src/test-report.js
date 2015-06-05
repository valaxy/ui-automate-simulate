define(function () {

	var KEY = '__mptest'

	// save to localStorage
	var save = function (data) {
		localStorage[KEY] = JSON.stringify(data)
	}


	// get from localStorage
	var read = function () {
		return JSON.parse(localStorage[KEY])
	}


	// need to create a default localStorage data
	var needCreate = function () {
		if (localStorage[KEY]) {
			var data = read()
			return (data.status != 'pending')
		}

		return !localStorage[KEY]
	}


	var TestReport = {

		/** If not exist create a default one, else create from localStorage
		 ** options:
		 **     stepCount: count of steps
		 */
		create: function (options) {
			// create a default one
			if (needCreate()) {
				var data = {
					sessionId: +new Date,       // a random session id
					step     : -1,              // the last exec-step, if none is -1
					status   : 'pending',       // success | fail | pending
					userCase : []               // each step
				}

				for (var i = 0; i < options.stepCount; i++) {
					data.userCase.push({
						status: 'pending' // success || fail || pending
					})
				}

				save(data)

				console.warn('begin execute case')
			}

			return Object.create(TestReport)
		},

		generateRawFromUrl: function () {
			var base64 = location.hash.substr(1)
			return JSON.parse(atob(base64))
		},

		toBase64: function () {
			return btoa(localStorage[KEY])
		},

		/** Get step i */
		getStep: function (i) {
			return read().userCase[i]
		},

		/** Get current step */
		getCurrentStep: function () {
			return read().step
		},


		/** Prepare to exec next step
		 ** return: true if has step, false if no step
		 */
		nextStep: function () {
			var data = read()
			if (data.step >= 0) {
				data.userCase[data.step].status = 'success'
			}
			data.step += 1
			save(data)
			return data.step != data.userCase.length
		},

		/** Report a error */
		reportError: function (msg) {
			var data = read()
			var step = data.step
			data.userCase[step].status = 'fail'
			data.userCase[step].msg = msg
			data.status = 'fail'
			save(data)
		},

		/** Report a success */
		reportSuccess: function () {
			var data = read()
			data.status = 'success'
			save(data)
		},


		/** Clear all the data in localStorage */
		clear: function () {
			delete localStorage[KEY]
		}
	}

	return TestReport
})


//
//
//parse: function (str) {
//	return TestReport.create(JSON.parse(str))
//},


///** Get Session Id */
//getSessionId: function () {
//	return read().sessionId
//},
//
