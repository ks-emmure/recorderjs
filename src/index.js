import {app} from './app/app.js';
import './app/app.css';
let audio = document.getElementById('audio');
import Recorder from './app/recorder2.js';
let audioCtx = new AudioContext();
let source = audioCtx.createMediaElementSource(audio);
let gainNode = audioCtx.createGain();
let distortion = audioCtx.createWaveShaper();
let analyser = audioCtx.createAnalyser();
let biquadFilter = audioCtx.createBiquadFilter();
let panNode = audioCtx.createStereoPanner();
let isRecorded = false;
audio.oncanplay = () => {
  source.connect(analyser);
  analyser.connect(biquadFilter);
  biquadFilter.connect(distortion);
  distortion.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.value = 1;
  // distortion.curve = makeDistortionCurve(0);
  // biquadFilter.type = "lowshelf";
  // biquadFilter.frequency.value = 1000;
  // biquadFilter.gain.value = 100;
  // biquadFilter.type = "peaking";
  // biquadFilter.frequency.value = 1000;
  // biquadFilter.Q.value = 100;
  // biquadFilter.gain.value = 25;
  let rec = new Recorder(gainNode);
  rec.record();
  audio.onpause = () => {
    if(!isRecorded) {
      isRecorded = true;
      rec.stop();
      rec.exportWAV(function(blob){
        let url = URL.createObjectURL(blob);
        let newAudio = document.createElement('audio');
        newAudio.src = url;
        newAudio.controls = true;
        document.body.appendChild(newAudio);
      });
    }
  }
}
//   rec.record();
//     setTimeout(function(){
//       rec.stop();
//       rec.exportWAV(function(blob){
//         console.log('e',blob);
//         let url = URL.createObjectURL(blob);
//         let newAudio = document.createElement('audio');
//         newAudio.src = url;
//         newAudio.controls = true;
//         document.body.appendChild(newAudio);
//       })
//     },5000);
//
// }
// need to read
// biquadFilter.connect(analyser)
// biquadFilter.type = "lowshelf";
// biquadFilter.frequency.value = 1000;
// biquadFilter.gain.value = 100;




// audio.oncanplay = () => {
//   // console.log(gainNode);
//   let rec = new Recorder(gainNode);
//   rec.record();
//
//
//   setTimeout(function(){
//     rec.stop();
//     rec.exportWAV(function(blob){
//       console.log('e',blob);
//       let url = URL.createObjectURL(blob);
//       let newAudio = document.createElement('audio');
//       newAudio.src = url;
//       newAudio.controls = true;
//       document.body.appendChild(newAudio);
//     })
//   },5000);
// }

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};





//
// audio.oncanplay = function(){
//   let audioCtx = new AudioContext();
//
//   let source = audioCtx.createMediaElementSource(audio);
//   let distortion = audioCtx.createWaveShaper();
//   let gainNode = audioCtx.createGain();
//   gainNode.gain.value = 0.5;
//   // distortion.curve = makeDistortionCurve(1);
//
//
//   source.connect(gainNode);
//   // distortion.connect(gainNode);
//   gainNode.connect(audioCtx.destination);
//   let rec = new Recorder(gainNode);
//   rec.record();
//   setTimeout(function(){
//     rec.stop();
//
//   },5000);
// }
// audio.oncanplay = function(){
// let audioCtx = new AudioContext();
// let stream = new MediaStream();
// stream.addTrack
// let source = audioCtx.createMediaStreamSource(stream);
// let distortion = audioCtx.createWaveShaper();
// let gainNode = audioCtx.createGain();
// gainNode.gain.value = 0.5;
// distortion.curve = makeDistortionCurve(1);
//
//
// source.connect(gainNode);
// // distortion.connect(gainNode);
// gainNode.connect(audioCtx.destination);
// const recorder = new Recorder(audioCtx);
// // recorder.init(source)
// //
// // navigator.mediaDevices.getUserMedia({audio: true})
// //   .then(stream => recorder.init(stream))
// //   .catch(err => console.log('Uh oh... unable to get stream...', err));
//
//
//
//
//
// function makeDistortionCurve(amount) {
//   var k = typeof amount === 'number' ? amount : 50,
//     n_samples = 44100,
//     curve = new Float32Array(n_samples),
//     deg = Math.PI / 180,
//     i = 0,
//     x;
//   for ( ; i < n_samples; ++i ) {
//     x = i * 2 / n_samples - 1;
//     curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
//   }
//   return curve;
// };
// }
