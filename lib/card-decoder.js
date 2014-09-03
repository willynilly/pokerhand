var Card = require('./card');
var Hand = require('./hand');

// Card decoder
function CardDecoder(deck) {
	this.deck = deck;
	this.parse_card_delimiter = ',';
	this.parse_card_rank_then_suit = true;
	this.max_cards_per_hand = 5;
	this.min_cards_per_hand = 5;
}
CardDecoder.prototype = {
	// parse a hand of cards from string
	getHandFromString: function(s) {
		var cards = this.getCardsFromString(s);
		if (cards.length >= this.min_cards_per_hand && cards.length <= this.max_cards_per_hand) {
			return new Hand(cards);			
		}
		return null;
	},
	
	getCardsFromString: function(s) {
		var cards = [];
		var c_tokens = this._get_card_tokens_from_string(s);
		var self = this;
		cards = c_tokens.map(function(t) {return self.getCardFromString(t);}).filter(function(c) {return c !== null;});
		return cards;
	},
	
	getCardFromString: function(s) {
		s = this._normalize_string(s);
		var suit_index = 0;
		var rank_index = 1;
		if (this.parse_card_rank_then_suit) {
			suit_index = 1;
			rank_index = 0;
		}
		if (s.length == 2 && this.deck.suits.indexOf(s[suit_index]) != -1 && this.deck.ranks.indexOf(s[rank_index]) != -1) {
			var card = new Card(s[suit_index], s[rank_index]);
			return card;
		} else {
			return null;				
		}
	},
	
	_normalize_string: function(s) {
		s = s.replace(/\s/g, ""); // ignore all whitespace
		return s;
	},
	
	_get_card_tokens_from_string: function(s) {
		var tokens = [];
		s = this._normalize_string(s);
		var pieces = s.split(this.parse_card_delimiter);
		if (pieces.length) {
			tokens = pieces.map(function(t) {return t.trim();});
		}
		return tokens;
	},
};

module.exports = CardDecoder;