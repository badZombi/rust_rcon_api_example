const giveRoutes = require('./give_routes');
module.exports = function(app, rcon) {
  giveRoutes(app, rcon);
};
