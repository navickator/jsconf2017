/**
 * Raffle library for JSConf Colombia 2017
 *
 * @type {Function}
 * @author Edward J Morales
 */
var BizagiJSConfRaffle = (function (options) {
    var self = this;
    self.properties = {
        names: [],
        callBack: {
            tickCallBack: new Function(),
            winnerCallBack: new Function()
        },
        engine: {
            speed: 10, // names/second
            duration: 5000 // Milliseconds
        }
    };

    options = options || {};

    self.properties = $.extend(self.properties, options);


    /**
     * Randomize array
     * @param array
     * @return {*}
     * @private
     */
    var _shuffleArray = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    var _getShuffleNames = function () {
        return _shuffleArray(self.properties.names);
    };


    var _engine = (function (options) {
        options = options || {timeInterval: 100, names: [], duration: 5000};
        var nameIndex = 0;
        var accelerationInterval = 200; // (options.timeInterval * (100/(options.duration/1000))/100);
        var winner = "";

        var _setOptions = function (newOptions) {
            options = $.extend(options, newOptions);
        };

        /*
         var counter = 10;
         var myFunction = function(){
         clearInterval(interval);
         counter *= 10;
         interval = setInterval(myFunction, counter);
         }
         var interval = setInterval(myFunction, counter);
         */

        var _start = function () {
            var tickFunction = function () {
                winner = options.names[nameIndex].name;
                self.properties.callBack.tickCallBack(winner);
                nameIndex = ( (nameIndex + 1) == options.names.length) ? 0 : nameIndex + 1;
                console.log(options.timeInterval);
            };

            var tickInterval = window.setInterval(tickFunction, options.timeInterval);

            // Reduce speed
            var speedInterval = window.setInterval(function () {
                _setOptions({timeInterval: options.timeInterval + accelerationInterval});
                //clearInterval(tickInterval);
                //tickInterval = window.setInterval(tickFunction, options.timeInterval);
            }, 100);

            window.setTimeout(function () {
                window.clearInterval(tickInterval);
                window.clearInterval(speedInterval);
                self.properties.callBack.winnerCallBack(winner);
            }, self.properties.engine.duration);

        };

        return {
            start: _start,
            options: _setOptions
        }

    });

    var _start = function () {
        var timeInterval = 1000 / self.properties.engine.speed;
        var randomizedNames = _getShuffleNames();
        var engine = new _engine({
            timeInterval: timeInterval,
            duration: self.properties.engine.duration,
            names: randomizedNames
        });

        engine.start();
        console.log("starting", randomizedNames)
    };


    return {
        "start": _start
    }
});


$(document).ready(function () {
    var attemptsValue;
    var attempts = 0;
    var getNames = function () {
        //return $.get("js/raffle.json");
        return $.get("http://localhost:8080/api/registration").pipe(function(data){
            return data.message;
        });
    };

    var tickCallBack = function (name) {
        console.log(name);
        $(".main-section").empty();
        $(".main-section").append("<h1>" + name + "</h1>");

    };

    var winnerCallBack = function (name) {
        var message = "Congratulations "+ name +", please stand up ";
        attempts++;
        console.log("WINNER", name);
        $(".main-section h1").addClass("winner");


        if (attempts == attemptsValue) {
            speechMessage(message);
            $("body").append("<div class='fireworks'><div class='before'></div><div class='after'></div></div>");
        }
    };

    var speechMessage = function(message){
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[2];
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 2; //0 to 2
        msg.text = message;
        msg.lang = 'en-US';

        msg.onend = function(e) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };

        speechSynthesis.speak(msg);
    };

    $.when(getNames()).done(function (names) {
        var options = {
            names: names || [],
            engine: {
                speed: 10,
                duration: 10000
            },
            callBack: {
                tickCallBack: tickCallBack,
                winnerCallBack: winnerCallBack
            }
        };
        var bizagiRaffle = new BizagiJSConfRaffle(options);

        $("[name='bz-lottery-start']").on("click", function () {
            attemptsValue = $("[name='bz-control-attempts']").val() || 1;
            bizagiRaffle.start();
        });
    });
});

