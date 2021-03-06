var controller = new Leap.Controller({
    enableGestures: true
});

var note1 = new synthNote(200);
var note2 = new synthNote(200);
var note3 = new synthNote(200);

note1.makeMeAnOsc();
note2.makeMeAnOsc();
note3.makeMeAnOsc();

var synthArray = [
    new playback([note1]),
    new playback([note2]),
    new playback([note3])
]

var sample1 = new Sample('audios/Laugh-Evil1.mp3');
var sample2 = new Sample('audios/haha1.wav');
var thunderBackdrop = new Sample('audios/thunder.mp3');
thunderBackdrop.loadBuffer(function(_this){
    console.log('finish loading backdrop');
    _this.play(0);
});
thunderBackdrop.setLoop(true);
sample1.loadBuffer();
sample2.loadBuffer();

function convertToRange(val, in_range, out_range) {
    // ranges are 2 value arrays, in min + max, out min + max
    var in_min = in_range[0],
        in_max = in_range[1]
    var out_min = out_range[0],
        out_max = out_range[1];
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function synthHands(frame) {
    if (frame.hands.length == 0) {
        synthArray[0].stop(0);
        synthArray[1].stop(0);
    } else if (frame.hands.length == 1) {
        synthArray[0].play(0);
    } else {
        synthArray[0].play(0);
        synthArray[1].play(0);
    }

    for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i],
            handPos = hand.palmPosition,
            handPitch = hand.pitch(),
            handRoll = hand.roll(),
            handYaw = hand.yaw(),

            freq = convertToRange(handPos[1], [0, 400], [200, 3000]),
            gain = convertToRange(handPos[2], [-200, 300], [0, 0.18]);

        synthArray[i].updateGain(gain, 0);
        synthArray[i].updateFreq(freq, 0);

        if (handPos[0] < 0) {
            synthArray[i].squareWave(0);
        } else {
            synthArray[i].sinWave(0);
        }
    }
}

function handGestureNoises(frame) {
    if (frame.valid && frame.gestures.length > 0) {
        frame.gestures.forEach(function(gesture) {
            switch (gesture.type) {
                case "circle":
                    console.log("Circle Gesture");
                    sample2.play(0);
                    break;
                case "keyTap":
                    console.log("Key Tap Gesture");
                    break;
                case "screenTap":
                    console.log("Screen Tap Gesture");
                    break;
                case "swipe":
                    console.log("Swipe Gesture");
                    sample1.play(0);
                    break;
            }
        });
    }
}

// The leap-plugin file included above gives us a number of plugins out of the box
// To use a plugins, we call `.use` on the controller with options for the plugin.
// See js.leapmotion.com/plugins for more info


controller.on('riggedHand.meshAdded', function(handMesh, leapHand) {
    handMesh.material.opacity = 1;
});

// Play sound
controller.on('frame', function(frame) {
    handGestureNoises(frame);
    synthHands(frame);
    window.composer.render();
});

//  Set up hand model
controller.use('riggedHand', {
    scale: 1,
    boneColors: function(boneMesh, leapHand) {
        return {
            hue: .5,
            saturation: 0,
            lightness: 1
        }
    }
});

var camera = controller.plugins.riggedHand.camera;
camera.position.set(0, 20, -25);
camera.lookAt(new THREE.Vector3(0, 3, 0));

welcomeSequence();

function autoPlay() {
    controller.use('playback', {
        // This is a compressed JSON file of preprecorded frame data
        recording: 'playback-recording.lz',
        // How long, in ms, between repeating the recording.
        timeBetweenLoops: 1000,
        pauseOnHand: true
    });
}


function welcomeSequence() {
    $('canvas').hide();
    $('#fogHolder').hide()
    $('#salutations').hide();
    $('#salutations').fadeIn(2500);
    $('#takeMeIn').click( function(){
        sample1.play(0)
        $('#salutations').fadeOut(200);
        $('#fogHolder').fadeIn(600);
        $('canvas').fadeIn(800);
        controller.connect();

        if (!controller.connected() ) {
            console.log('start the tape');
            autoPlay();
        }
    })
}







