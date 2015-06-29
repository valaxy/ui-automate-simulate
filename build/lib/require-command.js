require(['command'], function (Command) {
	window.uiRunCommand = Command

	window.require = window.__uiRun.rember.require
	window.define = window.__uiRun.rember.define
	window.requirejs = window.__uiRun.rember.requirejs
	delete window.__uiRun

	window.uiRunReady && window.uiRunReady()
})