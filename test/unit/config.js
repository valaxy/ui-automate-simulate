requirejs.config({
	baseUrl: '../../',
	paths  : {
		'jquery'         : 'bower_components/jquery/dist/jquery',
		'jquery-simulate': 'bower_components/jquery-simulate/jquery.simulate',
		'text'           : 'bower_components/requirejs-text/text',
		'async'          : 'bower_components/async/lib/async',
		'es6-promise'    : 'bower_components/es6-promise/promise.min',
		'eventemitter2'  : 'bower_components/eventemitter2/lib/eventemitter2'
	},

	shim: {
		'jquery-simulate': {
			deps: ['jquery']
		}
	}
})