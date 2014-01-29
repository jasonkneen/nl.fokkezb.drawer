# NappDrawer Alloy Widget
This is a widget for the [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) MVC framework of [Appcelerator](http://www.appcelerator.com)'s [Titanium](http://www.appcelerator.com/platform) platform.

It wraps the [NappDrawer](http://gitt.io/component/dk.napp.drawer) module by Mads Møller, which provides a sliding side menu as introduced by Facebook.

## Usage
1. Install the [NappDrawer](http://gitt.io/component/dk.napp.drawer) module for Android and/or iOS via [gitTio](http://gitt.io):

    `gittio install dk.napp.drawer -g -p [ios|android]`

2. Install [this widget](http://gitt.io/component/nl.fokkezb.drawer) via [gitTio](http://gitt.io):

	`gittio install nl.fokkezb.drawer`
	
3. In your `app/views/index.xml` use it like this:

	```
	<Alloy>
		<Widget id="drawer" src="nl.fokkezb.drawer">
			<Window module="xp.ui" role="leftWindow">
				<Label>I am left</Label>
			</Window>
			
			<NavigationWindow platform="ios" role="centerWindow">
				<Window>
					<Label>I am center</Label>
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
	
4. In your `app/styles/index.tss` use it like this:

	```
	"#drawer": {
		closeDrawerGestureMode: "CLOSE_MODE_ALL",
		leftDrawerWidth: 200
	}
	```
	
	Any NappDrawer constants can be passed as strings.
	
5. In your `app/controlers/index.js` use it like this:

	```
	$.drawer.open();
	```
	
	Any NappDrawer property or method can be get, set or called via the widget, but you can also access the module and instance directly via `$.drawer.module` and `$.drawer.instance`.

### Android
For Android, NappDrawer requires to receive views instead of windows. You can use the `platform` attribute to add conditional elements like the examples does for the centerView. An easier way to do this is to add a `module="xp.ui"` attribute to the `<Window>` elements and have a file in `app/lib/xp.ui.js` which has:

```
exports.createWindow = function(args) {
	return Ti.UI[OS_IOS ? 'createWindow' : 'createView'](args);
};
```

### open/close Left/Right Window
For your convenience, the widget exposes 4 additional methods to **ONLY** open or close either the left or right window. The NappDrawer module only provides `toggle Left/Right Window` and `is Left/Right WindowOpen` methods, which of course can be combined to get the same result.

## Changelog
- 1.0.1: Passing through event binding to the drawer instance.

## License

<pre>
Copyright 2014 Fokke Zandbergen

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