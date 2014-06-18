path = require 'path'
 
module.exports = (grunt) ->
  pkg = grunt.file.readJSON 'package.json'
  require('load-grunt-tasks')(grunt)
 
  grunt.initConfig
    connect:
      site:
        options:
          hostname: '0.0.0.0',
          port: 9000
 
    compass:
      dist:
        options:
          config: 'config.rb'

    coffee:
      compile:
        files: [
          expand: true
          cwd: 'assets/coffee'
          src: '*.coffee'
          dest: 'assets/js/'
          ext: '.js'
        ]
      options:
        sourceMap: true

    watch:
      html:
        files: ['*.html', '{,*/}*.html', '*.php']
        options:
          livereload: true
      coffee:
        files: ['assets/coffee/*.coffee']
        tasks: [
          'coffee:compile'
        ]
        options:
          livereload: true
      sass:
        files: ['assets/sass/*.scss']
        tasks: [
          "compass:dist"
        ]
        options:
          livereload: true

  grunt.registerTask 'default',
    [
      'compass:dist',
      'coffee:compile',
      'connect',
      'watch'
    ]