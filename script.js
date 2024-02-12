var play = document.querySelector("#play");
var backward = document.querySelector("#backward");
var forward = document.querySelector("#forward");
// ==========Array of objs contain music list=======
var songs = [
  {
    name: "Bol Do Na Zara",
    url: "./songs/BOL DO NA ZARA.mp3",
    img: "./images/Bol-Do-Na-Zara.jpg",
    duration: "4.04",
  },
  {
    name: "Hua Hain Aaj Pehli Baar",
    url: "./songs/Hua-Hain-Aaj-Pehli-Baar.mp3",
    img: "./images/Hua-Hain-Aaj-Pehli-Baar.jpg",
    duration: "4.07",
  },
  {
    name: "Sanam teri kasam",
    url: "./songs/sanam-teri-kasam.mp3",
    img: "./images/sanam-teri-kasam.jpg",
    duration: "5.14",
  },
  {
    name: "Kuch to hai",
    url: "./songs/kuch to hai.mp3",
    img: "./images/kuch to hai.jpg",
    duration: "4.08",
  },
  {
    name: "Kaun tujhe",
    url: "./songs/kaun tujhe.mp3",
    img: "./images/kaun tujhe.jpg",
    duration: "4.01",
  },
  {
    name: "Arjan Vailly Ne",
    url: "./songs/Arjan Vailly Ne.mp3",
    img: "./images/animal.jpg",
    duration: "3:02",
  },
  {
    name: "Jale 2",
    url: "./songs/Jale 2.mp3",
    img: "./images/jale.jpg",
    duration: "2.39",
  },
  {
    name: "ram",
    url: "./songs/Pehle Bhi Main.mp3",
    img: "./images/ram.jpg",
    duration: "4.10",
  },
];

var audio = new Audio(); //to play audio

var selectedsong = 0;

// ========== play, pause, forward and backward ↙️============
var flag = false;
play.addEventListener("click", () => {
  flag = !flag;
  if (flag) {
    play.innerHTML = `<i class="ri-pause-fill"></i>`;
    audio.play();
  } else {
    play.innerHTML = `<i class="ri-play-fill"></i>`;
    audio.pause();
  }
});
forward.addEventListener("click", () => {
  selectedsong++;
  if (selectedsong >= songs.length) {
    selectedsong = 0;
  }
  musicplay(selectedsong);
});
backward.addEventListener("click", () => {
  selectedsong--;
  if (selectedsong < 0) {
    selectedsong = songs.length - 1;
  }
  musicplay(selectedsong);
});
// ========== play, pause, forward and backward End ↖️============

// ========== to show the list of songs ↙️ ============
function mainlistshow() {
  var output = "";
  songs.forEach((el, idx) => {
    output += `<li class="song-card" id=${idx}>
        <div class="part1">
            <img src="${el.img}" alt="">
        <h2>${el.name}</h2>
        </div>
        <h3><span><i class="ri-timer-2-line"></i></span>${el.duration}</h3>
    </li>`;
  });
  document.getElementById("allsongs").innerHTML = output;
  document.getElementById("left-img").src = songs[selectedsong].img;
  document.getElementById("dname").textContent = songs[selectedsong].name;
  audio.src = songs[selectedsong].url;
}
mainlistshow(); //self Invoked
// ========== to show the list of songs end ↖️ ============

// ========== progress bar ==========
var progress=document.getElementById('progress');
var progress_div=document.getElementById('progress_div');
audio.addEventListener('timeupdate',()=>{
    if(audio.duration){
        var time=(audio.currentTime/audio.duration)*100;
        progress.style.width=`${time}%`;
    }
})
progress_div.addEventListener('click',(event)=>{
    // console.log(event);
    var duration=audio.duration;
    var time=(event.offsetX/event.srcElement.clientWidth)*duration;
    // console.log(duration,time)
    audio.currentTime=time;

})
// ========== progress bar End ==========

// =========== song select ↙️ ======= using EventBubbling
document.getElementById("allsongs").addEventListener("click", (el) => {
  selectedsong = el.target.id;
  musicplay(selectedsong);
//   setInterval(()=>{
//     // console.log(audio.currentTime)
    
//   },1000) 
});
// =========== song select End ↖️ =======

// ============= playing song function ↙️ ===========
function musicplay(id) {
  audio.src = songs[id].url;
  document.getElementById("left-img").src = songs[id].img;
  document.getElementById("dname").textContent = songs[selectedsong].name;
  play.innerHTML = `<i class="ri-pause-fill"></i>`;
  flag = true;
  audio.play();
}
//   ============= playing song function End ↖️ ===========
