/* ========== ELEMENT SELECTORS ========== */
const startButton = document.querySelector('#start-button');
const landing = document.querySelector('#landing');
const intro = document.querySelector('#intro');
const music = new Audio('images/song.m4a');
music.loop = true;
music.volume = 0;
const introHeading = document.querySelector('.intro-heading');
const introLine1 = document.querySelector('.intro-line1');
const introLine2 = document.querySelector('.intro-line2');
const introLine3 = document.querySelector('.intro-line3');
const introLine4 = document.querySelector('.intro-line4');
const introButton = document.querySelector('.intro-button');
const ourMeet = document.querySelector('#our-meet');
const meetHeading = document.querySelector('.our-meet-head');
const zone1 = document.querySelector('#zone1');
const zone2 = document.querySelector('#zone2');
const zone3 = document.querySelector('#zone3');
const zone4 = document.querySelector('#zone4');
const bg1 = document.querySelector('#bg1');
const bg2 = document.querySelector('#bg2');
const bg3 = document.querySelector('#bg3');
const bg4 = document.querySelector('#bg4');
const sec3Button = document.querySelector('#sec3-button');
const section4 = document.querySelector('#section4');
const sec4Parts = document.querySelectorAll('.sec4-part');
const section5 = document.querySelector('#section5');
const poemLines = document.querySelectorAll('.poem-line');
const cakeInvite = document.querySelector('#cake-invite');
const toCakeBtn = document.querySelector('#to-cake-btn');
const section6 = document.querySelector('#section6');
const blowMsg = document.querySelector('#blow-msg');
const afterBlow = document.querySelector('#after-blow');
const flames = document.querySelectorAll('.flame');
const toSection7Btn = document.querySelector('#to-section7-btn');
const section7 = document.querySelector('#section7');
const replayBtn = document.querySelector('#replay-btn');
const cake = document.querySelector('#cake');
const skipBlowBtn = document.querySelector('#skip-blow-btn');

/* ========== UTILITIES ========== */
function showBg(active) {
  [bg1, bg2, bg3, bg4].forEach(bg => bg.style.opacity = '0');
  active.style.opacity = '1';
}

/* ========== SECTION 1 → 2 ========== */
startButton.addEventListener('click', () => {
  landing.style.opacity = '0';
  landing.style.pointerEvents = 'none';
  intro.style.opacity = '1';
  intro.style.pointerEvents = 'auto';
  intro.style.zIndex = '3';
  music.play().catch(() => {});
  setTimeout(() => { landing.style.display = 'none'; }, 800);

  let volume = 0;
  const fadeIn = setInterval(() => {
    if (volume < 0.7) {
      volume = Math.round((volume + 0.05) * 100) / 100;
      music.volume = volume;
    } else {
      clearInterval(fadeIn);
    }
  }, 200);

  setTimeout(() => introHeading.classList.add('reveal'), 3000);
  setTimeout(() => introLine1.classList.add('reveal'), 4000);
  setTimeout(() => introLine2.classList.add('reveal'), 5000);
  setTimeout(() => introLine3.classList.add('reveal'), 6000);
  setTimeout(() => introLine4.classList.add('reveal'), 7000);
  setTimeout(() => introButton.classList.add('reveal'), 8000);
});

/* ========== SECTION 2 → 3 ========== */
introButton.addEventListener('click', () => {
  landing.style.zIndex = '-1';
  intro.style.zIndex = '1';
  ourMeet.style.zIndex = '3';
  intro.style.opacity = '0';
  intro.style.pointerEvents = 'none';
  showBg(bg1);
  ourMeet.style.opacity = '1';
  ourMeet.style.pointerEvents = 'auto';
  window.scrollTo(0, 0);
  setTimeout(() => {
    document.body.style.overflow = 'auto';
    intro.style.zIndex = '-1';
    intro.style.display = 'none';
  }, 800);
  setTimeout(() => meetHeading.classList.add('reveal'), 2000);
});

