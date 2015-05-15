/**
 * Created by am_urunov on 20.10.2014.
 */

this.keno = this.keno||{};

(function() {
    "use strict";
    var SoundUtil = function () {
        this.initialize();
    };

    //Наследуем
    var _instance = null;
    var p = SoundUtil.prototype;

    //private
    p._sounds = {};
    p._backgroundChannel = null;
    p._actionChannel = null;
    p._winChannel = null;

    p._soundLoadCounter = 0;
    p._completeCallback = null;

    //static
    SoundUtil.getInstance = function(){
        if (_instance == null){
            _instance = new keno.SoundUtil();
        }

        return _instance;
    };
    SoundUtil.TOTAL_SOUNDS_COUNT = 18;

    SoundUtil.GAME_INTRO_SOUND = 'gameIntroSound';
    SoundUtil.GAME_SOUND = 'gameSound';
    SoundUtil.ZOOM_IN_SOUND = 'zoomInTicketsSound';
    SoundUtil.ZOOM_OUT_SOUND = 'zoomOutTicketsSound';
    SoundUtil.TICKET_SCROLL_BUTTON_SOUND = 'ticketsScrollButtonSound';
    SoundUtil.TICKET_MODE_BUTTON_SOUND = 'ticketModeButtonSound';
    SoundUtil.RATING_250_SOUND = 'rating250Sound';
    SoundUtil.RATING_500_SOUND = 'rating500Sound';
    SoundUtil.RATING_1000_SOUND = 'rating1000Sound';
    SoundUtil.RATING_2000_SOUND = 'rating2000Sound';
    SoundUtil.RATING_3000_SOUND = 'rating3000Sound';
    SoundUtil.SELECTED_NUM_SOUND = 'selectNumSound';
    SoundUtil.START_GAME_COUNTING_SOUND = 'startGameCountingSound';
    SoundUtil.MISS_SOUND = 'missSound';
    SoundUtil.IS_COINCED_SOUND = 'isCoincedSound';
    SoundUtil.LOSE_SOUND = 'loseSound';
    SoundUtil.WIN_SOUND = 'winSound';
    SoundUtil.COINS_AND_SALUTE = 'coinsAndSalute';

    p.initialize = function () {
    }

    p.registrSounds = function(callBack)
    {
        this._completeCallback = callBack;

        createjs.Sound.addEventListener("fileload", this._onFileLoaded.bind(this)); // add an event listener for when load is completed
        createjs.Sound.registerSound('assets/sounds/intro_game_sound.ogg', SoundUtil.GAME_INTRO_SOUND);
        createjs.Sound.registerSound('assets/sounds/main_menu_sound.ogg', SoundUtil.GAME_SOUND);
        createjs.Sound.registerSound('assets/sounds/coins_and_salute.ogg', SoundUtil.COINS_AND_SALUTE);
        createjs.Sound.registerSound('assets/sounds/zoom_in_tickets_sound.ogg', SoundUtil.ZOOM_IN_SOUND);
        createjs.Sound.registerSound('assets/sounds/zoom_out_tickets_sounds.ogg', SoundUtil.ZOOM_OUT_SOUND);
        createjs.Sound.registerSound('assets/sounds/tickets_scroll_button_sound.ogg', SoundUtil.TICKET_SCROLL_BUTTON_SOUND);
        createjs.Sound.registerSound('assets/sounds/main_buttons_sound.ogg', SoundUtil.TICKET_MODE_BUTTON_SOUND);
        createjs.Sound.registerSound('assets/sounds/ratings_250.ogg', SoundUtil.RATING_250_SOUND);
        createjs.Sound.registerSound('assets/sounds/ratings_500.ogg', SoundUtil.RATING_500_SOUND);
        createjs.Sound.registerSound('assets/sounds/ratings_1000.ogg', SoundUtil.RATING_1000_SOUND);
        createjs.Sound.registerSound('assets/sounds/ratings_2000.ogg', SoundUtil.RATING_2000_SOUND);
        createjs.Sound.registerSound('assets/sounds/ratings_3000.ogg', SoundUtil.RATING_3000_SOUND);
        createjs.Sound.registerSound('assets/sounds/select_num_sound.ogg', SoundUtil.SELECTED_NUM_SOUND);
        createjs.Sound.registerSound('assets/sounds/start_game_after_play_button_press_sound.ogg', SoundUtil.START_GAME_COUNTING_SOUND);
        createjs.Sound.registerSound('assets/sounds/miss_sound.ogg', SoundUtil.MISS_SOUND);
        createjs.Sound.registerSound('assets/sounds/num_is_coincided_sound.ogg', SoundUtil.IS_COINCED_SOUND);
        createjs.Sound.registerSound('assets/sounds/lose_sound.ogg', SoundUtil.LOSE_SOUND);
        createjs.Sound.registerSound('assets/sounds/win_sound.ogg', SoundUtil.WIN_SOUND);
    };

    p._onFileLoaded = function(event) {
        this._sounds[event.id] = event.src;
        this._soundLoadCounter += 1;

        if (this._soundLoadCounter == SoundUtil.TOTAL_SOUNDS_COUNT){
            this._soundLoadCounter = 0;

            this._completeCallback();
        }
    };

    p.playMusic = function(id) {
        //this._backgroundChannel = createjs.Sound.play(id);
        //this._backgroundChannel.addEventListener('complete', this._onMusicComplete.bind(this));
    };

    p._onMusicComplete = function(event) {
        this._backgroundChannel = createjs.Sound.play(SoundUtil.GAME_SOUND);
        this._backgroundChannel.addEventListener('complete', this._onMusicComplete.bind(this));
    };

    p.playSound = function(id) {
        this._actionChannel = createjs.Sound.play(id);
    };

    p.playWinSound = function(){
        this._winChannel = createjs.Sound.play(keno.SoundUtil.COINS_AND_SALUTE);
    };

    p.stopWinSound = function(){
        createjs.Sound.stop();
        //this._winChannel.stop();
    }


    keno.SoundUtil = SoundUtil;
})();