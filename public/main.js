"use strict";
var leftName, rightName;
var nameDisplay, nameInput;
var remainingCharsDisplay;
var maxLength = 20;
var submitButton;
var omitFinalCheckbox;
var nameInteractionsDisplay;
function inputHandler() {
	//var rightNameSanitized = rightName.value.replace(/[^\u2600-\u26ff]/g, "");
	//rightName.value = rightNameSanitized;
	var newName = leftName.value + String.fromCharCode(0x200f) + rightName.value.split("").reverse().join("");
	var isOK = newName.length <= maxLength;
	remainingCharsDisplay.textContent = maxLength - newName.length;
	remainingCharsDisplay.style.color = isOK? "": "red";
	submitButton.disabled = !isOK;
	nameDisplay.textContent = newName;
	//nameInteractionsDisplay.textContent = newName;
	nameInput.value = newName;
}

function emojiKeyboardClick(e) {
	rightName.value = rightName.value + e.target.textContent;
	inputHandler();
	rightName.focus();
}
function buildEmojiKeyboard() {
	var tableElem = document.createElement("table");
	var blockChars = [0x2705, 0x2713, 0x2714]; // Twitter blocks all checkmarks
	// 512 characters; 16 per row
	for (var r = 0; r < 32; r++) {
		var tr = document.createElement("tr");
		for (var c = 0; c < 16; c++) {
			var btn = document.createElement("button");
			var charCode = 0x2600 + (r*16) + c;
			btn.textContent = String.fromCharCode(charCode);
			btn.className = "btn";
			btn.addEventListener("click", emojiKeyboardClick);
			btn.style.width="100%";
			btn.style.fontSize="16px";
			var td = document.createElement("td");
			if (blockChars.indexOf(charCode) < 0) td.appendChild(btn);
			tr.appendChild(td);
		}
		tableElem.appendChild(tr);
	}
	document.getElementById("emoji-keyboard").appendChild(tableElem);
}
function loadHandler() {
	leftName = document.getElementById("left-name");
	rightName = document.getElementById("right-name");
	leftName.addEventListener("input", inputHandler);
	rightName.addEventListener("input", inputHandler);
	nameInput = document.getElementById("name-input");
	nameDisplay = document.getElementsByClassName("fullname")[0];
	remainingCharsDisplay = document.getElementById("remaining-chars");
	submitButton = document.getElementById("submit-button");
	//omitFinalCheckbox = document.getElementById("omit-final");
	//omitFinalCheckbox.addEventListener("change", inputHandler);
	//nameInteractionsDisplay = document.getElementById("name-display-interactions");
	inputHandler();
	if (window.location.hash == "#success") {
		document.getElementById("success").style.display = "";
	} else if (window.location.hash == "#cancelled") {
		document.getElementById("cancelled").style.display = "";
	}
	buildEmojiKeyboard();
}

window.onload = loadHandler;