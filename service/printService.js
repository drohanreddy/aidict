var printservice ={
  printdef: function(result){
    result.forEach(function(val){
        console.log("Definitiion gathered from: "+val.attributionText);
        console.log("\n");
        console.log("*******Definition********")
        console.log(val.text);
    });
    console.log("\n");
  },
  printsyn:function(result,type){
    let found = false;
    result.forEach(function(val){
        if(val.relationshipType === type){
          let words = val.words;
          let counter=1;
          console.log(words.length+" "+type+"s are available.")
          console.log("They are: ");
          words.forEach(function(word){
            console.log("\t"+(counter++)+". "+word);
          });
          found = true;
        }
    });
    if(!found)
      console.log("No "+type+"s are availabe for this word");
    console.log("\n");
  },
}

module.exports = printservice;
