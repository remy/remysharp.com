/* global document, window */
const canvas = document.querySelector('#audio');
canvas.width = window.innerWidth;
canvas.height;
const ctx = canvas.getContext('2d');
let gain = null;

const code = document.querySelector('#code');
code.oninput = () => {
  const source = code.value.trim();
  ui.code = new Function('x, max', `return ${source}`);
};

const vol = 10 / 100;
const ui = { volume: vol * vol, code: new Function('x', `return ${code.value.trim()}`) };

const FACTOR = 6;
const sampleRate = 128 * Math.pow(2, FACTOR);

ctx.lineWidth = 1;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.font = '24px monospace';
if (!ctx.setLineDash) {
  ctx.setLineDash = function () {};
}

const generateSample = (sampleNumber) => {
  const sampleTime = sampleNumber / sampleRate; //44100*.25; //RATE;
  const sampleAngle = sampleTime * (440 * 2 * Math.PI); // 440Hz frequency
  return sampleAngle;
};

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
  };

  draw();

}

function runAudio() {
  const src = audioCtx.createScriptProcessor(sampleRate, 1, 1);

  // Give the node a function to process audio events
  src.onaudioprocess = (audioProcessingEvent) => {
    // The output buffer contains the samples that will be modified and played
    const outputBuffer = audioProcessingEvent.outputBuffer;

    // Loop through the output channels (in this case there is only one)
    const channel = 0;
    const outputData = outputBuffer.getChannelData(channel);

    // Loop through the samples rate
    const length = outputBuffer.length;
    for (let sample = 0; sample < length; sample++) {
      // make output equal to the same as the input
      const x = generateSample(sample);
      outputData[sample] = ui.code(x, length);
    }
  };

  gain = audioCtx.createGain();
  gain.gain.value = ui.volume;
  // Connect the source to the gain node.
  gain.connect(audioCtx.destination);
  src.connect(analyser);
  src.connect(gain);
}

runAudio();
drawAudio();
