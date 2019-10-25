(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.newShop = win.smg.newShop || {};
    win.smg.newShop.page = win.smg.newShop.page || {};
    win.smg.newShop.page.pageObjs = win.smg.newShop.page.pageObjs || [];
    win.smg.newShop['productDetailSimple'] = win.smg.newShop['productDetailSimple'] || {};

    var V_STATIC = win.smg.aem.varStatic,
        NEWSHOP = win.smg.newShop,
        PAGE = NEWSHOP.page,
        PAGEOBJS = PAGE.pageObjs,
        HCOMPONENT = win.smg.newShop['productDetailSimple'],
        UTIL = HCOMPONENT.common.util,
        pluginName = 'component',
        pluginCallName = 'componentCall';

    HCOMPONENT[pluginName] = function (container, args) {
        var defParams = {
            obj : container
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    HCOMPONENT[pluginName].prototype = {
        init : function () {
            this.setElements();
        },
        setElements : function () {
            
        }
    };

    HCOMPONENT['PAGE_COMPONENT_INDEX'] = [];

    HCOMPONENT[pluginCallName] = function (args) {
        var defParams = {
            obj : '.product-details-simple',
            isAemEditMode : UTIL.isAemEditMode()
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    HCOMPONENT[pluginCallName].prototype = {
        init : function () {
            if (!this.opts.isAemEditMode) { // isAemEditMode가 false(비활성화) 상태일 경우 실행
                this.delComponent();
                this.callComponent();
            }
        },
        delComponent : function () { // 모루게따 어렵따..
            var component_index = HCOMPONENT['PAGE_COMPONENT_INDEX'];
            for (var i = 0, max = component_index.length; i < max; max--) {
                PAGEOBJS[component_index[max - 1]].destroy();
                PAGEOBJS[component_index[max - 1]] = null;
            }
            HCOMPONENT['PAGE_COMPONENT_INDEX'] = [];
        },
        callComponent : function () { // 실질적으로 HCOMPONENT[pluginName]을 호출하여 실행시키는 함수
            for (var i = 0, max = this.obj.length; i < max; i++) {
                HCOMPONENT['PAGE_COMPONENT_INDEX'].push(PAGEOBJS.length);
                // HCOMPONENT this.obj 갯수만큼 생성하여 PAGEOBJS에 push
                PAGEOBJS.push(new HCOMPONENT[pluginName](this.obj.eq(i), {
                    // HCOMPONENT[pluginName]객체로 globalObjscall 메소드를 args 인자값으로 넘겨줌
                    // HCOMPONENT에서 outCallback 메소드 활용하여 globalObjsCall 실행
                    loadAfter : $.proxy(this.globalObjsCall, this) 
                }));
                
            }
        },
        globalObjsCall : function () {
            for (var i = 0, max = PAGEOBJS.length; i < max; i++) { // PAGEOBJS에 담긴 객체 갯수 체크
                // 참조타입을 for문으로 돌려서 각각 click 이벤트를 줘야할 경우 즉시실행함수를 사용하지 않으면 가장 값에만 click 이벤트가 부여되므로 즉시실행함수 사용
                (function (index) { 
                    if (PAGEOBJS[index] != null) { // PAGEOBJS 내에 객체가 존재할 경우(null이 아닐 경우)
                        PAGEOBJS[index].reInit(); // PAGEOBJS에 담아둔 컴포넌트를 전체적으로 reInit 시킨다.
                    }
                })(i);
            }
        }
    };
    $(function () {
        new HCOMPONENT[pluginCallName]();
    });
})(window, window.jQuery, window.document);
