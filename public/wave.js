let audioRunning = false;
// create Oscillator node
let oscillator;
const canvas = document.querySelector('#timer');
const W = canvas.width = window.innerWidth;
const H = canvas.height;
const ctx = canvas.getContext('2d');
const freqPresets = [0,1,2,3,4,5,10,20,30,40,50,100,200,440,600,800, 900]

const slider = document.querySelector('input[type=range]');
slider.oninput = () => {
  const c = ui.freq = parseInt(slider.value, 10);
  if (audioRunning) {
    oscillator.frequency.value = c;
  }
};
const ui = { freq: parseInt(slider.value, 10) };

const RATE = 60;

ctx.lineWidth = 1;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.font = '24px monospace'
if (!ctx.setLineDash) {
  ctx.setLineDash = function () {}
}


const generateSample = (sampleNumber, method = 'sin') => {
  const sampleTime = sampleNumber / RATE;
  const sampleAngle = sampleTime * 2 * Math.PI * ui.freq;
  return Math[method](sampleAngle);
};

var last = null;
var degree = 10;
var H2 = H/2;
var half = H2 * .9; // amplitude
var padLeft = H;
var lastTime = Date.now();

function draw() {
  requestAnimationFrame(draw);

  // avoid drawing if you don't need to
  if (last === ui.freq) {
//     return;
  }

  last = ui.freq;


  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#00BCD4';
  ctx.save();

  ctx.clearRect(0, 0, W, H);

  ctx.lineWidth = 2;

  // draw reference circle
  ctx.beginPath();
  ctx.arc(H2, H2, half, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();

  // draw line from centre to edge
  ctx.beginPath();

  ctx.moveTo(H2, H2);

  // use this to double check the loop speed
  // if (generateSample(degree, 'cos') === 1) {
  //   lastTime = Date.now();
  // }

  const x = generateSample(degree) * half; // sin for X
  const y = generateSample(degree, 'cos') * half; // cos for Y

  ctx.lineTo(H2 + x, H2 + y);

  ctx.strokeStyle = 'red';
  ctx.stroke();
  ctx.setLineDash([2,3]);
  ctx.beginPath();
  ctx.moveTo(H2 + x, H2 + y);
  ctx.lineTo(padLeft, H2 + y);
  ctx.stroke();

  // draw sine wave
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.setLineDash([0]);
  ctx.beginPath();
  for (let i = 0; i < (W - padLeft); i++) {
    const v = generateSample(degree - i, 'cos') * half;
    ctx.lineTo(padLeft + i, H2 + v);
  }

  ctx.stroke();

  // text
  ctx.fillText(`${ui.freq}Hz`, padLeft, 24);

  // zero marker
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(188,188,188,.4)';
  ctx.moveTo(padLeft, H2);
  ctx.lineTo(W, H2);
  ctx.stroke();
  ctx.closePath();

  ctx.restore();

  degree++;
}

const audioCtx = new window.AudioContext();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 1024;

function drawAudio() {

  const bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  const canvas = document.querySelector('#audio');
  const ctx = canvas.getContext('2d');

  const W = canvas.width = window.innerWidth;
  const H = canvas.height;

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.fillStyle = 'black';
  ctx.save();

  const draw = () => {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, W, H);
    ctx.save();

    analyser.getByteTimeDomainData(dataArray);

    ctx.beginPath();
    const sliceWidth = W / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      // this gets the value from between 0 and 2
      const v = dataArray[i] / 128.0;
      const y = v * H/2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else if (i === bufferLength -1) {
        ctx.lineTo(W, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.stroke();
    ctx.fillText(`sin(x) ~ ${(1 - (dataArray[0]/128)).toFixed(4).padStart(7, ' ')}`, 20, 44);

    ctx.fillText(`${bufferLength} samples`, 20, 24);

    // zero marker
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(188,188,188,.4)';
    ctx.moveTo(0, H/2);
    ctx.lineTo(W, H/2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  draw();

}

function runAudio() {
  if (audioRunning) {
    oscillator.disconnect();
    audioRunning = false;
    return;
  }

  audioRunning = true;

  oscillator = audioCtx.createOscillator();
  oscillator.connect(analyser);

  // square wave @ 830Hz
//   oscillator.type = 'square';
  oscillator.frequency.value = ui.freq;

  const gain = audioCtx.createGain();
  const fraction = 30 / 100; // keep the volume down to 30%
  gain.gain.value = fraction * fraction;
  // Connect the source to the gain node.
  gain.connect(audioCtx.destination);


  // now connect it to the audio output
  oscillator.connect(gain);

  // now we hear the sound
  oscillator.start();
}

draw();
drawAudio();

const button = document.querySelector('button');

button.onclick = runAudio;
