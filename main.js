const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
var height;
var width;

const userInputgamemode = prompt('Please select the game mode? (easy or hard) ');

if (userInputgamemode === 'easy') {
    height = 5;
    width = 5;
} else if (userInputgamemode === 'hard') {
    height = Math.floor(Math.random() * (20 - 10)) + 10;
    width = Math.floor(Math.random() * (20 - 10)) + 10;
} else {
    console.log('88');
}

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

    startGame() {
        while (this.isPlayingNow) {
            this.field[this.y][this.x] = pathCharacter;
            myField.print();
            myField.askDirection();
        }
        //End Game follow up
        console.log('Game End');
    }

    winlost(userMove) {
        if (this.isPlayingNow === true) {
            if (userMove === hole) {
                // console.log(userMove);
                console.log('You Lost!');
                this.isPlayingNow = false;
            } else if (userMove === hat) {
                // console.log(userMove);
                console.log('You find you hat, you WIN!');
                this.isPlayingNow = false;
            }
        } else {
            this.isPlayingNow = false;
        }
    }

    isOutofBound() {
        let isOut = undefined;
        // console.log(this.isPlayingNow);
        // console.log(this.x, this.y);
        // console.log(this.field.length);
        if (this.x < 0 || this.y < 0 || this.x == this.field[0].length || this.y == this.field.length) {
            isOut = true;
            // console.log(this.x, this.y);
            console.log('You Lost! You falling outsite!');
            this.isPlayingNow = false;
            // console.log(this.isPlayingNow);
        } else {
            isOut = false;
        }
        return isOut;
    }

    askDirection() {
        const userInput = prompt('Which Way? ');
        if (userInput === 'exit') {
            console.log('Input exit')
            this.isPlayingNow = false;
        } else if (userInput === 's') {
            //move down
            console.log('Input down');
            this.y = this.y + 1;
            if (myField.isOutofBound() === true) {
                this.isPlayingNow = false;
            } else {
                myField.winlost(this.field[this.y][this.x]);
                this.field[this.y][this.x] = pathCharacter;
            }
        } else if (userInput === 'w') {
            //move up
            console.log('Input up');
            this.y = this.y - 1;
            if (myField.isOutofBound() === true) {
                this.isPlayingNow = false;
            } else {
                myField.winlost(this.field[this.y][this.x]);
                this.field[this.y][this.x] = pathCharacter;
            }
        } else if (userInput === 'a') {
            //move Left
            console.log('Input Left');
            this.x = this.x - 1;
            if (myField.isOutofBound() === true) {
                this.isPlayingNow = false;
            } else {
                myField.winlost(this.field[this.y][this.x]);
                this.field[this.y][this.x] = pathCharacter;
            }
        } else if (userInput === 'd') {
            //move Right
            console.log('Input Right');
            this.x = this.x + 1;
            if (myField.isOutofBound() === true) {
                this.isPlayingNow = false;
            } else {
                myField.winlost(this.field[this.y][this.x]);
                this.field[this.y][this.x] = pathCharacter;
            }
        } else {
            console.log('Please input the correct direction (d,u,l,r) or use (exit) to escape the game.');
        }
    }

    static generateField(fieldHeight, fieldWidth, percentage = 0.1) {
        const field = new Array(fieldHeight).fill(0).map(el => new Array(fieldWidth));
        for (let i = 0; i < fieldHeight; i++) {
            for (let j = 0; j < fieldWidth; j++) {
                const prob = Math.random();
                field[i][j] = prob > percentage ? fieldCharacter : hole;
            }
        }

        const hatLocation = {
            x: Math.floor(Math.random() * fieldWidth),
            y: Math.floor(Math.random() * fieldHeight)
        };

        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * fieldWidth);
            hatLocation.y = Math.floor(Math.random() * fieldHeight);
        }

        field[hatLocation.y][hatLocation.x] = hat;
        return field;
    }

}

const myField = new Field(Field.generateField(height, width, 0.2));
myField.startGame();

// const userInputgamemode = prompt('Please select the game mode? (easy or hard) ');

// if (userInputgamemode === 'easy') {
//     const myField = new Field(Field.generateField(height, width, 0.2));
//     myField.easyGame();
// } else if (userInputgamemode === 'hard') {
//     const myField = new Field(Field.generateField(hardheight, hardwidth, 0.4));
//     myField.hardMode();
// } else {
//     console.log('123');
// }

// const myField = new Field(Field.generateField(height, width, 0.2));
// myField.easyGame();

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