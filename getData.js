'use strict'

function load(location, callback) {
	var xhr = getXHR()
	xhr.open('GET', location, true)
	xhr.onreadystatechange = createStateChangeListener(xhr, callback)
	xhr.send()
}

function createStateChangeListener(xhr, callback) {
	return function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			try {
				callback(null, JSON.parse(xhr.responseText))
			} catch (err) {
				callback(err, null)
			}
		}
	}
}

function getXHR() {
	return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
}

function isJSON(json) {
	try {
		if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
			return true
		}
		return false
	} catch (err) {
		return false
	}
}

function initURL(url) {
	load(url, function (err, json) {
		if (err) {
			throwError('failed to get JSON (' + url + ')')
		}
		if (isJSON(json))
			return json;
		else throwError("Not valid JSON");
	})
}
