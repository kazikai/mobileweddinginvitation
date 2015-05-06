/*
 * Grunt Build System for Mobile Wedding Invitation
 * Author: Junghyun Han ( kazikai84@gmail.com )
 */
module.exports = function( grunt ) {
  // Project configuration
  require( 'load-grunt-tasks' )( grunt, { pattern: [ 'grunt-*', 'assemble'] } );
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    jshint: {
      options: {
        jshint: true
      },
      cwd: 'resources/js',
      src: 'main.js'
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'resources/js/main.js',
        dest: 'resources/js/main.min.js'
      }
    },
    assemble: {
      options: {
        helpers: [ 'helper/common.js' ]
      },
      build: {
        options: {
          layoutdir: 'layout',
          layout: 'default.hbs',
          partials: 'includes/*.hbs',
          data: 'data.json'
        },
        files: [{
          expand: true,
          cwd: 'docs',
          src: '*.hbs',
          dest: 'dist/'
        }]
      }
    }
  });
  // Default task(s).
  grunt.registerTask( 'default', [ 'uglify' ]);
  grunt.registerTask( 'build', [ 'uglify', 'assemble:build' ] );
};