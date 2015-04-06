(function(){
    var loadFiles = function (path) {        
        var absPth = getAbsolutePath();
        var strUrl = getAbsolutePath().substring(0, absPth.length - window.location.pathname.length);
        
        path = strUrl + path;

       alert(path);

		var escribe = '<script src="' + path + 'modernizr-2.6.2.js"><\/script>\n';
		escribe += '<script src="' + path + 'jquery-1.8.3.min.js"><\/script>\n';
		escribe += '<script src="' + path + 'jquery.browser.min.js"><\/script>\n';
		escribe += '<script src="' + path + 'jQueryUI1.9.2/jquery-ui-1.9.2.js"><\/script>\n';
		escribe += '<script src="' + path + 'swiper/swiper.js"><\/script>\n';
		escribe += '<script src="' + path + 'fancybox/fancybox.js"><\/script>\n';
		escribe += '<script src="' + path + 'zoom/jquery.zoom.js"><\/script>\n';
		escribe += '<script src="' + path + 'masonry.pkgd.min.js"><\/script>\n';

		document.write(escribe);
    };

    function getAbsolutePath() {
        var loc = window.location;
        var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
        var abs = loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
        return abs.substring(0, absPth.length - window.location.pathname.length);

    }
	//loadFiles("/clickoneroInclude/include/js/libs/");
})();