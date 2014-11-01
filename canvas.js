// Get the canvas DOM element 
var canvas = document.getElementById('canvas');

// Making sure we have the proper aspect ratio for our canvas
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Create the context we will use for drawing
var c =  canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

// Creates our Leap Controller
var controller = new Leap.Controller();

CONTEXT = new AudioContext();

var note = new synthNote(200);
note.makeMeAnOsc();
var synth = new analyzeDest([note]);
synth.play(0);



// The leapToScene function takes a position in leap space 
// and converts it to the space in the canvas.
// It does this by using the interaction box, in order to 
// make sure that every part of the canvas is accesible 
// in the interaction area of the leap
function leapToScene(frame, leapPos) {
    // Gets the interaction box of the current frame
    var iBox = frame.interactionBox,
    
    // Gets the left border and top border of the box
    // In order to convert the position to the proper
    // location for the canvas
        left = iBox.center[0] - (iBox.size[0] / 2),
        top = iBox.center[1] + (iBox.size[1] / 2),
    
    // Takes our leap coordinates, and changes them so
    // that the origin is in the top left corner 
        x = leapPos[0] - left,
        y = leapPos[1] - top,
        z = leapPos[2] + 75;
    
    // Divides the position by the size of the box
    // so that x and y values will range from 0 to 1
    // as they lay within the interaction box
    x /= iBox.size[0];
    y /= iBox.size[1];
    
    // Uses the height and width of the canvas to scale
    // the x and y coordinates in a way that they 
    // take up the entire canvas
    x *= width;
    y *= height;
    
    return [x, -y, z];
}


// Tells the controller what to do every time it sees a frame
controller.on('frame', function(frame) {
    //Clears the canvas so we are not drawing multiple frames   
    c.clearRect(0, 0, width, height);

    
    // First we loop through all of the hands that the frame sees
    for (var i = 0; i < frame.hands.length; i++) {
        // For each hand we define it
        var hand = frame.hands[i],
            handPos = leapToScene(frame, hand.palmPosition),
            handPitch = hand.pitch(),
            handRoll = hand.roll(),
            handYaw = hand.yaw(),
            freq = (handPos[1] + 300) * 3;

        console.log(note);
        synth.updateFreq(freq, 0);
        
        
        // console.log(handPos);
        // console.log(handPitch);
        // console.log(handRoll);
        // console.log(handYaw);

        handColor = Math.floor(Math.abs(handPitch * 200));
        c.fillStyle = 'rgb(' + handColor + ', 100, 0)';
        
        // Creating the path for the hand circle
        c.beginPath();
        
        // Draw a circle at the hand position
        c.arc(
            handPos[0], handPos[1], handPos[2],
            Math.PI - Math.PI * handRoll / 2,
            -(Math.PI * hand.roll() / 2)
        );
        
        c.closePath();
        c.fill();
    }
});

// Get frames rolling by connecting the controller
controller.connect();