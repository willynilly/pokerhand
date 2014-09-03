var Card = require('../lib/card.js');
var expect = require('chai').expect;

describe('Card', function(){
 
   describe('Card(suit, rank)', function(){
 	  it('should initialize suit and rank string properties.', function() {
 		 	  c = new Card('1', 'z');
 		 	  expect(c.suit).to.be.a('string');
 		 	  expect(c.rank).to.be.a('string');
 		 	  expect(c.suit).to.equal('1');
 		 	  expect(c.rank).to.equal('z');
 	  });
	  
 	  it('should initialize suit and rank properties as strings instead of numbers', function() {
 		 	  c = new Card(1, -4.3);
 		 	  expect(c.suit).to.be.a('string');
 		 	  expect(c.rank).to.be.a('string');
 		 	  expect(c.suit).to.equal('1');
 		 	  expect(c.rank).to.equal('-4.3');
 	  });
	  
   });
 
  describe('#toString()', function(){
	  it('should return a 2-tuple with the first element a card suit and the second element a card rank.', function() {
		 	  c = new Card('1', 'z');
		 	  expect(c.toString()).to.be.a('string');
		 	  expect(c.toString()).to.equal('(1, z)');
	  });
  });
  
  describe('#sameSuit()', function(){
	  it('should return true if two cards have same suits', function() {
		 	  c1 = new Card('H', '2');
		 	  c2 = new Card('H', '3');
		 	  expect(c1.sameSuit(c2)).to.be.a('boolean');
		 	  expect(c1.sameSuit(c2)).to.equal(true);
	  });
	  it('should return false if two cards have different suits', function() {
		 	  c1 = new Card('H', '2');
		 	  c2 = new Card('h', '2');
		 	  expect(c1.sameSuit(c2)).to.be.a('boolean');
		 	  expect(c1.sameSuit(c2)).to.equal(false);
	  });
  });
  
  describe('#sameRank()', function(){
	  it('should return true if two cards have same ranks', function() {
		 	  c1 = new Card('i', '20');
		 	  c2 = new Card('z', '20');
		 	  expect(c1.sameRank(c2)).to.be.a('boolean');
		 	  expect(c1.sameRank(c2)).to.equal(true);
	  });
	  it('should return false if two cards have different ranks', function() {
		 	  c1 = new Card('H', 'H');
		 	  c2 = new Card('H', 'h');
		 	  expect(c1.sameRank(c2)).to.be.a('boolean');
		 	  expect(c1.sameRank(c2)).to.equal(false);
	  });
  });

  describe('#getKey()', function(){
	  it('should return the same output as #toString().', function() {
		 	  c = new Card('1', 'z');
		 	  expect(c.getKey()).to.be.a('string');
		 	  expect(c.getKey()).to.equal(c.toString());
	  });
  });
});