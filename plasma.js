window.addEventListener("pointermove", e => {
    createDot(e.clientX, e.clientY);
    glow.style.left = e.clientX - 60 + "px";
    glow.style.top = e.clientY - 60 + "px";
});
