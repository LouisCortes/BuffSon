let s1 = 0, s2 = 0, s3 = 0, s4 = 0, s5 = 0, s6 = 0, s7 = 0, s8 = 64, s9 = 0.09, s10 = 0;
let p1 = 0, p2 = 0, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0, p8 = 0, p9 = 0;
let tiValue = 0;
let tiValue2 = 0;

const vertexShaderTextarea = document.getElementById('vertexShaderText');
let shaderCode = "#version 300 es\nout vec2 o_sound;\nuniform float u_blockOffset;\nuniform float u_s1;\nuniform float u_s2;\nuniform float u_s3;\nuniform float u_s4;\nuniform float u_s5;\nuniform float u_s6;\nuniform float u_s7;\nuniform float u_p1;\nuniform float u_p2;\nuniform float u_p3;\nuniform float u_p4;\nuniform float u_p5;\nuniform float u_p6;\nuniform float u_p7;\nuniform float u_p8;\nuniform float u_p9;\nuniform float u_time;\nuniform float u_sv;\nuniform float u_sampleRate;\nuniform float u_date;" + vertexShaderTextarea.value;


function gene(value, sliderId) {
  switch (sliderId) {
    case 'slider1':
      document.getElementById("slider1-value").textContent = value.toFixed(3);
      s1 = value;
      break;
    case 'slider2':
      document.getElementById("slider2-value").textContent = value.toFixed(3);
      s2 = value;
      break;
    case 'slider3':
      document.getElementById("slider3-value").textContent = value.toFixed(3);
      s3 = value;
      break;
    case 'slider4':
      document.getElementById("slider4-value").textContent = value.toFixed(3);
      s4 = value;
      break;
    case 'slider5':
      document.getElementById("slider5-value").textContent = value.toFixed(3);
      s5 = value;
      break;
      case 'slider6':
        document.getElementById("slider6-value").textContent = value.toFixed(3);
        s6 = value;
        break;
        case 'slider7':
          document.getElementById("slider7-value").textContent = value.toFixed(3);
          s7 = value;
          break;
          case 'slider8':
            document.getElementById("slider8-value").textContent = value.toFixed(0);
            s8 = value;
            break;
            case 'slider9':
              document.getElementById("slider9-value").textContent = value.toFixed(2);
              s9 = value;
              break;
              case 'slider10':
                document.getElementById("slider10-value").textContent = value.toFixed(3);
                s10 = value;
                break;
                case 'potar1':
                  document.getElementById("slider11-value").textContent = value.toFixed(3);
                  p1 = value;
                  break;
                case 'potar2':
                  document.getElementById("slider12-value").textContent = value.toFixed(3);
                  p2 = value;
                  break;
                case 'potar3':
                  document.getElementById("slider13-value").textContent = value.toFixed(3);
                  p3 = value;
                  break;
                case 'potar4':
                  document.getElementById("slider14-value").textContent = value.toFixed(3);
                  p4 = value;
                  break;
                case 'potar5':
                  document.getElementById("slider15-value").textContent = value.toFixed(3);
                  p5 = value;
                  break;
                  case 'potar6':
                    document.getElementById("slider16-value").textContent = value.toFixed(3);
                    p6 = value;
                    break;
                    case 'potar7':
                      document.getElementById("slider17-value").textContent = value.toFixed(3);
                      p7 = value;
                      break;
                      case 'potar8':
                        document.getElementById("slider18-value").textContent = value.toFixed(3);
                        p8 = value;
                        break;
                        case 'potar9':
                          document.getElementById("slider19-value").textContent = value.toFixed(3);
                          p9 = value;
                          break;
    default:
      break;
  }
}

function gene2(value2) {
  p1 = value2;
}

function createShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) + source);
  }
  return shader;
}

function createTransformFeedbackProgram(gl, vertexShaderSource, fragmentShaderSource, varyings) {
  const program = gl.createProgram();
  gl.attachShader(program, createShader(gl, vertexShaderSource, gl.VERTEX_SHADER));
  gl.attachShader(program, createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER));
  gl.transformFeedbackVaryings(program, varyings, gl.SEPARATE_ATTRIBS);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program));
  }
  return program;
}

