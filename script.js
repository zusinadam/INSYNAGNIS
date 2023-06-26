// Pobranie elementów SVG
const guitarSvg = document.getElementById('guitar-svg');
const guitarBox = document.getElementById('guitar-box');
const strings = {
  e: {
    element: document.getElementById('string-e'),
    sound: new Audio('Sounds/Standard/E_standard.wav')
  },
  a: {
    element: document.getElementById('string-a'),
    sound: new Audio('Sounds/Standard/A_standard.wav')
  },
  d: {
    element: document.getElementById('string-d'),
    sound: new Audio('Sounds/Standard/D_standard.wav')
  },
  g: {
    element: document.getElementById('string-g'),
    sound: new Audio('Sounds/Standard/G_standard.wav')
  },
  b: {
    element: document.getElementById('string-b'),
    sound: new Audio('Sounds/Standard/B_standard.wav')
  },
  e2: {
    element: document.getElementById('string-e2'),
    sound: new Audio('Sounds/Standard/E2_standard.wav')
  }
};
const stringDescriptions = {
  e: document.getElementById('string-e-description'),
  a: document.getElementById('string-a-description'),
  d: document.getElementById('string-d-description'),
  g: document.getElementById('string-g-description'),
  b: document.getElementById('string-b-description'),
  e2: document.getElementById('string-e2-description'),
};

// Ustawienie rozmiarów i pozycji pudła gitary
const guitarBoxRadius = 180;
const guitarBoxX = 300;
const guitarBoxY = 200;

// Strojenia dla poszczególnych strun
const tunings = {
  standard: ['E', 'A', 'D', 'G', 'B', 'E'],
  dropC: ['C', 'G', 'C', 'F', 'A', 'D'],
  openD: ['D', 'A', 'D', 'F#', 'A', 'D'],
  openG: ['D', 'G', 'D', 'G', 'B', 'D'],
  dadgad: ['D', 'A', 'D', 'G', 'A', 'D'],
  dropD: ['D', 'A', 'D', 'G', 'B', 'E'],
};

// Inicjalizacja strojenia
let selectedTuning = 'standard';

// Funkcja do rysowania pudła gitary
function drawGuitarBox() {
  guitarBox.setAttribute('cx', guitarBoxX);
  guitarBox.setAttribute('cy', guitarBoxY);
  guitarBox.setAttribute('r', guitarBoxRadius);
}

// Funkcja do rysowania strun na podstawie strojenia
function drawStrings() {
  const tuning = tunings[selectedTuning];

  for (let i = 0; i < tuning.length; i++) {
    const string = strings[Object.keys(strings)[i]].element;
    const stringDescription = stringDescriptions[Object.keys(strings)[i]];
    const stringY = guitarBoxY - guitarBoxRadius + i * (guitarBoxRadius * 2) / (tuning.length - 1);

    string.setAttribute('x2', guitarBoxX + guitarBoxRadius + 50);
    string.setAttribute('y1', stringY);
    string.setAttribute('y2', stringY);

    stringDescription.textContent = tuning[i];
  }
}

// Funkcja do odtwarzania dźwięku struny
function playStringSound(string) {
  strings[string].sound.currentTime = 0;
  strings[string].sound.play();
}

// Funkcja do dodania efektu wizualnego po kliknięciu w strunę
function animateStringClick(string, stringElement) {
  const initialStrokeWidth = parseInt(stringElement.getAttribute('stroke-width'));
  const initialStrokeColor = stringElement.getAttribute('stroke');
  const clickedStrokeWidth = 10;
  const clickedStrokeColor = 'green';

  stringElement.setAttribute('stroke-width', clickedStrokeWidth);
  stringElement.setAttribute('stroke', clickedStrokeColor);

  setTimeout(() => {
    stringElement.setAttribute('stroke-width', initialStrokeWidth);
    stringElement.setAttribute('stroke', initialStrokeColor);
  }, strings[string].sound.duration * 1000); // czas trwania dźwięku w milisekundach
}

// Nasłuchiwanie kliknięcia na strunę
Object.keys(strings).forEach((string) => {
  const stringElement = strings[string].element;
  const stringDescription = stringDescriptions[string];

  stringElement.addEventListener('click', () => {
    playStringSound(string);
    animateStringClick(string, stringElement);
  });

  stringElement.addEventListener('mouseenter', () => {
    stringElement.style.cursor = 'pointer';
    stringElement.setAttribute('stroke-width', parseInt(stringElement.getAttribute('stroke-width')) + 2);
  });

  stringElement.addEventListener('mouseleave', () => {
    stringElement.style.cursor = 'default';
    stringElement.setAttribute('stroke-width', parseInt(stringElement.getAttribute('stroke-width')) - 2);
  });

  stringDescription.addEventListener('click', () => {
    playStringSound(string);
    animateStringClick(string, stringElement);
  });
});

// Nasłuchiwanie kliknięcia na opis struny
Object.keys(stringDescriptions).forEach((string) => {
  const stringElement = strings[string].element;
  const stringDescription = stringDescriptions[string];

  stringElement.addEventListener('click', () => {
    playStringSound(string);
    animateStringClick(stringElement);
  });

  stringDescription.addEventListener('mouseenter', () => {
    stringDescription.style.cursor = 'pointer';
    stringDescription.style.fontWeight = 'bold';
  });

  stringDescription.addEventListener('mouseleave', () => {
    stringDescription.style.cursor = 'default';
    stringDescription.style.fontWeight = 'normal';
  });

  stringDescription.addEventListener('click', () => {
    playStringSound(string);
    animateStringClick(stringElement);
  });
});

// Funkcja do zastosowania strojenia
function applyTuning() {
  selectedTuning = document.getElementById('tuning-select').value;
  drawStrings();
}

// Nasłuchiwanie kliknięcia przycisku do zastosowania strojenia
const applyTuningBtn = document.getElementById('apply-tuning-btn');
applyTuningBtn.addEventListener('click', applyTuning);

// Wywołanie funkcji rysującej pudło gitary
drawGuitarBox();

// Wywołanie funkcji rysującej struny
drawStrings();

const favoriteTuningSelect = document.getElementById('favorite-tuning-select');
const saveFavoriteTuningBtn = document.getElementById('save-favorite-tuning-btn');
const tuningSelect = document.getElementById('tuning-select');

// Zapisz ulubione strojenie do localStorage
saveFavoriteTuningBtn.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.setItem('favoriteTuning', favoriteTuningSelect.value);
  alert('Twoje ulubione strojenie zostało zapisane!');
});

// Wczytaj ulubione strojenie z localStorage
const favoriteTuning = localStorage.getItem('favoriteTuning');
if (favoriteTuning) {
  favoriteTuningSelect.value = favoriteTuning;
  tuningSelect.value = favoriteTuning;
  selectedTuning = favoriteTuning;
  drawStrings();
}