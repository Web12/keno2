/**
 * Created by USER on 06.09.2014.
 */

this.keno = this.keno||{};

(function() {

    "use strict";
    var GameModel = function () {
        this.initialize();
    };

    //Наследуем
    var p = GameModel.prototype;

    GameModel.APP_WIDTH = 1600;
    GameModel.APP_HEIGHT = 900;

    GameModel.TOTAL_LOTOTRON_BALLS = 20;

    GameModel.SORT_TYPE_1 = "sortType1";
    GameModel.SORT_TYPE_2 = "sortType2";
    GameModel.SORT_TYPE_3 = "sortType3";

    p.localSimulate = false;

    p.waitTime = 30;

//                1   2   3   4    5    6     7     8     9     10
    p.coefs = [ 3.6,  1,  0,  0,   0,   0,    0,    0,    0,     0,
                  0,  9,  3,  1,   1,   0,    0,    0,    0,     0,
                  0,  0, 35, 10,   3,   2,    2,    1,    1,     0,
                  0,  0,  0, 90,  20,  15,    5,    3,    2,     2,
                  0,  0,  0,  0, 250,  50,   25,   15,    6,     4,
                  0,  0,  0,  0,   0, 600,  100,   50,   25,    15,
                  0,  0,  0,  0,   0,   0, 1000,  400,  125,   100,
                  0,  0,  0,  0,   0,   0,    0, 1500, 1000,   500,
                  0,  0,  0,  0,   0,   0,    0,    0, 5000,  2500,
                  0,  0,  0,  0,   0,   0,    0,    0,    0, 10000];

    p.bets = [1000, 500, 250, 100, 50];

    p.ticketCount = 0;
    p.playerName = "";
    p.amountBet = 0;
    p.totalBalance = 0;
    p.endBetsExpected = null;

    p.errorsLabel = {};

    /**
     * Конструктор.
     */
    p.initialize = function() {
        this.errorsLabel[1] = 'Не удалось завершить действие';
        this.errorsLabel[2] = 'Работа зала приостановлена';
        this.errorsLabel[3] = 'Игра недоступна';
        this.errorsLabel[101] = 'Карточка не найдена';
        this.errorsLabel[102] = 'Карточка заблокирована';
        this.errorsLabel[103] = 'Карточка не привязана к аккаунту';
        this.errorsLabel[104] = 'Номер телефона не найден';
        this.errorsLabel[105] = 'Аккаунт не активирован';
        this.errorsLabel[106] = 'Аккаунт заблоикрован';
        this.errorsLabel[107] = 'Неверный пин-код';
        this.errorsLabel[110] = 'Место занято другим игроком';
        this.errorsLabel[201] = 'Войдите в систему';
        this.errorsLabel[202] = 'Дождитесь окончания игры';
        this.errorsLabel[301] = 'Некорректная квитанция';
        this.errorsLabel[302] = 'Квитанция не найдена';

        this.errorsLabel[303] = 'Квитанция другого зала';
        this.errorsLabel[304] = 'Квитанция не продана на кассе';
        this.errorsLabel[305] = 'Квитанция уже играла';
        this.errorsLabel[306] = 'Квитанция зарегистрирована на другом месте';
        this.errorsLabel[307] = 'Регистрация квитанций закрыта';
        this.errorsLabel[401] = 'Прием ставок закрыт';
        this.errorsLabel[402] = 'Недостаточно средств на балансе';
    };


    keno.GameModel = GameModel;

})();


