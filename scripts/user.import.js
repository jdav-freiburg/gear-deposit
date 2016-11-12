var fs = require("fs");
var firebase = require('firebase');

var _pushAll = function (ref, values) {
  values.forEach(function (value) {
    ref.push(value);
  })
};

var data = JSON.parse(fs.readFileSync('resources/.secret.data.json'));

firebase.initializeApp({
  databaseURL: 'https://test-6b408.firebaseio.com',
  serviceAccount: 'resources/.credentials.test-5507f411b732.json'
});
var db = firebase.database();

_pushAll(db.ref('/items'), data.items);

var labels = new Set();
var types = new Set();
var shapes = new Set();
data.items.forEach(function (item) {
  item.labels.forEach(function (label) {
    labels.add(label);
  });
  types.add(item.type);
  shapes.add(item.shape);
});

_pushAll(db.ref('/labels'), Array.from(labels));
_pushAll(db.ref('/types'), Array.from(types));
_pushAll(db.ref('/shapes'), Array.from(shapes));
