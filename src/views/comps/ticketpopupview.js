/**
 * Created by am_urunov on 17.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var TicketPopupView = function (betsValue, coefs) {
        this.initialize(betsValue, coefs);
    };

    //Наследуем
    var p = TicketPopupView.prototype = new createjs.Container();

//static
    TicketPopupView.ON_CLOSE = 'onticketpopupviewclose';


//private properties
    p._holder = null;
    p._chipsHolder = null;
    p._coefsLabelsHolder = null;
    p._compareLabelsHolder = null;
    p._numsHolder = null;

    p._ticketTypeBitmap = null;
    p._ticketCircleBitmap = null;

    p._ticketPatterns = null;
    p._ticketCirclesPatterns = null;
    p._selectedNums = null;

    p._randomButton = null;
    p._refreshButton = null;
    p._closeButton = null;
    p._completeButton = null;

    p._betsTitleLabel = null;
    p._ticketPriceValue = null;

    p._betsValue = null;
    p._coefs = null;
    p._chipLabelColors = null;

    p._canClose = false;

    p._ticketPatternCount = 4;
    p._currentChipBet = 0;
    p._isChipSelected = true;

    p.Container_initialize = p.initialize;
    p.initialize = function (betsValue, coefs) {
        this.Container_initialize();

        this._betsValue = betsValue;
        this._coefs = coefs;

        this._currentChipBet = this._betsValue[this._betsValue.length - 1];
    }

    p.showPopup = function(){

        this._selectedNums = [];

        this._ticketPatterns =  [
                                    keno.AssetLoader.getAsset('type_5'),
                                    keno.AssetLoader.getAsset('type_4'),
                                    keno.AssetLoader.getAsset('type_3'),
                                    keno.AssetLoader.getAsset('type_2'),
                                    keno.AssetLoader.getAsset('type_1')
                                ];

        this._ticketCirclesPatterns =   [
                                    keno.AssetLoader.getAsset('circle_type_5'),
                                    keno.AssetLoader.getAsset('circle_type_4'),
                                    keno.AssetLoader.getAsset('circle_type_3'),
                                    keno.AssetLoader.getAsset('circle_type_2'),
                                    keno.AssetLoader.getAsset('circle_type_1')
                                ];


        this._createHolder();

        var invisibleBackground = new createjs.Shape();
        invisibleBackground.graphics.beginFill('#ffffff');
        invisibleBackground.graphics.drawRect(0, 0, keno.GameModel.APP_WIDTH, keno.GameModel.APP_HEIGHT);
        invisibleBackground.graphics.endFill();
        invisibleBackground.alpha = 0.01;
        invisibleBackground.cache = true;
//        invisibleBackground.on('mousedown', this._onBackgroundMouseDown.bind(this));
        this._holder.addChild(invisibleBackground);


        var popupBackgroudRedBitmap = new createjs.Bitmap(keno.AssetLoader.getAsset('add_ticket_popup_back_red'));
        popupBackgroudRedBitmap.x = 255;
        popupBackgroudRedBitmap.y = 25;
        this._holder.addChild(popupBackgroudRedBitmap);

        var ticketGrid = new createjs.Bitmap(keno.AssetLoader.getAsset('add_ticket_grid'));
        ticketGrid.x = 270;
        ticketGrid.y = 36;
        this._holder.addChild(ticketGrid);

        this._ticketTypeBitmap = new createjs.Bitmap(this._ticketPatterns[this._ticketPatternCount]);
        this._ticketTypeBitmap.scaleX = 0.915;
        this._ticketTypeBitmap.scaleY = 0.92;
        this._ticketTypeBitmap.x = 264;
        this._ticketTypeBitmap.y = 26;
        this._holder.addChild(this._ticketTypeBitmap);

        this._ticketCircleBitmap = new createjs.Bitmap(new Image());
        this._ticketCircleBitmap.scaleX = 0.8;
        this._ticketCircleBitmap.scaleY = 0.8;
        this._ticketCircleBitmap.x = 660;
        this._ticketCircleBitmap.y = 560;
        this._holder.addChild(this._ticketCircleBitmap);

        var popupBackgroudBitmap = new createjs.Bitmap(keno.AssetLoader.getAsset('add_ticket_popup'));
        this._holder.addChild(popupBackgroudBitmap);

        this._chipLabelColors = ['#FEAA4D', '#FAEE42', '#D1DF3C', '#6AF1FF', '#ffffff'];

        this._ticketPriceValue = new createjs.Text('', '75px EastAP', this._chipLabelColors[this._ticketPatternCount]);
        this._ticketPriceValue.x = 710;
        this._ticketPriceValue.y = 607;
        this._ticketPriceValue.cache = true;
        this._ticketPriceValue.textAlign = 'center';
        this._ticketPriceValue.textBaseline = 'middle';
        this._holder.addChild(this._ticketPriceValue);



        this._randomButton = new keno.Button(keno.AssetLoader.getAsset('random_ticket_button'));
        this._randomButton.x = 282;
        this._randomButton.y = 558;
        this._randomButton.addEventListener(keno.Button.ON_BUTTON_DOWN, this._onButtonDown.bind(this));
        this._holder.addChild(this._randomButton);

        this._refreshButton = new keno.Button(keno.AssetLoader.getAsset('refresh_ticket_button'));
        this._refreshButton.x = 395;
        this._refreshButton.y = 558;
        this._refreshButton.addEventListener(keno.Button.ON_BUTTON_DOWN, this._onButtonDown.bind(this));
        this._holder.addChild(this._refreshButton);

        this._closeButton = new keno.Button(keno.AssetLoader.getAsset('close_ticket_button'));
        this._closeButton.x = 510;
        this._closeButton.y = 568;
        this._closeButton.addEventListener(keno.Button.ON_BUTTON_DOWN, this._onButtonDown.bind(this));
        this._holder.addChild(this._closeButton);

        this._completeButton = new keno.Button(keno.AssetLoader.getAsset('complete_ticket_button_normal'));
        this._completeButton.x = 795;
        this._completeButton.y = 570;
        this._completeButton.visible = false;
        this._completeButton.addEventListener(keno.Button.ON_BUTTON_DOWN, this._onButtonDown.bind(this));
        this._holder.addChild(this._completeButton);

        //this._betsTitleLabel = new createjs.Text(keno.LangHolder.getLang().ratingslabel, '22px EastAP', '#838383');
        //this._betsTitleLabel.x = 1002;
        //this._betsTitleLabel.y = 20;
        //this._betsTitleLabel.height = 45;
        //this._betsTitleLabel.textAlign = 'center';
        //this._holder.addChild(this._betsTitleLabel);

        this._createChipsHolder();



        var chipBitmapDatas =   [
                                    keno.AssetLoader.getAsset('ticket_chip_red'),
                                    keno.AssetLoader.getAsset('ticket_chip_yellow'),
                                    keno.AssetLoader.getAsset('ticket_chip_green'),
                                    keno.AssetLoader.getAsset('ticket_chip_blue'),
                                    keno.AssetLoader.getAsset('ticket_chip_gray')
                                ];




        var chipPosDatas = [new createjs.Point(1005, 66), new createjs.Point(1005, 193), new createjs.Point(1005, 321),
                            new createjs.Point(1005, 447), new createjs.Point(1005, 575)];


        for (var i = 0; i < 5; i++ )
        {
            var chipButton = new keno.ChipButton(chipBitmapDatas[i], this._betsValue[i], this._chipLabelColors[i]);
            chipButton.id = i;
            chipButton.x = chipPosDatas[i].x;
            chipButton.y = chipPosDatas[i].y;
            chipButton.addEventListener('mousedown', this._onChipMouseDown.bind(this));
            this._chipsHolder.addChild(chipButton);
        }

        this._createCompareLabelsHolder();
        for (i = 0; i < 10; i++ ){
            var compareLabel = new createjs.Text((i + 1).toString(), '36px EastAP', '#838383');
            compareLabel.x = 62;
            compareLabel.y = 35 + (i * 64);
            compareLabel.width = 66;
            compareLabel.height = 68;
            compareLabel.textAlign = 'center';
            compareLabel.cache = true;
            this._compareLabelsHolder.addChild(compareLabel);
        }

        this._createCoefsLabelsHolder();
        for ( i = 0; i < 10; i++ )
        {
            var coefLabel = new createjs.Text('','36px EastAP', '#ffdc2e');
            coefLabel.x = 160;
            coefLabel.y = 35 + (i * 64);
            coefLabel.width = 120;
            coefLabel.height = 68;
            coefLabel.textAlign = 'center';
            coefLabel.cache = true;
            this._coefsLabelsHolder.addChild(coefLabel);
        }

        createjs.Tween.get( this._holder, {loop : false}).to({ alpha : 1 }, 200, createjs.Ease.none).call(this._onShowTweenComplete.bind(this));

        this._createTicketNums();

        var bounds = this._holder.getBounds();
        this._holder.x = 1610 / 2 - bounds.width / 2;
        this._holder.y = 900 / 2 - bounds.height / 2;
    };

    p._createTicketNums = function () {
        this._createNumsHolder();

        var n = 0;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 10; j++) {
                var numView = new keno.NumView();
                numView.setLabel((n + 1) + "");
                numView.x = 270 + (j * 62.5);
                numView.y = 36 + (i * 62);
                numView.addEventListener('pressup', this._onNumMouseDown.bind(this));
                this._numsHolder.addChild(numView);

                n++;
            }
        }
    };

    p._onNumMouseDown = function (event) {

        var numView = event.target;
        var numInt = parseInt(numView.numTextValue);

        var numIndex = this._selectedNums.indexOf(numInt);
        if ( numIndex == -1 ) {
            if ( this._selectedNums.length < 10 ) {
                this._selectedNums.push(numInt);

                numView.showChip();
                keno.SoundUtil.getInstance().playSound(keno.SoundUtil.SELECTED_NUM_SOUND);
//                SoundUtil.getInstance().playSelectNumSound();
            }
        }else {
            this._selectedNums.splice(numIndex, 1);
            numView.hideChip();

            keno.SoundUtil.getInstance().playSound(keno.SoundUtil.SELECTED_NUM_SOUND);
//            SoundUtil.getInstance().playSelectNumSound();
        }

        this._checkShowCompleteButton();
        this._refreshCoefs();
    }



    p._refreshCoefs = function()
    {
        var startPos = this._selectedNums.length - 1;
        if ( startPos < 0 )
        {
            for (var i = 0; i < this._coefsLabelsHolder.children.length; i++) {
                var compareLabel = this._compareLabelsHolder.getChildAt(i);
                compareLabel.color = '#838383';

                var coefLabel = this._coefsLabelsHolder.getChildAt(i);
                coefLabel.text = "";
            }

            return;
        }

        var currentCoefs = [];
        for (i = 0; i < this._coefsLabelsHolder.children.length; i++)
        {
            currentCoefs.push(this._coefs[startPos + (i * 10)]);
        }

        for (i = 0; i < currentCoefs.length; i++)
        {
            var coefLabel = this._coefsLabelsHolder.getChildAt(i);

            if ( currentCoefs[i] == 0 ) {
                coefLabel.text = "";

                var compareLabel = this._compareLabelsHolder.getChildAt(i);
                compareLabel.color = '#838383';

            } else {
                coefLabel.text = currentCoefs[i] + "";

                var compareLabel = this._compareLabelsHolder.getChildAt(i);
                compareLabel.color = '#ffffff';
            }
        }


    };

    p._onButtonDown = function ( event )
    {


        var button = event.target;

        if ( this._randomButton == button ) {
            this._doRandom();
        } else if ( this._refreshButton == button ) {
            this._doRefresh();
        } else if ( this._closeButton == button ) {
            this._doClose();
        } else if ( this._completeButton == button ) {
            this._doComplete();
        }

        keno.SoundUtil.getInstance().playSound(keno.SoundUtil.TICKET_MODE_BUTTON_SOUND);
//        SoundUtil.getInstance().playTicketModeButtonSound();
    };


    p._onChipMouseDown = function( event )
    {
        var chipButton = event.target;

        this._ticketPatternCount = chipButton.id;
        this._currentChipBet = chipButton.betValue;


        switch (this._ticketPatternCount)
        {
            case 4:
                keno.SoundUtil.getInstance().playSound(keno.SoundUtil.RATING_250_SOUND);
//                SoundUtil.getInstance().playRating250Sound();
                break;
            case 3:
                keno.SoundUtil.getInstance().playSound(keno.SoundUtil.RATING_500_SOUND);
//                SoundUtil.getInstance().playRating500Sound();
                break;
            case 2:
                keno.SoundUtil.getInstance().playSound(keno.SoundUtil.RATING_1000_SOUND);
//                SoundUtil.getInstance().playRating1000Sound();
                break;
            case 1:
                keno.SoundUtil.getInstance().playSound(keno.SoundUtil.RATING_2000_SOUND);
//                SoundUtil.getInstance().playRating2000Sound();
                break;
            case 0:
                keno.SoundUtil.getInstance().playSound(keno.SoundUtil.RATING_3000_SOUND);
//                SoundUtil.getInstance().playRating3000Sound();
                break;
        }

        this._ticketPriceValue.color = this._chipLabelColors[this._ticketPatternCount];
        this._ticketPriceValue.text = (this._selectedNums.length == 0) ? "" : this._selectedNums.length.toString();
        //this._ticketPriceValue.text = this._currentChipBet + "";

        this._ticketTypeBitmap.image = this._ticketPatterns[this._ticketPatternCount];


        this._isChipSelected = true;
        this._checkShowCompleteButton();

    };

    p._doRandom = function()
    {

        this._doRefresh();

        var needFoldNums = 10 - this._selectedNums.length;

        if ( needFoldNums == 0 ) return;


        var tempArr = [];
        for (var i = 0; i < 80; i++)
        {
            tempArr.push(i + 1);
        }

        tempArr = keno.GameUtil.shuffle(tempArr);

        for (i = 0; i < this._selectedNums.length; i++)
        {
            var index = tempArr.indexOf( this._selectedNums[i] );

            if ( index != -1 ) {
                tempArr.splice(index, 1);
            }
        }


        var n  = 0;
        for (i = 0; i < needFoldNums; i++)
        {
            this._selectedNums.push(tempArr[n]);
            n++;
        }


        for (i = 0; i < this._selectedNums.length; i++)
        {
            var numView = this._numsHolder.getChildAt(this._selectedNums[i] - 1);
            numView.showChip();
        }

        this._refreshCoefs();
        this._checkShowCompleteButton();
    }

    p._doRefresh = function()
    {
        for (var i = 0; i < this._numsHolder.children.length; i++)
        {
            var numView = this._numsHolder.getChildAt(i);
            numView.hideChip();
        }

        this._selectedNums = [];

        this._refreshCoefs();
        this._checkShowCompleteButton();

    }

    p._doClose = function()
    {
        this.hidePopup();
    };

    p._doComplete = function()
    {

        this._completeButton.visible = false;

        var ticketData = new keno.TicketData();
        ticketData.matchValue = 0;
        ticketData.type = this._ticketPatternCount;
        ticketData.betLabelColor = this._chipLabelColors[this._ticketPatternCount];
        ticketData.betValue = this._currentChipBet;
        ticketData.nums = this._selectedNums;
        ticketData.selectedNumsValue = this._selectedNums.length;

        var gameEvent = new createjs.Event(keno.GameView.ON_TICKET_ADD_COMPLETE, true);
        gameEvent.ticketData = ticketData;
        gameEvent.fromInit = false;
        this.dispatchEvent(gameEvent);

        this.hidePopup();
    };


    p._onShowTweenComplete = function() {
        this._canClose = true;
    };

    p._onBackgroundMouseDown = function(event) {
        this.hidePopup();
    };

    p._checkShowCompleteButton = function() {
        if (this._isChipSelected == true) {
            this._completeButton.visible = this._selectedNums.length > 0;
        }

        this._ticketPriceValue.color = this._chipLabelColors[this._ticketPatternCount];
        this._ticketPriceValue.text = this._ticketPriceValue.text = (this._selectedNums.length == 0) ? "" : this._selectedNums.length.toString();;

        this._ticketCircleBitmap.image = this._ticketCirclesPatterns[this._ticketPatternCount];
        this._ticketCircleBitmap.visible = this._completeButton.visible;


    };

    p.hidePopup = function() {
        if (this._canClose == true) {
            createjs.Tween.get(this._holder, { loop : false }).to( {alpha : 0 }, 200, createjs.Ease.none ).call( this._onHideTweenComplete.bind(this) );
        }
    };

    p._onHideTweenComplete = function () {
        this.dispatchEvent(new createjs.Event(TicketPopupView.ON_CLOSE));
    };


    p._createChipsHolder = function () {
        if (this._chipsHolder != null) {
            this._holder.removeChild(this._chipsHolder);
        }

        this._chipsHolder = new createjs.Container();
        this._holder.addChild(this._chipsHolder);

    };


    p._createCompareLabelsHolder = function () {
        if (this._compareLabelsHolder != null) {
            this._holder.removeChild(this._compareLabelsHolder);
        }

        this._compareLabelsHolder = new createjs.Container();
        this._holder.addChild(this._compareLabelsHolder);
    };

    p._createCoefsLabelsHolder = function () {
        if (this._coefsLabelsHolder != null) {
            this._holder.removeChild(this._coefsLabelsHolder);
        }

        this._coefsLabelsHolder = new createjs.Container();
        this._holder.addChild(this._coefsLabelsHolder);
    };

    p._createNumsHolder = function () {
        if (this._numsHolder != null) {
            this._holder.removeChild(this._numsHolder);
        }

        this._numsHolder = new createjs.Container();
        this._holder.addChild(this._numsHolder);
    };

    p._createHolder = function () {
        if (this._holder != null) {
            this.removeChild(this._holder);
        }

        this._holder = new createjs.Container();
        this._holder.alpha = 0;
        this.addChild(this._holder);
    };

    p.clearAll = function() {
        this._createHolder();
    }

    keno.TicketPopupView = TicketPopupView;
})();