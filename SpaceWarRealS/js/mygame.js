 //Created by Bob Duffy @bobduffy as a sample implementation of Intel RealSense Technology developed in javascript

var circle1="red";
        var circle2="red";
var introcount=0;        
var shipCount =3;
var gameLevel = 0;
var minePoints=250;
var enemyPoints=5000;
var endgame =false;
var gamePoints = 0;
var minesize=16;
var BotPos = 0
          
var enemycount =0;
var enemy=[];
var framecount = 0;
var minecount= 1;
var enemysize=8;
var rndx=0;
        var rndy=0;
var randangle=0;
        var enemyspeed = 0;
 var radialcolor = 0;
        var radialcolor2 = 255;
        var radialcolor3 = 255;
var superenemyspeed = 0;
var superenemies = [];
var senseinit = true;
var enemyrotatedeg =0;
        var blast = [];  
var bplus = 6; //used to set the varied starburst effect of the ship and enemy blast
var CanScale=2.5; 
var noseX = 0;
var noseY = 0;
//
var browfire =100;
var canvas;
var alphaset =0;
var linealpha =alphaset.toFixed(2);
var context;
var CursorRatio = 10;
var CursorRatioX = 10;
var CursorRatioY = 10;
var gamew = 1200; //width of our game space
var gameh = 600; //height of our game space
var shipSize = 60 //size of our ship
var angleRate = .5; //reduces or increases the angle by a rate   
var xAngle = 0; //global variable for horizontal angle of the device
var yAngle = 0; //global variable for vertical angle of the device
var spin = 1;
var shipx = gamew * .5;
var shipy = gameh * .5;
var spinr;
var spinl;
var rotatespeed = 0;
var touchX = 0;
var touchY = 0;
var shot;
var xhairRadian;
var shotstart = 0;
var shipRadian;
var xhairRadianround;
var spinRound;
var speedmax = 20;
var spindefault = 0;
var spinspeed = spindefault
var direction;
var deltaRadian;
var shotprogress = false;
var laserstatus = 0;
var h = 0;
var laserstart = 0;
var right;
var xforcespeed = 0;
var yforcespeed = 0;
var left;
var down;
var up;
var stars = [];                 //array for creating the stars in the game menu


       
// loadsounds
var gamebeat = new Audio("Sounds/107022__gunnbladez__130-super-grumble-bass-02.wav");
var lasersnd = new Audio("Sounds/146725__fins__laser.wav");
var switchsnd = new Audio("Sounds/switchsound.wav");
switchsnd.playbackRate = 1;
switchsnd.loop = false;
switchsnd.volume = 1;

lasersnd.playbackRate = 1;
lasersnd.loop = false;
lasersnd.volume = 1;
gamebeat.loop = true;
gamebeat.volume = 0;
var explodesnd = new Audio("Sounds/explode.wav");
explodesnd.loop = false;
explodesnd.volume = .25;
gamebeat.play();
        
