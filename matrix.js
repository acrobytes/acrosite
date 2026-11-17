//----------------------------------------------------------------------------------------//
//https://acrobytes.net/matrix.js
//
//================================WELCOME TO THE MATRIX=================================
//Do you want just the matrix?
//https://acrobytes.net/justmatrixplz.html
//
//Feel free to steal, modify, monetize, damage, corrupt, plagiarise, or explode this code
//(yk cause i did the same for some of it)
//
//CREDIT
//https://porkbun.com/buniverse.html
//THANK YOU FOR THIS W CODE
//HEAVILY modified by me Acrobytes of course
//----------------------------------------------------------------------------------------//

//Make sure you add new colors as rgba number format (not percents)
const colorList = ["blue", "rgba(0, 9, 255, 1)", "light blue", "rgba(78, 85, 255, 1)", "green", "#0f0", "red", "rgba(145, 46, 39, 1)", "yellow", "rgba(191, 207, 39, 1)", "black", "rgba(0, 0, 0, 1)", "white", "rgba(255, 255, 255, 1)"];

var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

const rt = document.documentElement;

//True: draws what is stored in letters variable
//False: Draws squares
const IS_TEXT = false;

//controls um well the speed
//
const SPEED = 33;

//Normally there is a 50/50 to fill a square (or character) as transparent
//This disables that
const IS_SOLID_LINES = true;

const SQUARE_SIZE = 30;
const FONT_SIZE = 31;

//If you want randomized font size
//(Set to the save value if you don't want random
const MIN_FONT_SIZE = 30;
const MAX_FONT_SIZE = 30;

//color picker. Pulls from colorList. You can easily add colors that can be easily changed (here) by adding their name and color (TO THE RIGHT) in colorList
//Names are formated in LOWERCASE
//colorList[colorList.indexOf("REPLACE THIS") + 1];
const FILL_COLOR = colorList[colorList.indexOf("blue") + 1];
const BACKGROUND_COLOR = colorList[colorList.indexOf("black") + 1];

rt.style.background = BACKGROUND_COLOR;

window.addEventListener('resize', resize);

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

if (IS_TEXT === true) {
    //var letters = 'ﾊ';
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmnopqrstuv~`!@#$%^&*()_-+={[}]|:;<,>.?/123456789'
    //var letters = '01'
    //var letters = '  ..ﾜ'
    //var letters = '◼'
    letters = [...letters];
}

// Setting up the columns
columns = canvas.width / FONT_SIZE;

// Setting up the drops
var drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Setting up the draw function
function draw() {
    let j = BACKGROUND_COLOR.slice(0, BACKGROUND_COLOR.length - 2);
    ctx.fillStyle = j + "0.045)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops.length; i++) {
        let randomSize = Math.floor(Math.random() * (MAX_FONT_SIZE - MIN_FONT_SIZE + 1)) + MIN_FONT_SIZE;

        ctx.font= randomSize + 'px "Silkscreen", sans-serif';

        if (IS_SOLID_LINES === false) {
            if (Math.floor(Math.random() * (1 + 1)) === 1) {
                ctx.fillStyle = FILL_COLOR;
            } else {
                ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            }
        } else {
            ctx.fillStyle = FILL_COLOR;
        }

        if (IS_TEXT === true) {
            if (Math.floor(Math.random() * (9000000)) === 1) {
                text = '😁';
                //if your lucky
            } else {
                var text = letters[Math.floor(Math.random() * letters.length)];
            }

            ctx.fillText(text, i * FONT_SIZE, drops[i] * FONT_SIZE);
        } else {
            var offset = (FONT_SIZE - SQUARE_SIZE) / 2;
            ctx.fillRect(i * FONT_SIZE + offset, drops[i] * FONT_SIZE + offset, SQUARE_SIZE, SQUARE_SIZE);
        }

        drops[i]++;
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
    }
}

// Loop the animation
resize()
setInterval(draw, SPEED);




//  :D