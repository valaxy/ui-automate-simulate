var sass = require('node-sass'),
    path = require('path'),
    fs   = require('fs')

module.exports = function (dirPath) {
	return function (req, res, next) {
		console.log('express-sass: ' + req.url)
		if (/\.css/.test(req.url)) {
			var cssFile = path.join(dirPath, req.url)
			fs.exists(cssFile, function (exists) {
				if (!exists) {
					sass.render({
						file: cssFile.replace('css', 'scss')
					}, function (err, result) {
						if (err) {
							console.error(err)
						} else {
							res.end(result.css)
						}
					})
				} else {
					res.sendFile(cssFile)
				}
			})
		} else {
			next()
		}
	}
}