function intro(){
    var canvas = document.getElementById('myCanvas');
                var context = canvas.getContext('2d');
    
    if(touchX>canvas.width){
        context.textAlign = 'center';
        context.font = "30px monospace";
        context.fillStyle="red";
        context.fillText("move your head and nose LEFT, toward center of camera", canvas.width/2, canvas.height*.7);
       
        context.beginPath;
      //  context.strokeStyle="red";
        context.moveTo(canvas.width*.8, canvas.height/2);
        context.lineTo(canvas.width*.9, canvas.height*.3);
        context.lineTo(canvas.width*.9, canvas.height*.7);
        context.lineTo(canvas.width*.8, canvas.height/2);
        context.closePath;
        context.fill();
      //  context.stroke();
    }
    
      if(touchX<0){
        context.textAlign = 'center';
        context.font = "30px monospace";
          context.fillStyle="red";
         // context.strokeStyle="red";
        context.fillText("move your head and nose RIGHT, toward center of camera", canvas.width/2, canvas.height*.7);
        context.beginPath;
        
        context.moveTo(canvas.width*.2, canvas.height/2);
        context.lineTo(canvas.width*.1, canvas.height*.3);
        context.lineTo(canvas.width*.1, canvas.height*.7);
        context.lineTo(canvas.width*.2, canvas.height/2);
           context.closePath;
       // context.stroke();
          context.fill();
    }
     if(touchY>canvas.height){
         context.fillStyle="red";
       //  context.strokeStyle="red";
        context.textAlign = 'center';
        context.font = "30px monospace";
        context.fillText("move your head and nose UP, toward center of camera", canvas.width/2, canvas.height*.3);
        context.beginPath;
        
        context.moveTo(canvas.width/2, canvas.height*.8);
        context.lineTo(canvas.width*.6, canvas.height*.9);
        context.lineTo(canvas.width*.4, canvas.height*.9);
        context.lineTo(canvas.width/2, canvas.height*.8);
          context.closePath;
     //   context.stroke();
         context.fill();
    }
    
      if(touchY<0){
          context.fillStyle="red";
        //  context.strokeStyle="red";
        context.textAlign = 'center';
        context.font = "30px monospace";
        context.fillText("move your head and nose DOWN, toward center of camera", canvas.width/2, canvas.height*.3);
        context.beginPath;
       // context.strokeStyle="red";
        context.moveTo(canvas.width/2, canvas.height*.2);
        context.lineTo(canvas.width*.6, canvas.height*.1);
        context.lineTo(canvas.width*.4, canvas.height*.1);
        context.lineTo(canvas.width/2, canvas.height*.2);
           context.closePath;
      //  context.stroke();
          context.fill();
    }
    
     if(touchY>0 && touchY< canvas.height && touchX>0 && touchX<canvas.width){
          context.fillStyle="red";
        //  context.strokeStyle="red";
        context.textAlign = 'center';
        context.font = "30px monospace";
         
        context.fillText("move crosshairs to each circle", canvas.width/2, canvas.height*.15)
        context.fillText("then open mouth to them blue", canvas.width/2, canvas.height*.3)
        context.fillText("gently turn your neck & tilt head to aim", canvas.width/2, canvas.height*.7);
          context.fillText("game will start after both circles are blue", canvas.width/2, canvas.height*.85);
         context.save()
        context.beginPath;
      //  context.strokeStyle="red";
        context.closePath;
      //  context.stroke();
        context.fill();
          context.beginPath;
        context.shadowBlur = minesize*1.5;
        context.shadowColor = circle1;
        context.fillStyle = "black";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.beginPath();
        context.arc(canvas.width*.25, canvas.height/2, minesize, 0, Math.PI * 2);
        context.closePath;
        context.fill();
        context.stroke();
        
         
          context.beginPath;
      //  context.strokeStyle="red";
        context.closePath;
      //  context.stroke();
        context.fill();
          context.beginPath;
        context.shadowBlur = minesize*1.5;
        context.shadowColor = circle2;
        context.fillStyle = "black";
        context.strokeStyle = circle2 ;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(canvas.width*.75, canvas.height/2, minesize, 0, Math.PI * 2);
        context.closePath;
        context.fill();
        context.stroke();
          context.restore()
         
         if(circle2=="red" && laserstatus>0 && touchX >canvas.width*.75 - minesize && touchX<canvas.width*.75+minesize && touchY>canvas.height/2-minesize  && touchY<canvas.height/2+minesize ){
             switchsnd.play();
             circle2="cyan";
             introcount++;
            
         }
         if(circle1=="red" && laserstatus>0 && touchX >canvas.width*.25 - minesize && touchX<canvas.width*.25+minesize && touchY>canvas.height/2-minesize  && touchY<canvas.height/2+minesize ){
             switchsnd.play();
             circle1="cyan";
             introcount++;
            
         }
    }
    
 if(introcount>1){
     setTimeout(function(){
         gameLevel =1;
           context.fillStyle="red";
        //  context.strokeStyle="red";
        context.textAlign = 'center';
        context.font = "30px monospace";
         
        context.fillText("FIRE AT RED MINES TO CLEAR STAGE", canvas.width/2, canvas.height/2)
         
             
             
         },
       1500);
        //gameLevel=1;
    }   
}

starfieldinit();

var enemyx = (Math.round(Math.random() * window.innerWidth));
var enemyy = (Math.round(Math.random() * window.innerHeight));
        
function starfieldinit() {
    for (s = 0; s < 20; s++) {
        var starx = (Math.round(Math.random() * window.innerWidth));
        var stary = (Math.round(Math.random() * window.innerHeight));
        var staralpha = (Math.round(Math.random() * 5));
        stars.push([starx, stary, staralpha]);
    }
}

//this is the logic that animates the stars makes some brighter and faster
function animstars() {
    var canvas = document.getElementById('myCanvas');
                var context = canvas.getContext('2d');
    for (s = 0; s < stars.length; s++) {
        stars[s][0] -= stars[s][2];
        stars[s][1] += stars[s][2];
        context.beginPath();
        context.fillStyle = "rgba(255,255,255," + (stars[s][2] * .2) + ")";
        context.arc(stars[s][0], stars[s][1], 2, Math.PI * 2, false);
        context.fill();
        context.closePath();
        if (stars[s][0] < 1) {
            stars[s][0] = window.innerWidth;
        }
        if (stars[s][1] > window.innerHeight) {
            stars[s][1] = 0;
        }
    }
}
        


