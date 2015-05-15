/**
 * Created by USER on 18.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var NumView = function () {
        this.initialize();
    };

    //Наследуем
    var p = NumView.prototype = new createjs.Container();

//static

//public
    p.numTextValue = null;


//private properties
    p._numValue = null;
    p._numChip = null;



    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        this.mouseChildren = false;

        this._numValue = new createjs.Text('', '28px EastAP', '#B4B4B4');
        this._numValue.x = 32;
        this._numValue.y = 32;
        this._numValue.width = 60;
        this._numValue.height = 60;
        this._numValue.textAlign = 'center';
        this._numValue.textBaseline = 'middle';
        this._numValue.cache = true;
        this.addChild(this._numValue);

        var shape = new createjs.Shape();
        shape.graphics.beginFill('#000000');
        shape.graphics.drawRect(0, 0, 60, 60);
        shape.graphics.endFill();
        shape.alpha = 0.01;
        shape.cache = true;
        this.addChildAt(shape, 0);
    };

    p.setLabel = function( value ) {
        this.numTextValue = value;

        this._numValue.text = this.numTextValue;
    };

    p.showChip = function()
    {
        this.hideChip();

        this._numValue.y = 27;
        //this._numValue.scaleX = 0.7;
        //this._numValue.scaleY = 0.7;

        this._numChip = new createjs.Bitmap(keno.AssetLoader.getAsset('black_chip'));
        this._numChip.scaleX = 0.9;
        this._numChip.scaleY = 0.9;
        this._numChip.x = 3;
        this._numChip.y = 0;
        this.addChildAt(this._numChip, 0);
    };

    p.hideChip = function()
    {
        this._numValue.y = 32;
//        this._numValue.x = 0;
//        this._numValue.y = 0;


        if (this._numChip != null) {
            this.removeChild(this._numChip);
            this._numChip = null;
        }
    };

    keno.NumView = NumView;
})();