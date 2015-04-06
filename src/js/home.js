(function ($) {
    var viewModel = new Object();
    var fecha = null;
    var showStock = 0;
    var arrCampaignHome = null;
    var limitViajes = 10;
    var limitServices = 9;
    var limitCampaigs = 5;
    var limitItems = 30;    
    var isLoadCtl = {
        siMoreSold: false,
        siTravel: false,
        siServices: false,
    };

    var defaults = {
        urlCampaigsHome: objGlobalUrl.urlFunciones + "GetBannersHome",
        urlCampaigsSecundary: objGlobalUrl.urlFunciones +   "GetCampaignSecundary",
        urlVendidos: objGlobalUrl.urlFunciones +  "/GetItemsVenta",
        urlViajes: objGlobalUrl.urlFunciones + "GetServicesHome",
        urlCiudades: objGlobalUrl.urlFunciones  + "GetCitiesServices",
        //vfecha: "f",
        vfecha: "seethefuture",
        urlProductos: "/productos/index/",
        urlCampaign: "/campaigns/index/",
        urlServicios: "/serviciosapp/index",
        urlTravel: "/viajes/index",
        
        urlHomeServicios: "/serviciosapp/home"
    };

    $(function () {
        initVars();
        initViewModel();
        initCampings();        
        configureControls();
        //initItemsMoreSold();
        //loadTravel();
        //loadServices();
        //loadCities();
    });

    $(window).scroll(function () {        
        //configureMoreSold();
        //configureTravel();
        initCtls(initItemsMoreSold, "siMoreSold", "divMoreSold");
        initCtls(loadTravel, "siTravel", "divViajes");
        initCtls(loadServices, "siServices", "divServicios");
    });

    initCtls = function (functionctl, typeLoad, ctl) {
        if (isLoadCtl[typeLoad]) return;
        var fold = getFold();
        var topElement = getTopElement($("#" + ctl));        
        if (fold >= topElement) {
            isLoadCtl[typeLoad] = true;
            functionctl();
        }
    };
    

    getTopElement = function (element) {
        return $(element).offset().top;/// $(element).height();
    };
    getFold = function () {
        return $(window).height() + $(window).scrollTop();
    };

    processUrlItem = function (data) {        
        $.each(data, function (index, objItem) {            
            //objItem.urlProduct = defaults.urlProductos + "?id=" + objItem.id + ((fecha != null) ? "&f=" + fecha : "");
            objGlobalUrl.setUrlProduct(objItem, fecha);
        });
    };

    processUrlCampaign = function (data) {
        $.each(data, function (index, objCampaign) {
            //objCampaign.urlCampaign = defaults.urlCampaign + "?id=" + objCampaign.id + ((fecha != null) ? "&f=" + fecha : "");            
            objGlobalUrl.setUrlCampaign(objCampaign, fecha, null);
        });
    };

    processUrlCampHome = function (data) {
        $.each(data, function (index, objCampaign) {
            objCampaign.id = objCampaign.idPrimary;
            switch (objCampaign.idType) {
                case 1:
                    //objCampaign.urlCampaign = defaults.urlCampaign + "?id=" + objCampaign.idPrimary + ((fecha != null) ? "&f=" + fecha : "");
                    objGlobalUrl.setUrlCampaign(objCampaign, fecha, null);
                    break;
                case 2:
                    var url = "";
                    switch (objCampaign.idTipoProducto) {
                        case 1:
                            //url = defaults.urlProductos;
                            url = objGlobalUrl.setUrlProduct(objCampaign, fecha);
                            break;
                        case 2:
                            url = objGlobalUrl.setUrlServices(objCampaign, fecha);
                            break;
                        case 3:
                            url = objGlobalUrl.setUrlViajes(objCampaign, fecha);
                            break;
                    }
                    objCampaign.urlCampaign = url;
                    break;
                    //objCampaign.urlCampaign = url + "?id=" + objCampaign.idPrimary + ((fecha != null) ? "&f=" + fecha : "");
            }});

    };

    processUrlServices = function (data) {
        $.each(data, function (index, objServicio) {
            //setArrEstrellas(objServicio);
            //objServicio.urlServices = defaults.urlServicios + "?id=" + objServicio.id + ((fecha != null) ? "&f=" + fecha : "");
            globalGlobalFuncion.setArrEstrellas(objServicio);
            objGlobalUrl.setUrlServices(objServicio, fecha);
        });
    };

    processUrlViajes = function (data) {
        $.each(data, function (index, objServicio) {
            globalGlobalFuncion.setArrEstrellas(objServicio);
            //objServicio.urlServices = defaults.urlTravel + "?id=" + objServicio.id + ((fecha != null) ? "&f=" + fecha : "");
            objGlobalUrl.setUrlViajes(objServicio, fecha);
        });
    };

    setArrEstrellas = function (itemSelect) {
        var arrEstrellas = new Array();
        //arrEstrellas.push({ name: itemSelect.categoria });
        if (itemSelect.subcategoria != null) {
            arrEstrellas.push({ name: itemSelect.subcategoria });
        }
        if (itemSelect.listZones != null) {
            if (itemSelect.listZones.length > 1) {
                arrEstrellas.push({ name: "Multizona" });
            }
            else {
                for (var i = 0; i < itemSelect.listZones.length; i++) {
                    if (i >= 1) break;
                    arrEstrellas.push({ name: itemSelect.listZones[i].name });
                }
            }
        }
        itemSelect.tags = arrEstrellas;
    };


    initVars = function () {
        if (null != globalGlobalFuncion) {
            fecha = globalGlobalFuncion.GetQueryString(defaults.vfecha);
        }
        showStock = $("#hddShowStock").val();
    };


    initItemsMoreSold = function () {
        var parametros = "{limit:"+ limitItems + ((fecha!=null)? ",fecha:'" + fecha + "'":"") + " }";
        getServer(defaults.urlVendidos, parametros).done(function (data) {
            processUrlItem(data);
            viewModel.itemsSold(data);
            configureProduct();
            configureWidget();
            //setTimeout($("img.lazyProduct").lazyload,1000);
        });
    };

    
    configureWidget = function () {       
        if (globalGlobalFuncion.widgetReady) {
            initValidaStock();
        }
        else {
            globalGlobalFuncion.onWidgetReady = initValidaStock;
        }
    };

    initValidaStock = function(){
        $("#carruselProductos").validaStock({
            ctlRadio: "div.clickoneroFP-productSize div div.radio-wrapper input",
            ctlSpan: ".span.radio-span",
            varidsku: "idobj",
            classBtn: "clickoneroBtnCart",
            classSoldout: "radio-soldout",
            classDivSize: "clickoneroFP-productSize",
            success: function () {                
                $("#carruselProductos").vincularAddToCart({
                    classButton: "input.clickoneroBtnCart",
                    classSize: "span.radio-selected",
                    ctlCantidad: "input.hddCantidad",
                    idCtlSku: "idobj",
                    noShowLabel: $("#hddShowStock").val(),
                    siLblStock: true,
                    classItem: ".clickoneroFP-item",
                });

                console.log("sizesoldOutDetalle sold out: ");
                $("#carruselProductos").soldOut();
                //$("#divItems").favoritos();
            },
        });
    };

    

    getServer = function (urlS, params) {
        return $.ajax({
            type: "POST",
            url: urlS,
            data: params,
            cache: false,
            contentType: "application/json; charset=utf-8"
        });
    };

    

    initViewModel = function () {
        viewModel = {
            campaingHome: ko.observableArray([]),
            campaingSecundary: ko.observableArray([]),
            itemsSold: ko.observableArray([]),
            viajes: ko.observableArray([]),
            servicios: ko.observableArray([]),
            cities:ko.observableArray([]),
        };
        ko.applyBindings(viewModel);
    };

   

    initCampings = function () {        
        var parametros = "{"  +((fecha != null) ? "f:'" + fecha + "'": "") + "}";
        getServer(defaults.urlCampaigsHome, parametros).done(function (data) {
            arrCampaignHome = data;
            //processUrlCampaign(data);
            processUrlCampHome(data);
            viewModel.campaingHome(data);
            $(".img_Home").first().load(function () {
                configueCtlCampaigs();
            });            
            initCampingsSecundary();
            //$("img.img_Home").lazyload();
            //setTimeout(configueCtlCampaigs, 2000);
        });
    };

    initCampingsSecundary = function () {
        var parametros = "{" + ((fecha != null) ? "f:'" + fecha  + "'": "") + "}";
        getServer(defaults.urlCampaigsSecundary, parametros).done(function (data) {
            //validateCampaignSecundary(data);            
            processUrlCampaign(data);
            viewModel.campaingSecundary(data);
            $("#divCampSec img.lazyload").lazyload();
            //setTimeout($("img.imgCampSec").lazyload,1000);
        });
        $('.clickoneroToolTip').toolTip({ clase: 'clickoneroTool-Tip' });
    };

    validateCampaignSecundary = function (data) {        
        $.each(arrCampaignHome, function (i, campH) {
            $.each(data, function (index, camp) {                
                if (camp.id == campH.id) {
                    console.log(campH.id);
                    data.splice(index,1);
                    return false;
                }
            });
        });
    };
    

    initModal = function () {
        configureCtlModal();
        initWidgetModal();
        //cargarMapa();
    };

    initWidgetModal = function () {
        if (globalGlobalFuncion.widgetReady) {
            configureModalWidget();
        }
        else {
            configureModalWidget.onWidgetReady = initValidaStock;
        }
    };


    configureModalWidget = function () {
        $(".clickoneroModalBody").validaStock({
            ctlRadio: "div.clickoneroProductSize div.radio-wrapper input",
            ctlSpan: "div.clickoneroProductSize div.radio-wrapper span.radio-span",
            varidsku: "idobj",
            classBtn: "clickoneroBtnCart",
            classSoldout: "radio-soldout",
            classDivSize: "clickoneroFP-productSize",
            success: function () {                      
                $(".clickoneroModalBody").vincularAddToCart({
                    classButton: "input.clickoneroBtnCart",
                    classSize: "span.radio-selected",
                    ctlCantidad: "input.select-input",
                    idCtlSku: "idobj",                    
                    siLblStock: false,
                    classItem: ".clickoneroProductDescription",
                    onclickAddItem: function () {
                        $.fancybox.close();
                    }
                });

                console.log("configureModalWidget");
                var contador = 0;
                $(".clickoneroModalBody").find(".radio-wrapper input").each(function (index, item) {
                    console.log("idsku " + $(this).data("idobj"));
                    if ($(this).data("idobj") != undefined) {
                        contador++;
                    }
                });
                console.log("contador: " + contador);
                if (contador == 0) {
                    $(".clickoneroModalBody").find(".clickoneroBtnCart").remove();
                    $(".clickoneroModalBody").find(".clickoneroProductSubmit").html("<h4>Agotado</h4>");
                }
                
            },
        });

    };



    configureCtlModal = function () {        
        //$('.clickoneroProductColor, .clickoneroProductSize').customRadio();
        $(".clickoneroProductSize").customRadio();
        $(".clickoneroProductColor").customRadio();
        

        $('.clickoneroProductImageCarousel-carrusel').carruselVerticalSwiper({
            slide: 'clickoneroProductImageCarousel-slide',
            wrapper: 'clickoneroProductImageCarousel-wrapper',
            scrollbar: '.clickoneroProductImageCarousel-scrollbar'
        });
        $('.slider-input').customSlider({});
        
        $('.clickoneroProductImage').imageProduct({
            container: '.clickoneroProductMainImage',
            imgs: '.clickoneroProductImageCarousel-slide'
        });

        $('.clickoneroProductQuantity .clickoneroSelect').customSelect({
            onChangeSelect: function (select) {
            }
        });
    };



    configueCtlCampaigs = function () {        

        $('.clickoneroHB-carrusel').carouselSwiper({
            optionsSwiper: {
                slideClass: 'clickoneroHB-slide',
                wrapperClass: 'clickoneroHB-wrapper',
                grabCursor: true,
                loop: true,
                autoplay: 5000
            },
            arrowLeft: '.iconFontArrow-prev',
            arrowRight: '.iconFontArrow-next',
            loop: true,
            slideCSS: '.clickoneroHB-slide',
            calculateHeight: true
        });

        $('.travel-carrusel').carouselSwiper({
            optionsSwiper: {
                slideClass: 'travel-slide',
                wrapperClass: 'travel-wrapper',
                grabCursor: true,
                loop: true,
                slidesPerView: 3,
                onSlideClick: function (swiper) {
                    $('.clickoneroFP-productSize').customRadio({ justClick: true });
                },
                onSwiperCreated: function (swiper) {
                    $(swiper.activeSlide()).find('.clickoneroFP-overlay').trigger('click');
                    $(swiper.activeSlide()).find('.clickoneroToolTip').trigger('mouseover');
                }
            },
            arrowLeft: '.iconFont-left',
            arrowRight: '.iconFont-right',
            loop: true,
            slideCSS: '.travel-slide',            
            slidesNum: 3,
            calculateHeight: true
        });

        $('.iconBlock').point();
        $('.clickoneroFancybox').fancyBox({
            afterShow: initModal
        });

        $('.mapFancybox').fancyBox({
            afterShow: cargarMapa
        });

    };

    configureProduct = function () {
        $('.clickoneroFilter-div').customCheckbox();
        $('.clickoneroFP-productSize').customRadio();

        $('.products-carrusel').carouselSwiper({
            optionsSwiper: {
                slideClass: 'products-slide',
                wrapperClass: 'products-wrapper',
                grabCursor: true,
                loop: true,
                slidesPerView: 5,
                onSlideClick: function (swiper) {
                    $('.clickoneroFP-productSize').customRadio({ justClick: true });
                },
                onSwiperCreated: function (swiper) {
                    $(swiper.activeSlide()).find('.clickoneroFP-overlay').trigger('click');
                    $(swiper.activeSlide()).find('.clickoneroToolTip').trigger('mouseover');
                }
            },
            arrowLeft: '.iconFont-left',
            arrowRight: '.iconFont-right',
            loop: true,
            slideCSS: '.products-slide',
            calculateHeight: true,
            slidesNum: 5
        });
    };

    configureCarruselTravel = function () {
        console.log("configureCarruselTravel");
        $('.travel-carrusel').carouselSwiper({
            optionsSwiper: {
                slideClass: 'travel-slide',
                wrapperClass: 'travel-wrapper',
                grabCursor: true,
                loop: true,
                slidesPerView: 3,
                onSlideClick: function (swiper) {
                    $('.clickoneroFP-productSize').customRadio({ justClick: true });
                },
                onSwiperCreated: function (swiper) {
                    $(swiper.activeSlide()).find('.clickoneroFP-overlay').trigger('click');
                    $(swiper.activeSlide()).find('.clickoneroToolTip').trigger('mouseover');
                }
            },
            arrowLeft: '.iconFont-left',
            arrowRight: '.iconFont-right',
            loop: true,
            slideCSS: '.travel-slide',
            calculateHeight: true,
            slidesNum: 3
        });
    };


    loadTravel = function () {
        var url = defaults.urlViajes;
        var parametros = "{idTipoProducto:3,limit:" + limitViajes + ((fecha != null) ? ",fecha:'" + fecha  + "'": "") + "}";
        getServer(url, parametros).done(function (data) {            
            processUrlViajes(data);
            viewModel.viajes(data);
            configureCarruselTravel();
            //setTimeout($("img.lazyViajes").lazyload, 1000);
        });
    };

    loadServices = function () {
        var url = defaults.urlViajes;
        var parametros = "{idTipoProducto:2,limit:" + limitServices + ((fecha != null) ? ",fecha:'" + fecha  + "'": "") + "}";
        getServer(url, parametros).done(function (data) {
            processUrlServices(data);
            viewModel.servicios(data);
            configureSelect();
            $("#divServicios img.lazyload").lazyload();
            //setTimeout($("img.lazyServicios").lazyload, 1000);
        });
    };

    configureSelect = function () {
        
    };

    loadCities = function () {
        var urlCities = defaults.urlCiudades;
        var parametros = "{" + ((fecha != null) ? "fecha:'" + fecha + "'" : "") + " }";
        getServer(urlCities, parametros).done(function (data) {
            viewModel.cities(data);
            $("#comboZonas").customSelect({
                onChangeSelect: function (select) {
                    // función para el onchange del select, ejem: console.log($(select).val());
                    console.log($(select).val());
                    window.location.href = objGlobalUrl.urlServices + "?city=" + $(select).val();
                }
            });
        });
    };


    configureControls = function () {        
        $('.clickoneroPreloader').preloader();
    };

    cargarMapa = function () {

        var lugares = $('#coord').val().split(";");
        var titles = $('#title').val().split(",");
        var coord, newMap;
        var venue = new Array();

        for (var i = 0; i < lugares.length; i++) {
            coord = lugares[i].split(",");
            newMap = new google.maps.LatLng(parseFloat(coord[0]), parseFloat(coord[1]));
            venue.push(newMap);
        }

        var mapOptions = {
            zoom: 12,
            center: venue[1]
        }
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        for (var i = 0; i < venue.length; i++) {
            var marker = new google.maps.Marker({
                position: venue[i],
                map: map,
                title: titles[i]
            });
        }
    };

})(jQuery);