(function(){
    var loadFiles = function (path) {

        var absPth = getAbsolutePath();
        var strUrl = getAbsolutePath().substring(0, absPth.length - window.location.pathname.length);
        
        path = strUrl + path;

       alert(path);

		var escribe = '<script src="' + path + 'idangerous.swiper-2.4.3.js"><\/script>\n';
		escribe += '<script src="' + path + 'idangerous.swiper.scrollbar-2.0.js"><\/script>\n';
		document.write(escribe);
	};

	function getAbsolutePath() {
	    var loc = window.location;
	    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
	    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
	}

	//loadFiles("/clickoneroInclude/include/js/libs/swiper/");
})();