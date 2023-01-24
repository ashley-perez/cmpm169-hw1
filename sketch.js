class Star {
    constructor(x, y, r, n) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.n = n
    }
  
    show() {
      push();
      translate(this.x, this.y);
      stroke(color('white'));
      fill(color("gold"));
      rotate(frameCount / 50.0);
      star(0, 0, this.r, this.r * 0.5, this.n);
      pop();
    }
  }
  
  function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
  
  function setup() {
    // createCanvas(710, 400);
    createCanvas(700,400)
    background(0);
    
    for (let i = 0; i < 100; i++) {
      let star = new Star(random(0,700), random(0,500), random(12), 5);
      star.show();
    }
    
    noStroke();
    fill(255);
    ellipse(0,0, 150, 150);
    // noStroke();
    fill(255,255,255,70);
    triangle(0,0, 100, 500, 1000, 500);
  }
  
  var lastColorChange = 0;
  let yoff = 0.0; // 2nd dimension of perlin noise
  var timeOut = 1200;
  
  function draw() {
    // array of colors
    // link to it: https://coolors.co/palette/e3f2fd-bbdefb-90caf9-64b5f6-42a5f5-2196f3-1e88e5-1976d2-1565c0-0d47a1
    var colors = [color('white'), color("#64B5F6"),color("#42A5F5"),color("#2196F3"),color("#1976D2"),color("#1565C0"), color("#0D47A1"), color("#90CAF9")];
    
    // change the color of the stroke after a certain timeout
    // millis() keeps track of total time elasped since start of program
    if (millis() - lastColorChange > timeOut) {
      var randomIndex = int(random(0,colors.length));
      stroke(colors[randomIndex]);
      lastColorChange = millis();
    }
    
    fill(color("#1E88E5")) // ocean shape color
  
    beginShape();
    
    let xoff = 0;
    // Iterate over horizontal pixels
    for (let x = 0; x <= width; x += 10) {
      let y = map(noise(xoff, yoff), 0, 1, 200, 300);
      y += frameCount / 20 // helps decrease the waves
      vertex(x, y);
      xoff += 0.025; // affects intensity of noise / how angular
    }
    // increment y dimension for noise
    yoff += 0.01; // affects the speed of the noise
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
    
  }  