from __future__ import with_statement
from fabric.api import *

env.hosts = ['pi@192.168.1.59']
path = '/home/pi/game/client'

def push():
	local('git push')

def resetHead():
	with cd(path):
		run('git reset --hard')

def npmInstall():
	with cd(path):
		run('npm install')

def build():
	with cd(path):
		run('npm run build')

def deploy():
	push()
	resetHead()
	npmInstall()
	build()
