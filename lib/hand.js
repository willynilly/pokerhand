// Hand class - a collection of cards
function Hand(cards) {
	this.cards = [];
	this.cards_by_key = {};
	for(var c in cards) {
		this.addCard(cards[c]);
	}
}

Hand.prototype = {
	toString: function() {
		return this.getCards().join(',');
	},
	addCard: function(card) {
		if (card) {
			this.cards.push(card);
			var card_key = card.toString();
			if (!(card_key in this.cards_by_key)) {
				this.cards_by_key[card_key] = [];
			}
			this.cards_by_key[card_key].push(card);
		}
	},
	getCardsByKey: function(card_key) {
		if (card_key in this.cards_by_key) {
			return this.cards_by_key[card_key];
		} else {
			return [];
		}	
	},
	hasCardByKey: function(card_key) {
		return (getCardsByKey(card_key).length > 0);
	},
	getCards: function() {
		var cards = [];
		for (var k in this.cards_by_key) {
			cards = cards.concat(this.cards_by_key[k]);
		}
		return cards;
	},
	sameSuit: function() {
		var suit = null; 
		for(var c in this.cards) {
			if (suit === null) {
				suit = this.cards[c].suit;
			}
			if (this.cards[c].suit != suit) {
				return false;
			} 
		}
		return true;
	},
	sameRank: function() {
		var rank = null; 
		for(var c in this.cards) {
			if (rank === null) {
				rank = this.cards[c].rank;
			}
			if (this.cards[c].rank != rank) {
				return false;
			} 
		}
		return true;
	},
	getRankCounts: function() {
		var r_counts = {};
		for(var c in this.cards) {
			card = this.cards[c];
			var key = card.rank;
			if (!(key in r_counts)) {
				r_counts[key] = 0;
			}
			r_counts[key] += 1;
		}
		return r_counts;
	},
	getSuitCounts: function() {
		var s_counts = {};
		for(var c in this.cards) {
			card = this.cards[c];
			var key = card.suit;
			if (!(key in s_counts)) {
				s_counts[key] = 0;
			}
			s_counts[key] += 1;
		}
		return s_counts;
	},
	hasDuplicates: function() {
		var cards = [];
		for (var k in this.cards_by_key) {
			if (this.cards_by_key[k].length > 1) {
				return true;
			}
		}
		return false;
	},
	getCardCount: function() {
		return this.getCards().length;
	}
};

module.exports = Hand;