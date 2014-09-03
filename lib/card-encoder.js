// card encoder
function CardEncoder(deck, poker) {
	this.deck = deck;
	this.poker = poker;
	this.card_delimiter = ', ';
}
CardEncoder.prototype = {
	getHandString: function(hand) {
		 var cards = this.poker.sortCardsByRankThenSuit(hand.getCards());
		 return cards.map(function(card) {return card.rank + card.suit;}).join(this.card_delimiter);
	}
};

module.exports = CardEncoder;