var globalUser = null;
var globalGlobalFuncion = new globalFunctions();//null;
var objGlobalUrl = new globalUrls();
//globalGlobalFuncion.setBack();

(function ($, window, document) {
    $(function () {

        globalUser = new currentUser();
        //globalGlobalFuncion = new globalFunctions();
        globalGlobalFuncion.configureSearch();

        try {
            Winbits.on("initialized", function () {
                globalUser.configureWidget();
                globalGlobalFuncion.widgetReady = true;
                if (globalGlobalFuncion.onWidgetReady != null) {
                    globalGlobalFuncion.onWidgetReady();
                }
            });
        }
        catch (e) {

        }
        setCurrentMenu();
        
    });

    setCurrentMenu = function () {
        var url = window.location.toString();
        $("#menuPrincipal .menu-li").each(function () {
            var $link = $(this);
            var bandera = false;
            $.each($(this).data("url").split('|'), function (index, valUrl) {
                if (url.indexOf(valUrl) > 0) {
                    $link.addClass("current");
                    bandera = true;
                    return false;
                }
            });
            if (bandera) {
                return false;
            }
        });
    };


})(window.jQuery, window, document);


function currentUser() {
    this.idUsuario = 0;
    this.bitsBalance = 0;
    this.bitsUtilizados = 0;
    this.ctlWidget = "#winbits-widget";
    this.eventName = "loggedin";
    this.onLogin = null;
    this.onLogOut = null;
    this.eventLogoutName = "loggedout";
    var objUser = this;

    this.setValues = function (idusuario, bitsbalance, bitsutilizados) {
        console.log(idusuario);
        this.idUsuario = idusuario;
        this.bitsBalance = bitsbalance;
        this.bitsUtilizados = bitsutilizados;
    }

    this.suscribLogin = function (method) {
        objUser.onLogin = method;
    };

    this.sucribLogOut = function (method) {

        objUser.onLogOut = method;
    };

    this.configureWidget = function () {
        console.log("configureWidget");
        try {
            Winbits.on(objUser.eventName, objUser.setValuesProfile);
            Winbits.on(objUser.eventLogoutName, objUser.logOutUser);
        }
        catch (e) {
        }
    };

    this.setValuesProfile = function (profile) {
        console.log("setValuesProfile ");
        objUser.idUsuario = profile.id;
        objUser.bitsBalance = profile.bitsBalance;
        console.log("idusuario:" + objUser.idUsuario);
        console.log(objUser.onLogin);
        if (null != objUser.onLogin) {
            objUser.onLogin(this);
        }
    };

    this.getobjUser = function () {
        return this;
    };

    this.logOutUser = function (e, profile) {
        objUser.idUsuario = 0;
        objUser.bitsBalance = 0;
        //alert("salimos");
        //alert(objUser.onLogOut);
        if (null != objUser.onLogOut) {
            objUser.onLogOut();
        }



    };

};


