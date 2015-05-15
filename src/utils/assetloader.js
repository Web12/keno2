/**
 * Created by USER on 20.09.2014.
 */

this.keno = this.keno||{};
(function() {

    var _callbacks = null;
    var _assets = null;
    var _currentAssetCount = 0;
    var _totalAssetsCount = 0;

    "use strict";
    var AssetLoader = function () {
        this.initialize();
    };

    //Наследуем
    var p = AssetLoader.prototype;

    /**
     * Конструктор.
     */
    p.initialize = function () {

    };

    AssetLoader.init = function () {
        _callbacks = {};
        _assets = {};
        _currentAssetCount = 0;
        _totalAssetsCount = 0;
    }

    AssetLoader.addFileLoadedCallback = function(callback){
        _callbacks["fileLoaded"] = callback;
    };

    AssetLoader.addAllFilesLoadedCallback = function(callback){
        _callbacks["allFilesLoaded"] = callback;
    };

    AssetLoader.loadAll = function( manifest ) {

        _totalAssetsCount = manifest.length;
        for(var i = 0; i < _totalAssetsCount; i++) {
            var item = manifest[i];

            var image = new Image();
            image.src = item.src;
            image.id = item.id;
            image.onload = _onImageLoad;
        }
    };

    _onImageLoad = function( event ) {
        AssetLoader.addAsset(event.target, event.target.id);

        _currentAssetCount++;

        _callbacks["fileLoaded"].call();
        if (_currentAssetCount == _totalAssetsCount) {
            _callbacks["allFilesLoaded"].call();
        }
    };

    AssetLoader.addAsset = function ( asset, assetId ) {
        _assets[assetId] = asset;
    };

    AssetLoader.getAsset = function (assetId) {
        return _assets[assetId];
    };

    AssetLoader.removeAsset = function( assetId ) {
        delete _assets[assetId];
    };

    keno.AssetLoader = AssetLoader;
})();