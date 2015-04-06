(function(){
	var loadFiles = function (path) {
		var escribe = '<link rel="stylesheet" href="' + path + 'jquery-ui-1.9.2.custom.min.css">\n';
		escribe += '<script src="' + path + 'jquery-ui-1.9.2.custom.min.js"><\/script>\n';
		escribe += '<script src="' + path + 'jquery-ui-datepicker-es.js"><\/script>\n';
		document.write(escribe);
	};
	//loadFiles("clickoneroInclude/include/js/libs/jQueryUI1.9.2/");
})();