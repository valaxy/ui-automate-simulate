module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		shell: {
			shell: {
				command: 'r.cmd',
				options: {
					execOptions: {
						cwd: '.'
					}
				}
			}
		},

		concat: {
			concat: {
				src : [
					'../src/global.js',
					'lib/rember.js',
					'../bower_components/jquery/dist/jquery.js',
					'../bower_components/jquery-simulate/jquery.simulate.js',
					'lib/add-jquery.js',
					'../src/command.js',
					'lib/recover.js'
				],
				dest: '../dist/uiRun.js'
			}
		},

		uglify: {
			uglify: {
				src : '../dist/uiRun.js',
				dest: '../dist/uiRun.js'
			}
		}
	})


	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-shell')


	grunt.registerTask('default', ['concat', 'uglify'])
	//grunt.registerTask('default', ['concat'])
}


// @Deprecated
// - 记录原始页require和define等全局变量
// - 引入requirejs模块
// - 引入uiRun模块
// - 加载command模块, 并添加至全局变量命名空间uiRunCommand
// - 恢复require和define等全局变量