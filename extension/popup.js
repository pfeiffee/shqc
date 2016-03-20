function showQuestions(questions) {
	var qb = document.querySelector('#questionBox');
	qb.innerHTML = '';

	for (q in questions) {
		var questionItem = document.createElement('LI');
		questionItem.innerText = questions[q];
		qb.appendChild(questionItem);
	}
}

function getStoredQuestions() {
	chrome.runtime.sendMessage({
		from: 'popup',
		subject: 'getStoredQuestions'
	}, showQuestions);
}

function requestFindQuestions() {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		chrome.tabs.sendMessage(
			tabs[0].id, {
				from: 'popup',
				subject: 'FindQuestions'
			},
			showQuestions);
	});
}

document.addEventListener('DOMContentLoaded', function() {
	getStoredQuestions();
	document.getElementById('loadQuestions').addEventListener('click', function() {
		requestFindQuestions();
	});
});

/*
var keyboardEvent = document.createEvent("KeyboardEvent");
var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";


keyboardEvent[initMethod](
                   "keydown", // event type : keydown, keyup, keypress
                    true, // bubbles
                    true, // cancelable
                    window, // viewArg: should be window
                    false, // ctrlKeyArg
                    false, // altKeyArg
                    false, // shiftKeyArg
                    false, // metaKeyArg
                    70, // keyCodeArg : unsigned long the virtual key code, else 0
                    0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
);
document.dispatchEvent(keyboardEvent);

*/
