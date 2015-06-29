(function () {
	var rember = window.uiRun.__rember
	for (var key in rember) {
		window[key] = rember[key]
	}
	delete window.uiRun.__rember
})();