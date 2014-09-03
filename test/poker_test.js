var Card = require('../lib/card');
var Hand = require('../lib/hand');
var Poker = require('../lib/poker');
var Deck = require('../lib/deck');

var expect = require('chai').expect;

describe('Poker', function(){

	var d; // deck
	var h; // hand
	var c; // card
	var p; // poker
	
	var r; // result
	
   beforeEach(function(){
      d = new Deck();
		p = new Poker(d);
   });

   //afterEach(function(){});

   describe('Poker(deck)', function(){
 	  it('should initialize deck property', function() {
	 	  r = p.getDeck();
		  expect(r).to.be.an.instanceof(Deck);
	 	  expect(r).to.equal(d);
 	  });
 	  it('should initialize with no wildcards', function() {
	 	  r = p.getWildCards();
		  return expect(r).to.be.empty;		  
 	  });
 	  it('should have a hand size of 5 cards', function() {
	 	  r = p.getHandSize();
		  expect(r).to.equal(5);		  
 	  });
   });
 
  describe('#isFlush(hand)', function(){
	  it('should return true if hand is flush', function() {
		  cards = [
		  	new Card('h', '2'), 
			new Card('h', '8'),
			new Card('h', '4'),
			new Card('h', 'A'),
			new Card('h', '6'),
		  ];
		  h = new Hand(cards);
		  r = p.isFlush(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(true);
	  });
	  
	  it('should return false if hand is not flush', function() {
		  cards = [
		  	new Card('s', 'J'), 
			new Card('h', '3'),
			new Card('h', 'T'),
			new Card('h', 'K'),
			new Card('h', '6'),
		  ];
		  h = new Hand(cards);
		  r = p.isFlush(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
  });
  
  describe('#isStraight(hand)', function(){
	  it('should return true if hand is straight without ace', function() {
		  cards = [
		  	new Card('h', '2'), 
			new Card('s', '3'),
			new Card('d', '5'),
			new Card('d', '4'),
			new Card('c', '6'),
		  ];
		  h = new Hand(cards);
		  r = p.isStraight(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(true);
	  });
	  
	  it('should return true if hand is straight with low ace', function() {
		  cards = [
		  	new Card('h', '2'), 
			new Card('s', '3'),
			new Card('d', '5'),
			new Card('d', '4'),
			new Card('c', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isStraight(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(true);
	  });
	  
	  it('should return true if hand is straight with high ace', function() {
		  cards = [
		  	new Card('h', 'J'), 
			new Card('s', 'Q'),
			new Card('d', 'T'),
			new Card('d', 'K'),
			new Card('c', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isStraight(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(true);
	  });
	  
	  it('should return false if hand is not straight without ace', function() {
		  cards = [
		  	new Card('h', '2'), 
			new Card('d', '3'),
			new Card('h', '7'),
			new Card('c', '5'),
			new Card('h', '6'),
		  ];
		  h = new Hand(cards);
		  r = p.isStraight(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not straight with low ace', function() {
		  cards = [
		  	new Card('h', '2'), 
			new Card('d', '3'),
			new Card('h', '7'),
			new Card('c', '5'),
			new Card('h', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isStraight(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not straight with high ace', function() {
		  cards = [
		  	new Card('h', 'T'), 
			new Card('d', '3'),
			new Card('h', 'K'),
			new Card('c', 'Q'),
			new Card('h', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isStraight(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
  });
  
});