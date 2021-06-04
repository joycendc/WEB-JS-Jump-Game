//Initializing variables to reference from dom elements
const character = document.getElementById("character");
var obstacle = document.getElementById("obstacle");
const score = document.getElementById("score");
const text = document.getElementById("text");

//initialization of obstacles images
var obstacles = ['url("./obstacle1.png")', 'url("./obstacle2.png")'];

//Function to make the character jump by using css animation 
//To adjust the character postion based on the given animation frame
function jump() {
  character.classList.add("jump-animation");
  setTimeout(() =>
  character.classList.remove("jump-animation"), 500);
}

//Making obstacle hideen when game hasnt started yet
obstacle.style.display = 'none';

//Event listener for user keypress that make the game start
document.addEventListener('keypress', (event) => {
  if (!character.classList.contains('jump-animation')) {
    //calling jump function when keypressed
    jump();
  }

  //hiding the game guide when game starts
  text.style.display = 'none';
  
  //Loop that only ends when player hit the obstacle
  setInterval(() => {

    //getting the top prperty of the character for collision purpose
    const characterTop = parseInt(window.getComputedStyle(character)
      .getPropertyValue('top'));
    //getting the left prperty of the obstacle for collision purpose
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle)
      .getPropertyValue('left'));
    

    //Changing obstacle using random function to select image on array
    // when the obstacle respawned
    if(obstacleLeft >= 550){
      obstacle.style.backgroundImage = obstacles[Math.random()<0.5?0:1];
    }
    
    //Checking the obstacle and increasing score 
    //when character successfully pass without hitting the obstacle
    if (obstacleLeft < 0) {
      obstacle.style.display = 'none';
      score.innerText++;
    } else {
      //else do nothing and loop
      obstacle.style.display = ''
    }
    
    //Checking when character collided on the obstacle
    //and hiding the obstacle 
    //then showing alert that game is over and window willreload
    if (obstacleLeft < 50 && obstacleLeft > 0 && characterTop > 150) {
      obstacle.style.display = 'none';
      alert("You got a score of: " + score.innerText +
        "\n\nPlay again?");
      location.reload();
    }
  }, 50);
})


