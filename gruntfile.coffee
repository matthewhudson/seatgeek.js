module.exports = (grunt) ->
  
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    uglify:
      options:
        banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
      build:
        src: 'lib/<%= pkg.name %>.js'
        dest: '<%= pkg.name %>.min.js'
    coffee:
      compile:
        options:
          join: yes
        files:
          'lib/seatgeek.js': [
            'src/seatgeek.coffee'
          ]
    bumpup: 'package.json'
  
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'

  grunt.registerTask 'build', ['coffee', 'uglify']

  grunt.registerTask 'release', (type) ->
    type = if type then type else 'patch'
    grunt.task.run "bumpup:#{type}"
