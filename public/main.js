"use strict";
var leftName, rightName;
var nameDisplay, nameInput;
var remainingCharsDisplay;
var maxLength = 20;
var submitButton;
function inputHandler() {
	var newName = leftName.value + String.fromCharCode(0x202e) + rightName.value.split("").reverse().join("") + 
		String.fromCharCode(0x202d);
	var isOK = newName.length <= maxLength;
	remainingCharsDisplay.textContent = maxLength - newName.length;
	remainingCharsDisplay.style.color = isOK? "": "red";
	submitButton.disabled = !isOK;
	nameDisplay.textContent = newName;
	nameInput.value = newName;
}
function loadHandler() {
	leftName = document.getElementById("left-name");
	rightName = document.getElementById("right-name");
	leftName.addEventListener("input", inputHandler);
	rightName.addEventListener("input", inputHandler);
	nameInput = document.getElementById("name-input");
	nameDisplay = document.getElementsByClassName("ProfileTweet-fullname")[0];
	remainingCharsDisplay = document.getElementById("remaining-chars");
	submitButton = document.getElementById("submit-button");
	inputHandler();
	if (window.location.hash == "#success") {
		document.getElementById("success").style.display = "";
	} else if (window.location.hash == "#cancelled") {
		document.getElementById("cancelled").style.display = "";
	}
}

window.onload = loadHandler;