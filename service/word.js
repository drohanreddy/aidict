var request = require("request-promise"); //changed for promises
var api_key= '7dc1cea6ac0b2ec90800600ab7d047ed0b8dcd9b9df217cb3';
var url=  'http://api.wordnik.com/v4/word.json/';
var propsObj= {includeDuplicates:false,useCanonical:true,skip:0,limit:200,api_key:'7dc1cea6ac0b2ec90800600ab7d047ed0b8dcd9b9df217cb3'};
var printservice = require('./printService.js');
var serviceWrapper = {
  wordDef: function(word,suffix){
    let tempUrl = url+word+suffix;
    let promise =serviceStub(tempUrl);
    promise.then(function(body) {
      let result = JSON.parse(body);
      printservice.printdef(result);
    });
  },
  wordSyn: function(word,suffix){
      let tempUrl = url+word+suffix;
      let promise =serviceStub(tempUrl);
      promise.then(function(body) {
        let result = JSON.parse(body);
        printservice.printsyn(result);
      });
  }
}
var serviceStub = function(tempUrl){
  return request({url:(tempUrl),qs:propsObj});
}
module.exports = serviceWrapper;
