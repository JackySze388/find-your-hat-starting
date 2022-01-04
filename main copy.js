const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(fieldArray) {
        this.field = fieldArray;
        this.isPlayingNow = true;
        this.y = 0;
        this.x = 0;
    }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(``));
        }
    }

    playGame() {
        while (this.isPlayingNow) {
            myField.print();
            myField.askDirection();
            console.log(this.isPlayingNow);
        }
        //End Game follow up
        console.log('Game End');
    }

    winlost(userMove){
      if(this.isPlayingNow === true){
        if (userMove === hole) {
            console.log(userMove);
            console.log('You Lost!');
            this.isPlayingNow = false;
        } else if (userMove === hat) {
            console.log(userMove);
            console.log('You find you hat, you WIN!');
            this.isPlayingNow = false;
        } else {
           //don't konw.
        }
      }

    }

    fallingCheck(x,y){
        console.log(x,y);
        if (x == -1){
            console.log(x);
            console.log('You Lost! You falling outsite!');
            this.isPlayingNow = false;
            console.log(this.isPlayingNow);
        } else {
            return x, y;
        }
    } 
    // || y < 0 || this.x > this.field[0].length || this.y > this.field.length
    askDirection() {
        const userInput = prompt('Which Way? ');
        if (userInput === 'exit') {
            console.log('Input exit')
            this.isPlayingNow = false;
        } else if (userInput === 's'){
            //move down
            console.log('Input down');
            this.y = this.y + 1;
            myField.fallingCheck(this.x,this.y);
            myField.winlost(this.field[this.y][this.x]);
            this.field[this.y][this.x] = pathCharacter;          
        } else if (userInput === 'w'){
            //move up
            console.log('Input up');
            this.y = this.y - 1;
            myField.fallingCheck(this.x,this.y);
            myField.winlost(this.field[this.y][this.x]);
            this.field[this.y][this.x] = pathCharacter; 
        } else if (userInput === 'a'){
            //move Left
            console.log('Input Left');
            this.x = this.x - 1;
            myField.fallingCheck(this.x,this.y);
            myField.winlost(this.field[this.y][this.x]);
            this.field[this.y][this.x] = pathCharacter;
        } else if (userInput === 'd'){
            //move Right
            console.log('Input Right');
            this.x = this.x + 1;
            myField.fallingCheck(this.x,this.y);
            myField.winlost(this.field[this.y][this.x]);
            this.field[this.y][this.x] = pathCharacter;
        } else {
            console.log('Please input the correct direction (d,u,l,r) or use (exit) to escape the game.');
        }
    }
    
}

const myField = new Field([
    ['*', '░', '░'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

myField.playGame();

// const name = prompt('What is your name? ');
// console.log(`Hey there ${name}`);

// // const num = prompt('Enter a number: ');
// // console.log('Your number + 4 =');
// // console.log(Number(num) + 4);

// // Random number from 1 - 10
// const numberToGuess = Math.floor(Math.random() * 10) + 1;
// // This variable is used to determine if the app should continue prompting the user for input
// let foundCorrectNumber = false;

// while (!foundCorrectNumber) {
//   // Get user input
//   let guess = prompt('Guess a number from 1 to 10: ');
//   // Convert the string input to a number
//   guess = Number(guess);

//   // Compare the guess to the secret answer and let the user know.
//   if (guess === numberToGuess) {
//     console.log('Congrats, you got it!');
//     foundCorrectNumber = true;
//   } else {
//     console.log('Sorry, guess again!');
//   }
// }