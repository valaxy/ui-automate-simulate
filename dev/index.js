var express = require('express'),
    jadeStatic = require('jade-static'),
    sassStatic = require('./sass-static'),
	path = require('path')


var app = express()

app.use(
	'/',
	jadeStatic(path.join(__dirname, '../')),
	sassStatic(path.join(__dirname, '../')),
	express.static('../')
)

app.listen(3000)