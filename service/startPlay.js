var printservice = require('./printService.js');
var service = require('./word.js')
var stdin = process.openStdin();
var play = {
  start: function(word){
    console.log("Loading.....");
    let promise = service.wordSyn(word,'/relatedWords','dict',false);
    let playObj ={};
    playObj.definitions = [];
    playObj.synonym = [];
    playObj.antonym = [];
    promise.then(function(rw){
      let ansy = JSON.parse(rw);
      ansy.forEach(function(val){
          if(val.relationshipType === 'synonym'){
              let words = val.words;
              playObj.synonym = words;
          }
          else if(val.relationshipType === 'antonym'){
            let words = val.words;
            playObj.antonym = words;
          }
      });
      let dictPromise = service.wordDef(word,'/definitions',false);
      dictPromise.then(function(dict){
        let res = JSON.parse(dict);
        res.forEach(function(val) {
            playObj.definitions.push(val.text);
        })

        //console.log(playObj);
        let tryAgain = true;
        console.log("starting the game");
        while(tryAgain){
          tryAgain = false;
          let ok = true;
          while(ok){
            let option= Math.floor(Math.random()*(4-1)+1);
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
                      ok = false;
                  }
              break;
              default:

            }
          }
          console.log('Please enter the answer \n');
          stdin.resume();
          stdin.addListener("data", function(answer) {
            let input = answer.toString().trim();
            console.log(input);
            if(input.toLowerCase()===word.toLowerCase()){
              console.log("correct answer");
              stdin.destroy();
            }
            else if(!(playObj.synonym === [] || playObj.synonym.length<1)){
                playObj.synonym.forEach(function(val){
                  if(input.toLowerCase() === val.toLowerCase()){
                    console.log("correct answer");
                  }
                });
            }
          })
        }
      });
    });
  }
}

module.exports = play;
