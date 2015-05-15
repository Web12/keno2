/**
 * Created by am_urunov on 17.10.2014.
 */

/**
 * Created by am_urunov on 17.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var FooterView = function () {
        this.initialize();
    };

    //Наследуем
    var p = FooterView.prototype = new createjs.Container();

//static

//private properties
    p._menuButton = null;
    p._addTicketButton = null;
    p._clearAllButton = null;
    p._confirmButton = null;


    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        this._menuButton = new keno.Button(keno.AssetLoader.getAsset('menu_normal'), keno.AssetLoader.getAsset('menu_press'), keno.AssetLoader.getAsset('menu_disable'));
        this._menuButton.x = 483;
        this._menuButton.y = 803;
        this._menuButton.setTextField('24px EastAP', '#043800', 2);
        this._menuButton.setColors(['#000000', '#ffffff', '#000000']);
        this._menuButton.setLabel(keno.LangHolder.getLang().menubuttonlabel);
        this._menuButton.addEventListener(keno.Button.ON_BUTTON_DOWN, this._onButtonDown.bind(this));
        this._menuButton.addEventListener(keno.Button.ON_BUTTON_UP, this._onButtonUp.bind(this));
        this.addChild(this._menuButton);

        this._addTicketButton = new keno.Button(keno.AssetLoader.getAsset('add_tick_normal'), keno.AssetLoader.getAsset('add_tick_press'), keno.AssetLoader.getAsset('add_tick_disable'));
        this._addTicketButton.x = 1250;
        this._addTicketButton.y = 800;
        this._addTicketButton.setTextField('24px EastAP', '#450000', 6);
        this._addTicketButton.setColors(['#fff325', '#ffffff', '#000000']);
        this._addTicketButton.setLabel(keno.LangHolder.getLang().addticketbuttonlabel);
        this._addTicketButton.addEventListener(keno.Button.ON_BUTTON_DOWN, this._onButtonDown.bind(this));
        this._addTicketButton.addEventListener(keno.Button.ON_BUTTON_UP, this._onButtonUp.bind(this));
        this.addChild(this._addTicketButton);

        //clearAllButton = new Button(new ClearAllNormal(0, 0), new ClearAllPress(0, 0), new ClearAllNormal(0, 0), new ClearAllDisable(0, 0));
        //clearAllButton.x = 1049;
        //clearAllButton.y = 807;
        //clearAllButton.setTextField(new TextFormat("Bonzai", 40, 0x450000), new Rectangle(0, 0, 205, 65));
        //clearAllButton.setColors([0x450000, 0xffffff]);
        //clearAllButton.setLabel(LangHolder.getInstance().clearallbuttonlabel);
        //clearAllButton.addEventListener(ButtonEvent.ON_BUTTON_DOWN, onButtonDown);
        //clearAllButton.addEventListener(ButtonEvent.ON_BUTTON_UP, onButtonUp);
        //clearAllButton.disable();
        //addChild(clearAllButton);

        //confirmButton = new Button(new ConfirmNormal(0, 0), new ConfirmPress(0, 0), new ConfirmNormal(0, 0), new ConfirmDisable(0, 0));
        //confirmButton.x = 1328;
        //confirmButton.y = 805;
        //confirmButton.setTextField(new TextFormat("Bonzai", 40, 0x043800), new Rectangle(0, 0, 208, 65));
        //confirmButton.setColors([0x043800, 0xffffff]);
        //confirmButton.setLabel(LangHolder.getInstance().confirmbuttonlabel);
        //confirmButton.addEventListener(ButtonEvent.ON_BUTTON_DOWN, onButtonDown);
        //confirmButton.addEventListener(ButtonEvent.ON_BUTTON_UP, onButtonUp);
        //confirmButton.disable();
        //addChild(confirmButton);
    };

    p._onButtonDown = function(event)
    {

        var button = event.target;

        var gameEvent;
        if ( button == this._menuButton )
        {
            gameEvent = new createjs.Event(keno.GameView.ON_MENU_BUTTON_PRESS, true);
            this.dispatchEvent(gameEvent);
            //}else if ( button == addTicketButton )
            //{
            //gameEvent = new GameEvent(GameEvent.ON_ADD_TICKET_BUTTON_PRESS, true);
            //dispatchEvent(gameEvent);
        }
//        else if ( button == this._clearAllButton )
//        {
//            gameEvent = new createjs.Event(keno.GameView.ON_CLEAR_ALL_BUTTON_PRESS, true);
//            this.dispatchEvent(gameEvent);
//        } else if ( button == this._confirmButton ) {
//
//            gameEvent = new createjs.Event(keno.GameView.ON_CONFIRM_BUTTON_PRESS, true);
//            this.dispatchEvent(gameEvent);
//
////            SoundUtil.getInstance().playStartGameCountingSound();
//        }else if ( button == this._addTicketButton )
//        {
//            gameEvent = new createjs.Event(keno.GameView.ON_ADD_TICKET_BUTTON_PRESS, true);
//            this.dispatchEvent(gameEvent);
//        }

        keno.SoundUtil.getInstance().playSound(keno.SoundUtil.TICKET_MODE_BUTTON_SOUND);
//        SoundUtil.getInstance().playMainButtonsSound();
    };

    p._onButtonUp = function(event)
    {
        var button = event.target;

        var gameEvent;
        if ( button == this._confirmButton )
        {
            gameEvent = new createjs.Event(keno.GameView.ON_CONFIRM_BUTTON_PRESS, true);
            this.dispatchEvent(gameEvent);

//            SoundUtil.getInstance().playStartGameCountingSound();

        }else if ( button == this._addTicketButton )
        {
            gameEvent = new createjs.Event(keno.GameView.ON_ADD_TICKET_BUTTON_PRESS, true);
            this.dispatchEvent(gameEvent);
        }


    };

    p.enable = function()
    {
        this._menuButton.enable();
        this._addTicketButton.enable();
        //clearAllButton.enable();
        //confirmButton.enable();
    };

    p.disable = function()
    {
        this._menuButton.disable();
        this._addTicketButton.disable();
        //clearAllButton.disable();
        //confirmButton.disable();
    };

    keno.FooterView = FooterView;
})();
