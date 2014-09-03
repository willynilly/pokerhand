pokerhand
=========

A library to classify poker hands.

For poker functions, only supports 5 card hands.

Card suits: 'h','c','s','d'

Card ranks: '2','3','4','5','6','7','8','9','T','J','Q','K','A'

###To install:

```
npm install pokerhand --save
```

###To use:

```javascript
var pokerhand = require('pokerhand');

var Deck = pokerhand.Deck;
var Poker = pokerhand.Poker;
var Card = pokerhand.Card;
var Hand = pokerhand.Hand;

// create deck and poker object
var d = new Deck();
var p = new Poker(deck);

// must have five cards
var cards = [
  new Card('c', 'A'),
  new Card('c', 'Q'),
  new Card('c', 'T'),
  new Card('c', 'K'),
  new Card('c', 'J'),
];

// create a hand
var h = new Hand(cards);

if (p.isStraightFlush(h)) {
  console.log("straight flush");
}

// outputs 'straight flush'
console.log(p.getHighestRankForHand(h)); 
```

###To run tests:
```
grunt
```

###To run poker app test:
```
grunt pokerhand
```
