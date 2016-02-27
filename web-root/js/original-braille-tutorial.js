// Variable Definitions

var step = 0;
var keyedUp = true;
var audio_directory = '../audio/';
var image_directory = '../images/';
var timeOut;
var quizVal; //is an index of check, quizSounds, & loadSounds.  So load(quizSounds[quizVal]);
var previousQuizVal = 6; //So that the quiz does not repeat what was last quizzed when possible;
var previousNewQuizVal;
var quizIndexes = new Array(); //Holds the indexes of check, quizSounds, & loadSounds left to be quizzed;
var newQuizIndexes = new Array();
var timesToQuiz = 10;
var timesToRequiz = 6;
var timesToDotRequiz = 3;
var timesToNewQuiz = 6;
var quizzing = false; //To check if currently quizzing;
var countdown = 0; //During non-dot quizzes, how many to get right before a new one is presented;
var checkCounter = 0;
var lookupTest;
var lookup = false;
var lookupCheckCounter = 0;
var previousLookupVal = 7;
var runningFullQuiz = false;
var emptyingQuiz = false;
var escaped = false;
var subtitles = false;

var finalDotStep = 6, finalAlphaStep = 32, finalNumStep = 42, finalSymbolStep = 68;

var nopeLength = 1050, introLength = 18000, numbersLength = 9000;

var d1 = false, d2 = false, d3 = false, d4 = false, d5 = false, d6 = false;

var intro="Welcome.<br>The six dots used in Braille are associated with numbers 1 through 6.<br>The top left dot is numbered 1,<br>the left middle dot 2,<br>the left bottom dot 3,<br>the right top dot 4,<br>the right middle dot 5,<br>and the right bottom dot 6.";
var instructions="To reload the current problem, press enter.<br>During a quiz, if you have forgotten which dots to press, hit the spacebar for the answer.<br>To navigate to the next item, press apostrophe.<br>To navigate to the previous item, press \"a\".<br>To navigate to the next section, press shift and quote.<br>To navigate to the previous section, press shift and \"A\".<br>To toggle subtitles, press Escape then \"s\".";
var end="That's all for now.  Please email me feedback!!";
var numbers="You'll notice that numbers are the same as letters A through J.<br>To differentiate numbers, the number symbol needs to be placed in front.<br>We'll get to that in the next section.";

