define(function (require) {
	var Promise = require('es6-promise').Promise
	var async = require('async')
	var TestReport = require('./test-report')

	var KEY = '__mptest'

	var save = function (testData) {
		localStorage[KEY] = testData.toString()
	}


	// as a global var to use
	var Controler = window.Controler = function (driver) {
		this._driver = driver
	}


	/** Start a new case
	 ** options:
	 **     startPage: page of initializing test environment
	 **     endPage:   page of collecting final report data
	 */
	Controler.prototype.start = function (options) {
		this._options = options

		var beginPage = this._options.beginPage
		var endPage = this._options.endPage
		var usercase = this._options.usercase

		var testData = TestReport.create({
			endPage : endPage,
			usercase: usercase
		})
		save(testData)

		location.href = beginPage
	}


	/** Report data
	 */
	Controler.prototype.report = function () {
		console.log(localStorage[KEY])
	}

	Controler.prototype.exec = function (userCase) {
		if (!localStorage[KEY]) {
			throw new Error('Don\'t have test data')
		}

		var testData = TestReport.parse(localStorage[KEY])


		var promise = null
		var flag = true


		this._driver.emitter.on('error', function (msg) {
			flag = false // break
			testData.reportError(msg)
			location.href = testData.endPage
		})


		this._driver.emitter.on('navigating', function () {
			flag = false // break
		})


		async.whilst(
			function () {
				return flag
			},
			function (next) {
				testData.step += 1
				save(testData)

				// exec next step
				if (testData.step == userCase.length) { // final step
					flag = false
					return
				}

				new Promise(function (resolve) {
					var promise = userCase[testData.step]()
					if (promise) {
						promise.then(function () {
							resolve()
						})
					} else {
						resolve()
					}
				}).then(function () {
						testData.usercase[testData.step].status = 'success'
						next()
					})

				//new Promise(function (resolve) {
				//	if (promise) {
				//		promise.then(function () {
				//			promise = userCase[testData.step]()
				//			resolve()
				//		})
				//	} else {
				//		promise = userCase[testData.step]()
				//		resolve()
				//	}
				//}).then(function () {
				//		testData.usercase[testData.step].status = 'success'
				//		next()
				//	})
			},
			function () {

			}
		)

	}

	return Controler
})

