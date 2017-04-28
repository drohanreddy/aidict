/*jshint esversion: 6 */
var prompt = require('prompt');
var loop = {
  looper: function(playObj,word){
    let ok = true;
    while(ok){
      let valid =3;
      if(playObj.definitions=== []||playObj.definitions.length<1){
        valid-=1;
      }
      if(playObj.synonym=== []||playObj.synonym.length<1){
        valid-=1;
      }
      if(playObj.antonym=== []||playObj.antonym.length<1){
        valid-=1;
      }
      if(valid===0){
        console.log("No options for this word. Please try again as");
        console.log("definitions left are:"+playObj.definitions.length);
        console.log("synonym left are:"+playObj.synonym.length);
        console.log("antonym left are:"+playObj.antonym.length);
        console.log("By the way, the word is: "+word);
        process.exit();
      }
      let option= Math.floor(Math.random()*((valid+1)-1)+1);
      switch (option) {
        case 1:
        if(!(playObj.definitions=== []||playObj.definitions.length<1)){
          let len = playObj.definitions.length;
          let randomTemp;
          if(len>1){
            randomTemp= Math.floor(Math.random()*(len-1)+1);
          }
          else{
            randomTemp = 0;
          }
          console.log("Guess the word with definition: "+ playObj.definitions[randomTemp]);
          playObj.definitions.splice(randomTemp,1);
          ok = false;
        }
        else{
          option= Math.floor(Math.random()*(4-2)+2);
        }
        break;
        case 2:
        if(!(playObj.synonym=== [] || playObj.synonym.length<1)){
          let len = playObj.synonym.length;
          let randomTemp;
          if(len>1){
            randomTemp= Math.floor(Math.random()*(len-1)+1);
          }
          else{
            randomTemp = 0;
          }
          console.log("Guess the word with synonym: "+ playObj.synonym[randomTemp]);
          playObj.synonym.splice(randomTemp,1);
          ok = false;
        }
        break;
        case 3:
        if(!(playObj.antonym===[] || playObj.antonym.length<1)){
          let len = playObj.antonym.length;
          let randomTemp;
          if(len>1){
            randomTemp= Math.floor(Math.random()*(len-1)+1);
          }
          else{
            randomTemp = 0;
          }
          console.log("Guess the word with antonym: "+ playObj.antonym[randomTemp]);
          playObj.antonym.splice(randomTemp,1);
          ok = false;
        }
        break;

      }
    }
    console.log('Please enter the answer \n');
    tryAgain = false;
    readWord(playObj, word);
  }
};

function readWord(playObj, word){
  prompt.start();
  prompt.get(['answer'], function (err, result) {
    let input = result.answer.toString().trim();
    if(input.toLowerCase()===word.toLowerCase()){
      console.log("correct answer");
      process.exit();
    }
    else if(!(playObj.synonym === [] || playObj.synonym.length<1)){
      playObj.synonym.forEach(function(val){
        if(input.toLowerCase() === val.toLowerCase()){
          console.log("correct answer");
          process.exit();
        }
      });
    }
    error(playObj, word);
  });

}


function error(playObj, word){
  console.log("press 1 to re-try");
  console.log("press 2 for hint");
  console.log("press 3 to quit");
  prompt.get(['op'], function (err, result) {
    let option = parseInt(result.op.trim().toString());
    if(option === 1){
      readWord(playObj, word);
    }
    if(option===2){
      loop.looper(playObj,word);
    }
    else if(option === 3){
      console.log("quitting");
      console.log("By the way, the word is: "+word);
      process.exit();
    }
  });
}

module.exports = loop;
