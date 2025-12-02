// bg.js - p5.js animated neon background for your portfolio

let cnv;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.style("position", "fixed");
  cnv.style("z-index", "-1");      // behind content
  cnv.style("pointer-events", "none"); // allow clicks through canvas
  pixelDensity(window.devicePixelRatio || 1);
}

function draw() {
  clear(); // keep canvas transparent so CSS background shows through

  // subtle background vignette (optional)
  noStroke();
  for (let i = 0; i < 4; i++) {
    let alpha = map(i, 0, 3, 10, 60);
    fill(10, 0, 30, alpha);
    rect(0, 0, width, height);
  }

  // draw multiple neon waves (pink, cyan, orange)
  drawNeonWave(color(255, 0, 255, 180), 0.011, 0.05, 40, height * 0.44, 3.2);
  drawNeonWave(color(0, 200, 255, 170), 0.013, 0.04, 30, height * 0.54, 2.1);
  drawNeonWave(color(255, 120, 0, 140), 0.009, 0.06, 22, height * 0.50, 1.6);

  // subtle thin trailing lines for depth
  drawThinTrail(color(255, 255, 255, 18), 0.012, 0.03, 6, height * 0.62);
}

function drawNeonWave(col, freq, speed, amp, ypos, strokeW) {
  push();
  stroke(col);
  strokeWeight(strokeW);
  drawingContext.shadowBlur = 28;
  drawingContext.shadowColor = `rgba(${red(col)}, ${green(col)}, ${blue(col)}, ${alpha(col)/255})`;
  noFill();

  beginShape();
  let off = frameCount * (speed * 60);
  for (let x = 0; x <= width; x += 2) {
    let y = ypos + sin((x * freq) + off) * amp;
    vertex(x, y);
  }
  endShape();
  pop();
}

function drawThinTrail(col, freq, speed, amp, ypos) {
  push();
  stroke(col);
  strokeWeight(1.2);
  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = `rgba(${red(col)}, ${green(col)}, ${blue(col)}, ${alpha(col)/255})`;
  noFill();
  beginShape();
  let off = frameCount * (speed * 60);
  for (let x = 0; x <= width; x += 3) {
    let y = ypos + sin((x * freq) + off + 200) * amp;
    vertex(x, y);
  }
  endShape();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