var check=new Array(null,
new Array(true,false,false,false,false,false),
new Array(false,true,false,false,false,false),
new Array(false,false,true,false,false,false),
new Array(false,false,false,true,false,false),
new Array(false,false,false,false,true,false),
new Array(false,false,false,false,false,true),
new Array(true,false,false,false,false,false), //a 1
new Array(true,true,false,false,false,false), //b 2
new Array(true,false,false,true,false,false), //c 3
new Array(true,false,false,true,true,false), //d 4
new Array(true,false,false,false,true,false), //e 5
new Array(true,true,false,true,false,false), //f 6
new Array(true,true,false,true,true,false), //g 7
new Array(true,true,false,false,true,false), //h 8
new Array(false,true,false,true,false,false), //i 9
new Array(false,true,false,true,true,false), //j 0
new Array(true,false,true,false,false,false), //k
new Array(true,true,true,false,false,false), //l
new Array(true,false,true,true,false,false), //m
new Array(true,false,true,true,true,false), //n
new Array(true,false,true,false,true,false), //o
new Array(true,true,true,true,false,false), //p
new Array(true,true,true,true,true,false), //q
new Array(true,true,true,false,true,false), //r
new Array(false,true,true,true,false,false), //s
new Array(false,true,true,true,true,false), //t
new Array(true,false,true,false,false,true), //u
new Array(true,true,true,false,false,true), //v
new Array(false,true,false,true,true,true), //w
new Array(true,false,true,true,false,true), //x
new Array(true,false,true,true,true,true), //y
new Array(true,false,true,false,true,true), //z
new Array(true,false,false,false,false,false), //a 1
new Array(true,true,false,false,false,false), //b 2
new Array(true,false,false,true,false,false), //c 3
new Array(true,false,false,true,true,false), //d 4
new Array(true,false,false,false,true,false), //e 5
new Array(true,true,false,true,false,false), //f 6
new Array(true,true,false,true,true,false), //g 7
new Array(true,true,false,false,true,false), //h 8
new Array(false,true,false,true,false,false), //i 9
new Array(false,true,false,true,true,false), //j 0
new Array(false,false,false,false,false,true), //Capitalize the following letter
new Array( //Capitalize the following letters
		  new Array(false,false,false,false,false,true),
		  new Array(false,false,false,false,false,true)
		  ),
new Array(false,false,true,true,true,true), //The following are numbers
new Array(false,true,false,false,true,true), //Period .
new Array(false,true,false,false,false,false), //Comma ,
new Array(false,false,true,false,false,false), //Apostrophe '
new Array( //Open single quote '
	      new Array(false,false,false,false,false,true),
		  new Array(false,true,true,false,false,true)
		  ),
new Array( //Close single quote '
	      new Array(false,false,true,false,false,false),
          new Array(false,false,true,false,true,true)
		  ),
new Array(false,true,true,false,false,true), //Open double quote "
new Array(false,false,true,false,true,true), //Close double quote "
new Array(false,true,true,false,false,true), //Question mark ?
new Array(false,true,true,false,true,false), //Exclamation mark !
new Array(false,false,true,false,false,true), //Hyphen -
new Array( //Dash -
	      new Array(false,false,true,false,false,true),
          new Array(false,false,true,false,false,true)
		  ),
new Array(false,true,false,false,true,false), //Colon :
new Array(false,true,true,false,false,false), //Semicolon ;
new Array( //Slash /
          new Array(false,false,false,true,true,true),
          new Array(false,false,true,true,false,false)
		  ),
new Array( //At symbol @
		  new Array(false,false,false,true,false,false),
		  new Array(true,false,false,false,false,false)
		  ),
new Array( //Pound sign #
          new Array(false,false,false,true,true,true),
          new Array(true,false,false,true,true,true)
		  ),
new Array(false,true,false,false,true,true), //Dollar sign $
new Array( //Percent sign %
		  new Array(false,false,false,true,false,false),
		  new Array(false,true,false,false,true,false),
		  new Array(true,true,true,true,false,false)
		 ),
new Array( // Ampersand &
		  new Array(false,false,false,true,false,false),
		  new Array(true,true,true,true,false,true)
		 ),
new Array( // Asterisk *
		  new Array(false,false,true,false,true,false),
		  new Array(false,false,true,false,true,false)
		 ),
new Array(false,true,true,false,true,true), //Parentheses
new Array( //Open bracket [
		  new Array(false,false,false,false,false,true),
		  new Array(false,true,true,false,true,true)
		 ),
new Array( //Close bracket ]
		  new Array(false,true,true,false,true,true),
		  new Array(false,false,true,false,false,false)
		 )
);

quizSounds=new Array(null,
"td1.mp3","td2.mp3","td3.mp3",
"td4.mp3","td5.mp3","td6.mp3",
"a.mp3",
"b.mp3","c.mp3","d.mp3","e.mp3","f.mp3",
"g.mp3","h.mp3","i.mp3","j.mp3","k.mp3",
"l.mp3","m.mp3","n.mp3","o.mp3","p.mp3",
"q.mp3","r.mp3","s.mp3","t.mp3","u.mp3",
"v.mp3","w.mp3","x.mp3","y.mp3","z.mp3",
"1.mp3","2.mp3","3.mp3","4.mp3","5.mp3",
"6.mp3","7.mp3","8.mp3","9.mp3","0.mp3",
"CapitalizeFollowingLetter.mp3",
"CapitalizeFollowingLetters.mp3",
"FollowingAreNumbers.mp3",
"Period.mp3",
"Comma.mp3",
"Apostrophe.mp3",
"OpenSingleQuote.mp3",
"CloseSingleQuote.mp3",
"OpenDoubleQuote.mp3",
"CloseDoubleQuote.mp3",
"QuestionMark.mp3",
"ExclamationMark.mp3",
"Hyphen.mp3",
"Dash.mp3",
"Colon.mp3",
"Semicolon.mp3",
"Slash.mp3",
"AtSymbol.mp3",
"PoundSign.mp3",
"DollarSign.mp3",
"PercentSign.mp3",
"Ampersand.mp3",
"Asterisk.mp3",
"Parentheses.mp3",
"OpenBracket.mp3",
"CloseBracket.mp3"
);