function globalFunctions() {
    this.btnBuscar = "#botonBuscar";
    this.txtBuscarSitio = "#txtBuscarSitio";
    this.urlSearch = "/busquedas/";
    this.onWidgetReady = null;
    this.widgetReady = false;
    var selfObject = this;

    this.configureSearch = function ($ctlBtnBuscar, $ctlTxt) {
        if ($ctlBtnBuscar == undefined) {
            $ctlBtnBuscar = $(selfObject.btnBuscar);
        }
        if ($ctlTxt == undefined) {
            $ctlTxt = $(selfObject.txtBuscarSitio);
        }

        $ctlBtnBuscar.click(
            function () {
                var strBuscar = $ctlTxt.val();
                strBuscar = globalGlobalFuncion.TrimStr(strBuscar);
                if (strBuscar == "") {
                    globalGlobalFuncion.sendMsg("Inserta un parámetro de búsqueda");
                    return;
                }
                if (strBuscar.length < 3) {
                    globalGlobalFuncion.sendMsg("Parámetro demasiado corto");
                    return;
                }
                if (strBuscar.length > 50) {
                    globalGlobalFuncion.sendMsg("Parámetro demasiada larga");
                    return;
                }
                var arrCadena = strBuscar.split(' ');
                if (arrCadena.length > 6) {
                    globalGlobalFuncion.sendMsg("Demasiados espacios en blanco");
                    return;
                }
                window.location.href = selfObject.urlSearch + strBuscar
            });

        $ctlTxt.keydown(
            function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    $ctlBtnBuscar.click();
                }
            });
    }

    this.formatMoney = function (numero, c, d, t) {
        var n = numero,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    this.msgBox = function (titulo, icon, msg) {
        var mensaje = "";
        mensaje += '<div class="confirmationContent noItems">';
        mensaje += '    <h2>' + titulo + '</h2>';
        mensaje += '        <div class="confirmation-icon">';
        mensaje += '            <span class="iconFont-' + icon + '" style="font-size: 70px !important"></span>';
        mensaje += '        </div>';
        mensaje += '    <div class="confirmation-content">';
        mensaje += '        <p>' + msg + '</p>';
        mensaje += '        <div class="confirmation-submit">';
        mensaje += '            <button class="btn close-modal" id="btncloseFancy">Aceptar</button>';
        mensaje += '        </div>';
        mensaje += '    </div>';
        mensaje += '</div>';
        return mensaje;
    }

    this.sendMsg = function (mensaje, titulo, icono) {
        // content: "<div class='gracias'><div class='contentModal' id='_msgGral'> <p>" + mensaje + "<p><button id='btncloseFancy' class='btn close-modal'>Aceptar</button></div> </div>",
        var tit, icon;
        if (titulo) {
            tit = titulo;
        } else {
            tit = 'Error';
        }
        if (icono) {
            icon = icono;
        } else {
            icon = 'close';
        }
        $.fancybox({
            showCloseButton: false,
            content: globalGlobalFuncion.msgBox(tit, icon, mensaje),
            closeBtn: false,
            afterLoad: function () {
                setTimeout(function () {
                    $("#btncloseFancy").click(function () {
                        parent.$.fancybox.close();
                    });
                }, 500);
            }
        });
    };

    this.showEsperar = function () {
        $.fancybox({
            content: "<div class='gracias' ><div class='contentModal' style='width:250px;' id='_msgGral'> <p>Espera un momento.</p><p><img src='https://s3.amazonaws.com/media.hipstore.com/ajax_loader.gif' /><p></div> </div>",
            showCloseButton: "hide",
            enableEscapeButton: false,
            hideOnOverlayClick: false,
            onComplete: function () {
                $("#fancybox-close").hide();
                $("#__btnclose").click(function () {
                    alert("__btnclose");
                });
            }
        });
    };
    this.hideEsperar = function () {
        $.fancybox.close();
    };

    this.GetQueryString = function (Name, Url) {

        var sPageURL = (Url === undefined ? window.location.search.substring(1) : Url);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] == Name)
                return sParameterName[1];
        }
    };

    this.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    };

    this.setCookie = function (cookie, value) {
        document.cookie =  cookie + "=" + value;
    };

    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    this.getAbsolutePath = function () {
        var loc = window.location;
        var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
        var abs = loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
        return abs.substring(7, abs.length - window.location.pathname.length);
    };

    this.TrimStr = function (strCadena) {
        return strCadena.replace(/^\s+|\s+$/gm, '');
    };



    this.setArrEstrellas = function (itemSelect) {

        var arrEstrellas = new Array();
        if (itemSelect.idTipoProducto == 2) {
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
        }
        else if (itemSelect.idTipoProducto == 3) {
            if (itemSelect.categoria != null) {
                arrEstrellas.push({ name: itemSelect.categoria });
            }
            if (itemSelect.subcategoria != null) {
                arrEstrellas.push({ name: itemSelect.subcategoria });
            }
        }
        itemSelect.tags = arrEstrellas;
    };

    this.setBack = function () {
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function () {                    
                    var hashLocation = location.hash;
                    var hashSplit = hashLocation.split("?history=1!/");
                    var hashName = hashSplit[1];
                    if (hashName !== '') {
                        var hash = window.location.hash;
                        if (hash === '') {                            
                            if (window.location.search.indexOf("history=1") < 0) {
                                //globalGlobalFuncion.setCookie("_history", true);                                
                                globalGlobalFuncion.setCookie("_history", true);                                
                                window.history.back();
                            }
                            
                        }
                    }
                });
            
                if (window.location.search.indexOf("history=1") < 0) {                    
                    if (window.location.href.indexOf("?") >= 0) {
                        window.history.pushState('forward', null, window.location.search + '&history=1');
                    }
                    else {
                        window.history.pushState('forward', null, '?history=1');
                    }
            }
        }

    };

    



};



$.fn.zones = function (options) {
    var defaults = {
        urlZones: "/servicios/GetZonasHome"
    },
    $thisCtl = null,
    init = function () {
        getZones().done(function (data) {
            $.each(data, function (index, zone) {
                $("<option/>", { "value": zone.id }).html(zone.name).appendTo($thisCtl);

            });
            $thisCtl.customSelect({
                //find('.clickoneroSelect').customSelect({
                claseIcon: 'clickoneroIcon',
                onChangeSelect: function (select) {
                    // función para el onchange del select, ejem: console.log($(select).val());
                }
            });
        });
    },
    getZones = function () {
        return $.ajax({
            type: "POST",
            url: defaults.urlZones,
            cache: false,
            contentType: "application/json; charset=utf-8"
        });
    };

    return this.each(function () {
        if (options) {
            defaults = $.extend(defaults, options);
        }
        $thisCtl = $(this);
        init();

    });
};


