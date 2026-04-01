////KEY PRESS CODE////
//Sets the keyboard keys we want to use as a piano keys.
const WHITE_KEYS = ['a', 's', 'd', 'f', 'g', 'h', 'j']
const BLACK_KEYS = ['w', 'e', 't', 'y', 'u']

//Everything is var because i am changing the keyboards ahead.
//gets everything from the html code that is class key.
var keys = document.querySelectorAll('.key')
//gets all the keys that are a key + they are white
var WhiteKeys = document.querySelectorAll('.key.white.p1')
//gets all the keys that are a key + they are black
var BlackKeys = document.querySelectorAll('.key.black.p1')

//Makes the piano work with clicking.
//This even listener work with 'click' as you can see.
keys.forEach(key => {
  key.addEventListener('click', () => playNote(key))
})

//Makes the piano work with keyboard keys
//This even listener work with 'keydown' as you can see.
document.addEventListener('keydown', e => {
  //This thing here saves your ears.
  //Basically in case someone keeps a button pressed. Instead of infinitelly repeating the sound, it returns nothing instead of playing the sound.
  if (e.repeat) return null
  //This is the key we pressed
  var key = e.key
  //So these keep the value of the current key pressed based on the index of our white or black keys
  var WhiteKeyIndex = WHITE_KEYS.indexOf(key)
  var BlackKeyIndex = BLACK_KEYS.indexOf(key)

  //If the white key index is greater than -1 (which means nothing from the white keys was pressed) then play that note! Same with the black keys.
  //So e.g. for the white keys play from the "key white" html file the key which corresponds to the WhiteKeyIndex variable. Which is the press of our button.
  if (WhiteKeyIndex > -1) playNote(WhiteKeys[WhiteKeyIndex])
  if (BlackKeyIndex > -1) playNote(BlackKeys[BlackKeyIndex])
})

function playNote(key) {
  //Selects the correct audio
  var noteAudio = document.getElementById(key.dataset.note)
  //This return the audio to 0 position so we cant play the piano with the speed of light!
  noteAudio.currentTime = 0
  //Actually plays the audio
  noteAudio.play()
  key.classList.add('pressed')
  //removes the pressed state from the keys after half a second passes. (500ms)
  setTimeout(function () {
    key.classList.remove('pressed')
  }, 500);
  //The following removes the pressed state from the keys when the actual audio is over (in other words when the event has ended)
  //I found out this way isnt really effective if you want to add high quality sounds with reverb so i made my own on top of it
  //You can still use this method if you want to.
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('pressed')
  })
}

////FIND THE MELODY GAME////
// The hidden melody is basically a string.
var HiddenMelody = "hydwt"
var PlayersInput = ""
window.addEventListener("keypress", function(e) {
    PlayersInput += String.fromCharCode(e.keyCode)
    //Every time  the player plays a key i gets incremented
    //If the player pressed more keys than the legnth of the hidden melody their input gets reseted
    //And also if the melody wasnt correct in the first place. It gets reseted too.
    for (var i = 0; i < HiddenMelody.length; i++) {
        if (PlayersInput[i] != HiddenMelody[i] && PlayersInput[i] != undefined) {
            PlayersInput = ""
        }
    }
    //Checks if the melody the player played is the correct one.
    if (PlayersInput == HiddenMelody) {
        //Plays a happy sound when you find the melody! Thats a very important feature!
        document.getElementById("CongratulationsSound").currentTime = 0
        document.getElementById("CongratulationsSound").play()
        alert("Συγχαρητήρια! Έπαιξες την μελωδία της IA με επιτυχία!\n\nΗ σειρά της μελωδίας είναι: A-G#-E-C#-F#\n\nΜπορείς να μεταβείς πίσω στην κεντρική σελίδα και να απαντήσεις στο quiz!")
        //Return the players input to 0 so the message can appear again.
        PlayersInput = ""
    }
})

////INSTRUMENT SELECT CODE////
// Our intruments with their coresponding tones
var piano5 = document.getElementById("piano5ID")
var piano6 = document.getElementById("piano6ID")
var guitar5 = document.getElementById("guitar5ID")
var guitar6 = document.getElementById("guitar6ID")
// The instrument changer button
const ChangeInstrumentBtn = document.querySelectorAll('.InstButton')

