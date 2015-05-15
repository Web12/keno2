/**
 * Created by am_urunov on 17.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var GameStatusView = function () {
        this.initialize();
    };

    //Наследуем
    var p = GameStatusView.prototype = new createjs.Container();

//static

//private properties
    p._decorTopImg = null;

    p._ballCuntValue = null;
    p._ballCuntHolder = null;

    p._countingLabelLight = null;
    p._winlabel = null;
    p._winValue = null;
    p._coefsTableView = null;


    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        this._ballCuntHolder = new createjs.Container();
        this._ballCuntHolder.x = 230;
        this._ballCuntHolder.y = 345;
        this.addChild(this._ballCuntHolder);


        this._ballCuntValue = new createjs.Text('', '100px EastAP', '#edd119');
        this._ballCuntValue.x = 5;
        this._ballCuntValue.y = -5;
        this._ballCuntValue.textAlign = 'center';
        this._ballCuntValue.textBaseline = 'middle';
        this._ballCuntValue.shadow = new createjs.Shadow('#000000', 0, -2, 1);
        this._ballCuntHolder.addChild(this._ballCuntValue);

        //this._countingLabelLight = new createjs.Bitmap(keno.AssetLoader.getAsset('counting_label_light'));
        //this._countingLabelLight.x = 130;
        //this._countingLabelLight.y = 243;
        //this._countingLabelLight.alpha = 0.45;
        //this.addChild(this._countingLabelLight);


        this._winlabel = new createjs.Text(keno.LangHolder.getLang().yourwinningslabel, '29px EastAP', '#edd119');
        this._winlabel.x = 242;
        this._winlabel.y = 755;
        this._winlabel.height = 42;
        this._winlabel.cache = true;
        this._winlabel.textAlign = 'center';
        this._winlabel.textBaseline = 'middle';
        this.addChild(this._winlabel);

        this._winValue = new createjs.Text('', '72px EastAP', '#edd119');
        this._winValue.x = 245;
        this._winValue.y = 820;
        this._winValue.width = 260;
        this._winValue.height = 94;
        this._winValue.cache = true;
        this._winValue.textAlign = 'center';
        this._winValue.textBaseline = 'middle';
        this.addChild(this._winValue);

        this._coefsTableView = new keno.CoefsTableView();
        this.addChild(this._coefsTableView);

        this._decorTopImg = new createjs.Bitmap(keno.AssetLoader.getAsset('dragon_img_top'));
        this._decorTopImg.y = 57;
        this.addChild(this._decorTopImg);
    };

    p.updateCoefs = function(coefs) {
        this._coefsTableView.fillCoefs(coefs);
    };

    p.updateCounting = function( value ) {
        if (value === undefined) return;

        this._ballCuntValue.text = value + "";
        this._ballCuntHolder.alpha = 0;
        //this._ballCuntHolder.scaleX = 0.2;
        //this._ballCuntHolder.scaleY = 0.2;

        //createjs.Tween.get(this._ballCuntHolder, { loop : false }).to( {alpha : 1, scaleX : 1, scaleY : 1 }, 1000, createjs.Ease.bounceOut );
        createjs.Tween.get(this._ballCuntHolder, { loop : false }).to( {alpha : 1}, 500 );
    };

    p.clearCounting = function()
    {
        if (this._ballCuntValue != null) {
            this._ballCuntValue.text = '';
        }
    };

    p.updateWin = function( value ) {
        this._winValue.text = ( value == 0 ) ? "" : keno.GameUtil.devideSum(value + "");

    };

    p.animateWin = function ( value ) {
        this._winValue.winCount = value;

        keno.SoundUtil.getInstance().playSound(keno.SoundUtil.COINS_AND_SALUTE);

        createjs.Tween.get(this._winValue, {loop : false}).to({winCount : 0}, 6400).call(this._onCountingTweenComplete.bind(this)).addEventListener("change", this._onCountingTweenUpdate.bind(this));
    };

    p._onCountingTweenUpdate = function(event) {
        this._winValue.winCount = Math.round(this._winValue.winCount);

        this._winValue.text = ( this._winValue.winCount == 0 ) ? "" : keno.GameUtil.devideSum(this._winValue.winCount + "");
    };

    p._onCountingTweenComplete = function(){
        this.dispatchEvent(new createjs.Event(keno.GameView.ON_COUNTING_WIN_COMPLETE, true));
    };

    p.clearImmediately = function() {
        createjs.Tween.removeTweens(this._winValue);
        this._winValue.text = '';
    };

    p.clearSelected = function() {
        this._coefsTableView.clearSelected();
    };

    p.showCoincCoef = function(selectedNumCounts){
        this._coefsTableView.showCoincCoef(selectedNumCounts);
    };

    keno.GameStatusView = GameStatusView;
})();
