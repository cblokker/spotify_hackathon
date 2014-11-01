console.log('hawo')

AudioContext = new AudioContext

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


function analyzeDest(synthNotes){
	
	this.notes = synthNotes;
	this.destination = AudioContext.destination

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
		note.connect(_this.destination);
	}
	this.updateFreq = function(val, index) {
		var note = _this.notes[index]
		note.osc.frequency.value = val;
	}
	this.updateGain = function(val, index) {
		var note = _this.notes[index]
		note.gain.gain.value = val;
	}
}












