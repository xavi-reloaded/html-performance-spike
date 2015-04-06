
$.fn.validaStock = function (options) {
    var $obj = null, defaults =
        {
            ctlRadio: "div.looqProductSize div.looqRadioWrapper input",
            ctlSpan: "div.looqProductSize div.looqRadioWrapper span",
            varidsku: "idsku",
            variditem:"iditem",
            classBtn: "looqBtn looqBtnCart",
            classSoldout: "looqRadioSoldout",
            classDivSize: "looqProductSize",
            success: null,
            siLlblStock: false,
            ctlLabel: "#lblStock_",
            noShowLabel: 10,
            ctlTxtLabel: "span",

        },
        validaStock = function () {           

            var strIds = new Array();            
            $obj.find(defaults.ctlSpan).hide();
            
            $obj.find(defaults.ctlRadio).each(function () {
                strIds.push($(this).data(defaults.varidsku));
            });            
            Winbits.getSkuProfilesInfo({
                ids: [strIds],               
            }).done(function (data) {
                
                var idItemActual = 0;
                var stockActual = 0;

                

                $obj.find(defaults.ctlRadio).each(function () {
                    var idsku = $(this).data(defaults.varidsku);
                    var $ctlRadio = $(this);
                    if ($ctlRadio.data("iditem") != idItemActual) {
                        if (defaults.siLlblStock && idItemActual > 0 && stockActual > 0 && stockActual <= defaults.noShowLabel  ) {
                            $(defaults.ctlLabel + idItemActual).show().find(defaults.ctlTxtLabel).html(stockActual);
                        }
                        idItemActual = $ctlRadio.data("iditem");
                        stockActual = 0;
                    }  
                    $.each(data.response, function (index, element) {
                        if (element.id == idsku) {                                                        
                            var stock = element.stock;//(element.quantityOnHand - element.quantityReserved);
                            stockActual += stock;
                            $ctlRadio.prev().show();
                            $ctlRadio.parent().find(".radio-text").show();
                            $ctlRadio.attr("data-stock", stock);                            
                            if (stock < 1 && element.quantityOnHand >= 0) {
                                
                                $ctlRadio.parent().find("span").addClass(defaults.classSoldout);
                                $ctlRadio.next().unbind("click");
                                $ctlRadio.remove();
                                
                            }
                            return false;
                        }
                    });
                });
                if (defaults.success != null) {                    
                    defaults.success($obj);
                }
            });
        };

    return this.each(function () {

        if (options) {
            defaults = $.extend(defaults, options);
        }
        $obj = $(this);
        validaStock();

        //if (null != Winbits.getSkuProfilesInfo) {
        //    validaStock();
        //}
    });
}

$.fn.vincularAddToCart = function (options) {
    var $obj = null, defaults = {
        classButton: "input.looqBtnCart",
        classSize: "span.looqRadioSpanSelected",
        ctlCantidad: "select.sportSelect",
        idCtlSku: "idsku",
        classBits: "span.sportSliderAmount",
        detail: true,
        classItem: ".clickoneroFP-item",
        onclickAddItem: null,
        ctlBits: "",
        idCampaign: null,
        idType:null,
    },
    bindClick = function () {        
        
        $obj.find(defaults.classItem).each(function () {            
            var $divProduct = $(this);            
            $divProduct.find(defaults.classButton).click(function () {
                var $ctlBoton = $(this);
                
                console.log(defaults.classSize);
                var $talla = $divProduct.find(defaults.classSize);
                if ($talla.html() == undefined) {
                    globalGlobalFuncion.sendMsg("Selecciona una talla o modelo");
                }
                else {
                    var numeroBits = 0;
                    numeroBits = (defaults.ctlBits != "") ? $(defaults.ctlBits).val() : 0;
                    if (globalUser.idUsuario > 0) {                        
                        if (globalUser.bitsBalance < numeroBits) {
                            globalGlobalFuncion.sendMsg("El número de winbits que intentas utilizar es mayor a la cantidad de winbits que tienes en tu estado de cuenta.", "No tienes suficientes winbits", "bit");
                            return;
                        }
                    }
                    var cantidad = $divProduct.find(defaults.ctlCantidad).val();
                    if (cantidad == undefined) {
                        globalGlobalFuncion.sendMsg("Selecciona una cantidad");
                        return;
                    }
                    $ctlBoton.attr("disabled", "disabled");
                    var idSku = $talla.next().data(defaults.idCtlSku);
                    var parametros = { id: idSku, quantity: cantidad, bits: numeroBits };
                    if (defaults.idCampaign != null) {
                        parametros.campaign = defaults.idCampaign;
                        parametros.type = defaults.idType;
                    }
                    //{ id: $talla.next().data(defaults.idCtlSku), quantity: cantidad, bits: numeroBits, campaign:defaults.idCampaign, type:defaults.idType }
                    Winbits.addToCart(parametros).always(function () {
                        $ctlBoton.removeAttr('disabled');
                        if (null != defaults.onclickAddItem) {
                            defaults.onclickAddItem();
                        }
                    });
                    
                }

            });
        });
    };

    return this.each(function () {
        
        if (options) {
            defaults = $.extend(defaults, options);
        }
        $obj = $(this);
        bindClick();
    });
}

