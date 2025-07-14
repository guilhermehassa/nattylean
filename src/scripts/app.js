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

  
  ['mousemove', 'touchstart', 'click'].forEach(evt => {
    videoWrapper.addEventListener(evt, showControls);
  });

  
  video.addEventListener('play', showControls);
  video.addEventListener('pause', showControls);

  
  showControls();

  if (video && playPauseBtn && muteBtn && fullscreenBtn) {
    // Play/Pause
    playPauseBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
    
    video.addEventListener('click', function(e) {
      
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

    
    muteBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      video.muted = !video.muted;
    });
    video.addEventListener('volumechange', function() {
      muteIcon.textContent = video.muted ? '🔇' : '🔊';
    });

    
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

  
  const buyNowButtons = document.querySelectorAll('.offer-card__btn');
  const modal = document.getElementById('buyNowModal');
  const closeModalBtn = document.getElementById('closeBuyNowModal');
  const modalProductName = document.getElementById('modalProductName');
  const modalProductPrice = document.getElementById('modalProductPrice');
  const modalProductImage = document.getElementById('modalProductImage');
  const buyNowForm = document.getElementById('buyNowForm');

  
  function openBuyNowModal(productName, productPrice, productImage) {
    modalProductName.textContent = productName;
    modalProductPrice.textContent = productPrice;
    modalProductImage.src = productImage;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  
  function closeBuyNowModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeBuyNowModal);
  if (modal) modal.addEventListener('click', function(e) {
    if (e.target === modal) closeBuyNowModal();
  });

  
  buyNowButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const card = btn.closest('.offer-card');
      let name = card.getAttribute('data-name') || 'Produto';
      let price = card.querySelector('.offer-card__total span')?.textContent?.trim() || '';
      let image = card.querySelector('img')?.src || '';
      openBuyNowModal(name, price, image);
    });
  });

  
  const phoneInput = document.getElementById('buyerPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = phoneInput.value.replace(/\D/g, '');
      if (value.length > 10) value = value.slice(0, 10);
      let formatted = value;
      if (value.length > 6) {
        formatted = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
      } else if (value.length > 3) {
        formatted = `(${value.slice(0,3)}) ${value.slice(3,6)}`;
      } else if (value.length > 0) {
        formatted = `(${value}`;
      }
      phoneInput.value = formatted;
    });
  }

  
  function isValidEmail(email) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
  }
  
  function isValidUSPhone(phone) {
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
  }

  if (buyNowForm) {
    buyNowForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('buyerName').value.trim();
      const email = document.getElementById('buyerEmail').value.trim();
      const phone = document.getElementById('buyerPhone').value.trim();
      const product = modalProductName.textContent;
      const price = modalProductPrice.textContent;
      const image = modalProductImage.src;

      // Remove mensagens de erro antigas
      document.querySelectorAll('.input-error-msg').forEach(el => el.remove());
      document.getElementById('buyerEmail').classList.remove('input-error');
      document.getElementById('buyerPhone').classList.remove('input-error');

      let hasError = false;
      if (!isValidEmail(email)) {
        const emailInput = document.getElementById('buyerEmail');
        emailInput.classList.add('input-error');
        const msg = document.createElement('div');
        msg.className = 'input-error-msg';
        msg.textContent = 'Enter a valid email address.';
        emailInput.parentNode.appendChild(msg);
        emailInput.focus();
        hasError = true;
      }
      if (!isValidUSPhone(phone)) {
        const phoneInput = document.getElementById('buyerPhone');
        phoneInput.classList.add('input-error');
        const msg = document.createElement('div');
        msg.className = 'input-error-msg';
        msg.textContent = 'Enter a valid phone number';
        phoneInput.parentNode.appendChild(msg);
        if (!hasError) phoneInput.focus();
        hasError = true;
      }
      if (hasError) return;

      // Redireciona para página de obrigado (pode passar dados via query string)
      const params = new URLSearchParams({ name, email, phone, product, price, image });
      window.location.href = 'thankyou.html?' + params.toString();
    });
  }

});