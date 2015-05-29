({
	baseUrl: '../',
	paths  : {
		'jquery'     : 'bower_components/jquery/dist/jquery',
		'text'       : 'bower_components/requirejs-text/text',
		'async'      : 'bower_components/async/lib/async',
		'es6-promise': 'bower_components/es6-promise/promise.min'
	},

	//insertRequire: ['src/home/home'],
	//wrapShim     : true,
	out    : '../dist/ui-automate.js',
	//optimize: 'none',
	include: [
		'src/command',
		'src/controler'
	]
})