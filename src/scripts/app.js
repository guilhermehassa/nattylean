document.addEventListener('DOMContentLoaded', () => {
  console.log('App is running!');

  // Example of a Bootstrap component initialization
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Controles customizados do vídeo
  const video = document.getElementById('mainVideo');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const muteBtn = document.getElementById('muteBtn');
  const muteIcon = document.getElementById('muteIcon');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const videoWrapper = document.querySelector('.customVideo_wrapper');
  let controlsTimeout;

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

    // Atualiza a barra de progresso conforme o tempo do vídeo
    const progressFill = document.querySelector('.customVideo_progress-fill');
    if (progressFill) {
      video.addEventListener('timeupdate', function() {
      const percent = (video.currentTime / video.duration) * 100;
      progressFill.style.width = percent + '%';
      });
    }
  }

});