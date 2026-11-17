//----------------------------------------------------------------------------------------//
//
//https://acrobytes.net/matrix.js
//
//================================WELCOME TO THE MATRIX=================================
//Do you want just the matrix?
//https://acrobytes.net/justmatrixplz.html
//
//Feel free to steal, modify, monetize, damage, corrupt, plagiarise, or explode this code
//(yk cause i did the same for *some* of it)
//
//CREDIT
//https://porkbun.com/buniverse.html
//THANK YOU FOR THIS W CODE
//HEAVILY modified by me Acrobytes of course
//----------------------------------------------------------------------------------------//


//===============================CONFIG===============================//

//Colors MUST be in rgba format
//i.e. 'rgba(0, 9, 255, 1)'
const colorList = ["blue", "rgba(0, 9, 255, 1)", "light blue", "rgba(78, 85, 255, 1)", "green", "rgba(0, 255, 0, 1)", "red", "rgba(145, 46, 39, 1)", "yellow", "rgba(191, 207, 39, 1)", "black", "rgba(0, 0, 0, 1)", "white", "rgba(255, 255, 255, 1)"];

var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio || 1;

const root = document.documentElement;

//text: draws text. (selected at line 88-94
//square: draws squares
//circle: draws circles
const TYPE = "square";

const INITIAL_SWEEP = false;

//controls the DELAY so lower faster, higher slower
const SPEED = 33;

//If false there is a 50/50 to fill an item as transparent
//This toggles that
const IS_SOLID_LINES = false;

const DRAW_SIZE = 20;
//SEGMENT_SIZE: This is basically the box designated to each thing draw. The bigger it is the more space there is between things. If its less than DRAW_SIZE then there will be an overlap
const SEGMENT_SIZE = 20;

//If you want randomized font size
//(Set to the save value if you don't want random
const MIN_FONT_SIZE = 30;
const MAX_FONT_SIZE = 30;

const FONT = "\"Silkscreen\", monospace";

//color picker. Both support custom colors. HOWEVER, fillColor supports any color format but backgroundColor NEEEEEDS rgba format
//                                                                                                (because of opacity things :)
//If you set backgroundColor to an unsupported value it will default to black
var fillColor = "blue";
var backgroundColor = "black";
//flashColor: when site first loads this color will "flash" or appear as the background then fade
//to disable simply set to the same as background color
var flashColor = "blue";

//===============================da code===============================//
if (colorList[colorList.indexOf(flashColor) + 1] !== "blue") {
    flashColor = colorList[colorList.indexOf(flashColor) + 1];
}

root.style.background = flashColor;

window.addEventListener('resize', resize);


var columns = 0;
var drops = [];

function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    columns = Math.ceil(canvas.width / SEGMENT_SIZE);
    if (INITIAL_SWEEP === true) {
        while (drops.length < columns) drops.push(0);
    } else {
        while (drops.length < columns) drops.push(-Math.floor(Math.random() * 30));
    }
}

if (TYPE === "text") {
    //var letters = 'ﾊ';
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmnopqrstuv~`!@#$%^&*()_-+={[}]|:;<,>.?/123456789'
    //var letters = '01'
    //var letters = '  ..ﾜ'
    letters = [...letters];
}

resize()

// Setting up the draw function
if (colorList[colorList.indexOf(fillColor) + 1] !== "blue") {
    fillColor = colorList[colorList.indexOf(fillColor) + 1];
}

if (colorList[colorList.indexOf(backgroundColor) + 1] !== "blue") {
    backgroundColor = colorList[colorList.indexOf(backgroundColor) + 1];
}

function draw() {
    if (backgroundColor.charAt(3) === 'a') {
        ctx.fillStyle = backgroundColor.slice(0, backgroundColor.length - 2) + "0.045)";
    } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.045)';
    }

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
        let randomSize = Math.floor(Math.random() * (MAX_FONT_SIZE - MIN_FONT_SIZE + 1)) + MIN_FONT_SIZE;

        ctx.font= randomSize + FONT;

        if (IS_SOLID_LINES === false) {
            if (Math.floor(Math.random() * (1 + 1)) === 1) {
                ctx.fillStyle = fillColor;
            } else {
                ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            }
        } else {
            ctx.fillStyle = fillColor;
        }

        var offset = (SEGMENT_SIZE - DRAW_SIZE) / 2;

        if (TYPE === "text") {
            if (Math.floor(Math.random() * (900000)) === 1) {
                text = '😁';
                //if your lucky
            } else {
                var text = letters[Math.floor(Math.random() * letters.length)];
            }
            ctx.fillText(text, i * SEGMENT_SIZE, drops[i] * SEGMENT_SIZE);

        } else if (TYPE === "circle") {
            ctx.beginPath();
            ctx.arc(i * SEGMENT_SIZE + offset, drops[i] * SEGMENT_SIZE + offset, DRAW_SIZE / 2, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.fillRect(i * SEGMENT_SIZE + offset, drops[i] * SEGMENT_SIZE + offset, DRAW_SIZE, DRAW_SIZE);
        }

        drops[i]++;
        if (drops[i] * SEGMENT_SIZE > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
    }
}

// Loop the animation
setInterval(draw, SPEED);




//  :D