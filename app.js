const musicContainer = document.getElementById('audio-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progresContainer = document.getElementById('progres-container');
const progres = document.getElementById('progres');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['enemy', 'believer', 'toxic', 'fair tale', 'slowly', 'arcade', 'moon-light', 'hope','midle of the night', 'house of memories', 'taki taki','industry baby', 'no-lie','bananza', 'look at me', 'rockstar', 'lovely','tacos']
let songIndex = 0;
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3` ;
    cover.src = `img/${song}.jpg`
}
loadSong(songs[songIndex]);

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    
    audio.play(); 
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    
    audio.pause(); 
}

function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;

    if(songIndex > songs.length) { 
        songIndex = 0
    } 
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const {duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progres.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clienWidth;
    const clickX= e.offset
    const duration = audio.duration 
    audio.currentTime = (clickX / width) * duration; 
} 

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
    }else {
        playSong();
    }
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progresContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);