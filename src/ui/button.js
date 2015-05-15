/**
 * Created by USER on 21.09.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var Button = function (normal, down, hover, disable) {
        this.initialize(normal, down, hover, disable);
    };

    //Наследуем
    var p = Button.prototype = new createjs.Container();

//static
    Button.ON_BUTTON_DOWN = 'onButtonDown';
    Button.ON_BUTTON_UP = 'onButtonUp';

//public properties
    p.isUp  = true;

//private properties
    p._states;
    p._holder;
    p._colors;
    p._textField;

    p.Container_initialize = p.initialize;

    /**
     * Конструктор, получает классы Image с состояниями кнопки.
     * @param normal текстура для нормальное состояние.
     * @param down текстура для нажатое состояние.
     * @param hover текстура для наведенное состояние.
     * @param disable текстура для неактивное состояние.
     */
    p.initialize = function (normal, down, hover, disable) {
        this.Container_initialize();

        this._states = [];
        this._states.push(normal);
        this._states.push(down);
        this._states.push(hover);
        this._states.push(disable);

        this.mouseChildren = false;
        this.addEventListener('mousedown', this._onMouseDown.bind(this));
        this.addEventListener('pressup', this._onMouseUp.bind(this));

        this._holder = new createjs.Bitmap(this._states[0]);
        this.addChild(this._holder);
    };

    p._onMouseDown = function( event )
    {
        this.downState();

        this.dispatchEvent(new createjs.Event(Button.ON_BUTTON_DOWN));
    }

    p._onMouseUp = function( event )
    {
        this.normalState();

        this.dispatchEvent(new createjs.Event(Button.ON_BUTTON_UP));
    }

    /**
     * Устанавливаем нормальное состояние кнопки
     */
    p.normalState = function () {

        if ( this._states[0] != null ) {
            this._holder.image = this._states[0];
        }

        if (this._colors != null) {
            this._textField.color = this._colors[0];
        }
    };

    /**
     * Устанавливаем нажатое состояние кнопки
     */
    p.downState = function () {
        if ( this._states[1] != null ) {
            this._holder.image = this._states[1];
        }

        if (this._colors != null) {
            this._textField.color = this._colors[1];
        }
    };

    /**
     * Устанавливаем наведенное состояние кнопки
     */
    p.hoverState = function () {
        if ( this._states[3] != null ) {
            this._holder.image = this._states[3];
        }
    };

    /**
     * Устанавливаем неактивное состояние кнопки
     */
    p.disableState = function () {
        if ( this._states[2] != null ) {
            this._holder.image = this._states[2];
        }

        if (this._colors != null) {
            this._textField.color = this._colors[2];
        }
    };

    /**
     * Создаем текстовое поле на кнопке.
     * @param font стиль шрифта.
     * @param c цвет шрифта.
     * @param h высота шрифта.
     */
    p.setTextField = function(font, c, offset) {

        this._textField = new createjs.Text('', font, c);
        this._textField.width = this._holder.image.width - 20;
        this._textField.x = this._holder.image.width / 2;
        this._textField.y = this._holder.image.height / 2 - offset;
        this._textField.cache = true;
        this._textField.textAlign = 'center';
        this._textField.textBaseline = 'middle'
        this.addChild(this._textField);
    };

    /**
     * Устанавливаем текст для кнопки.
     * @param label значение текста.
     */
    p.setLabel = function( label )
    {
        this._textField.text = label;
    };

    /**
     * Устанавливаем цвет для текстового поля.
     * @param c значение цвета.
     */
    p.setColors = function( c )
    {
        this._colors = c;
    };

    p.enable = function() {
        this.disable();

        this.addEventListener('mousedown', this._onMouseDown.bind(this));
        this.addEventListener('pressup', this._onMouseUp.bind(this));
        this.normalState();
    }

    p.disable = function() {
        this.removeAllEventListeners('mousedown');
        this.removeAllEventListeners('pressup');
        this.disableState();
    }

    keno.Button = Button;

})();