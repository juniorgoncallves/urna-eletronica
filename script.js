let yourVoteFor = document.querySelector(".line-1 span");
let roles = document.querySelector(".line-2 span");
let numbers = document.querySelector(".line-3");
let candidateData = document.querySelector(".line-4");
let images = document.querySelector(".right-side");
let footer = document.querySelector(".footer");

let currentStage = 0;
let number = "";
let whiteVote = false;
let votes = [];

function startStage() {
  let stage = stages[currentStage];
  console.log("startStage", stage);
  let htmlNumber = "";
  number = "";
  whiteVote = false;

  for (let i = 0; i < stage.numbers; i++) {
    if (i === 0) {
      htmlNumber += '<div class="number blink"></div>';
    } else {
      htmlNumber += '<div class="number"></div>';
    }
  }

  yourVoteFor.style.display = "none";
  roles.innerHTML = stage.role;
  numbers.innerHTML = htmlNumber;
  candidateData.innerHTML = "";
  images.innerHTML = "";
  footer.style.display = "none";
}

function pressed(n) {
  console.log(n);

  let numberEl = document.querySelector(".number.blink");
  if (numberEl !== null) {
    numberEl.innerHTML = n;
    number = `${number}${n}`;

    numberEl.classList.remove("blink");
    if (numberEl.nextElementSibling !== null) {
      numberEl.nextElementSibling.classList.add("blink");
    } else {
      updateInterface();
    }
  }
}

function updateInterface() {
  let stage = stages[currentStage];

  let candidate = stage.candidates.filter((candidate) => {
    if (candidate.number === number) {
      return true;
    } else {
      return false;
    }
  });

  if (candidate.lenght > 0) {
    candidate = candidate[0];
    yourVoteFor.style.display = "block";
    footer.style.display = "block";
    candidateData.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.party}`;

    let htmlImages = "";
    for (let i in candidate.images) {
      if (candidate.images[i].small) {
        htmlImages += `<div class="image small"><img src"images/${candidate.images[i].url}" alt="" />${candidate.images[i].legend}</div>`;
      } else {
        htmlImages += `<div class="image"><img src="images/${candidate.image[i].url}" alt="" />${candidate.images[i].legend}</div>`;
      }
    }

    images.innerHTML = htmlImages;
  } else {
    yourVoteFor.style.display = "block";
    footer.style.display = "block";
    candidateData.innerHTML = '<div class="big-warning blink">VOTO NULO</div>';
  }

  console.log("Candidato", candidate);
}

function white() {
  number = "";
  whiteVote = true;
  yourVoteFor.style.display = "block";
  footer.style.display = "block";
  numbers.innerHTML = "";
  candidateData.innerHTML =
    '<div class="big-warning blink">VOTO EM BRANCO</div>';
  images.innerHTML = "";
}

function correct() {
  startStage();
}

function confirm() {
  let stage = stages[currentStage];

  let confirmedVote = false;

  if (whiteVote === true) {
    confirmedVote = true;
    votes.push({
      stage: stages[currentStage].role,
      vote: "white",
    });
  } else if (number.length === stage.numbers) {
    confirmedVote = true;
    votes.push({
      stage: stages[currentStage].role,
      vote: number,
    });
  }

  if (confirmedVote) {
    currentStage++;
    if (stages[currentStage] !== undefined) {
      startStage();
    } else {
      document.querySelector(".screen").innerHTML =
        '<div class="giant-warning blink">FIM</div>';
      console.log(votes);
    }
  }
}
startStage();
