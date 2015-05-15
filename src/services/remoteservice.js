/**
 * Created by USER on 06.09.2014.
 */

var api;

this.keno = this.keno || {};

(function () {
    "use strict";
    var RemoteService = function () {
        this.initialize();
    };

    //Наследуем
    var p = RemoteService.prototype = new createjs.EventDispatcher();

    RemoteService.ON_NEW_BALL = 'onNewBall';
    RemoteService.ON_BETS_DEAL_STOP = 'onBetsDealStop';
    RemoteService.ON_COUNTING_COMPLETE = 'onCountingComplete';
    RemoteService.ON_GET_BETS_OK_MSG = 'onGetBetsOkMsg';
    RemoteService.ON_GET_INIT_MSG = 'onGetInitMsg';
    RemoteService.ON_GET_INIT_HAS_BET_MSG = 'onGetInitHasBetMsg';
    RemoteService.ON_GET_INIT_PLAYING_MSG = 'onGetInitPlayingMsg';
    RemoteService.ON_EXIT_GAME = 'onExitGame';
    RemoteService.ON_ERROR_MSG = 'onErrorMsg';

//private
    p._gameModel = null;


    p._countingTimer = null;
    p._currentCount = 0;

    p._hasRollback = false;

    p.initialize = function () {

    };

    p.init = function (gameModel) {
        this._gameModel = gameModel;

        api = new keno.Api();
        api.addEventListener(keno.Api.ON_API_REQUEST, this._onApiRequest.bind(this));

        this._gameModel.localSimulate = api.localSimulate;
    };


    p.parseSettings = function () {
    };


    p.parseLangs = function () {
    };

    p.sendLoaded = function () {

        var str = '{' +
            '"kind": "loaded_msg"' +
            '}';

        api.fromJs(str);
    };

    p.getStartData = function () {

        var str = '{' +
            '"kind": "init_msg",' +
            '"auth": {' +
            '"kind": "by_card",' +
            '"balance": 10000,' +
            '"nickname": "Вася"' +
            '},' +
            '"bets": [' +
            '],' +
            '"game_data": {' +
            '"game_state":"1","total_win":1000,"end_bets_expected":"2014-10-28T13:14:56+04:00","balls":[79,61,43,57,71,5,63,8,74,21]' +
            '}' +
            '}';


        api.toJs(str);
    };

    p.getStartHasBetData = function () {
        var str = '{"' +
            'auth":{"' +
            'balance":8292180,' +
            '"kind":"by_card",' +
            '"nickname":"1test"},' +
            '"bets":[' +
            '{"content":[64,54,74,28,60,18,39,51,45,23],"price":1000}, ' +
            '{"content":[64,54,74,28,60,18,39,51,45,23],"price":1000}' +
            '],' +
            '"game_data":{' +
            '"balls":[1,2,3,4,5,6,7,8,9,10,20,19,18,17,16,15,14,13,12,11],' +
            '"end_bets_expected":"2014-10-01T13:10:05Z",' +
            '"game_id":172,' +
            '"game_state":1,' +
            '"total_win":0' +
            '},' +
            '"kind":"init_msg",' +
            '"lang":"ru"' +
            '}';

        var str = '{"auth":{"balance":309385,"kind":"by_card","nickname":"1test"},"bets":[{"content":[34,50,55,13,58,4,28,49,3,53],"price":1000},{"content":[34,65,43,10,16,50,78,7,72,15],"price":1000}],"game_data":{"balls":[24,32,16,15,21,5,6,45,46,56,55,54,53,52,51,61,62,72,71,74],"end_bets_expected":"2014-10-27T15:34:38Z","game_id":427,"game_state":1,"total_win":0},"kind":"init_msg","lang":"ru"}'

        api.toJs(str);
    }


    p.getStartPlayData = function () {

        var str = '{' +
            '"kind": "init_msg",' +
            '"auth": {' +
            '"kind": "by_card",' +
            '"balance": 10000,' +
            '"nickname": "Вася"' +
            '},' +
            '"bets": [' +
            '{"price":1000,"content":[7,72,8,34,49,77,66,37,50,55]},{"price":1000,"content":[9,29,14,68,3,64,32,52,50,10]}' +
            '],' +
            '"game_data": {' +
            '"game_state":"2","total_win":1000,"end_bets_expected":"2015-11-01T12:34:56+04:00","balls":[79,61,43,57,71,5,63,8,74,21]' +
            '}' +
            '}';


        api.toJs(str);
    }

    p.sendTicketsData = function (tickets) {
        var msg = {};
        msg.kind = "bets_msg";

        var bets = [];
        for (var i = 0; i < tickets.length; i++) {
            var bet = {};

            bet.price = tickets[i].betValue;
            bet.content = tickets[i].nums;

            bets.push(bet);
        }

        msg.bets = bets;

        api.fromJs(JSON.stringify(msg));
    }

    p.getBetsOk = function (balance) {
        var str = '{' +
            '"kind": "bets_ok_msg",' +
            '"balance": ' + balance + '}';

        api.toJs(str);
    }

    p.sendError = function () {
        var str = '{' +
            '"kind": "error_msg",' +
            '"error_ctx": "auth_error",' +
            '"error_code": 1' +
            '}';

        api.toJs(str);
    }

    p.startCounting = function () {

        this._tempArr = [];
        for (var i = 0; i < 80; i++) {
            this._tempArr.push((i + 1));
        }

        this._tempArr = keno.GameUtil.shuffle(this._tempArr);
        //this._tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

        var msg = '{' +
            '"kind":"rand_msg",' +
            '"game_data":{' +
            '"game_state":2,' +
            '"total_win":"0",' +
            '"end_bets_expected":' +
            '"2015-03-01T12:34:56+04:00",' +
            '"balls":[' +
            ']' +
            '}' +
            '}';


        api.toJs(msg);

        this._countingTimer = setInterval(this._onCountingTimer.bind(this), 2000);

    }


    p._onCountingTimer = function () {
        this._currentCount += 1;

        var msg = {};
        msg.kind = "rand_msg";

        var gameData = {};

        if (this._currentCount == 21) {
            gameData.game_state = 1;

            clearInterval(this._countingTimer);
            this._currentCount = 0;

        } else {
            gameData.game_state = 2;
        }


        //if (this._currentCount == 15 && this._hasRollback == false) {
        //    this._currentCount = 0;
        //    this._hasRollback = true;
        //
        //    msg =   '{' +
        //                '"kind":"rand_msg",' +
        //                '"game_data":{' +
        //                    '"game_state":2,' +
        //                    '"total_win":"0",' +
        //                    '"end_bets_expected":' +
        //                    '"2015-03-01T12:34:56+04:00",' +
        //                    '"balls":[' +
        //                            ']' +
        //                '}' +
        //            '}';
        //
        //    api.toJs(msg);
        //
        //    return;
        //}

        gameData.total_win = 1000;
        gameData.end_bets_expected = "2015-11-01T12:34:56+04:00";

        var balls = [];
        for (var i = 0; i < this._currentCount; i++) {
            balls.push(this._tempArr[i]);
        }
        gameData.balls = balls;
        msg.game_data = gameData;

        api.toJs(JSON.stringify(msg));
    }

    p._onApiRequest = function (event) {
        var data = event.apiData;

        var json = JSON.parse(data);

        if (json.kind === "init_msg") {
            var auth = json['auth'];

            this._gameModel.playerName = auth.nickname;

            var totalBalance = auth.balance;

            var gameData = json.game_data;
            var endBetsExpected = gameData.end_bets_expected;

            var gameState = gameData.game_state;

            if (gameState == 1) {
                var betsData = json.bets;

                if (betsData.length > 0) {
                    var remoteEvent = new createjs.Event(RemoteService.ON_GET_INIT_HAS_BET_MSG);
                    remoteEvent.bets = betsData;
                    remoteEvent.endBetsExpected = endBetsExpected;
                    remoteEvent.isGameStarted = true;
                    remoteEvent.balance = totalBalance;
                    this.dispatchEvent(remoteEvent);

                } else {
                    var remoteEvent = new createjs.Event(RemoteService.ON_GET_INIT_MSG);
                    remoteEvent.endBetsExpected = endBetsExpected;
                    remoteEvent.isGameStarted = false;
                    remoteEvent.balance = totalBalance;
                    this.dispatchEvent(remoteEvent);
                }
            } else if (gameState == 2) {
                var betsData = json.bets;

                var balls = gameData.balls;
                var totalWin = gameData.total_win;

                var remoteEvent = new createjs.Event(RemoteService.ON_GET_INIT_PLAYING_MSG);
                remoteEvent.balls = balls;
                remoteEvent.totalWin = totalWin;
                remoteEvent.bets = betsData;
                remoteEvent.endBetsExpected = endBetsExpected;
                remoteEvent.isGameStarted = true;
                remoteEvent.balance = totalBalance;
                this.dispatchEvent(remoteEvent);
            }

        } else if (json.kind === "bets_ok_msg") {

            var remoteEvent = new createjs.Event(RemoteService.ON_GET_BETS_OK_MSG);
            remoteEvent.balance = json.balance;
            this.dispatchEvent(remoteEvent);

        } else if (json.kind === "error_msg") {

            var remoteEvent = new createjs.Event(RemoteService.ON_ERROR_MSG);
            remoteEvent.errorCode = json['error_code'];
            remoteEvent.errorMsg = this._gameModel.errorsLabel[remoteEvent.errorCode];
            this.dispatchEvent(remoteEvent);

        } else if (json.kind === "rand_msg") {
            var gameData = json.game_data;
            var gameState = gameData.game_state;

            if (gameState == 2) {
                var balls = gameData.balls;

                if (balls.length > 0) {
                    var totalWin = gameData.total_win;

                    var remoteEvent = new createjs.Event(RemoteService.ON_NEW_BALL);
                    remoteEvent.balls = balls;
                    remoteEvent.ballNum = balls[balls.length - 1];
                    remoteEvent.totalWin = totalWin;
                    this.dispatchEvent(remoteEvent);

                } else {
                    var remoteEvent = new createjs.Event(RemoteService.ON_BETS_DEAL_STOP);
                    this.dispatchEvent(remoteEvent);
                }

            } else if (gameState == 1) {
                var balls = gameData.balls;

                //deprecated
                //if (balls.length < 20) {
                //var remoteEvent : RemoteEvent = new RemoteEvent(RemoteEvent.ON_ROLL_BACK);
                //dispatchEvent(remoteEvent);
                //}else {
                //
                //}


                var totalWin = gameData.total_win;
                var endBetsExpected = gameData.end_bets_expected;

                var remoteEvent = new createjs.Event(RemoteService.ON_COUNTING_COMPLETE);
                remoteEvent.balls = balls;
                remoteEvent.ballNum = balls[balls.length - 1];
                remoteEvent.totalWin = totalWin;
                remoteEvent.endBetsExpected = endBetsExpected;
                this.dispatchEvent(remoteEvent);
            }
        } else if (json.kind === "exit_msg") {
            this.dispatchEvent(new createjs.Event(RemoteService.ON_EXIT_GAME));
        }
    };

    p.sendExitMsg = function () {
        var str = '{' +
            '"kind": "exit_msg"' +
            '}';

        api.toJs(str);
    };

    p.sendExitGameMsg = function () {
        var str = '{' +
            '"kind": "exit_game_msg"' +
            '}';

        api.fromJs(str);
    }

    p.sendExited = function () {
        var str = '{' +
            '"kind": "exited_msg"' +
            '}';

        api.fromJs(str);
    }

    keno.RemoteService = RemoteService;
})();