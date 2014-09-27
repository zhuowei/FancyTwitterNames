"use strict";
var leftName, rightName;
var nameDisplay, nameInput;
var remainingCharsDisplay;
var maxLength = 20;
var submitButton;
var omitFinalCheckbox;
var nameInteractionsDisplay;
function inputHandler() {
	var newName = leftName.value + String.fromCharCode(0x202e) + rightName.value.split("").reverse().join("") + 
		(omitFinalCheckbox.checked? "": String.fromCharCode(0x202d));
	var isOK = newName.length <= maxLength;
	remainingCharsDisplay.textContent = maxLength - newName.length;
	remainingCharsDisplay.style.color = isOK? "": "red";
	submitButton.disabled = !isOK;
	nameDisplay.textContent = newName;
	nameInteractionsDisplay.textContent = newName;
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
	omitFinalCheckbox = document.getElementById("omit-final");
	omitFinalCheckbox.addEventListener("change", inputHandler);
	nameInteractionsDisplay = document.getElementById("name-display-interactions");
	inputHandler();
	if (window.location.hash == "#success") {
		document.getElementById("success").style.display = "";
	} else if (window.location.hash == "#cancelled") {
		document.getElementById("cancelled").style.display = "";
	}
}

window.onload = loadHandler;