var controller = new Leap.Controller();
var note = new synthNote(200);
note.makeMeAnOsc();
var synth = new analyzeDest([note]);


function convertToRange(val, in_range, out_range) {
	// ranges are 2 value arrays, in min + max, out min + max
	var in_min = in_range[0], in_max = in_range[1]
	var out_min = out_range[0], out_max = out_range[1];
	return (val - in_min) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
}




var controller = new Leap.Controller();

var note = new synthNote(200);
note.makeMeAnOsc();
var synth = new playback([note]);


// Tells the controller what to do every time it sees a frame
controller.on('frame', function(frame) {
    if (frame.hands.length == 0) {
        synth.stop(0);
    } else {
        synth.play(0);
    }

    for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i],
            handPos = hand.palmPosition,
            handPitch = hand.pitch(),
            handRoll = hand.roll(),
            handYaw = hand.yaw();

        var freq = convertToRange(handPos[1], [0, 400], [200, 3000]);
        var gain = convertToRange(handPos[2], [-200, 300], [1, 0]);

        console.log(handPos[0]);

        synth.updateGain(gain, 0);
        synth.updateFreq(freq, 0);

        if (handPos[0] < 0) {
            synth.squareWave(0);
        } else {
            synth.sinWave(0);
        }
    }
});

// var controller = Leap.loop({enableGestures: true}, function(frame){
//   if(frame.valid && frame.gestures.length > 0){
//     frame.gestures.forEach(function(gesture){
//         switch (gesture.type){
//           case "circle":
//               console.log("Circle Gesture");
//               break;
//           case "keyTap":
//               console.log("Key Tap Gesture");
//               break;
//           case "screenTap":
//               console.log("Screen Tap Gesture");
//               break;
//           case "swipe":
//               console.log("Swipe Gesture");
//               break;
//         }
//     });
//   }
// });



controller.connect();

