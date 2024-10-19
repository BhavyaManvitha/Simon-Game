var buttonColours = ["red", "blue", "green", "yellow"];
var pattern=[];


var userClickedPattern=[];
$( ".btn" ).click(function() {
    
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  } );

  function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber=Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[randomNumber];
    pattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColour){
    $( "#"+currentColour ).addClass( "pressed" );
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

var started=false;
var level=0;
$(document).keydown(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
  } );


function checkAnswer(currentLevel){
     if(userClickedPattern[currentLevel] == pattern[currentLevel]){
      if(userClickedPattern.length == pattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
     }
     else{
      $("#level-title").text("Game Over, Press Any Key to Restart ");
      playSound("wrong")
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
     }
  }


  function startOver(){
    level=0;
    pattern=[];
    started=false;
  }