var loadSounds=new Array("intro.mp3",
"d1pf.mp3","d2pd.mp3","d3ps.mp3",
"d4pj.mp3","d5pk.mp3","d6pl.mp3",
"a1.mp3",
"b12.mp3","c14.mp3","d145.mp3","e15.mp3","f124.mp3",
"g1245.mp3","h125.mp3","i24.mp3","j245.mp3","k13.mp3",
"l123.mp3","m134.mp3","n1345.mp3","o135.mp3","p1234.mp3",
"q12345.mp3","r1235.mp3","s234.mp3","t2345.mp3","u136.mp3",
"v1236.mp3","w2456.mp3","x1346.mp3","y13456.mp3","z1356.mp3",
"11.mp3","212.mp3","314.mp3","4145.mp3","515.mp3",
"6124.mp3","71245.mp3","8125.mp3","924.mp3","0245.mp3",
"CapitalizeFollowingLetter6.mp3",
"CapFollowingLetters6-6.mp3",
"TheFollowingAreNumbers3456.mp3",
"Period256.mp3",
"Comma2.mp3",
"Apostrophe3.mp3",
"OpenSingleQuote6-236.mp3",
"CloseSingleQuote3-563.mp3",
"OpenDoubleQuote236.mp3",
"CloseDoubleQuote356.mp3",
"QuestionMark236.mp3",
"ExclamationMark235.mp3",
"Hyphen36.mp3",
"Dash36-36.mp3",
"Colon25.mp3",
"Semicolon23.mp3",
"Slash456-34.mp3",
"AtSymbol4-1.mp3",
"PoundSign456-1456.mp3",
"DollarSign256.mp3",
"PercentSign4-25-1234.mp3", //This one disappeared.
"Ampersand4-12346.mp3",
"Asterisk35-35.mp3",
"ParenthesesAreBoth2356.mp3",
"OpenBracket6-2356.mp3",
"CloseBracket2356-3.mp3"
);

var symbolSubtitles=new Array(
"Capitalize the following letter",
"Capitalize the following letters",
"The following characters are numbers",
"Period",
"Comma",
"Apostrophe",
"Open single quote",
"Close single quote",
"Open double quote",
"Close double quote",
"Question mark",
"Exclamation mark",
"Hyphen",
"Dash",
"Colon",
"Semicolon",
"Slash",
"@ symbol",
"Pound sign",
"Dollar sign",
"Percent sign",
"Ampersand",
"Asterisk",
"Parentheses",
"Open bracket",
"Close bracket"
);

var symbolSubtitlesDots=new Array(
"is 6",
"is 6-6",
"is 3456",
"is 256",
"is 2",
"is 3",
"is 6-236",
"is 3-356",
"is 236",
"is 356",
"is 236",
"is 235",
"is 36",
"is 36-36",
"is 25",
"is 23",
"is 456-34",
"is 4-1",
"is 456-1456",
"is 256",
"is 4-25-1234",
"is 4-12346",
"is 35-35",
"are both 2356",
"is 6-2356",
"is 2356-3"
);


// Tutorial

window.onkeydown = function(event) { return checkDown(event); };
window.onkeyup = function(event) { checkUp(event); };
window.onclick = function() { document.getElementById('in').focus(); };
window.onload = function() {
	document.getElementById('in').focus();
	preLoad('intro.mp3');
};

function begin_tutorial() {
	load('intro.mp3');
	preLoad('nope.mp3', loadSounds[step+1]);
	timeOut=setTimeout("nextStep()", introLength);
//	step=finalNumStep;nextStep(); //For debugging from a specific step.
	return false;
}

function play_instructions() {
	load('instructions.mp3');
	return false;
}

function nextStep() {
	if(step<0) {
		step=0;
		begin_tutorial();
	} else if(step+1>=quizSounds.length) {
		step=quizSounds.length;
		load("end.mp3");
	} else if(step==finalAlphaStep) {
		preLoad(loadSounds[++step+1]);
		timeOut=setTimeout("load(loadSounds[step]);",numbersLength);
		load("numbers.mp3");
	} else {
		load(loadSounds[++step]);
		preLoad(loadSounds[step+1]);
	}
	quizzing=false;
	emptyingQuiz=false;
	runningFullQuiz=false;
}

function checkIt() {
	if(!check[step] && !lookup) return;
	var test=new Array(d1,d2,d3,d4,d5,d6);
	clearTimeout(timeOut);
	if(lookup) checkLookup(test);
	else if(!quizzing) checkNotQuizzing(test);
	else checkQuizzing(test);
	//debug_index_arrays();
}

function checkNotQuizzing(test) {
	if(check[step][0] instanceof Array) { //This makes it possible to check more than one character.
		var checkArray=check[step][checkCounter];
		var multipleChecks=true;
	} else {
		var checkArray=check[step];
		var multipleChecks=false;
	}
	if(compare(test,checkArray)) {
		notQuizTestCorrect(multipleChecks);
	} else { //test is incorrect
		if(multipleChecks) checkCounter=0;
		if(step>finalDotStep) addRequizVals(step);
		load("nope.mp3");
		timeOut=setTimeout("repeat();", nopeLength);
	}
}

