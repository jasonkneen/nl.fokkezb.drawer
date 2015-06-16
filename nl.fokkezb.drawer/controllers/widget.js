var args = arguments[0] || {};

var mod;

if (OS_ANDROID && args.drawerLayout) {
	mod = 'com.tripvi.drawerlayout';
} else {
	mod = 'dk.napp.drawer';
}

$.module = require(mod);

// convert children to args based on role
if (args.children) {

	_.each(args.children, function (child) {

		// fix: https://jira.appcelerator.org/browse/TC-3583
		if (!child) {
			return;
		}

		var role = child.role;

		if (mod !== 'dk.napp.drawer') {
			role = role.replace('Window', 'View');
		}

		if (role) {
			args[role] = child;
		}
	});
}

var consts;

if (mod === 'dk.napp.drawer') {
	consts = [
		'closeDrawerGestureMode',
		'openDrawerGestureMode',
		'centerHiddenInteractionMode',
		'animationMode',
		'statusBarStyle'
	];
} else {
	consts = ['drawerLockMode'];
}

// convert strings to constants
_.each(consts, function (arg) {

	if (args[arg] && typeof args[arg] === 'string') {
		args[arg] = $.module[args[arg]];
	}
});

//transform properties
if (mod === 'dk.napp.drawer') {
	if (_.has(args, 'drawerIndicatorEnabled')) {
		args.hamburgerIcon = args.drawerIndicatorEnabled;
		delete args.drawerIndicatorEnabled;
	}
	if (_.has(args, 'drawerArrowIcon')) {
		args.arrowAnimation = args.drawerArrowIcon;
		delete args.drawerArrowIcon;
	}
	if (_.has(args, 'drawerArrowIconColor')) {
		args.hamburgerIconColor = args.drawerArrowIconColor;
		delete args.drawerArrowIconColor;
	}
} else {
	if (_.has(args, 'hamburgerIcon')) {
		args.drawerIndicatorEnabled = args.hamburgerIcon;
		delete args.hamburgerIcon;
	}
	if (_.has(args, 'arrowAnimation')) {
		args.drawerArrowIcon = args.arrowAnimation;
		delete args.arrowAnimation;
	}
	if (_.has(args, 'hamburgerIconColor')) {
		args.drawerArrowIconColor = args.hamburgerIconColor;
		delete args.hamburgerIconColor;
	}
}

// delete irrelevant args
delete args.id;
delete args.__parentSymbol;
delete args.children;
	
if (mod === 'dk.napp.drawer') {

	_.extend(args, args.window || {});
	
	// create actual drawer
	$.instance = $.module.createDrawer(_.omit(args, 'window'));
	
	$.window = $.instance;
	$.addTopLevelView($.instance);

} else {
	// create actual drawer
	$.instance = $.module.createDrawer(_.omit(args, 'window'));
	
	$.window = Ti.UI.createWindow(_.extend(_.pick(args, ["orientationModes", "exitOnClose", "backgroundColor"]), args.window || {}));
	$.window.add($.instance);

	$.addTopLevelView($.window);
}

if(OS_ANDROID){
	$.window.addEventListener('open', function (e) {
		var actionBar = (mod === 'dk.napp.drawer' ? this : e.source).getActivity().getActionBar();
	
		if (actionBar) {
			actionBar.setDisplayHomeAsUp(true);
			actionBar.setOnHomeIconItemSelected(function () {
				$.instance.toggleLeftWindow();
			});
		}
	});
}

var props;

if (mod === 'dk.napp.drawer') {
	props = [
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
		'statusBarStyle',
		'hamburgerIcon',
		'hamburgerIconColor',
		'arrowAnimation'
	];
} else {
	props = [
		'leftView',
		'rightView',
		'centerView',
		'isLeftDrawerOpen',
		'isLeftDrawerVisible',
		'isRightDrawerOpen',
		'isRightDrawerVisible',
		'leftDrawerWidth',
		'rightDrawerWidth',
		'drawerIndicatorEnabled',
		'drawerIndicatorImage',
		'drawerLockMode',
		'drawerArrowIcon',
		'drawerArrowIconColor'
	];
}

// expose properties, setters and getters
_.each(props, function (key) {
	var cc = key[0].toUpperCase() + key.substring(1);

	var get = $['get' + cc] || ($['get' + cc] = function () {
		return $.instance[key];
	});
	var set = $['set' + cc] || ($['set' + cc] = function (val) {

		if (consts.indexOf(key) !== -1 && typeof val === 'string') {
			val = $.module[val];
		}

		$.instance[key] = val;
	});

	Object.defineProperty($, key, {
		get: get,
		set: set
	});
});

