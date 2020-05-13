/*
Grey Colour - #595857
Gold Colour - #bfb678
Font - Montserrat-Bold.ttf
*/

//tiles settings 
const WIDTH = 85;
const HEIGHT = 85;
const STARTTILES = 5;
const OFFSETX = 30;
const OFFSETY = 230;

//images
var logoImage;
var font;
var timeImage;
var bottleImage;
var goldline;
var tryAgain;
var startGame;

var time;
var score;
var playTime = 20;
var started;
var playing;
var gameOver;
var isOnMenu;

var tiles = [];

function preload(){
	logoImage = loadImage("assets/Logo.png");
	font = loadFont("assets/Montserrat-Bold.ttf");
	timeImage = loadImage("assets/time.png");
	bottleImage = loadImage("assets/Bottle.png");
	goldline = loadImage("assets/goldline.png");
	tryAgain = loadImage("assets/tryagain.png");
	startGame = loadImage("assets/startgame.png");
}

function setup(){

	var cnv = createCanvas(396, 682); //18/31
  	var x = (windowWidth - width) / 2;
  	var y = (windowHeight - height) / 2;
  	cnv.position(x, y);

	textAlign(CENTER);
	textFont(font);

	time = -3;
	score = 0;
	started = false;
	playing = false;
	gameOver = false;
	isOnMenu = true;
	tiles = [];

	for (var i = 0; i < STARTTILES; i++){
		createRow();
	}



	
}

function draw(){
	background("#595857");
	if(!isOnMenu){
		drawPieces();
		logic();
		drawBottles();
	}else{
		drawMenu();
	}
	drawUi();
	
}

function drawBottles(){
	
	if (!playing){
		return;
	}

	for(var i = 0; i <= 3; i++){
		if(tiles[i] == 0){
			image(bottleImage, (OFFSETX + 6) + WIDTH * i, OFFSETY + 8, 70, 70);
		}
	}

	for(var i = 4; i <= 7; i++){
		if(tiles[i] == 0){
			image(bottleImage, (OFFSETX + 6) + WIDTH * (i%4), (OFFSETY + 8) + HEIGHT * 1, 70, 70);
		}
	}

	for(var i = 8; i <= 11; i++){
		if(tiles[i] == 0){
			image(bottleImage, (OFFSETX + 6) + WIDTH * (i%4), (OFFSETY + 8) + HEIGHT * 2, 70, 70);
		}
	}

	for(var i = 12; i <= 15; i++){
		if(tiles[i] == 0){
			image(bottleImage, (OFFSETX + 6) + WIDTH * (i%4), (OFFSETY + 8) + HEIGHT * 3, 70, 70);
		}
	}

	for(var i = 16; i <= 19; i++){
		if(tiles[i] == 0){
			image(bottleImage, (OFFSETX + 6) + WIDTH * (i%4), (OFFSETY + 8) + HEIGHT * 4, 70, 70);
		}
	}
}

function drawPieces(){
	for(var i = 0; i < tiles.length; i++){
		var x = (i%4)*WIDTH;
		var y = (Math.floor(i/4)*HEIGHT);
		stroke("#595857");
		fill((tiles[i] !== 0) ? ((tiles[i] === 1) ? "#FFFFFF" : "#de907c") : "#FFFFFF");
		rect(x + OFFSETX, y + OFFSETY, WIDTH, HEIGHT);
	}
}

function drawUi(){
	noStroke();
	fill("#595857");
	rect(0, 230 + 5 * WIDTH, width, 100);
	image(logoImage, 40, 15, width * 0.8, 90 * 0.8);
	image(goldline, 15, OFFSETY * 0.5, width * 0.93, height * 0.81);
}

function drawMenu(){
	fill("#FFFFFF");
	rect(108, OFFSETY - 20, 180, 180);
	image(bottleImage, width * 0.3 + 5, height/2 - 120, 150, 150);

	textSize(20);
	fill("#bfb678");
	text("SAVE AS MANY\nBRASS LION BOTTLES\nAS POSSIBLE IN 20SECS", width/2, height * 0.65);

	image(startGame, 15, height * 0.8, width * 0.93 , 90);
}