//This function draws the exploding ship or enemy and is called each time there is a collision
function drawBlast() {
      var canvas = document.getElementById('myCanvas');
                var context = canvas.getContext('2d');
    if (blast.length) {
       //explodesnd.play();
       
         for (var i = 0; i < blast.length; i++) {
             if (blast[i][3]>25){
                 explodesnd.play();
                 context.beginPath();
                 var grd=context.createRadialGradient(blast[i][0], blast[i][1],0, blast[i][0], blast[i][1],blast[i][3]);
             
        context.arc(blast[i][0], blast[i][1], blast[i][3], 0, Math.PI * 2);
     grd.addColorStop(.1, 'Black');
   
      grd.addColorStop(.25, 'yellow');
      grd.addColorStop(.65, 'orange');
     
      grd.addColorStop(1, 'black');
                 context.fillStyle = grd;
                 
                  context.closePath;
                  context.fill();
      context.beginPath();
                 context.lineWidth = 1;
      // stroke color
      context.strokeStyle = 'red';
                 context.fillStyle = 'black';
                 context.textAlign = 'center';
                    context.font = "bold 30px Arial";
                    context.fillText(blast[i][4], blast[i][0], blast[i][1]);  
                 context.strokeText(blast[i][4], blast[i][0], blast[i][1]);  
                  context.closePath;
                  context.fill();
                 context.stroke();
        //context.stroke();
         }
             
             
                
                    context.strokeStyle = "white";
                        for (var k = 0; k < 11; k++) {
                            bplus = -bplus;

                            context.beginPath();
                            context.moveTo(blast[i][0] + 10 * Math.cos(k * 20), blast[i][1] + 10 * Math.sin(k * 20));
                            context.lineTo(blast[i][0] + (blast[i][3] + bplus) * Math.cos(k * 20), blast[i][1] + (blast[i][3] + bplus) * Math.sin(k * 20));
                            context.closePath();
                            context.stroke();
                        }
                    
                    
            
                    if (blast[i][2] < 2) {
                        blast[i][2] = 0;
                    }
                    else {
                        blast[i][2]--;
                    }
                    if (blast[i][2] == 0) {
                        gamePoints=gamePoints+blast[i][4];
                        blast.splice(i, 1);
                    }
            
        }
    }
}
        
        
// setInterval(game, 25); // waits 25 milliseconds then repeats all of the above

function game() {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d'); // context is the variable to envoke all Canvas commands
    context.clearRect(0, 0, gamew, gameh); // Clears the entire screen
    context.strokeStyle = "gray" // Color of the object lines
    context.lineWidth = 2;
    context.fillStyle = "grey"; // Color of the Game Space
    context.strokeRect(0, 0, gamew, gameh); //Draw Game Space  
    context.save(); // Save the canvas location

    context.strokeStyle = "white" // Color of the object lines

   
}



function crosshairs() { //draws the crosshairs
    
                var canvas = document.getElementById('myCanvas');
                var context = canvas.getContext('2d');

    context.save();
    context.lineWidth = 2;
     context.strokeStyle = "white"
     context.fillStyle = "transparent"
    context.translate(touchX, touchY);
    context.beginPath();
    context.moveTo(0, -20)
    context.lineTo(0, 20)
    context.moveTo(-20, 0)
    context.lineTo(20, 0)
   
    context.rotate(-45 * Math.PI / 180);
    context.strokeRect(-10, -10, 20, 20);
    context.fill();
     context.stroke();
    context.restore();
    
   
}

function drawShot() { // determines if we can draw laser fire
    laserstart = 1;
    if (laserstatus > 0 && h > -1) {
        drawlaser();
        lasersnd.play();
        for (var s = 0; s < superenemies.length; s++) {
            if(touchX<superenemies[s][0]+20 && touchX>superenemies[s][0]-20 && touchY<superenemies[s][1]+20 && touchY>superenemies[s][1]-20){
                blast.push([touchX, touchY, 10, 25, 0])
                  
                    if( superenemies[s][5]=="red" & framecount==0){
                    superenemies[s][5]="cyan";
                     superenemies[s][3]=superenemies[s][3]*2;
                     superenemies[s][4]=superenemies[s][4]*2;
                        switchsnd.play();
                        //framecount++;
                        
                }
                   //  if( superenemies[s][5]=="cyan" & framecount==0){
                   // superenemies[s][5]="red";
                   //     superenemies[s][3]=superenemies[s][3]*2;
                   //  superenemies[s][4]=superenemies[s][4]*2;
                      //  framecount++;
                   // }
                    if(framecount > 3){
                        framecount=0;
                    }
                    
                       }
             }
        
        
        
     
        shot = false;
    }
    if (h > 0) {
        h = 0;
        laserstatus = 0;
        laserstart = 1;
    }
}

function spincalc() { //calculates the spin number to rotate the ship with variable speed

    if (shotstart == 1) { //if the shot was made start to spin the ship
        if (direction == "left") {
            spinspeed--; //if not at top speed then increase the speed of the ship turning in the negative direction
            if (spinspeed < (speedmax * -1)) {
                spinspeed = (speedmax * -1); //if you hit top speed don't increase the speed anymore
            }
        } else {
            spinspeed++; //if not at top speed then increase the speed of the ship turning in the positive direction
            if (spinspeed > speedmax) { //if you hit top speed don't increase the speed anymore
                spinspeed = speedmax;
            }
        }
        if (spin >= 360) { //if you've come all the way around, reset the spin by 360
            spin = spin - 360;
        }
        if (spin <= 0) { //if you've come all the way around, reset the spin by 360
            spin = spin + 360;
        }
        spin += spinspeed;
        spinspeed *= 1.6;
        //round out the variables so they are easier to work with
        xhairRadianround = Math.round(xhairRadian * 10) / 10;
        spinRound = Math.round(shipRadian * 10) / 10;
        spin = Math.round(spin * 100) / 100
    }
}

