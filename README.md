# Alloy *Drawer* Widget [![Appcelerator Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://appcelerator.com/titanium/) [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://appcelerator.com/alloy/)

This is a widget for the [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) MVC framework of [Appcelerator](http://www.appcelerator.com)'s [Titanium](http://www.appcelerator.com/platform) platform.

It wraps the [NappDrawer](http://gitt.io/component/dk.napp.drawer) module by Mads Møller, which provides a sliding side menu as introduced by Facebook. For Android-only it can also use [DrawerLayout](https://github.com/manumaticx/Ti.DrawerLayout), now maintained by Manuel Lehner.

## Usage [![gitTio](http://gitt.io/badge.png)](http://gitt.io/component/nl.fokkezb.drawer)

1. Install the [NappDrawer](http://gitt.io/component/dk.napp.drawer) module for Android and/or iOS via [gitTio](http://gitt.io):

	`gittio install dk.napp.drawer -g -p [ios|android]`
    
2. Optionally, install the DrawerLayout module by downlading the latest [ZIP file](https://github.com/manumaticx/Ti.DrawerLayout/tree/master/dist) to the root of your project.

3. Install [this widget](http://gitt.io/component/nl.fokkezb.drawer) via [gitTio](http://gitt.io):

	`gittio install nl.fokkezb.drawer`

	gitTio will automatically install the [NappDrawer](http://gitt.io/component/dk.napp.drawer) module it depends on.
	
4. In your `app/views/index.xml` use it like this:

	```	
	<Alloy>
        <Widget id="drawer" src="nl.fokkezb.drawer">

            <Window module="xp.ui" role="leftWindow">
                <Label>I am left</Label>
            </Window>

            <NavigationWindow platform="ios" role="centerWindow">
                <Window>
                    <LeftNavButton>
                        <Button onClick="toggle">Left</Button>
                    </LeftNavButton>
                    <Label>I am center</Label>
                    <RightNavButton>
                        <Button onClick="toggle">Right</Button>
                    </RightNavButton>
                </Window>
            </NavigationWindow>
            <View platform="android" role="centerWindow">
                <Label>I am center</Label>
            </View>

            <Window module="xp.ui" role="rightWindow">
                <Label>I am right</Label>
            </Window>

        </Widget>
    </Alloy>
	```
	
	**NOTE**: You can use `<Require>` or `<Widget>` within the widget, just make sure you set the `role` attribute on the view of the required view and not on the require-tag itself.
	
5. In your `app/styles/index.tss` use it like this:

	```
	"#drawer": {
		openDrawerGestureMode: "OPEN_MODE_ALL",
		closeDrawerGestureMode: "CLOSE_MODE_MARGIN",
		leftDrawerWidth: 200,
		rightDrawerWidth: 200,
		
		// use DrawerLayout for Android
		drawerLayout: true
	}
	
	"Window": {
		backgroundColor: 'white'
	}
	```
	
	Any NappDrawer or DrawerLayout constants can be passed as strings.
	
6. In your `app/controllers/index.js` use it like this:

	```
	$.drawer.open();
	
	function toggle(e) {
		var fn = 'toggle' + e.source.title + 'Window';
		$.drawer[fn]();
	}
	```
	
	Any NappDrawer or DrawerLayout property or method can be get, set or called via the widget, but you can also access the module and instance directly via `$.drawer.module` and `$.drawer.instance`.
	
	I've added cross compatibility methods and properties so you can use both the NappDrawer and DrawerLayout API. The DrawerLayout is wrapped in a window for which you can pass params via the `window` property and access the instance from `$.window`.

### Android

#### Close mode (NappDrawer)
For Android, always use `CLOSE_MODE_MARGIN` if the left/right window needs to be interacted with.

#### Views instead of Windows
For Android, both modules require to receive views instead of windows. You can use the `platform` attribute to add conditional elements like the examples does for the centerView. An easier way to do this is to add a `module="xp.ui"` attribute to the `<Window>` elements and have a file in `app/lib/xp.ui.js` which has:

```
exports.createWindow = function(args) {
	return Ti.UI[OS_IOS ? 'createWindow' : 'createView'](args);
};
```

### open/close Left/Right Window
For your convenience, the widget exposes 4 additional methods to **ONLY** open or close either the left or right window. The NappDrawer module only provides `toggle Left/Right Window` and `is Left/Right WindowOpen` methods, which of course can be combined to get the same result. DrawerLayout has built-in support for these methods.

## The repository
The repository contains two branches. This master branch contains the widget. The other [test](https://github.com/FokkeZB/nl.fokkezb.drawer/tree/test) branch has a complete Titanium Alloy demo/test project.

## Changelog

- 1.1.2: Fixes #55
- 1.1.1: Made distributable via NPM
- 1.1.0: Added DrawerLayout support.
- 1.0.1: Passing through event binding to the drawer instance.

## License

<pre>
Copyright 2014-2015 Fokke Zandbergen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>
