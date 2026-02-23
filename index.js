//Card Constructor
function Card(title, medium, sourceIMG, description){
    this.title = title;
    this.medium = medium;
    this.sourceIMG = sourceIMG;
    this.description = description;
}

const project1 = new Card("Butterfly", "design", "images/butterfly.png","A simple illustration of butterflies cresting on a sunset")
const project2 = new Card("Snapped", "design", "images/snapped.jpg", "A physical ink drawing of a resting figure in wrapped bandages")
const project3 = new Card("Support", "design", "images/support.png", "A peach tree sprouts from hands of stone")
const project4 = new Card("The Nexus", "website", "images/theNexus.png", "A mock website for an assignment designed to emulate the brand identity of Meow Wolf")
const project5 = new Card("Sustainable Food Systems", "website", "images/foodSystems.png", "Professional work commissioned by the head of Sustainable Food at CSUSB")

//REMEMBER TO ADD THE PROJECT AS A CONST AND ADD TO THE ARRAY
var allCards = [project1, project2, project3, project4, project5]

//Search on load
window.addEventListener("DOMContentLoaded",function(){
    const designButton = document.getElementById("design")
    const websitesButton = document.getElementById("websites")
        designButton.addEventListener("click", function(){
            workDisplay("design")})
        websitesButton.addEventListener("click", function(){
            workDisplay("website")})
    
    
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category === "design") workDisplay("design");
    if (category === "websites") workDisplay("website")

})

//THE FILTER. Shows items on click
function workDisplay(mediumType){
    let workContainer = document.getElementById("workContainer");
    let popUp = document.getElementById("popUp");
    workContainer.innerHTML = "";
    
    for (let i = 0; i < allCards.length; i++){
        if (allCards[i].medium === mediumType){
            let cardData = allCards;
            let cardElement = document.createElement("div")
            let title = document.createElement("h3");
            title.textContent = allCards[i].title;

            let image = document.createElement("img");
            image.src = allCards[i].sourceIMG;

            cardElement.appendChild(title);
            cardElement.appendChild(image);
            workContainer.appendChild(cardElement);

            cardElement.addEventListener("click", function(){
                popUp.innerHTML = "";
                popUp.classList.remove("hidden")
                let bigTitle = document.createElement("h2");
                    bigTitle.textContent = allCards[i].title
                let bigImage = document.createElement("img");
                    bigImage.src = allCards[i].sourceIMG;
                let description = document.createElement("p");
                    description.textContent = allCards[i].description;
                let backBtn = document.createElement("a");
                    backBtn.href = "#"
                    backBtn.textContent = "BACK";
                backBtn.addEventListener("click", function(e){
                    e.preventDefault();
                    popUp.classList.add("hidden")
                })
                
                popUp.appendChild(bigImage);
                popUp.appendChild(bigTitle);
                popUp.appendChild(description);
                popUp.appendChild(backBtn);

            })
        }
    }
}

//JS GALAXY CANVAS


// ─────────────────────────────────────────────
// SETUP
// Get the canvas element and its 2D drawing context.
// The context (ctx) is the object we call all drawing commands on.
// W and H store the canvas dimensions, updated on resize.
// ─────────────────────────────────────────────
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H;

// These arrays hold all our scene objects.
// We rebuild them whenever the window resizes.
let stars = [];
let nebulae = [];


// ─────────────────────────────────────────────
// RESIZE HANDLER
// Called on load and whenever the window resizes.
// Snaps the canvas to fill the full window, then
// rebuilds the scene so star density stays consistent.
// ─────────────────────────────────────────────
function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  buildScene();
}


// ─────────────────────────────────────────────
// UTILITY HELPERS
// rand(a, b) — returns a random float between a and b
// pick(arr)  — returns a random element from an array
// ─────────────────────────────────────────────
function rand(a, b) { return a + Math.random() * (b - a); }
function pick(arr)  { return arr[Math.floor(Math.random() * arr.length)]; }


// ─────────────────────────────────────────────
// STAR COLOR
// Returns a hex color string. Most stars are white,
// but we occasionally pick blue-white, warm yellow,
// orange, or red to mimic real stellar color variation.
// ─────────────────────────────────────────────
function starColor() {
  const r = Math.random();
  if (r < 0.55) return '#ffffff'; 
  if (r < 0.70) return '#cce0ff'; 
  if (r < 0.82) return '#5e94b6'; 
  if (r < 0.91) return '#9ca7dc'; 
  return '#ffd0d0';               
}


// ─────────────────────────────────────────────
// BUILD SCENE
// Creates all star and nebula objects and stores them
// in their arrays. Called on every resize.
//
// Star count scales with screen area so density stays
// consistent on any screen size.
// ─────────────────────────────────────────────
function buildScene() {
  stars = [];
  nebulae = [];

  const count = Math.floor((W * H) / 3000);

  for (let i = 0; i < count; i++) {

    // 'layer' is a 0–1 value representing depth.
    // 0 = far away (small, slow), 1 = close (large, fast).
    // This single value drives both size and speed,
    // creating a parallax effect across the star field.
    const layer = Math.random();

    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,

      // Distant stars are tiny dots; close ones are larger
      r: layer < 0.6 ? rand(0.3, 1.0)
       : layer < 0.9 ? rand(1.0, 2.2)
       :               rand(2.2, 4.0),

      // Close stars drift faster — this is what creates parallax
      speed: 0.009 + layer * 0.2,

      // Each star drifts in its own fixed direction (radians)
      angle: Math.random() * Math.PI * 2,

      // Twinkle: each star gets a unique phase and speed
      // so they don't all pulse in sync with each other
      twinkleOffset: Math.random() * Math.PI * 2,
      twinkleSpeed:  rand(0.3, 1.2),

      color: starColor(),
      layer,
    });
  }
}


