(function ($, window, document) {
    $(function () {
        
        var objMenu = new FunctionsMenu();
        objMenu.init();
    });

    function FunctionsMenu() {        
        var objMenuGlobal = null;
        var arrCampagnas = ["EndNow","StartNow","Principal"];
        var limitCamp = {
            "Principal": 12,
            "EndNow":5,
            "StartNow":5,
            "Categorias": 12
        };
        var strSecciones = {
            "Mujer": "mujeres",
            "Hombre": "hombres",
            "Infantil": "infantil",
            "HogarTecnologia": "hogartecnologia",
            "Servicios": "servicios",
            "SaludBelleza":"saludybelleza"
        };
        var siSection = {
            Mujer: false,
            Hombre: false,
            Infantil: false,
            HogarTecnologia: false,
            SaludBelleza: false,
            Servicios: false,
            Viajes:false,
        };

        this.init = function () {            
            getMenu().done(
                function (data) {
                    objMenuGlobal = data;
                    configureEventMenu();
                    //fillSections();
                });            
        };

        configureEventMenu = function () {
            $("#menuPrincipal a.menu-a").each(function (index, ancla) {
                //console.log($(ancla).text());
                $(ancla).on("mousemove", function () {
                    fillByProduct($(ancla).data("section"), $(ancla).data("type"), this);
                });
            });

            $("#menuPrincipal li.current a.menu-a").each(                
                function (index, ancla) {                   
                    fillByProduct($(ancla).data("section"), $(ancla).data("type"), this);
                });
        };

        fillByProduct = function (section,type,ancla) {
            if (siSection[section]) return;
            siSection[section] = true;
            if (type == "product") {
                fillSingleSection(getSectionMenu(section));
            }
            else if (type == "services") {                
                fillServices(getSectionMenu(section));
            }
            var $papa = $(ancla).parent().parent();
            $papa.find("img").each(function (index, img) {
                if ($(img).data("original") != undefined) {
                    var urlImg = $(img).attr("data-original");
                    $(img).attr("src", urlImg);                    
                }
            });
        };

       


        fillSections = function () {
            var objMujer = getSectionMenu("Mujer");            
            fillSingleSection(objMujer);

            var objHombre = getSectionMenu("Hombre");
            fillSingleSection(objHombre);

            var objInfantil = getSectionMenu("Infantil");
            fillSingleSection(objInfantil);

            var objHogar = getSectionMenu("HogarTecnologia");
            fillSingleSection(objHogar);

            var objSaludBelleza = getSectionMenu("SaludBelleza");
            fillServices(objSaludBelleza);

            var objServicios = getSectionMenu("Servicios");
            fillServices(objServicios);

            var objViajes = getSectionMenu("Viajes");

            configureBanners();
        };

        configureBanners = function () {
            $('.ck-banner-campaing').each(function () {
                
                if ($(this).find('p').text().length > 20) {
                    $(this).toolTip({ clase: 'clickoneroTool-Tip', tipHTML: false });
                }
            });
        };



        getSectionMenu = function (section) {            
            for (var i = 0; i < objMenuGlobal.ItemsMenu.length; i++) {
                var menuSection = objMenuGlobal.ItemsMenu[i];                
                if (menuSection.Section == section) {
                    return menuSection;
                }
            }
            return null;
        };

        fillSingleSection = function (objMenu) {
            fillCampaignSection(objMenu);
            fillCategoriesSection(objMenu);
            fillBannerSection(objMenu);
        };

        fillCampaignSection = function (objMenu) {
            
            for (var i = 0; i < arrCampagnas.length; i++) {
                var idCtl = "#lista" + objMenu.Section + arrCampagnas[i];
                if (objMenu.Campaigs[arrCampagnas[i]]) {
                    if (objMenu.Campaigs[arrCampagnas[i]].length == 0) {
                        $("#titulo" + objMenu.Section + arrCampagnas[i]).hide();
                    }
                }
                else {
                    $("#titulo" + objMenu.Section + arrCampagnas[i]).hide();
                }

                fillSingleList($(idCtl), objMenu.Campaigs[arrCampagnas[i]], limitCamp[arrCampagnas[i]], objMenu.Section, "campaign");
            }
        };

        fillCategoriesSection = function (objMenu) {
            var idCtl = "#lista" + objMenu.Section + "Categorias";
            fillSingleList($(idCtl), objMenu.Categories, limitCamp["Categorias"], objMenu.Section, "category");
        };


        fillSingleList = function ($ctl, listaItems, limit, section, type) {
            if (listaItems == undefined) {
                return;
            }

            for (var i = 0; i < listaItems.length; i++) {
                if (i >= limit) {
                    break;
                }
                var item = listaItems[i];
                var strValor = item.nombre;               
                
                
                var urlItem = getUrlItem(item, section, type);
                var $ancla = $("<a/>", {"href":urlItem}).html(strValor);
                var $lista = $("<li/>");
                $ancla.appendTo($lista);
                $lista.appendTo($ctl);                
            }
        };

        getUrlItem = function (item, section, type) {
            var strValor = item.nombre;
            if (strValor.indexOf("/") >= 0) {
                strValor = strValor.replace("/", "%2F");
            }
            if (type == "campaign") {
                return "/" + strSecciones[section] + "/campaigns/" + item.id + "/" + encodeURIComponent(globalGlobalFuncion.TrimStr(strValor)) + "/";
            }
            else if (type == "category") {                
                return "/" + strSecciones[section] + "/categorias/" + encodeURIComponent(globalGlobalFuncion.TrimStr(strValor)) + "/";
            }
            return "";
        };



        fillBannerSection = function (objMenu) {
            var idCtl = "#div" + objMenu.Section + "Banner";
            fillSingleBanner($(idCtl), objMenu.Campaigs["Banner"], objMenu.Section);
        };

        fillSingleBanner = function ($ctl, listaBanners, section) {
            for (var i = 0; i < listaBanners.length; i++) {
                var banner = listaBanners[i];
                var urlCampaign = getUrlItem(banner, section, "campaign");
                var $divGlobal = $("<div/>", { "class": "subMenuCol-banner ck-banner-campaing" });
                var $ancla = $("<a/>", { "href": urlCampaign });
                var $img = $("<img/>", { "src": "//" + banner.urlImgMedim });
                var $divColService = $("<div/>", { "class": "subMenu-col-service" }).html("<p>" + banner.nombre + "</p>");
                $img.appendTo($ancla);
                $divColService.appendTo($ancla);
                $ancla.appendTo($divGlobal);
                $divGlobal.prependTo($ctl);
            }
        };


        fillServices = function (objMenu) {
            fillZones(objMenu);
        };

        fillZones = function (objMenu) {
            var $ctl = $("#listaCiudades" + objMenu.Section);
            for (var i = 0; i < objMenu.Zones.length; i++) {
                var zone = objMenu.Zones[i];
                var urlItem = "/" + strSecciones[objMenu.Section] + "?city=" + encodeURIComponent(zone.texto);
                var $ancla = $("<a/>", { "href": urlItem }).html(zone.texto);
                var $lista = $("<li/>");
                $ancla.appendTo($lista);
                $lista.appendTo($ctl);
            }
        };



        getMenu = function () {
            return $.ajax({
                type: "POST",
                url: "/functions/getMenuTop",
                cache: false,
                contentType: "application/json; charset=utf-8"
            });
        };

        


    };

})(window.jQuery, window, document);
