/**
 * These browsers are known to be incompatible beforehand and when
 * detected a custom action should be performed.
 */
knownIncompatibles = [{
	name : "Internet Explorer",
	agent : "msie",
	minVersion : "3",
	maxVersion : "9"
}]
/**
 * These browsers are known browsers to be compatible beforehand and
 * the user will be asked (if wished) to install one of them.
 */
knownCompatibles = [{
	name : "Chrome",
	agent : "chrome",
	minVersion : "20",
	maxVersion : "",
	download: "www.google.com/chrome",
	img: ""
}];

// Incompatibility actions
INCOMP_REDIRECT = 1;
INCOMP_OVERLAY_CENTER = 2;
INCOMP_MSG_TOP = 3;

window.BrowserReqs = (function(window, compatibles, incompatibles) {
	browser = {};
	browser.ua = window.navigator.userAgent.toLowerCase();
	browser.isCompatible = (function(ua) {
		// TODO
		if (incompatibles.length == 0)
			return true;
		return false;
	})(window.navigator.userAgent);

	browser.handleIncompatibility = browser.isCompatible ? function() {
	} : function(action, redirect) {
		if (!window.BrowserReqs.isCompatible) {
			console.log("Your browser is incompatible!");
			switch(action) {
				case INCOMP_REDIRECT:
					window.location.replace(redirect);
					break;
				case INCOMP_OVERLAY_CENTER:
					window.onload = function() {
						overlay = document.createElement("div");
						overlay.setAttribute("id", "incomp_overlay");
						overlay.setAttribute("class", "incomp_overlay");
						document.body.insertBefore(overlay, document.body.firstChild);
						content = document.createElement("div");
						content.setAttribute("class", "incomp_overlay_content");
						content.innerHTML = '<h1>Sorry but your browser is not supported!</h1><h2>Some content might not load properly.</h2>';
						overlay.appendChild(content);

						// TODO: Append the div and create other elements to hint compat. browsers.
						content.innerHTML = content.innerHTML + '<div class="incomp_overlay_button" onclick="javascript:document.body.removeChild(document.getElementById(\'incomp_overlay\'))">Show me the site anyways</div>';
					}
					break;
				case INCOMP_MSG_TOP:
					// TODO
					console.log("not yet implemented");
				default:
					console.log("no valid action")
			}
		}
	}
	return browser;
})(this, knownCompatibles, knownIncompatibles);