$.fn.buttonTop = function (options) {
    var defaults = {
    },
    $thisCtl = null,
        init = function () {
            var section = window.location.pathname.split("/");
            if (section.length > 1) {
                $thisCtl.find("li[data-section='" + section[1] + "']").addClass("current");
            }
        };

    return this.each(function () {
        $thisCtl = $(this);
        if (options) {
            defaults = $.extend(defaults, options);
        }
        init();
    });

};

var putCommas = function (numero) {
    var res;
    if (numero % 1) {
        var parts = numero.toString().split('.');
        res = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '.' + parts[1];
    } else {
        res = numero.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return res;
};

function globalUrls() {
    this.urlProduct = "/productos/";
    this.urlCampaign = "/campaigns/";
    this.urlServices = "/servicios/";
    this.urlViajes = "/viajes/";
    this.urlFunciones = "/functions/";
    this.urlMujeres = "/mujeres/";
    this.urlHombres = "/hombres/";
    this.varFecha = "seethefuture";

    this.getPF = function (fecha) {
        return (fecha == null) ? "" : "?" + this.varFecha + "=" + fecha;
    };

    this.setUrlProduct = function (item, f) {
        item.urlProduct = this.urlProduct + item.id + "/" + this.procStr(item.categoria) + "/" + this.procStr(item.marca) + "/" + this.procStr(item.nombre) + this.getPF(f);
        return item.urlProduct;
    };

    this.setUrlCampaign = function (camp, f, departamento) {

        if (departamento == "Productos" || departamento == null) {
            camp.urlCampaign = this.urlCampaign + camp.id + "/" + ((departamento == null) ? "" : this.procStr(departamento) + "/") + this.procStr(camp.nombre) + this.getPF(f);
        }
        else {
            //camp.urlCampaign = this.urlCampaign + camp.id + "/" + ((departamento == null) ? "" : this.procStr(departamento) + "/") + this.procStr(camp.nombre) + this.getPF(f);
            var urlSeccion = "";
            if (departamento == "Hombre") {
                urlSeccion = this.urlHombres;
            }
            else if (departamento == "Mujer") {
                urlSeccion = this.urlMujeres;
            }
            camp.urlCampaign = urlSeccion + "campaigns/" + camp.id + "/" + this.procStr(camp.nombre) + this.getPF(f);
        }
        return camp.urlCampaign;
    };

    this.setUrlServices = function (item, f) {
        item.urlServices = this.urlServices + item.id + "/" + this.procStr(item.categoria) + "/" + this.procStr(item.marca) + "/" + this.procStr(item.nombre) + this.getPF(f);
        item.urlProduct = item.urlServices;
        return item.urlProduct;
    };
    //objGlobalUrl
    this.setUrlViajes = function (item, f) {
        item.urlServices = this.urlViajes + item.id + "/" + this.procStr(item.categoria) + "/" + this.procStr(item.nombre) + this.getPF(f);
        item.urlProduct = item.urlServices;
        return item.urlProduct;
    };

    this.getUrlSecciones = function (departamento, tipo, valor, f) {
        if (departamento.toLowerCase() == "mujer") {
            departamento = "mujeres";
        }
        else if (departamento.toLowerCase() == "hombre") {
            departamento = "hombres";
        }
        //encodeURIComponent(valor)
        return "/" + departamento.toLowerCase() + "/" + tipo + "/" + valor + "/" + this.getPF(f);
    };

    this.procStr = function (cadena) {
        var arrChar = ["[á]", "[é]", "[í]", "[ó]", "[ú]", "[:]", "[ñ]", "[&]", "[!]", "[¡]", "[#]", "[?]", "[.]", "[¿]", "[ ]", "[+]", "[/]", "[%]"];
        var arrReplace = ["a", "e", "i", "o", "u", "", "", "n", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        //cadena = cadena.toLowerCase().replace(rplus,"").replace(rpunto,"").replace(rcoma, "").replace(rper,"").replace(re, "-").replace("ñ", "n").replace("&", "-").replace("!","").replace("#","").replace("?","").replace(".","").replace("¡","");
        for (var i = 0; i < arrChar.length; i++) {
            var re = new RegExp(arrChar[i], 'g');
            cadena = cadena.replace(re, arrReplace[i]);
        }
        return cadena;
    };

    this.evalUrlGlobal = function (item, fecha) {

        switch (item.idTipoProducto) {
            case 1:
                this.setUrlProduct(item, fecha);
                break;
            case 2:
                this.setUrlServices(item, fecha);
                break;
            case 3:
                this.setUrlViajes(item, fecha);
                break;
        }
    };




   

    //Url Peticiones



};












///////////////////ANALITICTS//////////////////////////