$.fn.sizesoldOutDetalle = function (options) {
    var $content = null, defaults = {
        classButton: "div.sportProductSubmit",
        classSoldOut: "div.sportProductImageSoldOut",
        classInsert: "sportProductMainImage",
        detalleProducto: false,
        success: null,
    },
    procSoldOut = function () {
        var $radios = $content.find("input[type='radio']");
        console.log("length radios "  + $radios.length);
        if ($radios.length == 0) {
            if (!defaults.detalleProducto) {
                $content.parent().find(defaults.classButton).html("<h3>Agotado</h3>");
                $("<div/>", { "class": defaults.classSoldOut }).html("<h3>Agotado</h3>").insertAfter("." + defaults.classInsert);
            }
            else {
                //$content.html("<h3>Agotado</h3>").attr(defaults.classSoldOut);
                $(defaults.classSoldOut).show();
            }
        }
        else {
            $(defaults.classSoldOut).hide();
        }
        if (defaults.success != null) {
            defaults.success($radios.length);
        }
    };

    return this.each(
        function () {
            if (options) {
                defaults = $.extend(defaults, options);
            }
            $content = $(this);
            procSoldOut();
        });
};


$.fn.soldOut = function (options) {
    var $This = null, defaults =
        {
            ctlItem: ".clickoneroFP-item",
            ctlRadios: "input[type='radio']",
            ctlDivMsg: ".clickoneroFP-productSize",
            txtAgotado: "<h3>Agotado</h3>",
        },
        init = function () {
            $This.find(defaults.ctlItem).each(function (index, divItem) {
                var $radios = $(divItem).find(defaults.ctlRadios);
                if ($radios.length == 0) {
                    $(divItem).find(defaults.ctlDivMsg).html(defaults.txtAgotado);
                }
            });
        };
    return this.each(function () {
        if (options) {
            defaults = $.extend(defaults,options);
        }
        $This = $(this);
        init();
    });
};



$.fn.favoritos = function (options) {
    var $content = null, defaults = {
        objFav: "span.sportFavoriteStarOff",
        idObj: "brandid",
        classOff: "sportFavoriteStarOff",
        classOn: "sportFavoriteStarOn",
        classIcon: "sportIcon",
        classToolTip: "sportToolTip",
        brandname: "brandname"
    },
    itemsWishList = null,
    procFavoritos = function () {
        $(defaults.objFav).show();
        $(defaults.objFav).each(function () {
            var idBrand = $(this).data(defaults.idObj);
            $spanF = $(this);
            var arrR = $.grep(itemsWishList,
                function (e) {
                    return e.id == idBrand;
                });
            if (arrR.length > 0) {
                $spanF.removeClass(defaults.classOff).addClass(defaults.classOn);
            }
            

            $(this).click(function () {
                var $ctlBoton = $(this);
                var $ctlEstrella = $(this);
                if ($ctlEstrella.attr("class").indexOf(defaults.classOff) > -1) {
                    $("span[data-" + defaults.idObj + "='" + $ctlEstrella.data(defaults.idObj) + "']").removeClass(defaults.classOff).addClass(defaults.classOn);
                    Winbits.addToWishList({ brandId: $(this).data(defaults.idObj) }).done(function () {
                        globalGlobalFuncion.sendMsg("La marca " + $ctlEstrella.data(defaults.brandname) + " se ha agregado a tus favoritos", "Agregado a Favoritos", "star2");
                    });
                }
                else {
                    Winbits.deleteFromWishList({ brandId: $(this).data(defaults.idObj) }).done(function () {
                        globalGlobalFuncion.sendMsg("La marca " + $ctlEstrella.data(defaults.brandname) + " se ha quitado de tus favoritos", "Eliminado de Favoritos", "star2");
                    });
                    $("span[data-" + defaults.idObj + "='" + $(this).data(defaults.idObj) + "']").removeClass(defaults.classOn).addClass(defaults.classOff);
                }
            });
        });
    },
    init = function () {
        //alert(globalUser.idUsuario);
        if (globalUser.idUsuario > 0) {

            Winbits.getWishListItems().done(getWishList);
        }
        //suscribeLoginEvent();
        setTimeout(suscribeLoginEvent, 1000);
    },
    suscribeLoginEvent = function () {
        globalUser.suscribLogin(function () {
            showCtl();
            Winbits.getWishListItems().done(getWishList);
        });
        globalUser.sucribLogOut(hideCtl);
    },

    hideCtl = function () {
        $("span." + defaults.classOff).hide();
        $("span." + defaults.classOn).hide();
    },

    showCtl = function () {
        $("span." + defaults.classOff).show();
        $("span." + defaults.classOn).show();
    },

        getWishList = function (data) {
            itemsWishList = data.response;
            procFavoritos();
        };

    return this.each(function () {
        if (options) {
            defaults = $.extend(defaults, options);
        }
        $content = $(this);
        hideCtl();
        init();
    });

};

