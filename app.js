var numbers = [];
var random = Math.floor((Math.random() * 7) + 1);
var iteration = 0;
const numsound = new Audio('media/number.mp3');
const correctsound = new Audio('media/correct.mp3');
const wrongsound = new Audio('media/wrong.mp3');
const timeslider = document.getElementById('snappingRange')
const rstbtn = document.getElementById("rstbtn3")
const rstbtn2 = document.getElementById("rstbtn2")
const form = document.getElementById('input');
const startbtn = document.getElementById('strtbtn');

function loadData() {
    const savedValue = localStorage.getItem('savedValue');
    if (savedValue) {
        document.getElementById('snappingRange').value = savedValue;
        document.getElementById('rangeValue').textContent = savedValue;
    }
}

window.onload = loadData();

function btnclick(event) {
    if (event.key === 'Enter') {
        startbtn.click();
    }
}

function rstclick(event){
    if (event.key === 'Enter') {
        if(rstbtn){rstbtn.click();}
        else{rstbtn2.click()}        
    }
}

document.addEventListener('keydown', btnclick)

const snapValues = [0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2]; // Define custom snapping values

function snapValue(value) {
    const closestValue = snapValues.reduce((prev, curr) => {
        return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });

    document.getElementById('rangeValue').textContent = closestValue; // Update displayed value
    timeslider.value = closestValue; // Update input value
}

const number = document.getElementById('number');
const correctText = document.getElementById('correctText');
const wrongText = document.getElementById('wrongText');
const inputdiv = document.getElementById('inputdiv');
const ansmsg = document.getElementById('ansmsg');
const pyro = document.getElementById('pyro');

function play() {
    document.removeEventListener('keydown', btnclick)
    localStorage.setItem('savedValue', timeslider.value);
    document.getElementById('sliderdiv').remove();
    number.style.display = 'block'
    correctText.style.display = 'block'
    wrongText.style.display = 'block'
    inputdiv.style.display = 'block'
    ansmsg.style.display = 'block'
    pyro.style.display = 'block'
    game()
}


function game() {
    gameDelay = timeslider.value * 1000;
    if (iteration < 10) {
        setTimeout(() => {
            if (random === 0) {
                random = random + Math.floor((Math.random() * 14) - 7);
            }
            if (random === numbers[numbers.length - 1]) {
                random = random + Math.floor((Math.random() * 5) - 3);
            }
            numbers.push(random);
            numsound.play()
            number.innerHTML = random.toString();
            random = Math.floor((Math.random() * 14) - 7);

            iteration++;
            game(); // Trigger the next iteration
        }, gameDelay);
    }

    setTimeout(() => {
        end()
    }, timeslider.value * 1000 * 11);

}

function end() {
    number.style.top = "30%"
    number.style.transition = "1s"
    inputdiv.style.opacity = "1"
    inputdiv.style.transition = "1s 1s"
    const inputbox = document.getElementById('inputnum')
    if(inputbox){inputbox.focus();}    
}


form.addEventListener('submit', function (event) {
    event.preventDefault();
    var sum = numbers.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);

    const name = document.getElementById('inputnum').value;
    number.remove()
    inputdiv.remove()
    if (name == sum) {
        correct(sum);
    } else {
        wrong(sum)
    }
    document.addEventListener('keydown', rstclick)
});

function correct(sum) {
    correctsound.play()
    ansmsg.innerHTML = `The answer was indeed ${sum}.`
    pyro.style.opacity = "1"
    correctText.style.opacity = "1"
    correctText.style.top = "30%"
    correctText.style.transition = "1s"
    ansmsg.style.opacity = "1"
    ansmsg.style.top = "50%"
    ansmsg.style.transition = "1s 1s"
    rstbtn.style.display = "flex"
}

function wrong(sum) {
    wrongsound.play()
    ansmsg.innerHTML = `The correct answer was ${sum}.`


    wrongText.style.opacity = "1"
    wrongText.style.top = "30%"
    wrongText.style.transition = "1s";
    ansmsg.style.opacity = "1"
    ansmsg.style.top = "50%"
    ansmsg.style.transition = "1s 1s"
    rstbtn2.style.display = "flex"
}