ChangeInstrumentBtn.forEach(InstButton => {
  InstButton.addEventListener('click', () => InstBtnColor(InstButton))
})

// This function is responsible for the coloring of the button
let ColorSync = 0;
function InstBtnColor(InstButton){
    if (ColorSync % 2 !== 0){
      InstButton.classList.add('pressed')
    }
    else {
      InstButton.classList.remove('pressed')
    }
}

// This needs to be up here so the button works on the first itteration.
//guitar5.style.display = "none";
// This time the onclick function is in the html document and this function is called from there
function ModInstBtn() {
    if (ColorSync % 2 === 0) {
      guitar5.style.display = "flex"
      guitar6.style.display = "none"
      piano5.style.display = "none"
      piano6.style.display = "none"
      // Switching to the coresponding keys.
      WhiteKeys = document.querySelectorAll('.key.white.p3')
      BlackKeys = document.querySelectorAll('.key.black.p3')
      // I increase the ColorSync here so we dont have problem with the event listener above
      ColorSync = ColorSync + 1;
    }
    else {
      piano5.style.display = "flex"
      piano6.style.display = "none"
      guitar5.style.display = "none"
      guitar6.style.display = "none"
      // Switching to the coresponding keys.
      WhiteKeys = document.querySelectorAll('.key.white.p1')
      BlackKeys = document.querySelectorAll('.key.black.p1')
      // I increase the ColorSync here so we dont have problem with the event listener above
      ColorSync = ColorSync + 1;
    }
}

////NOTE SCALE SELECT CODE////
//guitar6.style.display = "none"
// Octave Up Button Function
// Works like... Disable everything else based on the ColorSync's mod 2 value
function OctChangerUP() {
  if (ColorSync % 2 === 0) {
    piano6.style.display = "flex"
    piano5.style.display = "none"
    guitar6.style.display = "none"
    guitar5.style.display = "none"
    // Switching to the coresponding keys.
    WhiteKeys = document.querySelectorAll('.key.white.p2')
    BlackKeys = document.querySelectorAll('.key.black.p2')
  }
  else {
    guitar6.style.display = "flex"
    guitar5.style.display = "none"
    piano6.style.display = "none"
    piano5.style.display = "none"
    // Switching to the coresponding keys.
    WhiteKeys = document.querySelectorAll('.key.white.p4')
    BlackKeys = document.querySelectorAll('.key.black.p4')
  }
}

function OctChangerDOWN() {
  if (ColorSync % 2 === 0) {
    piano5.style.display = "flex"
    piano6.style.display = "none"
    guitar5.style.display = "none"
    guitar6.style.display = "none"
    // Switching to the coresponding keys.
    WhiteKeys = document.querySelectorAll('.key.white.p1')
    BlackKeys = document.querySelectorAll('.key.black.p1')
  }
  else {
    guitar5.style.display = "flex"
    guitar6.style.display = "none"
    piano5.style.display = "none"
    piano6.style.display = "none"
    // Switching to the coresponding keys.
    WhiteKeys = document.querySelectorAll('.key.white.p3')
    BlackKeys = document.querySelectorAll('.key.black.p3')
  }
}


////KEYBOARD LAYOUT BUTTON CODE////
//For the layout button css stuff
const ChangeLayourBtn = document.querySelectorAll('.LayoutButton')
ChangeLayourBtn.forEach(LayoutButton => {
  LayoutButton.addEventListener('click', () => LayoutBtnColor(LayoutButton))
})

let LayoutColorCounter = 0;
function LayoutBtnColor(LayoutButton){
  if (LayoutColorCounter % 2 !== 0) {
    //Add css state
    LayoutButton.classList.add('pressed');
  }
  else {
    //Remove css state
    LayoutButton.classList.remove('pressed');
  }
}

