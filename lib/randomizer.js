function Randomizer() {}
Randomizer.prototype = {
	shuffleArray: function(a) {
		var s_a = a.slice(0);
		i = s_a.length - 1;
		var tmp;
		while(i >= 0) {
			r_i = this.randomIntegerInclusive(0, s_a.length-1);
			tmp = s_a[r_i];
			s_a[r_i] = s_a[i];
			s_a[i] = tmp; 
			i--;
		}		
		return s_a; 
	},
	
	randomIntegerInclusive: function(min, max) {
		return Math.floor(Math.random() * ( max - min +1 ) + min);
	},
};

module.exports = Randomizer;