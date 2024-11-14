// Background music control
const music = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');

// Set initial volume and start paused
music.volume = 0.4;

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicControl.textContent = "Pause Music";
    } else {
        music.pause();
        musicControl.textContent = "Play Music";
    }
}

// Store selected food choice globally
let selectedFood = '';

// Select food function
function selectFood(food) {
    selectedFood = food;
    document.querySelectorAll('.choices button').forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`button[onclick="selectFood('${food}')"]`).classList.add('selected');
}

// Form Navigation
function handleResponse(isYes) {
    document.getElementById('ask-date').classList.add('hidden');
    if (isYes) {
        document.getElementById('food-selection').classList.remove('hidden');
    } else {
        document.getElementById('begging').classList.remove('hidden');
    }
}

function goToNextForm() {
    document.getElementById('begging').classList.add('hidden');
    document.getElementById('food-selection').classList.remove('hidden');
}

function goToDateSelection() {
    document.getElementById('food-selection').classList.add('hidden');
    document.getElementById('date-selection').classList.remove('hidden');
}

// Save data in local storage
function saveDataAndShowConfirmation(date, time, foodChoice) {
    const dateTime = `${date} at ${time}`;
    localStorage.setItem('date', dateTime);
    localStorage.setItem('foodChoice', foodChoice);

    // Show confirmation with the saved date and food
    document.getElementById('date-selection').classList.add('hidden');
    document.getElementById('selected-date-time').textContent = dateTime;
    document.getElementById('selected-food').textContent = foodChoice;
    document.getElementById('confirmation').classList.remove('hidden');
}

// Date confirmation
function confirmDate() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (date && time && selectedFood) {
        saveDataAndShowConfirmation(date, time, selectedFood);
    } else {
        alert('Please select a date, time, and food choice.');
    }
}

// Check for existing saved data on page load
window.addEventListener('load', () => {
    const savedDate = localStorage.getItem('date');
    const savedFood = localStorage.getItem('foodChoice');

    if (savedDate && savedFood) {
        document.getElementById('ask-date').classList.add('hidden');
        document.getElementById('selected-date-time').textContent = savedDate;
        document.getElementById('selected-food').textContent = savedFood;
        document.getElementById('confirmation').classList.remove('hidden');
    }
});