function LayoutChange(){
  LayoutColorCounter = LayoutColorCounter + 1;
  if($(KeyLayoutBtn).text() == "Keyboard Layout OFF") {
    //Change the button name
    $(KeyLayoutBtn).text("Keyboard Layout ON");

    //Corresponding piano notes on keyboard
    $(P_C5k).text("A");
    $(P_Cs5k).text("W");
    $(P_D5k).text("S");
    $(P_Ds5k).text("E");
    $(P_E5k).text("D");
    $(P_F5k).text("F");
    $(P_Fs5k).text("T");
    $(P_G5k).text("G");
    $(P_Gs5k).text("Y");
    $(P_A5k).text("H");
    $(P_As5k).text("U");
    $(P_B5k).text("J");

    $(P_C6k).text("A");
    $(P_Cs6k).text("W");
    $(P_D6k).text("S");
    $(P_Ds6k).text("E");
    $(P_E6k).text("D");
    $(P_F6k).text("F");
    $(P_Fs6k).text("T");
    $(P_G6k).text("G");
    $(P_Gs6k).text("Y");
    $(P_A6k).text("H");
    $(P_As6k).text("U");
    $(P_B6k).text("J");

    //Corresponding guitar notes on keyboard
    $(G_C5k).text("A");
    $(G_Cs5k).text("W");
    $(G_D5k).text("S");
    $(G_Ds5k).text("E");
    $(G_E5k).text("D");
    $(G_F5k).text("F");
    $(G_Fs5k).text("T");
    $(G_G5k).text("G");
    $(G_Gs5k).text("Y");
    $(G_A5k).text("H");
    $(G_As5k).text("U");
    $(G_B5k).text("J");

    $(G_C6k).text("A");
    $(G_Cs6k).text("W");
    $(G_D6k).text("S");
    $(G_Ds6k).text("E");
    $(G_E6k).text("D");
    $(G_F6k).text("F");
    $(G_Fs6k).text("T");
    $(G_G6k).text("G");
    $(G_Gs6k).text("Y");
    $(G_A6k).text("H");
    $(G_As6k).text("U");
    $(G_B6k).text("J");
  }
  else {
    //Change the button name
    $(KeyLayoutBtn).text("Keyboard Layout OFF");

    //All the real piano notes
    $(P_C5k).text("C");
    $(P_Cs5k).text("C#");
    $(P_D5k).text("D");
    $(P_Ds5k).text("D#");
    $(P_E5k).text("E");
    $(P_F5k).text("F");
    $(P_Fs5k).text("F#");
    $(P_G5k).text("G");
    $(P_Gs5k).text("G#");
    $(P_A5k).text("A");
    $(P_As5k).text("A#");
    $(P_B5k).text("B");

    $(P_C6k).text("C");
    $(P_Cs6k).text("C#");
    $(P_D6k).text("D");
    $(P_Ds6k).text("D#");
    $(P_E6k).text("E");
    $(P_F6k).text("F");
    $(P_Fs6k).text("F#");
    $(P_G6k).text("G");
    $(P_Gs6k).text("G#");
    $(P_A6k).text("A");
    $(P_As6k).text("A#");
    $(P_B6k).text("B");

    //All the real guitar notes
    $(G_C5k).text("C");
    $(G_Cs5k).text("C#");
    $(G_D5k).text("D");
    $(G_Ds5k).text("D#");
    $(G_E5k).text("E");
    $(G_F5k).text("F");
    $(G_Fs5k).text("F#");
    $(G_G5k).text("G");
    $(G_Gs5k).text("G#");
    $(G_A5k).text("A");
    $(G_As5k).text("A#");
    $(G_B5k).text("B");

    $(G_C6k).text("C");
    $(G_Cs6k).text("C#");
    $(G_D6k).text("D");
    $(G_Ds6k).text("D#");
    $(G_E6k).text("E");
    $(G_F6k).text("F");
    $(G_Fs6k).text("F#");
    $(G_G6k).text("G");
    $(G_Gs6k).text("G#");
    $(G_A6k).text("A");
    $(G_As6k).text("A#");
    $(G_B6k).text("B");
  }
}

////Function to return at home.
// Basically redirects you the main page.
function RedirectHome() {
  window.location.href = "../Home.html";
}
