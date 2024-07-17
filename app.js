// lets me access the characters in a seperate file
// I didn't need to do this but I didn't want my main file to be 1000 lines lol
import { characters } from './Characters.js';

// global variables
var form = document.getElementById('mainForm');
var textbox = document.getElementById('tbxCharacter');
let x = Math.floor((Math.random() * characters.length));
var randChar = characters[x];
 console.log(randChar.Name)
var guessedChar;
var counter = 0;
var resultsString = "\n";

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
        if (textbox.value == char.Name || char.aliases.includes(textbox.value)){
            guessedChar = char;
            flag = true;
        }
    }

    // If they are, it's a valid guess and we'll add it
    if(flag == true){
        document.getElementById("errors").innerText = "Valid character";
        counter++;
        newRow(guessedChar);
        document.getElementById("guessCount").innerText += " X"
        document.getElementById("mainContainer").style.zoom = "0.8"
    }
    else{
        document.getElementById("errors").innerText = "Invalid Character";
    }
    textbox.value = ''; // clear the textbox for a cleaner UX
    if (counter == 5 & guessedChar != randChar){
    
        textbox.disabled = true;
        document.getElementById("errors").innerText = "You Lost. The character was " + randChar.Name + "\nRefresh the page to try again!";
        var popup = document.getElementById("popup");
        var popupText = document.getElementById("popuptext")
        popupText.innerHTML = "<h1 align=\"center\">Nice Try!</h1><p align=\"center\"> The character was: " + randChar.image + "</p>";
        popupText.innerHTML += "<p align=\"center\">(" + randChar.Name + ")</p>";
        popup.style.display = "block";
        popupText.innerHTML += '<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Smashle Score:' + resultsString + '" data-url="https://sorryssb.github.io/smashlePublic" data-hashtags="Smashle" data-related="sorryssb" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
        twttr.widgets.load();
        form.removeEventListener('submit', function(){
            console.log("you lost. idk what to put here");
        });
        popupText.innerHTML += '<br/><button id="refresh" class="btn btn-light">Click me to try again!</button>'
        let refresh = document.getElementById("refresh")
        refresh.addEventListener("click", function(){
            window.location.reload()
        })
        window.onclick = function(event) {
            if (event.target == popup) {
              popup.style.display = "none";
            }
        }
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
    let firstGameCell = document.createElement("td");

    // Fills those cells
    nameCell.innerHTML = character.image;
    tierCell.innerText = TierCheck(character);
    if (tierCell.innerText == "same!"){
        tierCell.style.backgroundColor = "green";
    }
    fallSpeedCell.innerText = FallSpeedCheck(character);
    if (fallSpeedCell.innerText == "same!"){
        fallSpeedCell.style.backgroundColor = "green";
    }
    weightCell.innerText = WeightCheck(character);
    if (weightCell.innerText == "same!"){
        weightCell.style.backgroundColor = "green";
    }
    runSpeedCell.innerText = RunSpeedCheck(character);
    if (runSpeedCell.innerText == "same!"){
        runSpeedCell.style.backgroundColor = "green";
    }
    oosSpeedCell.innerText = OOSSpeedCheck(character);
    if (oosSpeedCell.innerText == "same!"){
        oosSpeedCell.style.backgroundColor = "green";
    }
    firstGameCell.innerText = FirstGameCheck(character);
    if (firstGameCell.innerText == "same!"){
        firstGameCell.style.background = "green";
    }

    // adds cells to rows
    row.appendChild(nameCell);
    row.appendChild(tierCell);
    row.appendChild(fallSpeedCell);
    row.appendChild(weightCell);
    row.appendChild(runSpeedCell);
    row.appendChild(oosSpeedCell);
    row.appendChild(firstGameCell);
    table.appendChild(row);

    resultsString += "\n";

    // Formats table and shows a modal popup when you win
    if (guessedChar === randChar){
        nameCell.style.backgroundColor = "green";
        tierCell.style.backgroundColor = "green";
        fallSpeedCell.style.backgroundColor = "green";
        weightCell.style.backgroundColor = "green";
        runSpeedCell.style.backgroundColor = "green";
        oosSpeedCell.style.backgroundColor = "green";

        textbox.disabled = true;
        document.getElementById("errors").innerText = "You Won! Refresh the page to play again.";
        var popup = document.getElementById("popup");
        var popupText = document.getElementById("popuptext")
        popupText.style.backgroundColor = "green"
        popupText.innerHTML = "<h1 align=\"center\">You won!</h1><p align=\"center\"> The character was: " + randChar.image + "</p>";
        popupText.innerHTML += "<p align=\"center\">(" + randChar.Name + ")</p>"
        if (counter == 1){
            popupText.innerHTML += "<p align=\"center\">First Try!</p>";
        }
        else{
            popupText.innerHTML += "<p align=\"center\">It took " + counter + " tries.</p>";
        }
        if (counter == 5){
            popupText.innerHTML += "<h1 align=\"center\">CLUTCHBOX</h1>";
            resultsString += "\n**CLUTCHBOX**\n";
        }
        popupText.innerHTML += '<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Smashle Score:' + resultsString + '" data-url="https://sorryssb.github.io/smashlePublic" data-hashtags="Smashle" data-related="sorryssb" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
        twttr.widgets.load()
        popup.style.display = "block";
        popupText.innerHTML += '<br/><button id="refresh" class="btn btn-light">Click me to try again!</button>'
        form.removeEventListener('submit', function(){
            console.log("you won. idk what to put here but I don't like having an empty function.")
        });
        window.onclick = function(event) {
            if (event.target == popup) {
              popup.style.display = "none";
            }
        }
    }
}

