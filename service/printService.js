var printservice ={
  printdef: function(result){
    result.forEach(function(val){
        console.log("Definitiion gathered from: "+val.attributionText);
        console.log("\n");
        console.log("*******Definition********")
        console.log(val.text);
    });
  },
  printsyn:function(result){
    let found = false;
    result.forEach(function(val){
        if(val.relationshipType === 'synonym'){
          let words = val.words;
          let counter=1;
          console.log(words.length+" "+"synonyms are available.")
          console.log("They are: ");
          words.forEach(function(word){
            console.log("\t"+(counter++)+". "+word);
          });
          found = true;
        }
    });
    if(!found)
      console.log("No synonyms are availabe for this word");
  },
}

module.exports = printservice;
