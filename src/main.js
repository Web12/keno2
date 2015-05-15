/**
 * Created by USER on 05.09.2014.
 */

//и все таки тебе быть глобальным.
var stage;

this.aztec = this.aztec||{};
(function() {

    "use strict";
    var Main = function () {
        this.initialize();
    };

    //Наследуем
    var p = Main.prototype;

    /**
     * Конструктор.
     */
    p.initialize = function() {

        stage = new createjs.Stage("demoCanvas");
        stage.enableMouseOver(10);
        stage.mouseMoveOutside = true;

        _onResize();

        createjs.Touch.enable(stage, true);
        createjs.Ticker.setFPS(60);

        keno.AssetLoader.init();
        keno.AssetLoader.addFileLoadedCallback(this._onFileLoaded);
        keno.AssetLoader.addAllFilesLoadedCallback(this._onAllFilesLoaded);
        keno.AssetLoader.loadAll(keno.Assets.getAllAssets());
    };

    p._onFileLoaded = function () {

    };

    p._onAllFilesLoaded = function(){
        var host = new createjs.Container();
        stage.addChild(host);

        var startupService = new keno.StartupService(host);
        startupService.init();
    };


    keno.Main = Main;
})();


window.onload = function() {
    var main = new keno.Main();
	var queue = new createjs.LoadQueue(true, null, true);
}

window.onresize = function() {
    var canvas = document.getElementById("demoCanvas");

    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;

    _onResize();

};

var _onResize = function () {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var ow = 1600;
    var oh = 900;

    var keepAspectRatio = true;
    if (keepAspectRatio)
    {
        var scale = Math.min(w / ow, h / oh);
        stage.scaleX = scale;
        stage.scaleY = scale;

        stage.canvas.width = ow * scale;
        stage.canvas.height = oh * scale;
    }
    else
    {
        stage.scaleX = w / ow;
        stage.scaleY = h / oh;

        stage.canvas.width = ow * stage.scaleX;
        stage.canvas.height = oh * stage.scaleY;
    }



    // update the stage
    stage.update()
};
