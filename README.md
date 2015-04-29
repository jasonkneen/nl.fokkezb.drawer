# Alloy Drawer Widget - Tests

This is the test branch for the [Alloy](http://appcelerator.com/alloy) [Drawer Widget](https://github.com/FokkeZB/nl.fokkezb.drawer/tree/master).

* Source code: [https://github.com/FokkeZB/nl.fokkezb.drawer/tree/master](https://github.com/FokkeZB/nl.fokkezb.drawer/tree/master)
* Test app: [https://github.com/FokkeZB/nl.fokkezb.drawer/tree/test](https://github.com/FokkeZB/nl.fokkezb.drawer/tree/test)

## Preparing [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

The repo has a `Gruntfile.js` for [Grunt](http://gruntjs.com/getting-started) to replace the app's `app/widgets/nl.fokkezb.drawer` with a copy from the `master` branch. The configuration assumes to find a working copy with this branch at `../master`.

Install Grunt and the dependencies via:

	$ sudo npm i -g grunt
	$ sudo npm install

## Running
To replace the app's copy of the widget with a fresh copy of master and build the app for the simulator simply execute:

	$ grunt
	
There are also tasks to build for Android (`grunt android`) or to just update the widget from master (`grunt update`).

## License

	The MIT License (MIT)
	
	Copyright (c) 2015 Fokke Zandbergen
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.