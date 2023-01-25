const mongoose = require('mongoose');

module.exports = async (globalConfig) => {
  mongoose.disconnect();
  testServer.close();
};
