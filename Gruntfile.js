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
        dest: 'dist/resources/js/main.min.js'
      }
    },
    clean: ['dist/'],
    copy: {
      main: {
        files: [
          // makes all src relative to cwd
          {expand: true, cwd: 'resources/', src: ['**'], dest: 'dist/resources/'}
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'dist'
        }
      }
    },
    watch: {
      options: {
        interrupt: true,
        livereload: true
      },
      project: {
        files: ["includes/*.hbs", "layout/*.hbs", "resources/**/*.css", "resources/img/"],
        tasks: ["build"]
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
  grunt.registerTask( 'build', [ 'clean', 'assemble:build', 'copy', 'uglify', 'connect:server', 'watch'  ] );
};