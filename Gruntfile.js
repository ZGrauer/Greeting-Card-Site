module.exports = function(grunt) {
  var mozjpeg = require('imagemin-mozjpeg');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {                           // Minify all *.CSS files
      target: {
        files: [{
          expand: true,                 // Enable dynamic expansion
          cwd: 'src/css',               // Source files in ./src/css/
          src: ['*.css', '!*.min.css'], // Look for all non-miified CSS
          dest: 'css',                  // Send output to ./css/
          ext: '.min.css'               // Add min to filename
        }]
      }
    },
    imagemin: {                          // Minify images
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/images/',            // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'images/'                // Destination path prefix
        }]
      }
    },
    watch: {                                  // Watch for file changes and run task
      css: {
        files: ['src/css/*.css'],             // Minify when CSS sources change
        tasks: ['cssmin']
      },
      images: {
        files: ['src/images/*.{png,jpg,gif}'],  // Minify when images sources change
        tasks: ['imagemin']
      }
    }
  });

  // Minify CSS files.
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Minify Images
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'imagemin']);

  // Run tasks on file change
  grunt.loadNpmTasks('grunt-contrib-watch');

};
