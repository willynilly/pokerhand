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
 
   describe('#isRoyalFlush(hand)', function(){
 	  it('should return true if hand is royal flush', function() {
 		  cards = [
 		  	new Card('h', 'K'), 
 			new Card('h', 'A'),
 			new Card('h', 'Q'),
 			new Card('h', 'T'),
 			new Card('h', 'J'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isRoyalFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(true);
 	  });
	  
 	  it('should return false if hand is straight flush, but not royal', function() {
 		  cards = [
 		  	new Card('h', 'K'), 
 			new Card('h', 'A'),
 			new Card('h', '3'),
 			new Card('h', 'T'),
 			new Card('h', 'J'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isRoyalFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  });
	  
 	  it('should return false if hand is royal straight, but not flush', function() {
 		  cards = [
 		  	new Card('h', 'K'), 
 			new Card('h', 'A'),
 			new Card('h', 'Q'),
 			new Card('c', 'T'),
 			new Card('h', 'J'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isRoyalFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  });
	  
  	});  
 
   describe('#isStraightFlush(hand)', function(){
 	  it('should return true if hand is straight flush without ace', function() {
 		  cards = [
 		  	new Card('d', '2'), 
 			new Card('d', '3'),
 			new Card('d', '5'),
 			new Card('d', '4'),
 			new Card('d', '6'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(true);
 	  });
	  
 	  it('should return true if hand is straight flush with low ace', function() {
 		  cards = [
 		  	new Card('h', '2'), 
 			new Card('h', '3'),
 			new Card('h', '5'),
 			new Card('h', '4'),
 			new Card('h', 'A'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(true);
 	  });
	  
 	  it('should return true if hand is straight flush with high ace', function() {
 		  cards = [
 		  	new Card('s', 'J'), 
 			new Card('s', 'Q'),
 			new Card('s', 'T'),
 			new Card('s', 'K'),
 			new Card('s', 'A'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(true);
 	  });
	  
 	  it('should return false if hand is not straight flush without ace and straight, but not flush', function() {
 		  cards = [
 		  	new Card('c', '2'), 
 			new Card('s', '3'),
 			new Card('c', '4'),
 			new Card('c', '5'),
 			new Card('c', '6'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  }); 
	  
 	  it('should return false if hand is not straight flush with low ace and straight, but not flush', function() {
 		  cards = [
 		  	new Card('c', '2'), 
 			new Card('c', '3'),
 			new Card('c', 'A'),
 			new Card('d', '4'),
 			new Card('c', '5'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  }); 
	  
 	  it('should return false if hand is not straight flush with high ace and straight, but not flush', function() {
 		  cards = [
 		  	new Card('h', 'Q'), 
 			new Card('c', 'A'),
 			new Card('c', 'T'),
 			new Card('c', 'K'),
 			new Card('c', 'J'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  }); 
	  
 	  it('should return false if hand is not straight flush without ace and flush', function() {
 		  cards = [
 		  	new Card('c', '2'), 
 			new Card('c', '3'),
 			new Card('c', '7'),
 			new Card('c', '5'),
 			new Card('c', '6'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  });
	  
 	  it('should return false if hand is not straight flush without ace and not flush', function() {
 		  cards = [
 		  	new Card('h', '2'), 
 			new Card('d', '3'),
 			new Card('h', '7'),
 			new Card('c', '5'),
 			new Card('h', '6'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  });
	  
 	  it('should return false if hand is not straight flush with low ace and flush', function() {
 		  cards = [
 		  	new Card('s', '2'), 
 			new Card('s', '3'),
 			new Card('s', '7'),
 			new Card('s', '5'),
 			new Card('s', 'A'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  });
	  
 	  it('should return false if hand is not straight flush with low ace and not flush', function() {
 		  cards = [
 		  	new Card('h', '2'), 
 			new Card('d', '3'),
 			new Card('h', '7'),
 			new Card('c', '5'),
 			new Card('h', 'A'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  });
	  
 	  it('should return false if hand is not straight flush with high ace and flush', function() {
 		  cards = [
 		  	new Card('d', 'T'), 
 			new Card('d', '3'),
 			new Card('d', 'K'),
 			new Card('d', 'Q'),
 			new Card('d', 'A'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  });
	  
 	  it('should return false if hand is not straight flush with high ace and not flush', function() {
 		  cards = [
 		  	new Card('h', 'T'), 
 			new Card('d', '3'),
 			new Card('h', 'K'),
 			new Card('c', 'Q'),
 			new Card('h', 'A'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isStraightFlush(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  });
   });
 
   describe('#isFullHouse(hand)', function(){
 	  it('should return true if hand is full house', function() {
 		  cards = [
			new Card('c', 'K'),
 		  	new Card('h', '4'), 
 			new Card('d', '4'),
 			new Card('c', '4'),
 			new Card('s', 'K'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isFullHouse(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(true);
 	  });
	  
 	  it('should return false if hand is not full house because is two pair', function() {
 		  cards = [
			new Card('c', 'K'),
		  	new Card('h', '4'), 
			new Card('d', '2'),
			new Card('c', '4'),
			new Card('s', 'K'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isFullHouse(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
 	  });
	  
 	  it('should return false if hand is not full house because it is four of a kind', function() {
 		  cards = [
 			new Card('s', 'T'),
 			new Card('d', 'T'),
 			new Card('c', 'T'),
 			new Card('s', '9'),
 		  	new Card('h', 'T'),
 		  ];
 		  h = new Hand(cards);
 		  r = p.isFullHouse(h); 
 		  expect(r).to.be.a('boolean');
 		  expect(r).to.equal(false);
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
  
  describe('#isFourOfAKind(hand)', function(){
	  it('should return true if hand is four of a kind', function() {
		  cards = [
		  	new Card('h', 'T'), 
			new Card('d', 'T'),
			new Card('c', 'T'),
			new Card('c', 'A'),
			new Card('s', 'T'),
		  ];
		  h = new Hand(cards);
		  r = p.isFourOfAKind(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(true);
	  });
	  
	  it('should return false if hand is not four of a kind', function() {
		  cards = [
		  	new Card('h', 'T'), 
			new Card('s', 'T'),
			new Card('d', 'T'),
			new Card('c', '9'),
			new Card('c', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isFourOfAKind(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
  });
  
  describe('#isThreeOfAKind(hand)', function(){
	  it('should return true if hand is three of a kind', function() {
		  cards = [
		  	new Card('h', '9'), 
			new Card('d', '9'),
			new Card('c', 'Q'),
			new Card('c', 'A'),
			new Card('s', '9'),
		  ];
		  h = new Hand(cards);
		  r = p.isThreeOfAKind(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(true);
	  });
	  
	  it('should return false if hand is not three of a kind because lacks three cards of same rank', function() {
		  cards = [
		  	new Card('h', 'T'), 
			new Card('s', '2'),
			new Card('d', 'A'),
			new Card('c', '9'),
			new Card('c', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isThreeOfAKind(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not three of a kind because it is a full house', function() {
		  cards = [
			new Card('s', 'T'),
			new Card('d', 'T'),
			new Card('c', '9'),
			new Card('s', '9'),
		  	new Card('h', 'T'),
		  ];
		  h = new Hand(cards);
		  r = p.isThreeOfAKind(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
  });
  
  describe('#isTwoPair(hand)', function(){
	  it('should return true if hand is a two pair', function() {
		  cards = [
		  	new Card('h', '7'), 
			new Card('d', 'Q'),
			new Card('c', 'Q'),
			new Card('c', 'A'),
			new Card('s', '7'),
		  ];
		  h = new Hand(cards);
		  r = p.isTwoPair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(true);
	  });
	  
	  it('should return false if hand is not a two pair because has no pair', function() {
		  cards = [
		  	new Card('h', '7'), 
			new Card('s', '8'),
			new Card('d', 'Q'),
			new Card('h', '9'),
			new Card('s', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isTwoPair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not a two pair because has only one pair', function() {
		  cards = [
		  	new Card('s', '7'), 
			new Card('s', 'Q'),
			new Card('d', 'Q'),
			new Card('h', '9'),
			new Card('c', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isTwoPair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not a two pair because it is three of a kind', function() {
		  cards = [
		  	new Card('s', '7'), 
			new Card('s', 'Q'),
			new Card('d', 'Q'),
			new Card('h', 'Q'),
			new Card('c', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isTwoPair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not a two pair because it is four of a kind', function() {
		  cards = [
		  	new Card('s', 'A'), 
			new Card('s', '5'),
			new Card('d', '5'),
			new Card('h', '5'),
			new Card('c', '5'),
		  ];
		  h = new Hand(cards);
		  r = p.isTwoPair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
  });
  
  describe('#isOnePair(hand)', function(){
	  it('should return true if hand is a one pair', function() {
		  cards = [
		  	new Card('h', '7'), 
			new Card('d', 'K'),
			new Card('c', 'K'),
			new Card('c', 'A'),
			new Card('s', '6'),
		  ];
		  h = new Hand(cards);
		  r = p.isOnePair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(true);
	  });
	  
	  it('should return false if hand is not a one pair because has no pair', function() {
		  cards = [
		  	new Card('h', '7'), 
			new Card('s', '8'),
			new Card('d', 'Q'),
			new Card('h', '9'),
			new Card('s', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isOnePair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not a one pair because has two pair', function() {
		  cards = [
		  	new Card('s', '7'), 
			new Card('s', 'Q'),
			new Card('d', 'Q'),
			new Card('h', '7'),
			new Card('c', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isOnePair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not a one pair because has three of a kind', function() {
		  cards = [
		  	new Card('s', '7'), 
			new Card('s', 'Q'),
			new Card('d', 'Q'),
			new Card('h', 'Q'),
			new Card('c', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isOnePair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not a one pair because has four of a kind', function() {
		  cards = [
		  	new Card('s', '7'), 
			new Card('s', 'Q'),
			new Card('d', 'Q'),
			new Card('h', 'Q'),
			new Card('c', 'Q'),
		  ];
		  h = new Hand(cards);
		  r = p.isOnePair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
  });
  
  describe('#isHighCard(hand)', function(){
	  it('should return true if hand is a high card', function() {
		  cards = [
		  	new Card('h', '7'), 
			new Card('d', 'K'),
			new Card('c', 'Q'),
			new Card('c', 'A'),
			new Card('s', '6'),
		  ];
		  h = new Hand(cards);
		  r = p.isHighCard(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(true);
	  });
	  
	  it('should return false if hand is a straight flush', function() {
		  cards = [
		  	new Card('c', '7'), 
			new Card('c', '8'),
			new Card('c', '9'),
			new Card('c', 'T'),
			new Card('c', 'J'),
		  ];
		  h = new Hand(cards);
		  r = p.isHighCard(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not a one pair because has two pair', function() {
		  cards = [
		  	new Card('s', '7'), 
			new Card('s', 'Q'),
			new Card('d', 'Q'),
			new Card('h', '7'),
			new Card('c', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isOnePair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not a one pair because has three of a kind', function() {
		  cards = [
		  	new Card('s', '7'), 
			new Card('s', 'Q'),
			new Card('d', 'Q'),
			new Card('h', 'Q'),
			new Card('c', 'A'),
		  ];
		  h = new Hand(cards);
		  r = p.isOnePair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand is not a one pair because has four of a kind', function() {
		  cards = [
		  	new Card('s', '7'), 
			new Card('s', 'Q'),
			new Card('d', 'Q'),
			new Card('h', 'Q'),
			new Card('c', 'Q'),
		  ];
		  h = new Hand(cards);
		  r = p.isOnePair(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
  });
  
  describe('#isValidHand(hand)', function(){
	  it('should return true if hand has 5 unique cards', function() {
		  cards = [
		  	new Card('h', '7'), 
			new Card('d', 'K'),
			new Card('c', 'Q'),
			new Card('c', 'A'),
			new Card('s', '6'),
		  ];
		  h = new Hand(cards);
		  r = p.isValidHand(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(true);
	  });
	  
	  it('should return false if hand has 5 cards, but has duplicate cards', function() {
		  cards = [
			new Card('c', 'T'),
		  	new Card('c', '7'), 
			new Card('c', '8'),
			new Card('c', '9'),
			new Card('c', 'T'),
		  ];
		  h = new Hand(cards);
		  r = p.isValidHand(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });	
	  
	  it('should return false if hand has more than 5 cards, but has no duplicate cards', function() {
		  cards = [
			new Card('c', 'T'),
		  	new Card('c', '7'), 
			new Card('c', '8'),
			new Card('c', '9'),
			new Card('c', '3'),
			new Card('c', '2'),
		  ];
		  h = new Hand(cards);
		  r = p.isValidHand(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });	
	  
	  it('should return false if hand has more than 5 cards and has duplicate cards', function() {
		  cards = [
			new Card('c', 'T'),
		  	new Card('c', '7'), 
			new Card('c', '2'),
			new Card('c', '9'),
			new Card('c', '3'),
			new Card('c', '2'),
		  ];
		  h = new Hand(cards);
		  r = p.isValidHand(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });	
	  
	  it('should return false if hand has less than 5 cards, but has no duplicate cards', function() {
		  cards = [
			new Card('c', 'T'),
		  	new Card('c', '7'), 
			new Card('c', '8'),
		  ];
		  h = new Hand(cards);
		  r = p.isValidHand(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });
	  
	  it('should return false if hand has less than 5 cards has duplicate cards', function() {
		  cards = [
			new Card('h', 'T'),
		  	new Card('c', '8'), 
			new Card('c', '8'),
			new Card('d', '7'),
		  ];
		  h = new Hand(cards);
		  r = p.isValidHand(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });		
	  
	  it('should return false if hand has zero cards', function() {
		  cards = [];
		  h = new Hand(cards);
		  r = p.isValidHand(h); 
		  expect(r).to.be.a('boolean');
		  expect(r).to.equal(false);
	  });	
  });
});