// 🌈 Neon Rainbow Plasma + Sparks + Glow Aura Cursor

let dots = [];
let sparks = [];
const maxDots = 50;
const maxSparks = 20;

// Create cursor glow
const glow = document.createElement("div");
glow.classList.add("cursor-glow");
document.body.appendChild(glow);

// Update glow position
// CURRENT MOUSE POSITION (even when not moving)
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let isMoving = false;

// Track mouse movement
window.addEventListener("mousemove", e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    isMoving = true;
});

window.addEventListener("touchmove", e => {
    const t = e.touches[0];
    cursorX = t.clientX;
    cursorY = t.clientY;
    isMoving = true;
});

// Keep animation alive even when mouse stops
function autoPlasma() {
    createDot(cursorX, cursorY);

    // Reset movement
    setTimeout(() => isMoving = false, 100);

    requestAnimationFrame(autoPlasma);
}

autoPlasma();


// Rainbow color generator
function rainbowColor(i) {
    const hue = (i * 12 + performance.now() / 20) % 360;
    return `hsl(${hue}, 100%, 60%)`;
}

function createDot(x, y) {
    const dot = document.createElement("div");
    dot.classList.add("trail-dot");

    dot.style.background = rainbowColor(dots.length);

    dot.style.left = x + "px";
    dot.style.top = y + "px";

    document.body.appendChild(dot);
    dots.push({ el: dot, life: 1 });

    if (dots.length > maxDots) {
        dots[0].el.remove();
        dots.shift();
    }

    createSpark(x, y);
}

// ✨ Sparks
function createSpark(x, y) {
    const spark = document.createElement("div");
    spark.classList.add("spark");

    spark.style.left = x + "px";
    spark.style.top = y + "px";

    // random movement
    const dx = (Math.random() - 0.5) * 40;
    const dy = (Math.random() - 0.5) * 40;

    document.body.appendChild(spark);

    sparks.push({ el: spark, life: 1, dx, dy });

    if (sparks.length > maxSparks) {
        sparks[0].el.remove();
        sparks.shift();
    }
}

function animate() {
    dots.forEach((dot, i) => {
        dot.life -= 0.02;
        dot.el.style.opacity = dot.life;
        dot.el.style.transform = `scale(${dot.life + 0.6})`;

        if (dot.life <= 0) {
            dot.el.remove();
            dots.splice(i, 1);
        }
    });

    sparks.forEach((s, i) => {
        s.life -= 0.04;

        s.el.style.opacity = s.life;
        s.el.style.transform = `translate(${s.dx}px, ${s.dy}px) scale(${s.life})`;

        if (s.life <= 0) {
            s.el.remove();
            sparks.splice(i, 1);
        }
    });

    requestAnimationFrame(animate);
}

window.addEventListener("mousemove", e => {
    createDot(e.clientX, e.clientY);
});

window.addEventListener("touchmove", e => {
    const t = e.touches[0];
    createDot(t.clientX, t.clientY);
});

animate();
