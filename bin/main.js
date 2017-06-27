#!/usr/local/bin/node
var fs = require('fs');
var path = require('path');
var open = require('opn');

var dir = process.cwd();
var files = fs.readdirSync(dir);
//prefix files with /music, and sort out only audio files
files = files.filter((x)=>{return /\w*?\.(ogg|mp3|wav|pcm|aiff|aac|wma|flac|m4a|opus)/gi.test(x)}).map((x)=>{return `music/${x}`})

var title = path.basename(dir);
var server = require('../lib/server');

var port = 3000;
server.start(title, files, port);
open(`http://localhost:${port}`);
