var fs=require('fs');
var natural = require('natural');
var result={};
result['base_document']={};
result['test_document']={};
result['match']={};
result['spell']={};
//base file read
var basedata = fs.readFileSync('./bootstrap1.txt', 'utf8');
var baseword= wordCount(basedata);
var tokenbase=basedata.split(/\W+/);
    console.log("Number Of words in base file: "+baseword);
/*fs.readFile('file.txt', 'utf8',function(error,data){
	//console.log(data);
	//
    if(error){
    	throw error;
    }
    else{
    	text=data.toString();
    	 
    }
});*/

result.base_document['word_count']=baseword;
//test file read
var testdata= fs.readFileSync('./bootstrap2.txt', 'utf8');
var tokentest=testdata.split(/\W+/);
var testword= wordCount(testdata);
result.test_document['word_count']=testword;
if(testword>=baseword-500 || testword<=baseword+500){
    console.log("Number Of words in test file: "+testword);
}

//calling match function
matching(tokenbase,tokentest);

//word count function
function wordCount(str){
	return str.split(/\W+/).length;
}
//matching percentage of files
function matching(tokenbase,tokentest){
	var match=0;
    var matches=0;
    for (var i = 0; i < tokenbase.length; i++)
    {
	              
        if(tokenbase.indexOf(tokentest[i],0)===-1)
            { 
               match++;
            }
    }  
    for (var i = 0; i < tokentest.length; i++)
    {
	              
        if(tokentest.indexOf(tokenbase[i],0)===-1)
            { 
                matches++;
            }

    }  
       var pre=((match-matches)/match)*100
        console.log("Matched: "+pre);
result.match['matching']=pre;
}
var dict=fs.readFileSync('./dict.txt','utf8');
var dic=dict.split(/\W+/);
c=0;
for(var j=0;j<dic.length;j++){
    for(var i=0;i<tokentest.length;i++){
		if(dic[j]==tokentest[i]){
			c++;
		}
	}
}
console.log("spelling: "+ c);
result.spell['spelling']=c;
/*function res(){
	console.log("\nBase doucument");
    console.log("\nWord count: " + baseword);
 	console.log('number of misspelled words are:'+ c);
 	console.log("noun: " +nn);
	console.log("Adverbs: "+rb);


    console.log("\nTest doucument");
	console.log("\nWord count of test document: " + testword);
 	console.log('number of misspelled words are:'+ c1);
 	console.log("noun: " +nn1);
    console.log("Adverbs: "+rb1);
    out();


function out(){
   
    var result={
	   	base:
	   	{
	   	    word_count: baseword,
	   	    nouns: nn,
	   	    adverbs:rb,
	   	    spelling:c

	    },
	    test:
	    {
	       word_count: testword,
	   	    nouns: nn1,
	   	    adverbs:rb1,
	   	    spelling:c1     	
	    }
	    matching:
	    {
	       percentage matching: per   
	    }
	}*/
    var json= JSON.stringify(result,null,2);
    fs.writeFile('output.json',json,'utf8',(err)=>{
		if(err){
			console.log("Error "+err);
			return;
		};
    console.log(result);

    });

