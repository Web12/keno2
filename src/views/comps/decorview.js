/**
 * Created by am_urunov on 25.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var DecorView = function () {
        this.initialize();
    };

    //Наследуем
    var p = DecorView.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        var lightBitmap = new createjs.Bitmap(keno.AssetLoader.getAsset('light_decor'));
        lightBitmap.x = 1480;
        lightBitmap.y = 513;
        this.addChild(lightBitmap);

        var lightParticles = new createjs.Bitmap(keno.AssetLoader.getAsset('light_particles'));
        lightParticles.x = 1460;
        lightParticles.y = 570;
        lightParticles.compositeOperation = 'screen';
        this.addChild(lightParticles);

        var dragonLegSkin = new createjs.Bitmap(keno.AssetLoader.getAsset('dragon_lleg_skin_mask'));
        dragonLegSkin.x = 0;
        dragonLegSkin.y = 515;
        dragonLegSkin.alpha = 0.44;
        dragonLegSkin.compositeOperation = 'multiply';
        this.addChild(dragonLegSkin);
    };

    keno.DecorView = DecorView;
})();