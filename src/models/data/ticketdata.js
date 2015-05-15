/**
 * Created by USER on 18.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var TicketData = function () {
        this.initialize();
    };

    //Наследуем
    var p = TicketData.prototype = new createjs.Container();

//static

//public
    p.type = null;
    p.betValue = null;
    p.betLabelColor = null;
    p.matchValue = null;
    p.selectedNumsValue = null;
    p.winValue = null;
    p.nums = null;
    p.isChecked = false;
    p.isConfirmed = false;

//private properties


    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();
    };

    keno.TicketData = TicketData;
})();