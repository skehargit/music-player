var play = document.querySelector("#play");
var backward = document.querySelector("#backward");
var forward = document.querySelector("#forward");
var leftImg=document.getElementById("left-img");
var leftName=document.getElementById("dname");
var users=document.getElementById('users');
var startTime=document.getElementById('start-time');
var endTime=document.getElementById('end-time')
// ==========Array of objs contain music list=======
var songs=sekhar;
document.getElementById('p').addEventListener('click',()=>{
  songs=pranjal;
  mainlistshow();
})
document.getElementById('s').addEventListener('click',()=>{
  songs=sekhar;
  mainlistshow();
})
// ========== users ============
var userflag=false;
users.addEventListener('click',()=>{
  userflag=!userflag;
  if(userflag)document.getElementById('users-show').style.display=`block`;
  else document.getElementById('users-show').style.display=`none`;
})



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
            <img src="${el.img}" name='${idx}' alt="">
            <h2  name='${idx}' >${el.name}</h2>
        </div>
        <h3>${el.duration}</h3>
    </li>`;
  });
  document.getElementById("allsongs").innerHTML = output;
  leftImg.src = songs[selectedsong].img;
  leftName.textContent = songs[selectedsong].name;
  audio.src = songs[selectedsong].url;
}
mainlistshow(); //self Invoked
// ========== to show the list of songs end ↖️ ============

// ========== progress bar ==========
var progress=document.getElementById('progress');
var progress_div=document.getElementById('progress_div');

audio.addEventListener('timeupdate',()=>{

  // ========timing=====
  var str=('0'+(audio.duration/60+'').substring(0,4));
  if(str!='0NaN')endTime.innerHTML=str;
  var str2=('0'+(audio.currentTime/60+'').substring(0,4));
  if(str2!='00')startTime.innerHTML=str2;
  
  // ==== progress bar ===
    if(audio.duration){
        var time=(audio.currentTime/audio.duration)*100;
        progress.style.width=`${time}%`;
    }

    // === auto play ====
    if(audio.currentTime==audio.duration){
      if(selectedsong==songs.length-1)selectedsong=0;
      else selectedsong++;
      musicplay(selectedsong);
    }
})
progress_div.addEventListener('click',(event)=>{
    var duration=audio.duration;
    var time=(event.offsetX/event.srcElement.clientWidth)*duration;
    audio.currentTime=time;

})
// ========== progress bar End ==========

// =========== song select ↙️ ======= using EventBubbling
document.getElementById("allsongs").addEventListener("click", (el) => {
  // console.log(el,el.target,el.target.attributes.name.value)
  var num=el.target.id;
  if(!num)num=Number(el.target.attributes.name.value);
  selectedsong=num;
  musicplay(selectedsong);
});
// =========== song select End ↖️ =======

// ============= playing song function ↙️ ===========
function musicplay(id) {
  // if(!Number(id))console.log(id)
  audio.src = songs[id].url;
  leftImg.src = songs[id].img;
  leftName.textContent = songs[selectedsong].name;
  play.innerHTML = `<i class="ri-pause-fill"></i>`;
  flag = true;
  
  audio.play();
}
//   ============= playing song function End ↖️ ===========
