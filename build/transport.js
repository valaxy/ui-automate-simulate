({
	baseUrl: '../',

	paths: {
		'jquery'         : 'bower_components/jquery/dist/jquery',
		'text'           : 'bower_components/requirejs-text/text',
		'async'          : 'bower_components/async/lib/async',
		'es6-promise'    : 'bower_components/es6-promise/promise.min',
		'eventemitter2'  : 'bower_components/eventemitter2/lib/eventemitter2',
		'jquery-simulate': 'bower_components/jquery-simulate/jquery.simulate',
		'command'        : 'src/command'
	},

	wrapShim: true,

	out: '../dist/uiRun-core.js',

	shim: {
		'jquery-simulate': {
			deps: ['jquery']
		}
	},

	preserveLicenseComments: false,

	//optimize: 'none',

	include: ['command']
})