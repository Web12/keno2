/**
 * Created by USER on 24.10.2014.
 */

this.keno = this.keno||{};

(function() {



    "use strict";
    var BallView = function () {
        this.initialize();
    };

    //Наследуем
    var p = BallView.prototype = new createjs.Container();

//static


//private
    p._ballContent = null;
    p._ballLabel = null;

    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        this._ballContent = new createjs.Bitmap(keno.AssetLoader.getAsset('stepsball'));
        this.addChild(this._ballContent);

        var bounds = this._ballContent.getBounds();

        this._ballLabel = new createjs.Text('', '18px EastAP', '#000000');
        this._ballLabel.x = bounds.width /2;
        this._ballLabel.y = bounds.height /2 - 2;
        this._ballLabel.textAlign = 'center';
        this._ballLabel.textBaseline = 'middle';
        this._ballLabel.cache = true;
        this.addChild(this._ballLabel);

        this.visible = false;
    };

    p.showBall = function(ballNum) {
        this.visible = true;

        this._ballLabel.text = ballNum.toString();
    };

    p.hideBall = function() {
        this.visible = false;
    };

    keno.BallView = BallView;
}());