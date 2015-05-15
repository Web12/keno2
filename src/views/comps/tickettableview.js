/**
 * Created by am_urunov on 17.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var TicketTableView = function (coefs) {
        this.initialize(coefs);
    };

    //Наследуем
    var p = TicketTableView.prototype = new createjs.Container();

//static

//private properties

    p._holder = null;
    p._tableControlsBack = null;
    p._decorBottomImg = null;
    p._rightControlButton = null;
    p._leftControlButton = null;

    p._currentSortMode = '';
    p._slideCounter = 0;
    p._slideMaxCount = 0;
    p._tableMask = null;

    p._coefs = null;
    p._ticketViews = null;

    p.Container_initialize = p.initialize;
    p.initialize = function (coefs) {
        this.Container_initialize();

        this._coefs = coefs;
        this._ticketViews = [];

        p._currentSortMode = keno.GameModel.SORT_TYPE_2;

        this._tableControlsBack = new createjs.Bitmap(keno.AssetLoader.getAsset('table_controls_back'));
        this._tableControlsBack.x = 405;
        this._tableControlsBack.y = 357;
        this.addChild(this._tableControlsBack);

        this._rightControlButton = new keno.Button(keno.AssetLoader.getAsset('table_control_normal'), keno.AssetLoader.getAsset('table_control_press'));
        this._rightControlButton.x = 1525;
        this._rightControlButton.y = 372;
        this._rightControlButton.addEventListener(keno.Button.ON_BUTTON_DOWN, this._onControlButtonDowm.bind(this));
        this.addChild(this._rightControlButton);

        this._leftControlButton = new keno.Button(keno.AssetLoader.getAsset('table_control_normal'), keno.AssetLoader.getAsset('table_control_press'));
        this._leftControlButton.x = 418 + 55;
        this._leftControlButton.y = 372;
        this._leftControlButton.scaleX = -1;
        this._leftControlButton.addEventListener(keno.Button.ON_BUTTON_DOWN, this._onControlButtonDowm.bind(this));
        this.addChild(this._leftControlButton);

//        decorBottomImg = new Bitmap(new DragonBottomData(0, 0), PixelSnapping.AUTO, true);
//        decorBottomImg.y = 470;
//        addChild(decorBottomImg);

    }

    p.init = function()
    {
        this._tableMask = new createjs.Shape();
        this._tableMask.graphics.beginFill('#ffffff');
        this._tableMask.graphics.drawRect(0, 0, 1034, 690);
        this._tableMask.graphics.endFill();
        this._tableMask.x = 480;
        this._tableMask.y = 86;
        this._tableMask.alpha = 0;
        this._tableMask.cache = true;
        this.addChild(this._tableMask);

        this._createHolder();
    }

    p.addTicket = function( ticketData )
    {
        if ( this._currentSortMode == keno.GameModel.SORT_TYPE_1 ) {

            var ticketView = new keno.TicketView( ticketData );
            ticketView.x = 650 + (this._holder.children.length * 1036);
            ticketView.y = 80;
            this._holder.addChild(ticketView);

            this._ticketViews.push(ticketView);

            this._slideMaxCount = this._holder.children.length - 1;

        } else if ( this._currentSortMode == keno.GameModel.SORT_TYPE_2 ) {

            var ticketView = new keno.TicketView( ticketData );
            //ticketView.scaleX = 0.49;
            //ticketView.scaleY = 0.49;
            this._holder.addChild(ticketView);

            this._ticketViews.push(ticketView);

            this._slideMaxCount = Math.floor ( ( this._holder.children.length - 1 ) / 6 );

            var row = 0;
            var col = 0;
            for (var i = 0; i < this._holder.children.length; i++)
            {
                var ticketView = this._holder.getChildAt(i);
                ticketView.x = 481 + (row * 346);
                ticketView.y = 83 + (col * 350);

                col += 1;
                if (col == 2){
                    row += 1;
                    col = 0;
                }

                //if ( (row + 1) > Math.ceil( this._holder.children.length / 2 )) {
                //    col += 1;
                //    row = 0;
                //}
            }

        } else if ( this._currentSortMode == keno.GameModel.SORT_TYPE_3 ) {

            var ticketView = new keno.TicketView( ticketData );
            ticketView.scaleX = 0.34;
            ticketView.scaleY = 0.32;
            this._holder.addChild(ticketView);

            this._ticketViews.push(ticketView);

            this._slideMaxCount = Math.floor ( ( this._holder.children.length - 1 ) / 12 );

            var row = 0;
            var col = 0;
            for (var i = 0; i < this._holder.children.length; i++)
            {
                var ticketView = this._holder.getChildAt(i);
                ticketView.x = 479 + (row * 265);
                ticketView.y = 83 + (col * 235);

                col += 1;
                if ( col >= 3) {
                    col = 0;
                    row += 1;
                }
            }
        }
    };

    p.sortTickets = function( sortType )
    {
        this._currentSortMode = sortType;

        this._slideCounter = 0;
        this._holder.x = 0;

        if ( this._currentSortMode == keno.GameModel.SORT_TYPE_1 ) {
            keno.SoundUtil.getInstance().playSound(keno.SoundUtil.ZOOM_IN_SOUND);
//            SoundUtil.getInstance().playZoomInTicketsSound();

            this._slideMaxCount = this._holder.children.length - 1;

            for (var i = 0; i < this._holder.children.length; i++)
            {
                var ticketView = this._holder.getChildAt(i);

                createjs.Tween.get(ticketView, {loop : false}).to({ x :  650 + (i * 1036), y : 80, scaleX : 1, scaleY : 1 }, 200);
//                Actuate.tween(ticketView, 0.5, { x :  650 + (i * 1036), y : 80, scaleX : 1, scaleY : 1 } );
            }



        } else if ( this._currentSortMode == keno.GameModel.SORT_TYPE_2 ) {
            keno.SoundUtil.getInstance().playSound(keno.SoundUtil.ZOOM_OUT_SOUND);

            this._slideMaxCount = Math.floor ( this._holder.children.length / 6 );

            var row = 0;
            var col = 0;
            for (var i = 0; i < this._holder.children.length; i++)
            {
                var ticketView = this._holder.getChildAt(i);

                createjs.Tween.get(ticketView, {loop : false}).to({ x :  479 + (row * 346), y : 83 + (col * 350), scaleX : 0.49, scaleY : 0.49 }, 200);

                row += 1;
                if ( (row + 1) > Math.ceil( this._holder.children.length / 2 )) {
                    col += 1;
                    row = 0;
                }
            }

        } else if ( this._currentSortMode == keno.GameModel.SORT_TYPE_3 ) {
            keno.SoundUtil.getInstance().playSound(keno.SoundUtil.ZOOM_OUT_SOUND);
//            SoundUtil.getInstance().playZoomOutTicketsSound();

            this._slideMaxCount = Math.floor ( ( this._holder.children.length - 1 ) / 12 );

            var row = 0;
            var col = 0;
            for (var i = 0; i < this._holder.children.length; i++)
            {
                var ticketView = this._holder.getChildAt(i);

                createjs.Tween.get(ticketView, {loop : false}).to({ x :  479 + (row * 265), y : 83 + (col * 235), scaleX : 0.34, scaleY : 0.32 }, 200);
//                Actuate.tween(ticketView, 0.5, { x :  479 + (row * 265), y : 83 + (col * 235), scaleX : 0.34, scaleY : 0.32 } );

                col += 1;
                if ( col >= 3) {
                    col = 0;
                    row += 1;
                }
            }
        }
    };

    p.setCheckedStateTotickets = function()
    {
        for (var i = 0; i < this._holder.children.length; i++)
        {
            var ticketView= this._holder.getChildAt(i);
            ticketView.isChecked = true;
        }
    };

    p._onControlButtonDowm = function( event)
    {

        var button = event.target;

        if ( button == this._leftControlButton ) {

            if ( this._slideCounter < 0 ) {
                this._slideCounter += 1;

                createjs.Tween.get(this._holder, {loop : false}).to({x : (this._slideCounter * 1036)}, 200);
                keno.SoundUtil.getInstance().playSound(keno.SoundUtil.ZOOM_OUT_SOUND);
//                Actuate.tween(holder, 0.5, { x : (this._slideCounter * 1036) } );
//                SoundUtil.getInstance().playZoomOutTicketsSound();
            }

        }else {

            if ( this._slideCounter > -( this._slideMaxCount ) ) {
                this._slideCounter -= 1;

                createjs.Tween.get(this._holder, {loop : false}).to({x : (this._slideCounter * 1036)}, 200);
                keno.SoundUtil.getInstance().playSound(keno.SoundUtil.ZOOM_OUT_SOUND);
//                Actuate.tween(holder, 0.5, { x : (this._slideCounter * 1036) } );
//                SoundUtil.getInstance().playZoomOutTicketsSound();

            }
        }

        keno.SoundUtil.getInstance().playSound(keno.SoundUtil.TICKET_SCROLL_BUTTON_SOUND);
        //        SoundUtil.getInstance().playTicketsScrollButtonSound();

    };

    p.newBall = function( ballNum ) {
        for (var i = 0; i < this._holder.children.length; i++) {
            var ticketView = this._holder.getChildAt(i);

            if (ticketView.isChecked == true) {
                ticketView.checkNum(ballNum, this._coefs);
            }
        }

        this._sortTicketsByWin(this._ticketViews);

        //TODO try setInterval later
        //setTimeout(this._onTicketSortTimeout.bind(this), 1000);
    //};
    //
    //p._onTicketSortTimeout = function(){

        //keno.SoundUtil.getInstance().playSound(keno.SoundUtil.ZOOM_OUT_SOUND);

        var row = 0;
        var col = 0;
        for (var i = 0; i < this._ticketViews.length; i++) {
            var ticketView = this._ticketViews[i];
            //ticketView.x = 481 + (row * 346);
            //ticketView.y = 83 + (col * 350);

            createjs.Tween.get(ticketView, {loop : false}).to({ x :  481 + (row * 346), y : 83 + (col * 350)}, 200);

            col += 1;
            if (col == 2) {
                row += 1;
                col = 0;
            }
        }
    };

    p._sortTicketsByWin = function(arr) {

        var temp = 0;
        for( var i = 0; i < arr.length; i++ )
        {
            var min = i;

            for( var j = i + 1; j < arr.length; j++ )
            {
                if( arr[j].winValue > arr[min].winValue )
                {
                    min = j;
                }
            }

            temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    };

    p.clearUnconfirmedTickets = function()
    {
        var i = this._holder.children.length - 1;
        while (i >= 0) {
            var ticketView = this._holder.getChildAt(i);
            if ( ticketView.isChecked == false ) {
                this._holder.removeChild( ticketView );
            }

            i--;
        }
    };

    p.clearTicketsNum = function()
    {
        for (var i = 0; i < this._holder.children.length; i++)
        {
            var ticketView = this._holder.getChildAt(i);
            ticketView.clearNums();
        }
    };

    p.clearWinState = function() {
        for (var i = 0; i < this._holder.children.length; i++)
        {
            var ticketView = this._holder.getChildAt(i);
            ticketView.clearWinState();
        }
    };


    p._createHolder = function()
    {
        if ( this._holder != null ) {
            this.removeChild(this._holder);
        }

        this._holder = new createjs.Container ();
        this._holder.cache = true;
        this._holder.mask = this._tableMask;
        this.addChild(this._holder);

    };

    p.clear = function()
    {
        this._createHolder();
        this._ticketViews = [];

        this._slideCounter = 0;
        this._slideMaxCount = 0;
    };

    keno.TicketTableView = TicketTableView;
})();