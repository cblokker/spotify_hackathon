// Set up the controller:
Leap.loop({
    background: true
}, {
    hand: function(hand) {}
});

// Adds the rigged hand and playback plugins
// to a given controller, providing a cool demo.
visualizeHand = function(controller) {
    // The leap-plugin file included above gives us a number of plugins out of the box
    // To use a plugins, we call `.use` on the controller with options for the plugin.
    // See js.leapmotion.com/plugins for more info

    controller.use('playback', {
        // This is a compressed JSON file of preprecorded frame data
        recording: 'leap-playback-recording-90fps.json',
        // How long, in ms, between repeating the recording.
        timeBetweenLoops: 1000,
        pauseOnHand: true
    }).on('riggedHand.meshAdded', function(handMesh, leapHand) {
        handMesh.material.opacity = 1;
    });

    var overlay = controller.plugins.playback.player.overlay;
    overlay.style.right = 0;
    overlay.style.left = 'auto';
    overlay.style.top = 'auto';
    overlay.style.padding = 0;
    overlay.style.bottom = '13px';
    overlay.style.width = '180px';

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
