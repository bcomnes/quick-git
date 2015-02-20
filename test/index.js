var test = require('tape')
var path = require('path')
var fs = require('fs')
var rimraf = require('rimraf')
var debug = require('debug')

var makeGit = require('../')

var temp = path.join(__dirname, 'tmp')
var repoName = 'testRepo'
var workTree = path.join(temp, repoName)
var cloneName = 'cloneRepo'
var cloneTree = path.join(temp, cloneName)

var git
var clone

test('ensure clean directory', function(t) {
  if (fs.existsSync(temp)) {
    rimraf(temp, function(err) {
      t.error(err, 'tmp dir removed')
      t.end()
    })
  } else {
    t.pass('no temp dir exists')
    t.end()
  }
})

test('create git object', function(t) {
  t.plan(1)
  git = makeGit(workTree)
  t.pass('git instance created')
})

test('init test repo', function(t) {
  t.plan(1)
  git.init(function(err, stdout, stderr) {
    t.error(err, 'initialzed test repo')
    debug(stdout)
    debug(stderr)
  })
})

test('run a string command', function(t) {
  t.plan(1)

  git('status', function(err, stdout, stderr) {
    t.error(err, 'string command sucessfully run')
    debug(stdout)
    debug(stderr)
  })
})

test('run a file command', function(t) {
  t.plan(1)
  git(['status'], function(err, stdout, stderr) {
    t.error(err, 'array command sucessfully run')
    debug(stdout)
    debug(stderr)
  })
})

test('run a string command w/ options', function(t) {
  t.plan(1)

  git('status', {
    timeout: 1500
  }, function(err, stdout, stderr) {
      t.error(err, 'string command sucessfully run')
      debug(stdout)
      debug(stderr)
    })
})

test('run a file command w/ options', function(t) {
  t.plan(1)
  git(['status'], {
    timeout: 15000
  }, function(err, stdout, stderr) {
      t.error(err, 'array command sucessfully run')
      debug(stdout)
      debug(stderr)
    })
})

test('clone testRepo', function(t) {
  t.plan(1)
  clone = makeGit(cloneTree)
  clone.clone(workTree, function(err, stdout, stderr) {
    t.error(err, 'repo cloned')
    debug(stdout)
    debug(stderr)
  })
})

test('clean up', function(t) {
  t.plan(1)
  rimraf(temp, function(err) {
    t.error(err, 'tests cleaned up')
  })
})
