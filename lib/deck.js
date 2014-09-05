var Card = require('./card');
var Hand = require('./hand');
var Randomizer = require('./randomizer');

// Deck class - a collection of cards that form a deck. tracks dealt and undealt cards
function Deck() {
	// sort from most to least valuable
   this.suits = ['s', 'd', 'c', 'h']; // sort most valueable to lowest value
   this.ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
   this.jokers = []; //[new Card('Joker', 'Joker')];
   this.cards = [];
	this.undealt_cards = [];
	this.dealt_cards = [];
	this.buildDeck();
}
Deck.prototype = {
	// can be used to build initial deck or rebuild deck
	buildDeck: function() {
		this.cards = [];
		for (var s in this.suits) {
			for (var r in this.ranks) {
				this.cards.push(new Card(this.suits[s], this.ranks[r]));
			}
		}
		for (var j in this.jokers) {
			this.cards.push(new Card(this.jokers[j][0], this.jokers[j][1]));
		}
		this.undealt_cards = this.cards.slice(0);
		this.dealt_cards = [];
	},
	
	// deals a hand of card_count random cards if possible, 
	// otherwise deals a hand with the remaining cards in deck
	dealRandomHand: function(card_count) {
		var randomizer = new Randomizer();
		this.undealt_cards = randomizer.shuffleArray(this.undealt_cards);
		d_cards = this.undealt_cards.splice(0, Math.min(card_count, this.undealt_cards.length));
		this.dealt_cards = this.dealt_cards.concat(d_cards);
		return new Hand(d_cards);
	},
	
	// returns a random hand of card from the full deck without affecting the deck
	getRandomHand: function(card_count, with_replacement) {
		var r_cards = [];
		var randomizer = new Randomizer();
		if (with_replacement) {
			for(var i = 0; i < card_count; i++) {
				var r_i = randomizer.randomIntegerInclusive(0, this.cards.length - 1);	
				r_cards.push(this.cards[r_i]);
			}
		} else {
			r_cards = randomizer.shuffleArray(this.cards);
			r_cards = r_cards.slice(0, Math.min(card_count, r_cards.length));
		}
		return new Hand(r_cards);
	},
	
	// returns the ranks in descending order from greatest to least
	getRanksDescending: function() {
		return this.ranks;
	},
	
	// returns the ranks in descending order from greatest to least
	getSuitsDescending: function() {
		return this.suits;
	}
};

module.exports = Deck;