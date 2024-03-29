const setting_page = document.getElementById("setting");
const time_text = document.getElementById("realtime");
const vid = document.getElementById("vid");
const stopwatch_panel = document.getElementById("stopwatch-panel");
const timer_panel = document.getElementById("timer-panel");
const stopwatch_lap = document.getElementById("stopwatch-lap");
const stopwatch_mode_button = document.getElementById("stopwatch-mode-button");
const clock_mode_button = document.getElementById("clock-mode-button");
const timer_mode_button = document.getElementById("timer-mode-button");
const timer_set_panel = document.getElementById("timer-set");
const timer_progress = document.getElementById("progress");
const animationNames = [
   "top-anim",
   "colorful",
   "str1",
   "str2",
   "str3",
   "str4",
   "grad",
   "grad",
   "grad",
   "grad",
   "grad",
   "bot-cir1",
   "bot-right",
   "bot-cir2",
   "wave",
   "top-stripe",
   "left-str",
   "right-str",
   "movebar",
];
let mode = 0;
let isSetting = 0;
let isDarkmode = 0;
let isClock = 0;
let stopwatch_time = 0;
let cachetime = 0;
let isStopwatch = 0;
let isStopwatchRan = 0;
let cacheLap = 0;
let isWaitResetStop = 0;
let isTimer = 0;
let isTimerRan = 0;
let isTimerFlick = 0;
let TimerTime = 0;
let timerCache = 0;
let timerProgress = 0;
let h = 0;
let m = 0;
let s = 0;
let ms = 0;
let deviceOrien = 0;
let clock_timerout;
let stopwatch_timeout;
let timer_timeout;
let timer_flick_timeout;
let timer_progress_timeout;
let currentTime;
let lapTime = [];
let cacheLapText = "";
let timerText = "";
let timerText_disp = "";
let outtime = new Date();

function init() {
   clock_mode_button.style.display = `none`;
   stopwatch_mode_button.style.display = `flex`;
   timer_mode_button.style.display = `flex`;
   (window.innerHeight > window.innerWidth) ? deviceOrien = 0 : deviceOrien = 1;
   clock_mode();
   setting_mode();
}

function darkmode() {
   if (isDarkmode == 0) {
      document.body.style.backgroundColor = "#252525";
      document.body.style.setProperty("--main-bg-color", "rgba(0, 0, 0, 0.8)");
      document.body.style.setProperty("--main-border-color", "#999");
      document.body.style.setProperty("--main-text-color", "#ccc");
      document.body.style.setProperty("--main-boxShadow","0 0 5vh rgba(100, 100, 100, 0.6)");
      document.body.style.setProperty("--sub-border-color", "#666");
      document.body.style.setProperty("--laps-bg-color","rgba(10, 10, 10, 0.8)");
      document.getElementById("dark-mode-button").firstElementChild.firstElementChild.innerHTML = `wb_sunny`;
      document.getElementById("dark-mode-button").lastElementChild.innerHTML = `Light Mode`;
      isDarkmode = 1;
   } else if (isDarkmode == 1) {
      document.body.style.backgroundColor = "#fff";
      document.body.style.setProperty("--main-bg-color","rgba(250, 250, 250, 0.6)");
      document.body.style.setProperty("--main-border-color", "#333");
      document.body.style.setProperty("--main-text-color", "#252525");
      document.body.style.setProperty("--main-boxShadow","0 0 5vh rgba(0, 0, 0, 0.6)");
      document.body.style.setProperty("--sub-border-color", "#999");
      document.body.style.setProperty("--laps-bg-color","rgba(230, 230, 230, 0.8)");
      document.getElementById("dark-mode-button").firstElementChild.firstElementChild.innerHTML = `dark_mode`;
      document.getElementById("dark-mode-button").lastElementChild.innerHTML = `Dark Mode`;
      isDarkmode = 0;
   }
   setting_mode();
}


function setting_mode() {
   isSetting == 0
      ? (setting_page.style.opacity = 1)
      : (setting_page.style.opacity = 0);
   isSetting == 0
      ? (setting_page.style.pointerEvents = `auto`)
      : (setting_page.style.pointerEvents = `none`);
   isSetting == 0 ? (isSetting = 1) : (isSetting = 0);
}

