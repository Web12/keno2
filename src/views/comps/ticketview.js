/**
 * Created by USER on 18.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var TicketView = function ( ticketData ) {
        this.initialize( ticketData );
    };

    //Наследуем
    var p = TicketView.prototype = new createjs.Container();

//static

//public
    p.isChecked = false;
    p.winValue = 0;

//private
    p._labelsHolder = null;
    p._chipsHolder = null;

    p._ticketBack = null;
    p._ticketWinStateView = null;

    p._ticketPriceValue = null;
    p._ticketCountValue = null;

    p._ticketData = null;
    p._coincNums = null;

    p.Container_initialize = p.initialize;
    p.initialize = function ( ticketData ) {
        this.Container_initialize();

        this._ticketData = ticketData;
        this._coincNums = [];
        this.mouseChildren = false;

        var ticketPatterns =    [
                                    keno.AssetLoader.getAsset('type_5_small'),
                                    keno.AssetLoader.getAsset('type_4_small'),
                                    keno.AssetLoader.getAsset('type_3_small'),
                                    keno.AssetLoader.getAsset('type_2_small'),
                                    keno.AssetLoader.getAsset('type_1_small')
                                ];

        this._ticketBack = new createjs.Bitmap(ticketPatterns[this._ticketData.type]);
        this.addChild(this._ticketBack);

        var n = 0;
        this._createChipsHolder();
        this._createLabelsHolder();
        for (var i = 0; i < 8; i++)
        {
            for (var j = 0; j < 10; j++)
            {

                var chipView = new keno.ChipView();
                chipView.x = 3 + (j * 32.7);
                chipView.y = 2 + (i * 33);
                chipView.setLabel( (n + 1) + "" );
                this._chipsHolder.addChild(chipView);


                if ( this._ticketData.nums.indexOf( n + 1 ) != -1) {
                    chipView.showBlackChip();
                }

                n++;
            }
        }

        this._ticketCountValue = new createjs.Text(this._ticketData.nums.length.toString(), '52px EastAP', ticketData.betLabelColor);
        this._ticketCountValue.x = 37;
        this._ticketCountValue.y = 275;
        this._ticketCountValue.cache = true;
        this._ticketCountValue.textAlign = 'center';
        this.addChild(this._ticketCountValue);

        this._ticketPriceValue = new createjs.Text(this._ticketData.betValue.toString(), '52px EastAP', ticketData.betLabelColor);
        this._ticketPriceValue.x = 330;
        this._ticketPriceValue.y = 275;
        this._ticketPriceValue.cache = true;
        this._ticketPriceValue.textAlign = 'right';
        this.addChild(this._ticketPriceValue);

        this.isChecked = this._ticketData.isChecked;
    };



    p.checkNum = function( ballNum, coefs)
    {
        var currentChipView = null;
        var isContain = false;
        for (var i = 0; i < this._chipsHolder.children.length; i++)
        {
            var chipView = this._chipsHolder.getChildAt(i);

            for (var j = 0; j < this._ticketData.nums.length; j++)
            {
                var num = this._ticketData.nums[j];

                if (num == ballNum && parseInt(chipView.label) == ballNum) {

                    //numValue.textColor = 0x00ff00;
                    isContain = true;
                }
            }

            if (  parseInt(chipView.label) == ballNum) {
                currentChipView = chipView;
            }

            //if (  parseInt(chipView.label) == ballNum && isContain == false) {
            //    chipView.showCross();
                //numValue.textColor = 0x0000ff;
            //}
        }


        if ( isContain == true ) {
            this._ticketData.matchValue += 1;
            this._coincNums.push(currentChipView);

            var index = ((this._ticketData.matchValue - 1) * 10) + (this._ticketData.selectedNumsValue - 1);
            var coef  = coefs[index];
            this._ticketData.winValue = coef * this._ticketData.betValue;

            if (this._ticketData.winValue > 0 ){
                for (var i = 0; i < this._coincNums.length; i++) {
                    var chipView = this._coincNums[i];
                    chipView.showGreenChip();
                }

                this.showWinState(this._ticketData.winValue);

            }else {
                currentChipView.showYellowChip();
            }


            keno.SoundUtil.getInstance().playSound(keno.SoundUtil.IS_COINCED_SOUND);
        } else {
            currentChipView.showCross();
            keno.SoundUtil.getInstance().playSound(keno.SoundUtil.MISS_SOUND);
        }

        this.winValue = this._ticketData.winValue;
    };

    p.clearNums = function()
    {
        for (var i = 0; i < this._chipsHolder.children.length; i++)
        {
            var chipView = this._chipsHolder.getChildAt(i);
            chipView.clearChip();

            if ( this._ticketData.nums.indexOf( i + 1 ) != -1) {
                chipView.showBlackChip();
            }
        }

        this._coincNums = [];
    }

    p._createChipsHolder = function()
    {
        if ( this._chipsHolder != null )  {
            this.removeChild(this._chipsHolder);
        }

        this._chipsHolder = new createjs.Container();
        this.addChild(this._chipsHolder);
    };


    p.showWinState = function(winValue) {

        if (this._ticketWinStateView != null) {
            this._ticketWinStateView.changeWinValue(winValue);
        } else {
            this._ticketWinStateView = new keno.TicketWinStateView(winValue);
            this._ticketWinStateView.x = 189;
            this._ticketWinStateView.y = 260;
            this._ticketWinStateView.scaleX = 5;
            this._ticketWinStateView.scaleY = 5;
            this._ticketWinStateView.alpha = 0;
            this.addChild(this._ticketWinStateView);

            createjs.Tween.get(this._ticketWinStateView, {loop: false}).to({scaleX: 1, scaleY: 1, alpha: 1}, 200);
        }
    };

    p.clearWinState = function() {
        if (this._ticketWinStateView != null) {
            this.removeChild(this._ticketWinStateView);
            this._ticketWinStateView = null;
        }
    };

    p._createLabelsHolder = function()
    {
        if ( this._labelsHolder != null ) {
            this.removeChild(this._labelsHolder);
        }

        this._labelsHolder = new createjs.Container();
        this.addChild(this._labelsHolder);
    };

    keno.TicketView = TicketView;
})();