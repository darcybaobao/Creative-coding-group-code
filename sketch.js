let cloudImage;
let sunriseImage;
let beachImage;
let c1, c2, c3;
let birdMask;
let button; 
let songs = []; // storing 3 songs 
let frame = 0; // Initialize frame for tracking background
let mainWingMovement= 0; // Offset for main wing flapping
let secondaryWingMovement= 0; // Offset for secondary wing flapping

let rayCount = 300;  // Rays in the background
let rayLength = 550;  // Length of each ray
let rotationSpeed = 0.1;  // Speed at which rays rotate
let startAngle = -45; // Start from the top left (45 degrees counterclockwise)



// Positions and sizes for each dove
let doveData = [
  { x: 800, y: 250, size: 1.0 },   // Large Dove
  { x: 600, y: 150, size: 0.6 }, 
  { x: 400, y: 50, size: 0.4 },  
  { x: 750, y: 50, size: 0.35 },  
  { x: 200, y: 50, size: 0.55 },  
];

function preload() {
  sunriseImage = loadImage('./images/sunrise.jpg'); // Load the sunrise image
  cloudImage = loadImage('./images/clouds.jpg'); // Load the cloud image
  beachImage = loadImage('./images/beach.jpg'); // Load the beach image
  soundFormats('mp3'); //Establishing the sound for p5 js
  songs[0] = loadSound('assets /morning-birdsong-246402.mp3'); // Sunrise audio
  songs[1] = loadSound('assets /birds-taking-off-fly-6277.mp3'); // Clouds audio
  songs[2] = loadSound('assets /waves-bouncing-on-port-30644.mp3'); // Beach audio
}

function setup() {
  createCanvas(800, 600);
  c1= color(247, 146, 195); //Pink 
  c2 = color(250, 125, 47); //Orange

  angleMode(DEGREES); 
  
  birdMask = createGraphics(width, height); // Create a graphics object for the bird mask
  songs[0].play(); // Play first sound track initially
  button = createButton('play');
  button.mousePressed(togglePlaying);
  button.html('play'); 
  background(21);


}

function draw() {
  
    //Draw the gradient background
    for(let y=0; y<height; y++){
      let n = map(y,0,height,0,1);
       let newc = lerpColor(c1,c2,n);
       stroke(newc);
       line(0,y,width, y);
     }

     for (let i = 0; i < rayCount; i++) {
      let angle = startAngle + i * (360 / rayCount);  // Spread rays evenly
      push();
      rotate(angle + frameCount * rotationSpeed);  // Animate the rays' rotation
      
      // Draw the rays starting from the center
      stroke(252, 236, 3);  // Yellow color for rays
      strokeWeight(2);
      line(0, 0, rayLength, 0);  // Draw each ray
  
      pop();  // Restore the previous drawing state
    }


  // Select the background image based on the frame
  let bgImage;
  if (frame === 0) bgImage = sunriseImage;
  else if (frame === 1) bgImage = cloudImage;
  else if (frame === 2) bgImage = beachImage;

  
  // Drawing each dove and setting up the properties
  doveData.forEach((dove, index) => {
    // Update dove position for horizontal movement
    dove.x -= 1;
    if (dove.x < -width) dove.x = width; // Loop each dove back to start when it leaves the canvas

    // Draw the bird shape on the mask graphic with animated wings
    birdMask.clear();
    drawDove(birdMask, dove.size);

    // Apply the bird mask to the background image and display it for each dove
    let maskedImage = bgImage.get();
    maskedImage.mask(birdMask);
    image(maskedImage, dove.x, dove.y, width * dove.size, height * dove.size);
  });

  // Changing the image frame and audio every 80 frames
  if (frameCount % 80 === 0) {
    songs.forEach(song => song.stop()); // Stop all sounds
    frame = (frame + 1) % 3; // Cycle through frames
    songs[frame].play(); // Play respective sound for the new frame
    console.log("Switched to frame:", frame);
  }
}

// Start music on mouse click
function mousePressed() {
  if (songs[frame].isLoaded() && !songs[frame].isPlaying()) {
    songs[frame].play();
  }
}


// Draw the dove shape with wing animation
function drawDove(pg, scale) {
  mainWingMovement = sin(frameCount * 0.1) * 10 * scale; // Scale main wing movement
  secondaryWingMovement = cos(frameCount * 0.1) * 5 * scale; // Scale secondary wing movement

  pg.fill(255); // White dove color
  pg.noStroke();

  pg.beginShape();
  // Pigeon's head
  pg.vertex(200, 150);
  pg.bezierVertex(172, 141, 160, 74, 73, 3); // top wings
  pg.bezierVertex(155 + secondaryWingMovement, 188, 109 + secondaryWingMovement, 98, 82, 152); // head curve w/ move
  pg.bezierVertex(137, 126, 105, 144, 70, 149); // Mouth curve

  // Neck of the pigeon
  pg.bezierVertex(135, 166, 98, 196, 166, 244); // Neck Curve

  // Body and tail of the pigeon
  pg.bezierVertex(169, 246, 238, 282, 198, 260); // body curve
  pg.bezierVertex(332, 396, 392, 292, 249, 250); // Tail curve
  pg.bezierVertex(231, 200, 305, 260, 343, 160); // Tail curve

  // Main Wing with animation
  pg.bezierVertex(241, 274 + mainWingMovement, 339, 195 - mainWingMovement, 391, 89); // main wing curve with movement
  pg.bezierVertex(322, 96 - mainWingMovement, 487, 89 + mainWingMovement, 291, 74); // another main wing curve with movement
  
  // Smaller Wing near head with independent animation
  pg.bezierVertex(212, 57, 164 + secondaryWingMovement, 165, 197, 155); // secondary wing curve with movement

  pg.endShape(CLOSE);

}

function togglePlaying() {
  let currentSong = songs[frame];
  
  if (!currentSong.isPlaying()) {
    console.log("Playing the song");
    currentSong.play();
    currentSong.setVolume(0.1);
    button.html('pause');
  } 
  
  else {
    console.log("Stopping the song");
    currentSong.stop();
    button.html('play');
  }
}
