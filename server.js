/*jshint esversion: 6 */
var service = require('./service/word.js');
var play = require('./service/startPlay.js');
var prompt = require('prompt');
prompt.start();
prompt.get(['command'], function (err, result) {
  let input = result.command.toString().trim();
  if(input.includes(" ")){
    let commandParts = input.split(" ");
    if(commandParts[0]==='./dict'){
      if(commandParts.length===3){
        let action = commandParts[1];
        let word = commandParts[2];
        if(action==="def"){
          let suffix= '/definitions';
          service.wordDef(word,suffix);
        }
        else if(action==="syn"||action==="ant"){
          let suffix= '/relatedWords';
          service.wordSyn(word,suffix,action);
        }
        else if(action==="ex"){
          let suffix= '/examples';
          service.wordEx(word,suffix);
        }
        else if(action==="dict"){
          let suffix= '/definitions';
          group(word,suffix,action);
        }
      }
      else if(commandParts.length===2){
        if(commandParts[1]==="play"){
          let suffix = 'randomWord';
          let promise = service.randomWord(suffix);
          promise.then(function(body) {
            let result = JSON.parse(body);
            let word= result.word;
            play.start(word);
          });
        }
        else{
          let suffix= '/definitions';
          let word = commandParts[1];
          console.log("The word is :"+word+"\n");
          group(word,suffix,'dict');
        }
      }
    }
  }
  if(input==='./dict'){
    let suffix = 'wordOfTheDay';
    let promise = service.wordOfTheDay(suffix);
    promise.then(function(body) {
      let result = JSON.parse(body);
      let word= result.word;
      console.log("Word of the day: "+word);
      console.log("\n");
      suffix= '/definitions';
      group(word,suffix,'dict');
    });

  }
});

//gets definitions, related words and examples. converted to method for reuse
function group(word,suffix,action){
  service.wordDef(word,suffix);
  suffix= '/relatedWords';
  service.wordSyn(word,suffix,action);
  suffix= '/examples';
  service.wordEx(word,suffix);
}
