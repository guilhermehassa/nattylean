
document.addEventListener('DOMContentLoaded', () => {
  const skipToTimeBtn = document.getElementById('skipToTimeBtn');
  const restartVideoBtn = document.getElementById('restartVideoBtn');
  const hiddenContent = document.getElementById('hiddenContent');
  const video = document.getElementById('mainVideo');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const muteBtn = document.getElementById('muteBtn');
  const muteIcon = document.getElementById('muteIcon');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const videoWrapper = document.querySelector('.customVideo_wrapper');
  let controlsTimeout;
  const videoCurrentTime = localStorage.getItem('videoCurrentTime');

  //Tempo que o vídeo deve começar
  if (videoCurrentTime) {
    video.currentTime = parseFloat(videoCurrentTime);
    video.play(); 
  }else{
    video.currentTime = 0;
    localStorage.setItem('videoCurrentTime', 0);
    video.play();
  }

   if (skipToTimeBtn) {
    skipToTimeBtn.addEventListener('click', function() {
      const video = document.getElementById('mainVideo');
      if (video) {
        video.currentTime = (60 * 20) + 13; 
        video.play();
      }
    });
  }

  if (restartVideoBtn && video) {
    restartVideoBtn.addEventListener('click', function() {
      video.currentTime = 0;
      video.play();
      restartVideoBtn.classList.add('d-none');
    });
    video.addEventListener('play', function() {
      restartVideoBtn.classList.add('d-none');
    });
  }
    
  function toggleHiddenContent() {
    if (!hiddenContent.classList.contains('hiddenContent-open')) {
      hiddenContent.style.display = 'block';
      startCountdowns();

      setTimeout(() => {
        skipToTimeBtn.style.display = 'none'; 
        hiddenContent.classList.add('hiddenContent-open');
      }, 200);
    }
  }

  function showControls() {
    videoWrapper.classList.add('show-controls');
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      videoWrapper.classList.remove('show-controls');
    }, 3000);
  }

  // Mostra controles em qualquer interação
  ['mousemove', 'touchstart', 'click'].forEach(evt => {
    videoWrapper.addEventListener(evt, showControls);
  });

  // Mostra controles ao pausar/play também
  video.addEventListener('play', showControls);
  video.addEventListener('pause', showControls);

  // Inicialmente mostra controles
  showControls();

  if (video && playPauseBtn && muteBtn && fullscreenBtn) {
    // Play/Pause toggle pelo botão
    playPauseBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
    // Play/Pause ao clicar no vídeo (mas não nos botões)
    video.addEventListener('click', function(e) {
      // Se o clique for em um botão, não faz nada
      if (e.target.closest('.customVideo_controls .btn')) return;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
    video.addEventListener('play', function() {
      playPauseIcon.textContent = '❚❚';
    });
    video.addEventListener('pause', function() {
      playPauseIcon.textContent = '►';
    });

    // Mute/Unmute toggle
    muteBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      video.muted = !video.muted;
    });
    video.addEventListener('volumechange', function() {
      muteIcon.textContent = video.muted ? '🔇' : '🔊';
    });

    // Fullscreen
    fullscreenBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (video.requestFullscreen) {
      video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
      }
    });

    // AÇÕES CONFORME O PROGRESSO DO VÍDEO
    const progressFill = document.querySelector('.customVideo_progress-fill');
    if (progressFill) {
      video.addEventListener('timeupdate', function() {
        const percent = (video.currentTime / video.duration) * 100;
        progressFill.style.width = percent + '%';
        localStorage.setItem('videoCurrentTime', video.currentTime);
        if(video.currentTime >= (60*20.14)){
          toggleHiddenContent();
        }
      });
    }

    // Exibe botão de reinício ao terminar o vídeo
    video.addEventListener('ended', function() {
      if (restartVideoBtn) {
        restartVideoBtn.classList.remove('d-none');
      }
    });
  }

function startCountdowns() {
  var countdownDisplays = document.querySelectorAll('#countdownDisplay');
  const COUNTDOWN_DURATION = 20 * 60;
  // Salva o timestamp de início se não existir
  let countdownStart = localStorage.getItem('countdownStart');
  if (!countdownStart) {
    countdownStart = Date.now();
    localStorage.setItem('countdownStart', countdownStart);
  } else {
    countdownStart = parseInt(countdownStart);
    if (isNaN(countdownStart)) {
      countdownStart = Date.now();
      localStorage.setItem('countdownStart', countdownStart);
    }
  }
  if (countdownDisplays) {
    countdownDisplays.forEach(countdownDisplay => {
      function renderCountdown() {
        const now = Date.now();
        let elapsed = Math.floor((now - countdownStart) / 1000);
        let totalSeconds = COUNTDOWN_DURATION - elapsed;
        if (totalSeconds < 0) totalSeconds = 0;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (totalSeconds === 0) {
          clearInterval(timer);
        }
      }
      renderCountdown();
      var timer = setInterval(renderCountdown, 1000);
    });
  }
}

});