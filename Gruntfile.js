module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      main: {
        expand: true,
        cwd: '../master',
        src: '**',
        dest: 'app/widgets/',
      },
    },
    clean: {
      main: ['app/widgets/nl.fokkezb.drawer']
    },
    titanium: {
      iphone: {
        options: {
          command: 'build',
          platform: 'ios',
          deviceFamily: 'iphone',
          logLevel: 'trace',
          liveview: true
        }
      },
      android: {
        options: {
          command: 'build',
          platform: 'android',
          logLevel: 'trace',
          liveview: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-titanium');

  grunt.registerTask('update', ['clean', 'copy']);

  grunt.registerTask('iphone', ['update', 'titanium:iphone']);
  grunt.registerTask('android', ['update', 'titanium:android']);
  
  grunt.registerTask('default', ['iphone']);

};