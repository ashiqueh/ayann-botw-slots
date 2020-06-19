const el = document.querySelector('#machine');
const audio = document.getElementById("spin-sound");

const SPIN_DELAY_MS = 100;
const SPIN_DURATION_MS = 2000;
const NUM_SLOTS = 50;
var date = new Date();
var lastSpinTime = date.getTime();


function generateLabels() {
  labels = [];
  for (i = 0; i < NUM_SLOTS; i++) {
    labels.push("test " + i);
  }
  return labels;
}

function populateSlots(labels) {
  for (i = 0; i < labels.length; i++) {
    var tile = document.createElement("DIV");
    tile.innerHTML = labels[i];
    tile.setAttribute("class", "slot-tile");
    // tile.setAttribute("id", "slot-tile" + i);
    el.appendChild(tile);
  }
}

function removeSlots() {
  el.innerHTML = '';
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function random_slot() {
  let a = Math.floor(Math.random() * NUM_SLOTS);
  console.log(a);
  return a;
}

function stopSpinning() {
    el.classList.add('carousel-stop');
    el.classList.remove('carousel-spin');
}

function startSpinning() {
    el.classList.remove('carousel-stop');
    el.classList.add('carousel-spin');
}

populateSlots(generateLabels());

document.addEventListener("click", function() {
  date = new Date()
  if (date.getTime() - lastSpinTime > SPIN_DELAY_MS) {
    audio.play();
    removeSlots();
    populateSlots(shuffle(generateLabels()));
    startSpinning();
    setTimeout(stopSpinning, SPIN_DURATION_MS);
    lastSpinTime = date.getTime();
  }
});