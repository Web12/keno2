/**
 * Created by USER on 20.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var ChipView = function () {
        this.initialize();
    };

    //Наследуем
    var p = ChipView.prototype = new createjs.Container();

//static

//public
    p.label = '';

//private properties
    p._numValue = null;
    p._chip = null;
    p._holder = null;
    p._crossHolder = null;

    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        this._numValue = new createjs.Text('', '14px EastAP', '#B4B4B4');
        this._numValue.x = 18;
        this._numValue.y = 20;
        this._numValue.textAlign = 'center';
        this._numValue.textBaseline = 'middle';
        this._numValue.cache = true;
        this.addChild(this._numValue);

        this._createHolder();
        this._createCrossHolder();
    }

    p.setLabel = function( label ) {
        this.label = label;

        this._numValue.text = label;
    }

    p.showBlackChip = function () {
        if ( this._chip != null ) {
            this._holder.removeChild(this._chip);
        }

        this._chip = new createjs.Bitmap(keno.AssetLoader.getAsset('chips_2_small'));
        this._chip.x = 3;
        this._chip.y = 0;
        this._holder.addChild(this._chip);

        this._numValue.y = 16;
        this._numValue.color ='#817E7D';
    };

    p.showYellowChip = function () {
        if ( this._chip != null ) {
            this._holder.removeChild(this._chip);
        }

        this._chip = new createjs.Bitmap(keno.AssetLoader.getAsset('chips_3_small'));
        this._chip.x = 3;
        this._chip.y = 0;
        this._holder.addChild(this._chip);

        this._numValue.y = 16;
        this._numValue.color ='#817E7D';
    };

    p.showGreenChip = function () {
        if ( this._chip != null ) {
            this._holder.removeChild(this._chip);
        }

        this._chip = new createjs.Bitmap(keno.AssetLoader.getAsset('chips_1_small'));
        this._chip.x = 3;
        this._chip.y = 0;
        this._holder.addChild(this._chip);

        this._numValue.y = 16;
        this._numValue.color ='#817E7D';
    };

    p.showCross = function()
    {
        this._chip = new createjs.Bitmap(keno.AssetLoader.getAsset('cross'));
        this._chip.x = 10;
        this._chip.y = 10;
        this._crossHolder.addChild(this._chip);
    };

    p.clearChip = function() {
        this._createHolder();
        this._createCrossHolder();
    };

    p._createCrossHolder = function () {
        if ( this._crossHolder != null ) {
            this.removeChild(this._crossHolder);
        }

        this._crossHolder = new createjs.Container();
        this.addChild(this._crossHolder);
    };


    p._createHolder = function () {
        if ( this._holder != null ) {
            this.removeChild(this._holder);
        }

        this._holder = new createjs.Container();
        this.addChildAt(this._holder, 0);
    };

    keno.ChipView = ChipView;
})();