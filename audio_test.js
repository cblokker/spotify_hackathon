// Creates our Leap Controller
var controller = new Leap.Controller();

var note = new synthNote(200);
note.makeMeAnOsc();
var synth = new analyzeDest([note]);
synth.play(0);


// Tells the controller what to do every time it sees a frame
controller.on('frame', function(frame) {    
    for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i],
            handPos = hand.palmPosition,
            handPitch = hand.pitch(),
            handRoll = hand.roll(),
            handYaw = hand.yaw();

        // console.log(handPos[1]);

        freq = (handPos[1] * 1.5);
        console.log("handPos[1]: " + handPos[1]);
        console.log("freq:" + freq);

        synth.updateFreq(freq, 0);
        
    }
});


controller.connect();