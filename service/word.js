var request = require("request-promise");
var api_key= '7dc1cea6ac0b2ec90800600ab7d047ed0b8dcd9b9df217cb3';
var url=  'http://api.wordnik.com/v4/word.json/';
var urls = 'http://api.wordnik.com/v4/words.json/';
var propsObj= {includeDuplicates:false,useCanonical:true,skip:0,limit:10,api_key:'7dc1cea6ac0b2ec90800600ab7d047ed0b8dcd9b9df217cb3'};
var printservice = require('./printService.js');
var serviceWrapper = {
  wordDef: function(word,suffix,print=true){
    let tempUrl = url+word+suffix;
    let promise =serviceStub(tempUrl);
    if(print){
      promise.then(function(body) {
        let result = JSON.parse(body);
        printservice.printdef(result);
      });
    }
    else{
      return promise;
    }

  },
  wordSyn: function(word,suffix,action,print=true){
      let tempUrl = url+word+suffix;
      let promise =serviceStub(tempUrl);
      if(print){
        promise.then(function(body) {
          let result = JSON.parse(body);
          let type= "antonym";
          if(action==='syn'){
              type= "synonym";
          }
          if(action==='dict'){
              printservice.printsyn(result,'synonym');
              printservice.printsyn(result,'antonym');
          }
          else{
            printservice.printsyn(result,type);
          }

        });
      }
      else{
        return promise;
      }

  },
  wordEx: function(word,suffix,print=true){
    let tempUrl = url+word+suffix;
    let promise =serviceStub(tempUrl);
    if(print){
      promise.then(function(body) {
        let result = JSON.parse(body);
        printservice.printex(result.examples);
      });

    }
    else{
      return promise;
    }
  },
  wordOfTheDay: function(suffix){
    let tempUrl = urls+suffix;
    return serviceStub(tempUrl);
  },
  randomWord: function(suffix){
    let tempUrl = urls+suffix;
    return serviceStub(tempUrl);
  },
}
var serviceStub = function(tempUrl){
  return request({url:(tempUrl),qs:propsObj});
}
module.exports = serviceWrapper;
