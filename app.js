// lets me access the characters in a seperate file
// I didn't need to do this but I didn't want my main file to be 1000 lines lol
import { characters } from './Characters.js';

// global variables
var form = document.getElementById('mainForm');
var textbox = document.getElementById('tbxCharacter');
let x = Math.floor((Math.random() * characters.length));
var randChar = characters[x];
var guessedChar;
var counter = 0;
console.log(randChar)

// Makes it easier to compare strings
for (let i=0; i < characters.length; i++){
    characters[i].Name = characters[i].Name.toLowerCase();
}

// Still does logic if you press enter
form.addEventListener('submit', function(event){
    event.preventDefault();
    submitButton();
});

// Character validation
function submitButton(){
    textbox.value = textbox.value.toLowerCase(); // make everything lowercase
    
    // Loop through character array to see if the submitted character is in there
    var flag = false;
    for (let i=0; i < characters.length; i++){
        var char = characters[i];
        if (textbox.value == char.Name){
            guessedChar = char;
            flag = true;
        }
    }

    // If they are, it's a valid guess and we'll add it
    if(flag == true){
        document.getElementById("errors").innerText = "Valid character";
        counter++;
        newRow(guessedChar);
    }
    else{
        document.getElementById("errors").innerText = "Invalid Character";
    }
    textbox.value = ''; // clear the textbox for a cleaner UX
    if (counter == 5){
    
        textbox.disabled = true;
        document.getElementById("errors").innerText = "You Lost";
        alert("The character was: " + randChar.Name + ". Try again by refreshing the page.");
    }
}

// Adding a new row
function newRow(character){

    // creates new rows and cells
    let table = document.getElementById("tableBody");
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    let tierCell = document.createElement("td");
    let fallSpeedCell = document.createElement("td");
    let weightCell = document.createElement("td");
    let runSpeedCell = document.createElement("td");
    let oosSpeedCell = document.createElement("td");

    // Fills those cells
    nameCell.innerText = character.Name;
    tierCell.innerText = TierCheck(character);
    fallSpeedCell.innerText = FallSpeedCheck(character);
    weightCell.innerText = WeightCheck(character);
    runSpeedCell.innerText = RunSpeedCheck(character);
    oosSpeedCell.innerText = OOSSpeedCheck(character);

    // adds cells to rows
    row.appendChild(nameCell);
    row.appendChild(tierCell);
    row.appendChild(fallSpeedCell);
    row.appendChild(weightCell);
    row.appendChild(runSpeedCell);
    row.appendChild(oosSpeedCell);
    table.appendChild(row);

    if (guessedChar === randChar){
        nameCell.style.backgroundColor = "green";
        tierCell.style.backgroundColor = "green";
        fallSpeedCell.style.backgroundColor = "green";
        weightCell.style.backgroundColor = "green";
        runSpeedCell.style.backgroundColor = "green";
        oosSpeedCell.style.backgroundColor = "green";

        textbox.disabled = true;
        document.getElementById("errors").innerText = "You Won!";
        alert("The character was: " + guessedChar.Name + ". You won!");
    }
}

function clearButton(){
    console.log("hey")
    document.getElementById("tableBody").innerHTML = '';
}

function TierCheck(guessedChar) {
    if (guessedChar.Tier > randChar.Tier) {
        return "^";
    } else if (guessedChar.Tier < randChar.Tier) {
        return "v";
    } else if (guessedChar.Tier === randChar.Tier) {
        return "=";
    }
}

function FallSpeedCheck(guessedChar) {
    if (guessedChar.FallSpeed > randChar.FallSpeed) {
        return "^"; // Slower Fall Speed
    } else if (guessedChar.FallSpeed < randChar.FallSpeed) {
        return "v"; // Faster Fall Speed
    } else if (guessedChar.FallSpeed === randChar.FallSpeed) {
        return "="; // Same Fall Speed
    }
}

function WeightCheck(guessedChar) {
    if (guessedChar.Weight > randChar.Weight) {
        return "^"; // Lighter
    } else if (guessedChar.Weight < randChar.Weight) {
        return "v"; // Heavier
    } else if (guessedChar.Weight === randChar.Weight) {
        return "="; // Same Weight
    }
}

function RunSpeedCheck(guessedChar) {
    if (guessedChar.RunSpeed > randChar.RunSpeed) {
        return "^"; // Slower Run Speed
    } else if (guessedChar.RunSpeed < randChar.RunSpeed) {
        return "v"; // Faster Run Speed
    } else if (guessedChar.RunSpeed === randChar.RunSpeed) {
        return "="; // Same Run Speed
    }
}

function OOSSpeedCheck(guessedChar) {
    if (guessedChar.OOSSpeed > randChar.OOSSpeed) {
        return "^"; // Faster OOS option
    } else if (guessedChar.OOSSpeed < randChar.OOSSpeed) {
        return "v"; // Slower OOS option
    } else if (guessedChar.OOSSpeed === randChar.OOSSpeed) {
        return "="; // Same OOS option speed
    }
}