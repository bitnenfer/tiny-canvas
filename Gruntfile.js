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
                        ['src/header.js', 'src/utils.js', 'src/canvas.js']
                    ]
                }
            }
        },
        clean: {
            beforeRelease: [
                'build/**/',
            ],
            afterRelease: [
                'build/tc.js.report.txt'
            ]
        },
        compress: {
            main: {
                options: {
                    archive: 'build/<%= pkg.name %>.zip'
                },
                files: [{
                    src: ['build/tc.js']
                }]
            }
        },
        'closure-compiler': {
            frontend: {
                closurePath: 'node_modules/grunt-closure-compiler',
                js: 'build/tiny-canvas.js',
                jsOutputFile: 'build/tc.js',
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS'
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