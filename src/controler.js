define(function (require) {
	var Promise = require('es6-promise').Promise
	var async = require('async')

	var KEY = '__mptest'

	var save = function (state) {
		localStorage[KEY] = JSON.stringify(state)
	}

	var Controler = window.Controler = function () {
		// no thing
	}

	Controler.prototype.start = function (url) {
		save({
			session: +new Date, // 表示这次测试的session id
			step   : -1         // 上一个执行步骤是多少, 现在应该执行第(step+1)步了, 因此初始是-1
		})
		location.href = url
	}

	Controler.prototype.exec = function (userCase) {
		if (!localStorage[KEY]) {
			throw new Error('can not be')
		}

		var state = JSON.parse(localStorage[KEY])

		var promise = null
		var flag = true
		async.whilst(
			function () {
				return flag
			},
			function () {
				state.step += 1
				save(state)
				if (state.step == userCase.steps.length) { // over
					alert('任务执行完毕')
					flag = false
					return
				}

				new Promise(function (resolve) {
					if (promise) {
						promise.then(function () {
							promise = userCase.steps[state.step]()
							resolve()
						})
					} else {
						promise = userCase.steps[state.step]()
						resolve()
					}
				}).then(function () {
						if (userCase.command.navigating) {
							flag = false
							return
						}
					})

			},
			function () {

			}
		)

	}

	return Controler
})