function clock_mode() {
   mode = 0;
   isStopwatch = 0;
   isStopwatchRan = 0;
   isTimer = 0;
   isTimerRan = 0;
   if (timerProgress != 0) timer_progress_end();
   clearTimeout(stopwatch_timeout);
   clearTimeout(timer_timeout);
   clearTimeout(timer_flick_timeout);
   clock_mode_button.style.display = `none`;
   stopwatch_mode_button.style.display = `flex`;
   timer_mode_button.style.display = `flex`;
   document.getElementById("stopwatch-lap").style.opacity = `0`;
   document.getElementById("stopwatch-lap").style.pointerEvents = `none`;
   (deviceOrien == 0) ? stopwatch_panel.style.bottom = `-10%` : stopwatch_panel.style.right = `-10%`;
   (deviceOrien == 0) ? timer_panel.style.bottom = `-10%` : timer_panel.style.right = `-10%`;
   setting_mode();
   timer_progress_end();
   timer_set(11);
   animPlay(2);
   clock_load_time();
}

function clock_load_time() {
   time_text.innerHTML = 
   `${String(new Date().getHours()).padStart(2, "0"
   )}:${String(new Date().getMinutes()).padStart(2, "0"
   )}:${String(new Date().getSeconds()).padStart(2, "0")}`;
   clock_timerout = setTimeout(clock_load_time, 500);
}

function stop_mode() {
   mode = 1;
   if (isStopwatchRan == 0) {
      setting_mode();
      clock_mode_button.style.display = `flex`;
      stopwatch_mode_button.style.display = `none`;
      timer_mode_button.style.display = `flex`;
   }
   stopwatch_time = 0;
   isStopwatch = 0;
   isStopwatchRan = 0;
   isTimer = 0;
   isTimerRan = 0;
   cachetime = 0;
   cacheLap = 0;
   if (lapTime.length == 0) isWaitResetStop = 0;
   if (timerProgress != 0) timer_progress_end();
   clearTimeout(clock_timerout);
   clearTimeout(timer_timeout);
   clearTimeout(timer_flick_timeout);
   for (let i = 0; i < lapTime.length; i++) {
      document.getElementsByClassName("laps")[i].style.bottom = "100%";
   }
   lapTime = [];
   (deviceOrien == 0) ? stopwatch_panel.style.bottom = `3%` : stopwatch_panel.style.right = `3%`;
   (deviceOrien == 0) ? timer_panel.style.bottom = "-10%" : timer_panel.style.right = `-10%`;
   document.getElementById("stopwatch-lap").style.opacity = `1`;
   document.getElementById("stopwatch-lap").style.pointerEvents = `auto`;
   document.getElementById("stopwatch-right-text").innerHTML = `Start`;
   document.getElementById("stopwatch-right-text").style.color = `#582c9e`;
   document.getElementById("stopwatch-right-button").style.background = 
   `linear-gradient(
      135deg,
      rgba(112, 112, 228, 1) 4%,
      rgba(164, 123, 244, 1) 34%,
      rgba(200, 130, 255, 1) 100%
   )`;
   document.getElementById("stopwatch-left-button").style.transition = `0.3s cubic-bezier(.58,-1.18,.84,.82)`;
   (deviceOrien == 0) ? document.getElementById("stopwatch-left-button").style.bottom = `-150%` : document.getElementById("stopwatch-left-button").style.right = `-150%`;
   timer_set(11);
   time_text.innerHTML = `0:00.00`;
   animPlay(0);
}

