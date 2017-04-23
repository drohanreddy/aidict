var stdin = process.openStdin();
var request = require("request");
var api_key= '7dc1cea6ac0b2ec90800600ab7d047ed0b8dcd9b9df217cb3';
var propsObj= {includeDuplicates:false,useCanonical:true,skip:0,limit:200,api_key:'7dc1cea6ac0b2ec90800600ab7d047ed0b8dcd9b9df217cb3'};
var url=  'http://api.wordnik.com/v4/word.json/';
stdin.addListener("data", function(command) {
  let input = command.toString().trim();
  console.log(input);
  if(input.includes(" ")){
    let commandParts = input.split(" ");
    if(commandParts[0]=='./dict'){
      if(commandParts.length==3){
        let action = commandParts[1];
        let word = commandParts[2];
        if(action=="def"){
          let tempUrl = url+word+"/definitions";
          console.log(tempUrl);
          request({url:(tempUrl),qs:propsObj}, function(error, response, body) {
              let result = JSON.parse(body);
              result.forEach(function(val){
                  console.log(val.attributionText);
                  console.log(val.attributionText);

              });

              if(body==[]){
                console.log(error);
              }
          });
        }
      }
      else if(commandParts.length==2){
        /**play**/
      }
    }
  }
});
