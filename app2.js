var numbers = [];
var random = Math.floor((Math.random() * 7) + 1);
var iteration = 0;
var gameDelay = 1000; // Adjust this value if needed
var addition = 0;

function play() {
    game();
}

function game() {
    if (iteration < 10) {
        setTimeout(() => {
            if (random === 0) {
                random = random + Math.floor((Math.random() * 14) - 7);
            }
            if (random === numbers[numbers.length - 1]) {
                random = random + Math.floor((Math.random() * 5) - 3);
            }
            numbers.push(random);
            document.getElementById('number').innerHTML = random.toString();
            random = Math.floor((Math.random() * 14) - 7);
            console.log(numbers);
            
            iteration++;
            game(); // Trigger the next iteration
        }, gameDelay);
    }
}
 play()

setTimeout(() => {
    end()
}, gameDelay*11);


function end() {
    var sum = numbers.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    document.getElementById('number').style.top = "30%"
    document.getElementById('number').style.transition = "1s"
    document.getElementById('inputdiv').style.opacity = "1"
    document.getElementById('inputdiv').style.transition = "1s 1s"
    console.log(sum)
}

var inputField = document.querySelector('input');


function Check() {
    var sum = numbers.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    if(inputField.input == sum){
        right()
    }else{wrong();console.log(inputField.input + sum)}
}

function right() {
    console.log('you are absolutely right')    
}

function wrong(){
    console.log('wrong!')
}