function stopwatch_right() {
   if (isStopwatch == 0) {
      startTime = Date.now();
      document.getElementById("stopwatch-right-text").innerHTML = `Stop`;
      document.getElementById("stopwatch-right-text").style.color = `#ff8282`;
      document.getElementById("stopwatch-right-button"
      ).style.background = `#771818`;
      stopwatch_load_time();
      if (isStopwatchRan == 1) {
         document.getElementById("stopwatch-left-text").innerHTML = `Lap`;
      }
      if (isWaitResetStop == 0) {document.getElementById("stopwatch-left-button").style.transition = `0.3s cubic-bezier(0.34, 1.8, 0.64, 1)`;
         (deviceOrien == 0) ? document.getElementById("stopwatch-left-button").style.bottom = `0%` : document.getElementById("stopwatch-left-button").style.right = `0%`;
         document.getElementById("stopwatch-left-text").innerHTML = `Lap`;
         isWaitResetStop = 1;
         animPlay(2);
      } else {
         animPlay(1);
      }
   } else if (isStopwatch == 1) {
      cachetime += Date.now() - startTime;
      document.getElementById("stopwatch-right-text").innerHTML = `Start`;
      document.getElementById("stopwatch-right-text").style.color = `#582c9e`;
      document.getElementById("stopwatch-right-button").style.background = 
      `linear-gradient(
         135deg,
         rgba(112, 112, 228, 1) 4%,
         rgba(164, 123, 244, 1) 34%,
         rgba(200, 130, 255, 1) 100%
      )`;
      animPlay(0);
      clearTimeout(stopwatch_timeout);
      if (isStopwatchRan == 1) {
         document.getElementById("stopwatch-left-text").innerHTML = `Reset`;
      }
   }
   if (isStopwatchRan == 0) isStopwatchRan = 1;
   isStopwatch == 0 ? (isStopwatch = 1) : (isStopwatch = 0);
}

function stopwatch_left() {
   if (isStopwatchRan == 0) {
      return;
   } else if (isStopwatchRan == 1) {
      if (isStopwatch == 0) {
         stop_mode();
      } else if (isStopwatch == 1) {
         lapTime.push(`${h}:${m}:${s}`);
         let showLap;
         showLap = `${m}:${s}.${ms}`;
         cacheLapText = 
         `${String(new Date(currentTime - cacheLap).getMinutes()
         )}:${String(new Date(currentTime - cacheLap).getSeconds()).padStart(2,"0"
         )}.${String(new Date(currentTime - cacheLap).getMilliseconds()).slice(0, -1).padStart(2, "0")}`;
         if (h > 0) {
            showLap = `${h}:${m}:${s}`;
            cacheLapText = 
            `${String(new Date(currentTime - cacheLap).getHours() - 9
            )}:${String(new Date(currentTime - cacheLap).getMinutes()).padStart(2,"0"
            )}:${String(new Date(currentTime - cacheLap).getSeconds()).padStart(2,"0")}`;
         }
         stopwatch_lap.innerHTML += `
         <div class="laps" id="laps">
            <p class="lap-Num">Lap ${lapTime.length}</p>
            <p class="lap-Time">${cacheLapText}</p>
            <p class="lap-Time">${showLap}</p>
         </div>`;
         stopwatch_lap.scrollTop = stopwatch_lap.scrollHeight;
         cacheLap = currentTime;
      }
   }
}

function stopwatch_load_time() {
   currentTime = new Date(Date.now() - startTime + cachetime);
   h = String(currentTime.getHours() - 9);
   m = String(currentTime.getMinutes());
   s = String(currentTime.getSeconds()).padStart(2, "0");
   ms = String(currentTime.getMilliseconds()).slice(0, -1).padStart(2, "0");
   time_text.innerHTML = `${m}:${s}.${ms}`;
   if (h > 0) {
      m = String(currentTime.getMinutes()).padStart(2, "0");
      time_text.innerHTML = `${h}:${m}:${s}`;
   }
   stopwatch_timeout = setTimeout(stopwatch_load_time, 10);
}

function timer_mode() {
   mode = 2;
   isStopwatch = 0;
   isStopwatchRan = 0;
   timerText = "000000";
   timerText_disp = "000000";
   if (isTimerRan == 0) {
      setting_mode();
      clock_mode_button.style.display = `flex`;
      stopwatch_mode_button.style.display = `flex`;
      timer_mode_button.style.display = `none`;
   }
   (deviceOrien == 0) ? stopwatch_panel.style.bottom = `-10%` : stopwatch_panel.style.right = `-10%`;
   (deviceOrien == 0) ? timer_panel.style.bottom = "3%" : timer_panel.style.right = `3%`;
   time_text.innerHTML = `0:00:00`;
   clearTimeout(clock_timerout);
   clearTimeout(stopwatch_timeout);
   document.getElementById("stopwatch-lap").style.opacity = `0`;
   document.getElementById("stopwatch-lap").style.pointerEvents = `none`;
   timer_progress_start();
   animPlay(0);
   timer_left();
}

