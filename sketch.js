let cloudImage;
let birdMask;
let sunriseImage;
let beachImage;
let sounds = [];

function preload() {
  sunriseImage = loadImage('./images/sunrise.jpg'); // Load the sunrise image
  cloudImage = loadImage('./images/clouds.jpg'); // Load the cloud image
  beachImage = loadImage('./images/beach.jpg'); // Load the beach image
  sounds[0] = loadSound('assets /morning-birdsong-246402.mp3'); // Sunrise audio
  sounds[1] = loadSound('assets /birds-taking-off-fly-6277.mp3'); // Clouds audio
  sounds[2] = loadSound('assets /waves-bouncing-on-port-30644.mp3'); // Beach audio
}


function setup() {
    createCanvas(500, 400);

  // Create a graphics object to draw the bird shape for masking
  birdMask = createGraphics(width, height);

  drawDove(birdMask); // Draw the bird shape on the mask
  cloudImage.mask(birdMask); // Apply the bird shape as a mask on the cloud image
}

  function draw() {
    background(0, 100, 200); // Set background color

    // Display the masked cloud image, so it appears in the shape of the bird
    image(cloudImage, 0, 0, width, height);
  }

  function drawDove(pg) {
    pg.fill(255); // Fill white for the mask

    pg.noStroke();

    pg.beginShape();

    // Pigeon's head
    pg.vertex(200, 150);
    pg.bezierVertex(172, 141, 160, 74, 73, 3); // top wings
    pg.bezierVertex(155, 188, 109, 98, 82, 152); // head curve
    pg.bezierVertex(137, 126, 105, 144, 70, 149); //  Mouth curve

    // Neck of the pigeon
    pg.bezierVertex(135, 166, 98, 196, 166, 244); // Neck Curve

    // Body and tail of the pigeon
    pg.bezierVertex(169, 246, 238, 282, 198, 260); // body curve
    pg.bezierVertex(332, 396, 392, 292, 249, 250); // Tail curve
    pg.bezierVertex(231, 200, 305, 260, 343, 160); // Tail curve

    // Pigeon's Wings
    pg.bezierVertex(241, 274, 339, 195, 391, 89); // wing curve
    pg.bezierVertex(322, 96, 487, 89, 291, 74); // wing curve
    pg.bezierVertex(212, 57, 164, 165, 197, 155); // Wings back to the head

    pg.endShape(CLOSE);

    pg.beginShape();
    pg.vertex(239, 296);
    pg.vertex(294, 268);
    pg.vertex(357, 307);
    pg.vertex(284, 345);
    pg.endShape(CLOSE);
  }

  