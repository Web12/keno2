/**
 * Created by USER on 21.09.2014.
 */


this.keno = this.keno||{};

(function() {
    "use strict";
    var GameUtil = function () {
        this.initialize();
    };

    //Наследуем
    var p = GameUtil.prototype;
    p.initialize = function () {

    };

    GameUtil.stringToTimeFormat = function ( value ) {
        return (value.length > 1) ? value : "0" + value;
    }

    GameUtil.shuffle = function (arr)
    {
        var i  = arr.length;

        while ( i > 1 ) {
            var j = Math.floor(Math.random() * i);
            var tmp = arr[ j ];
            arr[ j ] = arr[ i - 1 ];
            arr[ i - 1 ] = tmp;

            i--;
        }

        return arr;
    };

    GameUtil.devideSum = function(str) {

        var devide = str.split(".");
        str = devide[0];

        var resultStr = "";
        var devidedArray = [];

        var lastIndex = str.length;

        var i = str.length - 3;
        while (i >= 0 ) {
            devidedArray.push(str.substring(i, lastIndex));
            lastIndex = i;
            i -= 3;
        }

        devidedArray.push(str.substring(0, lastIndex));


        i = devidedArray.length - 1;
        while (i >= 0 ) {
            resultStr += devidedArray[i] + " ";
            i -= 1;
        }

        resultStr = resultStr.substr(0, resultStr.length - 1);
        resultStr += (devide[1] == null) ? "" : "." + devide[1];

        return resultStr;
    }

    keno.GameUtil = GameUtil;
})();