// Poker class to categorize 
// various poker hands and cards from deck
function Poker(deck) {
	this.deck = deck;
   this.wild_cards = []; //[new Card('s', 'J')]; //[new Card('s', '3'), new Card('s', '2')];
	this.first_rank_is_highest_and_lowest = true; // e.g. the ace 'A' is both the highest and lowest card
	this.hand_size = 5; // the hand size of poker
}
Poker.prototype = {
		
	
	getDeck: function() {
		return this.deck;
	},
	
	getHandSize: function() {
		return this.hand_size;
	},
	
	isWildCard: function(card) {
		return this._findWildCardIndex(card) != -1;
	},
	
	getWildCards: function() {
		return this.wild_cards;
	},
	
	_intersectWildCards: function(cards) {
		var self = this;
		if (cards){
			return cards.filter(function(card) {return self.isWildCard(card);});
		} else {
			return [];
		}
	},
	
	_findWildCardIndex: function(card) {
		for (var w in this.wild_cards) {
			var w_card = this.wild_cards[w];
			if (w_card.sameSuit(card) && w_card.sameRank(card)) {
				return w;
			}
		}
		return -1;
	},
	
	sortCardsByRankThenSuit: function(cards) {
		s_cards = cards.slice(0);
		var self = this;
		// sort by card rank and then by suit, 
		// from most valueable to least valueable card
		s_cards.sort(function(a, b) {
			// place all wild cards at the beginning
			var wildA = self._findWildCardIndex(a);
			var wildB = self._findWildCardIndex(b);
			if (wildA != -1 || wildB != -1) {
				if (wildA != -1 && wildB != -1) {
					return (wildA - wildB);
				} else {
					if (wildA != -1) {
						return -1;
					} else {
						return 1;
					}
				}
			}
			var order = self.deck.ranks.indexOf(a.rank) - self.deck.ranks.indexOf(b.rank);
			if (order === 0) {
				order = self.deck.suits.indexOf(a.suit) - self.deck.suits.indexOf(b.suit);
			}
			return order;
		});
		return s_cards;
	},
	
	isStraightFlush: function(hand) {
		if (!this.isValidHand(hand)) {return false;}
		return this.isStraight(hand) && this.isFlush(hand);
	},

	isFourOfAKind: function(hand) {
		if (!this.isValidHand(hand)) {return false;}
		var rank_counts = hand.getRankCounts();
		// assume hand size is 5; redo later
		if (Object.keys(rank_counts).length == 2) {
			for (var rc in rank_counts) {
				if (rank_counts[rc] == 4) {
					return true;
				}
			}
		} 
		return false;
	},

	isFullHouse: function(hand) {
		if (!this.isValidHand(hand)) {return false;}
		var rank_counts = hand.getRankCounts();
		// assume hand size is 5; redo later
		if (Object.keys(rank_counts).length == 2) {
			for (var rc in rank_counts) {
				if (rank_counts[rc] == 3) {
					return true;
				}
			}
		} 
		return false;
	},

	isFlush: function(hand) {
		if (!this.isValidHand(hand)) {return false;}
		return hand.sameSuit();
	},
	
	isStraight: function(hand) {
		if (!this.isValidHand(hand)) {return false;}
		var sorted_cards = this.sortCardsByRankThenSuit(hand.getCards());
		var wild_cards = this._intersectWildCards(sorted_cards);		
		var search_cards = sorted_cards.slice(wild_cards.length); // because the wildcards are at beginning of sorted cards
		var last_index = -1;
		var cur_index = -1;
		var non_consec_count = 0; // number of non-consecutive cards that are not wild cards
		var max_non_consec_count = wild_cards.length; // only allow as many non-consecutive as wild cards
		for(var c in search_cards) {
			cur_index = this.deck.ranks.indexOf(search_cards[c].rank);
			if (last_index != -1) {
			   // test non-consecutive cards
				if ((cur_index - last_index) != 1) {
					non_consec_count += 1; // count non-consecutive
					// test for high/low card, namely the ace
					if (this.first_rank_is_highest_and_lowest) {
						if (search_cards.length > 1) {
							if (c == 1) {
								// don't count it as a non-consecutive card
								// if an ace is at the beginning of sorted hand
								var last_card = search_cards[search_cards.length - 1];
								if (this.deck.ranks.indexOf(last_card.rank) == this.deck.ranks.length - 1) {
									non_consec_count -= 1;
								}
							} else if (c == search_cards.length - 1) {
								if (last_index == this.deck.ranks.length-1 && cur_index === 0) {
									return true;
								}
							}
						}
					}
					if (non_consec_count > max_non_consec_count) {return false;}
				}
			}
			last_index = cur_index;
		}
		return true;
	},
	
	isThreeOfAKind: function(hand) {
		if (!this.isValidHand(hand)) {return false;}
		var rank_counts = hand.getRankCounts();		
		// assume hand size is 5; redo later
		if (Object.keys(rank_counts).length == 3) {
			for (var rc in rank_counts) {
				if (rank_counts[rc] == 3) {
					return true;
				}
			}
		} 
		return false;
	},

	isTwoPair: function(hand) {
		if (!this.isValidHand(hand)) {return false;}
		var rank_counts = hand.getRankCounts();
		// assume hand size is 5; redo later
		if (Object.keys(rank_counts).length == 3) {
			for (var rc in rank_counts) {
				if (rank_counts[rc] == 1) {
					return true;
				}
			}
		} 
		return false;
	},

	isOnePair: function(hand) {
		if (!this.isValidHand(hand)) {return false;}
		var rank_counts = hand.getRankCounts(); // assume hand is size 5; redo later		
		return Object.keys(rank_counts).length == 4;
	},

	isHighCard: function(hand) {
		return this.isValidHand(hand);
	},

	isValidHand: function(hand) {
		return (hand && hand.getCardCount() == this.hand_size && !hand.hasDuplicates());
	},

	getHighestRankForHand: function(hand) {
		if (this.isStraightFlush(hand)) {
			return "straight flush";
		} else if (this.isFourOfAKind(hand)) {
			return "four of a kind";
		} else if (this.isFullHouse(hand)) {
			return "full house";
		} else if (this.isFlush(hand)) {
			return "flush";
		} else if (this.isStraight(hand)) {
			return "straight";
		} else if (this.isThreeOfAKind(hand)) {
			return "three of a kind";
		} else if (this.isTwoPair(hand)) {
			return "two pair";
		} else if (this.isOnePair(hand)) {
			return "one pair";
		} else if (this.isHighCard(hand)) {
			return "high card";
		}
		return "invalid input";
	},
	
	getRandomHand: function() {
		return this.deck.getRandomHand(this.hand_size);
	},
	
	dealRandomHand: function() {
		return this.deck.dealRandomHand(this.hand_size);		
	}
};

module.exports = Poker;