/**
 *
 * @type {{register: {url: string}}}
 */
var config = {
    register: {
        url: "http://localhost:8080/api/register"
    }
};
/**
 *
 * @type {{network, utils}}
 */
var bizagi = (function () {
    return {
        network: {
            request: function (method, url, data) {
                return new Promise(function (resolve, reject) {
                    var xhr;
                    if (window.XMLHttpRequest) {
                        xhr = new XMLHttpRequest();
                    } else if (window.ActiveXObject) {
                        xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    xhr.open(method, url,true);

                    if(method == "post"){
                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    }

                    // Assign a handler for the response
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                var responseJson = JSON.parse(xhr.response);
                                resolve(responseJson);
                            } else {
                                reject(xhr.statusText);
                            }
                        }
                    };
                    // Actually send the request to the servers
                    xhr.send(data);
                });
            }
        },
        utils: {
            formSerialize: function (form) {
                var data = "";
                var elements = form.querySelectorAll("input");
                for (var i = 0, l = elements.length; i < l; i++) {
                    var element = elements[i];
                    if (element.name) {
                        data+= element.name +"="+ element.value +"&";
                    }
                }
                return data;
            }
        }
    }
})();

/**
 * File inputs controller
 */
(function () {
    var form = document.querySelector(".bz-form");
    var submit = document.querySelector("[name=submit]");
    var message = document.getElementsByClassName("bz-message");

    var register = function (e) {
        e.preventDefault();
        var formData = bizagi.utils.formSerialize(form);
        var responseSection = document.getElementsByClassName("response-section");
        message[0].innerHTML="";
        message[0].style.visibility = "visible";


        bizagi.network.request("post", config.register.url, formData).then(function (response) {
            responseSection[0].style.visibility = "visible";
            if(response.status == "ok"){
                form.reset();
                message[0].innerHTML = "<div class='bz-message--blink'>"+response.message+"</div>";
            }else if(response.status == "error"){
                message[0].innerHTML = "<div class='bz-message--blink'>"+response.message+"</div>";
            }
        });
    };

    if (form.addEventListener) {
        form.addEventListener("submit", register, false);  //Modern browsers
    } else if (form.attachEvent) {
        form.attachEvent('onsubmit', register);            //Old IE
    }
})();


function checkStatus() {
    return;

    // TODO: Finish this function
    /*var qs = getQueryString();
     var actions= {
     "200":{
     message:""
     }
     };
     var message= "";
     var buttonDisplay = "";
     if(qs.status == 200){
     var mainSection = document.getElementsByClassName("main-section");
     var responseSection = document.getElementsByClassName("response-section");

     mainSection[0].style.visibility = "hidden";
     responseSection[0].style.visibility = "visible";

     message = "Thank you, all your data has been saved!";
     buttonDisplay = "Come Back!";
     }else{
     message = "Something went wrong, please check your information and try again";
     buttonDisplay = "Verify my information";
     window.history.back();
     }*/
}


/**
 * Particles Plugin
 */
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 8
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.005,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 20,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 10,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});