function drawship() {
var canvas = document.getElementById('myCanvas');
                var context = canvas.getContext('2d');
    spincalc()
    context.save(); // Save the canvas location  
    rotateship();
    makeship();
    context.restore(); // Restores our canvas (to its X&Y position - that way the game space rectangle is drawn at the same spot next time
    if (shipRadian == xhairRadian) {
        drawShot();
        shotprogress = true;
    }
}



function rotateship() { //rotates the ship
    var canvas = document.getElementById('myCanvas');
                var context = canvas.getContext('2d');
    if (spinRound >= xhairRadianround - 0.5 && spinRound <= xhairRadianround + 0.5 || spinRound > Math.PI * 2 || spinRound < 0) {; //if the ships close enough to the proper angle no need to animate just point the ship at the cursor
        shipRadian = xhairRadian;
        spinspeed = spindefault;
        shotstart = 0;
    } else { //if the angle is far enough off start to spin the ship 
        shipRadian = (spin * Math.PI / 180)
    }
    context.translate(shipx, shipy); // Move the Canvas Coordinates to the ship X & Y position (remember this moves each time)
    context.rotate(shipRadian);
}



function drawlaser() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    context.save();
    context.beginPath();
    context.translate(shipx, shipy);
    context.rotate(shipRadian - (-90 * Math.PI / 180))
    context.moveTo(shipSize * -.3, shipSize * -.3);
    context.restore();
    context.lineTo(touchX, touchY);
    context.save();
    context.translate(shipx, shipy);
    context.rotate(shipRadian - (-90 * Math.PI / 180));
    context.moveTo(shipSize * .3, shipSize * -.3);
    context.restore();
    context.lineTo(touchX, touchY);
    alphaset = 1-(h/20);
    linealpha = alphaset.toFixed(2);
    context.strokeStyle = "rgba(255, 0, 0,"+ linealpha+")";
    context.stroke();
    context.restore();
}

        
function blowemup() {
   var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    if (endgame==true){
        if(superenemies.length>0){
    for (var v = 0; v < superenemies.length; v++) {
    
     blast.push([superenemies[v][0], superenemies[v][1], 10, 30, superenemies[v][6]])
                    //superenemies.splice(v, 1);
                    superenemies[v][5]="yellow";
            }
    }
        superenemies=[];
        if(enemy.length>0){
         for (var e = 0; e < enemy.length; e++) {
    
    blast.push([enemy[e][0], enemy[e][1], 10, 50, enemy[e][8]]);
                    //superenemies.splice(v, 1);
                   // superenemies[v][5]="yellow";
            }
        }
        enemy=[];
             // if (superenemies[v][5]=="yellow" && superenemies.length>0){
           // superenemies.splice(v, 1);
        //}
        
        
         setTimeout(function(){
           senseinit = true;
             enemycount = enemycount+1;
             minecount = minecount+1;
             gameLevel = gameLevel+1;
             
            //alert("Audio Stop Successfully");
         },
        5000);
    
    }
    }
function drawsuper() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
     var friendlies = 0;
    if(superenemies.length>0){
    for (var v = 0; v < superenemies.length; v++) {
        
       
       
        superenemies[v][0] = superenemies[v][0] + superenemies[v][3] * Math.cos(superenemies[v][2]*2);
        superenemies[v][1] = superenemies[v][1] + superenemies[v][4] * Math.sin(superenemies[v][2]*2);
        context.save();
        context.beginPath();
        context.translate(superenemies[v][0], superenemies[v][1])
        context.shadowBlur = minesize*1.5;
        context.shadowColor = superenemies[v][5];
        context.fillStyle = "black";
        context.strokeStyle = "black";
        context.lineWidth = 1;
            
        context.arc(0, 0, minesize, 0, Math.PI * 2);
        context.closePath;
        context.fill();
        
        context.stroke();
        context.strokeStyle = superenemies[v][5];
        context.moveTo(-minesize/2,0);
        context.lineTo(minesize/2,0);
        context.moveTo(0, -minesize/2);
        context.lineTo(0, minesize/2);
        context.stroke();
        context.restore();

        if (superenemies[v][0] > canvas.width) {
            superenemies[v][0] = canvas.width;
            superenemies[v][3] *= -1;
        }
        if (superenemies[v][0] < 1) {
            superenemies[v][0] = 1;
            superenemies[v][3] *= -1;
        }
        if (superenemies[v][1] > canvas.height) {
            superenemies[v][1] = canvas.height - 1;
            superenemies[v][4] *= -1;
        }
        if (superenemies[v][1] < 1) {
            superenemies[v][1] = 2;
            superenemies[v][4] *= -1;
        }
            if(superenemies[v][5]=="cyan"){
                 friendlies++;
                if (friendlies>=superenemies.length){
                 endgame=true;
                    
 
                blowemup();
                 }
                else {
                 endgame=false;
                }
                
                if(enemy.length>0) {
            for (var e=0; e < enemy.length; e++){
                if(superenemies.length>0 && enemy.length>0){
                if (enemy[e][0]+enemysize*3>superenemies[v][0]-minesize&&enemy[e][0]-enemysize*3<superenemies[v][0]+minesize&&enemy[e][1]+enemysize*3>superenemies[v][1]-minesize&&enemy[e][1]-enemysize*3<superenemies[v][1]+minesize){
                   blast.push([enemy[e][0], enemy[e][1], 10, 50, enemy[e][8]]);
                   
                   
                   
                   // explodesnd.play();
                   //gamePoints=gamePoints+enemy[e][8];
                     if(enemy.length>0){
                     enemy.splice(e, 1);
                     }
                    if(superenemies.length>0) {
                    superenemies.splice(v, 1);
                    }
                                                    }
            }
            }
               
        }
            }
        else{
            if(superenemies.length>0){
            
             if(shipCount > 0 && superenemies[v][0] > shipx-60  && superenemies[v][0] < shipx+60 && superenemies[v][1] > shipy-60  && superenemies[v][1] < shipy+60 ){
        superenemies.splice(v, 1);
        blast.push([shipx, shipy, 10, 50, 0]);
        shipCount = shipCount -1;
            
        }
        }
            
        }
       
    }
}
}


