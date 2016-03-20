// Inform the background page that
// this tab should have a page-action
chrome.runtime.sendMessage({
   from: 'content',
   subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
   if ((msg.from === 'popup') && (msg.subject === 'FindQuestions')) {
      var questions = [];

		var qs = document.querySelectorAll('div.sr-only');
		for(e in qs){
			if(qs[e].innerHTML == qs[e].innerText && (/\?/.test(qs[e].innerText)) ){
				questions.push(qs[e].innerText);
			}
		}


		chrome.runtime.sendMessage({
	      from: 'content',
	      subject: 'storeQuestions',
			questions: questions
	   });

      console.log('FindQuestions', questions);
      response(questions);
   }
});
