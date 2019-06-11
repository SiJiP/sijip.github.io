document.addEventListener('DOMContentLoaded', function (event) {
    //add data array for type
    let dataText = ["Are you looking a developer?", "So, here I am.", "I love to develop", "My name is Sergiy Petruniv!"];
    let txtArea = document.querySelector(".main-type-write");

    function typeWriter(txt, i, fnCallback) {
        if (i < txt.length) {
            txtArea.innerHTML = txt.substring(0, i + 1) + '<span class="caret-span" aria-hidden="true"></span>';

            setTimeout(function () {
                typeWriter(txt, i + 1, fnCallback)
            }, 120);

        } else if (typeof fnCallback === 'function') {
            setTimeout(fnCallback, 1500);
        }
    };

    function startTextAnimation(i){
        if(typeof dataText[i] == 'undefined'){
            setTimeout(function(){
                startTextAnimation(0);
            }, 10000)
        }

        if(i < dataText.length){

            typeWriter(dataText[i], 0, function(){

                startTextAnimation(i+1);
            });
        }
    }
    startTextAnimation(0);

})