function checkQuizzing(test) {
	if(check[quizVal][0] instanceof Array) {
		var checkArray=check[quizVal][checkCounter];
		var multipleChecks=true;
	} else {
		var checkArray=check[quizVal];
		var multipleChecks=false;
	}
	if(compare(test,checkArray)) {
		quizTestCorrect(multipleChecks);
	} else { //test is incorrect
		if(step>finalDotStep) {
			countdown+=timesToRequiz;
			addRequizVals(quizVal);
		} else if(step==finalDotStep) addDotRequizVals(quizVal);
		load("nope.mp3");
		timeOut=setTimeout("load(quizSounds[quizVal]);", nopeLength);
	}
}
function checkLookup(newTest) {
	var checksOut=false;
	if(lookupCheckCounter==0) {
		lookupTest=newTest;
		for(i=previousLookupVal;i<check.length;i++) {
			if(compareDimensionalArrays(check[i],lookupTest)) {
				loadLookupSubtitles(i);
				previousLookupVal=i;
				lookupCheckCounter++;
				if(i==45) { //Number sign
					lookupCheckCounter=0;
					previousLookupVal=finalAlphaStep+1;
				}
				return;
			}
		}
		lookupCheckCounter=0;
		previousLookupVal=finalDotStep+1;
		load("nope.mp3");
		return;
	} else if(lookupCheckCounter==1) {
		var tempTest=new Array();
		for(i=0;i<lookupTest.length;i++) tempTest.push(lookupTest[i]);
		lookupTest=new Array(tempTest,newTest);
		for(i=previousLookupVal;i<check.length;i++) {
			if(compareDimensionalArrays(check[i],lookupTest)) {
				loadLookupSubtitles(i);
				previousLookupVal=i;
				lookupCheckCounter++;
				return;
			}
		}
	} else {
		lookupTest[lookupCheckCounter]=newTest;
		for(i=previousLookupVal;i<check.length;i++) {
			if(compareDimensionalArrays(check[i],lookupTest)) {
				load(loadSounds[i]);
				previousLookupVal=i;
				lookupCheckCounter++;
				return;
			}
		}
	}
	lookupCheckCounter=0;
	previousLookupVal=finalDotStep+1;
	checkLookup(newTest);
}
function notQuizTestCorrect(multipleChecks) {
	if(multipleChecks) {
		if(checkCounter<check[step].length-1) {
			checkCounter++;
			return;
		} else checkCounter=0;
	}
	if(step==finalDotStep) {
		setDotQuiz();
		dotQuiz();
	} else if(step>finalDotStep && step%2==0) { //Checking multiples of two
		setQuiz();
		quiz();
	} else nextStep();
}
function quizTestCorrect(multipleChecks) {
	if(multipleChecks) {
		if(checkCounter<check[quizVal].length-1) {
			checkCounter++;
			return;
		} else checkCounter=0;
	}
	if(step==finalDotStep) {
		quizIndexes.splice(quizIndexes.indexOf(quizVal),1); //Removes an instance from quizIndexes
		dotQuiz();
	} else { // if(step>finalDotStep)
		if(runningFullQuiz) {
			newQuizIndexes.splice(newQuizIndexes.indexOf(quizVal),1);
			quizVal++;
			fullQuiz();
		} else if(emptyingQuiz) {
			quizIndexes.splice(quizIndexes.indexOf(quizVal),1);
			emptyQuiz();
		} else {
			if(countdown%2==0 || quizIndexes.length==0) newQuizIndexes.splice(newQuizIndexes.indexOf(quizVal),1);
			else quizIndexes.splice(quizIndexes.indexOf(quizVal),1);
			countdown--;
			quiz();
		}
	}
	timesToNewQuiz--;
	if(timesToNewQuiz<=0 && !runningFullQuiz) endNewQuiz();
}
function removeSingleQuizProblem() {
	if(quizzing) {
		quizTestCorrect(false);
	} else {
		notQuizTestCorrect(false);
	}
}

function setDotQuiz() {
	for(i=1;i<=finalDotStep;i++) quizIndexes.push(i);
	quizzing=true;
}
function dotQuiz() {
	quizVal=getRandomQuizVal();
	if(!quizVal) {
		quizzing=false;
		nextStep();
		return;
	}
	load(quizSounds[quizVal]);
}