// Functions to check values
function TierCheck(guessedChar) {
    if (guessedChar.Tier > randChar.Tier) {
        resultsString += "🔼";
        return "Higher";
    } else if (guessedChar.Tier < randChar.Tier) {
        resultsString += "🔽";
        return "Lower";
    } else if (guessedChar.Tier === randChar.Tier) {
        resultsString += "✅";
        return "same!";
    }
}

function FallSpeedCheck(guessedChar) {
    if (guessedChar.FallSpeed > randChar.FallSpeed) {
        resultsString += "🔽";
        return "Slower"; // Slower Fall Speed
    } else if (guessedChar.FallSpeed < randChar.FallSpeed) {
        resultsString += "🔼";
        return "Faster"; // Faster Fall Speed
    } else if (guessedChar.FallSpeed === randChar.FallSpeed) {
        resultsString += "✅";
        return "same!"; // Same Fall Speed
    }
}

function WeightCheck(guessedChar) {
    if (guessedChar.Weight > randChar.Weight) {
        resultsString += "🔽";
        return "Lighter"; // Lighter
    } else if (guessedChar.Weight < randChar.Weight) {
        resultsString += "🔼";
        return "Heavier"; // Heavier
    } else if (guessedChar.Weight === randChar.Weight) {
        resultsString += "✅";
        return "same!"; // Same Weight
    }
}

function RunSpeedCheck(guessedChar) {
    if (guessedChar.RunSpeed > randChar.RunSpeed) {
        resultsString += "🔽";
        return "Slower"; // Slower Run Speed
    } else if (guessedChar.RunSpeed < randChar.RunSpeed) {
        resultsString += "🔼";
        return "Faster"; // Faster Run Speed
    } else if (guessedChar.RunSpeed === randChar.RunSpeed) {
        resultsString += "✅";
        return "same!"; // Same Run Speed
    }
}

function OOSSpeedCheck(guessedChar) {
    if (guessedChar.OOSSpeed > randChar.OOSSpeed) {
        resultsString += "🔼";
        return "Faster"; // Faster OOS option
    } else if (guessedChar.OOSSpeed < randChar.OOSSpeed) {
        resultsString += "🔽";
        return "Slower"; // Slower OOS option
    } else if (guessedChar.OOSSpeed === randChar.OOSSpeed) {
        resultsString += "✅";
        return "same!"; // Same OOS option speed
    }
}

function FirstGameCheck(guessedChar) {
    if (guessedChar.FirstGame > randChar.FirstGame) {
        resultsString += "⏩";
        return "Earlier"; // Later first game
    } else if (guessedChar.FirstGame < randChar.FirstGame) {
        resultsString += "⏩";
        return "Later"; // earlier first game
    } else if (guessedChar.FirstGame === randChar.FirstGame) {
        resultsString += "✅";
        return "same!"; // Same game
    }
}