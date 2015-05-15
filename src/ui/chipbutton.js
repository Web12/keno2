/**
 * Created by USER on 18.10.2014.
 */


this.keno = this.keno||{};

(function() {
    "use strict";
    var ChipButton = function (chipBitmapData, betValue, labelColor) {
        this.initialize(chipBitmapData, betValue, labelColor);
    };

    //Наследуем
    var p = ChipButton.prototype = new createjs.Container();

//static

//public
    p.id = -1;
    p.betValue = 0;

//private properties
    p._content = null;
    p._chipBetValue = null;
    p._chipBitmapData = null;

    p.Container_initialize = p.initialize;
    p.initialize = function (chipBitmapData, betValue, labelColor) {
        this.Container_initialize();

        this._chipBitmapData = chipBitmapData;
        this.betValue = betValue;

        this.mouseChildren = false;

        this._content = new createjs.Bitmap(this._chipBitmapData);
        this._content.regX = this._chipBitmapData.width / 2;
        this._content.regY = this._chipBitmapData.height / 2;
        this.addChild(this._content);

        this._chipBetValue = new createjs.Text(this.betValue.toString(), '30px EastAP', labelColor);
        this._chipBetValue.y = 7;
        this._chipBetValue.textAlign = 'center';
        this._chipBetValue.textBaseline = 'middle';
        this.addChild(this._chipBetValue);
    };

    keno.ChipButton = ChipButton;
})();