function setQuiz() {
	quizzing=true;
	moveOldQuizVals();
	for(i=step-1;i<=step;i++) addQuizVals(i);
	if(step<=finalAlphaStep) countdown+=Math.round(((step+10)/32)*10); //Starts at 6, stops at 13
	else if(step<=finalNumStep) countdown+=Math.round(((step-28)/6)*6); //Starts at 6, stops at 15
	else if(step<=finalSymbolStep) countdown+=Math.round(((step-24)/32)*10); //Starts at 6, stops at 14
}
function quiz() {
	if(countdown==0 || quizIndexes.length==0 && newQuizIndexes.length==0) {
		if(step==finalAlphaStep || step==finalNumStep || step==finalSymbolStep) {
			setFullQuiz();
			fullQuiz();
			return;
		}
		quizzing=false;
		nextStep();
		return;
	}
	if(countdown%2==0 || quizIndexes.length==0) quizVal=getRandomNewQuizVal();
	else quizVal=getRandomQuizVal();
	load(quizSounds[quizVal]);
}
function setFullQuiz() {
	moveOldQuizVals();
	if(step==finalAlphaStep) {
		for(i=finalDotStep+1;i<=finalAlphaStep;i++) newQuizIndexes.push(i);
		quizVal=finalDotStep+1;
	} else if(step==finalNumStep) {
		for(i=finalAlphaStep+1;i<=finalNumStep;i++) newQuizIndexes.push(i);
		quizVal=finalAlphaStep+1;
	} else if(step==finalSymbolStep) {
		for(i=finalNumStep+1;i<=finalSymbolStep;i++) newQuizIndexes.push(i);
		quizVal=finalNumStep+1;
	}
	runningFullQuiz=true;
}
function fullQuiz() {
	if(newQuizIndexes.length==0) {
		runningFullQuiz=false;
		emptyingQuiz=true;
		emptyQuiz();
	} else load(quizSounds[quizVal]);
}
function emptyQuiz() {
	if(quizIndexes.length==0) {
		quizzing=false;
		emptyingQuiz=false;
		nextStep();
		return;
	}
	load(quizSounds[quizVal=getRandomQuizVal()]);
}
function skipToFullQuiz() {
	quizzing=true;
	clearTimeout(timeOut);
	if(step<=finalDotStep) {
		step=finalDotStep;
		setDotQuiz();
		dotQuiz();
		return;
	}
	if(step<=finalAlphaStep) step=finalAlphaStep;
	else if(step<=finalNumStep) step=finalNumStep;
	else if(step<=finalSymbolStep) step=finalSymbolStep;
	setFullQuiz();
	fullQuiz();
}
function endNewQuiz() {
	timesToNewQuiz=6;
	moveOldQuizVals();
}

function getRandomQuizVal() {
	if(quizIndexes.length==0 && newQuizIndexes.length==0) return null;
	if(quizIndexes.length==0) return getRandomNewQuizVal();
	if(quizIndexes.length==1) return quizIndexes[0];
	if(quizIndexes.uniqueItems()==1) {
		quizIndexes=quizIndexes.splice(0,1);
		return quizIndexes[0];
	}
	var randomVal;
	if(quizIndexes.uniqueItems()>2) {
		do {
			//length - (number weighted towards 0 * length) in order to weight it towards the high end
			//then subtract one because it can no longer be 0; it has shifted up 1.
			randomVal=quizIndexes[quizIndexes.length-parseInt(getWeightedRandomNum()*quizIndexes.length)-1];
		} while(randomVal==previousQuizVal || randomVal==previousNewQuizVal)
	} else {
		do {
			randomVal=quizIndexes[quizIndexes.length-parseInt(getWeightedRandomNum()*quizIndexes.length)-1];
		} while(randomVal==previousQuizVal)
	}
	previousQuizVal=randomVal;
	return randomVal;
}
function getRandomNewQuizVal() {
	if(quizIndexes.length==0 && newQuizIndexes.length==0) return null;
	if(newQuizIndexes.length==0) return getRandomQuizVal();
	if(newQuizIndexes.length==1) return newQuizIndexes[0];
	if(newQuizIndexes.uniqueItems()==1) {
		newQuizIndexes=newQuizIndexes.splice(0,1);
		return newQuizIndexes[0];
	}
	var randomVal;
	if(newQuizIndexes.uniqueItems()>2) {
		do {
			randomVal=newQuizIndexes[parseInt(Math.random()*newQuizIndexes.length)];
		} while(randomVal==previousQuizVal || randomVal==previousNewQuizVal)
	} else {
		do {
			randomVal=newQuizIndexes[parseInt(Math.random()*newQuizIndexes.length)];
		} while(randomVal==previousNewQuizVal)
	}
	previousNewQuizVal=randomVal;
	return randomVal;
}