function makeship() {
    var canvas = document.getElementById('myCanvas');
                var context = canvas.getContext('2d');
    context.save();
    context.rotate(-90 * Math.PI / 180);
    context.beginPath();
    context.moveTo(shipSize * -.3, shipSize * .2);
    context.lineTo(shipSize * -.4, shipSize * -.1);
    context.lineTo(shipSize * .1, shipSize * .4);
    context.lineTo(0, shipSize * .5);
    context.lineTo(shipSize * -.1, shipSize * .4);
    context.lineTo(shipSize * .4, shipSize * -.1);
    context.lineTo(shipSize * .3, shipSize * .2);
    context.moveTo(shipSize * -.4, shipSize * -.1);
    context.lineTo(shipSize * .3, shipSize * -.5);
    context.lineTo(0, shipSize * .3);
    context.lineTo(shipSize * -.3, shipSize * -.5);
    context.lineTo(shipSize * .4, shipSize * -.1);
    context.strokeStyle = "white";
    context.stroke();
    context.restore();
}
        
        
        //this draws the two squares of the enemyship that rotate
function drawenemy() {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
      context.fillStyle="green";
    context.textAlign = 'center';
    context.font = "20px monospace";
    
    for(var i = 0; i < enemy.length; i++) {
       // context.fillText(enemy[i][6]-enemy[i][7],enemy[i][0],enemy[i][1]-enemysize*5);
    context.lineWidth = 1;
    context.save();
       // enemyx= enemyx+1;
       enemy[i][0]=enemy[i][0]+enemy[i][3];
        if( enemy[i][0]>canvas.width){
            enemy[i][0]=1;
        }
        enemy[i][7]=enemy[i][7]+1;
   // context.translate(enemyx,enemyy);
        if(enemy[i][7]>enemy[i][6]){
            enemy[i][7]=0;
            enemy[i][5]="red";
            rndx = (Math.round(Math.random() * canvas.width));
                        randangle = (Math.round(Math.random() * 5)+1);
                        superenemyspeed = (Math.round(Math.random() * 8)+1);
                        superenemies.push([enemy[i][0], enemy[i][1], randangle, superenemyspeed, superenemyspeed, "red", minePoints*2]);
        }
        if(enemy[i][7]>0 && enemy[i][7]<enemy[i][6]) {
            enemy[i][5]="green";
        }
        context.strokeStyle = enemy[i][5];
        context.translate(enemy[i][0],enemy[i][1]);
      context.beginPath();
    context.strokeRect(-enemysize, -enemysize, enemysize*2, enemysize*2);   
        context.arc(0, 0, enemysize*3, 0, Math.PI * 2, true);
        context.closePath();
        context.stroke();
        context.rotate(enemyrotatedeg * Math.PI / 180);
//    context.translate(0, 0);
    for (var b = 0; b < 2; b++) {
  //      context.translate(0, 0);
        context.rotate(45*Math.PI/180)
        context.strokeRect(-enemysize*2.5, -enemysize*2.5, enemysize*5, enemysize*5);
        
    }
    context.restore();
        }
}




var hiddenObj, visChangeEvent; 
if (typeof document.hidden !== "undefined") { 
    hiddenObj = "hidden";
    visChangeEvent = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hiddenObj = "msHidden";
    visChangeEvent = "msvisibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
    hiddenObj = "mozHidden";
    visChangeEvent = "mozvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hiddenObj = "webkitHidden";
    visChangeEvent = "webkitvisibilitychange";
}

function PrivacyClose() {
    $("#privacy").hide(1500, function () {
        $("#privacyheader").show();
        $("#splashscreen").hide();
        $("#appcontext").show();
        $("#appcontext").find("div").show();
        main_logic();
    });
}

function PlatformReady() {
    $("#checkok").hide(1500, function () {
        $("#privacy").show(1000);
    });
}

function ReadyCheck() {
                    $("#check").hide(500, function () {
                    $("#checkok").show(1000, function () {
                        setTimeout(PlatformReady, 2000);
                    });
                });
    
}

