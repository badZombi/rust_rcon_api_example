var md5 = require('md5');

module.exports = function(app, rcon) {

  app.post('/give', (req, res) => {

    if(req.headers.auth){

      console.log(req.headers);
      console.log(req.body);
      var checksum = md5(req.body.user + '|' + req.body.item + '|' + req.body.amount + '|' + process.env.SECRET_KEY);
      console.log(checksum);
      if(checksum == req.headers.auth){
        res.send('Attempting to give');
        rcon.run('inv.giveplayer ' + req.body.user + ' ' + req.body.item + ' ' + req.body.amount + '', 0);
      } else {
        res.send("checksum failed");
      }

    } else {
      res.send("auth failed");
    }

  });

};
