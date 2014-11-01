console.log('hawo')

var AudioContext = new AudioContext();

function synthNote(freq) {
	this.freq = freq;
	this.osc;
	this.gain;
	this.isPlaying = false;

	
	var _this = this;

	this.makeMeAnOsc = function() {
		_this.osc = AudioContext.createOscillator();
		_this.gain = AudioContext.createGain()
		_this.osc.frequency.value = _this.freq;
		_this.osc.connect(_this.gain)
	}

	this.start = function() {
		_this.osc.start(0);
	}
	this.stop = function() {
		_this.osc.disconnect();	
	}
	this.connect = function(node){
		_this.gain.connect(node);
	}
	this.disconnect = function(){
		_this.gain.disconnect();
	}

}

var convolver = AudioContext.createConvolver();

document.addEventListener('DOMContentLoaded', function(){
 //  var _this = this; 
 //  var request = new XMLHttpRequest();
 //  request.open('GET', 'audios/stone.wav', true);
 //  request.responseType = 'arraybuffer';

 //  // Decode asynchronously
 //  request.onload = function () {
	//   convolver.buffer = AudioContext.createBuffer(request.response, false);
	// }  
	// request.send();
	


	verbImpulse = new Sample('audios/stone.wav');
	verbImpulse.loadBuffer();
  setTimeout(function() {
      convolver.buffer = verbImpulse.decodedBuffer;
  }, 1000);



});


function playback(synthNotes){
	
	this.notes = synthNotes;
	this.destination = AudioContext.destination;

	var _this = this;
 
	this.play = function(index){
		note = _this.notes[index]
		if (note.isPlaying) {
			return
		} else {
			note.makeMeAnOsc();
			_this.connectToOut(note);
			note.start(0);
			note.isPlaying = true;
		}		
	}
	this.stop = function(index) {
		note = _this.notes[index];
		_this.updateGain(0, index);
		window.setTimeout(note.disconnect, 7);
		note.isPlaying = false;
	}
	this.connectToOut = function(note){
		console.log("convolver: " + convolver);
		console.log("convolver buffer: " + convolver.buffer);
		note.connect(convolver);
		convolver.connect(AudioContext.destination)
	}
	this.updateFreq = function(val, index) {
		var note = _this.notes[index];
		note.osc.frequency.value = val;
	}
	this.updateGain = function(val, index) {
		var note = _this.notes[index];
		note.gain.gain.value = val;
	}
	this.squareWave = function(index) {
		var note = _this.notes[index];
		note.osc.type = 'square';
	}
	this.sawtoothWave = function(index) {
		var note = _this.notes[index];
		note.osc.type = 'sawtooth';
	}
	this.triangleWave = function(index) {
		var note = _this.notes[index];
		note.osc.type = 'triangle';
	}
	this.sinWave = function(index) {
		var note = _this.notes[index];
		note.osc.type = 'sine';
	}
}


// function distortion(synthNotes) {
// 	var distortion = AudioContext.createWaveShaper();
// 	this.notes = synthNotes;
// 	this.destination = AudioContext.destination

// 	var _this = this;

// 	function makeDistortionCurve(amount) {
// 	    var k = typeof amount === 'number' ? amount : 50,
// 		    n_samples = 44100,
// 		    curve = new Float32Array(n_samples),
// 		    deg = Math.PI / 180,
// 		    i = 0,
// 		    x;

// 		for ( ; i < n_samples; ++i ) {
// 		    x = i * 2 / n_samples - 1;
// 		    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
// 		}

// 	    return curve;
// 	};

// 	distortion.curve = makeDistortionCurve(400);
//     distortion.oversample = '4x';

//     console.log(distortion);
// }