function getUniformLocations(gl, program, keys) {
  const locations = {};
  keys.forEach(key => {
    locations[key] = gl.getUniformLocation(program, key);
  });
  return locations;
}

function createVbo(gl, array, usage) {
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, array, usage !== undefined ? usage : gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return vbo;
}

const FRAGMENT_SHADER = `#version 300 es
void main(void) {}
`;

function createAudio(shaderCode, datev, tiValue) {
  //const SAMPLES = 512;

  const audioCtx = new AudioContext();
  const audioBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * s9, audioCtx.sampleRate);

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2');

  const program = createTransformFeedbackProgram(gl, shaderCode, FRAGMENT_SHADER, ['o_sound']);
  const uniforms = getUniformLocations(gl, program, ['u_sampleRate', 'u_blockOffset', 'u_date', 'u_s1', 'u_s2', 'u_s3', 'u_s4', 'u_s5',
    'u_s6', 'u_s7', 'u_sv','u_time','u_p1','u_p2','u_p3','u_p4','u_p5','u_p6','u_p7','u_p8','u_p9']);

  const array = new Float32Array(2 * s8);
  const vbo = createVbo(gl, array, gl.DYNAMIC_COPY);
  const transformFeedback = gl.createTransformFeedback();

  const numBlocks = (audioCtx.sampleRate * s9) /s8;
  const outputL = audioBuffer.getChannelData(0);
  const outputR = audioBuffer.getChannelData(1);

  gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback);
  gl.enable(gl.RASTERIZER_DISCARD);
  gl.useProgram(program);
  gl.uniform1f(uniforms['u_date'], datev);
  gl.uniform1f(uniforms['u_s1'], s1);
  gl.uniform1f(uniforms['u_s2'], s2);
  gl.uniform1f(uniforms['u_s3'], s3);
  gl.uniform1f(uniforms['u_s4'], s4);
  gl.uniform1f(uniforms['u_s5'], s5);
  gl.uniform1f(uniforms['u_s6'], s6);
  gl.uniform1f(uniforms['u_s7'], s7);
  gl.uniform1f(uniforms['u_sv'], s10);
  gl.uniform1f(uniforms['u_p1'], p1);
  gl.uniform1f(uniforms['u_p2'], p2);
  gl.uniform1f(uniforms['u_p3'], p3);
  gl.uniform1f(uniforms['u_p4'], p4);
  gl.uniform1f(uniforms['u_p5'], p5);
  gl.uniform1f(uniforms['u_p6'], p6);
  gl.uniform1f(uniforms['u_p7'], p7);
  gl.uniform1f(uniforms['u_p8'], p8);
  gl.uniform1f(uniforms['u_p9'], p9);
gl.uniform1f(uniforms['u_time'], tiValue);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const textureImage = new Image();
  textureImage.onload = function () {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  };
  gl.uniform1f(uniforms['u_sampleRate'], audioCtx.sampleRate);

  for (let i = 0; i < numBlocks; i++) {
    gl.uniform1f(uniforms['u_blockOffset'], i * s8 / audioCtx.sampleRate);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, vbo);
    gl.beginTransformFeedback(gl.POINTS);
    gl.drawArrays(gl.POINTS, 0, s8);
    gl.endTransformFeedback();
    gl.getBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER, 0, array);

    for (let j = 0; j < s8; j++) {
      outputL[i * s8 + j] = array[j * 2];
      outputR[i * s8 + j] = array[j * 2 + 1];
    }
  }

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.5 * s9);
  gainNode.gain.setValueAtTime(1, audioCtx.currentTime + 0.5 * s9);
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + s9);

  const node = audioCtx.createBufferSource();
  node.buffer = audioBuffer;
  node.connect(gainNode).connect(audioCtx.destination);
  node.loop = false;

  return node;
}

const startButton = document.getElementById('startButton');
const date = document.getElementById('date');
const draft = document.getElementById('draft');
const buff1 = document.getElementById('buff1');
startButton.addEventListener('click', () => {
  tiValue2 = performance.now() / 1000;
});

