var storedQuestions = [];

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
   console.log(msg, sender);
   if ((msg.from === 'popup') && (msg.subject === 'getStoredQuestions')) {
      response(storedQuestions);
   }
   if ((msg.from === 'content') && (msg.subject === 'storeQuestions')) {
      storedQuestions = msg.questions;
   }
});
