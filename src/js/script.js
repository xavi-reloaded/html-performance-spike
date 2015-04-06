function isMobile() {
    (function (a) { (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera);
    if (jQuery.browser.mobile) {
        $('html').addClass('mobile');
    }
}// ++++++++++++++++++++++++++++++++++++++++++++
//      ACCORDEONFILTER: Acordeón de filtros
// ++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.acordeonFilter = function (options) {
    var defaults = $.extend({
        trigger: 'h3',
        claseActivo: 'activo',
        contenedor: '.containerAcordeon'
    }, options);
    return this.each(function () {
        $(this).find(defaults.trigger).click(function () {
            $(this).next(defaults.contenedor).slideToggle();
            $(this).toggleClass(defaults.claseActivo);
        });
    });
};// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CAROUSELSWIPER: Iniciar carruseles on Swiper
//		Dependencias: Librería Swiper de idangerous (2.4.3) http://www.idangero.us/sliders/swiper,
// 					  removeArrow API
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* 
	Descripción del API: 
	Necesita un div contenedor, un div wrapper y un div para cada slider
	
	HTML:
	<div class="carrusel"> // Div contenedor
		<div class="carrusel-wrapper"> // Div wrapper
			<div class="carrusel-slide"> ... </div> // Slide 1
			<div class="carrusel-slide"> ... </div> // Slide 2
			.
			.
			.
			<div class="carrusel-slide"> ... </div> // Slide n
		</div>
		<span class="arrowLeft">Anterior</span> // Flecha izquierda para mover hacia atrás. Opcional
		<span class="arrowRight">Siguiente</span> // Flecha derecha para mover hacia adelante. Opcional
	</div>
	Llamada básica:
	$('.carrusel').carouselSwiper();
	
	Opciones:
	arrow: Si el carrusel lleva flechas se activa con 'true'. Por default estan desactivadas con 'false'
	arrowLeft: Clase de la flecha izquierda/anterior/prev. Tiene que estar activada la opción arrow.
	arrowRight: Clase de la flecha derecha/siguiente/next. Tiene que estar activada la opción arrow.
	slidesNum: Número de slides que muestra en pantalla. El default es 0 y muestra solo un slide en cada movimiento
	slideCSS: Clase del slide
	loop: Si se necesita repetir el carrusel en un ciclo infinito o circular. Por default esta desactivado con 'false'. Para activar 'true'
	optionsSwiper: Opciones del API SWIPER
	calculateHeight: Calcular el alto del carrusel. Por default está en 'false' ytomará el alto definido. Para activar 'true'
	onClickSlide: Función externa que se ejecutará cuando le das click a un slide. Por default no hace nada
	initialSlide: Si el slide inicial es diferente a la primera. Aqui se pone el número del slide donde se iniciará. NOTA: Tomar en cuenta que en carruseles cíclicos, se duplica el primer y el último slide.
	carruselNum: Para asignar un número al carrusel. Útil cuando son más de uno.
	externalSwipeTo: Si necesitar usar un objeto externo para hacer swipe en un slide específico
	externalSwipeToItem: Objeto externo para hacer el swipe en un slide especifico. Requiere data-swipeto con el número del index
	externalSwipeScrollTo: Objeto a donde se quiere hacer scroll una vez que se haga click en el objeto externo y se mueva el carrusel. Por default ninguno
*/

jQuery.fn.carouselSwiper = function (options) {
    var defaults = $.extend({
        arrow: true,
        arrowLeft: '.arrowLeft',
        arrowRight: '.arrowRight',
        centerArrow: true,
        slideActive: 'swiper-slide-active',
        slideVisible: '.swiper-slide-visible',
        slidesNum: 1,
        slidesPrefix: 'slide',
        slideCSS: '.carrusel-slide',
        loop: false,
        optionsSwiper: {
            grabCursor: true,
            useCSS3Transforms: false
        },
        calculateHeight: false,
        onClickSlide: false,
        initialSlide: false,
        carruselNum: 'swiperCarrusel-',
        externalSwipeTo: false,
        externalSwipeToItem: '.swipeToObj',
        externalSwipeScrollTo: false,
        lastAction: false,
        anulateLastAction: false,
        numSlideCarousel: 'carrusel-slides-'
    }, options),
    size = 0, // Variable que servirá para escribir el número de slides que tiene el carrusel
    // 1. Método que calcula cuántos slides tiene el carrusel:
    // obj: El objeto carrusel
    calculateSize = function (obj) {
        // Asignar a la variable global size el número de slides, contándolos
        size = parseInt($(obj).find(defaults.slideCSS).size(), 10);
        // Si el slide inicial no es el primero
        if (defaults.initialSlide) {
            // A cada uno de los slides se le agrega un índice
            $(obj).find(defaults.slideCSS).each(function (i) {
                $(this).addClass(defaults.slidesPrefix + i);
            });
        }
        // Si queremos mostrar más de un slide en cada vista
        if (defaults.slidesNum > 1) {
            // Si la cantidad de slides es mayor al número de slides que se quiere mostrar en cada vista
            if (size > defaults.slidesNum) {
                // Llamar método que inicializa el carrusel
                initSwiper(obj);
                // Si el número de slides es menor al número de slides por vista
            } else {
                // Agregar clase con el número de slides
                $(obj).addClass(defaults.numSlideCarousel + size);
                $(obj).find(defaults.slideCSS).first().addClass(defaults.slideActive);
                // Oculta las flechas derecha e izquierda
                $(obj).siblings(defaults.arrowLeft).hide();
                $(obj).siblings(defaults.arrowRight).hide();
            }
            // Si el número de slides a mostrar por vista es el default ( o sea 1)
        } else {
            // Si la cantidad de slides es mayor a 2
            if (size > 1) {
                // Inicializa el carrusel
                initSwiper(obj);
                // Si la cantidad de slides es 1 o 0
            } else {
                // Oculta las flechas izquierda y derecha
                $(obj).siblings(defaults.arrowLeft).hide();
                $(obj).siblings(defaults.arrowRight).hide();
                // Oculta objeto si no hay slides
                if (size === 0) {
                    $(obj).hide();
                }
            }
        }
    },
    // 2. Método para inicializar el carrusel:
    // obj: El objeto carrusel
    initSwiper = function (obj) {
        // Objeto que contendrá el carrusel
        var swiper = new Swiper(obj, defaults.optionsSwiper);
        // Si no se necesita repetir el carrusel
        if (!(defaults.loop)) {
            // Agrega al objeto del carrusel el callback Touch End
            swiper.addCallback('TouchEnd', function () {
                // Cuando se ejecute el callback, verifica el estado de las flechas con removeArrows
                if (!(defaults.loop)) {
                    // Verificar posición de las flechas (si se deben mostrar o no)
                    prepareArrow(obj, swiper);
                }
            });
            swiper.addCallback('SlideNext', function () {
                // Cuando se ejecute el callback, verifica el estado de las flechas con removeArrows
                if (!(defaults.loop)) {
                    // Verificar posición de las flechas (si se deben mostrar o no)
                    prepareArrow(obj, swiper);
                }
            });
            swiper.addCallback('SlidePrev', function () {
                // Cuando se ejecute el callback, verifica el estado de las flechas con removeArrows
                if (!(defaults.loop)) {
                    // Verificar posición de las flechas (si se deben mostrar o no)
                    prepareArrow(obj, swiper);
                }
            });
        }
        // Si el slide inicial es diferente al primero
        if (defaults.initialSlide) {
            // Cambia la posición del carrusel
            initialSlide(obj, swiper);
        }
        // Si existen flechas
        if (defaults.arrow) {
            // Inicializa las flechas
            initArrow(obj, swiper);
        }
        // Si se tiene que calcular el alto del carrusel
        if (defaults.calculateHeight) {
            // Calcula el alto del carrusel
            calculateHeight(obj, swiper);
            // Agrega al objeto carrusel onSlideChangeStart(que es del swiper) que recalcule el alto cada vez que se cambie un slide
            swiper.params.onSlideChangeStart = function (swiper) { calculateHeight(obj, swiper); };
        }
        // Si se necesita agragar funcionalidad después de que le den click al slide
        if (defaults.onClickSlide) {
            $(obj).find(defaults.slideCSS).on('click', function (e) {
                // Deten la propagación de eventos
                e.stopPropagation();
                // Ejecuta la función que venga en onClickSlide al carrusel
                defaults.onClickSlide(swiper);
            });
        }
        // Agregar al carrusel que los callbacks se ejecuten sólo una vez en múltiples al inicio de los cambios de slide (como cuando un usuario le pica repetidamente a las flechas)
        swiper.params.queueStartCallbacks = true;
        // Agregar al carrusel que los callbacks se ejecuten sólo una vez en múltiples al final de los cambios de slide (como cuando un usuario le pica repetidamente a las flechas)
        swiper.params.queueEndCallbacks = true;
        // Si necesitamos hacer swipeTo desde un objeto externo
        swiper.params.onSlideChangeEnd = function (swiper) {
            if (!(defaults.loop)) {
                // Verificar posición de las flechas (si se deben mostrar o no)
                prepareArrow(obj, swiper);
            }
        };
        if (defaults.externalSwipeTo) {
            // Atachamos al evento click la función
            $(defaults.externalSwipeToItem).on('click', function () {
                // Llamamos la función externalSwiper que moverá el carrusel con el data-swipeto del objeto
                externalSwipe(swiper, obj, $(this));
            });
        }
    },
    // 3. Método para cambiar la posición del slide:
    //  obj: El objeto carrusel
    //  swiper: El objeto swiper creado para el carrusel
    initialSlide = function (obj, swiper) {
        // Variable donde se deposita el slide inicial
        var index = 0;
        // Recorre todos los slides
        $(obj).find(defaults.slideCSS).each(function (i) {
            // Si encuentras en el slide la clase del slide inicial
            if (($(this).find(defaults.initialSlide).length) || ($(this).hasClass(defaults.initialSlide))) {
                // Agregale el valor del índice a la variable index
                index = i;
            }
        });
        // Mueve el carrusel al valor que trae index
        swiper.swipeTo(index);
        // Si es necesario que se repita el carrusel
        if (!(defaults.loop)) {
            // Verificar posición de las flechas (si se deben mostrar o no)
            prepareArrow(obj, swiper);
        }
    },
    // 4. Inicializa las flechas:
    //  obj: El objeto carrusel
    //  swiper: El objeto swiper creado para el carrusel
    initArrow = function (obj, swiper) {
        // Verificar posición de las flechas (si se deben mostrar o no)
        if (!(defaults.loop)) {
            // Verificar posición de las flechas (si se deben mostrar o no)
            prepareArrow(obj, swiper);
        }
        // Busca en los hermanos del objeto la flecha izquierda/anterior/prev y en el click
        $(obj).siblings(defaults.arrowLeft).on('click', function (e) {
            // Deten la propagación de eventos
            e.stopPropagation();
            // Si no se tiene que repetir el carrusel
            if (!(defaults.loop)) {
                // Verificar posición de las flechas (si se deben mostrar o no)
                prepareArrow(obj, swiper);
            }
            // Cambia el carrusel al anterior slide
            swiper.swipePrev();
        });
        // Busca en los hermanos del objeto la flecha derecha/siguiente/next y en el click
        $(obj).siblings(defaults.arrowRight).on('click', function (e) {
            // Deten la propagación de eventos
            e.stopPropagation();
            // Si no se tiene que repetir el carrusel
            if (!(defaults.loop)) {
                // Verificar posición de las flechas (si se deben mostrar o no)
                prepareArrow(obj, swiper);
            }
            // Cambia el carrusel al siguiente slide
            swiper.swipeNext();
        });
    },
    // 5. Método que calcula el alto de carrusel:
    //  obj: El objeto carrusel
    //  swiper: El objeto swiper creado para el carrusel
    calculateHeight = function (obj, swiper) {
        // Variable que escribe la altura del slide activo
        var altura = 0;
        if (defaults.slidesNum > 1) {
            $(obj).find(defaults.slideVisible).each(function () {
                if (altura < $(this).outerHeight()) {
                    altura = $(this).outerHeight();
                }
            });
        } else {
            altura = $(swiper.activeSlide()).outerHeight();
        }
        // Recalcula el alto del carrusel de forma animada
        $(obj).animate({
            height: altura + 'px'
        });
        // Busca en los hermanos del carrusel la flecha izquierda y derecha y cambia el valor top para que se pongan en el centro del carrusel
        if (defaults.centerArrow) {
            $(obj).siblings(defaults.arrowRight + ', ' + defaults.arrowLeft).css('top', altura / 2 + 'px');
        }
    },
    // Método que verifica posición de las flechas (si se deben mostrar o no):
    //  obj: El objeto carrusel
    prepareArrow = function (obj, swiper) {
        // Llama a removeArrow
        $(obj).removeArrows({
            arrowLeft: defaults.arrowLeft, // Flecha izquierda/anterior/prev
            arrowRight: defaults.arrowRight, // Flecha derecha/siguiente/next
            slidesNum: defaults.slidesNum, // Número de slides por vista
            slideCSS: defaults.slideCSS, // Clase del slide del carrusel
            swiper: swiper,
            lastAction: defaults.lastAction,
            anulateLastAction: defaults.anulateLastAction
        });
    },
    // 6. Método que mueve el carrusel de forma exterior desde un índice dado:
    //  swiper: El objeto swiper creado para el carrusel
    //  obj: El objeto carrusel
    //  item: El objeto externo que contiene el index a donde se moverá el carrusel
    externalSwipe = function (swiper, obj, item) {
        // Colectamos el índice al que queremos mover el carrusel escrito en el data-swiperto
        var index = $(item).attr('data-swipeto');
        // Movemos el carrusel al índice requerido por el objeto
        swiper.swipeTo(index, 1000);
        // Si se especificó un objeto a donde se hará scroll una vez actualizado el carrusel:
        if (defaults.externalSwipeScrollTo) {
            // De forma animada, mover el documento hacia el objeto
            $('html, body').animate({
                // El scroll se hace hasta alcanzar el borde superior del objeto
                scrollTop: $(defaults.externalSwipeScrollTo).offset().top
            }, 1000, 'swing');
        }
    };
    // 0. INICIO:
    // index: El índice del ciclo para ponerlo como clase
    return this.each(function (index) {
        // Clase única para identificar el carrusel. Útil cuando son más de uno
        var obj = defaults.carruselNum + index;
        // Agregar la clase única al carrusel
        $(this).addClass(obj);
        // Llamar al método que calcula cuántos slides tiene el carrusel
        calculateSize(this);
    });
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//		REMOVEARROWS: Quita/Agrega las flechas dependiendo la posición del carrusel
//		Dependencias: Ninguna
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*Descripción del API: 
	Necesita dos objetos span/div para contener la flecha izquierda y la derecha
	
	HTML:
	
	<span class="arrowLeft">Anterior</span> // Flecha izquierda para mover hacia atrás. Opcional
	<span class="arrowRight">Siguiente</span> // Flecha derecha para mover hacia adelante. Opcional
	Llamada básica:
	Desde el API carouselSwiper
	
	Opciones:
	slideCSS: Clase de slides
	slidesNum: Número de slides a mostrar en cada vista. Default es 0
	arrowLeft: Flecha izquierda/anterior/prev
	arrowRight: Flecha derecha/siguiente/next
	slideActive: Clase de slide activa
	addCallback: Función para el Callback para después del click. Default: ninguno
*/
jQuery.fn.removeArrows = function (options) {
    var defaults = $.extend({
        slideCSS: '.carrusel-slide',
        slidesNum: 0,
        arrowLeft: '.arrowLeft',
        arrowRight: '.arrowRight',
        slideActive: 'swiper-slide-active',
        addCallback: 0,
        swiper: 'swiper',
        lastAction: false,
        anulateLastAction: false
    }, options);
    // INICIO
    return this.each(function () {
        // Contamos la cantidad de slides del carrusel
        var size = $(this).find(defaults.slideCSS).size(),
        // Flecha izquierda
            left = $(this).siblings(defaults.arrowLeft),
        // Flecha derecha
            right = $(this).siblings(defaults.arrowRight),
        // Penúltima slide
            pointOfNoReturn = size - 1;
        // Si tiene número de slides por vista
        if (defaults.slidesNum) {
            // Asignale el penúltimo slide
            pointOfNoReturn = size - defaults.slidesNum;
        }
        // Si la cantidad de slides es mayor al número de slides a mostrar por vista
        if (size > defaults.slidesNum) {
            // Busca en cada uno de los slides
            $(this).find(defaults.slideCSS).each(function (i) {
                if (!$(this).hasClass('slide' + i)) {
                    $(this).addClass('slide' + i);
                }
                if (i === pointOfNoReturn) {
                    if (!$(this).hasClass('pointOfNoReturn')) {
                        $(this).addClass('pointOfNoReturn');
                    }
                }
            });
            $(this).find('.' + defaults.slideActive).each(function () {
                if ($(this).hasClass('pointOfNoReturn')) {
                    left.show();
                    right.hide();
                    if (defaults.lastAction) {
                        defaults.lastAction();
                    }
                } else if ($(this).hasClass('slide0')) {
                    left.hide();
                    right.show();
                    if (defaults.anulateLastAction) {
                        defaults.anulateLastAction();
                    }
                } else {
                    left.show();
                    right.show();
                    if (defaults.anulateLastAction) {
                        defaults.anulateLastAction();
                    }
                }
            });

            // Si la cantidad de slides es menor al número de slides a mostrar por vista
        } else {
            // Oculta las flechas derecha e izquierda
            left.hide();
            right.hide();
        }
    });
};// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CAROUSELVERTICALSWIPER: Iniciar carruseles on Swiper Vertical
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.carruselVerticalSwiper = function (options) {
    var defaults = $.extend({
        slide: 'carrusel-slide',
        wrapper: 'carrusel-wrapper',
        scrollbar: '.carrusel-scrollbar'
    }, options),
    iniciaSwiper = function (obj) {
        var swiperOptions = {
            mode: 'vertical',
            scrollContainer: true,
            grabCursor: true,
            scrollbar: {
                container: defaults.scrollbar
            },
            slideClass: defaults.slide,
            wrapperClass: defaults.wrapper
        },
        swiper = new Swiper(obj, swiperOptions);
    },
    calculaAlto = function (obj) {
        var altoSlide = $(obj).find('.' + defaults.slide).outerHeight(),
            altoObj = $(obj).outerHeight();
        if (altoSlide > altoObj) {
            iniciaSwiper(obj);
        }
    };
    return this.each(function () {
        calculaAlto(this);
    });
};// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CHANGEOFER: Cambiar entre ofertas para hombre/mujer
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.changeOffer = function (options) {
    var defaults = $.extend({
        filter: '.clickoneroFP-filter',
        itemFilter: 'li',
        itemMenu: 'li',
        currentClass: 'current'
    }, options),
    clickOption = function (obj) {
        $(obj).on('click', defaults.itemFilter, function () {
            $(this).addClass(defaults.currentClass).siblings().removeClass(defaults.currentClass);
            filterItems(this);
        });
    },
    filterItems = function (obj) {
        var filtrar = $(obj).data('filter'),
            item = $(defaults.filter).find(defaults.itemMenu);
        if (filtrar) {
            $(defaults.filter).animate({ opacity: 0 }, 400, function () {
                item.each(function () {
                    if ($(this).data('filter') === filtrar) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
                $(this).animate({ opacity: 1 });
            });
        } else {
            $(defaults.filter).animate({ opacity: 0 }, 400, function () {
                item.show();
                $(this).animate({ opacity: 1 });
            });
        }
    };
    return this.each(function () {
        clickOption(this);
    });
};// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      chooseDate: Elegir entre dos fechas, ideal para planer viaje
// 		Dependencias: datePicker.js, toolTip.js, jQueryUI.js
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* 
	Descripción del API: 
	Necesita un div wrapper, dos divs que alojen cada input y dentro de estos,
	un ícono para eliminar la fecha.
	
	HTML:
	<div class="datePicker-div"> // D wrapper
		<div class="divFrom"> // Div donde se pondrá la fecha inicial
			<input class="fromDate" type="text"> // Input donde se pone la fecha inicial y desde donde sale el primer calendario
			<span class="iconFont-close" title="Remover Fecha"></span> // Ìcono para resetar la fecha
		</div>
		<span class="toSpan">-</span> // Separador de las fechas
		<div class="divTo"> // Div donde se pondrá la fecha final
			<input class="toDate" type="text"> // Input donde se pone la fecha final y dede donde sale el segundo calendario
			<span class="iconFont-close" title="Remover Fecha"></span> // Ìcono para resetar la fecha
		</div>
	Llamada:
	$('.datePicker-div').chooseDate();
	
	Opciones:
	fromDate: Input donde se pone la fecha inicial
	fromDateDiv: Div donde se encuentra el input de fecha inicial
	toDate: Input donde se pone la fecha final
	toDateDiv: Div donde se encuentra el input de fecha final
	to Text: Separador de fechas.
	refreshBtn: Ícono para eliminar la fecha; debe ser igual en los dos divs.
	datapickerWrapper: Clase heredada de datePicker.js. Wrapper que envuelve al input de ambas fechas.
	hasDatepicker: Clase heredada de jQueryUI, la cual se pone cuando se iniciliza el calendario.
	defaultDate: Fecha inicial. Por default es el día actual.
	minDate: Fecha mínima. Por default es 0 que equivale al día actual.
*/
// Para que JSLint ignore la notación ['es']:
/*jshint sub:true*/
jQuery.fn.chooseDate = function (options) {
    var defaults = $.extend({
        fromDate: '.fromDate',
        fromDateDiv: '.divFrom',
        toDate: '.toDate',
        toDateDiv: '.divTo',
        toText: '.toSpan',
        refreshBtn: '.iconFont-close',
        datepickerWrapper: '.datepicker-wrapper',
        hasDatepicker: '.hasDatepicker',
        defaultDate: '+1w',
        minDate: 0

    }, options),
    // Método para inicializar el datepicker del jQueryUI:
    // obj: El objeto que contiene toda la fecha
    // froDate: El input que se inicializará
    // toDate: El otro input que cambiará sus atributos
    // minmax: Si el valor es para cambiar la fecha mínma o máxima
    // slideDiv: Si es el primer input, el nombre del padre del otro input
    datePicker = function (obj, fromDate, toDate, minmax, slideDiv) {
        $(obj).find(fromDate).datePicker({
            // Opciones que se pasan directamente a jQueryUI
            option: {
                // Fecha inicial 
                defaultDate: defaults.defaultDate,
                // Fecha mínima
                minDate: defaults.minDate,
                // Opción para mostrar en el click del input y en el click en el ícono
                showOn: 'both',
                // Método que dispara cuando se selecciona la fecha en el calendario
                onSelect: function (dateText) {
                    // Si necesito el padre del otro calendario (en el primer calendario)
                    if (slideDiv) {
                        // Muestra el separador
                        $(defaults.toText).slideDown();
                        // Muestra el padre del otro calendario
                        $(slideDiv).slideDown();
                    }
                    // Cambia la opción en el otro calendario de la fecha mínima o máxima, dependiendo de la fecha que se elija
                    $(toDate).datepicker('option', minmax, dateText);
                }
            }
        });
    },
    // 1. Método para forzar el foco en la primer fecha cuando se de click en todo el objeto (la primera vez)
    focusFrom = function (obj) {
        $(obj).click(function () {
            // Foco en el primer objeto
            $(defaults.fromDate).focus();
            // Quita el bind del click en el objeto
            $(obj).unbind('click');
        });
    },
    // 2. Método para inicializar el input de la primera fecha
    fromDate = function (obj) {
        // Llamada al método datePicker para inicializar el input
        datePicker(obj, defaults.fromDate, defaults.toDate, 'minDate', defaults.toDateDiv);
        // Función del click en el botón hermano para resetar la fecha dentro del div
        $(obj).find(defaults.fromDateDiv).find(defaults.refreshBtn).click(function (e) {
            // Prevenir eventos default en el click
            e.preventDefault();
            // Muestra el padre del otro input
            $(obj).find(defaults.toDateDiv).slideUp();
            // Muestra el separador
            $(obj).find(defaults.toText).slideUp();
            // Quita cualquier valor en el otro input
            $(obj).find(defaults.toDateDiv).find(defaults.hasDatepicker).val('');
            // Destruye el datepicker en este input
            $(obj).find(defaults.fromDate).datepicker('destroy');
            // Y vuelve a crearlo para borrar cualquier feche
            datePicker(obj, defaults.fromDate, defaults.toDate, 'minDate', defaults.toDateDiv);
            // Borra cualquier valor en este input
            $(obj).find(defaults.fromDateDiv).find(defaults.hasDatepicker).val('').focus();
            // Inicializa el tooltip en el botón para resetear
        }).toolTip();
    },
    // 3. Método para inicializar el input de la segunda fecha
    toDate = function (obj) {
        // Llamada al método datePicker para inicilizar el input
        datePicker(obj, defaults.toDate, defaults.fromDate, 'maxDate');
        // Función del click en el botón hermano para resetear la fecha dentro del div, cuando le des click
        $(obj).find(defaults.toDateDiv).find(defaults.refreshBtn).click(function (e) {
            // Prevenir eventos default en el click
            e.preventDefault();
            // Borra cualquier valor en este input
            $(obj).find(defaults.toDateDiv).find(defaults.hasDatepicker).val('');
            // Inicializa el tooltip en el botón para resetear
        }).toolTip();
    },
    // 4. Método para ocultar el separador y el input para la segunda fecha
    hideObjs = function (obj) {
        $(obj).find(defaults.toText + ', ' + defaults.toDateDiv).hide();
    };
    // INICIO
    return this.each(function () {
        // Enfoca en el primer input en el primer click a este objeto
        focusFrom(this);
        // Inicializa el primer input
        fromDate(this);
        // Inicializa el segundo input
        toDate(this);
        // Oculta separador y segundo input
        hideObjs(this);
    });
};// +++++++++++++++++++++++++++++++++++++++++
//      CUSTOMCHECKBOX: Cambiar checkbox
// +++++++++++++++++++++++++++++++++++++++++

jQuery.fn.customCheckbox = function (options) {
    var defaults = $.extend({
        checkbox: 'input[type="checkbox"]',
        selectClass: 'checkbox-checked',
        unSelectClass: 'checkbox-unchecked',
        wrapper: 'checkbox-wrapper',
        spanIcon: 'checkbox-span',
        onClickCall: false,
        onFinishWrapping: false,
        classColor: 'checkbox-color',
        tooltipClass: 'tooltip',
        checkAll: false,
        checkAllClass: 'checkbox-checkall'
    }, options), clase,
    wrappingInput = function (obj) {
        $(obj).find(defaults.checkbox).each(function () {
            var $this = this;
            checkingChecked($this);
            if ($($this).next().is('label')) {
                $($this).next().andSelf().wrapAll('<div class="' + defaults.wrapper + '"/>');
                $($this).next().click(function (e) {
                    e.preventDefault();
                });
                $($this).appendTo($(this).next());
            } else {
                $($this).wrap('<div class="' + defaults.wrapper + '"/>');
            }
            $($this).parents('.' + defaults.wrapper).prepend('<span class="' + defaults.spanIcon + ' ' + clase + '"/>');
            $($this).parents('.' + defaults.wrapper).click(function () {
                clickingCheckbox($this, $($this).parents('.' + defaults.wrapper).children('.' + defaults.spanIcon));
            });
            if ($($this).data('color')) {
                customColor($($this));
            }
            if (defaults.onFinishWrapping) {
                defaults.onFinishWrapping($this);
            }
        });
    },
    checkingChecked = function (obj) {
        if ($(obj).prop('checked')) {
            clase = defaults.selectClass;
        } else {
            clase = defaults.unSelectClass;
        }
    },
    checkAll = function (obj, value, classAdd, classRemove) {
        if (defaults.checkAll) {
            var $siblings = $(obj).parents('.' + defaults.wrapper).siblings();
            if ($(obj).hasClass(defaults.checkAllClass)) {
                $siblings.find(defaults.checkbox).prop('checked', value)
                .parents('.' + defaults.wrapper).find('.' + defaults.spanIcon).removeClass(classRemove).addClass(classAdd);
            } else {
                if (value === false && $siblings.find('.' + defaults.checkAllClass).prop('checked')) {
                    $siblings.find('.' + defaults.checkAllClass).prop('checked', false)
                    .parents('.' + defaults.wrapper).find('.' + defaults.spanIcon).removeClass(classRemove).addClass(classAdd);
                }
            }
        }
    },
    clickingCheckbox = function (obj, trigger) {
        if ($(obj).prop('checked')) {
            $(trigger).removeClass(defaults.selectClass).addClass(defaults.unSelectClass);
            $(obj).prop('checked', false);
            checkAll(obj, false, defaults.unSelectClass, defaults.selectClass);
        } else {
            $(trigger).removeClass(defaults.unSelectClass).addClass(defaults.selectClass);
            $(obj).prop('checked', true);
            checkAll(obj, true, defaults.selectClass, defaults.unSelectClass);
        }
        if (defaults.onClickCall) {
            defaults.onClickCall(obj);
        }
    },
    customColor = function (obj) {
        $(obj).siblings('.' + defaults.spanIcon).addClass(defaults.classColor).css('background-color', '#' + $(obj).data('color')).attr('data-tooltip', $(obj).val());
        $(obj).siblings('.' + defaults.spanIcon).toolTip({ clase: defaults.tooltipClass });
    };
    return this.each(function () {
        wrappingInput(this);
    });
};

// ---------------------------------------------------------------
//  WBToggleCheck:       Checa/Descheca checkbox hijos
//  Dependencias:   jQuery.js (1.8.3) http://jquery.com
// ----------------------------------------------------------------

var WBToggleCheck = function (selector, params) {
    //  Selector
    this.ele = selector;
    //  Configuración default del toggleCheck
    this.defaults = $.extend({
        titled: 'h4',
        subtitled: '.subFilter-input',
        inputs: 'input[type="checkbox"]',
        abuelo: '.clickoneroFilter-div',
        padre: '.clickoneroFilter-sub',
        hijo: '.clickoneroFilter-subContainer',
        nieto: '.clickoneroFilter-subsub',
        checkboxSpan: '.checkbox-span',
        checkboxChecked: 'checkbox-checked',
        checkboxUnchecked: 'checkbox-unchecked'
    }, params);

    // Métodos

    // 1. Activar el acordeón
    this.activateToggleCheck = function () {
        this.checkData();
        this.clickCheckbox();
    };
    // 2. Verificar si existen data en el objeto para modificar los defaults
    this.checkData = function () {
        $.extend(this.defaults, $(this.ele).data());
    };
    // 3. Checa / Descheca los checkbox y cambia las clases
    this.checkCheckbox = function (checkbox, removeClass, addClass, prop) {
        $(checkbox).find(this.defaults.checkboxSpan).
		removeClass(removeClass).
		addClass(addClass).
		parent().find(this.defaults.inputs).
		prop('checked', prop);
    };
    // 4. Verifica si es padre, hijo o nieto
    this.clickCheckbox = function () {
        //- Si eres el input del título
        if ($(this.ele).parents(this.defaults.titled).length) {
            var $padre = $(this.ele).parents(this.defaults.abuelo).find(this.defaults.padre);
            //- Si estas checado, encuentra todos tus descendientes y deschécalos junto contigo
            if ($(this.ele).parent().find(this.defaults.inputs).prop('checked')) {
                this.checkCheckbox($padre, this.defaults.checkboxUnchecked, this.defaults.checkboxChecked, true);
                //- Muestra a tu hijo
                $padre.find(this.defaults.nieto).stop().slideDown();
                //- Si no estas checado, encuentra todos tus descendientes y chécalos junto contigo
            } else {
                this.checkCheckbox($padre, this.defaults.checkboxChecked, this.defaults.checkboxUnchecked, false);
                //- Esconde tu hijo
                $padre.find(this.defaults.nieto).stop().slideUp();
            }
            //-  Si eres descendiente del título
        } else if ($(this.ele).parents(this.defaults.padre).length) {
            //- Descheca a tu ascendente
            this.checkCheckbox($(this.ele).parents(this.defaults.abuelo).find(this.defaults.titled), this.defaults.checkboxChecked, this.defaults.checkboxUnchecked, false);
            //- Si tienes descendientes
            if ($(this.ele).parents(this.defaults.hijo).length) {
                //- Eres un descendiente
                if ($(this.ele).parents(this.defaults.nieto).length) {
                    this.checkCheckbox($(this.ele).parents(this.defaults.hijo).find(this.defaults.subtitled), this.defaults.checkboxChecked, this.defaults.checkboxUnchecked, false);
                    //- Eres el padre de descendientes
                } else {
                    //- Si estas checado, encuentra todos tus descendientes y deschécalos junto contigo
                    if ($(this.ele).parent().find(this.defaults.inputs).prop('checked')) {
                        //- Muestra a tu hijo
                        $(this.ele).parents(this.defaults.hijo).find(this.defaults.nieto).slideDown();
                        this.checkCheckbox($(this.ele).parents(this.defaults.hijo), this.defaults.checkboxUnchecked, this.defaults.checkboxChecked, true);
                        //- Si no estas checado, encuentra todos tus descendientes y chécalos junto contigo
                    } else {
                        //- Muestra a tu hijo
                        $(this.ele).parents(this.defaults.hijo).find(this.defaults.nieto).slideUp();
                        this.checkCheckbox($(this.ele).parents(this.defaults.hijo), this.defaults.checkboxChecked, this.defaults.checkboxUnchecked, false);
                    }
                }
            }
        }
    };
    // Activa el acordeón.
    this.activateToggleCheck();
};

jQuery.fn.filterAcordeon = function (options) {
    var defaults = $.extend({
        trigger: '.openAcordeon',
        claseactivo: 'iconFont-down',
        claseinactivo: 'iconFont-up',
        contenedor: '.clickoneroFilter-sub'
    }, options);
    return this.each(function () {
        var _this = this;
        //if ($(_this).find(defaults.contenedor).find('input').length == 0) {
        //    $(_this).find(defaults.trigger).addClass(defaults.claseinactivo).removeClass(defaults.claseactivo);
        //} else {
        //    $(_this).find(defaults.contenedor).stop().slideUp();
        //}
        //if ($(_this).find(defaults.contenedor).find('input').attr("checked")) {
        if ($(_this).find(defaults.contenedor).find('[checked="checked"]').length >0) {
            $(_this).find(defaults.trigger).addClass(defaults.claseinactivo).removeClass(defaults.claseactivo); 
        }
        else {
            $(_this).find(defaults.contenedor).stop().hide()
        }
       
        $(this).find(defaults.trigger).click(function () {            
            if ($(this).hasClass(defaults.claseactivo)) {
                $(_this).find(defaults.contenedor).stop().show();
                $(this).addClass(defaults.claseinactivo).removeClass(defaults.claseactivo);
            } else {
                $(_this).find(defaults.contenedor).stop().hide();
                $(this).addClass(defaults.claseactivo).removeClass(defaults.claseinactivo);
            }
        });
    });
};// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMRADIO: Cambiar radio buttons por input text para el género
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.customRadio = function (options) {
    var defaults = $.extend({
        wrapper: 'radio-wrapper',
        spanRadio: 'radio-span',
        spanSelected: 'radio-selected',
        radio: 'input[type="radio"]',
        classColor: 'radio-color',
        classBorder: 'radio-border',
        innerBorder: 'radio-border-inside',
        outerBorder: 'radio-border-outside',
        classLightBorder: 'radio-border-light',
        textSpanRadio: 'radio-text',
        tooltipClass: 'tool-tip',
        classSoldout: 'radio-soldout',
        classImg: 'radio-img',
        justClick: false,
        onClickRadio: false

    }, options),
    wrappingInput = function (obj) {
        $(obj).find(defaults.radio).each(function () {
            var $this = $(this);
            if ($this.next().is('label')) {
                $this.next().andSelf().wrapAll('<div class="' + defaults.wrapper + '"/>');
            } else {
                $this.wrap('<div class="' + defaults.wrapper + '"/>');
            }
            if ($this.prop('checked')) {
                $this.parent().prepend('<span class="' + defaults.spanRadio + ' ' + defaults.spanSelected + '" title="' + $(this).val() + '"><span class="' + defaults.textSpanRadio + '">' + $(this).val() + '</span></span>');
            } else {
                $this.parent().prepend('<span class="' + defaults.spanRadio + '" title="' + $(this).val() + '"><span class="' + defaults.textSpanRadio + '">' + $(this).val() + '</span></span>');
            }
            if ($this.data('color')) {
                customColor(this);
            }
            if ($this.data('colorborder')) {
                customBorder(this);
            }
            if ($this.data('soldout')) {
                soldOut(this);
            }
            if ($this.data('img')) {
                customImg(this);
            }
            if ($this.data('class')) {
                addClass(this);
            }
            $this.appendTo($this.next());
        });
        clickingRadio(obj);
        $(obj).find('label').click(function (e) {
            e.stopPropagation();
            $(this).parent().find('.' + defaults.spanRadio).trigger('click');
        });
    },
    addClass = function (obj) {
        $(obj).parent().find('.' + defaults.spanRadio).addClass($(obj).data('class')).text('');
    },
    unchecRadio = function (obj) {
        $(obj).find(defaults.radio).each(function () {
            $(this).prop('checked', false);
            $(this).parent().parent().find('.' + defaults.spanRadio).removeClass(defaults.spanSelected);
        });
    },
    checkContrast = function (hexcolor) {
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        // console.log(yiq);
        return (yiq <= 210) ? 0 : 1;
    },
    clickingRadio = function (obj) {
        $(obj).find('.' + defaults.spanRadio).click(function (e) {
            e.stopPropagation();
            var $input = $(this).parent().find(defaults.radio);
            unchecRadio(obj);
            if (!($input.prop('checked'))) {
                $input.prop('checked', true);
                if ($input.length) {
                    $(this).addClass(defaults.spanSelected);
                }
            }
            if (defaults.onClickRadio) {
                defaults.onClickRadio(obj);
            }
        });
    },
    customColor = function (obj) {
        $(obj).parent().find('.' + defaults.spanRadio).addClass(defaults.classColor).css('background-color', '#' + $(obj).data('color'));
        $(obj).parent().find('.' + defaults.spanRadio).toolTip({ clase: defaults.tooltipClass });
    },
    customBorder = function (obj) {
        var borderAttr = 'background-color: #' + $(obj).data('colorborder'),
            contrast = checkContrast(String($(obj).data('colorborder'))),
            $spanRadio = $(obj).parent().find('.' + defaults.spanRadio),
            spanClass = defaults.spanRadio + ' ' + defaults.classBorder;
        if (contrast > 0) {
            spanClass = spanClass + ' ' + defaults.classLightBorder;
        }
        $spanRadio.attr({ 'class': spanClass, 'style': borderAttr })
            .append('<span class="' + defaults.outerBorder + '" ></span>')
            .append('<span class="' + defaults.innerBorder + '" style="' + borderAttr + '"></span>');
    },
    customImg = function (obj) {
        $(obj).parent().find('.' + defaults.spanRadio).addClass(defaults.classImg).css('background-image', 'url(' + $(obj).data('img') + ')');
        $(obj).parent().find('.' + defaults.spanRadio).toolTip({ clase: defaults.tooltipClass });
    },
    soldOut = function (obj) {
        $(obj).parent().find('.' + defaults.spanRadio).addClass(defaults.classSoldout);
        $(obj).remove();
    };
    return this.each(function () {
        if (!defaults.justClick) {
            wrappingInput(this);
        } else {
            clickingRadio(this);
            $(this).find('label').click(function (e) {
                e.stopPropagation();
                $(this).parent().find('.' + defaults.spanRadio).trigger('click');
            });
        }
    });
};// +++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMSELECT: Customizar el select
// +++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.customSelect = function (options) {
    var defaults = $.extend({
        selectHidden: 'select-hidden',
        divSelect: 'select-div',
        inputSelect: 'select-input',
        claseIcon: 'icon',
        claseTrigger: 'iconFont-downmenu',
        ulOptions: 'select-ul',
        claseActivo: 'select-activo',
        selectActive: 'select-active',
        onChangeSelect: false,
        disabledInput: 'select-disabled'
    }, options), numberOfOptions, selectContent, styledSelect, list, listItems,
    addClass = function (obj) {
        if ($(obj).data('clase')) {
            $(obj).parent().addClass($(obj).data('clase'));
        } else {
            $(obj).parent().addClass($(obj).parent().parent().attr('class'));
        }
    },
    addInput = function (obj) {
        if ($(obj).data('inputselect') && (!$('.msie8, .msie7, .msie6').length)) {
            selectContent = '<input type="text" class="' + defaults.inputSelect + '" size="0">';
        } else {
            selectContent = '<span class="' + defaults.inputSelect + '" size="0"/>';
        }
        $(obj).after(selectContent + '<span class="' + defaults.claseTrigger + '"/>');
        addInputSelect(obj);
    },
    addInputSelect = function (obj) {
        styledSelect = $(obj).siblings('.' + defaults.inputSelect);
        if ($(obj).attr('disabled')) {
            if ($(obj).data('inputselect')) {
                styledSelect.attr('disabled', 'disabled');
            }
            styledSelect.addClass(defaults.disabledInput).siblings('.' + defaults.claseTrigger).addClass(defaults.disabledInput);
        }
        var valor = $(obj).children('option').eq(0).text(),
            classOption = '', inputValue;
        $(obj).children('option').each(function (i) {
            if ($(this).attr('selected')) {
                valor = $(this).text();
                if (i !== 0) {
                    classOption = defaults.selectActive;
                    inputValue = true;
                }
            }
        });
        if ($(obj).children('option').eq(0).data('icon')) {
            classOption = classOption + ' ' + $(obj).children('option').eq(0).data('icon');
        }
        if ($(obj).data('inputselect') && (!$('.msie8, .msie7, .msie6').length)) {
            styledSelect.attr('placeholder', $(obj).children('option').eq(0).text());
            if (inputValue) {
                styledSelect.val(valor);
            }
        } else {
            styledSelect.text(valor);
        }
        styledSelect.addClass(classOption);
        addLista(obj);
    },
    addLista = function (obj) {
        list = $('<ul />', {
            'class': defaults.ulOptions
        }).insertAfter($(obj).parent().find('span.' + defaults.claseTrigger));
        for (var i = 0; i < numberOfOptions; i++) {
            var $opLi = $(obj).children('option').eq(i);
            $('<li />', {
                text: $opLi.text(),
                rel: $opLi.val(),
                'data-icon': $opLi.data('icon')
            }).appendTo(list);
        }
        listItems = list.children('li');
        clickingTrigger(obj);
    },
    changeSelect = function (obj) {
        defaults.onChangeSelect(obj);
    },
    clickingTrigger = function (obj) {
        var clickItem;
        if ($(obj).data('inputselect') && (!$('.msie8, .msie7, .msie6').length)) {
            clickItem = 'span.' + defaults.claseTrigger;
        } else {
            clickItem = 'span.' + defaults.claseTrigger + ', span.' + defaults.inputSelect;
        }
        $(obj).parent().on('click', clickItem, function (e) {
            if (!$(this).hasClass(defaults.disabledInput)) {
                e.stopPropagation();
                $('.' + defaults.ulOptions).hide();
                $(obj).siblings('.' + defaults.inputSelect).toggleClass(defaults.claseActivo);
                $(this).next('ul.' + defaults.ulOptions).toggle();
            }
        });
        clickingOption(obj);
    },
    clickingDocument = function (obj) {
        $(obj).siblings('.' + defaults.inputSelect).removeClass(defaults.claseActivo);
        $('.' + defaults.ulOptions).hide();
    },
    clickingOption = function (obj) {
        $(obj).change().parent().on('click', 'ul li', function (e) {
            resetSelected(obj);
            e.stopPropagation();
            styledSelect = $(obj).siblings('.' + defaults.inputSelect);
            var $this = $(this);
            if ($(obj).data('inputselect') && (!$('.msie8, .msie7, .msie6').length)) {
                styledSelect.val($this.text());
            } else {
                styledSelect.text($this.text());
            }
            styledSelect.removeClass(defaults.claseActivo)
            .addClass(defaults.selectActive);
            $(obj).val($this.attr('rel'));
            for (var o = 0, opts = $(obj).children('option') ; o < opts.length; o++) {
                if (opts.eq(o).val() === $this.attr('rel')) {
                    opts.eq(o).attr('selected', 'selected');
                    if (o === 0) {
                        styledSelect.val('');
                        styledSelect.removeClass(defaults.selectActive);
                    }
                }
            }
            $(obj).siblings('ul').hide();
            $(obj).trigger('change');
            onKeyUp(styledSelect);
        });
        $(obj).on('change', function (e) {
            e.stopPropagation();
            if (defaults.onChangeSelect) {
                changeSelect(obj);
            }
        });
        $(document).click(function () {
            clickingDocument(obj);
        });
    },
    resetSelected = function (obj) {
        $(obj).children('option').each(function () {
            $(this).removeAttr('selected');
        });
    },
    resizeInput = function (obj) {
        $(obj).attr('size', $(obj).val().length);
    },
    onKeyUp = function (obj) {
        $(obj).keyup(function () {
            resizeInput(this);
        }).each(function () {
            resizeInput(this);
        });
    },
    wrappingSelect = function (obj) {
        numberOfOptions = $(obj).children('option').length;
        $(obj).addClass(defaults.selectHidden);
        $(obj).wrap('<div class="' + defaults.divSelect + '"/>');
        addClass(obj);
        addInput(obj);
    };
    return this.each(function () {
        wrappingSelect(this);
    });
};// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMSLIDER: Deslizar el rango para cambiar valor de bits
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

jQuery.fn.customSlider = function (options) {
    var defaults = $.extend({
        wrapper: 'slider-wrapper',
        holder: 'slider-holder',
        handle: 'ui-slider-handle',
        bit: 'iconBit bit18px',
        amount: 'slider-amount',
        textValue: 'slider-textValue',
        textMin: 'slider-minValue',
        textMax: 'slider-maxValue',
        sliderBG: 'iconFont-slideBG',
        maxSelection: "maxselection"
    }, options),
    price, priceItem, datamax, realpriceItem, realprice, percent, percentItem, totalprice, totalpriceItem, maxSelection = 0,
    wrappingInput = function (obj) {
        asignaValues(obj);
        if ($(obj).data(defaults.maxselection)) {
            maxSelection = parseInt($(obj).data(defaults.maxSelection));
        }
        $(obj).wrap('<div class="' + defaults.wrapper + '"><div class="' + defaults.holder + '"/>');
        $(obj).parent().append('<div class="' + defaults.sliderBG + '"></div><a href="#" class="' + defaults.handle + '"><div class="' + defaults.bit + '"><span class="iconBG"/><span class="iconFont-bit"/></div><span class="' + defaults.amount + '">$<em>' + $(obj).val() + '</em></span></a>');
        $(obj).parent().parent().append('<span class="' + defaults.textValue + ' ' + defaults.textMin + '">' + $(obj).data('min') + '</span><span class="' + defaults.textValue + ' ' + defaults.textMax + '">' + putCommas(datamax) + '</span>');
        initSlider(obj);
    },
    asignaValues = function (obj) {
        if ($(obj).data('moveprice')) {
            priceItem = $('.' + $(obj).data('priceitem'));
            price = parseInt($(obj).data('price'), 10);
            priceItem.text(price);
            if ($(obj).data('max') > price) {
                datamax = price;
            } else {
                datamax = $(obj).data('max');
            }
        }
        if ($(obj).data('realprice')) {
            realpriceItem = $('.' + $(obj).data('realpriceitem'));
            realprice = parseInt($(obj).data('realprice'), 10);
            realpriceItem.text(putCommas(realprice));
        }
        if ($(obj).data('percent') && $(obj).data('realprice')) {
            percentItem = $('.' + $(obj).data('percent'));
            percent = 100 - parseInt((100 * price) / realprice, 10);
            percentItem.text(percent);
        }
        if ($(obj).data('save')) {
            $('.' + $(obj).data('saveitem')).text(putCommas($(obj).data('save')));
        }
        if ($(obj).data('price')) {
            $('.' + $(obj).data('priceitem')).text(putCommas($(obj).data('price')));
        }
        if ($(obj).data('shipping')) {
            $('.' + $(obj).data('shippingitem')).text(putCommas($(obj).data('shipping')));
        }
        if ($(obj).data('totalprice')) {
            totalpriceItem = $('.' + $(obj).data('totalpriceitem'));
            if ($(obj).data('shipping')) {
                totalprice = parseInt($(obj).data('price'), 10) + parseInt($(obj).data('shipping'), 10);
            } else {
                totalprice = $(obj).data('price');
            }
            totalpriceItem.text(putCommas(totalprice));
        }
    },
    initSlider = function (obj) {
        $(obj).parent().parent().find('.' + defaults.holder).slider({
            range: 'min',
            value: +$(obj).val(),
            min: +$(obj).data('min'),
            max: +datamax,
            slide: function (event, ui) {
                var previousValue = $(obj).val();
                if (ui.value > maxSelection) {
                    if (previousValue != maxSelection) {
                        $(this).slider('value', maxSelection);
                        $(obj).val(maxSelection);
                        $(obj).parent().find('.' + defaults.amount + ' em').text(+maxSelection);
                        totalpriceItem.text(putCommas(totalprice - maxSelection));
                        $('.' + $(obj).data('saveitem')).text(putCommas($(obj).data('save') + maxSelection));
                    }
                    return false;
                }
                $(obj).val(ui.value);
                var valor = +ui.value;
                $(obj).parent().find('.' + defaults.amount + ' em').text(putCommas(valor));
                if ($(obj).data('moveprice')) {
                    totalpriceItem.text(putCommas(totalprice - ui.value));
                }
                if ($(obj).data('percent') && $(obj).data('realprice')) {
                    percent = 100 - parseInt((100 * (price - ui.value)) / realprice, 10);
                    percentItem.text(percent);
                }
                if ($(obj).data('save')) {
                    $('.' + $(obj).data('saveitem')).text(putCommas($(obj).data('save') + ui.value));
                }

            },
            step: $(obj).data('step')
        });
    };
    return this.each(function () {
        wrappingInput(this);
    });
};// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      DATEPICKER: Calendario desplegable
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.datePicker = function (options) {
    $.datepicker.setDefaults($.datepicker.regional['es']);
    var defaults = $.extend({
        wrapper: 'datepicker-wrapper',
        option: {
            showOn: 'both',
            minDate: 0
        }
    }, options),
    initDatepicker = function (obj) {
        $(obj).datepicker(defaults.option);
    },
    wrappingDatepicker = function (obj) {
        $(obj).wrap('<div class="' + defaults.wrapper + '"/>');
        initDatepicker(obj);
    };
    return this.each(function () {
        wrappingDatepicker(this);
    });
};// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      HIDELOGO: Muestra / oculta el logo con el scroll
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.hideLogo = function () {
    return this.each(function () {
        var $obj = $(this),
            offset = $obj.offset();
        $(window).scroll(function () {
            if ($(window).scrollTop() > offset.top) {
                $obj.slideUp();
            } else {
                $obj.slideDown();
            }
        });
    });
};// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      IMAGEERROR: Poner imagen de error cuando no la encuentre
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.imageError = function (options) {
    var defaults = $.extend({
        src: 'images/misc/noImage.jpg',
        alt: 'No se encontró la imagen'
    }, options);
    return this.each(function () {
        $(this).error(function () {
            $(this).attr({
                src: defaults.src,
                alt: defaults.alt
            });
        });
    });
};// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      IMAGEPRODUCT: Colocar imagen grande desde carrusel derecho
//		Dependencias: jquery.zoom.js
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.imageProduct = function (options) {
    var defaults = $.extend({
        container: '.imageProduct-img',
        imgs: '.imageProduct-slide',
        activeSlide: false,
        zoom: true,
        evento: 'click',
        clickClass: 'imageProduct-current'
    }, options), bigImage, firstChild, imagenes, imagenGrande,
    asignaValues = function (obj) {
        bigImage = $(obj).find(defaults.container);
        imagenes = $(obj).find(defaults.imgs + ' img');
        if (defaults.activeSlide) {
            firstChild = imagenes.parent().parent().find(defaults.activeSlide).find('img').first();
        } else {
            firstChild = imagenes.first();
        }
        if (firstChild.data('image')) {
            imagenGrande = firstChild.data('image');
        } else {
            imagenGrande = firstChild.attr('src');
        }
        firstChild.parent().addClass(defaults.clickClass).siblings().removeClass(defaults.clickClass);
        imgGrande();
    },
    imgGrande = function () {
        bigImage.html('<img src="' + imagenGrande + '" alt="' + firstChild.attr('alt') + '">').hide().fadeIn();
        if (defaults.zoom) {
            bigImage.zoom();
        }
        asignaImages();
    },
    asignaImages = function () {
        imagenes.each(function () {
            var imgBg;
            if ($(this).data('image')) {
                imgBg = $(this).data('image');
            } else {
                imgBg = $(this).attr('src');
            }
            $(this).on(defaults.evento, function () {
                $(this).parent().addClass(defaults.clickClass).siblings().removeClass(defaults.clickClass);
                if (defaults.zoom) {
                    bigImage.trigger('zoom.destroy');
                }
                bigImage.find('img').attr({
                    src: imgBg,
                    alt: $(this).attr('alt')
                }).hide().fadeIn();
                if (defaults.zoom) {
                    bigImage.zoom();
                }
            });
        });
    };
    return this.each(function () {
        asignaValues(this);
    });
};// ++++++++++++++++++++++++++++++++++++++
//      FANCYBOX: Modales con FancyBox
// ++++++++++++++++++++++++++++++++++++++

jQuery.fn.fancyBox = function (options) {
    var defaults = $.extend({
        afterShow: false
    }, options),
    optionsFancybox = {},
    defaultFancybox = function (obj) {
        optionsFancybox = {
            padding: 0,
            margin: 0,
            width: $(obj).data('fancyboxwidth'),
            type: 'ajax',
            afterShow: defaults.afterShow
        };
    },
    hrefFancybox = function (obj) {
        optionsFancybox = {
            padding: 0,
            margin: 0,
            width: $(obj).data('fancyboxwidth'),
            href: $(obj).data('fancyboxhref'),
            iframe: {
                scrolling: 'auto',
                preload: true
            },
            type: 'iframe',
            afterShow: defaults.afterShow
        };
    },
    noCloseFancybox = function (obj) {
        optionsFancybox = {
            padding: 0,
            margin: 0,
            closeBtn: false,
            width: $(obj).data('fancyboxwidth'),
            href: $(obj).data('fancyboxhref'),
            iframe: {
                scrolling: 'auto',
                preload: true
            },
            type: 'iframe'
        };
    };
    return this.each(function () {
        if ($(this).data('fancyboxhref')) {
            hrefFancybox(this);
            $(this).fancybox(optionsFancybox);
        } else if ($(this).data('fancybox-noclosebtn')) {
            noCloseFancybox(this);
            $(this).fancybox(optionsFancybox);
        } else {
            defaultFancybox(this);
            $(this).fancybox(optionsFancybox);
        }
    });
};// +++++++++++++++++++++++++++++++++++++++++++++
//      POINT: Puntos en el look diario
// +++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.point = function (options) {
    var defaults = $.extend({
        tooltip: 'tooltip'
    }, options);
    return this.each(function () {
        if ($(this).data('top')) {
            $(this).css({
                top: $(this).data('top') + 'px',
                left: $(this).data('left') + 'px'
            });
        }
    }).toolTip({ clase: defaults.tooltip });
};// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      OPENFOLDER: Abrir el DIV superior del encabezado
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.openFolderWidget = function (options) {
    var defaults = $.extend({
        evento: 'click',
        trigger: '#winbits-widget .openClose',
        clase: 'downBar'
    }, options),
    openFolder = function (obj) {
        if ($(obj).hasClass(defaults.clase)) {
            $(obj).removeClass(defaults.clase);
        } else {
            $(obj).addClass(defaults.clase);
        }
    };
    return this.each(function () {
        var obj = this;
        $(document).on(defaults.evento, defaults.trigger, function () {
            openFolder(obj);
        });
    });
};// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      PRELOADER: Ocultar capa de precarga cuando termine el DOM
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.preloader = function () {
    this.each(function () {
        $(this).css('visibility', 'hidden');
    });
};// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SHOWDIV: Slide Up y Down divs
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.showDiv = function (options) {
    var defaults = $.extend({
        trigger: 'span',
        claseActivo: 'active',
        openFirst: true
    }, options),
    openDiv = function (obj) {
        $(obj).addClass(defaults.claseActivo).siblings().removeClass(defaults.claseActivo);
        $('.' + $(obj).data('show')).slideDown();
        $('.' + $(obj).data('hide')).slideUp();
    };
    return this.each(function () {
        $(this).find(defaults.trigger).each(function (i) {
            if (i === 0 && defaults.openFirst) {
                openDiv(this);
            }
            $(this).click(function () {
                openDiv(this);
            });
        });
    });
};// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SCROLLPANE: Scroll que aparece / desaparece
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.scrollpane = function (options) {
    var defaults = $.extend({
        parent: '.scrollpane',
        horizontalDragMinWidth: 40,
        horizontalDragMaxWidth: 40,
        reinitialize: false,
        delay: 500
    }, options),
    initializeScrollPane = function (obj) {
        var $this = $(obj),
            $minHeight = parseInt($this.css('minHeight'), 10),
            $height = parseInt($this.css('height'), 10),
            $maxHeight = parseInt($this.css('maxHeight'), 10);
        if ($maxHeight > $height) {
            $(obj).css('height', ($height + 10) + 'px');
        }
        $(obj).jScrollPane({
            horizontalDragMinWidth: defaults.horizontalDragMinWidth,
            horizontalDragMaxWidth: defaults.horizontalDragMaxWidth,
            autoReinitialise: defaults.reinitialize,
            autoReinitialiseDelay: defaults.delay
        });
    };
    return this.each(function () {
        if (defaults.parent) {
            if ($(defaults.parent).css('display') === 'none') {
                $(defaults.parent).css('display', 'block');
                initializeScrollPane(this);
                $(defaults.parent).css('display', 'none');
            } else {
                initializeScrollPane(this);
            }
        }
    });
};// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//		RESIZEFILTER: Agrega botón par ver más items y sólo muestra 5 por default
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

jQuery.fn.resizeFilter = function (options) {
    var defaults = $.extend({
        items: '.checkbox-wrapper, .clickoneroFilter-subContainer',
        contador: 5,
        filterMoreContainer: 'clickoneroFilter-more',
        filterIcon: 'clickoneroFilter-icon',
        filterMoreIcon: 'iconFont-down',
        filterLessIcon: 'iconFont-up',
        filterMoreText: 'más ',
        filterLessText: 'menos ',
        filterClass: 'clickoneroFilter-txt',
        filterHide: 'clickoneroFilter-hide',
        filterHasChild: false
    }, options), toggleTxt = true,
    countItems = function (obj) {
        var $lengthItems = $(obj).children(defaults.items);
        if ($lengthItems.length > defaults.contador) {
            if (!$(obj).find('.' + defaults.filterMoreContainer).length) {
                $(obj).append('<div class="' + defaults.filterMoreContainer + '"><span class="' + defaults.filterClass + '">' + defaults.filterMoreText + '</span><span class="' + defaults.filterIcon + ' ' + defaults.filterMoreIcon + '"></span></div>');
            }
            addClass(obj);
            clickFilterMore(obj);
        }
    },
    addClass = function (obj) {
        $(obj).children(defaults.items).each(function (i) {
            if (i >= defaults.contador) {
                $(this).slideToggle(100, function () {
                    $(this).toggleClass(defaults.filterHide);
                });
            }
        });
    },
    clickFilterMore = function (obj) {
        $(obj).find('.' + defaults.filterMoreContainer).click(function (e) {
            e.preventDefault();
            toggleText(obj);
            addClass(obj);
        });
    },
    toggleText = function (obj) {
        if (toggleTxt) {
            $(obj).find('.' + defaults.filterIcon).
                    removeClass(defaults.filterMoreIcon).
                    addClass(defaults.filterLessIcon);
            $(obj).find('.' + defaults.filterClass).text(defaults.filterLessText);
            toggleTxt = false;
        } else {
            $(obj).find('.' + defaults.filterIcon).
                    removeClass(defaults.filterLessIcon).
                    addClass(defaults.filterMoreIcon);
            $(obj).find('.' + defaults.filterClass).text(defaults.filterMoreText);
            toggleTxt = true;
        }
    };
    return this.each(function () {
        if (defaults.filterHasChild) {
            countItems($(this).find(defaults.filterHasChild));
        } else {
            countItems(this);
        }
    });
};

jQuery.fn.toggleCheck = function (options) {
    var defaults = $.extend({
        titleParent: 'h4',
        checkboxSpan: '.checkbox-span',
        selectClass: 'checkbox-checked',
        unSelectClass: 'checkbox-unchecked',
        subDiv: '.filter-subContainer',
        subSubDiv: 'filter-subsub'
    }, options),
    checkChilds = function (obj, siblings, slideToggle) {
        if ($(obj).find('input').prop('checked')) {
            $(siblings).find(defaults.checkboxSpan).removeClass(defaults.unSelectClass).addClass(defaults.selectClass);
            $(siblings).find('input').prop('checked', true);
            $(slideToggle).slideDown();
        } else {
            $(siblings).find(defaults.checkboxSpan).removeClass(defaults.selectClass).addClass(defaults.unSelectClass);
            $(siblings).find('input').prop('checked', false);
            $(slideToggle).slideUp();
        }
    };
    return this.each(function () {
        var $subDiv;
        if ($(this).parent().is(defaults.titleParent)) {
            $subDiv = $(this).parent().parent().find(defaults.subSubDiv);
            checkChilds(this, $(this).parent().siblings(), $subDiv);
        } else if ($(this).parent().is(defaults.subDiv)) {
            $subDiv = $(this).siblings(defaults.subSubDiv);
            checkChilds(this, $(this).siblings(defaults.subSubDiv), $subDiv);
        }
    });
};// ++++++++++++++++++++++++++++++++++++
//		TOOLTIP: Tooltips en objetos
// ++++++++++++++++++++++++++++++++++++

jQuery.fn.toolTip = function (options) {
    var defaults = $.extend({
        clase: 'tooltip',
        tipHTML: true
    }, options),
    asignaValor = function (obj) {
        var $this = $(obj), valor;
        if ($this.is(':parent')) {
            if (defaults.tipHTML) {
                valor = $this.html();
            } else {
                valor = $this.text();
            }

        } else if ($this.val()) {
            valor = $this.val();
        } else if ($this.data('tooltip')) {
            valor = $this.data('tooltip');
        } else if ($this.attr('title')) {
            valor = $this.attr('title');
        } else if ($this.attr('alt')) {
            valor = $this.attr('alt');
        } else {
            valor = '';
        }
        return valor;
    },
    appendHTML = function (valor, obj) {
        $('body').append('<div class="' + defaults.clase + '">' + valor + '</div>');
        $(obj).attr('title', '');
    },
    mueveTooltip = function (e) {
        if ($('.msie').length) {
            $('.' + defaults.clase).css({
                top: e.clientY + 5,
                left: e.clientX + 5
            });
        } else {
            $('.' + defaults.clase).css({
                top: e.pageY + 5,
                left: e.pageX + 5
            });
        }
    },
    remueveHTML = function (valor, obj) {
        $('body').find('.' + defaults.clase).remove();
        $(obj).attr('title', valor);
    };
    return this.each(function () {
        var val = asignaValor(this);
        if (val !== '') {
            $(this).on({
                mouseenter: function () { appendHTML(val, this); },
                mousemove: mueveTooltip,
                mouseleave: function () { remueveHTML(val, this); }
            });
        }
    });
};// @codekit-prepend  "js/scripts/isMobile.js";
// @codekit-prepend  "js/scripts/acordeonFilter.js";
// @codekit-prepend  "js/scripts/carouselSwiper.js";
// @codekit-prepend  "js/scripts/carruselVerticalSwiper.js";
// @codekit-prepend  "js/scripts/changeOffer.js";
// @codekit-prepend  "js/scripts/chooseDate.js";
// @codekit-prepend  "js/scripts/customCheckbox.js";
// @codekit-prepend  "js/scripts/customRadio.js";
// @codekit-prepend  "js/scripts/customSelect.js";
// @codekit-prepend  "js/scripts/customSlider3-ck.js";
// @codekit-prepend  "js/scripts/datePicker.js";
// @codekit-prepend  "js/scripts/hideLogo.js";
// @codekit-prepend  "js/scripts/imageError.js";
// @codekit-prepend  "js/scripts/imageProduct.js";
// @codekit-prepend  "js/scripts/fancyBox.js";
// @codekit-prepend  "js/scripts/point.js";
// @codekit-prepend  "js/scripts/openFolderWidget.js";
// @codekit-prepend  "js/scripts/preloader.js";
// @codekit-prepend  "js/scripts/showDiv.js";
// @codekit-prepend  "js/scripts/scrollpane.js";
// @codekit-prepend  "js/scripts/resizeFilter.js";
// @codekit-prepend  "js/scripts/toolTip.js";

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//     Funciones que se deben cargar al finalizar el DOM en todas las páginas
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function DocumentReady() {
    isMobile();
    $('.clickoneroPreloader').preloader();
    $('.clickoneroSelect').customSelect();
    $('.slider-input').customSlider({});
    $('.clickoneroFancybox').fancyBox();
    $('img').imageError({ src: 'clickoneroInclude/images/misc/noImage.jpg' });
    $('.clickoneroMainHeader').openFolderWidget();
    $('.clickoneroToolTip').toolTip({ clase: 'clickoneroTool-Tip' });
    $('.ck-banner-campaing').each(function () {
        if ($(this).find('p').text().length > 20) {
            $(this).toolTip({ clase: 'clickoneroTool-Tip', tipHTML: false });
        }
    });
}

