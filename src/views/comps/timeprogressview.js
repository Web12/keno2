/**
 * Created by am_urunov on 17.10.2014.
 */


this.keno = this.keno||{};

(function() {
    "use strict";
    var TimeProgressView = function () {
        this.initialize();
    };

    //Наследуем
    var p = TimeProgressView.prototype = new createjs.Container();

//private properties

    p.PROGRESS_LINE_WIDTH = 180;
    p.PROGRESS_LINE_HEIGHT = 48;

    p._timerValue1 = null;
    p._timerValue2 = null;
    p._greenProgressLine = null;

    p._maskShape1 = null;
    p._maskShape2 = null;

    p._totalTime = 0;
    p._startTime = 0;
    p._currentTime = 0;

    p._currentDate = null;

    p._mockRenderCount = 0;
    p._progressTimer = null;

    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        this._maskShape1 = new createjs.Shape();
        this._maskShape1.x = 166;
        this._maskShape1.y = -3;
        this._maskShape1.graphics.beginFill('#000000');
        this._maskShape1.graphics.drawRect(0, 0, this.PROGRESS_LINE_WIDTH, this.PROGRESS_LINE_HEIGHT);
        this._maskShape1.graphics.endFill();
        this._maskShape1.cache = true;
        this._maskShape1.alpha = 0;
        this.addChild(this._maskShape1);

        this._maskShape2 = new createjs.Shape();
        this._maskShape2.x = 166;
        this._maskShape2.y = -3;
        this._maskShape2.graphics.beginFill('#000000');
        this._maskShape2.graphics.drawRect(0, 0, this.PROGRESS_LINE_WIDTH, this.PROGRESS_LINE_HEIGHT);
        this._maskShape2.graphics.endFill();
        this._maskShape2.cache = true;
        this._maskShape2.alpha = 0;
        this.addChild(this._maskShape2);

        this._refreshCountingLabel();

        var progressFrame = new createjs.Bitmap(keno.AssetLoader.getAsset('progress_line_frame'));
        progressFrame.x = 160;
        progressFrame.y = -7;
        this.addChild(progressFrame);

        //this._yellowProgressLine.mask = this._maskShape1;
    };

    p._refreshCountingLabel = function()
    {
        if ( this._timerValue1 != null ) {
            this.removeChild(this._timerValue1);
        }

        this._timerValue2 = new createjs.Text('', '30px AdventureC', '#ffffff');
        this._timerValue2.x = this._maskShape1.x + 15;
        this._timerValue2.y = 21;
        this._timerValue2.height = 40;
        this._timerValue2.cache = true;
        this._timerValue2.textAlign = 'left';
        this._timerValue2.textBaseline = 'middle';
        this.addChild(this._timerValue2);

        if ( this._timerValue2 != null ) {
            this.removeChild(this._timerValue2);
        }

        this._timerValue1 = new createjs.Text('', '30px AdventureC', '#244000');
        this._timerValue1.x = this._maskShape1.x + 15;
        this._timerValue1.y = 21;
        this._timerValue1.height = 40;
        this._timerValue1.cache = true;
        this._timerValue1.textAlign = 'left';
        this._timerValue1.textBaseline = 'middle';
        this._timerValue1.mask = this._maskShape2;
        this.addChild(this._timerValue1);

    };

    p.startGreenProgress = function( totalTime ) {
        this._totalTime = totalTime;
        this._startTime = new Date();

        this._currentDate = new Date(this._totalTime);

        if ( this._greenProgressLine != null ) {
            this.removeChild(this._greenProgressLine);
        }

        this._greenProgressLine = new createjs.Bitmap(keno.AssetLoader.getAsset('progress_green'));
        this._greenProgressLine.x = this._maskShape1.x;
        this._greenProgressLine.y = this._maskShape1.y;
        this.addChildAt(this._greenProgressLine, 0);

        this._greenProgressLine.mask = this._maskShape1;

        this._clearProgressTimer();

        this._progressTimer = setInterval(this._onProgressTimer.bind(this), 100);

    };

    p._onProgressTimer = function()
    {
        this._currentTime = new Date().getTime() - this._startTime;

        this._currentDate = new Date(this._totalTime);
        this._currentDate.setMilliseconds(this._currentDate.getMilliseconds() - this._currentTime);

        var min = this._currentDate.getUTCMinutes().toString();
        var sec = this._currentDate.getUTCSeconds().toString();

        this._timerValue1.text = keno.GameUtil.stringToTimeFormat(min) + ":" + keno.GameUtil.stringToTimeFormat(sec);
        this._timerValue2.text = keno.GameUtil.stringToTimeFormat(min) + ":" + keno.GameUtil.stringToTimeFormat(sec);


        var perc = this._currentTime / this._totalTime;
        this._greenProgressLine.x = this._maskShape1.x - (this.PROGRESS_LINE_WIDTH * perc);
        this._maskShape2.x = 170 - (this.PROGRESS_LINE_WIDTH * perc);

        //if ( currentTime >= totalTime - 5000) {
        //var gameEvent : GameEvent = new GameEvent(GameEvent.ON_AUTO_SET_BETS_TIME, true);
        //dispatchEvent(gameEvent);
        //}

        if ( this._currentTime >= this._totalTime ) {
            this._currentTime = 0;
            this._timerValue1.text = '';

            this._clearProgressTimer();

//            this._currentDate = new Date(totalTime);
//            var min = this._currentDate.getUTCMinutes().toString();
//            var sec = this._currentDate.getUTCSeconds().toString();
//            this._timerValue1.text = keno.GameUtil.stringToTimeFormat(min) + ":" + keno.GameUtil.stringToTimeFormat(sec);
        }
    };

    p._clearProgressTimer = function() {
        clearInterval(this._progressTimer);

        this._maskShape2.x = 168;
    };

    p.clear = function() {
        this._currentTime = 0;
        this._clearProgressTimer();

        this._maskShape2.x = 166;

        this._currentDate = new Date(this._totalTime);
        this._timerValue1.text = "";
        this._timerValue2.text = "";
    };

    keno.TimeProgressView = TimeProgressView;
})();