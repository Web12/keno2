/**
 * Created by am_urunov on 25.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var TicketWinStateView = function (winValue) {
        this.initialize(winValue);
    };

    //Наследуем
    var p = TicketWinStateView.prototype = new createjs.Container();


//private
    p._content = null;
    p._winLabel = null;

    p.Container_initialize = p.initialize;
    p.initialize = function (winValue) {
        this.Container_initialize();

        this._content = new createjs.Bitmap(keno.AssetLoader.getAsset('ticketwinstateback'));
        this.addChild(this._content);


        this._winLabel = new createjs.Text(keno.LangHolder.getLang().ticketwinstatelabel, '17px EastAP', '#ffffff');
        this._winLabel.x = 75;
        this._winLabel.y = 12;
        this._winLabel.cache = true;
        this._winLabel.textAlign = 'center';
        this._winLabel.textBaseline = 'middle';
        this._winLabel.rotation = -2.3;
        this._winLabel.shadow = new createjs.Shadow('#000000', -1, -1, 1);
        this.addChild(this._winLabel);


        this._winValue = new createjs.Text(keno.GameUtil.devideSum(winValue.toString()), '29px EastAP', '#E12229');
        this._winValue.x = 77;
        this._winValue.y = 45;
        this._winValue.cache = true;
        this._winValue.textAlign = 'center';
        this._winValue.textBaseline = 'middle';
        this._winValue.rotation = -2.3;
        this.addChild(this._winValue);

    };

    p.changeWinValue = function(winValue) {
        this._winValue.text = winValue;
    };

    keno.TicketWinStateView = TicketWinStateView;
})();