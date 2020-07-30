class Timer {
  constructor(durationInput, startBtn, pauseBtn, stopBtn, callbacks) {
    this.durationInput = durationInput;
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;
    this.stopBtn = stopBtn;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      this.onStop = callbacks.onStop;
    }

    this.startBtn.addEventListener('click', this.start);
    this.pauseBtn.addEventListener('click', this.pause);
    this.stopBtn.addEventListener('click', this.stop);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeLeft);
    }
    this.tick();
    this.interval = setInterval(this.tick, 15);
  }

  pause = () => {
    clearInterval(this.interval);
  }

  stop = () => {
    this.timeLeft = 0;
  }

  tick = () => {
    if (this.timeLeft <= 0) {
      this.pause()
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeLeft = this.timeLeft - .015;
      if (this.onTick) {
        this.onTick(this.timeLeft);
      }
    }
  }

  get timeLeft() {
    return parseFloat(this.durationInput.value);
  }

  set timeLeft(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