let audioNode1 = null;
let audioNode2 = null;
let lastValidShaderCode = '';

function compileAndPlayAudio1() {
  let shaderCode = "#version 300 es\nout vec2 o_sound;\nuniform float u_blockOffset;\nuniform float u_s1;\nuniform float u_s2;\nuniform float u_s3;\nuniform float u_s4;\nuniform float u_s5;\nuniform float u_s6;\nuniform float u_s7;\nuniform float u_p1;\nuniform float u_p2;\nuniform float u_p3;\nuniform float u_p4;\nuniform float u_p5;\nuniform float u_p6;\nuniform float u_p7;\nuniform float u_p8;\nuniform float u_p9;\nuniform float u_time;\nuniform float u_sv;\nuniform float u_sampleRate;\nuniform float u_date;" + vertexShaderTextarea.value;

  if (audioNode1) {
    audioNode1.stop();
    audioNode1.disconnect();
  //  audioNode1 = null;
  }
  const tv1 = Date.now() * 0.0000001;
  const datev = (tv1 - Math.floor(tv1)) * 100000;
  const tiValue = performance.now() / 1000 - tiValue2;
  date.textContent = tiValue;
  try {
    audioNode1 = createAudio(shaderCode, datev, tiValue);
    audioNode1.start();
    lastValidShaderCode = shaderCode;

  } catch (error) {
    console.error('Error creating audio node:', error);
    if (lastValidShaderCode) {
      console.warn('Using last valid shader code.');
      audioNode1 = createAudio(lastValidShaderCode, datev, tiValue);
      audioNode1.start();
    } else {
      console.error('No valid shader code available.');
    }
  }
}

function compileAndPlayAudio2() {
  let shaderCode = "#version 300 es\nout vec2 o_sound;\nuniform float u_blockOffset;\nuniform float u_s1;\nuniform float u_s2;\nuniform float u_s3;\nuniform float u_s4;\nuniform float u_s5;\nuniform float u_s6;\nuniform float u_s7;\nuniform float u_p1;\nuniform float u_p2;\nuniform float u_p3;\nuniform float u_p4;\nuniform float u_p5;\nuniform float u_p6;\nuniform float u_p7;\nuniform float u_p8;\nuniform float u_p9;\nuniform float u_time;\nuniform float u_sv;\nuniform float u_sampleRate;\nuniform float u_date;" + vertexShaderTextarea.value;

  if (audioNode2) {
    audioNode2.stop();
    audioNode2.disconnect();
    //audioNode2 = null;
  }
  const tv1 = Date.now() * 0.0000001;
  const datev = (tv1 - Math.floor(tv1)) * 100000;
  const tiValue = performance.now() / 1000 - tiValue2;

  try {
    audioNode2 = createAudio(shaderCode, datev, tiValue);
    audioNode2.start();
    lastValidShaderCode = shaderCode;
  } catch (error) {
    console.error('Error creating audio node:', error);
    if (lastValidShaderCode) {
      console.warn('Using last valid shader code.');
      audioNode2 = createAudio(lastValidShaderCode, datev, tiValue);
      audioNode2.start();
    } else {
      console.error('No valid shader code available.');
    }
  }
}