// ─────────────────────────────────────────────
// SHOOTING STARS
// Shooting stars are kept in their own separate array
// and managed independently from the regular star field.
// ─────────────────────────────────────────────
const shooters = [];

function spawnShooter() {
  shooters.push({
    x: rand(0, W),
    y: rand(0, H * 0.5),       // only spawn in the top half
    len: rand(80, 220),         // tail length in pixels
    speed: rand(8, 16),         // much faster than regular stars
    angle: Math.PI / 4 + rand(-0.3, 0.3), // roughly diagonal (down-right)
    life: 1,                    // starts at full opacity
    decay: rand(0.012, 0.025),  // how fast it fades out each frame
  });
}

// Randomly attempt to spawn a shooter every 3 seconds.
// The 0.4 probability means roughly 1 in 2.5 attempts fires.
setInterval(() => { if (Math.random() < 0.4) spawnShooter(); }, 1000);


// ─────────────────────────────────────────────
// MAIN ANIMATION LOOP
// requestAnimationFrame calls draw() ~60 times per second.
// Each frame we: clear the canvas, draw nebulae, draw stars,
// then draw shooting stars on top.
// ─────────────────────────────────────────────
let t = 0; // global time counter, incremented each frame

function draw() {
  requestAnimationFrame(draw);
  t += 0.016; // roughly matches 60fps (1/60 ≈ 0.016)

  // Clear the canvas with a near-black deep space color
  ctx.fillStyle = '#00010a';
  ctx.fillRect(0, 0, W, H);


  // ── DRAW NEBULAE ────────────────────────────
  // Drawn first so they sit behind everything else.
  // Each nebula is a radial gradient stretched into an ellipse
  // by scaling the canvas context before drawing.



  // ── DRAW STARS ──────────────────────────────
  stars.forEach(s => {

    // Move the star in its drift direction each frame.
    // Math.cos gives the X component of the angle,
    // Math.sin gives the Y component. Multiplying by speed
    // controls how far it moves per frame.
    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;

    // Wrap stars that drift off the edge to the opposite side
    if (s.x < -5)  s.x = W + 5;
    if (s.x > W+5) s.x = -5;
    if (s.y < -5)  s.y = H + 5;
    if (s.y > H+5) s.y = -5;

    // Twinkle: Math.sin oscillates between -1 and 1 over time.
    // We scale that to a 0.65–1.0 range so the star never
    // fully disappears — just gently dims and brightens.
    const tw = 0.65 + 0.35 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset);

    // Combine twinkle with layer depth: far stars are dimmer overall
    const alpha  = tw * (0.4 + s.layer * 0.6);

    // Also slightly pulse the radius so it feels like it's breathing
    const radius = s.r * (0.9 + 0.1 * tw);

    ctx.save();
    ctx.globalAlpha = alpha;

    // Medium and large stars get a soft radial glow halo
    if (s.r > 1.8) {
      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
      glow.addColorStop(0,   s.color);
      glow.addColorStop(0.4, s.color + '55'); // semi-transparent mid point
      glow.addColorStop(1,   'transparent');
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
    }

    // Draw the star's solid core dot
    ctx.beginPath();
    ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.fill();

    // The very biggest stars also get cross-shaped diffraction spikes,
    // like you'd see looking at a bright star through a telescope
    if (s.r > 2.8) {
      ctx.globalAlpha = alpha * 0.25;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 0.5;
      const fl = s.r * 8 * tw; // spike length also pulses with twinkle
      ctx.beginPath();
      ctx.moveTo(s.x - fl, s.y); ctx.lineTo(s.x + fl, s.y); // horizontal
      ctx.moveTo(s.x, s.y - fl); ctx.lineTo(s.x, s.y + fl); // vertical
      ctx.stroke();
    }

    ctx.restore();
  });


  // ── DRAW SHOOTING STARS ─────────────────────
  // We loop backwards so we can safely splice (remove)
  // entries from the array without messing up the index.
  for (let i = shooters.length - 1; i >= 0; i--) {
    const s = shooters[i];

    // The tail end is behind the head — subtract the direction vector
    const ex = s.x - Math.cos(s.angle) * s.len;
    const ey = s.y - Math.sin(s.angle) * s.len;

    // Draw the tail as a line with a gradient:
    // bright white at the head, fading to transparent at the tail
    const g = ctx.createLinearGradient(s.x, s.y, ex, ey);
    g.addColorStop(0,   `rgba(255, 255, 255, ${s.life * 0.9})`);
    g.addColorStop(0.3, `rgba(200, 220, 255, ${s.life * 0.4})`);
    g.addColorStop(1,   'rgba(180, 200, 255, 0)');

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.5 * s.life; // line also gets thinner as it fades
    ctx.stroke();

    // Advance the position along its angle
    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;

    // Reduce life each frame; remove it once fully faded
    s.life -= s.decay;
    if (s.life <= 0) shooters.splice(i, 1);
  }
}


// ─────────────────────────────────────────────
// START
// ─────────────────────────────────────────────
window.addEventListener('resize', resize);
resize(); // sets W/H, builds the scene
draw();   // kicks off the animation loop