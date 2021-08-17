const game = document.getElementById("game");
const path = document.getElementById("path");
const bot = document.getElementById("bot");
const character = document.getElementById("character");
var obstacle = document.getElementById("obstacle");
const score = document.getElementById("score");
const text = document.getElementById("text");
const image = document.getElementsByClassName("img");
const start = document.getElementById("start");
const jumpSound = document.getElementById("jump");
const card = document.querySelector(".card");
const gameplay = document.querySelector(".gameplay");
const container = document.querySelector(".container");
const crazier = document.getElementById("crazier");
const modal = document.querySelector(".modal");

crazier.play();

gameplay.style.display = 'none';


setTimeout(
  function() {
    container.style.display = 'none';
    gameplay.style.display = 'flex';
    
  }, 3000);

jumpSound.volume = 0.1;
var obstacles = ['url("images/cen.png")', 'url("images/cen.png")'];

// character.style.backgroundImage = `url('images/love.png')`;
game.style.backgroundImage = `url('images/bg${parseInt(score.innerText) + 1}.png')`;

// game.style.background = colors[score.innerText];

obstacle.style.display = 'none';
card.style.display = 'none';


var i = 0;

game.style.display = 'none'; 
path.style.display = 'none'; 
bot.style.display = 'none'; 

var selector = function (event) {
  gameplay.style.backgroundImage = `url('images/bg${parseInt(score.innerText) + 1}.png')`;
  start.style.display = 'none'; 
  game.style.display = 'block'; 
  path.style.display = 'block'; 
  bot.style.display = 'block'; 
  
  var selected = event.target.id;

  if(selected === "one"){
    character.style.backgroundImage = `url('images/love.png')`;
    obstacle.style.backgroundImage = `url('images/cen.png')`;
  }else{
    obstacle.style.backgroundImage = `url('images/love.png')`;
    character.style.backgroundImage = `url('images/cen.png')`;
    obstacle.style.transform = "rotateY(180deg)";
    character.style.transform = "rotateY(180deg)";
  }
}
        
document.querySelectorAll('.img').forEach(item => {
  item.addEventListener('click', selector, false);
});

jumpSound.addEventListener('timeupdate', function() {
  var t = jumpSound.currentTime;
  if (t > jumpSound.duration - 1.4) {
      jumpSound.pause();
      jumpSound.currentTime = 0;
  }
});

function jump() {
  character.classList.add("jump-animation");
  setTimeout(() => 
  character.classList.remove("jump-animation"), 500);
}

var jumperFunction = function (event) {
  text.style.display = "none";
  jumpSound.play();
  if (!character.classList.contains('jump-animation')) {
    jump();
  }

  setInterval(() => {

    const characterTop = parseInt(window.getComputedStyle(character)
      .getPropertyValue('top'));
   
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle)
      .getPropertyValue('left'));
    
    if (obstacleLeft < 0) {
      obstacle.style.display = 'none';
      score.innerText++;
       if(score.innerText >= 19){ 
         container.style.display = 'block';
         gameplay.parentNode.removeChild(gameplay);
      
         modal.style.display = 'block';
         setTimeout(
        function() {
          container.style.display = 'none';
          card.style.display = 'block';
          modal.style.display = 'none';
          
        }, 2500);
         game.style.display = 'none'; 
         path.style.display = 'none'; 
         bot.style.display = 'none'; 
         score.innerText = 0;
         document.body.style.background = "white";
         document.body.style.color = "crimson";
       }
    } else {
      obstacle.style.display = '';
    }

    if (obstacleLeft < 50 && obstacleLeft > 0 && characterTop > 150) {
      obstacle.style.display = 'none';
      if(score.innerText > 0){
        score.innerText--;
        game.style.backgroundImage = `url('images/bg${parseInt(score.innerText) + 1}.png')`;
        gameplay.style.backgroundImage = `url('images/bg${parseInt(score.innerText) + 1}.png')`;
        // game.style.background = colors[score.innerText];
      }
     // if(score.innerText == 0) text.style.opacity = 1;
    }else if(obstacleLeft >= 550){ 
      game.style.backgroundImage = `url('images/bg${parseInt(score.innerText) + 1}.png')`;
      gameplay.style.backgroundImage = `url('images/bg${parseInt(score.innerText) + 1}.png')`;
      // game.style.background = colors[score.innerText];
      // obstacle.style.backgroundImage = obstacles[Math.random()<0.5?0:1];
    }
  }, 50);
}

document.addEventListener('keypress', jumperFunction, false);
document.addEventListener('touchstart', jumperFunction, false);