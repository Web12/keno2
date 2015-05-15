/**
 * Created by am_urunov on 22.09.2014.
 */



this.keno = this.keno||{};
(function() {

    "use strict";
    var Api = function () {
        this.initialize();
    };

    //Наследуем
    var p = Api.prototype = new createjs.EventDispatcher();

    Api.ON_API_REQUEST = 'onapirequest';

//public

    p.localSimulate = false;

    /**
     * Конструктор.
     */
    p.initialize = function () {
        if (window['cppObj'] != null) {
            window['cppObj'].toJs.connect(window['toJs']);
        } else {
            this.localSimulate = true;
        }
    }
    
    p.toJs = function (msg) {
        window['toJs'](msg);
    }

    window['toJs'] = function(msg) {

        var event = new createjs.Event(Api.ON_API_REQUEST);
        event.apiData = msg;
        api.dispatchEvent(event);

        console.log(msg);
    }



    p.fromJs = function(msg) {
        console.log(msg);

        if (window['cppObj'] != null) {
            window['cppObj'].fromJs(msg);
        }
    }



    keno.Api = Api;
})();

