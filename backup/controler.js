define(function (require) {
	var Promise = require('es6-promise').Promise
	var async = require('async')
	var TestReport = require('./test-report')

	var KEY = '__mptest'

	// as a global var to use
	var Controler = window.Controler = function (driver) {
		this._driver = driver
	}


	/** Exec case
	 ** options:
	 **     startPage: page of initializing test environment
	 **     endPage:   page of collecting final report data
	 **     userCase:  a Array
	 **         status: 'success' | 'fail' | 'pending'
	 */
	Controler.prototype.exec = function (options) {
		var testReport = TestReport.create({
			endPage  : options.endPage,
			stepCount: options.userCase.length
		})
		var userCase = options.userCase

		this._driver.emitter.on('error', function (msg) {
			shouldContinue = false // break
			testReport.reportError(msg)
			location.href = options.endPage + '#' + testReport.toBase64()
		})


		this._driver.emitter.on('navigating', function () {
			shouldContinue = false // break
		})


		var shouldContinue = true
		async.whilst(
			function () {
				return shouldContinue
			},
			function (next) {
				// exec next step
				if (!testReport.nextStep()) { // final step
					shouldContinue = false
					testReport.reportSuccess()
					return
				}

				new Promise(function (resolve) {
					var promise = userCase[testReport.getCurrentStep()]()
					if (promise) {
						promise.then(function () {
							resolve()
						})
					} else {
						resolve()
					}
				}).then(function () {
						next()
					})
			},
			function () {

			}
		)

	}

	return Controler
})


//Controler.prototype.start = function (options) {
//	this._options = options
//
//	var beginPage = this._options.beginPage
//	var endPage = this._options.endPage
//	var usercase = this._options.usercase
//
//	var testData = TestReport.create({
//		endPage : endPage,
//		usercase: usercase
//	})
//	save(testData)
//
//	location.href = beginPage
//}