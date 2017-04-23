var stdin = process.openStdin();
var service = require('./service/word.js')
stdin.addListener("data", function(command) {
  let input = command.toString().trim();
  if(input.includes(" ")){
    let commandParts = input.split(" ");
    if(commandParts[0]=='./dict'){
      if(commandParts.length==3){
        let action = commandParts[1];
        let word = commandParts[2];
        if(action=="def"){
          let suffix= '/definitions'
          service.wordDef(word,suffix);
        }
      }
      else if(commandParts.length==2){
        /**play**/
      }
    }
  }
});