function addQuizVals(val) {
	for(counter=0;counter<timesToQuiz;counter++) newQuizIndexes.push(val);
}
function addRequizVals(val) {
	for(counter=0;counter<timesToRequiz;counter++) quizIndexes.push(val);
}
function addDotRequizVals(val) {
	for(counter=0;counter<timesToDotRequiz;counter++) quizIndexes.push(val);
}
function moveOldQuizVals() {
	quizIndexes=quizIndexes.concat(newQuizIndexes);
	newQuizIndexes=new Array();
}

function compare(firstArray,secondArray) {
	if(!secondArray) return false;
	for(var i=0;i<firstArray.length;i++) if(firstArray[i]!=secondArray[i]) return false;
	return true;
}

function reveal() {
	if(quizzing) {
		quizzing=false;
		load(loadSounds[quizVal]);
		quizzing=true;
	} else repeat();
}
function repeat() {
	clearTimeout(timeOut);
	if(quizzing) load(quizSounds[quizVal]);
	else {
		step--;
		nextStep();
	}
}

function checkDown(event) { //Allows one dot at a time to turn on and off
	if(typeof event=="undefined") event=window.event;
	if(event.altKey||event.ctrlKey||event.metaKey||event.shiftKey) return true;
	val=event.keyCode;
	if(val==83&&!escaped||val==68||val==70||val==74||val==75||val==76&&!escaped) keyedUp=false;
	if(val==70) dotTrue(1); //f
	else if(val==68) dotTrue(2); //d
	else if(val==83&&!escaped) dotTrue(3); //s
	else if(val==74) dotTrue(4); //j
	else if(val==75) dotTrue(5); //k
	else if(val==76&&!escaped) dotTrue(6); //l
	else return true;
	return false;
}

function checkUp(event) {
	if(typeof event=="undefined") event=window.event;
	val=event.keyCode;
	if(!keyedUp) {
		checkIt();
		updateLastDot();
	}
	keyedUp=true;
	if(val==70) dotFalse(1); //f
	else if(val==68) dotFalse(2); //d
	else if(val==83) { //s
		if(escaped) {
			clearLoadArea();
			subtitles?subtitles=false:subtitles=true;
			if(lookup) load("lookup.mp3");
			else repeat();
		} else dotFalse(3);
	} else if(val==74) dotFalse(4); //j
	else if(val==75) dotFalse(5); //k
	else if(val==76) { //l
		if(escaped) {
			if(lookup) {
				lookup=false;
				repeat();
			} else {
				clearTimeout(timeOut);
				lookup=true;
				load("lookup.mp3");
			}
		} else dotFalse(6);
	} else if(val==32) { //space
		if(lookup) {
			lookupCheckCounter--;
			checkLookup(lookupTest);
		} else reveal();
	} else if(val==13) { //enter
		if(lookup) {
			lookupCheckCounter=0;
			previousLookupVal=finalDotStep+1;
			load("lookup.mp3");
		} else if(event.shiftKey) {
			skipToFullQuiz();
		} else repeat();
	} else if(val==27) { //escape
		escaped?escaped=false:escaped=true;
	} else if(val==65) { //a
		clearTimeout(timeOut);
		if(event.shiftKey) {
			if(step<=finalDotStep+1) step=0;
			else if(step<=finalAlphaStep+1) step=finalDotStep;
			else if(step<=finalNumStep+1) step=finalAlphaStep;
			else step=finalNumStep;
		} else step-=2;
		quizzing=false;
		lookup=false;
		nextStep();
	} else if(val==222) { //'
		clearTimeout(timeOut);
		if(event.shiftKey) {
			if(step<=finalDotStep) step=finalDotStep;
			else if(step<=finalAlphaStep) step=finalAlphaStep;
			else if(step<=finalNumStep) step=finalNumStep;
			else if(step<=finalSymbolStep) step=finalSymbolStep;
		}
		quizzing=false;
		lookup=false;
		nextStep();
	} else if(escaped && val==73) { //i
		clearTimeout(timeOut);
		load("instructions.mp3");
	} else if(val==8) { //Backspace
		if(event.shiftKey && !lookup) {
			quizIndexes=new Array();
			newQuizIndexes=new Array();
			countdown=0;
			quizzing=false;
			runningFullQuiz=false;
			emptyingQuiz=false;
			repeat();
		} else removeSingleQuizProblem();
	}
	if(val!=27) escaped=false;
}

