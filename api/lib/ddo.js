var bitcoin = require('bitcoin');
var client = new bitcoin.Client({
  host: 'localhost',
  port: 18332,
  user: 'bit_user',
  pass: '12345678'
});

client.getDifficulty(function(err, difficulty) {
  if (err) {
    return console.error(err);
  }

  console.log('Difficulty: ' + difficulty);
});