function logic(){
	if(!playing){
		if(started){
			gameOver = true;
			endScreen();
		}else{
			//image
			
			image(timeImage, OFFSETX + 3 * WIDTH + 16 , OFFSETY  - 70, 50, 50);
			
			//text
			textSize(40);
			noStroke();
			fill("#FFFFFF");
			text(-time, OFFSETX + 4 * WIDTH - WIDTH / 2, OFFSETY - HEIGHT / 2 + 10);
			textSize(15);
			fill("#bfb678");
			text("QUICK! SAVE ALL THE\nBRASS LION BOTTLES!", width/2, height/2 - 161);
			if(frameCount % 60 === 0){
				if(!playing){
					time++;
				}
				if(time == 0 && !playing){
					playing = true;
					started = true;
					time = playTime * 60;
				}
			}
		}
	}else{
		image(timeImage, OFFSETX + 3 * WIDTH + 16 , OFFSETY  - 70, 50, 50);
		textSize(40);
		noStroke();
		fill("#FFFFFF");
		text(Math.floor(time/60), OFFSETX + 4 * WIDTH - WIDTH / 2, OFFSETY - HEIGHT / 2 + 10);
		text(score, OFFSETX + WIDTH / 2, OFFSETY - HEIGHT / 2 + 10);
		textSize(15);
		fill("#bfb678");
		text("QUICK! SAVE ALL THE\nBRASS LION BOTTLES!", width/2, height/2 - 161);
		time--;
		if(started && time <= 0){
			time = 0;
			playing = false;
		}
	}
}

function endScreen(){
	fill("#595857");
	rect(0, 100, width, height);

	fill("#bfb678");
	textSize(30);
	text("WELL DONE!", width/2, height * 0.30 - 10);
	
	fill("#FFFFFF");
	rect(40, OFFSETY - 10, width * 0.8, 180);

	fill("#595857");
	textSize(80);
	text(score, 125, OFFSETY + 100);

	noStroke();
	fill("#bfb678");
	textSize(16);
	text("BOTTLES SAVED", 130, OFFSETY + 130);

	image(bottleImage, width/2 + 10, height/2 - 110, 150, 150);

	image(tryAgain, width * 0.25, height*0.6, 200, 100);

	fill("#bfb678");
	textSize(20);
	text("POST YOUR SCORES\nAND TAG US", width/2, height * 0.65 + 100);

	fill("#FFFFFF");
	textSize(20);
	text("@BRASSLIONDISTILLERY", width/2, height * 0.65 + 50 + 100);

	

}

function mousePressed(){
	if(gameOver){
		//image(tryAgain, width * 0.25, height*0.6, 200, 100);
		if((mouseX >= width*0.25) && (mouseX <= (width*0.25)+200)){
			if((mouseY >= height*0.6) && (mouseY <= (height*0.6)+100)){
				setup();
			}
		}
	}
	if(isOnMenu){
		//image(startGame, 15, height * 0.8, width * 0.93 , 90);
		if((mouseX >= 15) && (mouseX <= 15+(width * 0.93))){
			if((mouseY >= height*0.8) && (mouseY <= (height*0.8)+90)){
				isOnMenu = false;
			}
		}
	}
	if(!playing)
		return;
	if(mouseY - OFFSETY >= (STARTTILES-1) * HEIGHT && mouseY - OFFSETY <= STARTTILES * HEIGHT){
		var tile = getTile(mouseX);
		if(tile == -1)
			return;
		if(tiles[tile] !== 0){
			tiles[tile] = -1;
			playing = false;
		}else{
			score++;
			createRow();
		}
	}
}

function getTile(mx){
	for(var i = 0; i < 4; i++){
		var lower = i * WIDTH + OFFSETX;
		var upper = (i + 1) * WIDTH + OFFSETX;
		if(mx >= lower && mx <= upper){
			return i + 16;
		}
	}
	return -1;
}

function createRow(){
	var c = Math.floor(random(4));
	for(var i = 0; i < 4; i++){
		tiles.unshift((c === i) ? 0 : 1);
	}
}

