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
                        ['src/header-tc.js', 'src/utils.js', 'src/canvas.js']
                    ],
                    'build/tiny-sprite.js': [
                        ['src/header-ts.js', 'src/utils.js', 'src/sprite.js']
                    ]
                }
            }
        },
        clean: {
            beforeRelease: [
                'build/**/',
            ],
            afterRelease: [
                'build/tc.js.report.txt',
                'build/ts.js.report.txt'
            ]
        },
        compress: {
            canvas: {
                options: {
                    archive: 'build/tiny-canvas.zip'
                },
                files: [{
                    src: ['build/tc.js']
                }]
            },
            sprite: {
                options: {
                    archive: 'build/tiny-sprite.zip'
                },
                files: [{
                    src: ['build/ts.js']
                }]
            }
        },
        'closure-compiler': {
            canvas: {
                closurePath: 'node_modules/grunt-closure-compiler',
                js: 'build/tiny-canvas.js',
                jsOutputFile: 'build/tc.js',
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS'
                }
            },
            sprite: {
                closurePath: 'node_modules/grunt-closure-compiler',
                js: 'build/tiny-sprite.js',
                jsOutputFile: 'build/ts.js',
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