function dotTrue(dot) {
	if(dot==1) {$("disp1").src=image_directory+"dot.gif";d1=true;}
	else if(dot==2) {$("disp2").src=image_directory+"dot.gif";d2=true;}
	else if(dot==3) {$("disp3").src=image_directory+"dot.gif";d3=true;}
	else if(dot==4) {$("disp4").src=image_directory+"dot.gif";d4=true;}
	else if(dot==5) {$("disp5").src=image_directory+"dot.gif";d5=true;}
	else if(dot==6) {$("disp6").src=image_directory+"dot.gif";d6=true;}
	$("dots").style.borderColor="#FFFFFF";
}
function dotFalse(dot) {
	if(dot==1) {$("disp1").src=image_directory+"blank.gif";d1=false;}
	else if(dot==2) {$("disp2").src=image_directory+"blank.gif";d2=false;}
	else if(dot==3) {$("disp3").src=image_directory+"blank.gif";d3=false;}
	else if(dot==4) {$("disp4").src=image_directory+"blank.gif";d4=false;}
	else if(dot==5) {$("disp5").src=image_directory+"blank.gif";d5=false;}
	else if(dot==6) {$("disp6").src=image_directory+"blank.gif";d6=false;}
	$("dots").style.borderColor="#000000";
}
function updateLastDot() {
	if(d1) $("ld1").src=image_directory+"dot.gif";
	else $("ld1").src=image_directory+"blank.gif";
	if(d2) $("ld2").src=image_directory+"dot.gif";
	else $("ld2").src=image_directory+"blank.gif";
	if(d3) $("ld3").src=image_directory+"dot.gif";
	else $("ld3").src=image_directory+"blank.gif";
	if(d4) $("ld4").src=image_directory+"dot.gif";
	else $("ld4").src=image_directory+"blank.gif";
	if(d5) $("ld5").src=image_directory+"dot.gif";
	else $("ld5").src=image_directory+"blank.gif";
	if(d6) $("ld6").src=image_directory+"dot.gif";
	else $("ld6").src=image_directory+"blank.gif";
}

function load(file) {
	if(!file) return;
	if(!subtitles) {
		$("player").innerHTML=
		"<embed name=\"sound\" id=\"sound\" src=\""
		+audio_directory+file+
		"\" volume=\"100\" type=\"audio/wav\" autostart=\"true\" hidden=\"true\"></embed>";
	} else {
		if(file=="instructions.mp3") chacom(instructions);
		else if(file=="intro.mp3") chacom(intro);
		else if(file=="nope.mp3") chacom("Nope.");
		else if(file=="end.mp3") chacom(end);
		else if(file=="lookup.mp3") chacom("What would you like to look up?");
		else if(file=="numbers.mp3") chacom(numbers);
		else if(quizzing) {
			if(quizVal<=finalDotStep) {
				chacom("Type dot "+file.charAt(2)+".");
			} else if(quizVal<=finalNumStep) {
				chacom(""+file.charAt(0));
			} else if(quizVal<=finalSymbolStep) {
				chacom(symbolSubtitles[quizVal-finalNumStep-1]+".");
			}
		} else {
			if(step<=finalDotStep) {
				chacom("To type dot "+file.charAt(1)+" press \""+file.charAt(3)+"\".");
			} else if(step<=finalNumStep) {
				chacom(file.charAt(0)+" is "+file.substring(1,file.indexOf("."))+".");
			} else if(step<=finalSymbolStep) {
				chacom(symbolSubtitles[loadSounds.indexOf(file)-finalNumStep-1]
						+" "
						+symbolSubtitlesDots[loadSounds.indexOf(file)-finalNumStep-1]
						+".");
			}
		}
	}
}
function loadLookupSubtitles(index) {
	if(!subtitles) load(loadSounds[index]);
	else {
		var file=loadSounds[index];
		if(index<=finalDotStep) chacom("To type dot "+file.charAt(1)+" press \""+file.charAt(3)+"\".");
		else if(index<=finalNumStep) chacom(file.charAt(0)+" is "+file.substring(1,file.indexOf("."))+".");
		else if(index<=finalSymbolStep) {
			chacom(symbolSubtitles[loadSounds.indexOf(file)-finalNumStep-1]
						+" "
						+symbolSubtitlesDots[loadSounds.indexOf(file)-finalNumStep-1]
						+".");
		}
	}
}
function preLoad(file,file2) {
	if(!subtitles) {
		$("preload").innerHTML=
		"<embed name=\"sound\" id=\"sound\" src=\""
		+audio_directory+file+
		"\" volume=\"100\" type=\"audio/wav\" autostart=\"false\" hidden=\"true\"></embed>";
		if(file2) {
			$("preload2").innerHTML=
			"<embed name=\"sound\" id=\"sound\" src=\""
			+audio_directory+file2+
			"\" volume=\"100\" type=\"audio/wav\" autostart=\"false\" hidden=\"true\"></embed>";
		}
	}
}
function clearLoadArea() {
	document.getElementById("player").innerHTML="";
	document.getElementById("preload").innerHTML="";
	document.getElementById("preload2").innerHTML="";
	document.getElementById("com").innerHTML="&nbsp;";
}