function timer_progress_start() {
   timerProgress++;
   timer_progress.style.backgroundImage = `conic-gradient(#9c7af2 0% ${timerProgress}%, rgba(0, 0, 0, 0) ${timerProgress}% 100%)`;
   if (timerProgress < 100) {
      timer_progress_timeout = setTimeout(timer_progress_start, 5);
   }
}

function timer_progress_end() {
   timerProgress--;
   timer_progress.style.backgroundImage = `conic-gradient(#9c7af2 0% ${timerProgress}%, rgba(0, 0, 0, 0) ${timerProgress}% 100%)`;
   if (timerProgress > 0) {
      timer_progress_timeout = setTimeout(timer_progress_end, 5);
   }
}

function timer_left() {
   clearTimeout(timer_flick_timeout);
   clearTimeout(timer_timeout);
   currentTime = 0;
   outtime = 0;
   timerCache = 0;
   isTimerRan = 0;
   isTimer = 0;
   time_text.innerHTML = `0:00.00`;
   timer_progress_start();
   document.getElementById("timer-right-text").innerHTML = `Start`;
   document.getElementById("timer-right-text").style.color = `#582c9e`;
   document.getElementById("timer-right-button").style.background = 
   `linear-gradient(
      135deg,
      rgba(112, 112, 228, 1) 4%,
      rgba(164, 123, 244, 1) 34%,
      rgba(200, 130, 255, 1) 100%
   )`;
   document.getElementById("timer-left-text").innerHTML = `Cancel`;
   document.getElementById("panel-button-div-centre").style.transition = `0.3s cubic-bezier(0.34, 1.8, 0.64, 1)`;
   (deviceOrien == 0) ? document.getElementById("panel-button-div-centre").style.bottom = `0` : document.getElementById("panel-button-div-centre").style.right = `0`
   document.getElementById("timer-left-button").style.transition = `0.3s cubic-bezier(.58,-1.18,.84,.82)`;
   (deviceOrien == 0) ? document.getElementById("timer-left-button").style.bottom = `-150%` : document.getElementById("timer-left-button").style.right = `-150%`;
   animPlay(0);
   timer_set_disp();
   timer_set(11);
}

function timer_centre() {
   timer_set_panel.style.opacity = `1`;
   timer_set_panel.style.filter = `none`;
   timer_set_panel.style.pointerEvents = `auto`;
   document.getElementById("timer-panel").style.pointerEvents = `none`;
   timerText_disp = timerText;
   timer_set_disp();
}

function timer_right() {
   if (TimerTime > 0) {
      if (timerCache <= 0 && isTimer == 0) {
         document.getElementById("panel-button-div-centre").style.transition = `0.3s cubic-bezier(.58,-1.18,.84,.82)`;
         (deviceOrien == 0) ? document.getElementById("panel-button-div-centre").style.bottom = `-150%` : document.getElementById("panel-button-div-centre").style.right = `-150%`;
         document.getElementById("timer-left-button").style.transition = `0.3s cubic-bezier(0.34, 1.8, 0.64, 1)`;
         (deviceOrien == 0) ? document.getElementById("timer-left-button").style.bottom = `0` : document.getElementById("timer-left-button").style.right = `0`;
         animPlay(2);
      }
      outtime = new Date(TimerTime * 1000);
      if (timerCache > 0) {
         outtime = new Date(timerCache * 10);
      }
      outtime = new Date(outtime.getTime() + Date.now());
      if (isTimer == 0) {
         document.getElementById("timer-right-text").innerHTML = `Stop`;
         document.getElementById("timer-right-text").style.color = `#ff8282`;
         document.getElementById("timer-right-button").style.background = `#771818`;
         animPlay(1);
         timer_load_time();
      } else if (isTimer == 1) {
         document.getElementById("timer-right-text").innerHTML = `Start`;
         document.getElementById("timer-right-text").style.color = `#582c9e`;
         document.getElementById("timer-right-button").style.background = 
         `linear-gradient(
            135deg,
            rgba(112, 112, 228, 1) 4%,
            rgba(164, 123, 244, 1) 34%,
            rgba(200, 130, 255, 1) 100%
         )`;
         animPlay(0);
         clearTimeout(timer_timeout);
         timerCache = currentTime;
      }
   }
   isTimerRan = 1;
   isTimer == 0 ? (isTimer = 1) : (isTimer = 0);
}

