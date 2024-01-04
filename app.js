var numbers =[];
var random = Math.floor((Math.random() * 7) + 1);
var addition = 0;
var newadd;
function play() {
    for (let index = 0; index < 10; index++) {
        game()
        if(index == 9){
            for (let i = 0; i < numbers.length; i++) {
                addition = addition + numbers[i]
            }
            return addition;
        }
    }    
}

function game(){
    setTimeout(() => {    
        if(random == 0){random = random + Math.floor((Math.random() * 14) -7);}
        if(random == numbers[numbers.length-1]){random = random + Math.floor((Math.random() * 5) - 3)}
        numbers[numbers.length] = random;
        document.getElementById('number').innerHTML =  random.toString();
        random = Math.floor((Math.random() * 14) -7);
        console.log(numbers);
    }, 1000);
}

console.log(play())