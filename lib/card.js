// Card class - a card with a suit and rank
function Card(suit, rank) {
	this.suit = String(suit);
	this.rank = String(rank);
}
Card.prototype = {
	toString: function() {return "(" + this.suit + ", " + this.rank + ")";},
	sameSuit: function(card) {return this.suit == card.suit;},
	sameRank: function(card) {return this.rank == card.rank;},
	getKey: function() {return this.toString();}
};

module.exports = Card;