const el = document.querySelector('#machine');
const audio = document.getElementById("spin-sound");

const SPIN_DELAY_MS = 100;
const SPIN_DURATION_MS = 2000;
const NUM_SLOTS = 50;
const MAX_X = 40;
var date = new Date();
var lastSpinTime = date.getTime();

function generateLabels() {
  labels_ = [];
  for (i = 0; i < NUM_SLOTS; i++) {
    labels_.push("test " + "X".repeat(i > MAX_X ? MAX_X : i));
  }
  return labels_;
}

let prevLabels = null;
let labels = generateLabels()

function populateSlots() {
  for (i = 0; i < labels.length; i++) {
    var tile = document.createElement("DIV");
    tile.innerHTML = labels[i];
    tile.setAttribute("class", "slot-tile slot" + i);
    if (labels[i].length > 15) {
      // tile.setAttribute("class", "slot-tile small-font");
    }
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

function setTextSizes() {
  for (i = 0; i++ ; i < NUM_SLOTS) {
    $(".slot" + i).fitText(0.8);
  }
}

function spinWheel(event) {
  if (event == null) {
    return false;
  }
  var x = event.x || event.clientX;
  var y = event.y || event.clientY;
  if (!x && !y) {
      return false;
  }
  date = new Date()
  if (date.getTime() - lastSpinTime > SPIN_DELAY_MS) {
    audio.play();
    removeSlots();
    populateSlots(shuffle(labels));
    startSpinning();
    setTimeout(stopSpinning, SPIN_DURATION_MS);
    lastSpinTime = date.getTime();
  }
}

function openFile(event) {
  event.stopPropagation();
  document.getElementById('attachment').value = null;
  date = new Date()
  if (date.getTime() - lastSpinTime > SPIN_DELAY_MS) {
    let key = event.key.toUpperCase();
    if ( key == 'O' ) {
      document.getElementById('attachment').click();
    }
    lastSpinTime = date.getTime();
  }
}

function setUpListeners() {
  document.addEventListener("click", spinWheel);
  document.addEventListener("keydown", openFile);
}

function removeListeners() {
  if (labels == null) {
    return;
  }
  document.removeEventListener("click", spinWheel);
  document.removeEventListener("keydown", openFile);
}

function updateList(input){
  console.log("updateList");
  document.getElementById('attachment').files[0].text().then(text => labels = text.match(/[^\r\n]+/g));
  resetMachine()
  // resetMachine(input.split('\n'));
}

function resetMachine() {
  removeSlots();
  removeListeners(this.prevLabels)
  populateSlots(this.labels);
  // setTextSizes();
  setUpListeners(this.labels); 
  this.prevLabels = labels;
}

resetMachine();