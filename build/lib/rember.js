(function () {
	window.uiRun.__rember = {}

	// handle jQuery
	for (var key in window) {
		if (/^jQuery\d+/.test(key) || key == '$') {
			window.uiRun.__rember[key] = window[key]
			delete window[key]
		}
	}

	// handle others
	var rembers = [
		'define',
		'require'
	]
	rembers.forEach(function (key) {
		window.uiRun.__rember[key] = window[key]
	})


})();


//window.__uiRun = {
//	rember: {
//		require  : window.require,
//		define   : window.define,
//		requirejs: window.requirejs
//	}
//}
//
////window.uiRunDefine = window.define
//
//delete window.require
//delete window.define
//delete window.requirejs