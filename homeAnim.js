// FULL WORKING NEON WAVE ANIMATION WITH 6s STOP + FADE OUT (INSTANCE MODE)

new p5((p) => {

  let cnv;
  let stopAnimation = false;
  let startTime;
  let fadeOpacity = 1; // fade effect

  // Setup canvas inside #home section
  p.setup = function () {
    const home = document.getElementById("home");

    cnv = p.createCanvas(home.offsetWidth, home.offsetHeight);
    cnv.parent("home");
    cnv.id("home-canvas");

    startTime = p.millis(); // record when animation starts
  };

  // Draw neon waves every frame
  p.draw = function () {
    const elapsed = p.millis() - startTime;

    // After 6 seconds, start fade-out animation
    if (elapsed > 6000) {
      stopAnimation = true;
    }

    // If stop enabled → fade out smoothly
    if (stopAnimation) {
      fadeOpacity -= 0.02; // fade speed
      if (fadeOpacity <= 0) {
        fadeOpacity = 0;

        // hide canvas when faded
        const c = document.getElementById("home-canvas");
        if (c) c.style.display = "none";

        return;
      }
      p.push();
      p.clear();
      p.pop();
      return;
    }

    p.clear();

    // Top neon cyan wave
    neonWave(
      p.color(0, 255, 255, 220 * fadeOpacity),
      0.015,
      0.04,
      45,
      p.height * 0.40,
      4
    );

    // Bottom neon pink wave
    neonWave(
      p.color(255, 0, 255, 200 * fadeOpacity),
      0.02,
      0.03,
      35,
      p.height * 0.60,
      3
    );
  };

  // Neon wave generator function
  function neonWave(col, freq, speed, amp, ypos, weight) {
    p.stroke(col);
    p.strokeWeight(weight);
    p.noFill();

    p.drawingContext.shadowBlur = 30;
    p.drawingContext.shadowColor = col;

    p.beginShape();
    let t = p.frameCount * speed * 25;

    for (let x = 0; x <= p.width; x += 2) {
      let y = ypos + p.sin(x * freq + t) * amp;
      p.vertex(x, y);
    }

    p.endShape();
  }

  // Resize when window changes
  p.windowResized = function () {
    const home = document.getElementById("home");
    p.resizeCanvas(home.offsetWidth, home.offsetHeight);
  };

});
