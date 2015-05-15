/**
 * Created by USER on 17.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var CoefsTableView = function () {
        this.initialize();
    };

    //Наследуем
    var p = CoefsTableView.prototype = new createjs.Container();

//static

//private properties
    p._coefsHolder = null;

    p._tableTitleLabel = null;

    p._rowLabels = [];
    p._colLabels = [];


    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();

        this._tableTitleLabel = new createjs.Text(keno.LangHolder.getLang().numberofselectedballslabel, '18px EastAP', '#cecece');
        this._tableTitleLabel.x = 106;
        this._tableTitleLabel.y = 458;
        this._tableTitleLabel.height = 35;
        this._tableTitleLabel.alpha = 0.3;
        this._tableTitleLabel.cache = true;
        this.addChild(this._tableTitleLabel);

        for (var i = 0; i < 10; i++)
        {
            var rowLabel = new createjs.Text((i + 1).toString(), '10px EastAP', '#909090' );
            rowLabel.width = 30;
            rowLabel.height = 20;
            rowLabel.x = 112 + (i * 32);
            rowLabel.y = 481;
            rowLabel.cache = true;
            this.addChild(rowLabel);

            this._rowLabels.push(rowLabel);
        }


        for (i = 0; i < 10; i++)
        {
            var colLabel = new createjs.Text((i + 1).toString(), '10px EastAP', '#909090' );
            colLabel.width = 30;
            colLabel.height = 20;
            colLabel.x = 91;
            colLabel.y = 501 + (i * 22);
            colLabel.cache = true;
            colLabel.textAlign = 'right';
            this.addChild(colLabel);

            this._colLabels.push(colLabel);
        }
    };

    p.fillCoefs = function( coefs ) {

        var n = 0;

        this._createCoefsHolder();
        for (var i = 0; i < 10; i++)
        {
            for (var j = 0; j < 10; j++)
            {
                var text = ( coefs[n] == 0 ) ? "" : coefs[n] + "";

                var colLabel = new createjs.Text(text, '10px EastAP', '#ffffff');
                colLabel.width = 30;
                colLabel.height = 20;
                colLabel.x = 114 + (j * 32.3);
                colLabel.y = 508 + (i * 22);
                colLabel.cache = true;
                colLabel.textAlign = 'center';
                colLabel.textBaseline = 'middle';
                this._coefsHolder.addChild(colLabel);

                n++;
            }
        }
    };


    p.showCoincCoef = function(selectedNumCounts) {

        var n = 0;
        for (var i = 0; i < 10; i++)
        {
            for (var j = 0; j < 10; j++)
            {
                if ( j == (selectedNumCounts - 1) ) {
                    var coefLabel = this._coefsHolder.getChildAt(n);
                    coefLabel.color = '#edd119';
                }

                n++;
            }
        }

    };

    p.clearSelected = function() {
        if ( this._coefsHolder == null ) return;

        var n = 0;
        for (var i = 0; i < 10; i++)
        {
            for (var j = 0; j < 10; j++)
            {
                var coefLabel = this._coefsHolder.getChildAt(n);
                coefLabel.color = '#ffffff';

                n++;
            }
        }
    };

    p._createCoefsHolder = function()
    {
        if (this._coefsHolder != null ) {
            this.removeChild(this._coefsHolder);
        }

        this._coefsHolder = new createjs.Container();
        this.addChild(this._coefsHolder);
    };

    keno.CoefsTableView = CoefsTableView;
})();