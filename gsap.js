let tl=gsap.timeline();
function rotateAnimation(val){
    gsap.to('.currSongImg',{
        rotate:val,
    })
    gsap.from('.currSongName',{
        x:'-100%'
    })
}


