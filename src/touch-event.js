(function () {

	// 参考: https://gist.github.com/basecss/8666646

	var touchstart = {
		altKey          : false,
		bubbles         : true,
		cancelBubble    : false,
		cancelable      : true,
		//changedTouches: TouchList
		charCode        : 0,
		clipboardData   : undefined,
		ctrlKey         : false,
		currentTarget   : null,
		data            : undefined,
		defaultPrevented: false,
		detail          : 0,
		eventPhase      : 0,
		keyCode         : 0,
		layerX          : 0,
		layerY          : -46,
		metaKey         : false,
		pageX           : 0,
		pageY           : 0,
		returnValue     : true,
		shiftKey        : false,
		//srcElement: HTMLDivElement,
		//		target: HTMLDivElement
		//		targetTouches: TouchList
		//		timeStamp: 1437110344059
		//		touches: TouchList
		//		type: "touchstart"
		//		view: Window
		which           : 0
	}


	var touchExample = {
		clientX            : 179,
		clientY            : 369,
		identifier         : 0,
		pageX              : 179,
		pageY              : 369,
		screenX            : 179,
		screenY            : 369,
		target             : HTMLParagraphElement,
		webkitForce        : 213701572555752600000,
		webkitRadiusX      : 1634311280,
		webkitRadiusY      : 0,
		webkitRotationAngle: 218541323674059800000
	}


	// Touch Event
	var createTouchEvent = function (dom) {
		var rect = dom.getBoundingClientRect()
		var centerPointX = Math.round((rect.left + rect.right) / 2)
		var centerPointY = Math.round((rect.top + rect.bottom) / 2)


		var touch = document.createTouch(
			window,       // keep always window
			dom,          // target, a dom element
			0,            // identifier, keep always 0
			centerPointX, // pageX and clientX
			centerPointY, // pageY and clientY
			centerPointX, // screenX
			centerPointY, // screenY
			1634311280,            // webkitRadiusX, copy from real data
			2,                     // webkitRadiusY, same up
			218541323674059800000, // webkitRotationAngle, same up
			213701572555752600000  // webkitForce, same up
		)

		var list = document.createTouchList(touch)

		var e = document.createEvent('TouchEvent')

		e.initTouchEvent(
			list,         // touches
			list,         // targetTouches
			list,         // changedTouches
			'touchstart', // type
			window,       // view, keep always window
			0,            // screenX, no use
			0,            // screenY, no use
			0,            // layerX and pageX, don't know how to use
			0,            // layerY and pageY
			false,       // ctrlKey
			false,       // altKey
			false,       // shiftKey
			false        // metaKey
		)

		// keep currentTarget null
		var options = {
			srcElement: 1,
			target    : 1
		}

		for (var key in options) {
			e.__defineGetter__(key, function () {
				return options[key]
			})
		}

		console.log(e)
		return e
	}


})()