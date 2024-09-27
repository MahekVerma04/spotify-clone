console.log("Welcome to spotify")

//INitializing variables

let songIndex=0;
let audioElement= new Audio("songs\\1.mp3")
let masterPlay= document.getElementById('masterPlay')
let myProgressBar=document.getElementById('myProgressBar')
let gif=document.getElementById('gif')
let masterPlayName=document.getElementById("masterPlayName")
let songItems=Array.from(document.getElementsByClassName('songItem'));
let nav=document.querySelector('nav')
let songs=[
    {songName:"Attention", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"Night-Changes", filePath:"songs\\2.mp3", coverPath:"covers\\2.jpg"},
    {songName:"Into-Your-Arms", filePath:"songs\\3.mp3", coverPath:"covers\\3.jpg"},
    {songName:"Let-Me-Love-You", filePath:"songs\\4.mp3", coverPath:"covers\\4.jpeg"},
]

songItems.forEach((element,i) => {
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});

// audioElement.play() plays the song

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity=1
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity=0

    }
})
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //Update seek bar

    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    console.log(progress)
    myProgressBar.value=progress


})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100
})

const makeAllPLays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-circle-pause")
        element.classList.add("fa-circle-play")
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
    makeAllPLays()
    index=parseInt(e.target.id);
    e.target.classList.remove("fa-circle-play")
    e.target.classList.add("fa-circle-pause")
    audioElement.src=`songs/${index}.mp3`
    masterPlayName.innerText=songs[songIndex].songName
    audioElement.currentTime=0
    audioElement.play()
    gif.opacity=1
    masterPlay.classList.remove("fa-circle-pause")
    masterPlay.classList.add("fa-circle-play")

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=3){
        songIndex=0
    }
    else{
        songIndex+=1
    }
    audioElement.src=`songs/${songIndex+1}.mp3`
    audioElement.currentTime=0;
    audioElement.play()
    masterPlayName.innerText=songs[songIndex].songName
    gif.opacity=1
    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=3
    }
    else{
        songIndex-=1
    }
    audioElement.src=`songs/${songIndex+1}.mp3`
    audioElement.currentTime=0;
    audioElement.play()
    masterPlayName.innerText=songs[songIndex].songName
    gif.opacity=1
    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
})


window.addEventListener("scroll",function(){
    if(document.documentElement.scrollTop>10){
        nav.classList.add("sticky")
    }
    else{
        nav.classList.remove("sticky")
    }
})