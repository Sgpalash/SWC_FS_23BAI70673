let s = document.getElementById("S");
let ms = document.getElementById("ms");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

let seconds = 0;
let milliseconds = 0;

start.onclick = function() {
    let time = setInterval(stopwatch, 10);
    
    function stopwatch() {
        milliseconds++;
        if (milliseconds == 100) {
            seconds++;
            milliseconds = 0;
        }
        s.innerHTML = seconds + "s";
        ms.innerHTML = (milliseconds < 10 ? "0" : "") + milliseconds + "ms";
    
        stopBtn.onclick = function() {
            clearInterval(time);
        }
        
        resetBtn.onclick = function() {
            clearInterval(time);
            seconds = 0;
            milliseconds = 0;
            s.innerHTML = "0s";
            ms.innerHTML = "00ms";
        }
    }
}

    