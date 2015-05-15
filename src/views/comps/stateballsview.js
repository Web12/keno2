/**
 * Created by USER on 24.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var StateBallsView = function () {
        this.initialize();
    };

    //Наследуем
    var p = StateBallsView.prototype = new createjs.Container();

//static

//private
    p._holder = null;

    p._balls = [];

    p._ballCount = 0;

    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        this._createHolder();
        for (var i = 0; i < 2; i++)
        {
            for(var j = 0; j < 10 / 2; j++) {
                var ballView = new keno.BallView();
                ballView.x = 718 + ( j * 44 );
                ballView.y = 795 + ( i * 40 );
                this._holder.addChild(ballView);

            }

            for(var j = 0; j < 10 / 2; j++) {
                var ballView = new keno.BallView();
                ballView.x = 988 + ( j * 44 );
                ballView.y = 795 + ( i * 40 );
                this._holder.addChild(ballView);

            }
        }
    };

    p.showBall = function(ballNum) {
        var ballView = this._holder.getChildAt(this._ballCount);
        ballView.showBall(ballNum);

        this._ballCount++;
    };

    p.clearBalls = function() {
        for(var i = 0; i < this._holder.children.length; i++){
            var ballView = this._holder.getChildAt(i);
            ballView.hideBall();
        }

        this._ballCount = 0;
    };

    p._createHolder = function() {
        if (this._holder != null){
            this.removeChild(this._holder);
        }

        this._holder = new createjs.Container();
        this.addChild(this._holder);
    };

    keno.StateBallsView = StateBallsView;
}());