setInterval(compileAndPlayAudio1, s9 * 1000);
setTimeout(compileAndPlayAudio2, s9 * 500);
setInterval(compileAndPlayAudio2,s9 * 1000);



  function createAudioBuff() {
    const DURATION = 60; // seconds
    //const SAMPLES = 65536;
    const SAMPLES  = 21845;
    const audioCtx = new AudioContext();
    const audioBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * DURATION, audioCtx.sampleRate);

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    const program = createTransformFeedbackProgram(gl, shaderCode, FRAGMENT_SHADER, ['o_sound']);
    const uniforms = getUniformLocations(gl, program, ['u_sampleRate', 'u_blockOffset', 'u_date', 'u_s1', 'u_s2', 'u_s3', 'u_s4', 'u_s5',
      'u_s6', 'u_s7', 'u_sv','u_time','u_p1','u_p2','u_p3','u_p4','u_p5','u_p6','u_p7','u_p8','u_p9']);
    const array = new Float32Array(2 * SAMPLES);
    const vbo = createVbo(gl, array, gl.DYNAMIC_COPY);
    const transformFeedback = gl.createTransformFeedback();
    const numBlocks = (audioCtx.sampleRate * DURATION) / SAMPLES;
    const outputL = audioBuffer.getChannelData(0);
    const outputR = audioBuffer.getChannelData(1);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, transformFeedback);
    gl.enable(gl.RASTERIZER_DISCARD);
    gl.useProgram(program);
    gl.uniform1f(uniforms['u_date'], datev);
    gl.uniform1f(uniforms['u_s1'], s1);
    gl.uniform1f(uniforms['u_s2'], s2);
    gl.uniform1f(uniforms['u_s3'], s3);
    gl.uniform1f(uniforms['u_s4'], s4);
    gl.uniform1f(uniforms['u_s5'], s5);
    gl.uniform1f(uniforms['u_s6'], s6);
    gl.uniform1f(uniforms['u_s7'], s7);
    gl.uniform1f(uniforms['u_sv'], s10);
    gl.uniform1f(uniforms['u_p1'], p1);
    gl.uniform1f(uniforms['u_p2'], p2);
    gl.uniform1f(uniforms['u_p3'], p3);
    gl.uniform1f(uniforms['u_p4'], p4);
    gl.uniform1f(uniforms['u_p5'], p5);
    gl.uniform1f(uniforms['u_p6'], p6);
    gl.uniform1f(uniforms['u_p7'], p7);
    gl.uniform1f(uniforms['u_p8'], p8);
    gl.uniform1f(uniforms['u_p9'], p9);
  gl.uniform1f(uniforms['u_time'], tiValue);
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const textureImage = new Image();
    textureImage.onload = function() {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    gl.uniform1f(uniforms['u_sampleRate'], audioCtx.sampleRate);

    for (let i = 0; i < numBlocks; i++) {
      gl.uniform1f(uniforms['u_blockOffset'], i * SAMPLES / audioCtx.sampleRate);
      gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, vbo);
      gl.beginTransformFeedback(gl.POINTS);
      gl.drawArrays(gl.POINTS, 0, SAMPLES);
      gl.endTransformFeedback();
      gl.getBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER, 0, array);

      for (let j = 0; j < SAMPLES; j++) {
        outputL[i * SAMPLES + j] = array[j * 2];
        outputR[i * SAMPLES + j] = array[j * 2 + 1];
      }
    }

    const node = audioCtx.createBufferSource();
    node.connect(audioCtx.destination);
    node.buffer = audioBuffer;
    node.loop = false;
    return node;
  }

let audioNodeBuff = null;
draft.addEventListener('click', () => {

     let shaderCode = "#version 300 es\nout vec2 o_sound;\nuniform float u_blockOffset;\nuniform float u_s1;\nuniform float u_s2;\nuniform float u_s3;\nuniform float u_s4;\nuniform float u_s5;\nuniform float u_s6;\nuniform float u_s7;\nuniform float u_p1;\nuniform float u_p2;\nuniform float u_p3;\nuniform float u_p4;\nuniform float u_p5;\nuniform float u_p6;\nuniform float u_p7;\nuniform float u_p8;\nuniform float u_p9;\nuniform float u_time;\nuniform float u_sv;\nuniform float u_sampleRate;\nuniform float u_date;" + vertexShaderTextarea.value;
        if (audioNodeBuff) {
            // If audio node exists, stop and destroy it
            audioNodeBuff.stop();
            audioNodeBuff.disconnect();
        }
        const tv1 = Date.now()*0.0000001;
        datev = (tv1-Math.floor(tv1))*100000;
        tiValue = performance.now() / 1000-tiValue2;
        date.textContent =tiValue;
        audioNodeBuff = createAudioBuff(); // Create new audio node
        audioNodeBuff.start(); // Start the audio with the calculated offset

});
