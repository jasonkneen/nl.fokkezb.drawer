$.drawer.open();

function toggle(e) {
	var fn = 'toggle' + e.source.window + 'Window';
	$.drawer[fn]();
}
