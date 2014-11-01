
function samplePlay(buffer, when) {
  var source = AudioContext.createBufferSource(); 
  source.buffer = buffer;                    
  source.connect(AudioContext.destination);       
  source.start(when);
}




function Sample(urlPath, name) {
	this.urlPath = urlPath;
	this.name = name;
	this.decodedBuffer = [];
}

Sample.prototype = {
	// prepSamplePatterns : function() {
	// 	var _this = this;
	// 	for (var i = 0; i < _this.samplePatterns.length; i++) {
	// 		_this.prepOneSP( _this.samplePatterns[i]) 
	// 	}
	// },
	loadBuffer : function() {
		var _this = this; 
		var request = new XMLHttpRequest();
	  request.open('GET', _this.urlPath, true);
	  request.responseType = 'arraybuffer';

	  // Decode asynchronously
	  request.onload = function() {
	    AudioContext.decodeAudioData(request.response, function(buffer) {
	      _this.decodedBuffer = buffer;
	    }, function(){ console.log('oh shit')});
	  }
	  request.send();
	}
}
