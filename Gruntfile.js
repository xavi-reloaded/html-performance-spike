module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
            'src/js/modernizr-2.6.2.js',
            'src/js/jquery.min.js',
            'src/js/script.js',
            'src/js/knockout-3.1.0.js',
            'src/js/jquery.browser.min.js',
            'src/js/jquery-ui-1.9.2.js',
            'src/js/jquery-ui-1.9.2.custom.min.js',
            'src/js/jquery.mousewheel.js',
            'src/js/jquery.jscrollpane.min.js',
            'src/js/swiper.js',
            'src/js/idangerous.swiper-2.4.3.js',
            'src/js/libs.js',
            'src/js/jquery.lazyload.js.js',
            'src/js/global.js',
            'src/js/menuTop.js',
            'src/js/home.js',
            'src/js/validaStock.js'
        ],
        dest: 'static/app.all.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'static/app.all.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    concat_css: {
      options: {
        assetBaseUrl: 'static/assets',
        baseDir: 'src/css/(styles|assets)'
      },
      all: {
        src: ["src/css/*.css"],
        dest: "static/styles.css"
      }
      
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'static/styles.min.css': ['static/styles.css']
        }
      }
}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build', ['concat', 'uglify','concat_css', 'cssmin']);

  grunt.registerTask('build-for-deploy', ['jshint', 'concat', 'uglify','concat_css']);

  grunt.registerTask('default', ['concat','concat_css']);

};