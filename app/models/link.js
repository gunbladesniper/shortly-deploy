var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');

var linkSchema = mongoose.Schema({
  visits: Number,
  link: String,
  title: String,
  code: String,
  baseUrl: String,
  url: String
});

var Link = mongoose.model('Link', linkSchema);
// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

linkSchema.pre('save', function(next) {
  var createSha = function(url) {
    var shasum = crypto.createHash('sha1');
    shasum.update(url);
    return shasum.digest('hex').slice(0, 5);
  };
  var code = createSha(this.url);
  this.code = code;
  next();
});

module.exports = Link;
