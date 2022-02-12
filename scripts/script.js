const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-selector");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
let wordsList = [
  "churchlinesses",
  "vig",
  "resolvers",
  "knucklers",
  "prolixities",
  "yardwand",
  "vorticose",
  "censuring",
  "exultant",
  "kibbitzer",
  "detailings",
  "cabresto",
  "sextuplicated",
  "flowerless",
  "casitas",
  "impressures",
  "thrombotic",
  "caricatural",
  "grivets",
  "blasties",
  "tarlatans",
  "shortest",
  "stringpiece",
  "screaky",
  "retransfer",
  "speedster",
  "benevolent",
  "bacterizing",
  "infectivities",
  "climatal",
  "caretakings",
  "lawyers",
  "centaur",
  "strabismuses",
  "coarsened",
  "dews",
  "bibelots",
  "spheral",
  "temporization",
  "legacies",
  "garbologies",
  "singe",
  "lifesavings",
  "combustor",
  "plastisol",
  "pipeages",
  "untucks",
  "exports",
  "gault",
  "parring",
  "tornadoes",
  "permanentness",
  "deanery",
  "hombre",
  "optimistic",
  "overcharged",
  "premaritally",
  "cheating",
  "apotheosizing",
  "swaging",
  "contextually",
  "littleneck",
  "pollutant",
  "catholicized",
  "oubliettes",
  "laminas",
  "bribed",
  "politburos",
  "deflexion",
  "sheol",
  "domiciliates",
  "sill",
  "hymeneal",
  "tilts",
  "translators",
  "stodgily",
  "ambulacra",
  "collated",
  "atomists",
  "toon",
  "vegetated",
  "causticity",
  "perilled",
  "neoplasms",
  "camos",
  "anabases",
  "gambadoes",
  "antiblackism",
  "netty",
  "sweaters",
  "pollarding",
  "aquafarmed",
  "hazmat",
  "subaltern",
  "kismats",
  "dispel",
  "slatiness",
  "jingling",
  "parotitis",
  "graphicnesses",
];
//making axios request

axios
  .get("https://random-word-api.herokuapp.com/word?number=100")
  .then(function (response) {
    wordsList = response.data;
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

//

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return wordsList[Math.floor(Math.random() * wordsList.length)];
}

// Add word to DOM
function addWordToDocument() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

addWordToDocument();

// Event listeners

// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDocument();
    updateScore();

    // Clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