/* ========== SCROLL LOGIC: Section 3 backgrounds + zones + Section 5 poem focus ========== */
window.addEventListener('scroll', () => {
  const section3Top = ourMeet.offsetTop;
  const scrolled3 = window.scrollY - section3Top;

  // Section 3 backgrounds
  if (scrolled3 < 800) showBg(bg1);
  else if (scrolled3 < 1600) showBg(bg2);
  else if (scrolled3 < 2400) showBg(bg3);
  else showBg(bg4);

  zone1.style.opacity = (scrolled3 >= 0 && scrolled3 < 850) ? '1' : '0';
  zone2.style.opacity = (scrolled3 > 650 && scrolled3 < 1550) ? '1' : '0';
  zone3.style.opacity = (scrolled3 > 1350 && scrolled3 < 2250) ? '1' : '0';
  zone4.style.opacity = (scrolled3 > 2050 && scrolled3 < 2900) ? '1' : '0';

  // Section 5 fish-eye focus (only when section5 is active)
  if (section5.style.display === 'block' && section5.style.pointerEvents !== 'none') {
    const s5Top = section5.offsetTop;
    const s5Scrolled = window.scrollY - s5Top;
    const lineHeight = window.innerHeight;

    const viewportCenter = s5Scrolled + window.innerHeight/2;
    poemLines.forEach((line, i) => {
      const lineTop = i * lineHeight;
      const lineCenter = lineTop + lineHeight/2;
      const distance = Math.abs(viewportCenter - lineCenter);

      let scale = 0.8;
      let opacity = 0;
      const threshold = lineHeight * 0.7;
      if (distance < threshold) {
        const factor = 1 - distance / threshold;
        scale = 0.8 + factor * 0.3;
        opacity = factor;
      }
      line.style.opacity = opacity;
      line.style.transform = `scale(${scale})`;
      if (distance < threshold * 0.3) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });

    // Cake invite button appears near the end
    const sectionEnd = section5.offsetHeight;
    const scrolledToBottom = s5Scrolled + window.innerHeight;
    const thresholdFromBottom = 1.5 * window.innerHeight;
    if (scrolledToBottom >= sectionEnd - thresholdFromBottom) {
      cakeInvite.classList.add('active');
    } else {
      cakeInvite.classList.remove('active');
    }
  }
});

/* ========== SECTION 3 → 4 ========== */
sec3Button.addEventListener('click', () => {
  ourMeet.style.opacity = '0';
  ourMeet.style.pointerEvents = 'none';
  ourMeet.style.zIndex = '-1';
  document.body.style.overflow = 'hidden';
  window.scrollTo(0, 0);

  section4.style.opacity = '1';
  section4.style.pointerEvents = 'auto';
  section4.style.zIndex = '3';

  goToPart(0);
});

function goToPart(index) {
  sec4Parts.forEach((part, i) => {
    part.style.opacity = (i === index) ? '1' : '0';
    part.style.pointerEvents = (i === index) ? 'auto' : 'none';
  });
}

/* ========== SECTION 4 YES/NO LOGIC ========== */
sec4Parts.forEach((part, index) => {
  const yesBtn = part.querySelector('.yes-btn');
  const noBtn = part.querySelector('.no-btn');
  const rejectionPopup = part.querySelector('.rejection-popup');

  yesBtn.addEventListener('click', () => {
    if (index < sec4Parts.length - 1) {
      part.style.opacity = '0';
      part.style.pointerEvents = 'none';
      setTimeout(() => goToPart(index + 1), 500);
    } else {
      // move to section 5
      section4.style.opacity = '0';
      section4.style.pointerEvents = 'none';
      setTimeout(() => {
        section4.style.display = 'none';
        document.body.style.overflow = 'auto';
        section5.style.display = 'block';
        section5.style.opacity = '1';
        section5.style.pointerEvents = 'auto';
        section5.style.zIndex = '3';
        // reset poem lines
        poemLines.forEach(line => {
          line.style.opacity = '0';
          line.style.transform = 'scale(0.8)';
          line.classList.remove('active');
        });
        cakeInvite.classList.remove('active');
        window.scrollTo(0, section5.offsetTop);
      }, 800);
    }
  });

  noBtn.addEventListener('click', () => {
    rejectionPopup.classList.add('show');
    setTimeout(() => rejectionPopup.classList.remove('show'), 3000);
  });
});

