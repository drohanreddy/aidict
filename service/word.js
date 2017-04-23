var request = require("request");
var api_key= '7dc1cea6ac0b2ec90800600ab7d047ed0b8dcd9b9df217cb3';
var url=  'http://api.wordnik.com/v4/word.json/';
var propsObj= {includeDuplicates:false,useCanonical:true,skip:0,limit:200,api_key:'7dc1cea6ac0b2ec90800600ab7d047ed0b8dcd9b9df217cb3'};

var serviceWrapper = {

  wordDef: function(word,suffix){
    let tempUrl = url+word+suffix;//
    request({url:(tempUrl),qs:propsObj}, function(error, response, body) {
        let result = JSON.parse(body);
        result.forEach(function(val){
            console.log("Definitiion gathered from: "+val.attributionText);
            console.log("\n");
            console.log("*******Definition********")
            console.log(val.text);
        });
    });
  }
}

module.exports = serviceWrapper;
