module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec',
        ui: 'tdd',
      },
      src: ['test/*.js'],
    },
    mocha_istanbul: {
      coverage: {
        src: ['test'],
        options: {
          mochaOptions: ['--ui', 'tdd', '-R', 'landing'],
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
  grunt.registerTask('default', ['test']);
};
