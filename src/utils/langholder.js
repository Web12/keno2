

this.keno = this.keno||{};

(function() {
    "use strict";
    var LangHolder = function () {
        this.initialize();
    };

    //Наследуем
    var p = LangHolder.prototype;

    var lang_ru =   {
                        timetoplaylabel : "Время до игры",
                        cardslabel : "Билеты",
                        amountbetlabel : "Сумма ставок",
                        playerlabel : "Игрок",
                        balancelabel : "Баланс",
                        numberofselectedballslabel : "Количество выбранных шаров",
                        yourwinningslabel : "ВАШ ВЫИГРЫШ",
                        ratingslabel : "Номиналы",
                        menubuttonlabel : 'Меню',
                        addticketbuttonlabel : 'Добавить билет',
                        clearallbuttonlabel : 'Очистить',
                        confirmbuttonlabel : 'Подтвердить',
                        ticketwinstatelabel : 'ВЫИГРЫШ'
                    };


    p.initialize = function () {

    };

    LangHolder.getLang = function() {
        //TODO multilang future
        return lang_ru;
    };

    keno.LangHolder = LangHolder;
})();