function Start() {
    $("div").hide();
    $("#splashscreen").fadeIn(2000);
    $("#check").show(500, function () {
        // check platform compatibility
        intel.realsense.SenseManager.detectPlatform(['face3d'], []).then(function (info) {
            document.getElementById("Start").disabled = true;
            if (info.nextStep == 'ready') {
                       setTimeout(ReadyCheck, 1000);
                //$("#check").hide(5000, function () {
                  //  $("#checkok").show(1000, function () {
                    //    setTimeout(PlatformReady, 2000);
                //    });
                //});
                document.getElementById("Start").disabled = false;
            }
            else if (info.nextStep == 'unsupported') {
                $('#fail').append('<b> Platform is not supported for Intel(R) RealSense(TM) SDK: </b>');
                $('#fail').append('<b> either you are missing the required camera, or your OS and browser are not supported </b>');
                $('#fail').show();
            } else if (info.nextStep == 'driver') {
                $('#fail').append('Please update your camera driver from your computer manufacturer.');
                $('#fail').show();
            } else if (info.nextStep == 'runtime') {
                $('#download').show(1000);
            }

        }).catch(function (error) {
            $('#fail').append("CheckPlatform failed " + JSON.stringify(error));
            $('#fail').show();
        });
    });
};


function main_logic() {
    var sense;
    $(window).bind("beforeunload", function (e) {
        if (sense != undefined) {
            sense.release().then(function (result) {
                sense = undefined;
            });
        }
    })

    $(document).ready(function () {   
        var rs = intel.realsense; // name space short-cut
        var faceModule; // face module instance
        var faceConfig; // face module configuration instance

        var imageSize; //image stream size
        var factor = 0.05; // scaleFactor for the sample renderer
        var nodestorender; // data structure to hold sphere objects to render
        var maxTrackedFaces = 1; // sample renderer showcases only landmark points for upto 3 faces 
       // document.getElementById("Start").disabled = true;

        // Pause the module when the page goes out of view
        $(document).bind(visChangeEvent, function() {
            if (sense !== undefined && faceModule !== undefined) {
                if (document[hiddenObj]) {
                    faceModule.pause(true);
                }
                else {
                    faceModule.pause(false);
                }
            }
        });

        $('#Start').click(function () {
            document.getElementById("Start").disabled = true;

            // Create a SenseManager instance
            rs.SenseManager.createInstance().then(function (result) {
                sense = result;
                return rs.face.FaceModule.activate(sense);
            }).then(function (result) {
                faceModule = result;
                return faceModule.createActiveConfiguration();
            }).then(function (result) {
                faceConfig = result;

                // Enable face detection
                faceConfig.detection.isEnabled = true;
                    //document.getElementById("detection").checked;                  
                faceConfig.detection.maxTrackedFaces = maxTrackedFaces;
                //var selects = document.getElementById("mode");

                // Set the tracking mode 2D/3D
                faceConfig.trackingMode = 1;
                    //Number(selects.options[selects.selectedIndex].value);

                // Apply Face Configuration changes
                return faceConfig.applyChanges();
            }).then(function (result) {
                status('Init started');
                sense.onStatusChanged = onStatus;
                faceModule.onFrameProcessed = onFaceData;
                return sense.init();
            }).then(function (result) {
                if (sense.captureManager.device.deviceInfo.orientation == intel.realsense.DeviceOrientation.DEVICE_ORIENTATION_FRONT_FACING) {
                    // if current device is front facing

                    // Enable face landmarks, pose and expressions
                    faceConfig.landmarks.isEnabled = true;
                        //document.getElementById("landmarks").checked;
                    faceConfig.landmarks.maxTrackedFaces = maxTrackedFaces;
                    //faceConfig.pose.isEnabled = document.getElementById("pose").checked;
                    //faceConfig.expressions.properties.isEnabled = document.getElementById("expressions").checked;
                } else {
                    // if current device is R200

                    // Disable face landmarks, pose, expressions
                    faceConfig.landmarks.isEnabled = false;
                    faceConfig.pose.isEnabled = false;
                    faceConfig.expressions.properties.isEnabled = false;

                  //  document.getElementById("landmarks").checked = false;
                    //document.getElementById("pose").checked = false;
                    // document.getElementById("expressions").checked = false;
                }

                // Apply Face Configuration changes
                return faceConfig.applyChanges();
            }).then(function (result) {
                // Query image size 
                imageSize = sense.captureManager.queryImageSize(rs.StreamType.STREAM_TYPE_COLOR);

                // Start Streaming
                return sense.streamFrames();
            }).then(function (result) {
                status('Streaming ' + imageSize.width + 'x' + imageSize.height);
                document.getElementById("Stop").disabled = false;

                //initialize renderer
                if (scene == null) {
                    nodestorender = initFaceRenderer(imageSize.width, imageSize.height, maxTrackedFaces);
                }

            }).catch(function (error) {
                // handle pipeline initialization errors
                status('Init failed: ' + JSON.stringify(error));
                document.getElementById("Start").disabled = false;
            });
        });

        
        
         function clear() {
                $('#pose_status').text('');
                $('#expressions_status').text('');
                document.getElementById("Start").disabled = false;
                var canvas = document.getElementById('myCanvas');
                var context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        
        
        
           
        
        
        
        
        
        
        
        
        
        function onFaceData(sender, data) {
 //Port place Canvas Variables
            
var canvas = document.getElementById('myCanvas');
                var context = canvas.getContext('2d');

                var headTolerance = 10;

                CanScale = (window.innerHeight/imageSize.height)*.95; 
                canvas.width = (imageSize.width*CanScale);
                canvas.height = (imageSize.height*CanScale);
                shipx = canvas.width/2;
                shipy = canvas.height/2;
                
                //
                
                if(senseinit==true){
                    for (var i = 0; i < minecount; i++) {
                        rndx = (Math.round(Math.random() * canvas.width));
                        rndy = (Math.round(Math.random() * 2))
                        randangle = (Math.round(Math.random() * 5)+1);
                        superenemyspeed = (Math.round(Math.random() * 8)+1);
                        superenemies.push([rndx, (canvas.height*rndy)-canvas.height, randangle, superenemyspeed, superenemyspeed, "red", minePoints]);
                        //minearray= [X, Y, angle, xspeed,yspeed, color, points] 
                    // enemies[i][2] = 0;
                    }
                      senseinit=false;
                  
              
                
                //
                
                
                  // Create EnemyShip
                
               
                    for (var e = 0; e < enemycount; e++) {
                        rndx = (Math.round(Math.random() * canvas.width));
                         rndy = (Math.round(Math.random() * canvas.height))
                        randangle = (Math.round(Math.random() * 5)+1);
                         enemyspeed = (Math.round(Math.random() * 8)+1);
                        enemy.push([rndx, rndy, enemysize, enemyspeed, enemyspeed, "green", 75+(randangle + enemyspeed)*enemyspeed*3, 1, enemyPoints]);
                        //enemyarray= [X, Y, size, xspeed, yspeed, color, release_mine_angle, release_mine_counter, points] 
                    // enemies[i][2] = 0;
                    }
                      senseinit=false;
                }   
            
            
            
            
            
            
            


            // notify sample renderer
            if(data.faces.length == 0) clearFaceRendererData();

            // for every face in current frame
            for (f = 0; f < data.faces.length; f++) {

                // retrieve a face module instance
                var face = data.faces[f];

                // if face is not valid
                if (face == null) continue;

                // retrieve face detection data
                if (face.detection != null) {
                   
                    
                    if (face.detection.faceBoundingRect !== 'undefined') {

                        // retrieve face detection bounding rectangle
                        var rectangle = face.detection.boundingRect;

//Port Place face bounding canvas code
                        
                         //var rectangle = face.detection.faceBoundingRect;
                            context.beginPath();
                            context.lineWidth = 10;
                            context.strokeStyle = "rgba(0, 255, 0, 0.3)";
                            context.rect(0,0, canvas.width, canvas.height);
                             context.stroke();
                            context.strokeStyle = "rgba(0, 255, 255, 0.3)";
                            context.rect(-rectangle.x*CanScale+ canvas.width, rectangle.y*CanScale, -rectangle.w*CanScale, rectangle.h*CanScale);
                           // context.rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
                            context.stroke();
                        }
                    
                }

                // retrieve face landmark points
                
if (face.landmarks.points !== 'undefined') {                    

    // for (var i = 0; i < face.landmarks.landmarksPoints.length; i++) {
                         var topLipMid = face.landmarks.points[47];
                        var botLipMid = face.landmarks.points[51];
                        var browpoint = face.landmarks.points[7];
                        var mideye = face.landmarks.points[20];
                           var lnose = face.landmarks.points[30];
                        var rnose = face.landmarks.points[32];
                         var nosewidth= (rnose.image.x - lnose.image.x);
                        var  raisedbrow = (mideye.image.y - browpoint.image.y)*1.2;
                        var openmouth = (botLipMid.image.y - topLipMid.image.y)*3;
                            point = face.landmarks.points[29];
                            if (point != null) {
                                shot=true;
                               // noseX = -1*point.image.x + canvas.width;
                               noseX  = -1*(point.image.x*CanScale) + canvas.width;

                                noseY = (point.image.y*CanScale);
                               // touchX = (noseX-shipx)*(CursorRatioX)+shipx
                                //touchY = (noseY-shipy)*(CursorRatioY)+shipy
                                 touchX = ((noseX-canvas.width/2)*CursorRatio)+canvas.width/2
                                touchY = ((noseY-canvas.height/2)*CursorRatio)+canvas.height/2;
                              // console.log(noseY);
                                context.beginPath();
                                 context.lineWidth = 3;
                                context.fillStyle="black";
                                context.strokeStyle = 'rgba('+radialcolor+','+radialcolor2+','+radialcolor3+',0.3)';

                                 context.arc(noseX, noseY, raisedbrow*CanScale, 0, 2 * Math.PI);
                                context.closePath();
                                context.stroke();
                                                                context.fill();
                                
                                

                                
                                context.beginPath();
                                context.moveTo(-rectangle.x*CanScale + canvas.width, noseY);
                                context.lineTo(noseX, noseY);
                                  context.closePath();
                                context.stroke();
                                
                                context.beginPath();
                                 context.moveTo(noseX, rectangle.y*CanScale);
                                context.lineTo(noseX, noseY);
                                  context.closePath();
                                
                            
                                context.stroke();
                                
                                context.beginPath();
                                context.lineWidth = 3;
                                context.arc(noseX, noseY, nosewidth*CanScale, 0, 2 * Math.PI);
                                context.stroke();
                                 context.closePath();
                                 context.beginPath();
                                 context.lineWidth = 3;
                                context.fillStyle='rgba(0,0,0,0.2)';
                                context.strokeStyle = 'rgba('+radialcolor+','+radialcolor2+','+radialcolor3+',0.3)';
                                
                                 context.arc(noseX, noseY, openmouth*CanScale, 0, 2 * Math.PI);

                                context.closePath();
                                context.stroke();
                                                                context.fill();

                                
                               // context.beginPath();
                            
                               // context.lineWidth = 2;
                              //  context.strokeStyle = 'red';
                                //context.stroke();
                                if (laserstatus > 0 && laserstart > 0) { // draw color the laser red when fired
                                    h++;
                                }
                                $(document).ready(function() {
                                    //crosshairs();
                                  
                                    context.arc(noseX, noseY, 2, 0, 2 * Math.PI);
                                    animstars()
                                    
                                    if(gameLevel > 0){
                                    if( shipCount < 1) {
                                        context.fillStyle="red";
    context.textAlign = 'center';
    context.font = "100px monospace";
    context.fillText("Game Over", canvas.width/2, canvas.height/2);
                                         
                                    }
                                    else {
                                    
                                    drawship();
                                        }
                                    drawsuper();
                                    drawBlast();
                                    enemyrotatedeg += 2;
                                    if(superenemies.length<1){
                                    context.fillStyle="green";
    context.textAlign = 'center';
    context.font = "30px monospace";
    context.fillText("Level: "+ (gameLevel + 1), canvas.width/2, canvas.height*.3);
                                          context.fillText("Get Ready", canvas.width/2, canvas.height*.7);
                                    }
             //   if (enemyrotatedeg > 45) {
              //      enemyrotatedeg = 0;
             //    }
                                   drawenemy();
                                   // drawAsteroids() 
                                    
                                    context.fillStyle="cyan";
                                    context.font = "20px Arial";
                                    context.textAlign = 'center';
    
   
        context.fillText("Lives: " + shipCount + "  Score: "+gamePoints+"  Level: "+ gameLevel ,canvas.width/2,canvas.height/20);
      
                        context.save();
                                    context.restore();
                                }
                                    else{
                                    intro();
                                    }
                                    crosshairs();
                                });

    
 


    if (shot) { // when clicking mouse this we calculate the angle to the point clicked
       // laserstatus = 1;
        if (openmouth > nosewidth){ //|| raisedbrow > nosewidth 
        laserstatus = 1;
            radialcolor = 255;
            radialcolor2 = 0;
            radialcolor3 = 0;
        }
        else {
            laserstatus = 0;
            framecount=0;
            radialcolor = 0;
            radialcolor2 = 255;
            radialcolor3 = 255;
        }
        xhairRadian = Math.atan2(touchY - shipy, touchX - shipx); // Calculate radian angle of target fire
        if (xhairRadian <= 0) { // The above calulate a negative radian. Turn the negative radian into is positive counterpart
            xhairRadian = 2 * Math.PI + xhairRadian;
        }
        deltaRadian = xhairRadian - shipRadian
        if (deltaRadian < -Math.PI || deltaRadian > Math.PI) { // determine if the spin direction should be left or right
            if (xhairRadian < shipRadian) {
                direction = "right";
            }
            if (xhairRadian > shipRadian) {
                direction = "left";
            }
        } else { // else if the difference in angle is positive spin toward the right
            if (xhairRadian > shipRadian) {
                direction = "right";
            }

            if (xhairRadian < shipRadian) { /// if the difference in angls is negative spin toward the left
                direction = "left";
            }
        }
        shotstart = 1; // shotstart = 1 means we've finished the calculations and are ready to shoot the laser at the target
    }
                            }
                        //}
                    }

                if (face.pose !== 'undefined' && face.pose != null) {
                    $('#pose_status').text('Pose: ' + JSON.stringify(face.pose));
                } else {
                    $('#pose_status').text('');
                }
                if (face.expressions !== null && face.expressions.expressions != null) {
                    $('#myTable').find('tr:gt(0)').remove();
                    var exprs = face.expressions.expressions;
                    $.each(intel.realsense.face.ExpressionsData.FaceExpression, function(key, index) {
                        $('#myTable tr:last').after('<tr> <td>' + key + "</td> <td> +" + exprs[index].intensity + "</td></tr>");
                    });
                } else {
                    $('#expressions_status').text('');
                }
            }
        }

        // Clear Pose & Expression fields
        function clear() {
            $('#pose_status').text('');
            $('#expressions_status').text('');
            document.getElementById("Start").disabled = false;
            clearFaceRendererData();
        }

        $('#Stop').click(function () {
            document.getElementById("Stop").disabled = true;
            sense.release().then(function (result) {
                status('Stopped');
                sense =undefined;
                clear();
            });
        });

        function onStatus(sender, sts) {
            if (sts < 0) {
                status('Module error with status code: ' + sts);
                clear();
            }
        }

        function status(msg) {
            $('#status').text(msg);
        }
    });
}

$(document).ready(Start);