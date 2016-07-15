module.exports = function (grunt) {
    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                files: {
                    'build/tiny-canvas.js': [
                        ['src/utils.js', 'src/renderer2D.js']
                    ]
                }
            }
        },
        clean: {
            beforeRelease: [
                'build/**/',
            ],
            afterRelease: [
                'build/tgc.js.report.txt'
            ]
        },
        compress: {
            main: {
                options: {
                    archive: 'build/<%= pkg.name %>.zip'
                },
                files: [{
                    src: ['build/tgc.js']
                }]
            }
        },
        'closure-compiler': {
            frontend: {
                closurePath: 'node_modules/grunt-closure-compiler',
                js: 'build/tiny-canvas.js',
                jsOutputFile: 'build/tgc.js',
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS'
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', [
        'clean:beforeRelease',
        'concat',
        'closure-compiler',
        'clean:afterRelease',
        'compress'
    ]);
    grunt.registerTask('dev', [
        'clean:beforeRelease',
        'concat'
    ]);
};