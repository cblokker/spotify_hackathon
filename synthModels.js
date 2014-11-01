console.log('hawo')


function synthNote(freq) {
	this.freq = freq;
	this.osc;
	this.isPlaying = false;

	
	var _this = this;

	this.makeMeAnOsc = function() {
		_this.osc = CONTEXT.createOscillator();
		_this.osc.frequency.value = _this.freq;
	}
	this.start = function() {
		_this.osc.start(0);
	}
	this.stop = function() {
		_this.osc.disconnect();	
	}
	this.connect = function(node){
		_this.osc.connect(node);
	}
	this.disconnect = function(){
		_this.osc.disconnect();
	}
}


function analyzeDest(synthNotes){
	
	this.notes = synthNotes;
	this.destination = CONTEXT.destination

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
		note.disconnect();
		note.isPlaying = false;
	}
	this.connectToOut = function(note){
		note.connect(_this.destination);
	}
	// this.toggle = function(index) {
	// 	var note = _this.notes[index];
	// 	if (note.isPlaying){
	// 		_this.stop(note);
	// 		note.isPlaying = !(note.isPlaying);
	// 	} else {
	// 		_this.play(note);
	// 		note.isPlaying = !(note.isPlaying);
	// 	}
	// }
}