function timer_set(num) {
   if (num < 10) {
      timerText_disp += num;
      timer_set_disp();
   } else if (num > 9) {
      switch (num) {
         case 10:
            timer_set_panel.style.opacity = `0`;
            timer_set_panel.style.filter = `blur(20vh)`;
            timer_set_panel.style.pointerEvents = `none`;
            document.getElementById("timer-panel").style.pointerEvents = `auto`;
            break;
         case 11:
            timer_set_panel.style.opacity = `0`;
            timer_set_panel.style.filter = `blur(20vh)`;
            timer_set_panel.style.pointerEvents = `none`;
            document.getElementById("timer-panel").style.pointerEvents = `auto`;
            timerText = timerText_disp;
            timer_set_disp();
            time_text.innerHTML = 
            `${String(Math.floor(TimerTime / 3600)
            )}:${String(Math.floor((TimerTime % 3600) / 60)).padStart(2,"0"
            )}:${String(TimerTime % 60).padStart(2, "0")}`;
            return;
         case 12:
            timerText_disp = timerText_disp.slice(0, 5);
            timerText_disp = timerText_disp.padStart(6, "0");
            timer_set_disp();
            break;
         default:
            break;
      }
   }
   isTimer = 0;
}

function timer_set_disp() {
   timerText = timerText.slice(-6);
   timerText_disp = timerText_disp.slice(-6);
   document.getElementById("timer-set-text").innerHTML = 
   `${timerText_disp.slice(0, 2)}:${timerText_disp.slice(2,4)}:${timerText_disp.slice(4, 6)}`;
   TimerTime =
      Number(timerText.slice(0, 2) * 3600) +
      Number(timerText.slice(2, 4) * 60) +
      Number(timerText.slice(4, 6));
}

function timer_load_time() {
   currentTime = Math.floor(new Date(outtime - Date.now()) / 10);
   if (currentTime <= 0) {
      timer_stop();
      return;
   }
   let timer_time_str =
      String(Math.floor(currentTime / 360000)) +
      String("0" + String(Math.floor((currentTime % 360000) / 6000))).slice(-2) +
      String("0" + String(Math.floor((currentTime % 6000) / 100))).slice(-2) +
      String("0" + String(currentTime % 100)).slice(-2);
   let timerH = String(timer_time_str).slice(0, -6);
   let timerM = String(timer_time_str).slice(-6, -4);
   let timerS = String(timer_time_str).slice(-4, -2);
   let timerMS = String(timer_time_str).slice(-2);
   if (timerM.slice(0, 1) == "0") {
      timerM = timerM.slice(1, 2);
   }
   time_text.innerHTML = `${timerM}:${timerS}.${timerMS}`;
   if (timerH > 0) {
      time_text.innerHTML = `${timerH}:${timerM}:${timerS}`;
   }
   timerProgress = currentTime / TimerTime;
   timer_progress.style.backgroundImage = `conic-gradient(#9c7af2 0% ${timerProgress}%, rgba(0, 0, 0, 0) ${timerProgress}% 100%)`;
   timer_timeout = setTimeout(timer_load_time, 10);
}

function timer_stop() {
   time_text.innerHTML = `0:00.00`;
   timer_progress.style.backgroundImage = `conic-gradient(#9c7af2 0% 0%, rgba(0, 0, 0, 0) 0% 100%)`;
   document.getElementById("timer-left-text").innerHTML = `Reset`;
   clearTimeout(timer_timeout);
   timer_over_flick();
   animPlay(0);
   TimerTime = 0;
   isTimer = 0;
   timerProgress = 0;
}

