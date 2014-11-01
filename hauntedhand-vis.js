// Set up the controller:
Leap.loop({
    background: true
}, {
    hand: function(hand) {}
});

// Adds the rigged hand and playback plugins
// to a given controller, providing a cool demo.
visualizeHand = function(controller) {

    var note = new synthNote(200);
    note.makeMeAnOsc();
    var synth = new playback([note]);

    // The leap-plugin file included above gives us a number of plugins out of the box
    // To use a plugins, we call `.use` on the controller with options for the plugin.
    // See js.leapmotion.com/plugins for more info

    controller.use('playback', {
        // This is a compressed JSON file of preprecorded frame data
        recording: 'playback-recording.lz',
        // How long, in ms, between repeating the recording.
        timeBetweenLoops: 1000,
        pauseOnHand: true
    });

    controller.on('riggedHand.meshAdded', function(handMesh, leapHand) {
        handMesh.material.opacity = 1;
    });

    // Play sound
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

            function convertToRange(val, in_range, out_range) {
                // ranges are 2 value arrays, in min + max, out min + max
                var in_min = in_range[0],
                    in_max = in_range[1]
                var out_min = out_range[0],
                    out_max = out_range[1];
                return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            }

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
};

visualizeHand(Leap.loopController);
