document.addEventListener("DOMContentLoaded", function () {
  const playBtn = document.getElementById("play-btn");
  const drumButtons = document.querySelectorAll(
    "#drum-machine button[data-sound]"
  );
  const audioElements = document.querySelectorAll("audio[data-sound]");
  const tempoInput = document.getElementById("tempo");
  const repetitionsInput = document.getElementById("repetitions");

  let beatsPerMinute = parseInt(tempoInput.value, 10);
  let beatsInterval = (60 / beatsPerMinute) * 1000;
  let isPlaying = false;
  let currentBeatIndex = 0;
  let timer;
  let repetitionsLeft = 0;

  const beats = [
    ["kick", "snare", "hihat"],
    // Add more beats or modify this array
  ];

  function playBeat() {
    const currentBeat = beats[currentBeatIndex];
    currentBeat.forEach((sound) => {
      const audioElement = document.querySelector(
        `audio[data-sound="${sound}"]`
      );
      audioElement.currentTime = 0;
      audioElement.play();
    });

    currentBeatIndex = (currentBeatIndex + 1) % beats.length;
    if (currentBeatIndex === 0) {
      repetitionsLeft--;
      if (repetitionsLeft === 0) {
        stopPlaying();
      }
    }
  }

  function togglePlay() {
    if (isPlaying) {
      stopPlaying();
    } else {
      startPlaying();
    }
  }

  function startPlaying() {
    isPlaying = true;
    playBtn.textContent = "Stop";
    playBtn.classList.add("playing");
    beatsPerMinute = parseInt(tempoInput.value, 10);
    beatsInterval = (60 / beatsPerMinute) * 1000;
    repetitionsLeft = parseInt(repetitionsInput.value, 10);
    timer = setInterval(playBeat, beatsInterval);
  }

  function stopPlaying() {
    isPlaying = false;
    playBtn.textContent = "Play";
    playBtn.classList.remove("playing");
    clearInterval(timer);
    currentBeatIndex = 0;
  }

  function updateTempo() {
    if (isPlaying) {
      clearInterval(timer);
      beatsPerMinute = parseInt(tempoInput.value, 10);
      beatsInterval = (60 / beatsPerMinute) * 1000;
      timer = setInterval(playBeat, beatsInterval);
    }
  }

  playBtn.addEventListener("click", togglePlay);
  tempoInput.addEventListener("change", updateTempo);

  drumButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const sound = button.getAttribute("data-sound");
      const audioElement = document.querySelector(
        `audio[data-sound="${sound}"]`
      );
      audioElement.currentTime = 0;
      audioElement.play();
    });
  });
});
