let cloudImage, sunriseImage, beachImage;
let birdMask;
let birds = [];
let bgImages = [];
let songs = [];
let frame = 0;
let angleOffset = 0;

function preload() {
  // Load images
  sunriseImage = loadImage('./images/sunrise.jpg');
  cloudImage = loadImage('./images/clouds.jpg');
  beachImage = loadImage('./images/beach.jpg');
  bgImages = [sunriseImage, cloudImage, beachImage];
  
  // Load sound files
  soundFormats('mp3');
  songs[0] = loadSound('assets /birds-taking-off-fly-6277.mp3');
  songs[1] = loadSound('assets /birds-taking-off-fly-6277.mp3');
  songs[2] = loadSound('assets /waves-bouncing-on-port-30644.mp3');
}

function setup() {
  createCanvas(800, 800);
  birdMask = createGraphics(width, height);
  
  // Draw a larger dove shape for masking
  drawDove(birdMask);

  // Initialize multiple birds in circular positions with varying sizes
  for (let i = 0; i < 6; i++) {
    birds.push({
      angle: (PI / 3) * i, // Angle in circle
      radius: 300,         // Distance from center
      size: 1 - i * 0.1    // Decrease size for trailing birds
    });
  }

  // Play the first track
  songs[0].play();
}

function draw() {
  // Fixed blue background
  background(0, 100, 200);

  // Select the background image for each bird based on the frame
  let bgImage = bgImages[frame];

  // Draw each bird in a circular formation with different images
  for (let bird of birds) {
    let x = width / 2 + cos(bird.angle + angleOffset) * bird.radius;
    let y = height / 2 + sin(bird.angle + angleOffset) * bird.radius;

    // Mask the background image with the bird shape and resize it
    let maskedImage = bgImage.get();
    maskedImage.mask(birdMask);
    image(maskedImage, x - 150 * bird.size, y - 150 * bird.size, 300 * bird.size, 300 * bird.size);
  }

  // Increment the angle offset to create circular movement
  angleOffset += 0.01;

  // Every 180 frames, change the background image and play the respective sound
  if (frameCount % 180 === 0) {
    songs.forEach((s) => s.stop()); // Stop any currently playing sound
    frame = (frame + 1) % 3;        // Cycle to the next frame
    songs[frame].play();            // Play the corresponding sound for the new frame
  }
}

// Draw the dove shape with wing animation
function drawDove(pg, scale) {
    let mainWingMovement = sin(frameCount * 0.1) * 10 * scale; // Scale main wing movement
    let secondaryWingMovement = cos(frameCount * 0.1) * 5 * scale; // Scale secondary wing movement
  
    pg.fill(255); // White dove color
    pg.noStroke();
  
    pg.beginShape();
    // Pigeon's head
    pg.vertex(200, 150);
    pg.bezierVertex(172, 141, 160, 74, 73, 3); // top wings
    pg.bezierVertex(155+ secondaryWingMovement, 188, 109+ secondaryWingMovement, 98, 82, 152); // head curve
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
    pg.bezierVertex(212, 57, 164, 165, 197, 155); // secondary wing curve with movement
  
    pg.endShape(CLOSE);
  }