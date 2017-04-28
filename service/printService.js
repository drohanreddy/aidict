/*jshint esversion: 6 */
var printservice ={
  printdef: function(result){
    console.log("*******Definitions********");
    let counter=1;
    result.forEach(function(val){
      console.log("\n");

      console.log("\t"+(counter++)+") "+val.text);
    });
    console.log("\n");
  },
  printsyn:function(result,type){
    let found = false;
    result.forEach(function(val){
      if(val.relationshipType === type){
        let words = val.words;
        let counter=1;
        console.log(words.length+" "+type+"s are available.");
        console.log("They are: ");
        words.forEach(function(word){
          console.log("\t"+(counter++)+") "+word);
        });
        found = true;
      }
    });
    if(!found)
    console.log("No "+type+"s are availabe for this word");
    console.log("\n");
  },
  printex : function(result){
    console.log(result[0].word +" example:");
    let counter=1;
    result.forEach(function(val){
      console.log("\t"+(counter++)+") "+val.text);
      console.log("\n");
    });
    console.log("\n");
  }
};

module.exports = printservice;
