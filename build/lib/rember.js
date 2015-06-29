(function () {
	window.__uiRun = {
		rember: {
			require  : window.require,
			define   : window.define,
			requirejs: window.requirejs
		}
	}

	delete window.require
	delete window.define
	delete window.requirejs
})()