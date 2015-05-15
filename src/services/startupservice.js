/**
 * Created by USER on 05.09.2014.
 */



this.keno = this.keno||{};


(function() {
    "use strict";
    var StartupService = function (h) {
        this.initialize(h);
    };

    var p = StartupService.prototype;



//public properties

//private properties

    p._host;

    p._gameModel;
    p._gameView;
    p._gameController;

    p._remoteService;

    /**
     *
     * @param h главнывй контейер
     */
    p.initialize = function(h) {
        this._host = h;
    };


//public methods
    p.init = function () {


        this._initModel();
        this._initRemoteService();
        this._initView();
        this._initController();
    }


//private methods
    p._initModel = function() {
        this._gameModel = new keno.GameModel();
    }

    p._initView = function () {
        this._gameView = new keno.GameView();
        this._host.addChild(this._gameView);
    }

    p._initRemoteService = function() {
        this._remoteService = new keno.RemoteService();
        this._remoteService.init(this._gameModel);
    }

    p._initController = function () {
        this._gameController = new keno.GameController(this._gameModel, this._gameView, this._remoteService);
        this._gameController.init();
    }

    keno.StartupService = StartupService;

})();