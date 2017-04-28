/*jshint esversion: 6 */
var printservice = require('./printService.js');
var service = require('./word.js');
var loop = require('./looper.js');
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
        });
        var tryAgain = true;
        console.log("starting the game");
        loop.looper(playObj,word);
      });
    });
  }
};



module.exports = play;
