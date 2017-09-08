from __future__ import with_statement
from fabric.api import *

env.hosts = ['pi@192.168.1.59']
path = '/home/pi/game/server'

def push():
	local('git push')

def resetHead():
	with cd(path):
		run('git reset --hard')

def npmInstall():
	with cd(path):
		run('npm install')

def restartd():
	run('sudo supervisorctl restart game-server')

def status():
	run('sudo supervisorctl status game-server')

def tail(b=100):
	run('sudo supervisorctl tail -{} game-server'.format(b))


def deploy():
	push()
	resetHead()
	npmInstall()
	restartd()
