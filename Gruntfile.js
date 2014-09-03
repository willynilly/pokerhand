module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		jshint: {
		  // define the files to lint
		  files: ['gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
		  // configure JSHint (documented at http://www.jshint.com/docs/)
		  options: {
		      // more options here if you want to override JSHint defaults
		    globals: {
		      jQuery: true,
		      console: true,
		      module: true
		    }
		  }
		},
		
		watch: {
		  files: ['<%= jshint.files %>'],
		  tasks: ['jshint']
		},
		
      // Configure a mochaTest task
      mochaTest: {
        test: {
          options: {
            reporter: 'spec',
				colors: true
          },
          src: ['test/**/*.js']
        }
      },
	
		// configure shell commands
		shell: {
        runPokerHandApp: {
            command: 'node ./lib/pokerhand-app.js'
        }
		}
		
	
	});
	
	// Add the grunt-contrib-watch tasks.
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Add the grunt-contrib-jshint tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	// Add the grunt-mocha-test tasks.
	grunt.loadNpmTasks('grunt-mocha-test');
	
	// Add grunt-shell tasks
   grunt.loadNpmTasks('grunt-shell');
	  
	grunt.registerTask('test', ['jshint', 'mochaTest']);
	
	grunt.registerTask('pokerhand', ['shell:runPokerHandApp']);
	
   grunt.registerTask('default', ['test']);
};