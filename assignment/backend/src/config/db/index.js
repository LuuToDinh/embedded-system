const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/aquaculture';
async function connect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected');
  } catch (error) {
    console.log("Can't connect to database: " + error.message);
  }
}

module.exports = { connect };
