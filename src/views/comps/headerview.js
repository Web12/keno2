/**
 * Created by am_urunov on 17.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var HeaderView = function () {
        this.initialize();
    };

    //Наследуем
    var p = HeaderView.prototype = new createjs.Container();

//static

//private properties
    p._timeProgressView = null;

    //p._sortType1Button = null;
    //p._sortType2Button = null;
    //p._sortType3Button = null;

    p._timerLabel = null;
    p._ticketsCountLabel = null;
    p._ticketsCountValue = null;
    p._amountBetLabel = null;
    p._amountBetValue = null;
    p._playerLabel = null;
    p._playerValue = null;
    p._balanceValue = null;
    p._currentBalance = 0;

    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        this._timeProgressView = new keno.TimeProgressView();
        this._timeProgressView.x = 80;
        this._timeProgressView.y = 23;
        this.addChild(this._timeProgressView);

        //this._sortType1Button = new keno.Button(keno.AssetLoader.getAsset('sort_type_1_button'));
        //this._sortType1Button.x = 458;
        //this._sortType1Button.y = 17;
        //this._sortType1Button.addEventListener(keno.Button.ON_BUTTON_DOWN, this._onButtonDown.bind(this));
        //this.addChild(this._sortType1Button);
        //
        //this._sortType2Button = new keno.Button(keno.AssetLoader.getAsset('sort_type_2_button'));
        //this._sortType2Button.x = 512;
        //this._sortType2Button.y = 17;
        //this._sortType2Button.addEventListener(keno.Button.ON_BUTTON_DOWN, this._onButtonDown.bind(this));
        //this.addChild(this._sortType2Button);
        //
        //this._sortType3Button = new keno.Button(keno.AssetLoader.getAsset('sort_type_3_button'));
        //this._sortType3Button.x = 565;
        //this._sortType3Button.y = 17;
        //this._sortType3Button.addEventListener(keno.Button.ON_BUTTON_DOWN, this._onButtonDown.bind(this));
        //this.addChild(this._sortType3Button);



        this._timerLabel = new createjs.Text(keno.LangHolder.getLang().timetoplaylabel, '18px EastAP', '#ffffff');
        this._timerLabel.x = 150;
        this._timerLabel.y = 42;
        this._timerLabel.width = 160;
        this._timerLabel.height = 35;
        this._timerLabel.cache = true;
        this._timerLabel.textAlign = 'center';
        this._timerLabel.textBaseline = 'middle';
        this.addChild(this._timerLabel);

        this._ticketsCountLabel = new createjs.Text(keno.LangHolder.getLang().cardslabel + ':', '18px EastAP', '#ffffff');
        this._ticketsCountLabel.x = 512;
        this._ticketsCountLabel.y = 38;
        this._ticketsCountLabel.width = 100;
        this._ticketsCountLabel.height = 35;
        this._ticketsCountLabel.cache = true;
        this._ticketsCountLabel.textAlign = 'center';
        this._ticketsCountLabel.textBaseline = 'middle';
        this.addChild(this._ticketsCountLabel);


        this._ticketsCountValue = new createjs.Text('', '30px EastAP', '#fff432');
        this._ticketsCountValue.x = 600;
        this._ticketsCountValue.y = 35;
        this._ticketsCountValue.width = 50;
        this._ticketsCountValue.height = 35;
        this._ticketsCountValue.cache = true;
        this._ticketsCountValue.textAlign = 'center';
        this._ticketsCountValue.textBaseline = 'middle';
        this.addChild(this._ticketsCountValue);

        this._amountBetLabel = new createjs.Text(keno.LangHolder.getLang().amountbetlabel + ':', '18px EastAP', '#ffffff');
        this._amountBetLabel.x = 762;
        this._amountBetLabel.y = 38;
        this._amountBetLabel.width = 160;
        this._amountBetLabel.height = 35;
        this._amountBetLabel.cache = true;
        this._amountBetLabel.textAlign = 'center';
        this._amountBetLabel.textBaseline = 'middle';
        this.addChild(this._amountBetLabel);

        this._amountBetValue = new createjs.Text('', '30px EastAP', '#fff432');
        this._amountBetValue.x = 920;
        this._amountBetValue.y = 35;
        this._amountBetValue.width = 90;
        this._amountBetValue.height = 35;
        this._amountBetValue.cache = true;
        this._amountBetValue.textAlign = 'center';
        this._amountBetValue.textBaseline = 'middle';
        this.addChild(this._amountBetValue);


        this._playerLabel = new createjs.Text(keno.LangHolder.getLang().playerlabel + ':', '18px EastAP', '#ffffff');
        this._playerLabel.x = 1070;
        this._playerLabel.y = 38;
        this._playerLabel.width = 100;
        this._playerLabel.height = 35;
        this._playerLabel.cache = true;
        this._playerLabel.textAlign = 'center';
        this._playerLabel.textBaseline = 'middle';
        this.addChild(this._playerLabel);

        this._playerValue = new createjs.Text('', '25px EastAP', '#fff432');
        this._playerValue.x = 1172;
        this._playerValue.y = 37;
        this._playerValue.width = 120;
        this._playerValue.height = 35;
        this._playerValue.cache = true;
        this._playerValue.textAlign = 'center';
        this._playerValue.textBaseline = 'middle';
        this.addChild(this._playerValue);

        this._balanceValue = new createjs.Text('', '30px EastAP', '#fff432');
        this._balanceValue.x = 1430;
        this._balanceValue.y = 35;
        this._balanceValue.width = 110;
        this._balanceValue.height = 35;
        this._balanceValue.cache = true;
        this._balanceValue.textAlign = 'center';
        this._balanceValue.textBaseline = 'middle';
        this.addChild(this._balanceValue);
    };

    p.startTimerProgress = function( waitTime )
    {
        this._timeProgressView.startGreenProgress( waitTime );
    }

    p.updateHeader = function(tCount, bAmount, pName, balance) {
        this._currentBalance = balance;

        this._ticketsCountValue.text = tCount + "";
        this._amountBetValue.text = keno.GameUtil.devideSum(bAmount + "");
        this._playerValue.text = pName;
        this._balanceValue.text = keno.GameUtil.devideSum(balance + "" );
    }

    //p._onButtonDown = function(event)
    //{
    //    var button = event.target;
    //
    //    var gameEvent = new createjs.Event(keno.GameView.ON_SORT_BUTTON_PRESS, true);
    //    if ( this._sortType1Button == button ) {
    //        gameEvent.sortType = keno.GameModel.SORT_TYPE_1;
    //    }else if ( this._sortType2Button == button ) {
    //        gameEvent.sortType = keno.GameModel.SORT_TYPE_2;
    //    }else if( this._sortType3Button == button ) {
    //        gameEvent.sortType = keno.GameModel.SORT_TYPE_3;
    //    }
    //
    //    this.dispatchEvent(gameEvent);
    //}


    p.showBalanceAnimation = function(value) {
        this._balanceValue.balanceCount = this._currentBalance;
        this._currentBalance = value;

        createjs.Tween.get(this._balanceValue, {loop : false}).to({balanceCount : value}, 6400).addEventListener("change", this._onCountingTweenUpdate.bind(this));
    };

    p._onCountingTweenUpdate = function(event) {
        this._balanceValue.balanceCount = Math.round(this._balanceValue.balanceCount);

        this._balanceValue.text = ( this._balanceValue.balanceCount == 0 ) ? "" : keno.GameUtil.devideSum(this._balanceValue.balanceCount + "");
    };

    p.clearImmediately = function() {
        createjs.Tween.removeTweens(this._balanceValue);

        this._balanceValue.text = keno.GameUtil.devideSum( this._currentBalance + "");
    };

    p.clearTimer = function() {
        this._timeProgressView.clear();
    };

    keno.HeaderView = HeaderView;
})();
