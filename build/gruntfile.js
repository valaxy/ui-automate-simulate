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
					'lib/rember.js',
					'../bower_components/requirejs/require.js',
					'../dist/uiRun-core.js',
					'lib/require-command.js'
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


	// - ��¼ԭʼҳrequire��define��ȫ�ֱ���
	// - ����requirejsģ��
	// - ����uiRunģ��
	// - ����commandģ��, �������ȫ�ֱ��������ռ�uiRunCommand
	// - �ָ�require��define��ȫ�ֱ���
	grunt.registerTask('default', ['shell', 'concat', 'uglify'])
	//grunt.registerTask('default', ['shell', 'concat'])
}
