let age;
var createBallon = true;
let count=0;


function submitOverlay() {
  age = document.getElementById("overlayInput").value;
  console.log("Input Value:", age);
  document.getElementById("overlay").style.display = "none";
  spawnBalloon();
  audio.hbd.play()
}

function spawnBalloon() {
  if (createBallon) {
    const balloon = document.createElement("div");
    balloon.textContent = "🎈"; // Use balloon emoji
    balloon.style.position = "absolute";
    balloon.style.fontSize = "8vw"; // Responsive font size
    balloon.style.left = `${Math.random() * (window.innerWidth - 64)}px`; // Random horizontal start
    balloon.style.bottom = "-250px"; // Start out of view
    // balloon.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
    balloon.style.cursor = "pointer"; // Indicates clickable
    document.getElementById("balloons").appendChild(balloon);

    let moveInterval = moveBalloon(balloon); // Start moving the balloon

    balloon.addEventListener("click", function () {
      popBalloon(balloon, moveInterval);
    })

    balloon.addEventListener("touchstart", function (event) {
      event.preventDefault(); // Prevents mouse event
      popBalloon(balloon, moveInterval);
    });

    setTimeout(spawnBalloon, Math.random() * 420 + 420); // Random delay for new balloon
  }
  else{
    console.log("ok")
    document.getElementById("balloons").style.display="none";
    document.getElementById("canvas").style.display="block";
  }
}

function moveBalloon(balloon) {
  let moveInterval = setInterval(() => {
    let currentBottom = parseInt(balloon.style.bottom, 10);
    currentBottom += 4; // Move up
    balloon.style.bottom = `${currentBottom}px`;
    if (currentBottom > window.innerHeight) {
      clearInterval(moveInterval);
      balloon.remove(); // Clean up off-screen
    }
  }, 20);
  return moveInterval;
}

function popBalloon(balloon, moveInterval) {
  count++;
  clearInterval(moveInterval); // Stop the balloon's movement
audio.pop.play()
  balloon.textContent = "💥"; // Change to explosion emoji
  balloon.style.filter = "none"; // Remove hue rotation filter to reset colors

  setTimeout(() => {
    balloon.remove(); // Remove the balloon after a short delay
  }, 300);

  const counter = document.getElementById("balloons_popped");
  counter.textContent = count;
  if (count >= age) {
    console.log("yesthis")
    createBallon = false;
  }
}
