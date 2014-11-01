// Creates our Leap Controller


function convertToRange(val, in_range, out_range) {
	// ranges are 2 value arrays, in min + max, out min + max
	var in_min = in_range[0], in_max = in_range[1]
	var out_min = out_range[0], out_max = out_range[1];
	return (val - in_min) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
}



var controller = new Leap.Controller();


var note = new synthNote(200);
note.makeMeAnOsc();
var synth = new analyzeDest([note]);
synth.play(0);


// Tells the controller what to do every time it sees a frame
controller.on('frame', function(frame) {
    //Clears the canvas so we are not drawing multiple frames   
    // c.clearRect(0, 0, width, height);

    
    // First we loop through all of the hands that the frame sees
    for (var i = 0; i < frame.hands.length; i++) {
        // For each hand we define it
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
        
        // console.log(handPos);
        // console.log(handPitch);
        // console.log(handRoll);
        // console.log(handYaw);

        handColor = Math.floor(Math.abs(handPitch * 200));
        // c.fillStyle = 'rgb(' + handColor + ', 100, 0)';
        
        // // Creating the path for the hand circle
        // c.beginPath();
        
        // Draw a circle at the hand position
        // c.arc(
        //     handPos[0], handPos[1], handPos[2],
        //     Math.PI - Math.PI * handRoll / 2,
        //     -(Math.PI * hand.roll() / 2)
        // );
        
        // c.closePath();
        // c.fill();
    }
});

// Get frames rolling by connecting the controller
controller.connect();