$.fn.socialMedia = function (options) {
    var defaults = {
        ctlFb: "span.sportFacebookPS",
        ctlTw: "span.sportTwitterPS",
        fbname: "",
        messagefb: "",
        urllinkfb: "",
        urlimgfb: "",
        captionfb: "",
        descriptionfb: "",
        descriptiontw: "",
    }, init = function () {
        $(defaults.ctlFb).click(function () {            
            if (globalUser.idUsuario == 0) {
                globalGlobalFuncion.sendMsg("Debes estar autentificado", "", "facebook");
                return;
            }
            else if($(this).data(defaults.urlLinkFb) == "")
            {
                globalGlobalFuncion.sendMsg("Tenemos problemas con la aplicación, por favor inténtalo más tarde.", "Error de conexión con Facebook", "facebook");
            }
            else {
                var $ctlFb = $(this);
                try
                {
                    
                    console.log("$ctlFb.data(defaults.urlimgfb) " + $ctlFb.data(defaults.urlimgfb));
                    console.log("name " + $ctlFb.data(defaults.fbname));
                    console.log("message " + $ctlFb.data(defaults.messagefb));
                    console.log("linkfb " + $ctlFb.data(defaults.urllinkfb));
                    console.log("urlimgfb " + $ctlFb.data(defaults.urlimgfb));
                    console.log("caption " + $ctlFb.data(defaults.captionfb));
                    console.log("description " + $ctlFb.data(defaults.descriptionfb));


                    Winbits.share({
                        "name": $ctlFb.data(defaults.fbname),
                        "message": $ctlFb.data(defaults.messagefb),
                        "linkUrl": $ctlFb.data(defaults.urllinkfb),
                        "imageUrl": $ctlFb.data(defaults.urlimgfb),
                        "caption": $ctlFb.data(defaults.captionfb),
                        "description":$ctlFb.data(defaults.descriptionfb)
                    }).done(function () {
                        globalGlobalFuncion.sendMsg("¡Gracias por compartir nuestros productos con tus amigos!", "Gracias", "bit");
                    })
                }
                catch (e) {
                    console.log(e);
                    if (e == "Facebook, not connected!") {
                        globalGlobalFuncion.sendMsg("¡Ups! Vincula tu cuenta con Facebook por favor.", "Vincula tu cuenta", "facebook");
                    }
                    else {
                        globalGlobalFuncion.sendMsg("¡Ups! Tenemos problemas con nuestros servicios. Inténtalo más tarde", "Error de conexión con Facebook", "facebook");
                    }
                }
            }
        });
        $(defaults.ctlTw).click(function () {
            if (globalUser.idUsuario == 0) {
                globalGlobalFuncion.sendMsg("Debes estar autentificado", "", "twitter" );
                return;
            }
            else {                
                try {

                    console.log("$(this).data(defaults.descriptiontw) " + $(this).data(defaults.descriptiontw));


                    Winbits.tweet({
                        message: $(this).data(defaults.descriptiontw),
                    }).done(function (data) {
                        if (data.response == "Success publish!") {
                            globalGlobalFuncion.sendMsg("¡Gracias por compartir nuestros productos con tus amigos!", "Gracias", "bit");
                        }
                        else {
                            globalGlobalFuncion.sendMsg("¡Gracias por compartir nuestros productos!, pero sólo puedes compartirlo una vez.", "Gracias", "bit");
                        }

                    }).fail(function () {
                        globalGlobalFuncion.sendMsg("¡Ups! Tenemos problemas con nuestros servicios. Inténtalo más tarde", "twitter");
                    });
                }
                catch (e) {
                    console.log(e);
                    if (e == "Twitter, not connected!") {
                        globalGlobalFuncion.sendMsg("¡Ups! Vincula tu cuenta de twitter por favor.", "Vincula tu cuenta", "twitter");
                    } else {
                        globalGlobalFuncion.sendMsg("¡Ups! Tenemos problemas con nuestros servicios. Inténtalo más tarde", "Error de conexión con Twitter", "facebook");
                    }
                }
            }
        });
    };
    return this.each(function () {
        if (options) {
            defaults = $.extend(defaults, options);
        }
        
        init();

    });
}


funcionesWidget = function (){

    this.getSkuProfileInfo = function (idsArr) {
        return Winbits.getSkuProfileInfo({
            ids: [idsArr],
        });
    };

    this.addToCart = function (idsku, quantity, bits, reference) {

        var json = [], obj;

        try
        {
            if (reference === undefined) {

                return Winbits.addToCart({
                    id: idsku,
                    quantity: quantity,
                    bits: bits
                });

            }
            else {

                //*************start code ***************************

                for (var i = 0; i < reference.length; i++)
                {
                    json.push((reference[i].newCard === "true" ? "Tarjeta nueva" : "Tarjeta activa") + ": " + reference[i].code);
                }

                obj = {
                    id: idsku,
                    quantity: quantity,
                    bits: bits,
                    references: json
                };

                //***************end code ****************************

                return Winbits.addToCart(obj);
            }
        }
        finally {

            idsku = quantity = bits = reference = json = obj = null;
        }
    };

    this.addToWishList = function (idBrand) {
        return Winbits.addToWishList({brandId:idBrand});
    };

};





