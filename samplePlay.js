function Sample(urlPath, name) {
    this.urlPath = urlPath;
    this.name = name;
    this.decodedBuffer = [];
    this.playing = false;
    this.loop = false;
}




Sample.prototype = {
    // prepSamplePatterns : function() {
    //  var _this = this;
    //  for (var i = 0; i < _this.samplePatterns.length; i++) {
    //      _this.prepOneSP( _this.samplePatterns[i]) 
    //  }
    // },
    setLoop : function(loop) {
        this.loop = loop; 
    },
    
    // callback is optional
    loadBuffer : function(callback) {

        var _this = this; 
        var request = new XMLHttpRequest();
        request.open('GET', _this.urlPath, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {
            AudioContext.decodeAudioData(request.response, function(buffer) {
            _this.decodedBuffer = buffer;
            if (callback != undefined) {
                callback(_this);
            }
        }, function(){ console.log('oh shit')});
      }
      request.send();
    },
    play : function(when) {
        var _this = this;

        if (_this.playing) {
            return
        } else {
            var source = AudioContext.createBufferSource();
            _this.playing = true;
            if (_this.loop != null ) {
                source.loop = _this.loop;
            }
            source.buffer = this.decodedBuffer;                    
            source.connect(AudioContext.destination);       
            source.start(when);

            setTimeout(function() {
                console.log("timeout");
                _this.playing = false;
            }, source.buffer.duration * 1000);
        }
    }
}
