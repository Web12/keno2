/**
 * Created by USER on 27.09.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var ErrorView = function () {
        this.initialize();
    };

    //Наследуем
    var p = ErrorView.prototype = new createjs.Container();

//static
    ErrorView.LINE_WIDTH = 630;
    ErrorView.LINE_HEIGHT = 30;
    ErrorView.OFFSET = 100;

//private properties
    p._holder;

    p._errorBack;
    p._errorLabel;
    p._errorMsg;

    p._waitTimer;



    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        this._createHolder();

        this._errorBack = new createjs.Bitmap(keno.AssetLoader.getAsset('error_back'));
        this._errorBack.x = keno.GameModel.APP_WIDTH /2 - ErrorView.LINE_WIDTH / 2;
        this._errorBack.y = keno.GameModel.APP_HEIGHT - ErrorView.LINE_HEIGHT;
        this._holder.addChild(this._errorBack);

        this._errorLabel = new createjs.Text('', '21px Tahoma', '#000000');
        this._errorLabel.x = this._errorBack.x + ErrorView.LINE_WIDTH /2;
        this._errorLabel.y = this._errorBack.y;
        this._errorLabel.width = ErrorView.LINE_WIDTH;
        this._errorLabel.height = 120;
        this._errorLabel.textAlign = 'center';
        this._errorLabel.cache = true;
        this._holder.addChild(this._errorLabel);

        this._holder.y = this._holder.y + ErrorView.LINE_HEIGHT + ErrorView.OFFSET;
    }

    p.showError = function( errorMsg )
    {
        this._errorMsg = errorMsg;

        this._errorLabel.text = this._errorMsg;

        createjs.Tween.get(this._holder, { loop : false }).to( { y : 0 }, 1000, createjs.Ease.none );

        this._clearTimer();

        this._waitTimer = setInterval(this._onWaitTimer.bind(this), 5000);
    }

    p._onWaitTimer = function()
    {
        this._clearTimer();

        createjs.Tween.get(this._holder, { loop : false }).to( { y : this._holder.y + ErrorView.LINE_HEIGHT + 100 }, 1000, createjs.Ease.none );
    }

    p._clearTimer = function() {
        if (this._waitTimer != null) {
            clearInterval(this._waitTimer);
        }
    }

    p._createHolder = function()
    {
        if ( this._holder != null ) {
            this.removeChild( this._holder );
        }

        this._holder = new createjs.Container();
        this._holder.mouseChildren = false;
        this.addChild(this._holder);
    }

    keno.ErrorView = ErrorView;
})();