/* ========== SECTION 5 → 6 (smooth fade transition) ========== */
toCakeBtn.addEventListener('click', () => {
  // Fade out section 5
  section5.style.opacity = '0';
  section5.style.pointerEvents = 'none';

  // Disable scrolling during transition
  document.body.style.overflow = 'hidden';
  window.scrollTo(0, 0);

  // After the fade-out is done, hide section5 and show section6 with a fade-in
  setTimeout(() => {
    section5.style.display = 'none';
    section5.style.zIndex = '-1';

    // Prepare cake section
    section6.style.display = 'block';
    section6.style.opacity = '1';
    section6.style.pointerEvents = 'auto';
    section6.style.zIndex = '4';

    // Reset cake state
    flames.forEach(f => f.style.opacity = '1');
    afterBlow.style.opacity = '0';
    toSection7Btn.classList.add('hidden');
    blowMsg.textContent = 'now blow into your mic baby';
    blowMsg.style.opacity = '1';
    skipBlowBtn.style.display = 'block'; // in case it was hidden
    cutDone = false;
    blowDetected = false;
    const cakeTop = document.querySelector('.layer-top');
    if (cakeTop) cakeTop.style.transform = '';
    enableCakeCut();
    startBlowDetection();
  }, 800); // matches opacity transition duration
});

/* ========== SECTION 6 → 7 (smooth fade transition) ========== */
toSection7Btn.addEventListener('click', () => {
  // Fade out section 6
  section6.style.opacity = '0';
  section6.style.pointerEvents = 'none';

  // After transition, hide it and show section 7
  setTimeout(() => {
    section6.style.display = 'none';
    section6.style.zIndex = '-1';

    section7.style.display = 'flex';
    section7.style.opacity = '1';
    section7.style.pointerEvents = 'auto';
    section7.style.zIndex = '5';
  }, 800);
});

/* ========== BLOW DETECTION (Mic + Skip) ========== */
let blowDetected = false;
function startBlowDetection() {
  if (blowDetected) return;
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      function checkBlow() {
        if (blowDetected) return;
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a,b) => a+b, 0) / dataArray.length;
        if (avg > 35) {
          blowDetected = true;
          stream.getTracks().forEach(track => track.stop());
          audioCtx.close();
          blowCandles();
        } else {
          requestAnimationFrame(checkBlow);
        }
      }
      checkBlow();
    })
    .catch(() => {
      console.log('Mic not available – use skip button.');
    });
}

skipBlowBtn.addEventListener('click', () => {
  if (!blowDetected) {
    blowDetected = true;
    blowCandles();
  }
});

function blowCandles() {
  flames.forEach(flame => flame.style.opacity = '0');
  blowMsg.style.opacity = '0';
  skipBlowBtn.style.display = 'none';
  afterBlow.style.opacity = '1';
  afterBlow.style.pointerEvents = 'auto';
}

/* ========== CAKE CUT SWIPE ========== */
let cutDone = false;
function enableCakeCut() {
  const cakeEl = cake;
  let startX = 0;
  let swiping = false;

  function handleStart(e) {
    if (cutDone) return;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    swiping = true;
  }
  function handleMove(e) {
    if (!swiping || cutDone) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    if (diff > 70) {
      cutCake();
      swiping = false;
    }
  }
  function handleEnd() { swiping = false; }

  cakeEl.addEventListener('mousedown', handleStart);
  cakeEl.addEventListener('mousemove', handleMove);
  cakeEl.addEventListener('mouseup', handleEnd);
  cakeEl.addEventListener('touchstart', handleStart, { passive: false });
  cakeEl.addEventListener('touchmove', handleMove, { passive: false });
  cakeEl.addEventListener('touchend', handleEnd);
}

function cutCake() {
  cutDone = true;
  const cakeTop = document.querySelector('.layer-top');
  if (cakeTop) {
    cakeTop.style.transition = 'transform 0.6s ease';
    cakeTop.style.transform = 'rotate(-10deg) translateX(15px)';
  }
  toSection7Btn.classList.remove('hidden');
  toSection7Btn.style.opacity = '1';
  toSection7Btn.style.pointerEvents = 'auto';
  document.querySelector('.swipe-hint').style.opacity = '0';
}

/* ========== SECTION 7 → REPLAY ========== */
replayBtn.addEventListener('click', () => {
  window.location.reload();
});