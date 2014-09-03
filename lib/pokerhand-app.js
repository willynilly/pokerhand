var Deck = require('./deck');
var Poker = require('./poker');
var Card = require('./card');
var CardEncoder = require('./card-encoder');
var CardDecoder = require('./card-decoder');

function PokerTestApp(mode, input_count) {
	this.mode = mode;
	this.input_count = input_count;
}
PokerTestApp.prototype = {
	run: function() {
		if (this.mode == 'hackerrank') {
			this.hackerrank_run();
		} else {
			this.rhino_run();
		}
	},
	
	hackerrank_run: function() {
		process.stdin.resume();
		process.stdin.setEncoding("ascii");
		var input = "Ah, 6h, 2h, 9h, Th";
		     process.stdin.on("data", function (chunk) {
		     input += chunk;
		});
		process.stdin.on("end", function () {
		    var deck = new Deck();
		    var poker = new Poker(deck);
	 		 var encoder = new CardEncoder(deck, poker);
	 		 var decoder = new CardDecoder(deck);
 			 var decoded_hand = decoder.getHandFromString(input);
			 
			 // now we can read/parse input
		    process.stdout.write(poker.getHighestRankForHand(decoded_hand));

		});
	},
	
	rhino_run: function() {
		console.log();
		console.log("Poker Test");
		console.log("by: Will Riley");
		console.log();
		var deck = new Deck();
		var poker = new Poker(deck);
		
		// uncomment the code below to test wildcard for isStraight() function.
		// you will also need to change the number of tests below
		// The other hand tests are not yet implemented for wildcards.
		
		//poker.wild_cards = [new Card('h', 'K'), new Card('s', 'T')];
		
		var encoder = new CardEncoder(deck, poker);
		var decoder = new CardDecoder(deck);

		var hand;
		var hand_string;
		var decoded_hand;
		for(var i = 0; i < this.input_count; i++) {
			hand = poker.getRandomHand();
	
			hand_string = encoder.getHandString(hand);
			
			// uncomment for testing wild card straight
			// hand_string = "2c,3s,Ts,5s,Kh"; 
			
			console.log("input string: " + hand_string);
			
			decoded_hand = decoder.getHandFromString(hand_string);
			console.log("output: " + poker.getHighestRankForHand(decoded_hand));	
			console.log();
		}
	}
};

// change 'rhino' to 'hackerrank' before trying
// to run in hackerrank website.
var input_count = 10; 

// uncomment to test wild card straight
//input_count = 1

var app = new PokerTestApp('rhino', input_count); 
app.run();