if (mod === 'dk.napp.drawer') {

	$.closeLeftWindow = function () {
		if ($.instance.isLeftWindowOpen()) {
			return $.instance.toggleLeftWindow();
		}
	};

	$.closeRightWindow = function () {
		if ($.instance.isRightWindowOpen()) {
			return $.instance.toggleRightWindow();
		}
	};

	$.openLeftWindow = function () {
		if (!$.instance.isLeftWindowOpen()) {
			return $.instance.toggleLeftWindow();
		}
	};

	$.openRightWindow = function () {
		if (!$.instance.isRightWindowOpen()) {
			return $.instance.toggleRightWindow();
		}
	};

	$.replaceCenterView = function (view) {
		return $.instance.setCenterView(view);
	};

	$.leftView = $.leftWindow;
	$.setLeftView = $.setLeftWindow;
	$.getLeftView = $.getLeftWindow;

	$.centerView = $.centerWindow;
	$.setCenterView = $.setCenterWindow;
	$.getCenterView = $.getCenterWindow;

	$.rightView = $.rightWindow;
	$.setRightView = $.setRightWindow;
	$.getRightView = $.getRightWindow;
	
	$.drawerIndicatorEnabled = $.hamburgerIcon;
	$.setDrawerIndicatorEnabled = $.setHamburgerIcon;
	$.getDrawerIndicatorEnabled = $.getHamburgerIcon;
	
	$.drawerArrowIcon = $.arrowAnimation;
	$.setDrawerArrowIcon = $.setArrowAnimation;
	$.getDrawerArrowIcon = $.getArrowAnimation;
	
	$.drawerArrowIconColor = $.hamburgerIconColor;
	$.setDrawerArrowIconColor = $.setHamburgerIconColor;
	$.getDrawerArrowIconColor = $.getHamburgerIconColor;

} else {

	$.open = function (params) {
		return $.window.open(params);
	};

	$.close = function (params) {
		return $.window.close(params);
	};

	$.isAnyWindowOpen = function () {
		return $.instance.getIsLeftDrawerOpen() || $.instance.getIsRightDrawerOpen();
	};

	$.isLeftWindowOpen = function () {
		return $.instance.getIsLeftDrawerOpen();
	};

	$.isRightWindowOpen = function () {
		return $.instance.getIsRightDrawerOpen();
	};

	$.leftWindow = $.leftView;
	$.setLeftWindow = $.setLeftView;
	$.getLeftWindow = $.getLeftView;

	$.centerWindow = $.centerView;
	$.setCenterWindow = $.setCenterView;
	$.getCenterWindow = $.getCenterView;

	$.rightWindow = $.rightView;
	$.setRightWindow = $.setRightView;
	$.getRightWindow = $.getRightView;
	
	$.hamburgerIcon = $.drawerIndicatorEnabled;
	$.setHamburgerIcon = $.setDrawerIndicatorEnabled;
	$.getHamburgerIcon = $.getDrawerIndicatorEnabled;
	
	$.arrowAnimation = $.drawerArrowIcon;
	$.setArrowAnimation = $.setDrawerArrowIcon;
	$.getArrowAnimation = $.getDrawerArrowIcon;
	
	$.hamburgerIconColor = $.drawerArrowIconColor;
	$.setHamburgerIconColor = $.setDrawerArrowIconColor;
	$.getHamburgerIconColor = $.getDrawerArrowIconColor;
}

// events
$.on = function (event, callback, context) {
	return $.instance.addEventListener(event, callback);
};

$.off = function (event, callback, context) {
	return $.instance.removeEventListener(event, callback);
};

$.trigger = function (event, args) {
	return $.instance.fireEvent(event, args);
};

$.addEventListener = $.on;
$.removeEventListener = $.off;
$.fireEvent = $.trigger;

var methods;

if (mod === 'dk.napp.drawer') {
	methods = [
		'toggleLeftWindow',
		'toggleRightWindow',
		'bounceLeftWindow',
		'bounceRightWindow',
		'isAnyWindowOpen',
		'isLeftWindowOpen',
		'isRightWindowOpen',
		'open',
		'close'
	];
} else {
	methods = [
		'replaceCenterView',
		'toggleLeftWindow',
		'openLeftWindow',
		'closeLeftWindow',
		'toggleRightWindow',
		'openRightWindow',
		'closeRightWindow'
	];
}

// exporse other methods
_.each(methods, function (fn) {

	if (!$[fn]) {

		// we need wrapper function for Android
		$[fn] = OS_IOS ? $.instance[fn] : function (a, b) {
			return $.instance[fn](a, b);
		};
	}
});
