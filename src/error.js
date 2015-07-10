(function () {
	var uiRunError = window.uiRun.Error = function (code, message) {
		this.code = code
		this.message = message
	}

	uiRunError.STATUS = {
		SUCCESS           : 0,
		ELEMENT_NOT_FIND  : 1,
		ELEMENT_EXCEED_ONE: 2
	}

})();