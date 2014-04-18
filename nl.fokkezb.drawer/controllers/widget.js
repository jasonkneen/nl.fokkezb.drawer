var args = arguments[0] || {};

$.module = require('dk.napp.drawer');

// convert children to args based on role
if (args.children) {

	_.each(args.children, function(child) {

		// fix: https://jira.appcelerator.org/browse/TC-3583
		if (!child) {
			return;
		}

		var role = child.role;

		if (role) {
			args[role] = child;
		}
	});
}

// convert strings to constants
_.each([
	'closeDrawerGestureMode',
	'openDrawerGestureMode',
	'centerHiddenInteractionMode',
	'animationMode',
	'statusBarStyle'

], function(arg) {

	if (args[arg] && typeof args[arg] === 'string') {
		args[arg] = $.module[args[arg]];
	}
});

// delete irrelevant args
delete args.id;
delete args.__parentSymbol;
delete args.children;

// create actual drawer
$.instance = $.module.createDrawer(args);

// add as top level view
$.addTopLevelView($.instance);

// expose properties, setters and getters
_.each([
	'centerWindow',
	'leftWindow',
	'rightWindow',
	'closeDrawerGestureMode',
	'openDrawerGestureMode',
	'leftDrawerWidth',
	'rightDrawerWidth',
	'orientationModes',
	'centerHiddenInteractionMode',
	'animationMode',
	'animationVelocity',
	'showShadow',
	'shadowWidth',
	'shouldStretchDrawer',
	'fading',
	'parallaxAmount',
	'statusBarStyle'

], function(key) {
	var cc = key[0].toUpperCase() + key.substring(1);

	var get = exports['get' + cc] || ($['get' + cc] = function() {
		return $.instance[key];
	});
	var set = exports['set' + cc] || ($['set' + cc] = function(val) {
		$.instance[key] = val;
	});

	Object.defineProperty($, key, {
		get: get,
		set: set
	});
});

// exporse other functions
_.each([
	'toggleLeftWindow',
	'toggleRightWindow',
	'bounceLeftWindow',
	'bounceRightWindow',
	'isAnyWindowOpen',
	'isLeftWindowOpen',
	'isRightWindowOpen',
	'open',
	'close'

], function(fn) {
	if (!exports[fn]) {

		// we need wrapper function for Android
		exports[fn] = function() {
			return $.instance[fn]();
		};
	}
});

// events
exports.on = function(event, callback, context) {
	return $.instance.addEventListener(event, callback);
};

exports.off = function(event, callback, context) {
	return $.instance.removeEventListener(event, callback);
};

exports.trigger = function(event, args) {
	return $.instance.fireEvent(event, args);
};

exports.addEventListener = exports.on;
exports.removeEventListener = exports.off;
exports.fireEvent = exports.trigger;

// helpers
exports.closeLeftWindow = function() {
	if ($.instance.isLeftWindowOpen()) {
		return $.instance.toggleLeftWindow();
	}
};

exports.closeRightWindow = function() {
	if ($.instance.isRightWindowOpen()) {
		return $.instance.toggleRightWindow();
	}
};

exports.openLeftWindow = function() {
	if (!$.instance.isLeftWindowOpen()) {
		return $.instance.toggleLeftWindow();
	}
};

exports.openRightWindow = function() {
	if (!$.instance.isRightWindowOpen()) {
		return $.instance.toggleRightWindow();
	}
};