function timer_over_flick() {
   switch (isTimerFlick) {
      case 0:
         isTimerFlick = 1;
         time_text.innerHTML = ``;
         break;
      case 1:
         isTimerFlick = 0;
         time_text.innerHTML = `0:00.00`;
         break;
   }
   timer_flick_timeout = setTimeout(timer_over_flick, 350);
}

function animPlay(mode) {
   switch (mode) {
      case 0:
         for (let i = 0; i < 19; i++) {
            document.getElementsByClassName("clock-anim")[i].style.animationPlayState = "paused";
         }
         break;
      case 1:
         for (let i = 0; i < 19; i++) {
            document.getElementsByClassName("clock-anim")[i].style.animationPlayState = "running";
         }
         break;
      case 2:
         for (let i = 0; i < 19; i++) {
            document.getElementsByClassName("clock-anim")[i].style.animationName = "none";
            window.requestAnimationFrame((time1) => {
               document.getElementsByClassName("clock-anim")[i].style.animationName = animationNames[i];
               document.getElementsByClassName("clock-anim")[i].style.animationPlayState = "running";
            });
         }
         break;
   }
}

document.getElementById("main").addEventListener("click", () => {
   if (mode == 2 && isSetting == 0) timer_set(10);
   if (isSetting == 1) setting_mode();
});

window.addEventListener("orientationchange", function () {
   (window.innerHeight > window.innerWidth) ? deviceOrien = 1 : deviceOrien = 0;
   if (mode == 0) {
      (deviceOrien == 0) ? stopwatch_panel.style.bottom = `-10%` : stopwatch_panel.style.right = `-10%`;
      (deviceOrien == 0) ? timer_panel.style.bottom = `-10%` : timer_panel.style.right = `-10%`;
   }
   else if (mode == 1) {
      if (isStopwatchRan == 0) {
         (deviceOrien == 0) ? stopwatch_panel.style.bottom = `3%` : stopwatch_panel.style.right = `3%`;
         (deviceOrien == 0) ? timer_panel.style.bottom = "-10%" : timer_panel.style.right = `-10%`;
         (deviceOrien == 0) ? document.getElementById("stopwatch-left-button").style.bottom = `-150%` : document.getElementById("stopwatch-left-button").style.right = `-150%`;
         (deviceOrien == 0) ? document.getElementById("stopwatch-left-button").style.right = `0%` : document.getElementById("stopwatch-left-button").style.bottom = `0%`;
      }
      if (isStopwatchRan == 1) {
         document.getElementById("stopwatch-left-button").style.bottom = `0%`;
         document.getElementById("stopwatch-left-button").style.right = `0%`;
         (deviceOrien == 0) ? stopwatch_panel.style.bottom = `3%` : stopwatch_panel.style.right = `3%`;
      }
   }
   else if (mode == 2) {
      (deviceOrien == 0) ? stopwatch_panel.style.bottom = `-10%` : stopwatch_panel.style.right = `-10%`;
      (deviceOrien == 0) ? timer_panel.style.bottom = "3%" : timer_panel.style.right = `3%`;
      if (isTimerRan == 0) {
         (deviceOrien == 0) ? document.getElementById("timer-left-button").style.bottom = `-150%` : document.getElementById("timer-left-button").style.right = `-150%`;
         (deviceOrien == 0) ? document.getElementById("timer-left-button").style.right = `0%` : document.getElementById("timer-left-button").style.bottom = `0%`;
      }
      if (isTimerRan == 1) {
         document.getElementById("timer-left-button").style.bottom = `0%`;
         document.getElementById("timer-left-button").style.right = `0%`;
      }
   }
}, false);



stopwatch_lap.addEventListener("transitionend", () => {
   if (isStopwatchRan == 0 && isWaitResetStop == 1) {
      stopwatch_lap.innerHTML = ``;
      isWaitResetStop = 0;
   }
   stopwatch_lap.scrollTop = stopwatch_lap.scrollHeight;
});
stopwatch_lap.addEventListener("webkitTransitionend", () => {
   if (isStopwatchRan == 0 && isWaitResetStop == 1) {
      stopwatch_lap.innerHTML = ``;
      isWaitResetStop = 0;
   }
   stopwatch_lap.scrollTop = stopwatch_lap.scrollHeight;
});