/**
 * Created by USER on 06.09.2014.
 */

this.keno = this.keno || {};

(function () {
    "use strict";

    var GameController = function (gameModel, gameView, remoteService) {
        this.initialize(gameModel, gameView, remoteService);
    };

    //Наследуем
    var p = GameController.prototype;

//public properties

//private properties

    p._gameModel = null;
    p._gameView = null;
    p._remoteService = null;


    p._tickets = null;

    p._readyElementsCounting = 0;
    p._isConfirm = false;
    p._totalWin = 0;

    p._isFirstBal = false;
    p._isEnd = false;
    p._isHasBet = false;

    p._endTimer = null;
    p._isChecked = false;
    p._realBalance = 0;

    p._currentTicketData = null;

    p._afterCountingEngInterval = null;

    p.initialize = function (gameModel, gameView, remoteService) {
        this._gameModel = gameModel;
        this._gameView = gameView;
        this._remoteService = remoteService;
    };

    p.init = function () {
        keno.SoundUtil.getInstance().registrSounds(this._onSoundLoadComplete.bind(this));
    };

    p._onSoundLoadComplete = function (event) {
        keno.SoundUtil.getInstance().playMusic(keno.SoundUtil.GAME_SOUND);
        keno.SoundUtil.getInstance().playSound(keno.SoundUtil.GAME_INTRO_SOUND);

        this._remoteService.addEventListener(keno.RemoteService.ON_GET_INIT_MSG, this._onGetInitMsg.bind(this));
        this._remoteService.addEventListener(keno.RemoteService.ON_GET_INIT_HAS_BET_MSG, this._onGetInitHasBetMsg.bind(this));
        this._remoteService.addEventListener(keno.RemoteService.ON_GET_INIT_PLAYING_MSG, this._onGetInitPlayingMsg.bind(this));
        this._remoteService.addEventListener(keno.RemoteService.ON_GET_BETS_OK_MSG, this._onGetBetsOkMsg.bind(this));
        this._remoteService.addEventListener(keno.RemoteService.ON_BETS_DEAL_STOP, this._onBetsDealStop.bind(this));
        this._remoteService.addEventListener(keno.RemoteService.ON_NEW_BALL, this._onNewBall.bind(this));
        this._remoteService.addEventListener(keno.RemoteService.ON_COUNTING_COMPLETE, this._onCountingComplete.bind(this));
        this._remoteService.addEventListener(keno.RemoteService.ON_EXIT_GAME, this._onExitGame.bind(this));
        this._remoteService.addEventListener(keno.RemoteService.ON_ERROR_MSG, this._onErrorMsg.bind(this));


//        this._gameView.addEventListener(keno.GameView.ON_CLEAR_ALL_BUTTON_PRESS, this._onClearAllButtonPress.bind(this));
//        this._gameView.addEventListener(keno.GameEvent.ON_CONFIRM_BUTTON_PRESS, this._onConfirmButtonPress.bind(this));
//        this._gameView.addEventListener(keno.GameEvent.ON_AUTO_SET_BETS_TIME, this._onAutoSetBetsTime.bind(this));

        this._gameView.addEventListener(keno.GameView.ON_SORT_BUTTON_PRESS, this._onSortButtonPress.bind(this));
        this._gameView.addEventListener(keno.GameView.ON_EXIT_GAME_ANIM_COMPLETE, this._onExitGameAnimComplete.bind(this));
        this._gameView.addEventListener(keno.GameView.ON_MENU_BUTTON_PRESS, this._onMenuButtonPress.bind(this));
        this._gameView.addEventListener(keno.GameView.ON_ADD_TICKET_BUTTON_PRESS, this._onAddTicketButtonPress.bind(this));
        this._gameView.addEventListener(keno.GameView.ON_TICKET_ADD_COMPLETE, this._onTicketAddComplete.bind(this));
        this._gameView.addEventListener(keno.GameView.ON_COUNTING_WIN_COMPLETE, this._onCountingWinComplete.bind(this));
        this._gameView.init(this._gameModel.bets, this._gameModel.coefs);
        this._resetGame();

        this._gameView.updateCoefs(this._gameModel.coefs);

        this._remoteService.sendLoaded();
        if (this._gameModel.localSimulate == true) {
            this._remoteService.getStartData();
            //this._remoteService.getStartHasBetData();
            //this._remoteService.getStartPlayData();
        }
    };

    p._resetGame = function () {
        this._isFirstBal = false;
        this._isConfirm = false;
        this._totalWin = 0;

        this._tickets = [];

        this._gameView.clearAllTickets();
        this._gameView.clearCounting();
        this._gameView.enableFooter();
        this._gameView.updateWin(this._totalWin);
    }

    p._onGetInitMsg = function (event) {
        this._gameModel.totalBalance = event.balance;

        this._gameView.initAnim();
        this._gameView.updateHeader(this._gameModel.ticketCount, this._gameModel.amountBet, this._gameModel.playerName, this._gameModel.totalBalance);

        this._realBalance = this._gameModel.totalBalance;

        var date = new Date(event.endBetsExpected);
        date = new Date(date.getTime() - new Date().getTime());
        this._gameView.setTimerWaitTimer(date.getTime());
        //this._gameView.setTimerWaitTimer(10000);

        if (this._gameModel.localSimulate == true) {
            setTimeout(this._onStartSimulate.bind(this), 15000);
        }
    };

    p._onStartSimulate = function () {
        this._remoteService.startCounting();
    };

    p._onGetInitHasBetMsg = function (event) {
        this._gameView.initAnim();
        this._isHasBet = true;

        this._gameModel.totalBalance = event.balance;
        this._gameView.updateHeader(this._gameModel.ticketCount, this._gameModel.amountBet, this._gameModel.playerName, this._gameModel.totalBalance);
        this._realBalance = this._gameModel.totalBalance;

        var bets = event.bets;

        var chipLabelColors = ['#FEAA4D', '#FAEE42', '#D1DF3C', '#6AF1FF', '#ffffff'];
        for (var i = 0; i < bets.length; i++) {
            var bet = bets[i];

            var price = bet.price;
            var content = bet.content;

            var patternNum = this._gameModel.bets.indexOf(price);

            var ticketData = new keno.TicketData();
            ticketData.matchValue = 0;
            ticketData.type = patternNum;
            ticketData.betLabelColor = chipLabelColors[patternNum];
            ticketData.betValue = price;
            ticketData.nums = content;
            ticketData.selectedNumsValue = content.length;
            ticketData.isChecked = false;

            var gameEvent = new createjs.Event(keno.GameView.ON_TICKET_ADD_COMPLETE);
            gameEvent.ticketData = ticketData;
            gameEvent.fromInit = true;

            this._onTicketAddComplete(gameEvent);
        }

        var date = new Date(event.endBetsExpected);
        date = new Date(date.getTime() - new Date().getTime());
        this._gameView.setTimerWaitTimer(date.getTime());

        if (this._gameModel.localSimulate == true) {
            setTimeout(this._onStartSimulate.bind(this), 15000);
        }
    };


    p._onGetInitPlayingMsg = function (event) {
        this._gameView.initAnim();
        this._isHasBet = true;

        this._totalWin = event.totalWin;
        this._gameModel.totalBalance = event.balance;
        this._gameView.updateWin(this._totalWin);
        this._realBalance = this._gameModel.totalBalance;

        var bets = event.bets;

        var chipLabelColors = ['#FEAA4D', '#FAEE42', '#D1DF3C', '#6AF1FF', '#ffffff'];
        for (var i = 0; i < bets.length; i++) {
            var bet = bets[i];

            var price = bet.price;
            var content = bet.content;

            var patternNum = this._gameModel.bets.indexOf(price);

            var ticketData = new keno.TicketData();
            ticketData.matchValue = 0;
            ticketData.type = patternNum;
            ticketData.betLabelColor = chipLabelColors[patternNum];
            ticketData.betValue = price;
            ticketData.nums = content;
            ticketData.selectedNumsValue = content.length;
            ticketData.isChecked = false;

            var gameEvent = new createjs.Event(keno.GameView.ON_TICKET_ADD_COMPLETE);
            gameEvent.ticketData = ticketData;
            gameEvent.fromInit = true;

            this._onTicketAddComplete(gameEvent);
        }

        this._gameView.fillBalls(event.balls);

        this._gameView.disableFooter();
        this._gameView.updateHeader(this._gameModel.ticketCount, this._gameModel.amountBet, this._gameModel.playerName, this._gameModel.totalBalance + this._totalWin);

        //var utcDate  = cast untyped __js__("moment")(event.endBetsExpected).toDate().getTime();
        //var date : Date = Date.fromTime(utcDate);
        //date = Date.fromTime(date.getTime() - Date.now().getTime());
        //
        //gameView.setTimerWaitTimer(Std.int( date.getTime() ));
    };


    p._onMenuButtonPress = function (event) {
        this._isChecked = false;

        this._remoteService.sendExitGameMsg();
        this._gameView.lockScreen();

        if (this._gameModel.localSimulate == true) {
            this._remoteService.sendExitMsg();
        }
    };

    p._onAddTicketButtonPress = function (event) {
        if (this._isEnd == true) {
            this._resetGame();
            this._clearPrevGameData();
        }


        this._isChecked = false;

        this._gameView.disableFooter();
        this._gameView.showAddTicketPopup();
    };

    p._onTicketAddComplete = function (event) {
        this._gameView.enableFooter();
        this._gameView.updateWin(this._totalWin);

        var totalBalance = this._gameModel.totalBalance - this._gameModel.amountBet;
        this._isHasBet = event.fromInit;

        if (this._isHasBet == false) {
            if (this._gameModel.totalBalance - event.ticketData.betValue < 0) {
                this._gameView.showError("На вашем счету недостаточно средств");
                return;
            }
        }


        this._currentTicketData = event.ticketData;
        this._tickets.push(event.ticketData);
        this._onConfirmButtonPress();
    };

    //private function onClearAllButtonPress( event : GameEvent ) : Void
    //{
    //isChecked = false;
    //
    //gameView.clearUnconfirmedTickets();
    //
    //
    //
    //var totalBet : Int = 0;
    //var i : Int = tickets.length - 1;
    //while (i >= 0) {
    //var ticketData : TicketData = tickets[i];
    //
    //if ( ticketData.isChecked == false ) {
    //tickets.remove(ticketData);
    //} else {
    //totalBet += ticketData.betValue;
    //}
    //
    //i--;
    //}
    //
    //gameModel.ticketCount = tickets.length;
    //gameModel.amountBet = totalBet;
    //gameView.updateHeader(gameModel.ticketCount, gameModel.amountBet, gameModel.playerName, gameModel.totalBalance);
    //realBalance = gameModel.totalBalance;
    //
    //if ( isEnd == true ) {
    //resetGame();
    //
    //clearEndTimer();
    //isEnd = false;
    //}
    //}

    p._onConfirmButtonPress = function (event) {
        //if ( tickets.length == 0 ) {
        //gameView.showError("Невозможно сделать ставку");
        //return;
        //}

        //if ( isChecked == true ) return;

        var totalBet = 0;

        if (this._isEnd == true) {
            this._tickets = [];
            this._gameView.clearAllTickets();

            this._clearPrevGameData();
        }

        this._isConfirm = true;

        var confirmedTickets = [];
        for (var i = 0; i < this._tickets.length; i++) {
            var ticketData = this._tickets[i];

            if (ticketData.isConfirmed == false) {
                confirmedTickets.push(ticketData);
                totalBet += ticketData.betValue;

            }
        }

        if (confirmedTickets.length == 0) return;

        this._gameView.disableFooter();

        for (var i = 0; i < this._tickets.length; i++) {
            var ticketData = this._tickets[i];
            ticketData.isConfirmed = true;
        }

        if (this._isHasBet == false) {
            this._remoteService.sendTicketsData(confirmedTickets);
        } else {
            var event = {};
            event.balance = this._gameModel.totalBalance;
            this._onGetBetsOkMsg(event);
        }

        if (this._gameModel.localSimulate == true) {
            this._remoteService.getBetsOk(this._gameModel.totalBalance - totalBet);

            //var timer : Timer = new Timer(5000, 1)
            //remoteService.startCounting();
        }
    };

    //private function onAutoSetBetsTime(event : GameEvent) : Void
    //{
    //onConfirmButtonPress();
    //}

    p._onGetBetsOkMsg = function (event) {
//        trace( "p:totalBalance: " + gameModel.totalBalance );
        this._gameModel.totalBalance = event.balance;
//        trace( "a:totalBalance: " + gameModel.totalBalance );


        var currentTicketData = this._tickets[this._tickets.length - 1];
        if (currentTicketData.isConfirmed == true && currentTicketData.isChecked == false) {
            this._gameView.addTicket(currentTicketData);
        }

        this._gameView.showCoincCoef(currentTicketData.nums.length);


        //for (var i = 0; i < this._tickets.length; i++)
        //{
        //
        //    var ticketData = this._tickets[i];
        //    if ( ticketData.isConfirmed == true && ticketData.isChecked == false) {
        //        this._gameView.addTicket(this._tickets[i]);
        //    }
        //}


        //if ( this._tickets.length > 1 && this._tickets.length < 7 ) {
        //    this._gameView.sortTickets(keno.GameModel.SORT_TYPE_2);
        //} else if ( this._tickets.length > 6 ) {
        //    this._gameView.sortTickets(keno.GameModel.SORT_TYPE_3);
        //}

        var totalBet = 0;
        var realBet = 0;
        for (var i = 0; i < this._tickets.length; i++) {
            var ticketData = this._tickets[i];
            totalBet += ticketData.betValue;

            if (ticketData.isChecked == false) {
                realBet += ticketData.betValue;
            }
        }

        this._gameModel.ticketCount += 1;
        this._gameModel.amountBet = totalBet;
        this._realBalance = this._gameModel.totalBalance - realBet;
        this._gameView.updateHeader(this._gameModel.ticketCount, this._gameModel.amountBet, this._gameModel.playerName, this._gameModel.totalBalance);
        this._gameView.setCheckedStateTotickets();

        for (var i = 0; i < this._tickets.length; i++) {
            var ticketData = this._tickets[i];
            ticketData.isChecked = true;
        }

        this._gameView.enableFooter();

        this._isChecked = true;
    };

    p._onSortButtonPress = function (event) {
        this._gameView.sortTickets(event.sortType);
    };

    p._onBetsDealStop = function (event) {
        this._gameView.disableFooter();
        this._gameView.hidePopup();

        this._gameView.clearUnconfirmedTickets();
        this._gameView.clearTicketsNums();
        this._gameView.clearBalls();
        this._gameView.updateWin(0);

        var totalBet = 0;
        for (var i = 0; i < this._tickets.length; i++) {
            var ticketData = this._tickets[i];
            ticketData.matchValue = 0;
            ticketData.winValue = 0;

            if (ticketData.isChecked == false) {
                this._tickets.splice(i, 1);
            } else {
                totalBet += ticketData.betValue;
            }
        }

        this._gameView.clearTimer();
        this._gameModel.ticketCount = this._tickets.length;
        this._gameModel.amountBet = totalBet;
        this._gameView.updateHeader(this._gameModel.ticketCount, this._gameModel.amountBet, this._gameModel.playerName, this._gameModel.totalBalance);

        keno.SoundUtil.getInstance().playSound(keno.SoundUtil.START_GAME_COUNTING_SOUND);

        if (this._isEnd == true) {
            this._tickets = [];
            this._gameView.clearAllTickets();

            this._clearPrevGameData();
        }

        //if (isFirstBal == false) {
        //
        //isFirstBal = true;
        //}
    };

    p._onNewBall = function (event) {

        //gameView.disableFooter();

        //gameView.fillBalls(event.balls);
        this._gameView.newBall(event.ballNum);

        if (this._gameModel.localSimulate == true) {
            this._totalWin = 0;
            for (var i = 0; i < this._tickets.length; i++) {
                var ticketData = this._tickets[i];
                this._totalWin += ticketData.winValue;
            }
        } else {
            this._totalWin = event.totalWin;
        }


        //var ticketWin = 0;
        //for (var i = 0; i < this._tickets.length; i++)
        //{
        //    var ticketData = this._tickets[i];
        //
        //
        //    if (ticketData.matchValue > 0) {
        //        var index = ((ticketData.matchValue - 1) * 10) + (ticketData.selectedNumsValue - 1);
        //        var coef  = this._gameModel.coefs[index];
        //
        //        ticketData.winValue = coef * ticketData.betValue;
        //    }
        //}


        this._gameView.updateWin(this._totalWin);
        //gameView.updateHeader(gameModel.ticketCount, gameModel.amountBet, gameModel.playerName, gameModel.totalBalance + totalWin);


        //gameModel.totalBalance =  (gameModel.totalBalance - gameModel.amountBet) + totalWin;
        //gameModel.amountBet = 0;
        //gameModel.ticketCount = 0;
    };

    //p._onRollBack = function( event )
    //{
    //    this._gameView.clearTicketsNums();
    //    this._gameView.updateHeader(this._gameModel.ticketCount, this._gameModel.amountBet, this._gameModel.playerName, this._gameModel.totalBalance);
    //};

    p._onCountingComplete = function (event) {
//        trace( "p:totalBalance: " + gameModel.totalBalance );
        this._gameModel.totalBalance = this._gameModel.totalBalance + this._totalWin;


//        trace( "a:totalBalance: " + gameModel.totalBalance );

        if (this._totalWin == 0) {
            //keno.SoundUtil.getInstance().playSound(keno.SoundUtil.LOSE_SOUND);
        } else {
            keno.SoundUtil.getInstance().playSound(keno.SoundUtil.WIN_SOUND);

        }

        //this._totalWin = 0;

        this._isEnd = true;

        //endTimer = new Timer(1000, 20);
        //endTimer.addEventListener(TimerEvent.TIMER, onAfterCountingEndTimer);
        //endTimer.start();

        var date = new Date(event.endBetsExpected);
        date = new Date(date.getTime() - new Date().getTime());
        this._gameView.setTimerWaitTimer(date.getTime());

        this._gameView.enableFooter();
        this._gameView.clearCounting();

        //this._gameModel.ticketCount = 0;
        //this._gameModel.amountBet = 0;
        //this._gameView.updateHeader(this._gameModel.ticketCount, this._gameModel.amountBet, this._gameModel.playerName, this._gameModel.totalBalance);

        this._isFirstBal = false;
        this._isConfirm = false;
        this._isHasBet = false;
        //this._totalWin = 0;

        this._tickets = [];
        //this._gameView.clearCounting();
        //this._gameView.enableFooter();

        //this._gameView.clearBalls();
        //gameView.updateWin(totalWin);

        this._afterCountingEngInterval = setInterval(this._onAfterCountingEndTimer.bind(this), 5000);
    };

    p._onAfterCountingEndTimer = function (event) {
        clearInterval(this._afterCountingEngInterval);

        if (this._totalWin > 0) {
            keno.SoundUtil.getInstance().playWinSound();
            this._gameView.showWinAnimation(this._gameModel.totalBalance, this._totalWin);

            stage.addEventListener('pressup', this._onStagePressUp.bind(this));
        }

        this._totalWin = 0;

        //if ( endTimer.currentCount == 20 ) {
        //remoteService.startCounting();
        //}

        if (this._gameModel.localSimulate == true) {
            setTimeout(this._onStartSimulate.bind(this), 15000);
        }
    };

    p._onCountingWinComplete = function (event) {
        stage.removeAllEventListeners('pressup');

        keno.SoundUtil.getInstance().stopWinSound();
        this._gameView.clearImmediatelyWinAnimation();
    };

    p._onStagePressUp = function (event) {
        stage.removeAllEventListeners('pressup');

        keno.SoundUtil.getInstance().stopWinSound();
        this._gameView.clearImmediatelyWinAnimation();
    };

    p._onExitGame = function (event) {
        this._gameView.exitGameAnimation();
    };

    p._onExitGameAnimComplete = function (event) {
        this._remoteService.sendExited();
    };

    p._onErrorMsg = function (event) {
        this._gameView.unlockScreen();

        if (event.errorCode == 401) {
            this._gameView.enableFooter();
        }

        this._gameView.showError(event.errorMsg);
    };

    p._clearEndTimer = function () {
        //if ( endTimer != null ) {
        //endTimer.removeEventListener(TimerEvent.TIMER, onAfterCountingEndTimer);
        //endTimer.stop();
        //endTimer = null;
        //}
    };

    p._clearPrevGameData = function () {
        this._clearEndTimer();
        this._isEnd = false;

        this._gameModel.ticketCount = 0;
        this._gameModel.amountBet = 0;
        this._gameView.updateHeader(this._gameModel.ticketCount, this._gameModel.amountBet, this._gameModel.playerName, this._gameModel.totalBalance);
        this._gameView.clearBalls();
    };

    keno.GameController = GameController;

})();