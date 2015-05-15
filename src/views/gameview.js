/**
 * Created by USER on 06.09.2014.
 */

this.keno = this.keno || {};

(function () {
    "use strict";
    var GameView = function () {
        this.initialize();
    };

    //Наследуем
    var p = GameView.prototype = new createjs.Container();


//static
    GameView.ON_SORT_BUTTON_PRESS = 'onsortbuttonpress';
    GameView.ON_MENU_BUTTON_PRESS = 'onmenubuttonpress';
    GameView.ON_CLEAR_ALL_BUTTON_PRESS = 'onclearallbuttonpress';
    GameView.ON_CONFIRM_BUTTON_PRESS = 'onconfirmbuttonpress';
    GameView.ON_ADD_TICKET_BUTTON_PRESS = 'onaddticketbuttonpress';
    GameView.ON_TICKET_ADD_COMPLETE = 'onaddticketaddcomplete';
    GameView.ON_EXIT_GAME_ANIM_COMPLETE = 'onexitgameanimcomplete';
    GameView.ON_COUNTING_WIN_COMPLETE = 'oncountingwincomplete';
//public properties

//private properties
    p._backgroundView = null;
    p._headerView = null;
    p._footerView = null;
    p._gameStatusView = null;
    p._stateBallsView = null;
    p._ticketsTableView = null;
    p._decorView = null;

    p._ticketPopup = null;
    p._errorView = null;

    p._blackScreen = null;
    p._holder = null;

    p._lockScreenBitmap = null;


    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();
    };

    /**
     * Входим во вьюшку.
     * @param bets массив ставок.
     */
    p.init = function (betsValue, coefs) {

        this._backgroundView = new keno.BackgroundView();
        this.addChild(this._backgroundView);

        this._headerView = new keno.HeaderView();
        this.addChild(this._headerView);

        this._footerView = new keno.FooterView();
        this.addChild(this._footerView);

        this._gameStatusView = new keno.GameStatusView();
        this.addChild(this._gameStatusView);

        this._ticketsTableView = new keno.TicketTableView(coefs);
        this.addChild(this._ticketsTableView);

        this._stateBallsView = new keno.StateBallsView();
        this.addChild(this._stateBallsView);

        this._decorView = new keno.DecorView();
        this.addChild(this._decorView);

        var versionNum = new createjs.Text('v1.3.9', "14px Arial", "#ff0000");
        versionNum.x = 1520;
        versionNum.y = 880;
        versionNum.cache = true;
        versionNum.textAlign = 'center';
        this.addChild(versionNum);

        this._errorView = new keno.ErrorView();
        this.addChild(this._errorView);

        this._ticketPopup = new keno.TicketPopupView(betsValue, coefs);
        this._ticketPopup.addEventListener(keno.TicketPopupView.ON_CLOSE, this._onTicketPopupClose.bind(this));
        this.addChild(this._ticketPopup);

        this._blackScreen = new createjs.Shape();
        this._blackScreen.graphics.beginFill('#000000');
        this._blackScreen.graphics.drawRect(0, 0, keno.GameModel.APP_WIDTH, keno.GameModel.APP_HEIGHT);
        this._blackScreen.graphics.endFill();
        this._blackScreen.cache = true;
        this._blackScreen.alpha = 1;
        this.addChild(this._blackScreen);

        createjs.Ticker.on('tick', this._renderView, this);
    };

    p.initAnim = function () {
        createjs.Tween.get(this._blackScreen, {loop: false}).to({alpha: 0}, 1000, createjs.Ease.none).call(this._onBlackScreenHideTweenComplete.bind(this));
    };

    p._onBlackScreenHideTweenComplete = function () {
        if (this._blackScreen != null) {
            this.removeChild(this._blackScreen);
        }
    };


    p.updateCoefs = function (coefs) {
        this._ticketsTableView.init();
        this._gameStatusView.updateCoefs(coefs);
    };

    p.setTimerWaitTimer = function (waitTimer) {
        this._headerView.startTimerProgress(waitTimer);
    };

    p.updateHeader = function (tCount, bAmount, pName, balance) {
        this._headerView.updateHeader(tCount, bAmount, pName, balance);
    };

    p.clearTimer = function () {
        this._headerView.clearTimer();
    };

    p.showAddTicketPopup = function () {
        this._ticketPopup.showPopup();
    };

    p.hidePopup = function () {
        this._ticketPopup.hidePopup();
    };

    p.addTicket = function (ticketData) {
        this._ticketsTableView.addTicket(ticketData);
    };

    p.sortTickets = function (sortType) {
        this._ticketsTableView.sortTickets(sortType);
    };

    p.setCheckedStateTotickets = function () {
        this._ticketsTableView.setCheckedStateTotickets();
    };

    p.clearAllTickets = function () {
        this._ticketsTableView.clear();
        this._gameStatusView.clearSelected()
    };

    p.clearUnconfirmedTickets = function () {
        this._ticketsTableView.clearUnconfirmedTickets();
    };


    p.enableFooter = function () {
        this._footerView.enable();
    };

    p.disableFooter = function () {
        this._footerView.disable();
    };

    p.showCoincCoef = function (selectedNumCounts) {
        this._gameStatusView.showCoincCoef(selectedNumCounts);
    };

    p.newBall = function (ballNum) {
        this._ticketsTableView.newBall(ballNum);
        this._stateBallsView.showBall(ballNum);
        this._gameStatusView.updateCounting(ballNum);
    };

    p.fillBalls = function (balls) {
        this._ticketsTableView.clearTicketsNum();
        for (var i = 0; i < balls.length; i++) {
            this._ticketsTableView.newBall(balls[i]);
            this._stateBallsView.showBall(balls[i])
        }

        var lastIndex = balls.length - 1;
        this._gameStatusView.updateCounting(balls[lastIndex]);
    };

    p.clearTicketsNums = function () {
        this._ticketsTableView.clearTicketsNum();
        this._ticketsTableView.clearWinState();
    };

    p.clearBalls = function () {
        this._stateBallsView.clearBalls();
    };

    p.clearCounting = function () {
        this._gameStatusView.clearCounting();
    };

    p.updateWin = function (totalWin) {
        this._gameStatusView.updateWin(totalWin);
    };

    p._onTicketPopupClose = function (event) {
        this._footerView.enable();
        if (this._ticketPopup != null) {
            this._ticketPopup.clearAll();
        }
    };

    p.lockScreen = function () {
        this._lockScreenBitmap = new createjs.Shape();
        this._lockScreenBitmap.graphics.beginFill('#ffffff');
        this._lockScreenBitmap.graphics.drawRect(0, 0, keno.GameModel.APP_WIDTH, keno.GameModel.APP_HEIGHT);
        this._lockScreenBitmap.graphics.endFill();
        this._lockScreenBitmap.alpha = 0;
        this._lockScreenBitmap.cache = true;
        this.addChild(this._lockScreenBitmap);
    };

    p.unlockScreen = function () {
        if (this._lockScreenBitmap != null) this.removeChild(this._lockScreenBitmap);
    };


    p.exitGameAnimation = function () {
        var b = new createjs.Shape();
        b.graphics.beginFill('#000000');
        b.graphics.drawRect(0, 0, keno.GameModel.APP_WIDTH, keno.GameModel.APP_HEIGHT);
        b.graphics.endFill();
        b.cache = true;
        b.alpha = 0;
        this.addChild(b);

        createjs.Tween.get(b, {loop: false}).to({alpha: 1}, 500).call(this._onGameExitComplete.bind(this));
    };

    p._onGameExitComplete = function () {
        this.dispatchEvent(new createjs.Event(GameView.ON_EXIT_GAME_ANIM_COMPLETE));
    };

    p.showWinAnimation = function (balanceValue, winValue) {
        this._gameStatusView.animateWin(winValue);
        this._headerView.showBalanceAnimation(balanceValue);
    };

    p.clearImmediatelyWinAnimation = function () {
        this._gameStatusView.clearImmediately();
        this._headerView.clearImmediately();
    };

    p.showError = function (errorMsg) {
        this._errorView.showError(errorMsg);
    };

    p._renderView = function (event) {
        stage.update(event);
    };

    keno.GameView = GameView;
})();