function $(ID) {
	return document.getElementById(ID);
}

function chacom(com) {
	document.getElementById("com").innerHTML=com;
}

function getWeightedRandomNum() {
	var tempRandomNumber=Math.random();
	var secondTempRandomNumber=Math.random()*tempRandomNumber;
	return tempRandomNumber-secondTempRandomNumber;
}

Array.prototype.max=function() {
	var max=this[0];
	for(counter=1;counter<this.length;counter++) if(this[counter]>max) max=this[counter];
	return max;
}
Array.prototype.min=function() {
	var min=this[0];
	for(counter=1;counter<this.length;counter++) if(this[counter]<min) min=this[counter];
	return min;
}
Array.prototype.uniqueItems=function() {
	if(this.length==0) return 0;
	var items=1;
	var tempArray=new Array();
	for(counter=0;counter<this.length;counter++) tempArray.push(this[counter]);
	tempArray.sort();
	var lastItem=tempArray[0];
	for(counter=1;counter<tempArray.length;counter++) if(tempArray[counter]!=lastItem) {
		items++;
		lastItem=tempArray[counter];
	}
	return items;
}
if(!Array.prototype.indexOf) {
	Array.prototype.indexOf=function(item) {
		for(counter=0;counter<this.length;counter++) if(this[counter]==item) return counter;
		return -1;
	}
}
function compareDimensionalArrays(array1,array2) {
	if(!array1 || !array2) return false;
	if(array1[0] instanceof Array && !(array2[0] instanceof Array)) array1=array1[0];
	for(var counter=0;counter<array2.length;counter++) {
		if(array1[counter] instanceof Array) {
			if(!compareDimensionalArrays(array1[counter],array2[counter])) return false;
		} else if(array1[counter] != array2[counter]) return false;
	}
	return true;
}
function debug_index_arrays() {
	document.getElementById("debug").innerHTML=quizIndexes.toString().replace(/,/g,", ")+"<hr>"+newQuizIndexes.toString().replace(/,/g,", ")+"<br><br>"+previousQuizVal+"<hr>"+previousNewQuizVal;
}

/*

--To Do--
How to listen to the instructions in the intro & the fact that you have to hold down keys.
Get rid of the stupid bug where when you get one wrong during the first six newQuizIndexes quiz it repeats once.
Make onkeyup return false unless control or meta.

--Never Mind--
During the intro, have the dots light up in sequence when calling their names.
It gets annoying with it saying "Good" after every single new letter, make an option to not have it say that.
Make cookies with all the options in it.
Should there be a Run in Order option?  For now let's make it completely random.
Add the symbol/explanation of the last dot sequence under lastDotTable.
At the very beginning of the tutorial, have both subtitles and sound enabled, then ask if they should be disabled.  At least for testing?
See if the number of times to add can be decreased over time?  There are way too many letters to go through during Alpha Empty Quiz.  Or is that good?

--Check--
Space should reload the current step, shift space should load the answer.  Actually, enter.
Shift then navigation key should skip to the next section.
!!bug	During a quiz, if next is pressed, the next item shows up as a quiz.
During Empty Quiz, there should be a test to see if all of the indexes are the same; if there are, get rid of all but one or two.
Maybe load certain other sounds into a pre-loading area.
Toggle sound and subtitles simultaneously!!
The number of retries for the dot section should only be 2 or 3.
Combine the quiz functions into one.
Have a lookup function.
Delete should remove problems and shift + delete should remove all problems.
Shift + enter should run full quiz for the current section.
Have explanations when a step is reached for items like capital, etc.
"You'll notice that numbers are the same as letters "a" through "j".  To differentiate numbers, the number symbol needs to be placed in front.  We'll get to in the next section."
Fix the bug where hitting delete only moves to the next problem.
Eliminate the step dependancy when quizzing in the load function to fix the undefined subtitle bug caused by previous section quizvals.
Make quizes push newQuizIndexes to quizIndexes after a few rounds, maybe six?

*/