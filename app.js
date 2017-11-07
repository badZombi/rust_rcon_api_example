require('dotenv').config()

var WebRcon = require('webrconjs')
var express = require('express')
var bodyParser = require('body-parser')
var rcon = new WebRcon(process.env.RCON_IP, process.env.RCON_PORT)

rcon.on('connect', function() {
    console.log('CONNECTED')
    rcon.run('echo hello world!', 0)
})
rcon.on('disconnect', function() {
    console.log('DISCONNECTED')
})
rcon.on('message', function(msg) {
    console.log('MESSAGE:', msg)
})
rcon.on('error', function(err) {
    console.log('ERROR:', err)
})

rcon.connect(process.env.RCON_PASS)

const app   = express();
const port  = 8000;
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app, rcon);

app.listen(port, () => {
  console.log('Running on port ' + port);
});

