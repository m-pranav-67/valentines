document.addEventListener("DOMContentLoaded", () => {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const intro = document.getElementById("intro");
    const gifts = document.getElementById("gifts");
    const heartContainer = document.getElementById("floating-hearts");

    /* NO button runs away */
    noBtn.addEventListener("mouseover", () => {
        noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
        noBtn.style.top = Math.random() * (window.innerHeight - 100) + "px";
    });

    /* YES click */
    yesBtn.addEventListener("click", () => {
        heartBurst();

        setTimeout(() => intro.classList.add("hidden"), 500);
        setTimeout(() => {
            intro.style.display = "none";
            gifts.classList.remove("hidden");
        }, 1400);
    });

    /* =========================
       FLOATING HEARTS GENERATOR
    ========================= */
    function createFloatingHeart() {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");

        heart.style.left = Math.random() * 100 + "vw";

        const size = Math.random() * 10 + 8;
        heart.style.width = size + "px";
        heart.style.height = size + "px";

        heart.style.opacity = Math.random() * 0.5 + 0.3;

        const duration = Math.random() * 6 + 6;
        heart.style.animationDuration = duration + "s";

        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    }

    setInterval(createFloatingHeart, 400);
});

/* =========================
   HEART BURST
========================= */
function heartBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const types = [
        "heart-classic",
        "heart-round",
        "heart-small",
        "heart-gradient",
        "heart-sparkle"
    ];

    const colors = [
        "#ff005d", "#ff8fab", "#ffdd00",
        "#00f2ff", "#c77dff", "#ffd166"
    ];

    const hearts = [];
    const count = 140;
    const duration = 900;

    for (let i = 0; i < count; i++) {
        const h = document.createElement("div");
        h.classList.add("heart", types[Math.floor(Math.random() * types.length)], "colorful");
        h.style.color = colors[Math.floor(Math.random() * colors.length)];
        h.style.left = centerX + "px";
        h.style.top = centerY + "px";

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 600 + 200;

        hearts.push({
            el: h,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            start: performance.now()
        });

        document.body.appendChild(h);
    }

    function animate(time) {
        hearts.forEach(h => {
            const p = Math.min((time - h.start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);

            h.el.style.transform =
                `translate(${h.x * eased}px, ${h.y * eased}px)`;

            if (p > 0.6) h.el.style.opacity = 1 - (p - 0.6) / 0.4;
            if (p >= 1) h.el.remove();
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

/* =========================
   GIFT LOGIC
========================= */
function openGift(num) {
    const boxes = document.querySelectorAll(".gift-box");
    const overlay = document.getElementById("giftOverlay");
    const content = document.getElementById("giftContent");

    boxes.forEach((b, i) => {
        b.classList.toggle("fade-out", i !== num - 1);
    });

    overlay.style.display = "flex";

    if (num === 1) {
        content.innerHTML = `
            <h2>Happy Valentine’s Day 💖</h2>
            <p>
                This is where you write your Valentine paragraph.
                Make it personal, warm, and from your heart.
            </p>
        `;
    }

    if (num === 2) {
        content.innerHTML = `
            <h2>Our Memories 📸</h2>
            <div class="photo-wrapper unlocked">
                <div class="photo-grid">
                    <img src="images/photo1.jpg">
                    <img src="images/photo2.jpg">
                    <img src="images/photo3.jpg">
                    <img src="images/photo4.jpg">
                </div>
            </div>
        `;
    }

    if (num === 3) {
        content.innerHTML = `
            <h2>Just For You 🎀</h2>
            <ul class="gift-list">
                <li>🍫 Chocolates</li>
                <li>🧸 A doll</li>
                <li>🌹 Flowers</li>
                <li>❤️ My love</li>
            </ul>
        `;
    }
}

function resetGifts(e) {
    if (e.target.id !== "giftOverlay") return;

    document.querySelectorAll(".gift-box")
        .forEach(b => b.classList.remove("fade-out"));

    document.getElementById("giftOverlay").style.display = "none";
}

/* =========================
   PHOTO VIEW + DOUBLE TAP LIKE
========================= */
let lastTapTime = 0;

document.addEventListener("click", e => {
    const img = e.target.closest(".photo-grid img");
    if (!img) return;

    const now = Date.now();
    if (now - lastTapTime < 300) {
        heartLikeBurst(img);
        lastTapTime = 0;
    } else {
        openPhoto(img);
        lastTapTime = now;
    }
});

function openPhoto(img) {
    const overlay = document.getElementById("photoOverlay");
    const overlayImg = document.getElementById("photoOverlayImg");

    overlayImg.src = img.src;
    overlay.style.display = "flex";
}

function closePhoto() {
    document.getElementById("photoOverlay").style.display = "none";
}

/* =========================
   LIKE HEART BURST
========================= */
function heartLikeBurst(img) {
    const rect = img.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 16; i++) {
        const heart = document.createElement("div");
        heart.classList.add("like-heart");

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80 + 20;

        heart.style.left = cx + "px";
        heart.style.top = cy + "px";
        heart.style.setProperty("--x", Math.cos(angle) * distance + "px");
        heart.style.setProperty("--y", Math.sin(angle) * distance + "px");

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 800);
    }
}
