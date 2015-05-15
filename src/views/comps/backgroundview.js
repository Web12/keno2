/**
 * Created by USER on 17.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var BackgroundView = function () {
        this.initialize();
    };

    //Наследуем
    var p = BackgroundView.prototype = new createjs.Container();

//public properties

//private properties


    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        var background = new createjs.Bitmap(new keno.AssetLoader.getAsset('background'));
        this.addChild(background);
    };

    keno.BackgroundView = BackgroundView
})();